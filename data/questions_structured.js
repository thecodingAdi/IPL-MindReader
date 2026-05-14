const questions = [
    // ROLE
    { id: "role_bat", cat: "role", ph: "Is your player primarily known for their batting?", eval: (p) => ["Batsman", "Wicketkeeper-Batsman", "All-rounder"].includes(p.role) },
    { id: "role_bowl", cat: "role", ph: "Is your player primarily a bowler?", eval: (p) => ["Bowler", "All-rounder"].includes(p.role) },
    { id: "role_ar", cat: "role", ph: "Is your player an all-rounder?", eval: (p) => p.role === 'All-rounder' },
    { id: "role_wk", cat: "role", ph: "Is your player a wicketkeeper?", eval: (p) => p.is_wk || p.role.includes("Wicketkeeper") },


    // NATIONALITY
    { id: "overseas", cat: "nat", ph: "Is your player an overseas cricketer?", eval: (p) => p.is_overseas },
    { id: "indian", cat: "nat", ph: "Is your player an Indian cricketer?", eval: (p) => !p.is_overseas },

    // POSITION
    { id: "opener", cat: "pos", ph: "Is your player an opener?", eval: (p) => p.is_opener },
    { id: "middle", cat: "pos", ph: "Does your player bat in the middle order?", eval: (p) => p.is_middle },
    { id: "finisher", cat: "pos", ph: "Is your player known as a finisher?", eval: (p) => p.is_finisher },

    // ERA / ACTIVITY
    { id: "active", cat: "era", ph: "Is your player currently active in the IPL?", eval: (p) => p.is_active },
    { id: "veteran", cat: "era", ph: "Is your player an IPL veteran (10+ seasons)?", eval: (p) => p.num_seasons >= 10 },
    { id: "legend", cat: "era", ph: "Has your player played 15+ IPL seasons?", eval: (p) => p.num_seasons >= 15 },
    { id: "early_debut", cat: "era", ph: "Did your player debut before 2012?", eval: (p) => p.debut < 2012 },
    { id: "recent_debut", cat: "era", ph: "Did your player debut in 2018 or later?", eval: (p) => p.debut >= 2018 },
    { id: "retired", cat: "era", ph: "Has your player retired from the IPL?", eval: (p) => !p.is_active },

    // PERFORMANCE - BATTING
    { id: "r1k", cat: "bat", ph: "Has your player scored 1,000+ runs in the IPL?", eval: (p) => p.runs >= 1000 },
    { id: "r3k", cat: "bat", ph: "Has your player scored over 3,000 runs?", eval: (p) => p.runs >= 3000 },
    { id: "r5k", cat: "bat", ph: "Has your player crossed 5,000 runs?", eval: (p) => p.runs >= 5000 },
    { id: "century", cat: "bat", ph: "Has your player scored an IPL century?", eval: (p) => p.centuries > 0 },
    { id: "fifties_10", cat: "bat", ph: "Does your player have 10+ fifties?", eval: (p) => p.fifties >= 10 },
    { id: "sr_fast", cat: "bat", ph: "Does your player have a strike rate above 140?", eval: (p) => p.sr > 140 },
    { id: "six_hitter", cat: "bat", ph: "Has your player hit 50+ sixes?", eval: (p) => p.sixes >= 50 },

    // PERFORMANCE - BOWLING
    { id: "w50", cat: "bowl", ph: "Has your player taken 50+ IPL wickets?", eval: (p) => p.wickets >= 50 },
    { id: "w100", cat: "bowl", ph: "Has your player taken 100+ wickets?", eval: (p) => p.wickets >= 100 },
    { id: "w150", cat: "bowl", ph: "Is your player among the top wicket-takers (150+)?", eval: (p) => p.wickets >= 150 },
    { id: "econ_tight", cat: "bowl", ph: "Is your player an economical bowler (under 7.5)?", eval: (p) => p.econ && p.econ < 7.5 },

    // AWARDS & TITLES
    { id: "pom5", cat: "award", ph: "Has your player won 5+ Player of the Match awards?", eval: (p) => p.pom >= 5 },
    { id: "titles", cat: "award", ph: "Has your player won an IPL title?", eval: (p) => p.titles > 0 },
    { id: "multi_titles", cat: "award", ph: "Has your player won 3+ titles?", eval: (p) => p.titles >= 3 },

    // TEAMS
    { id: "t_csk", cat: "team", ph: "Has your player played for CSK?", eval: (p) => p.teams.includes('CSK') },
    { id: "t_mi", cat: "team", ph: "Has your player played for Mumbai Indians?", eval: (p) => p.teams.includes('MI') },
    { id: "t_rcb", cat: "team", ph: "Has your player represented RCB?", eval: (p) => p.teams.includes('RCB') },
    { id: "t_kkr", cat: "team", ph: "Has your player played for KKR?", eval: (p) => p.teams.includes('KKR') },
    { id: "t_srh", cat: "team", ph: "Has your player played for SRH?", eval: (p) => p.teams.includes('SRH') },
    { id: "t_dc", cat: "team", ph: "Has your player represented Delhi (Capitals/Daredevils)?", eval: (p) => p.teams.includes('DC') },
    { id: "t_rr", cat: "team", ph: "Has your player played for Rajasthan Royals?", eval: (p) => p.teams.includes('RR') },
    { id: "t_pbks", cat: "team", ph: "Has your player represented Punjab?", eval: (p) => p.teams.includes('PBKS') },
    { id: "t_gt", cat: "team", ph: "Has your player been part of Gujarat Titans?", eval: (p) => p.teams.includes('GT') },
    { id: "t_lsg", cat: "team", ph: "Has your player played for Lucknow Super Giants?", eval: (p) => p.teams.includes('LSG') },

    // EXPERIENCE
    { id: "m100", cat: "exp", ph: "Has your player played 100+ matches?", eval: (p) => p.matches >= 100 },
    { id: "m200", cat: "exp", ph: "Is your player a member of the 200-match club?", eval: (p) => p.matches >= 200 },
    { id: "one_team", cat: "exp", ph: "Has your player played for only one franchise?", eval: (p) => p.teams.length === 1 },
];

export default questions;
