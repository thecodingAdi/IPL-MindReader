// Multi-turn game test — thinking of MS Dhoni
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
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error(`Parse error: ${body}`)); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// MS Dhoni answers:
// role_bat → Yes (WK-Batsman)
// overseas → No (Indian)
// active → Yes (in data)
// captain → Yes
// role_wk → Yes
// finisher → Yes
// t_csk → Yes

const ANSWERS_FOR_DHONI = {
  role_bat: 'Yes',
  role_bowl: 'No',
  role_ar: 'No',
  role_wk: 'Yes',
  overseas: 'No',
  indian: 'Yes',
  opener: 'No',
  middle: 'Yes',
  finisher: 'Yes',
  active: 'Yes',
  veteran: 'Yes',
  early_debut: 'Yes',
  recent_debut: 'No',
  retired: 'No',
  pace: 'No',
  spin: 'No',
  captain: 'Yes',
  lefty: 'No',
  explosive: 'No',  // Dhoni SR ~138, but not "explosive"
  journeyman: 'No',
  one_team: 'No',   // CSK + RPS
  r1k: 'Yes',
  r3k: 'Yes',
  r5k: 'Yes',
  century: 'No',
  fifties_10: 'Yes',
  six_hitter: 'Yes',
  w50: 'No',
  w100: 'No',
  econ_tight: 'No',
  pom5: 'Yes',
  titles: 'Yes',
  multi_titles: 'Yes',
  t_csk: 'Yes',
  t_mi: 'No',
  t_rcb: 'No',
  t_kkr: 'No',
  t_srh: 'No',
  t_dc: 'No',
  t_rr: 'No',
  t_pbks: 'No',
  t_gt: 'No',
  t_lsg: 'No',
  m100: 'Yes',
  m200: 'Yes',
  aus: 'No', wi: 'No', sa: 'No', eng: 'No', nz: 'No', sl: 'No', afg: 'No',
};

async function playGame() {
  console.log("🏏 Playing as MS DHONI...\n");
  let history = [];

  for (let turn = 0; turn < 15; turn++) {
    const result = await ask(history);

    if (result.action === 'guess') {
      console.log(`\n🎯 GUESS after ${history.length} questions:`);
      console.log(`   Player: ${result.question}`);
      console.log(`   Confidence: ${result.confidence}%`);
      console.log(`   Correct: ${result.question === 'MS Dhoni' ? '✅ YES!' : '❌ NO'}`);
      return;
    }

    const qId = result.questionId;
    const answer = ANSWERS_FOR_DHONI[qId] || 'Dont Know';

    console.log(`Q${turn+1}: ${result.question}`);
    console.log(`   [${qId}] → ${answer} | Confidence: ${result.confidence}% | Left: ${result.remaining_candidates}`);
    if (result.reaction) console.log(`   🎙️ "${result.reaction}"`);

    history.push({
      question: result.question,
      questionId: qId,
      answer: answer
    });
  }

  console.log("\n⚠️ Reached max questions without a guess.");
}

playGame().catch(err => console.error('Error:', err.message));
