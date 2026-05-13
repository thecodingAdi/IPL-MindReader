// Question bank: each question maps to a tag and how to interpret Yes/No
// Questions are ordered by approximate information gain (high-value discriminators first)
// The engine dynamically selects the best question based on entropy, but ordering
// helps with tie-breaking and ensures high-value questions are considered first.

const questions = [
  // === TIER 1: Highest information gain — splits pool roughly 50/50 or isolates key groups ===
  { id: "overseas",      tag: "overseas",       category: "nationality", question: "Is your player from outside India (overseas)?" },
  { id: "active",        tag: "active",         category: "era",         question: "Is your player currently active in the IPL?" },
  { id: "bowler",        tag: "bowler",         category: "role",        question: "Is your player primarily a bowler?" },
  { id: "opener",        tag: "opener",         category: "batting",     question: "Does your player usually open the batting?" },
  { id: "batsman",       tag: "batsman",        category: "role",        question: "Is your player primarily a batsman (not all-rounder or bowler)?" },
  { id: "pre-2015",      tag: "pre-2015",       category: "era",         question: "Did your player debut in IPL before 2015?" },

  // === TIER 2: Strong discriminators — split remaining candidates well ===
  { id: "captain",       tag: "captain",        category: "specialty",   question: "Has your player ever captained an IPL team?" },
  { id: "legend",        tag: "legend",         category: "specialty",   question: "Is your player considered an IPL legend / hall-of-famer?" },
  { id: "finisher",      tag: "finisher",       category: "batting",     question: "Is your player known as a finisher in the death overs?" },
  { id: "allrounder",    tag: "allrounder",     category: "role",        question: "Is your player an all-rounder?" },
  { id: "wicketkeeper",  tag: "wicketkeeper",   category: "role",        question: "Is your player a wicketkeeper?" },
  { id: "left-handed",   tag: "left-handed",    category: "batting",     question: "Is your player a left-handed batsman?" },
  { id: "spinner",       tag: "spinner",        category: "bowling",     question: "Is your player a spin bowler?" },
  { id: "pacer",         tag: "pacer",          category: "bowling",     question: "Is your player a pace/fast bowler?" },

  // === TIER 3: Specialty tags — narrow the pool for famous players ===
  { id: "aggressive",    tag: "aggressive",     category: "specialty",   question: "Is your player known for an aggressive, high strike-rate style?" },
  { id: "title-winner",  tag: "title-winner",   category: "award",       question: "Has your player won an IPL title as a key contributor?" },
  { id: "power-hitter",  tag: "power-hitter",   category: "specialty",   question: "Is your player known as a power-hitter / big six-hitter?" },
  { id: "death-overs",   tag: "death-overs",    category: "specialty",   question: "Is your player known for performing in the death overs?" },
  { id: "big-match-player", tag: "big-match-player", category: "specialty", question: "Is your player known for performing in high-pressure matches?" },
  { id: "orange-cap",    tag: "orange-cap",     category: "award",       question: "Has your player ever won the IPL Orange Cap?" },
  { id: "purple-cap",    tag: "purple-cap",     category: "award",       question: "Has your player ever won the IPL Purple Cap?" },
  { id: "anchor",        tag: "anchor",         category: "batting",     question: "Is your player known as a steady anchor who builds innings?" },

  // === TIER 4: Nationality specifics — narrow overseas players ===
  { id: "australian",    tag: "australian",     category: "nationality", question: "Is your player Australian?" },
  { id: "west-indian",   tag: "west-indian",    category: "nationality", question: "Is your player from the West Indies?" },
  { id: "south-african", tag: "south-african",  category: "nationality", question: "Is your player South African?" },

  // === TIER 5: Team affiliations — useful for late-game narrowing ===
  { id: "csk",           tag: "csk",            category: "team",        question: "Has your player ever played for Chennai Super Kings?" },
  { id: "mi",            tag: "mi",             category: "team",        question: "Has your player ever played for Mumbai Indians?" },
  { id: "rcb",           tag: "rcb",            category: "team",        question: "Has your player ever played for Royal Challengers Bangalore?" },
  { id: "kkr",           tag: "kkr",            category: "team",        question: "Has your player ever played for Kolkata Knight Riders?" },
  { id: "srh",           tag: "srh",            category: "team",        question: "Has your player ever played for Sunrisers Hyderabad?" },
  { id: "dc",            tag: "dc",             category: "team",        question: "Has your player ever played for Delhi Capitals?" },
  { id: "rr",            tag: "rr",             category: "team",        question: "Has your player ever played for Rajasthan Royals?" },
  { id: "pbks",          tag: "pbks",           category: "team",        question: "Has your player ever played for Punjab Kings / Kings XI Punjab?" },
  { id: "gt",            tag: "gt",             category: "team",        question: "Has your player ever played for Gujarat Titans?" },
  { id: "lsg",           tag: "lsg",            category: "team",        question: "Has your player ever played for Lucknow Super Giants?" },

  // === TIER 6: Bowling subtypes and rare specialties ===
  { id: "mystery-spinner", tag: "mystery-spinner", category: "bowling",   question: "Is your player known as a mystery spinner?" },
  { id: "swing-bowler",  tag: "swing-bowler",   category: "bowling",     question: "Is your player known for swing bowling?" },
  { id: "leg-spinner",   tag: "leg-spinner",    category: "bowling",     question: "Is your player a leg-spinner?" },
  { id: "explosive-opener", tag: "explosive-opener", category: "batting",   question: "Is your player known as an explosive, destructive opener?" },
  { id: "360-degree",    tag: "360-degree",     category: "specialty",   question: "Is your player known for 360-degree shot-making?" },
  { id: "mr-ipl",        tag: "mr-ipl",         category: "specialty",   question: "Is your player often called 'Mr. IPL'?" },

  // === TIER 7: Legacy team affiliations (rarely needed) ===
  { id: "dd",            tag: "dd",             category: "team",        question: "Has your player ever played for Delhi Daredevils?" },
  { id: "retired",       tag: "retired",        category: "era",         question: "Is your player officially retired from the IPL?" },
  { id: "post-2015",     tag: "post-2015",      category: "era",         question: "Did your player debut in the IPL after 2015?" }
];

export default questions;
