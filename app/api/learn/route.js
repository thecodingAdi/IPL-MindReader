import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MEMORY_FILE = path.join(process.cwd(), 'data', 'memory.json');

function readMemory() {
  try {
    if (!fs.existsSync(MEMORY_FILE)) return null;
    const data = fs.readFileSync(MEMORY_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to read memory:", e);
    return null;
  }
}

function saveMemory(memory) {
  try {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
    return true;
  } catch (e) {
    console.error("Failed to save memory:", e);
    return false;
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { isCorrect, playerId, actualName, history, guessedId, confidence } = data;

    let memory = readMemory();
    if (!memory) {
      memory = { version: 1, player_stats: {}, question_stats: {}, failed_games: [], pending_players: [] };
    }

    if (isCorrect) {
      // 1. Update Player Stats
      if (!memory.player_stats[playerId]) {
        memory.player_stats[playerId] = { correct_guesses: 0, total_games: 0 };
      }
      memory.player_stats[playerId].correct_guesses += 1;
      memory.player_stats[playerId].total_games += 1;

      // 2. Update Question Stats (Success paths)
      history.forEach(h => {
        if (!memory.question_stats[h.questionId]) {
          memory.question_stats[h.questionId] = { usage_count: 0, success_contribution: 0 };
        }
        memory.question_stats[h.questionId].usage_count += 1;
        memory.question_stats[h.questionId].success_contribution += 1;
      });
    } else {
      // Wrong Guess
      const logEntry = {
        actualName,
        guessedId,
        confidence,
        history,
        timestamp: new Date().toISOString()
      };
      memory.failed_games.push(logEntry);
      
      // Keep only last 100 failures
      if (memory.failed_games.length > 100) memory.failed_games.shift();

      // Check if actualName exists in player database (simplified check)
      // This is a placeholder for a real DB check, but we'll save it to pending
      if (actualName && !playerId) {
        if (!memory.pending_players.includes(actualName)) {
          memory.pending_players.push(actualName);
        }
      }
    }

    saveMemory(memory);

    return NextResponse.json({ success: true, message: "AI learned from this match!" });
  } catch (error) {
    console.error('Learn API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
