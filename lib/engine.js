import players from "../data/players.json";
import questionBank from "../data/questions_structured.js";

// ─────────────────────────────────────────────────────────────
// ANSWER NORMALIZATION
// ─────────────────────────────────────────────────────────────
const ANSWER_MAP = {
  "yes": "Yes",
  "probably": "Maybe",
  "dunno": "Dont Know",
  "probably_not": "Probably Not",
  "no": "No",
};

function normalizeAnswer(raw) {
  if (!raw) return "Dont Know";
  const key = raw.trim().toLowerCase();
  return ANSWER_MAP[key] || raw;
}

// ─────────────────────────────────────────────────────────────
// PROPERTY EVALUATION
// ─────────────────────────────────────────────────────────────
function evaluateQuestion(q, player) {
  try {
    return q.eval(player);
  } catch (e) {
    return false;
  }
}

// ─────────────────────────────────────────────────────────────
// PROBABILITY UPDATE (Bayesian likelihood scoring)
// ─────────────────────────────────────────────────────────────
const SCORE_MAP = {
  "Yes": 1.0,
  "Maybe": 0.7,
  "Dont Know": 0,
  "Probably Not": -0.7,
  "No": -1.0
};

// Category-specific reliability — how much we trust the user's answer
// in each category. Higher = stronger update.
const QUESTION_RELIABILITY = {
  "nat": 0.98,     // Nationality is almost always known
  "team": 0.95,    // Team affiliations are well-known
  "role": 0.88,    // Role can be ambiguous for all-rounders
  "era": 0.92,     // Activity/era is fairly clear
  "pos": 0.82,     // Batting position can be fuzzy
  "bat": 0.88,     // Batting stats — decent reliability
  "bowl": 0.90,    // Bowling style is pretty clear
  "exp": 0.92,     // Experience/match count is factual
  "award": 0.94,   // Awards are memorable
  "style": 0.82,   // Playstyle is subjective
  "trait": 0.80,   // Identity traits can be arguable
};

function updateProbabilities(candidates, qId, rawAnswer) {
  const q = questionBank.find(qt => qt.id === qId);
  if (!q) return candidates;

  const answer = normalizeAnswer(rawAnswer);
  const score = SCORE_MAP[answer] || 0;
  if (score === 0) return candidates;

  const reliability = QUESTION_RELIABILITY[q.cat] || 0.85;
  const absScore = Math.abs(score);

  return candidates.map(c => {
    let weight = c.probability;
    const matches = evaluateQuestion(q, c);

    // Likelihood of this answer given the player
    let likelihood;
    if (score > 0) {
      // User said Yes/Maybe — player should match
      likelihood = matches ? reliability : (1 - reliability);
      likelihood = 0.5 + (likelihood - 0.5) * absScore;
    } else {
      // User said No/Probably Not — player should NOT match
      likelihood = !matches ? reliability : (1 - reliability);
      likelihood = 0.5 + (likelihood - 0.5) * absScore;
    }

    weight *= (likelihood * 2);
    return { ...c, probability: weight };
  });
}


// ─────────────────────────────────────────────────────────────
// INFORMATION GAIN SCORING
// ─────────────────────────────────────────────────────────────
// Measures how well a question splits the remaining candidate pool.
// Returns a score between 0 and 1. Higher = better split.
// A perfect 50/50 split = 1.0 (maximum information gain).
function informationGain(candidates, q) {
  const totalWeight = candidates.reduce((s, c) => s + c.probability, 0);
  if (totalWeight <= 0) return 0;

  let yesWeight = 0;
  for (const c of candidates) {
    if (evaluateQuestion(q, c)) yesWeight += c.probability;
  }

  const pYes = yesWeight / totalWeight;
  const pNo = 1 - pYes;

  // Edge case: question doesn't split at all
  if (pYes <= 0.001 || pNo <= 0.001) return 0;

  // Binary entropy — maximal at 0.5 (perfect split)
  return -(pYes * Math.log2(pYes)) - (pNo * Math.log2(pNo));
}


