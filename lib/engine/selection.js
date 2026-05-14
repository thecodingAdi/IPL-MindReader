import { calculateInformationGain } from "./entropy";
import questionBank from "../../data/questions_structured.js";

export function selectTopQuestions(candidates, askedIds, categoryHistory, questionCount, n = 5, memory = null) {
  const alive = candidates.filter(c => c.probability > 1e-6);
  if (alive.length <= 1) return [];

  const phase = getGamePhase(questionCount);
  const categoryCounts = getCategoryCounts(categoryHistory);
  const recentCats = categoryHistory.slice(-3);

  const scored = [];

  for (const q of questionBank) {
    if (askedIds.has(q.id)) continue;

    let score = calculateInformationGain(alive, q);
    if (score <= 0) continue;

    // Apply heuristics
    score = applyAntiRepetitionPenalty(score, q, recentCats);
    score = applyCategoryBudgetPenalty(score, q, categoryCounts);
    score = applyPhaseBias(score, q, phase);
    score = applyNationalityLogic(score, q, askedIds);
    score = applyMemoryBias(score, q, memory);

    scored.push({ score, q });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(item => item.q);
}

function getGamePhase(count) {
  if (count < 5) return 1;
  if (count < 10) return 2;
  return 3;
}

function getCategoryCounts(history) {
  const counts = {};
  for (const cat of history) {
    counts[cat] = (counts[cat] || 0) + 1;
  }
  return counts;
}

function applyAntiRepetitionPenalty(score, q, recent) {
  if (recent.length >= 1 && q.cat === recent[recent.length - 1]) return score * 0.4;
  if (recent.length >= 2 && q.cat === recent[recent.length - 2]) return score * 0.7;
  if (recent.length >= 3 && q.cat === recent[recent.length - 3]) return score * 0.85;
  return score;
}

function applyCategoryBudgetPenalty(score, q, counts) {
  const count = counts[q.cat] || 0;
  if (count >= 3) return score * 0.2;
  if (count >= 2) return score * 0.5;
  return score;
}

function applyPhaseBias(score, q, phase) {
  const tier = q.tier || 2;
  if (phase === 1) {
    if (tier === 1) return score * 1.3;
    if (tier === 3) return score * 0.6;
  } else if (phase === 2) {
    if (tier === 2) return score * 1.1;
  } else {
    if (tier === 3) return score * 1.2;
    if (q.cat === 'team') return score * 1.15;
  }
  return score;
}

function applyNationalityLogic(score, q, askedIds) {
  const specificNats = ['aus', 'wi', 'sa', 'eng', 'nz', 'sl', 'afg'];
  if (specificNats.includes(q.id)) {
    if (!askedIds.has('overseas') && !askedIds.has('indian')) {
      return score * 0.3;
    }
  }
  return score;
}

function applyMemoryBias(score, q, memory) {
  if (memory?.question_stats?.[q.id]) {
    const stats = memory.question_stats[q.id];
    const usageCount = stats.usage_count || 1;
    const successRate = (stats.success_contribution || 0) / usageCount;
    return score * (1.0 + successRate * 0.2);
  }
  return score;
}
