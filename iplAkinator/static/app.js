/**
 * IPL Akinator — Frontend (API-driven)
 * Communicates with Flask backend for game logic.
 */

const API = '';
let sessionId = null;
let stats = JSON.parse(localStorage.getItem('iplAki') || '{"g":0,"w":0,"l":0}');

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  fetch(`${API}/api/info`).then(r => r.json()).then(d => {
    document.getElementById('plCount').textContent = d.player_count;
  }).catch(() => {});

  document.getElementById('btnStart').addEventListener('click', newGame);
  document.getElementById('btnCorrect').addEventListener('click', () => handleResult(true));
  document.getElementById('btnWrong').addEventListener('click', () => handleResult(false));

  // Answer buttons
  document.querySelectorAll('.ba').forEach(btn => {
    btn.addEventListener('click', () => sendAnswer(btn.dataset.a));
  });

  updateStats();
  initParticles();
});

// ─── VIEWS ───
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'viewStats') updateStats();
}

// ─── GAME ───
async function newGame() {
  showView('viewGame');
  setMood('thinking');
  showTyping(true);
  document.getElementById('history').innerHTML = '';

  try {
    const res = await fetch(`${API}/api/start`, { method: 'POST' });
    const data = await res.json();
    sessionId = data.session_id;

    if (data.status === 'question') {
      showQuestion(data);
    } else {
      showGuess(data);
    }
  } catch (err) {
    console.error(err);
    alert('Server error. Make sure server.py is running!');
  }
}

function retryGame() { newGame(); }

