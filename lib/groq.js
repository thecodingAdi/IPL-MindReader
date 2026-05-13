import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function selectAndRephraseQuestion(candidates, historyText = "") {
  try {
    const candidatesText = candidates.map((c, i) => `${i}. ${c.ph}`).join('\n');
    
    const prompt = `We are playing IPL Akinator. I need to pick the next best question to ask.
Previous questions and answers:
${historyText || "None yet."}

Top candidate questions to ask next:
${candidatesText}

Pick the best question from the list that flows naturally given the conversation history. 
Respond ONLY as a valid JSON object with this structure:
{
  "selected_index": 0,
  "rephrased_question": "Your natural, concise sounding question here?",
  "reaction": "A very short (1 sentence) reaction to the last answer."
}

Keep the question simple, direct, and professional. Avoid "tricky" wording.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: "You are a helpful IPL cricket expert. Always return valid JSON only." },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    const data = JSON.parse(responseText);
    
    const idx = data.selected_index ?? 0;
    const selected = candidates[idx] || candidates[0];
    
    return {
      questionId: selected.id,
      text: data.rephrased_question || selected.ph,
      reaction: data.reaction || "Got it. Next question..."
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

Return your response ONLY as a valid JSON object with the following structure, with no markdown formatting:
{
  "reaction": "..."
}

Example output:
{
  "reaction": "I've run the numbers, analyzed the stats, and I'm very confident I know who this is..."
}`;

    const completion = await groq.chat.completions.create({
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
