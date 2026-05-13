/**
 * IPL Akinator — Advanced AI Engine v3
 * All players | Entropy-based | Akinator-style UX
 * Features: New Game, Retry, Stats, Question History, Confetti
 */

// ===== STATE =====
let candidates = [];
let questionsAsked = 0;
const MAX_Q = 12;
let askedIds = new Set();
let history = [];
let currentQ = null;
let lastGuess = null;

// Stats (persisted in localStorage)
let stats = JSON.parse(localStorage.getItem('iplAkinatorStats') || '{"games":0,"wins":0,"losses":0}');

// ===== QUESTIONS (50+) =====
const QS = [
  // Role
  {id:'bat',t:'Is your player primarily a Batsman?',f:p=>p.role==='Batsman'||p.role==='Wicketkeeper-Batsman',c:'role'},
  {id:'bowl',t:'Is your player primarily a Bowler?',f:p=>p.role==='Bowler',c:'role'},
  {id:'ar',t:'Is your player an All-rounder?',f:p=>p.role==='All-rounder',c:'role'},
  {id:'wk',t:'Is your player a Wicketkeeper?',f:p=>p.is_wk,c:'role'},

  // Origin
  {id:'ovs',t:'Is your player an overseas (non-Indian) player?',f:p=>p.is_overseas,c:'nat'},

  // Position
  {id:'open',t:'Is your player an opener (bats #1 or #2)?',f:p=>p.is_opener,c:'pos'},
  {id:'mid',t:'Does your player bat in the middle order (#3-#5)?',f:p=>p.is_middle,c:'pos'},
  {id:'fin',t:'Is your player a finisher / lower-order power hitter?',f:p=>p.is_finisher,c:'pos'},

  // Activity
  {id:'act',t:'Is your player currently active in the IPL (2024 or later)?',f:p=>p.is_active,c:'era'},
  {id:'vet',t:'Has your player played 10+ IPL seasons?',f:p=>p.num_seasons>=10,c:'era'},
  {id:'old',t:'Did your player debut before 2012?',f:p=>p.debut<2012,c:'era'},
  {id:'new',t:'Did your player debut in 2018 or later?',f:p=>p.debut>=2018,c:'era'},
  {id:'long',t:'Has your player played 15+ IPL seasons?',f:p=>p.num_seasons>=15,c:'era'},
  {id:'short',t:'Has your player played fewer than 3 IPL seasons?',f:p=>p.num_seasons<3,c:'era'},

  // Batting
  {id:'r500',t:'Has your player scored 500+ IPL runs?',f:p=>p.runs>=500,c:'perf'},
  {id:'r1k',t:'Has your player scored 1,000+ IPL runs?',f:p=>p.runs>=1000,c:'perf'},
  {id:'r3k',t:'Has your player scored 3,000+ IPL runs?',f:p=>p.runs>=3000,c:'perf'},
  {id:'r5k',t:'Has your player scored 5,000+ IPL runs?',f:p=>p.runs>=5000,c:'perf'},
  {id:'100',t:'Has your player scored an IPL century?',f:p=>p.centuries>0,c:'perf'},
  {id:'m100',t:'Has your player scored 3+ IPL centuries?',f:p=>p.centuries>=3,c:'perf'},
  {id:'50s',t:'Has your player scored 10+ IPL fifties?',f:p=>p.fifties>=10,c:'perf'},
  {id:'50s30',t:'Has your player scored 30+ IPL fifties?',f:p=>p.fifties>=30,c:'perf'},
  {id:'hi100',t:'Is your player\'s highest IPL score above 100?',f:p=>p.hi_score>100,c:'perf'},
  {id:'sr140',t:'Does your player have a strike rate above 140?',f:p=>p.sr>140,c:'perf'},
  {id:'sr160',t:'Does your player have a strike rate above 160?',f:p=>p.sr>160,c:'perf'},
  {id:'6s50',t:'Has your player hit 50+ sixes in the IPL?',f:p=>p.sixes>=50,c:'perf'},
  {id:'6s100',t:'Has your player hit 100+ sixes in the IPL?',f:p=>p.sixes>=100,c:'perf'},
  {id:'4s100',t:'Has your player hit 100+ fours in the IPL?',f:p=>p.fours>=100,c:'perf'},

  // Bowling
  {id:'w20',t:'Has your player taken 20+ IPL wickets?',f:p=>p.wickets>=20,c:'perf'},
  {id:'w50',t:'Has your player taken 50+ IPL wickets?',f:p=>p.wickets>=50,c:'perf'},
  {id:'w100',t:'Has your player taken 100+ IPL wickets?',f:p=>p.wickets>=100,c:'perf'},
  {id:'w150',t:'Has your player taken 150+ IPL wickets?',f:p=>p.wickets>=150,c:'perf'},
  {id:'ec7',t:'Does your player have a bowling economy under 7.5?',f:p=>p.econ!==null&&p.econ<7.5,c:'perf'},
  {id:'ec9',t:'Does your player have a bowling economy over 9?',f:p=>p.econ!==null&&p.econ>9,c:'perf'},

  // Awards
  {id:'pom5',t:'Has your player won 5+ Player of the Match awards?',f:p=>p.pom>=5,c:'aw'},
  {id:'pom10',t:'Has your player won 10+ POTM awards?',f:p=>p.pom>=10,c:'aw'},
  {id:'ttl',t:'Has your player been part of a title-winning team?',f:p=>p.titles>0,c:'aw'},
  {id:'ttl3',t:'Has your player won 3+ IPL titles?',f:p=>p.titles>=3,c:'aw'},

  // Teams
  {id:'csk',t:'Has your player played for CSK (Chennai Super Kings)?',f:p=>p.teams.includes('CSK'),c:'team'},
  {id:'mi',t:'Has your player played for MI (Mumbai Indians)?',f:p=>p.teams.includes('MI'),c:'team'},
  {id:'rcb',t:'Has your player played for RCB (Royal Challengers)?',f:p=>p.teams.includes('RCB'),c:'team'},
  {id:'kkr',t:'Has your player played for KKR (Kolkata Knight Riders)?',f:p=>p.teams.includes('KKR'),c:'team'},
  {id:'dc',t:'Has your player played for DC (Delhi Capitals)?',f:p=>p.teams.includes('DC'),c:'team'},
  {id:'rr',t:'Has your player played for RR (Rajasthan Royals)?',f:p=>p.teams.includes('RR'),c:'team'},
  {id:'srh',t:'Has your player played for SRH (Sunrisers Hyderabad)?',f:p=>p.teams.includes('SRH'),c:'team'},
  {id:'pbks',t:'Has your player played for PBKS (Punjab Kings)?',f:p=>p.teams.includes('PBKS'),c:'team'},
  {id:'gt',t:'Has your player played for GT (Gujarat Titans)?',f:p=>p.teams.includes('GT'),c:'team'},
  {id:'lsg',t:'Has your player played for LSG (Lucknow Super Giants)?',f:p=>p.teams.includes('LSG'),c:'team'},

  // Multi-team / experience
  {id:'mt3',t:'Has your player played for 3+ different IPL franchises?',f:p=>p.teams.length>=3,c:'team'},
  {id:'mt4',t:'Has your player played for 4+ different IPL franchises?',f:p=>p.teams.length>=4,c:'team'},
  {id:'1t',t:'Has your player only played for ONE IPL franchise?',f:p=>p.teams.length===1,c:'team'},
  {id:'m100g',t:'Has your player played 100+ IPL matches?',f:p=>p.matches>=100,c:'exp'},
  {id:'m50g',t:'Has your player played 50+ IPL matches?',f:p=>p.matches>=50,c:'exp'},
  {id:'m150g',t:'Has your player played 150+ IPL matches?',f:p=>p.matches>=150,c:'exp'},
  {id:'m10g',t:'Has your player played fewer than 10 IPL matches?',f:p=>p.matches<10,c:'exp'},
];

