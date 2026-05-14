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
// PROBABILITY UPDATE (Matching groq_chat.py logic)
// ─────────────────────────────────────────────────────────────
const SCORE_MAP = {
  "Yes": 1.0,
  "Maybe": 0.7,
  "Dont Know": 0,
  "Probably Not": -0.7,
  "No": -1.0
};

const QUESTION_RELIABILITY = {
  "nat": 0.98,
  "team": 0.95,
  "role": 0.85,
  "era": 0.90,
  "pos": 0.80,
  "bat": 0.88,
  "bowl": 0.88,
  "exp": 0.92,
  "award": 0.92
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

    // Likelihood of answer given the player
    let likelihood;
    if (score > 0) {
      // User said Yes. 
      // If matches: high likelihood. If not: low but non-zero (noise).
      likelihood = matches ? reliability : (1 - reliability);
      // Scale by how "strong" the answer was (Yes vs Probably)
      likelihood = 0.5 + (likelihood - 0.5) * absScore;
    } else {
      // User said No.
      likelihood = !matches ? reliability : (1 - reliability);
      likelihood = 0.5 + (likelihood - 0.5) * absScore;
    }

    weight *= (likelihood * 2);
    return { ...c, probability: weight };
  });
}


// ─────────────────────────────────────────────────────────────
// ENTROPY-BASED QUESTION SELECTION
// ─────────────────────────────────────────────────────────────
function expectedEntropyAfterQuestion(candidates, q) {
  const totalWeight = candidates.reduce((s, c) => s + c.probability, 0);
  if (totalWeight <= 0) return Infinity;

  let yesWeight = 0;
  for (const c of candidates) {
    if (evaluateQuestion(q, c)) yesWeight += c.probability;
  }

  const pYes = yesWeight / totalWeight;
  const pNo = 1 - pYes;

  if (pYes <= 0 || pNo <= 0) return Infinity;

  return -(pYes * Math.log2(pYes)) - (pNo * Math.log2(pNo));
}
function selectTopQuestions(candidates, askedIds, lastCategory, n = 5, memory = null) {
  const scored = [];
  const alive = candidates.filter(c => c.probability > 1e-6);
  if (alive.length <= 1) return [];

  for (const q of questionBank) {
    if (askedIds.has(q.id)) continue;

    let entropy = expectedEntropyAfterQuestion(alive, q);
    
    // Memory bias: boost questions that have been successful
    if (memory && memory.question_stats && memory.question_stats[q.id]) {
      const stats = memory.question_stats[q.id];
      const utility = 1.0 + (stats.success_contribution / (stats.usage_count || 1)) * 0.5;
      entropy *= utility;
    }

    // Penalize same category
    if (q.cat === lastCategory) {
      entropy *= 0.7;
    }

    scored.push({ entropy, q });
  }

  return scored
    .sort((a, b) => b.entropy - a.entropy)
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
    player.is_wk ? "Wicketkeeper" : null
  ].filter(t => !!t);
}

function getRankings(candidates) {
  const sorted = [...candidates].sort((a, b) => b.probability - a.probability);
  const total = candidates.reduce((s, c) => s + c.probability, 0);

  const topProb = sorted[0]?.probability || 0;
  const confidence = total > 0 ? (topProb / total) * 100 : 0;
  
  const maxW = topProb;
  const alive = sorted.filter(c => c.probability > maxW * 0.003).length;

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

  // Initialize candidates with weights from players.json
  // Initial fame weight helps bias towards more famous players early on
  // Memory bias boosts players who have been correctly guessed recently/frequently
  let candidates = players.map(p => {
    let baseWeight = Math.max(p.fame || 1, 0.5);
    
    if (memory && memory.player_stats && memory.player_stats[p.id]) {
      const stats = memory.player_stats[p.id];
      // Boost weight by 10% for every correct guess, capped at 2x boost
      const boost = Math.min(2.0, 1.0 + (stats.correct_guesses || 0) * 0.1);
      baseWeight *= boost;
    }

    return { ...p, probability: baseWeight };
  });

  const askedIds = new Set();
  let lastCategory = null;

  // Replay history
  for (const entry of gameState.history) {
    if (entry.questionId) {
      askedIds.add(entry.questionId);
      candidates = updateProbabilities(candidates, entry.questionId, entry.answer);
      
      const q = questionBank.find(qt => qt.id === entry.questionId);
      if (q) lastCategory = q.cat;
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

  // Decision: guess or ask
  if (confidence >= CONFIDENCE_THRESHOLD || candidatesLeft <= 1 || questionCount >= MAX_QUESTIONS) {
    const finalPlayer = { ...player };
    // Generate tags for UI display
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

  const topQuestions = selectTopQuestions(candidates, askedIds, lastCategory, 5, memory);
  
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
