import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Gemini is ONLY used to make questions sound more conversational
// The core logic runs locally in engine.js
export async function beautifyQuestion(rawQuestion, questionNumber) {
  if (!process.env.GEMINI_API_KEY) {
    return rawQuestion; // Fallback to raw question
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a fun, enthusiastic IPL cricket expert hosting an Akinator-style guessing game. 
Rewrite the following question to sound more engaging and conversational while keeping the EXACT same meaning.
Keep it short (1 sentence). Do NOT add extra questions. Do NOT change what is being asked.

Question #${questionNumber}: "${rawQuestion}"

Respond with ONLY the rewritten question, nothing else.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    return text || rawQuestion;
  } catch (error) {
    console.error("Gemini beautify failed, using raw question:", error.message);
    return rawQuestion; // Graceful fallback
  }
}

export async function beautifyGuess(playerName) {
  if (!process.env.GEMINI_API_KEY) {
    return playerName;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are an excited IPL cricket expert. Write a short, dramatic 1-line reveal for guessing that the player is "${playerName}". 
Example: "The Universe Boss himself... Chris Gayle!"
Respond with ONLY the reveal line.`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim() || playerName;
  } catch (error) {
    console.error("Gemini guess beautify failed:", error.message);
    return playerName;
  }
}