// ===== ENTROPY =====
function pickBest() {
  const n = candidates.length;
  if (n <= 1) return null;
  let best = null, bestE = -1;
  const avail = QS.filter(q => !askedIds.has(q.id));
  for (const q of avail) {
    let yW = 0, tW = 0;
    for (const c of candidates) {
      tW += c._w;
      if (q.f(c)) yW += c._w;
    }
    if (yW === 0 || yW === tW) continue;
    const p = yW / tW, np = 1 - p;
    const e = -(p * Math.log2(p)) - (np * Math.log2(np));
    if (e > bestE) { bestE = e; best = q; }
  }
  return best;
}

function getConf() {
  if (!candidates.length) return 0;
  if (candidates.length === 1) return 100;
  const tw = candidates.reduce((s,c) => s + c._w, 0);
  const mw = Math.max(...candidates.map(c => c._w));
  return Math.round((mw / tw) * 100);
}

function getTop() {
  return candidates.length ? candidates.reduce((b,c) => c._w > b._w ? c : b, candidates[0]) : null;
}

// ===== GAME =====
function startGame() {
  candidates = PLAYERS_DB.map(p => ({ ...p, _w: Math.max(p.fame, 0.5) }));
  questionsAsked = 0;
  askedIds = new Set();
  history = [];
  currentQ = null;
  lastGuess = null;
  document.getElementById('qHistory').innerHTML = '';
  showScreen('gameScreen');
  setGenieMood('thinking');
  askNext();
}

