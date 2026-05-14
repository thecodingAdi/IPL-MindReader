import { SCORE_MAP, CATEGORY_RELIABILITY, DEFAULT_RELIABILITY } from "../constants";
import { normalizeAnswer, evaluateQuestion } from "./utils";
import questionBank from "../../data/questions_structured.js";

/**
 * Updates candidate probabilities using Bayesian likelihood
 */
export function updateProbabilities(candidates, qId, rawAnswer) {
  const q = questionBank.find(qt => qt.id === qId);
  if (!q) return candidates;

  const answer = normalizeAnswer(rawAnswer);
  const score = SCORE_MAP[answer] || 0;
  if (score === 0) return candidates;

  const reliability = CATEGORY_RELIABILITY[q.cat] || DEFAULT_RELIABILITY;
  const absScore = Math.abs(score);

  return candidates.map(c => {
    let weight = c.probability;
    const matches = evaluateQuestion(q, c);

    // Likelihood calculation
    let likelihood;
    if (score > 0) {
      // User said Yes/Maybe
      likelihood = matches ? reliability : (1 - reliability);
    } else {
      // User said No/Probably Not
      likelihood = !matches ? reliability : (1 - reliability);
    }

    // Blend likelihood based on answer strength (absScore)
    likelihood = 0.5 + (likelihood - 0.5) * absScore;

    // Apply Bayesian update
    weight *= (likelihood * 2);
    return { ...c, probability: weight };
  });
}
