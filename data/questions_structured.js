// ──────────────────────────────────────────────────────────────
// IPL AKINATOR — STRUCTURED QUESTION BANK
// ──────────────────────────────────────────────────────────────
// Each question has:
//   id   — unique key
//   cat  — category (for anti-repetition & phase selection)
//   ph   — human-readable phrasing (sent to Groq for rephrasing)
//   eval — function(player) => boolean
//   tier — 1=broad splitter, 2=mid-game, 3=pinpoint (for phase-aware ordering)
//
// DESIGN PRINCIPLES:
//   - Questions should feel like a cricket expert talking, not a database query
//   - Prefer playstyle/identity over raw stat thresholds
//   - Every question should meaningfully split the candidate pool
// ──────────────────────────────────────────────────────────────

const questions = [

    // ═══════════════════════════════════════════════════════
    // ROLE — Fundamental identity of the player
    // ═══════════════════════════════════════════════════════
    { id: "role_bat", cat: "role", tier: 1,
      ph: "Would you say your player is best known for their batting performances?",
      eval: (p) => ["Batsman", "Wicketkeeper-Batsman"].includes(p.role) },

    { id: "role_bowl", cat: "role", tier: 1,
      ph: "Is your player primarily a bowling specialist?",
      eval: (p) => p.role === "Bowler" },

    { id: "role_ar", cat: "role", tier: 1,
      ph: "Does your player contribute significantly with both bat and ball — a genuine all-rounder?",
      eval: (p) => p.role === 'All-rounder' },

    { id: "role_wk", cat: "role", tier: 2,
      ph: "Does your player don the gloves behind the stumps as a wicketkeeper?",
      eval: (p) => p.is_wk || (p.role && p.role.includes("Wicketkeeper")) },


    // ═══════════════════════════════════════════════════════
    // NATIONALITY — Where do they come from?
    // ═══════════════════════════════════════════════════════
    { id: "overseas", cat: "nat", tier: 1,
      ph: "Has your player represented a country outside India in international cricket?",
      eval: (p) => p.is_overseas },

    { id: "indian", cat: "nat", tier: 1,
      ph: "Is your player an Indian cricketer?",
      eval: (p) => !p.is_overseas },

    { id: "aus", cat: "nat", tier: 2,
      ph: "Has your player represented Australia?",
      eval: (p) => p.nationality === 'Australian' },

    { id: "wi", cat: "nat", tier: 2,
      ph: "Does your player hail from the Caribbean — a West Indian cricketer?",
      eval: (p) => p.nationality === 'West Indian' },

    { id: "sa", cat: "nat", tier: 2,
      ph: "Is your player from South Africa?",
      eval: (p) => p.nationality === 'South African' },

    { id: "eng", cat: "nat", tier: 2,
      ph: "Has your player represented England?",
      eval: (p) => p.nationality === 'English' },

    { id: "nz", cat: "nat", tier: 3,
      ph: "Is your player a New Zealand international?",
      eval: (p) => p.nationality === 'New Zealander' },

    { id: "sl", cat: "nat", tier: 3,
      ph: "Has your player represented Sri Lanka?",
      eval: (p) => p.nationality === 'Sri Lankan' },

    { id: "afg", cat: "nat", tier: 3,
      ph: "Is your player from Afghanistan?",
      eval: (p) => p.nationality === 'Afghan' },


    // ═══════════════════════════════════════════════════════
    // BATTING POSITION — Where do they bat?
    // ═══════════════════════════════════════════════════════
    { id: "opener", cat: "pos", tier: 1,
      ph: "Does your player walk out to bat in the powerplay as an opener?",
      eval: (p) => p.is_opener },

    { id: "middle", cat: "pos", tier: 2,
      ph: "Is your player a middle-order maestro — batting at 3, 4, or 5?",
      eval: (p) => p.is_middle },

    { id: "finisher", cat: "pos", tier: 2,
      ph: "Is your player known as a finisher — the one who closes out innings in the death overs?",
      eval: (p) => p.is_finisher },


    // ═══════════════════════════════════════════════════════
    // ERA / ACTIVITY — When did they play?
    // ═══════════════════════════════════════════════════════
    { id: "active", cat: "era", tier: 1,
      ph: "Is your player currently active in the IPL — playing in recent seasons?",
      eval: (p) => p.is_active },

    { id: "veteran", cat: "era", tier: 2,
      ph: "Has your player been part of the IPL for a decade or more — a true veteran?",
      eval: (p) => p.num_seasons >= 10 },

    { id: "early_debut", cat: "era", tier: 2,
      ph: "Did your player feature in the early days of the IPL — debuting before 2012?",
      eval: (p) => p.debut < 2012 },

    { id: "recent_debut", cat: "era", tier: 2,
      ph: "Is your player a relatively new face — debuting in 2018 or later?",
      eval: (p) => p.debut >= 2018 },

    { id: "retired", cat: "era", tier: 2,
      ph: "Has your player hung up their IPL boots — no longer playing?",
      eval: (p) => !p.is_active },


    // ═══════════════════════════════════════════════════════
    // BOWLING STYLE — How do they bowl?
    // ═══════════════════════════════════════════════════════
    { id: "pace", cat: "bowl", tier: 1,
      ph: "Is your player known for bowling pace — fast or medium-fast?",
      eval: (p) => p.is_pacer },

    { id: "spin", cat: "bowl", tier: 1,
      ph: "Does your player bowl spin?",
      eval: (p) => p.is_spinner },

    { id: "w50", cat: "bowl", tier: 2,
      ph: "Has your player claimed 50 or more wickets in IPL history?",
      eval: (p) => p.wickets >= 50 },

    { id: "w100", cat: "bowl", tier: 2,
      ph: "Is your player among the elite wicket-takers with 100+ IPL scalps?",
      eval: (p) => p.wickets >= 100 },

    { id: "econ_tight", cat: "bowl", tier: 3,
      ph: "Is your player known for being miserly — an economy rate under 7.5?",
      eval: (p) => p.econ && p.econ < 7.5 },


    // ═══════════════════════════════════════════════════════
    // BATTING PERFORMANCE — The runs tell a story
    // ═══════════════════════════════════════════════════════
    { id: "r1k", cat: "bat", tier: 2,
      ph: "Has your player crossed the 1,000-run mark in IPL history?",
      eval: (p) => p.runs >= 1000 },

    { id: "r3k", cat: "bat", tier: 2,
      ph: "Has your player piled on over 3,000 IPL runs?",
      eval: (p) => p.runs >= 3000 },

    { id: "r5k", cat: "bat", tier: 3,
      ph: "Is your player among the all-time greats with 5,000+ IPL runs?",
      eval: (p) => p.runs >= 5000 },

    { id: "century", cat: "bat", tier: 2,
      ph: "Has your player smashed an IPL century?",
      eval: (p) => p.centuries > 0 },

    { id: "fifties_10", cat: "bat", tier: 2,
      ph: "Does your player have 10 or more IPL half-centuries to their name?",
      eval: (p) => p.fifties >= 10 },

    { id: "six_hitter", cat: "bat", tier: 2,
      ph: "Is your player known for clearing the boundary — 100 or more IPL sixes?",
      eval: (p) => p.sixes >= 100 },


    // ═══════════════════════════════════════════════════════
    // IDENTITY & PLAYSTYLE — What makes them iconic?
    // ═══════════════════════════════════════════════════════
    { id: "captain", cat: "trait", tier: 1,
      ph: "Has your player ever led an IPL franchise as captain?",
      eval: (p) => p.is_captain },

    { id: "lefty", cat: "style", tier: 1,
      ph: "Is your player a left-handed batsman?",
      eval: (p) => p.is_left_handed },

    { id: "explosive", cat: "style", tier: 2,
      ph: "Is your player known for explosive, destructive batting — a real crowd-pleaser?",
      eval: (p) => p.sr > 145 && p.runs > 500 },

    { id: "journeyman", cat: "trait", tier: 2,
      ph: "Has your player been a bit of a journeyman — representing 5 or more IPL franchises?",
      eval: (p) => p.teams.length >= 5 },

    { id: "one_team", cat: "trait", tier: 2,
      ph: "Has your player been a one-franchise loyalist — playing for only one IPL team?",
      eval: (p) => p.teams.length === 1 },


    // ═══════════════════════════════════════════════════════
    // AWARDS & TITLES — The silverware
    // ═══════════════════════════════════════════════════════
    { id: "pom5", cat: "award", tier: 2,
      ph: "Has your player collected 5 or more Player of the Match awards?",
      eval: (p) => p.pom >= 5 },

    { id: "titles", cat: "award", tier: 2,
      ph: "Has your player been part of an IPL title-winning campaign?",
      eval: (p) => p.titles > 0 },

    { id: "multi_titles", cat: "award", tier: 3,
      ph: "Has your player tasted IPL glory 3 or more times — a serial winner?",
      eval: (p) => p.titles >= 3 },


    // ═══════════════════════════════════════════════════════
    // TEAMS — Which franchise(s)?
    // ═══════════════════════════════════════════════════════
    { id: "t_csk", cat: "team", tier: 2,
      ph: "Has your player donned the yellow jersey of Chennai Super Kings?",
      eval: (p) => p.teams.includes('CSK') },

    { id: "t_mi", cat: "team", tier: 2,
      ph: "Has your player been part of the Mumbai Indians setup?",
      eval: (p) => p.teams.includes('MI') },

    { id: "t_rcb", cat: "team", tier: 2,
      ph: "Has your player represented Royal Challengers Bangalore?",
      eval: (p) => p.teams.includes('RCB') },

    { id: "t_kkr", cat: "team", tier: 2,
      ph: "Has your player turned out for Kolkata Knight Riders?",
      eval: (p) => p.teams.includes('KKR') },

    { id: "t_srh", cat: "team", tier: 2,
      ph: "Has your player played under the Sunrisers Hyderabad banner?",
      eval: (p) => p.teams.includes('SRH') },

    { id: "t_dc", cat: "team", tier: 2,
      ph: "Has your player represented Delhi — Capitals or Daredevils?",
      eval: (p) => p.teams.includes('DC') },

    { id: "t_rr", cat: "team", tier: 2,
      ph: "Has your player worn the Rajasthan Royals colours?",
      eval: (p) => p.teams.includes('RR') },

    { id: "t_pbks", cat: "team", tier: 2,
      ph: "Has your player played for Punjab Kings or the former Kings XI Punjab?",
      eval: (p) => p.teams.includes('PBKS') },

    { id: "t_gt", cat: "team", tier: 2,
      ph: "Has your player been part of the Gujarat Titans?",
      eval: (p) => p.teams.includes('GT') },

    { id: "t_lsg", cat: "team", tier: 2,
      ph: "Has your player featured for Lucknow Super Giants?",
      eval: (p) => p.teams.includes('LSG') },


    // ═══════════════════════════════════════════════════════
    // EXPERIENCE — How much have they played?
    // ═══════════════════════════════════════════════════════
    { id: "m100", cat: "exp", tier: 2,
      ph: "Has your player appeared in 100 or more IPL matches?",
      eval: (p) => p.matches >= 100 },

    { id: "m200", cat: "exp", tier: 3,
      ph: "Is your player a member of the exclusive 200-match club?",
      eval: (p) => p.matches >= 200 },
];

export default questions;
