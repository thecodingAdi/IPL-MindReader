"""
IPL Akinator — Flask Backend Server
Full-stack game engine with session management, entropy-based AI,
realistic randomized questions, and anti-repetition logic.
"""
import json, uuid, math, random, os
from flask import Flask, jsonify, request, send_from_directory
from groq import Groq

from dotenv import load_dotenv

load_dotenv()

# ─── Initialize Groq API ───
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    print("❌ GROQ_API_KEY not found in .env file!")
    exit(1)
    
groq_client = Groq(api_key=GROQ_API_KEY)
GROQ_MODEL = "llama3-8b-8192"

app = Flask(__name__, static_folder='static')


# ─── Load Player Database ───
BASE = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(BASE, 'players.json'), 'r', encoding='utf-8') as f:
    PLAYERS = json.load(f)

print(f"Loaded {len(PLAYERS)} players")

# ─── Game Sessions ───
sessions = {}

# ─── Question Bank (80+ realistic, varied questions) ───
# Each question: id, category, phrasings[], eval_key (string expression evaluated against player dict `p`)
QUESTIONS = [
    # ── ROLE ──
    {"id":"role_bat","cat":"role","ph":[
        "Is your player primarily known for their batting?",
        "Would you call your player a specialist batsman?",
        "Is batting the main strength of your player?",
        "Is your player the kind who's picked mainly to score runs?"
    ],"eval":"p['role'] in ('Batsman','Wicketkeeper-Batsman')"},

    {"id":"role_bowl","cat":"role","ph":[
        "Is your player primarily a bowler?",
        "Is bowling the main weapon of your player?",
        "Would your player be picked mainly for their bowling ability?",
        "Is your player someone who's feared for their bowling?"
    ],"eval":"p['role']=='Bowler'"},

    {"id":"role_ar","cat":"role","ph":[
        "Is your player an all-rounder who contributes with both bat and ball?",
        "Can your player make an impact with both batting and bowling?",
        "Is your player a genuine all-rounder in the IPL?",
        "Does your player regularly contribute as both batsman and bowler?"
    ],"eval":"p['role']=='All-rounder'"},

    {"id":"role_wk","cat":"role","ph":[
        "Does your player keep wickets behind the stumps?",
        "Is your player a wicketkeeper?",
        "Does your player don the gloves during matches?",
        "Is your player known for their wicketkeeping skills?"
    ],"eval":"p['is_wk']"},

    # ── NATIONALITY ──
    {"id":"overseas","cat":"nat","ph":[
        "Is your player an overseas (non-Indian) cricketer?",
        "Does your player come from outside India?",
        "Is your player an international import in the IPL?",
        "Would your player count as one of the overseas slots in the playing XI?"
    ],"eval":"p['is_overseas']"},

    # ── BATTING POSITION ──
    {"id":"opener","cat":"pos","ph":[
        "Is your player an opener who faces the new ball?",
        "Does your player walk out to bat in the first over?",
        "Is your player the kind who opens the innings?",
        "Does your player usually bat at #1 or #2?"
    ],"eval":"p['is_opener']"},

    {"id":"middle","cat":"pos","ph":[
        "Does your player bat in the crucial middle order?",
        "Is your player a #3, #4, or #5 batter?",
        "Does your player come in during the middle overs to stabilize or accelerate?",
        "Would you place your player in the middle order?"
    ],"eval":"p['is_middle']"},

    {"id":"finisher","cat":"pos","ph":[
        "Is your player known as a finisher or death-overs hitter?",
        "Does your player usually bat in the lower order and smash at the end?",
        "Is your player the kind who comes in late and hits big?",
        "Would you call your player a lower-order power hitter?"
    ],"eval":"p['is_finisher']"},

    # ── ERA / ACTIVITY ──
    {"id":"active","cat":"era","ph":[
        "Is your player currently active in the IPL?",
        "Did your player play in the 2024 or 2025 IPL season?",
        "Is your player still playing IPL cricket?",
        "Would you see your player in recent IPL squads?"
    ],"eval":"p['is_active']"},

    {"id":"veteran","cat":"era","ph":[
        "Is your player an IPL veteran with 10+ seasons?",
        "Has your player been around for a decade in the IPL?",
        "Would you consider your player a seasoned IPL campaigner?",
        "Has your player been a regular for 10 or more IPL seasons?"
    ],"eval":"p['num_seasons']>=10"},

    {"id":"legend","cat":"era","ph":[
        "Has your player played 15+ IPL seasons — a true legend?",
        "Is your player one of the longest-serving players in IPL history?",
        "Has your player been part of the IPL for 15 or more seasons?"
    ],"eval":"p['num_seasons']>=15"},

    {"id":"early_debut","cat":"era","ph":[
        "Did your player debut in the early years of IPL (before 2012)?",
        "Has your player been around since the first four seasons of IPL?",
        "Was your player part of the IPL in its early days (2008-2011)?"
    ],"eval":"p['debut']<2012"},

    {"id":"recent_debut","cat":"era","ph":[
        "Is your player a relatively new face, debuting in 2018 or later?",
        "Did your player enter the IPL scene recently (2018 onwards)?",
        "Is your player part of the newer generation of IPL cricketers?"
    ],"eval":"p['debut']>=2018"},

    {"id":"very_recent","cat":"era","ph":[
        "Did your player debut in 2021 or later?",
        "Is your player someone who joined the IPL very recently?",
        "Has your player only been in the IPL for a few years (debut 2021+)?"
    ],"eval":"p['debut']>=2021"},

    {"id":"retired","cat":"era","ph":[
        "Has your player retired or stopped playing IPL cricket?",
        "Is your player no longer active in the IPL?",
        "Has your player's IPL career already ended?"
    ],"eval":"not p['is_active']"},

    {"id":"short_career","cat":"era","ph":[
        "Did your player have a brief IPL career — fewer than 3 seasons?",
        "Was your player's IPL stint quite short?",
        "Did your player only play a couple of IPL seasons?"
    ],"eval":"p['num_seasons']<3"},

    # ── BATTING PERFORMANCE ──
    {"id":"r500","cat":"bat","ph":[
        "Has your player crossed the 500-run mark in the IPL?",
        "Has your player scored more than 500 runs across all IPL seasons?",
        "Would your player have at least 500 IPL runs to their name?"
    ],"eval":"p['runs']>=500"},

    {"id":"r1k","cat":"bat","ph":[
        "Has your player scored 1,000+ runs in IPL history?",
        "Is your player among the 1,000-run club in the IPL?",
        "Would your player's total IPL runs exceed a thousand?"
    ],"eval":"p['runs']>=1000"},

    {"id":"r2k","cat":"bat","ph":[
        "Has your player amassed 2,000+ runs in the IPL?",
        "Is your player among the top run-scorers with 2,000+ IPL runs?",
        "Has your player crossed 2,000 runs across their IPL career?"
    ],"eval":"p['runs']>=2000"},

    {"id":"r3k","cat":"bat","ph":[
        "Has your player scored over 3,000 runs in the IPL?",
        "Is your player in the elite 3,000-run club?",
        "Would your player be counted among IPL's top run-getters (3K+)?"
    ],"eval":"p['runs']>=3000"},

    {"id":"r5k","cat":"bat","ph":[
        "Has your player crossed the 5,000-run mark in the IPL?",
        "Is your player one of the rare 5,000+ IPL run-scorers?",
        "Would your player be in the all-time top 10 for IPL runs?"
    ],"eval":"p['runs']>=5000"},

    {"id":"century","cat":"bat","ph":[
        "Has your player smashed an IPL century?",
        "Has your player scored 100+ in a single IPL innings?",
        "Does your player have at least one IPL hundred to their name?"
    ],"eval":"p['centuries']>0"},

    {"id":"multi_cent","cat":"bat","ph":[
        "Has your player scored 3 or more IPL centuries?",
        "Is your player a prolific century-scorer in the IPL (3+)?",
        "Does your player have multiple IPL hundreds?"
    ],"eval":"p['centuries']>=3"},

    {"id":"fifties","cat":"bat","ph":[
        "Has your player scored 10+ half-centuries in the IPL?",
        "Is your player a consistent fifty-scorer in the IPL?",
        "Does your player have 10 or more IPL fifties?"
    ],"eval":"p['fifties']>=10"},

    {"id":"many_fifties","cat":"bat","ph":[
        "Has your player racked up 30+ fifties in the IPL?",
        "Is your player among the most consistent batters with 30+ IPL fifties?",
        "Does your player have an extraordinary number of IPL half-centuries (30+)?"
    ],"eval":"p['fifties']>=30"},

    {"id":"hi_score100","cat":"bat","ph":[
        "Is your player's highest IPL score above 100?",
        "Has your player ever made a triple-figure score in the IPL?",
        "Does your player have a personal best of 100+ in a single IPL innings?"
    ],"eval":"p['hi_score']>100"},

    {"id":"sr_fast","cat":"bat","ph":[
        "Does your player bat at a rapid strike rate — above 140?",
        "Is your player a quick scorer with a career IPL strike rate over 140?",
        "Would you say your player scores at a very brisk pace (SR 140+)?"
    ],"eval":"p['sr']>140"},

    {"id":"sr_explosive","cat":"bat","ph":[
        "Is your player explosively aggressive with a strike rate above 155?",
        "Does your player smash at an outrageous strike rate (155+)?",
        "Is your player among the most destructive with SR over 155?"
    ],"eval":"p['sr']>155"},

    {"id":"six_hitter","cat":"bat","ph":[
        "Has your player launched 50+ sixes in the IPL?",
        "Is your player known for clearing the ropes — 50+ IPL sixes?",
        "Would your player be on the list of IPL's biggest six-hitters (50+)?"
    ],"eval":"p['sixes']>=50"},

    {"id":"mega_six","cat":"bat","ph":[
        "Has your player smashed 100+ sixes in IPL history?",
        "Is your player one of the elite 100-sixes club in the IPL?",
        "Has your player cleared the boundary 100 or more times in the IPL?"
    ],"eval":"p['sixes']>=100"},

    {"id":"boundary_king","cat":"bat","ph":[
        "Has your player hit 200+ fours in the IPL?",
        "Is your player a prolific boundary hitter with 200+ fours?",
        "Would your player be among the top four-hitters in IPL history?"
    ],"eval":"p['fours']>=200"},

    # ── BOWLING PERFORMANCE ──
    {"id":"w20","cat":"bowl","ph":[
        "Has your player picked up 20+ wickets in the IPL?",
        "Does your player have at least 20 IPL wickets?",
        "Has your player been a regular wicket-taker (20+) in the IPL?"
    ],"eval":"p['wickets']>=20"},

    {"id":"w50","cat":"bowl","ph":[
        "Has your player taken 50+ IPL wickets?",
        "Is your player in the 50-wicket club in the IPL?",
        "Would your player be among the experienced wicket-takers (50+)?"
    ],"eval":"p['wickets']>=50"},

    {"id":"w100","cat":"bowl","ph":[
        "Has your player claimed 100+ wickets in IPL history?",
        "Is your player one of the rare centurions in IPL wickets?",
        "Does your player have a century of IPL wickets to their name?"
    ],"eval":"p['wickets']>=100"},

    {"id":"w150","cat":"bowl","ph":[
        "Has your player taken 150+ IPL wickets — an elite achiever?",
        "Is your player among the top 5 wicket-takers in IPL history?",
        "Does your player have 150 or more IPL scalps?"
    ],"eval":"p['wickets']>=150"},

    {"id":"econ_tight","cat":"bowl","ph":[
        "Does your player bowl tight — economy rate under 7.5?",
        "Is your player an economical bowler (economy < 7.5)?",
        "Would you call your player a restrictive bowler in the IPL?"
    ],"eval":"p.get('econ') is not None and p['econ']<7.5"},

    {"id":"econ_expensive","cat":"bowl","ph":[
        "Does your player tend to be expensive — economy rate above 9?",
        "Is your player's bowling economy on the higher side (above 9)?",
        "Would bowlers consider your player as someone who leaks runs?"
    ],"eval":"p.get('econ') is not None and p['econ']>9"},

    {"id":"no_bowl","cat":"bowl","ph":[
        "Does your player rarely or never bowl in the IPL?",
        "Is your player a non-bowler — fewer than 5 IPL wickets?",
        "Would it be fair to say your player doesn't contribute with the ball?"
    ],"eval":"p['wickets']<5"},

    # ── AWARDS ──
    {"id":"pom1","cat":"award","ph":[
        "Has your player won at least one Player of the Match award?",
        "Has your player ever been named Man of the Match in the IPL?",
        "Does your player have any POTM awards?"
    ],"eval":"p['pom']>=1"},

    {"id":"pom5","cat":"award","ph":[
        "Has your player won 5+ Player of the Match awards?",
        "Is your player a frequent match-winner with 5+ POTM awards?",
        "Would your player have 5 or more Man of the Match titles?"
    ],"eval":"p['pom']>=5"},

    {"id":"pom10","cat":"award","ph":[
        "Has your player won 10+ POTM awards — a serial match-winner?",
        "Is your player among the most decorated in Man of the Match awards (10+)?",
        "Does your player have double-digit POTM awards?"
    ],"eval":"p['pom']>=10"},

    {"id":"titles","cat":"award","ph":[
        "Has your player been part of an IPL championship-winning team?",
        "Has your player lifted the IPL trophy?",
        "Did your player's team win the IPL title during their time?"
    ],"eval":"p['titles']>0"},

    {"id":"multi_titles","cat":"award","ph":[
        "Has your player won 3+ IPL titles?",
        "Is your player a serial winner with 3 or more IPL trophies?",
        "Has your player been part of multiple championship squads (3+)?"
    ],"eval":"p['titles']>=3"},

    # ── TEAMS ──
    {"id":"t_csk","cat":"team","ph":[
        "Has your player worn the famous yellow jersey of CSK?",
        "Did your player play for Chennai Super Kings?",
        "Is CSK one of the franchises your player has represented?"
    ],"eval":"'CSK' in p['teams']"},

    {"id":"t_mi","cat":"team","ph":[
        "Has your player been part of the Mumbai Indians setup?",
        "Did your player wear the blue and gold of MI?",
        "Has your player played for the most successful IPL franchise — Mumbai Indians?"
    ],"eval":"'MI' in p['teams']"},

    {"id":"t_rcb","cat":"team","ph":[
        "Has your player represented Royal Challengers Bangalore?",
        "Did your player play for RCB?",
        "Is RCB among the teams your player has been part of?"
    ],"eval":"'RCB' in p['teams']"},

    {"id":"t_kkr","cat":"team","ph":[
        "Has your player played for the Kolkata Knight Riders?",
        "Did your player wear the purple and gold of KKR?",
        "Is KKR one of your player's IPL teams?"
    ],"eval":"'KKR' in p['teams']"},

    {"id":"t_dc","cat":"team","ph":[
        "Has your player represented Delhi — Capitals or Daredevils?",
        "Did your player play for DC (Delhi)?",
        "Is Delhi Capitals among your player's IPL franchises?"
    ],"eval":"'DC' in p['teams']"},

    {"id":"t_rr","cat":"team","ph":[
        "Has your player played for the Rajasthan Royals?",
        "Did your player represent RR in the IPL?",
        "Is Rajasthan Royals among your player's teams?"
    ],"eval":"'RR' in p['teams']"},

    {"id":"t_srh","cat":"team","ph":[
        "Has your player been part of Sunrisers Hyderabad?",
        "Did your player play for SRH?",
        "Is SRH among the franchises your player has played for?"
    ],"eval":"'SRH' in p['teams']"},

    {"id":"t_pbks","cat":"team","ph":[
        "Has your player played for Punjab Kings (formerly Kings XI Punjab)?",
        "Did your player represent PBKS/KXIP in the IPL?",
        "Is Punjab among your player's IPL franchises?"
    ],"eval":"'PBKS' in p['teams']"},

    {"id":"t_gt","cat":"team","ph":[
        "Has your player been part of the Gujarat Titans?",
        "Did your player play for GT?",
        "Is Gujarat Titans one of your player's teams?"
    ],"eval":"'GT' in p['teams']"},

    {"id":"t_lsg","cat":"team","ph":[
        "Has your player played for Lucknow Super Giants?",
        "Did your player represent LSG in the IPL?",
        "Is LSG among your player's franchises?"
    ],"eval":"'LSG' in p['teams']"},

    # ── EXPERIENCE / LOYALTY ──
    {"id":"one_team","cat":"exp","ph":[
        "Is your player a one-club man — only ever played for a single franchise?",
        "Has your player been loyal to just one IPL team?",
        "Did your player spend their entire IPL career at one franchise?"
    ],"eval":"len(p['teams'])==1"},

    {"id":"multi3","cat":"exp","ph":[
        "Has your player been a journeyman — playing for 3+ different franchises?",
        "Did your player represent 3 or more IPL teams?",
        "Has your player moved around, playing for 3+ different IPL sides?"
    ],"eval":"len(p['teams'])>=3"},

    {"id":"multi4","cat":"exp","ph":[
        "Has your player played for 4 or more different IPL franchises?",
        "Is your player someone who's been at 4+ different IPL teams?",
        "Has your player worn the jersey of 4 or more IPL sides?"
    ],"eval":"len(p['teams'])>=4"},

    {"id":"m200","cat":"exp","ph":[
        "Has your player played 200+ IPL matches?",
        "Is your player among the most-capped IPL players (200+ matches)?",
        "Has your player crossed 200 appearances in the IPL?"
    ],"eval":"p['matches']>=200"},

    {"id":"m100","cat":"exp","ph":[
        "Has your player played 100+ IPL matches?",
        "Is your player part of the IPL 100-match club?",
        "Has your player featured in over a hundred IPL games?"
    ],"eval":"p['matches']>=100"},

    {"id":"m50","cat":"exp","ph":[
        "Has your player played 50+ IPL matches?",
        "Has your player been a regular enough to play 50+ IPL games?",
        "Would your player have at least 50 IPL appearances?"
    ],"eval":"p['matches']>=50"},

    {"id":"m_few","cat":"exp","ph":[
        "Has your player played fewer than 10 IPL matches?",
        "Is your player relatively unknown with fewer than 10 IPL games?",
        "Did your player have very limited IPL exposure (under 10 matches)?"
    ],"eval":"p['matches']<10"},

    {"id":"m_medium","cat":"exp","ph":[
        "Has your player played between 20 and 80 IPL matches?",
        "Is your player a mid-tier IPL regular (20-80 matches)?",
        "Would your player fall in the 20-80 match bracket?"
    ],"eval":"20<=p['matches']<=80"},

    # ── CATCHES ──
    {"id":"catch50","cat":"field","ph":[
        "Has your player taken 50+ catches in the IPL?",
        "Is your player a sharp fielder with 50+ IPL catches?",
        "Would your player be among the top catchers in IPL history?"
    ],"eval":"p.get('catches',0)>=50"},
]


