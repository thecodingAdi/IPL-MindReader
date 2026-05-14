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

// Travis Head (TM Head) answers
const ANSWERS = {
  role_bat: 'Yes', role_bowl: 'No', role_ar: 'No', role_wk: 'No',
  overseas: 'Yes', indian: 'No',
  aus: 'Yes', wi: 'No', sa: 'No', eng: 'No',
  opener: 'Yes', middle: 'No', finisher: 'No',
  active: 'Yes', veteran: 'No', early_debut: 'No', recent_debut: 'No', retired: 'No',
  pace: 'No', spin: 'No',
  captain: 'No', lefty: 'Yes', explosive: 'Yes', journeyman: 'No', one_team: 'No',
  century: 'Yes', r1k: 'Yes', r3k: 'No', r5k: 'No',
  t_csk: 'No', t_mi: 'No', t_rcb: 'Yes', t_srh: 'Yes', t_dc: 'No', t_rr: 'No',
  m100: 'No', m200: 'No',
};

async function playGame() {
  console.log("🏏 Playing as TRAVIS HEAD (TM Head)...\n");
  let history = [];
  for (let turn = 0; turn < 20; turn++) {
    const result = await ask(history);
    if (result.action === 'guess') {
      console.log(`\n🎯 GUESS after ${history.length} questions:`);
      console.log(`   Player: ${result.question}`);
      console.log(`   Confidence: ${result.confidence}%`);
      console.log(`   Correct: ${['Travis Head', 'TM Head'].includes(result.question) ? '✅ YES!' : '❌ NO'}`);
      return;
    }
    const qId = result.questionId;
    const answer = ANSWERS[qId] || 'Dont Know';
    console.log(`Q${turn+1}: ${result.question}`);
    console.log(`   [${qId}] → ${answer} | Confidence: ${result.confidence}% | Left: ${result.remaining_candidates}`);
    if (result.reaction) console.log(`   🎙️ "${result.reaction}"`);
    history.push({ question: result.question, questionId: qId, answer });
  }
  console.log("\n⚠️ Reached max questions without a guess.");
}

playGame().catch(err => console.error('Error:', err.message));
