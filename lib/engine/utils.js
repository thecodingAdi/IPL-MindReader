import { ANSWER_MAP } from "../constants";

export function normalizeAnswer(raw) {
  if (!raw) return "Dont Know";
  const key = raw.trim().toLowerCase();
  return ANSWER_MAP[key] || raw;
}

export function evaluateQuestion(q, player) {
  try {
    return q.eval(player);
  } catch (e) {
    console.error(`Error evaluating question ${q.id} for player ${player.id}:`, e);
    return false;
  }
}

export function formatPlayerTags(player) {
  return [
    player.role,
    ...(player.teams || []),
    player.is_overseas ? "Overseas" : "Indian",
    player.is_active ? "Active" : "Retired",
    player.is_opener ? "Opener" : null,
    player.is_middle ? "Middle Order" : null,
    player.is_finisher ? "Finisher" : null,
    player.is_wk ? "Wicketkeeper" : null,
    player.is_captain ? "Captain" : null,
    player.is_left_handed ? "Left-Handed" : null,
  ].filter(t => !!t);
}