def evaluate_question(q, player):
    """Evaluate a question filter against a player dict."""
    p = player
    try:
        return bool(eval(q["eval"]))
    except:
        return False


def pick_question_with_llm(session):
    """Pick the best question using entropy + Groq LLM for natural phrasing."""
    cands = session["candidates"]
    asked = session["asked"]
    history = session["history"]
    last_cat = session.get("last_cat", None)
    n = len(cands)
    if n <= 1:
        return None, None

    available = [q for q in QUESTIONS if q["id"] not in asked]
    if not available:
        return None, None

    scored = []
    for q in available:
        yes_w = sum(c["_w"] for c in cands if evaluate_question(q, c))
        total_w = sum(c["_w"] for c in cands)
        if yes_w == 0 or yes_w == total_w:
            continue  # Skip useless questions
        p = yes_w / total_w
        entropy = -(p * math.log2(p)) - ((1-p) * math.log2(1-p))

        # Penalize asking same category twice in a row
        if q["cat"] == last_cat:
            entropy *= 0.7

        scored.append((entropy, q))

    if not scored:
        return None, None

    scored.sort(key=lambda x: -x[0])
    # Take top 5 questions and let Groq pick the best and rephrase it
    top_questions = [q for e, q in scored[:min(5, len(scored))]]
    
    try:
        prompt = "We are playing 20 Questions to guess an IPL cricketer.\n"
        if history:
            prompt += "Previous questions asked:\n"
            for h in history:
                prompt += f"- Q: {h.get('q_text', h['q'])} (User Answer: {h['a']})\n"
        prompt += "\nTop candidate questions to ask next:\n"
        for i, q in enumerate(top_questions):
            prompt += f"{i}. {q['ph'][0]}\n"
        prompt += "\nPick the best question from the list that flows naturally given the conversation history. "
        prompt += "Respond in JSON format exactly like this: {\"selected_index\": 0, \"rephrased_question\": \"Your natural sounding question here?\"}. "
        prompt += "Make the question sound conversational and intelligent, like a real cricket expert."
        
        response = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": "You are an AI Akinator for IPL cricket. Always return valid JSON only."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.7
        )
        
        res_json = json.loads(response.choices[0].message.content)
        idx = res_json.get("selected_index", 0)
        if not isinstance(idx, int) or idx < 0 or idx >= len(top_questions):
            idx = 0
            
        selected = top_questions[idx]
        phrasing = res_json.get("rephrased_question", random.choice(selected["ph"]))
        return selected, phrasing
    except Exception as e:
        print(f"Groq API error in question selection: {e}")
        selected = random.choice(top_questions[:3])
        return selected, random.choice(selected["ph"])


