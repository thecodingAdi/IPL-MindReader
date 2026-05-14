// Multi-turn game test — thinking of Virat Kohli
const http = require('http');

async function ask(history) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ history, questionCount: history.length });
    const options = {
      hostname: 'localhost', port: 3001, path: '/api/akinator',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) },
    };
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => { try { resolve(JSON.parse(body)); } catch (e) { reject(e); } });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Kohli: Batsman, RCB, Indian, active, opener+middle, right-handed, captain, veteran, 8000+ runs
const ANSWERS = {
  role_bat: 'Yes', role_bowl: 'No', role_ar: 'No', role_wk: 'No',
  overseas: 'No', indian: 'Yes',
  opener: 'Yes', middle: 'Yes', finisher: 'No',
  active: 'Yes', veteran: 'Yes', early_debut: 'Yes', recent_debut: 'No', retired: 'No',
  pace: 'No', spin: 'No',
  captain: 'Yes', lefty: 'No', explosive: 'No', journeyman: 'No', one_team: 'Yes',
  r1k: 'Yes', r3k: 'Yes', r5k: 'Yes', century: 'Yes', fifties_10: 'Yes', six_hitter: 'Yes',
  w50: 'No', w100: 'No', econ_tight: 'No',
  pom5: 'Yes', titles: 'Yes', multi_titles: 'No',
  t_csk: 'No', t_mi: 'No', t_rcb: 'Yes', t_kkr: 'No', t_srh: 'No',
  t_dc: 'No', t_rr: 'No', t_pbks: 'No', t_gt: 'No', t_lsg: 'No',
  m100: 'Yes', m200: 'Yes',
  aus: 'No', wi: 'No', sa: 'No', eng: 'No', nz: 'No', sl: 'No', afg: 'No',
};

async function playGame() {
  console.log("🏏 Playing as VIRAT KOHLI...\n");
  let history = [];
  for (let turn = 0; turn < 15; turn++) {
    const result = await ask(history);
    if (result.action === 'guess') {
      console.log(`\n🎯 GUESS after ${history.length} questions:`);
      console.log(`   Player: ${result.question}`);
      console.log(`   Confidence: ${result.confidence}%`);
      console.log(`   Correct: ${result.question === 'V Kohli' ? '✅ YES!' : '❌ NO (expected V Kohli)'}`);
      return;
    }
    const qId = result.questionId;
    const answer = ANSWERS[qId] || 'Dont Know';
    console.log(`Q${turn+1}: ${result.question}`);
    console.log(`   [${qId}] → ${answer} | Confidence: ${result.confidence}% | Left: ${result.remaining_candidates}`);
    history.push({ question: result.question, questionId: qId, answer });
  }
  console.log("\n⚠️ Reached max questions without a guess.");
}

playGame().catch(err => console.error('Error:', err.message));