// ─────────────────────────────────────────────────────────────
// DYNAMIC QUESTION SELECTION
// ─────────────────────────────────────────────────────────────
// Implements Akinator-style selection:
//   1. Maximum information gain (best split)
//   2. Anti-repetition (sliding penalty for recent categories)
//   3. Phase-aware ordering (broad → specific → pinpoint)
//   4. Category budget (max 2 questions per category before penalty)
//   5. Memory-based boosts (successful questions get priority)
// ─────────────────────────────────────────────────────────────

function selectTopQuestions(candidates, askedIds, categoryHistory, questionCount, n = 5, memory = null) {
  const scored = [];
  const alive = candidates.filter(c => c.probability > 1e-6);
  if (alive.length <= 1) return [];

  // Determine game phase based on question count
  // Phase 1 (Q1-5): Broad splitters — prefer tier 1
  // Phase 2 (Q6-10): Mid-game — prefer tier 2
  // Phase 3 (Q11+): Pinpoint — any tier, especially tier 3
  const phase = questionCount < 5 ? 1 : questionCount < 10 ? 2 : 3;

  // Count how many times each category has been asked
  const categoryCounts = {};
  for (const cat of categoryHistory) {
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  }

  // Recent categories for sliding penalty (last 3)
  const recentCats = categoryHistory.slice(-3);

  for (const q of questionBank) {
    if (askedIds.has(q.id)) continue;

    // ── Core: Information gain ──
    let score = informationGain(alive, q);
    if (score <= 0) continue; // Skip useless questions

    // ── Anti-repetition: Sliding category penalty ──
    // Most recent category: heavy penalty. 2nd most: moderate. 3rd: mild.
    if (recentCats.length >= 1 && q.cat === recentCats[recentCats.length - 1]) {
      score *= 0.4;  // Same category as last question — strong penalty
    } else if (recentCats.length >= 2 && q.cat === recentCats[recentCats.length - 2]) {
      score *= 0.7;  // Same as 2-questions-ago — moderate penalty
    } else if (recentCats.length >= 3 && q.cat === recentCats[recentCats.length - 3]) {
      score *= 0.85; // Same as 3-questions-ago — mild penalty
    }

    // ── Category budget: Penalize overused categories ──
    const catCount = categoryCounts[q.cat] || 0;
    if (catCount >= 3) {
      score *= 0.2; // Severely penalize 4th+ question in same category
    } else if (catCount >= 2) {
      score *= 0.5; // Penalize 3rd question in same category
    }

    // ── Phase-aware tier preference ──
    const tier = q.tier || 2;
    if (phase === 1) {
      // Early game: strongly prefer broad questions (tier 1)
      if (tier === 1) score *= 1.3;
      else if (tier === 3) score *= 0.6;
    } else if (phase === 2) {
      // Mid game: prefer tier 2, allow tier 1 and 3
      if (tier === 2) score *= 1.1;
    } else {
      // Late game: prefer pinpoint questions (tier 3) and team questions
      if (tier === 3) score *= 1.2;
      if (q.cat === 'team') score *= 1.15;
    }

    // ── Nationality drilldown logic ──
    // Only ask specific nationality questions if we already know they're overseas
    if (['aus', 'wi', 'sa', 'eng', 'nz', 'sl', 'afg'].includes(q.id)) {
      // Check if "overseas" was answered Yes in history
      const overseasAsked = askedIds.has('overseas');
      const indianAsked = askedIds.has('indian');
      if (!overseasAsked && !indianAsked) {
        score *= 0.3; // Don't ask specific nationality before knowing overseas/Indian
      }
    }

    // ── Memory bias: Boost questions that historically led to correct guesses ──
    if (memory && memory.question_stats && memory.question_stats[q.id]) {
      const stats = memory.question_stats[q.id];
      const usageCount = stats.usage_count || 1;
      const successRate = (stats.success_contribution || 0) / usageCount;
      // Mild boost for proven questions (max 20% boost)
      score *= (1.0 + successRate * 0.2);
    }

    scored.push({ score, q });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(item => item.q);
}

export function formatPlayerTags(player) {
  return [
    player.role,
    ...(player.teams || []),
    player.is_overseas ? "Overseas" : "Indian",
    player.is_active ? "Active" : "Retired",
    player.is_opener ? "Opener" : null,
    player.is_middle ? "Middle Order" : null,
    player.is_finisher ? "Finisher" : null,
    player.is_wk ? "Wicketkeeper" : null,
    player.is_captain ? "Captain" : null,
    player.is_left_handed ? "Left-Handed" : null,
  ].filter(t => !!t);
}

function getRankings(candidates) {
  const sorted = [...candidates].sort((a, b) => b.probability - a.probability);
  const total = candidates.reduce((s, c) => s + c.probability, 0);

  const topProb = sorted[0]?.probability || 0;
  const confidence = total > 0 ? (topProb / total) * 100 : 0;

  // Adaptive alive threshold: candidates within 0.1% of the leader
  const maxW = topProb;
  const alive = sorted.filter(c => c.probability > maxW * 0.001).length;

  return {
    player: sorted[0],
    confidence,
    candidatesLeft: alive,
    topCandidates: sorted.slice(0, 3).map(c => ({
      ...c,
      probability: total > 0 ? ((c.probability / total) * 100).toFixed(1) : 0,
      tags: formatPlayerTags(c)
    }))
  };
}

const CONFIDENCE_THRESHOLD = 88;
const MAX_QUESTIONS = 15;

export function runEngine(gameState, memory = null, excludedIds = []) {

  // Initialize candidates with fame-weighted probabilities
  // Memory bias boosts players who have been correctly guessed before
  let candidates = players.map(p => {
    let baseWeight = Math.max(p.fame || 1, 0.5);

    if (memory && memory.player_stats && memory.player_stats[p.id]) {
      const stats = memory.player_stats[p.id];
      // Boost weight by 10% per correct guess, capped at 2x
      const boost = Math.min(2.0, 1.0 + (stats.correct_guesses || 0) * 0.1);
      baseWeight *= boost;
    }

    return { ...p, probability: baseWeight };
  });

  const askedIds = new Set();
  const categoryHistory = []; // Track ordered list of asked categories

  // Replay history — rebuild probability state
  for (const entry of gameState.history) {
    if (entry.questionId) {
      askedIds.add(entry.questionId);
      candidates = updateProbabilities(candidates, entry.questionId, entry.answer);

      const q = questionBank.find(qt => qt.id === entry.questionId);
      if (q) categoryHistory.push(q.cat);
    }
  }

  // Handle excluded players (e.g., from DRS Review)
  if (excludedIds && excludedIds.length > 0) {
    candidates = candidates.map(c => {
      if (excludedIds.includes(c.id)) {
        return { ...c, probability: 0 };
      }
      return c;
    });
  }

  const { player, confidence, candidatesLeft, topCandidates } = getRankings(candidates);
  const questionCount = gameState.history.length;

  // ── Confidence acceleration ──
  // When confidence is high and rising, boost the leader slightly
  // to converge faster and avoid wasting late questions
  if (confidence > 70 && questionCount > 5) {
    const boostFactor = 1 + (confidence - 70) / 300; // Small boost: 1.0 to ~1.1
    candidates = candidates.map(c => {
      if (c.id === player.id) {
        return { ...c, probability: c.probability * boostFactor };
      }
      return c;
    });
  }

  // Decision: guess or ask
  if (confidence >= CONFIDENCE_THRESHOLD || candidatesLeft <= 1 || questionCount >= MAX_QUESTIONS) {
    const finalPlayer = { ...player };
    finalPlayer.tags = formatPlayerTags(player);

    return {
      action: "guess",
      player: finalPlayer,
      text: player.name,
      confidence: Math.round(confidence),
      candidatesLeft,
      topCandidates
    };
  }

  const topQuestions = selectTopQuestions(
    candidates,
    askedIds,
    categoryHistory,
    questionCount,
    5,
    memory
  );

  if (topQuestions.length === 0) {
    const finalPlayer = { ...player };
    finalPlayer.tags = formatPlayerTags(player);

    return {
      action: "guess",
      player: finalPlayer,
      text: player.name,
      confidence: Math.round(confidence),
      candidatesLeft,
      topCandidates
    };
  }

  return {
    action: "question_candidates",
    candidates: topQuestions,
    confidence: Math.round(confidence),
    candidatesLeft,
    topCandidates
  };
}