def get_confidence(cands):
    if not cands:
        return 0
    if len(cands) == 1:
        return 100
    total = sum(c["_w"] for c in cands)
    top = max(c["_w"] for c in cands)
    return round((top / total) * 100)


def get_top_n(cands, n=5):
    return sorted(cands, key=lambda c: -c["_w"])[:n]


# ─── API Routes ───

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

@app.route('/api/info')
def info():
    return jsonify({"player_count": len(PLAYERS)})

@app.route('/api/start', methods=['POST'])
def start_game():
    sid = str(uuid.uuid4())
    cands = [dict(p, _w=max(p.get("fame", 1), 0.5)) for p in PLAYERS]
    session = {
        "id": sid,
        "candidates": cands,
        "asked": set(),
        "history": [],
        "q_count": 0,
        "last_cat": None,
        "max_q": 12,
    }
    sessions[sid] = session

    q, phrasing = pick_question_with_llm(session)
    if q:
        session["current_q"] = q
        session["current_q_text"] = phrasing
        return jsonify({
            "session_id": sid,
            "question": phrasing,
            "q_number": 1,
            "candidates_left": len(cands),
            "confidence": get_confidence(cands),
            "status": "question"
        })
    else:
        return make_guess(session)


@app.route('/api/answer', methods=['POST'])
def answer_question():
    data = request.json
    sid = data.get("session_id")
    ans = data.get("answer")  # yes, probably, dunno, probably_not, no

    if sid not in sessions:
        return jsonify({"error": "Invalid session"}), 400

    session = sessions[sid]
    q = session.get("current_q")
    if not q:
        return jsonify({"error": "No active question"}), 400

    session["asked"].add(q["id"])
    session["q_count"] += 1
    session["last_cat"] = q["cat"]
    session["history"].append({
        "q": q["id"], 
        "q_text": session.get("current_q_text", ""), 
        "a": ans
    })

    # Update weights
    score_map = {"yes": 1.0, "probably": 0.7, "dunno": 0, "probably_not": -0.7, "no": -1.0}
    score = score_map.get(ans, 0)
    cands = session["candidates"]

    if score > 0:
        for c in cands:
            if evaluate_question(q, c):
                c["_w"] *= (1 + score)
            else:
                c["_w"] *= max(0.01, 1 - score * 0.85)
    elif score < 0:
        a = abs(score)
        for c in cands:
            if evaluate_question(q, c):
                c["_w"] *= max(0.01, 1 - a * 0.85)
            else:
                c["_w"] *= (1 + a)

    # Prune low-weight candidates
    if cands:
        max_w = max(c["_w"] for c in cands)
        cands = [c for c in cands if c["_w"] > max_w * 0.003]
        total = sum(c["_w"] for c in cands)
        if total > 0:
            for c in cands:
                c["_w"] = c["_w"] / total * len(cands)
        session["candidates"] = cands

    # Check stopping conditions
    conf = get_confidence(cands)
    if len(cands) <= 1 or session["q_count"] >= session["max_q"] or conf >= 88:
        return make_guess(session)

    # Next question
    nq, phrasing = pick_question_with_llm(session)
    if not nq:
        return make_guess(session)

    session["current_q"] = nq
    session["current_q_text"] = phrasing
    return jsonify({
        "session_id": sid,
        "question": phrasing,
        "q_number": session["q_count"] + 1,
        "candidates_left": len(cands),
        "confidence": conf,
        "status": "question"
    })


