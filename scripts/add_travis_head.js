const fs = require('fs');
const path = require('path');

const PLAYERS_FILE = path.join(__dirname, '..', 'data', 'players.json');

const travisHead = {
  "id": "tm_head",
  "name": "Travis Head",
  "role": "Batsman",
  "teams": ["SRH", "RCB"],
  "seasons": [2016, 2017, 2024],
  "debut": 2016,
  "last_year": 2024,
  "num_seasons": 3,
  "runs": 850,
  "wickets": 2,
  "hi_score": 102,
  "centuries": 1,
  "fifties": 5,
  "is_opener": true,
  "is_middle": false,
  "is_finisher": false,
  "is_wk": false,
  "is_overseas": true,
  "is_active": true,
  "pom": 4,
  "titles": 1,
  "sr": 175.5,
  "econ": 10.5,
  "matches": 25,
  "fours": 90,
  "sixes": 50,
  "catches": 10,
  "fame": 120.0
};

const players = JSON.parse(fs.readFileSync(PLAYERS_FILE, 'utf8'));

// Check if already exists
if (!players.find(p => p.id === 'tm_head')) {
  players.push(travisHead);
  fs.writeFileSync(PLAYERS_FILE, JSON.stringify(players, null, 2));
  console.log("✅ Added Travis Head to players.json");
} else {
  console.log("ℹ️ Travis Head already exists");
}
