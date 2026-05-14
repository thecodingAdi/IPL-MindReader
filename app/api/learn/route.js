import { NextResponse } from 'next/server';
import { loadMemory, saveMemory } from '@/lib/services/memoryService';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const data = await request.json();
    const { isCorrect, playerId, actualName, history, guessedId } = data;

    const memory = loadMemory();

    // 1. Update Player Stats
    if (isCorrect && playerId) {
      if (!memory.player_stats[playerId]) memory.player_stats[playerId] = { correct_guesses: 0 };
      memory.player_stats[playerId].correct_guesses += 1;
    }

    // 2. Update Question Stats (Learning which questions are good splitters)
    if (history && Array.isArray(history)) {
      history.forEach(entry => {
        if (!memory.question_stats[entry.questionId]) {
          memory.question_stats[entry.questionId] = { usage_count: 0, success_contribution: 0 };
        }
        memory.question_stats[entry.questionId].usage_count += 1;
        if (isCorrect) {
          memory.question_stats[entry.questionId].success_contribution += 1;
        }
      });
    }

    // 3. Persist
    saveMemory(memory);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Learning API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
