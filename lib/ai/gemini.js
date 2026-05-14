import { GoogleGenerativeAI } from "@google/generative-ai";
import { sanitizeText } from './aiUtils';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * Gemini is used as a beautifier fallback
 */
export async function beautifyQuestion(rawQuestion, questionNumber) {
  if (!process.env.GEMINI_API_KEY) return rawQuestion;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a fun, enthusiastic IPL cricket expert.
Rewrite this question to sound more engaging: "${rawQuestion}"
Keep it short (1 sentence).

Respond with ONLY the rewritten question.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    return sanitizeText(text, 100) || rawQuestion;
  } catch (error) {
    console.error("Gemini beautify failed:", error.message);
    return rawQuestion;
  }
}

export async function beautifyGuess(playerName) {
  if (!process.env.GEMINI_API_KEY) return playerName;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Write a short, dramatic reveal line for guessing "${playerName}".
Example: "The Universe Boss himself... Chris Gayle!"
Respond with ONLY the reveal line.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    return sanitizeText(text, 120) || playerName;
  } catch (error) {
    console.error("Gemini guess beautify failed:", error.message);
    return playerName;
  }
}