async function sendAnswer(ans) {
  const qText = document.getElementById('qText').textContent;
  const labels = { yes: 'Yes', probably: 'Probably', dunno: "Don't Know", probably_not: 'Prob. Not', no: 'No' };
  const cls = { yes: 'y', probably: 'py', dunno: 'dk', probably_not: 'pn', no: 'n' };

  // Add to history
  const hist = document.getElementById('history');
  const qNum = document.getElementById('qn').textContent;
  const item = document.createElement('div');
  item.className = 'hi';
  item.innerHTML = `<span class="hi-q">Q${qNum}: ${qText}</span><span class="hi-a ${cls[ans]}">${labels[ans]}</span>`;
  hist.prepend(item);

  // Show thinking
  showTyping(true);
  setMood('thinking');
  disableAnswers(true);

  try {
    const res = await fetch(`${API}/api/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, answer: ans })
    });
    const data = await res.json();

    if (data.status === 'question') {
      showQuestion(data);
    } else {
      showGuess(data);
    }
  } catch (err) {
    console.error(err);
    alert('Server error!');
  }
}

function showQuestion(data) {
  // Short delay for realism
  setTimeout(() => {
    showTyping(false);
    document.getElementById('qText').textContent = data.question;
    document.getElementById('qText').style.display = 'block';
    document.getElementById('qn').textContent = data.q_number;
    document.getElementById('progBar').style.width = `${(data.q_number / 12) * 100}%`;
    document.getElementById('candN').textContent = data.candidates_left;

    const conf = data.confidence;
    document.getElementById('confBar').style.width = `${conf}%`;
    document.getElementById('confVal').textContent = `${conf}%`;
    const bar = document.getElementById('confBar');
    if (conf >= 65) bar.style.background = 'linear-gradient(90deg,#22d3a8,#10b981)';
    else if (conf >= 35) bar.style.background = 'linear-gradient(90deg,#facc15,#f59e0b)';
    else bar.style.background = 'linear-gradient(90deg,#38bdf8,#6366f1)';

    setMood('thinking');
    disableAnswers(false);
  }, 300 + Math.random() * 400);
}

function showGuess(data) {
  const g = data.guess;
  const alts = data.alternatives || [];

  if (g) {
    setMood('excited');
    document.getElementById('resH').textContent = "I think your player is...";
    const card = document.getElementById('card');
    card.innerHTML = `
      <div class="pn">${g.name}</div>
      <span class="pr">${g.role}</span>
      <div class="sg">
        <div class="si"><div class="si-v">${g.runs.toLocaleString()}</div><div class="si-l">Runs</div></div>
        <div class="si"><div class="si-v">${g.wickets}</div><div class="si-l">Wickets</div></div>
        <div class="si"><div class="si-v">${g.matches}</div><div class="si-l">Matches</div></div>
        <div class="si"><div class="si-v">${g.hi_score}</div><div class="si-l">High Score</div></div>
        <div class="si"><div class="si-v">${g.centuries}</div><div class="si-l">100s</div></div>
        <div class="si"><div class="si-v">${g.fifties}</div><div class="si-l">50s</div></div>
        <div class="si"><div class="si-v">${g.sr}</div><div class="si-l">Strike Rate</div></div>
        <div class="si"><div class="si-v">${g.pom}</div><div class="si-l">POTM</div></div>
        <div class="si"><div class="si-v">${g.debut}-${g.last_year}</div><div class="si-l">Career</div></div>
      </div>
      <div class="tb">${g.teams.map(t => `<span class="tg">${t}</span>`).join('')}</div>
      <div class="sb">${g.num_seasons} seasons: ${g.seasons.join(', ')}</div>
    `;
  } else {
    setMood('sad');
    document.getElementById('resH').textContent = "I'm stumped!";
    document.getElementById('card').innerHTML = '<div class="pn">Could not determine</div>';
  }

  // Store alternatives for wrong panel
  window._alts = alts;

  document.getElementById('resBtns').style.display = 'flex';
  document.getElementById('panelOk').style.display = 'none';
  document.getElementById('panelFail').style.display = 'none';
  document.getElementById('confetti').innerHTML = '';
  showView('viewResult');
}

async function handleResult(correct) {
  document.getElementById('resBtns').style.display = 'none';
  stats.g++;
  if (correct) {
    stats.w++;
    setMood('excited');
    document.getElementById('panelOk').style.display = 'block';
    spawnConfetti();
  } else {
    stats.l++;
    setMood('sad');
    const list = document.getElementById('altList');
    list.innerHTML = (window._alts || []).map(p =>
      `<div class="alt"><span class="alt-n">${p.name}</span><span class="alt-i">${p.role} · ${p.teams.join(', ')}</span></div>`
    ).join('');
    document.getElementById('panelFail').style.display = 'block';
  }
  localStorage.setItem('iplAki', JSON.stringify(stats));

  // Report to backend
  try {
    await fetch(`${API}/api/result`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, correct })
    });
  } catch (e) {}
}

// ─── UI HELPERS ───
function showTyping(on) {
  document.getElementById('typing').classList.toggle('on', on);
  document.getElementById('qText').style.display = on ? 'none' : 'block';
}

function disableAnswers(off) {
  document.querySelectorAll('.ba').forEach(b => {
    b.disabled = off;
    b.style.opacity = off ? '.4' : '1';
    b.style.pointerEvents = off ? 'none' : 'auto';
  });
}

function setMood(mood) {
  ['gMouthSm', 'gMouthRes'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.className = 'g-mouth ' + mood;
  });
}

// ─── STATS ───
function updateStats() {
  document.getElementById('stGames').textContent = stats.g;
  document.getElementById('stWins').textContent = stats.w;
  document.getElementById('stLoss').textContent = stats.l;
  document.getElementById('stPct').textContent = stats.g ? Math.round(stats.w / stats.g * 100) + '%' : '0%';
}
function resetStats() {
  stats = { g: 0, w: 0, l: 0 };
  localStorage.setItem('iplAki', JSON.stringify(stats));
  updateStats();
}

// ─── CONFETTI ───
function spawnConfetti() {
  const wrap = document.getElementById('confetti');
  const colors = ['#38bdf8','#a78bfa','#22d3a8','#facc15','#f87171','#fb923c','#ec4899'];
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('div');
    p.className = 'cp';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDelay = Math.random() * 2 + 's';
    p.style.animationDuration = (2 + Math.random() * 2) + 's';
    p.style.width = (5 + Math.random() * 7) + 'px';
    p.style.height = (5 + Math.random() * 7) + 'px';
    p.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
    wrap.appendChild(p);
  }
}

// ─── PARTICLES ───
function initParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w, h, pts = [];
  function resize() { w = c.width = innerWidth; h = c.height = innerHeight; }
  resize(); addEventListener('resize', resize);
  for (let i = 0; i < 35; i++) {
    pts.push({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.4+.4,
      dx: (Math.random()-.5)*.25, dy: (Math.random()-.5)*.25, o: Math.random()*.25+.05 });
  }
  (function draw() {
    ctx.clearRect(0,0,w,h);
    for (const p of pts) {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(14,165,233,${p.o})`; ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    }
    requestAnimationFrame(draw);
  })();
}
