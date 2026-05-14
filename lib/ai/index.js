import { selectAndRephraseQuestion, generateGuessReaction } from './groq';
import { beautifyQuestion, beautifyGuess } from './gemini';

/**
 * AI Service Orchestrator
 * Prioritizes Groq for game logic rephrasing.
 * Uses Gemini as a secondary beautifier if needed.
 */

export async function getNextQuestionAI(candidates, historyText) {
  try {
    // Primary: Groq rephrasing
    return await selectAndRephraseQuestion(candidates, historyText);
  } catch (e) {
    console.error("AI Orchestrator: Groq failed, falling back to Gemini beautify", e);
    
    // Fallback: Gemini rephrasing of the top candidate
    const top = candidates[0];
    const beautiful = await beautifyQuestion(top.ph, "Next");
    
    return {
      questionId: top.id,
      text: beautiful,
      reaction: "I'm narrowing it down!"
    };
  }
}

export async function getGuessReactionAI(playerName) {
  try {
    const groqReaction = await generateGuessReaction(playerName);
    return groqReaction.reaction;
  } catch (e) {
    console.error("AI Orchestrator: Groq guess reaction failed, trying Gemini", e);
    return await beautifyGuess(playerName);
  }
}