function newGame() { startGame(); }
function retryGame() { startGame(); }

function askNext() {
  const conf = getConf();
  if (candidates.length <= 1 || questionsAsked >= MAX_Q || conf >= 85) {
    showResult();
    return;
  }
  const q = pickBest();
  if (!q) { showResult(); return; }

  questionsAsked++;
  askedIds.add(q.id);
  currentQ = q;

  // Thinking anim
  const th = document.getElementById('thinking');
  const qt = document.getElementById('qText');
  const ans = document.getElementById('answers');
  th.classList.add('on'); qt.style.display = 'none';
  ans.style.opacity = '0'; ans.style.pointerEvents = 'none';
  setGenieMood('thinking');

  setTimeout(() => {
    th.classList.remove('on');
    qt.style.display = 'block';
    qt.textContent = q.t;
    ans.style.opacity = '1';
    ans.style.pointerEvents = 'auto';
    updateUI();
  }, 350 + Math.random() * 250);
}

function answer(type) {
  if (!currentQ) return;
  const map = { yes:1, probably:0.7, dunno:0, probably_not:-0.7, no:-1 };
  const s = map[type];
  const labels = { yes:'Yes', probably:'Probably', dunno:"Don't Know", probably_not:'Prob. Not', no:'No' };
  const cls = { yes:'a-yes', probably:'a-prob', dunno:'a-dk', probably_not:'a-probn', no:'a-no' };

  // Add to history
  history.push({ q: currentQ.t, a: type });
  const hDiv = document.getElementById('qHistory');
  const item = document.createElement('div');
  item.className = 'qh-item';
  item.innerHTML = `<span class="qh-q">Q${questionsAsked}: ${currentQ.t}</span><span class="qh-a ${cls[type]}">${labels[type]}</span>`;
  hDiv.prepend(item);

  // Update weights
  if (s > 0) {
    candidates.forEach(c => { c._w *= (currentQ.f(c) ? (1 + s) : (1 - s * 0.8)); });
  } else if (s < 0) {
    const a = Math.abs(s);
    candidates.forEach(c => { c._w *= (currentQ.f(c) ? (1 - a * 0.8) : (1 + a)); });
  }

  // Prune
  const mw = Math.max(...candidates.map(c => c._w));
  candidates = candidates.filter(c => c._w > mw * 0.005);
  const tw = candidates.reduce((s,c) => s + c._w, 0);
  candidates.forEach(c => c._w = c._w / tw * candidates.length);

  askNext();
}

function updateUI() {
  document.getElementById('qNum').textContent = questionsAsked;
  document.getElementById('progFill').style.width = `${(questionsAsked / MAX_Q) * 100}%`;
  document.getElementById('candCount').textContent = candidates.length;
  const conf = getConf();
  document.getElementById('confFill').style.width = `${conf}%`;
  document.getElementById('confPct').textContent = `${conf}%`;
  const fill = document.getElementById('confFill');
  if (conf >= 70) fill.style.background = 'linear-gradient(90deg,#34d399,#10b981)';
  else if (conf >= 40) fill.style.background = 'linear-gradient(90deg,#fbbf24,#f59e0b)';
  else fill.style.background = 'linear-gradient(90deg,#38bdf8,#6366f1)';
}

