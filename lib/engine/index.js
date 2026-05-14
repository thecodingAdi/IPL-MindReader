import players from "../../data/players.json";
import questionBank from "../../data/questions_structured.js";
import { CONFIDENCE_THRESHOLD, MAX_QUESTIONS } from "../constants";
import { updateProbabilities } from "./bayesian";
import { selectTopQuestions } from "./selection";
import { formatPlayerTags } from "./utils";

export function runEngine(gameState, memory = null, excludedIds = []) {
  // 1. Initialize candidates with memory-biased priors
  let candidates = initializeCandidates(players, memory);

  // 2. Replay history to rebuild state
  const { askedIds, categoryHistory } = replayHistory(candidates, gameState.history);

  // 3. Prune excluded candidates (DRS Review)
  if (excludedIds && excludedIds.length > 0) {
    candidates = candidates.map(c => 
      excludedIds.includes(c.id) ? { ...c, probability: 0 } : c
    );
  }

  // 4. Calculate Rankings & Confidence
  let { player, confidence, candidatesLeft, topCandidates } = getRankings(candidates);
  const questionCount = gameState.history.length;

  // 5. Confidence acceleration (convergence optimization)
  if (confidence > 70 && questionCount > 5) {
    candidates = applyConfidenceBoost(candidates, player, confidence);
    // Recalculate rankings after boost
    ({ player, confidence, candidatesLeft, topCandidates } = getRankings(candidates));
  }

  // 6. Decision: Guess or Ask
  if (shouldGuess(confidence, candidatesLeft, questionCount)) {
    return {
      action: "guess",
      player: { ...player, tags: formatPlayerTags(player) },
      text: player.name,
      confidence: Math.round(confidence),
      candidatesLeft,
      topCandidates
    };
  }

  // 7. Select next questions
  const topQuestions = selectTopQuestions(candidates, askedIds, categoryHistory, questionCount, 5, memory);

  // Fallback to guess if no questions left
  if (topQuestions.length === 0) {
    return {
      action: "guess",
      player: { ...player, tags: formatPlayerTags(player) },
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

// ─────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────

function initializeCandidates(playerList, memory) {
  return playerList.map(p => {
    let baseWeight = Math.max(p.fame || 1, 0.5);
    if (memory?.player_stats?.[p.id]) {
      const stats = memory.player_stats[p.id];
      const boost = Math.min(2.0, 1.0 + (stats.correct_guesses || 0) * 0.1);
      baseWeight *= boost;
    }
    return { ...p, probability: baseWeight };
  });
}

function replayHistory(candidates, history) {
  const askedIds = new Set();
  const categoryHistory = [];
  
  for (const entry of history) {
    if (entry.questionId) {
      askedIds.add(entry.questionId);
      const q = questionBank.find(qt => qt.id === entry.questionId);
      if (q) categoryHistory.push(q.cat);
      
      // Update probability state based on answer
      // Note: candidates is modified in-place by some patterns, 
      // but here we use the map-return from updateProbabilities
      const updated = updateProbabilities(candidates, entry.questionId, entry.answer);
      for(let i=0; i<candidates.length; i++) {
          candidates[i].probability = updated[i].probability;
      }
    }
  }
  return { askedIds, categoryHistory };
}

function getRankings(candidates) {
  const sorted = [...candidates].sort((a, b) => b.probability - a.probability);
  const total = candidates.reduce((s, c) => s + c.probability, 0);
  const topProb = sorted[0]?.probability || 0;
  const confidence = total > 0 ? (topProb / total) * 100 : 0;
  const aliveCount = sorted.filter(c => c.probability > topProb * 0.001).length;

  return {
    player: sorted[0],
    confidence,
    candidatesLeft: aliveCount,
    topCandidates: sorted.slice(0, 3).map(c => ({
      ...c,
      probability: total > 0 ? ((c.probability / total) * 100).toFixed(1) : 0,
      tags: formatPlayerTags(c)
    }))
  };
}

function applyConfidenceBoost(candidates, leader, confidence) {
  const boostFactor = 1 + (confidence - 70) / 300;
  return candidates.map(c => 
    c.id === leader.id ? { ...c, probability: c.probability * boostFactor } : c
  );
}

function shouldGuess(confidence, left, count) {
  return confidence >= CONFIDENCE_THRESHOLD || left <= 1 || count >= MAX_QUESTIONS;
}
