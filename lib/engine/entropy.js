import { evaluateQuestion } from "./utils";

/**
 * Calculates Shannon Entropy (Information Gain) for a question
 */
export function calculateInformationGain(candidates, q) {
  const totalWeight = candidates.reduce((s, c) => s + c.probability, 0);
  if (totalWeight <= 0) return 0;

  let yesWeight = 0;
  for (const c of candidates) {
    if (evaluateQuestion(q, c)) {
      yesWeight += c.probability;
    }
  }

  const pYes = yesWeight / totalWeight;
  const pNo = 1 - pYes;

  // Minimal split threshold to avoid useless questions
  if (pYes <= 0.001 || pNo <= 0.001) return 0;

  // Binary entropy formula
  return -(pYes * Math.log2(pYes)) - (pNo * Math.log2(pNo));
}
