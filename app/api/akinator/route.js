import { NextResponse } from 'next/server';
import { runEngine } from '@/lib/engine';
import { getNextQuestionAI, getGuessReactionAI } from '@/lib/ai';
import { loadMemory } from '@/lib/services/memoryService';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const gameState = await request.json();

    // Basic Validation
    if (!gameState || !Array.isArray(gameState.history)) {
      return NextResponse.json({ error: 'Invalid game state received' }, { status: 400 });
    }

    // 1. Load Learning Memory
    const memory = loadMemory();

    // 2. Run the deterministic reasoning engine
    const engineResult = runEngine(gameState, memory, gameState.excludedIds || []);

    // 3. AI Enrichment (Conversational Layer)
    let displayText = engineResult.text;
    let reactionText = null;
    let finalAction = engineResult.action;

    if (engineResult.action === 'question_candidates') {
      const historyText = gameState.history
        .map(h => `Q: ${h.question} (Ans: ${h.answer})`)
        .join('\n');

      // AI Orchestrator picks and rephrases the best question
      const aiData = await getNextQuestionAI(engineResult.candidates, historyText);
      
      displayText = aiData.text;
      reactionText = aiData.reaction;
      engineResult.questionId = aiData.questionId;
      finalAction = 'question'; // Match frontend expected key
    } 
    else if (engineResult.action === 'guess') {
      // AI Orchestrator generates a dramatic build-up
      reactionText = await getGuessReactionAI(engineResult.text);
    }

    // 4. Consistent Response Format
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
    console.error('CRITICAL API ERROR:', error);
    return NextResponse.json(
      { error: 'AI Brain overload! Please try again.' },
      { status: 500 }
    );
  }
}
