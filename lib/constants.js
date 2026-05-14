/**
 * Centralized Constants for IPL MindReader
 */

export const CONFIDENCE_THRESHOLD = 88;
export const MAX_QUESTIONS = 15;

export const TEAM_COLORS = {
  csk: '#facc15',
  mi: '#00d9ff',
  rcb: '#ef4444',
  kkr: '#a855f7',
  srh: '#f97316',
  dc: '#3b82f6',
  rr: '#ec4899',
  pbks: '#ef4444',
  gt: '#0f172a',
  lsg: '#06b6d4',
  dd: '#3b82f6'
};

export const ANSWER_MAP = {
  "yes": "Yes",
  "probably": "Maybe",
  "dunno": "Dont Know",
  "probably_not": "Probably Not",
  "no": "No",
};

export const SCORE_MAP = {
  "Yes": 1.0,
  "Maybe": 0.7,
  "Dont Know": 0,
  "Probably Not": -0.7,
  "No": -1.0
};

export const CATEGORY_RELIABILITY = {
  "nat": 0.98,
  "team": 0.95,
  "role": 0.88,
  "era": 0.92,
  "pos": 0.82,
  "bat": 0.88,
  "bowl": 0.90,
  "exp": 0.92,
  "award": 0.94,
  "style": 0.82,
  "trait": 0.80,
};

export const DEFAULT_RELIABILITY = 0.85;
