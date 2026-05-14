import Groq from 'groq-sdk';

let groqClient = null;

function getGroqClient() {
  if (!groqClient) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is missing in environment variables");
    }
    groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groqClient;
}

export async function selectAndRephraseQuestion(candidates, historyText = "") {
  try {
    const candidatesText = candidates.map((c, i) => `${i}. ${c.ph}`).join('\n');

    const prompt = `We are playing IPL Akinator — a cricket mind-reading game show. I need to pick the best next question.

Previous questions and answers:
${historyText || "None yet — this is the opening question!"}

Candidate questions to choose from:
${candidatesText}

INSTRUCTIONS:
1. Rephrase the selected question to be EXTREMELY SHORT and SIMPLE (max 10-12 words).
2. It MUST be a direct question answerable with "Yes", "No", or "Maybe".
3. AVOID flowery language, complex metaphors, or compound "either/or" sentences.
4. DO NOT start every question with "Is your player..." — vary the structure slightly but keep it professional.
5. Use cricket terminology (IPL, franchise, etc.) only if it keeps the question simple.
6. Your reaction should be a single, brief, enthusiastic cricket comment (max 6 words).

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
          content: `You are an IPL cricket host. Keep questions extremely short, direct, and easy to understand. Respond ONLY as valid JSON.`
        },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.4,
      response_format: { type: "json_object" }
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    const data = JSON.parse(responseText);

    const idx = data.selected_index ?? 0;
    const selected = candidates[idx] || candidates[0];

    return {
      questionId: selected.id,
      text: data.rephrased_question || selected.ph,
      reaction: data.reaction || "Got it. Let me think about that..."
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


export async function generateGuessReaction(playerName) {
  try {
    const prompt = `You are an energetic, expert IPL cricket game-show host.
I am about to guess the player: "${playerName}".
Provide a short, thrilling build-up sentence (reaction) right before I make the final reveal.
Make it feel like a dramatic IPL commentary moment — reference the player's known identity if you can.

Return your response ONLY as a valid JSON object with the following structure, with no markdown formatting:
{
  "reaction": "..."
}

Example output:
{
  "reaction": "The stats are locked in, the analysis is complete... I'm very confident about this one!"
}`;

    const completion = await getGroqClient().chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Groq API error (Guess):", error);
    // Graceful fallback
    return {
      reaction: "I think I have it! Let's see if I'm right..."
    };
  }
}
