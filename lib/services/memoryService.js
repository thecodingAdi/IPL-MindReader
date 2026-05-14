import fs from 'fs';
import path from 'path';

/**
 * Memory Service Abstraction
 * Currently uses local JSON filesystem, but can be easily swapped for Redis/SQL.
 */

const MEMORY_PATH = path.join(process.cwd(), 'data', 'memory.json');

export function loadMemory() {
  try {
    if (fs.existsSync(MEMORY_PATH)) {
      const data = fs.readFileSync(MEMORY_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Memory Service: Failed to load memory:", e);
  }
  return { player_stats: {}, question_stats: {} };
}

export function saveMemory(memory) {
  try {
    // Ensure data directory exists
    const dir = path.dirname(MEMORY_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(MEMORY_PATH, JSON.stringify(memory, null, 2));
    return true;
  } catch (e) {
    console.error("Memory Service: Failed to save memory:", e);
    return false;
  }
}
