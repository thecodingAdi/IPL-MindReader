import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
export const dynamic = 'force-dynamic';
import { runEngine } from '@/lib/engine';
import { selectAndRephraseQuestion, generateGuessReaction } from '@/lib/groq';

export async function POST(request) {
  try {
    const gameState = await request.json();

    if (!gameState || typeof gameState.questionCount !== 'number' || !Array.isArray(gameState.history)) {
      return NextResponse.json({ error: 'Invalid game state' }, { status: 400 });
    }

    // STEP 0: Load Memory
    let memory = null;
    try {
      const memoryPath = path.join(process.cwd(), 'data', 'memory.json');
      if (fs.existsSync(memoryPath)) {
        memory = JSON.parse(fs.readFileSync(memoryPath, 'utf8'));
      }
    } catch (e) {
      console.warn("Could not load memory, continuing without learning bias.");
    }

    // STEP 1: Run local robust engine
    const engineResult = runEngine(gameState, memory);


    let displayText = null;
    let reactionText = null;
    let finalAction = engineResult.action;

    if (engineResult.action === 'question_candidates') {
      const historyText = gameState.history
        .map(h => `Q: ${h.question} (Ans: ${h.answer})`)
        .join('\n');

      const groqData = await selectAndRephraseQuestion(engineResult.candidates, historyText);
      
      displayText = groqData.text;
      reactionText = groqData.reaction;
      engineResult.questionId = groqData.questionId;
      finalAction = 'question'; // Keep frontend happy
    } else if (engineResult.action === 'guess') {
      displayText = engineResult.text;
      const groqData = await generateGuessReaction(engineResult.text);
      reactionText = groqData.reaction || null;
    }

    return NextResponse.json({
      action: finalAction,
      question: displayText,
      questionId: engineResult.questionId || null,
      confidence: engineResult.confidence,
      remaining_candidates: engineResult.candidatesLeft,
      topCandidates: engineResult.topCandidates || [],
      reaction: reactionText,
      playerData: engineResult.player || null
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
