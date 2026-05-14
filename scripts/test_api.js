// Quick API test — simulate a game start
const http = require('http');

const data = JSON.stringify({ history: [], questionCount: 0 });

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/akinator',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    try {
      const parsed = JSON.parse(body);
      console.log(`Action: ${parsed.action}`);
      console.log(`Question: ${parsed.question}`);
      console.log(`QuestionId: ${parsed.questionId}`);
      console.log(`Confidence: ${parsed.confidence}%`);
      console.log(`Remaining: ${parsed.remaining_candidates}`);
      console.log(`Reaction: ${parsed.reaction}`);
      if (parsed.topCandidates) {
        console.log(`Top candidates:`);
        parsed.topCandidates.forEach((c, i) => {
          console.log(`  ${i+1}. ${c.name} (${c.probability}%)`);
        });
      }
    } catch (e) {
      console.log('Response:', body);
    }
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

req.write(data);
req.end();
