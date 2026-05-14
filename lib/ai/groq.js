import Groq from 'groq-sdk';
import { safeParseAIResponse, sanitizeText } from './aiUtils';

let groqClient = null;

function getGroqClient() {
  if (!process.env.GROQ_API_KEY) {
    return null;
  }
  if (!groqClient) {
    groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groqClient;
}

/**
 * Selects and rephrases a question using Groq (Llama 3.1)
 */
export async function selectAndRephraseQuestion(candidates, historyText = "") {
  try {
    const client = getGroqClient();
    if (!client) {
      console.warn("Groq API key missing, falling back to raw question.");
      return {
        questionId: candidates[0].id,
        text: candidates[0].ph,
        reaction: null
      };
    }

    const candidatesText = candidates.map((c, i) => `${i}. ${c.ph}`).join('\n');

    const prompt = `We are playing IPL Akinator — a cricket mind-reading game show. I need to pick the best next question.

Previous questions and answers:
${historyText || "None yet — this is the opening question!"}

Candidate questions to choose from:
${candidatesText}

INSTRUCTIONS:
1. Pick the best question from the candidates.
2. Rephrase it to be EXTREMELY SHORT and SIMPLE (max 10-12 words).
3. Provide a brief host reaction (max 6 words).

Respond ONLY as a valid JSON object:
{
  "selected_index": 0,
  "rephrased_question": "Short direct question?",
  "reaction": "Brief reaction!"
}`;

    const completion = await getGroqClient().chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an IPL cricket host. Respond ONLY as valid JSON.`
        },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.4,
      response_format: { type: "json_object" }
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    const data = safeParseAIResponse(responseText, { selected_index: 0, rephrased_question: candidates[0].ph, reaction: "Got it!" });

    const idx = data.selected_index ?? 0;
    const selected = candidates[idx] || candidates[0];

    return {
      questionId: selected.id,
      text: sanitizeText(data.rephrased_question, 80) || selected.ph,
      reaction: sanitizeText(data.reaction, 60) || "Got it. Let me think..."
    };
  } catch (error) {
    console.error("Groq API error (Selection):", error);
    return {
      questionId: candidates[0].id,
      text: candidates[0].ph,
      reaction: "I see. Let me think..."
    };
  }
}

/**
 * Generates a dramatic build-up reaction for the guess reveal
 */
export async function generateGuessReaction(playerName) {
  try {
    const client = getGroqClient();
    if (!client) {
      return { reaction: "I think I have it! Let's see if I'm right..." };
    }

    const prompt = `You are an energetic, expert IPL cricket game-show host.
I am about to guess the player: "${playerName}".
Provide a short, thrilling build-up sentence (reaction).

Respond ONLY as a valid JSON object:
{
  "reaction": "..."
}`;

    const completion = await getGroqClient().chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    return safeParseAIResponse(responseText, { reaction: "I think I have it! Let's see if I'm right..." });
  } catch (error) {
    console.error("Groq API error (Guess):", error);
    return {
      reaction: "I think I have it! Let's see if I'm right..."
    };
  }
}