function showResult() {
  lastGuess = getTop();
  if (lastGuess) {
    setGenieMood('happy');
    document.getElementById('resultH').textContent = "I think your player is...";
    document.getElementById('pName').textContent = lastGuess.name;
    document.getElementById('pRole').textContent = lastGuess.role;
    const st = [
      {v:lastGuess.runs.toLocaleString(),l:'Runs'},{v:lastGuess.wickets,l:'Wickets'},
      {v:lastGuess.matches,l:'Matches'},{v:lastGuess.hi_score,l:'High Score'},
      {v:lastGuess.centuries,l:'100s'},{v:lastGuess.fifties,l:'50s'},
      {v:lastGuess.sr,l:'Strike Rate'},{v:lastGuess.pom,l:'POTM'},
      {v:`${lastGuess.debut}-${lastGuess.last_year}`,l:'Career'}
    ];
    document.getElementById('pStats').innerHTML = st.map(s =>
      `<div class="ps"><div class="ps-v">${s.v}</div><div class="ps-l">${s.l}</div></div>`).join('');
    document.getElementById('pTeams').innerHTML = lastGuess.teams.map(t =>
      `<span class="t-badge">${t}</span>`).join('');
    document.getElementById('pSeasons').innerHTML =
      `<span class="s-badge">${lastGuess.num_seasons} seasons: ${lastGuess.seasons.join(', ')}</span>`;
  } else {
    setGenieMood('sad');
    document.getElementById('resultH').textContent = "I'm stumped!";
    document.getElementById('pName').textContent = "Could not determine";
    document.getElementById('pRole').textContent = '';
    document.getElementById('pStats').innerHTML = '';
    document.getElementById('pTeams').innerHTML = '';
    document.getElementById('pSeasons').innerHTML = '';
  }

  document.getElementById('resultBtns').style.display = 'flex';
  document.getElementById('correctPanel').style.display = 'none';
  document.getElementById('wrongPanel').style.display = 'none';
  document.getElementById('confettiWrap').innerHTML = '';
  showScreen('resultScreen');
}

function handleResult(correct) {
  document.getElementById('resultBtns').style.display = 'none';
  stats.games++;
  if (correct) {
    stats.wins++;
    setGenieMood('happy');
    document.getElementById('correctPanel').style.display = 'block';
    spawnConfetti();
  } else {
    stats.losses++;
    setGenieMood('sad');
    const alts = candidates.sort((a,b) => b._w - a._w).slice(1, 8);
    document.getElementById('altList').innerHTML = alts.map(p =>
      `<div class="alt-item"><span class="alt-name">${p.name}</span><span class="alt-info">${p.role} | ${p.teams.join(', ')}</span></div>`
    ).join('');
    document.getElementById('wrongPanel').style.display = 'block';
  }
  localStorage.setItem('iplAkinatorStats', JSON.stringify(stats));
}

// ===== GENIE MOOD =====
function setGenieMood(mood) {
  // Mini genie in game screen
  const mini = document.querySelector('#genieMini .genie-mouth');
  if (mini) mini.className = 'genie-mouth ' + mood;
  // Result genie
  const res = document.getElementById('genieMouthResult');
  if (res) res.className = 'genie-mouth ' + mood;
}

// ===== CONFETTI =====
function spawnConfetti() {
  const wrap = document.getElementById('confettiWrap');
  const colors = ['#38bdf8','#a78bfa','#34d399','#fbbf24','#f87171','#fb923c','#f472b6'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 2 + 's';
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    piece.style.width = (6 + Math.random() * 6) + 'px';
    piece.style.height = (6 + Math.random() * 6) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    wrap.appendChild(piece);
  }
}

// ===== PARTICLES =====
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, pts = [];
  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 40; i++) {
    pts.push({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.5+0.5,
      dx: (Math.random()-0.5)*0.3, dy: (Math.random()-0.5)*0.3, o: Math.random()*0.3+0.1 });
  }
  function draw() {
    ctx.clearRect(0,0,w,h);
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(56,189,248,${p.o})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ===== STATS =====
function updateStatsUI() {
  document.getElementById('sGames').textContent = stats.games;
  document.getElementById('sWins').textContent = stats.wins;
  document.getElementById('sLosses').textContent = stats.losses;
  document.getElementById('sRate').textContent = stats.games ? Math.round(stats.wins/stats.games*100)+'%' : '0%';
}
function resetStats() {
  stats = {games:0,wins:0,losses:0};
  localStorage.setItem('iplAkinatorStats', JSON.stringify(stats));
  updateStatsUI();
}

// ===== SCREENS =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'statsScreen') updateStatsUI();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  if (typeof PLAYERS_DB !== 'undefined') {
    document.getElementById('dbCount').textContent = PLAYERS_DB.length;
  }
  initParticles();
  updateStatsUI();
});