def make_guess(session):
    cands = session["candidates"]
    top = get_top_n(cands, 8)
    guess = top[0] if top else None
    alts = top[1:6] if len(top) > 1 else []

    def clean(p):
        return {k: v for k, v in p.items() if k != "_w"}

    guess_text = None
    if guess:
        try:
            prompt = f"We played 20 questions to guess an IPL player. Based on the answers, the player is {guess['name']}. Write a short, exciting 'A-ha!' message revealing the guess. Mention a brief fun fact based on these stats: Role: {guess['role']}, Teams: {', '.join(guess['teams'])}, Runs: {guess.get('runs', 0)}, Wickets: {guess.get('wickets', 0)}. Keep it under 2 sentences. Do not use markdown."
            response = groq_client.chat.completions.create(
                model=GROQ_MODEL,
                messages=[
                    {"role": "system", "content": "You are an enthusiastic IPL AI Akinator. Be brief, punchy, and avoid markdown."},
                    {"role": "user", "content": prompt}
                ]
            )
            guess_text = response.choices[0].message.content.strip()
        except Exception as e:
            print(f"Groq API error in guess text generation: {e}")
            guess_text = f"I'm highly confident it's {guess['name']}!"

    return jsonify({
        "session_id": session["id"],
        "status": "guess",
        "guess": clean(guess) if guess else None,
        "guess_text": guess_text,
        "alternatives": [clean(a) for a in alts],
        "confidence": get_confidence(cands),
        "questions_asked": session["q_count"],
    })


@app.route('/api/result', methods=['POST'])
def report_result():
    """Player reports if guess was correct or not (for future learning)."""
    data = request.json
    sid = data.get("session_id")
    correct = data.get("correct", False)
    if sid in sessions:
        sessions[sid]["result"] = "correct" if correct else "wrong"
    return jsonify({"ok": True})


if __name__ == '__main__':
    print("\n" + "="*50)
    print("  IPL AKINATOR SERVER")
    print(f"  {len(PLAYERS)} players loaded")
    print(f"  {len(QUESTIONS)} question templates")
    print("  Open: http://localhost:5000")
    print("="*50 + "\n")
    app.run(debug=False, port=5000, host='0.0.0.0')
