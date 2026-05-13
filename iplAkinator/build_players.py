"""
IPL Akinator — Player Data Builder v3 (ALL PLAYERS)
Parses IPL.sql and builds profiles for EVERY player who ever appeared in the IPL.
"""
import json
from collections import defaultdict

SQL_FILE = r'c:\Users\Administrator\Pictures\IPLAkinator\IPL.sql'
OUT_FILE = r'c:\Users\Administrator\Pictures\IPLAkinator\players_data.js'

OVERSEAS = set()
for n in """AB de Villiers,AC Gilchrist,AD Mathews,AD Russell,AJ Finch,AJ Tye,
Aiden Markram,AL Hales,Anrich Nortje,BA Stokes,BB McCullum,BJ Hodge,
B Lee,C de Grandhomme,Cameron Green,CH Gayle,CH Morris,CJ Anderson,
CJ Jordan,CJ McKay,CL White,Colin Ingram,Colin Munro,D Bravo,
D du Plessis,D Mitchell,D Pretorius,D Wiese,DA Miller,DA Warner,
DW Steyn,Dale Steyn,Daniel Sams,DJ Bravo,DJ Hussey,DJ Malan,
DL Vettori,DPMD Jayawardene,DR Smith,Devon Conway,E Lewis,
Eoin Morgan,F du Plessis,Faf du Plessis,G Coetzee,GJ Maxwell,GJ Bailey,
GC Smith,H Klaasen,Heinrich Klaasen,I Tahir,Imran Tahir,J Archer,
J Buttler,J Hazlewood,JA Morkel,JC Buttler,JD Ryder,JE Taylor,
JH Kallis,JM Bairstow,JO Holder,JP Duminy,JP Faulkner,JR Hazlewood,
K Rabada,KA Pollard,KC Sangakkara,KS Williamson,Kyle Jamieson,
L Livingstone,L Ngidi,Liam Livingstone,LS Livingstone,M Marsh,
M Ntini,M Starc,MA Starc,Marco Jansen,Matt Henry,
Matheesha Pathirana,Maheesh Theekshana,M Theekshana,MEK Hussey,
MG Johnson,MJ Clarke,MJ Guptill,MJ Henry,MJ McClenaghan,MJ Santner,
ML Hayden,MM Ali,Moeen Ali,Mohammad Hafeez,Mohammad Nabi,
Morne Morkel,MP Stoinis,MS Wade,Mustafizur Rahman,Mujeeb Ur Rahman,
N Pooran,NA Coulter-Nile,NM Coulter-Nile,O Thomas,Phil Salt,
Q de Kock,Quinton de Kock,R Khan,Rashid Khan,RR Rossouw,
S Al Hasan,S Curran,S Hetmyer,S Lamichhane,S Marsh,S Narine,
SP Narine,SA Abbott,Sam Curran,SM Curran,Sam Billings,
Shahid Afridi,SR Watson,Shane Watson,Shane Warne,Shimron Hetmyer,
SL Malinga,SPD Smith,Steven Smith,T Boult,T Head,T Natarajan,
T Stubbs,TA Boult,Tim David,Tim Southee,TG Southee,TR Banton,
Tristan Stubbs,Wanindu Hasaranga,WD Parnell,Z Khan,
AA Noffke,P Kumar,JR Hopes,S Sreesanth,IK Pathan,PP Chawla,
RP Singh,A Nehra,SE Marsh,M Morkel,JA Morkel,KD Mills,
DE Bollinger,RJ Harris,SB Jakati,Shakib Al Hasan,
NLTC Perera,Thisara Perera,MF Maharoof,
KP Pietersen,IR Bell,A Symonds,JN Rhodes,RT Ponting,
AC Voges,SE Bond,DJ Thornely,DNT Zoysa,TM Dilshan,
UT Yadav,GD McGrath,M Muralitharan,A Kumble,J Srinath,
ST Jayasuriya,LRPL Taylor,RG Taylor,MN Samuels,MS Bisla,
CA Lynn,JJ Roy,AJ Turner,JDS Neesham,N Rana,
BJ Haddin,TWM Latham,HM Amla,RN ten Doeschate,JEC Franklin,
SB Styris,KP Appanna,Azhar Mahmood,Shoaib Malik,Shoaib Akhtar,
Abdul Razzaq,Kamran Akmal,Umar Gul,Shahid Afridi,
PJ Cummins,Pat Cummins,JR Philippe,MW Short,
A Zampa,Adam Zampa,DP Conway,Devon Conway,
GJ Maxwell,Glenn Maxwell,Marcus Stoinis,
Rachin Ravindra,WG Jacks,Will Jacks,
Lockie Ferguson,Trent Boult,Kane Williamson,
Mitchell Marsh,Josh Hazlewood,Travis Head,
Nathan Coulter-Nile,Marcus Harris,
Lungi Ngidi,Dwaine Pretorius,Gerald Coetzee,
David Miller,Rassie van der Dussen,
Alzarri Joseph,Odean Smith,Rovman Powell,
Brandon King,Shai Hope,Keemo Paul,
Sandeep Lamichhane,Mohammad Amir,Hasan Ali,
Fakhar Zaman,Babar Azam,
Mitchell Santner,Tom Latham,Jimmy Neesham,
Daryl Mitchell,Glenn Phillips,
Heinrich Klaasen,Marco Jansen,Dewald Brevis,
Ryan Rickelton,Reeza Hendricks,
Phil Salt,Harry Brook,Jos Buttler,
Sam Curran,Ben Stokes,Moeen Ali,
Liam Livingstone,Jason Roy,Alex Hales,
Tom Banton,Tymal Mills,Chris Woakes,
Mark Wood,Jofra Archer,Chris Jordan,
Reece Topley,Adil Rashid,
Finn Allen,Adam Milne,
Tim Seifert,Ish Sodhi,
Matthew Wade,Josh Inglis,
Jhye Richardson,Jason Behrendorff,
Riley Meredith,Andrew Tye,
Chris Lynn,Ben Cutting,
Dan Christian,Shaun Marsh,
Aaron Finch,George Bailey,
Dirk Nannes,Brad Hodge,
Brad Hogg,Michael Clarke,
David Hussey,Michael Hussey,
Nathan Bracken,Brett Lee,
Glenn McGrath,Matthew Hayden,
Adam Gilchrist,Mike Hussey,
Andrew Symonds,Cameron White,
Ricky Ponting,Kevin Pietersen,
Ian Bell,Darren Sammy,
Kieron Pollard,Dwayne Bravo,
Sunil Narine,Chris Gayle,
AB de Villiers,Dale Steyn,
Morne Morkel,Faf du Plessis,
Imran Tahir,David Warner,
Shane Watson,Shane Warne,
Lasith Malinga,Kumar Sangakkara,
Mahela Jayawardene,Tillakaratne Dilshan,
Muttiah Muralitharan,Sanath Jayasuriya,
Andre Russell,Eoin Morgan,
Ben McDermott,Josh Philippe,
Romario Shepherd,Akeal Hosein,
Obed McCoy,Hayden Walsh,
Fabian Allen,Carlos Brathwaite,
Samuel Badree,Ravi Rampaul,
Fidel Edwards,Corey Anderson,
James Faulkner,Daniel Christian,
Moises Henriques,Ben Dunk,
Tom Curran,David Willey,
Tymal Mills,Mark Wood,
Jake Ball,Chris Woakes""".strip().replace('\n','').split(','):
    n = n.strip()
    if n:
        OVERSEAS.add(n)

COLS = [
    '_idx','match_id','date','match_type','event_name','innings',
    'batting_team','bowling_team','over','ball','ball_no','batter',
    'bat_pos','runs_batter','balls_faced','bowler','valid_ball',
    'runs_extras','runs_total','runs_bowler','runs_not_boundary',
    'extra_type','non_striker','non_striker_pos','wicket_kind',
    'player_out','fielders','runs_target','review_batter',
    'team_reviewed','review_decision','umpire','umpires_call',
    'player_of_match','match_won_by','win_outcome','toss_winner',
    'toss_decision','venue','city','day','month','year','season',
    'gender','team_type','superover_winner','result_type','method',
    'balls_per_over','overs','event_match_no','stage','match_number',
    'team_runs','team_balls','team_wicket','new_batter',
    'power_surge_start','batter_runs','batter_balls','bowler_wicket',
    'batting_partners','next_batter','striker_out'
]
COL_IDX = {name: i for i, name in enumerate(COLS)}

def parse_tuple_line(line):
    line = line.strip()
    if not line.startswith('('):
        return None
    if line.endswith(','):
        line = line[:-1]
    if line.endswith(';'):
        line = line[:-1]
    line = line.strip()
    if line.endswith(')'):
        line = line[1:-1]
    else:
        line = line[1:]
    
    vals = []
    i = 0
    current = []
    in_quote = False
    escaped = False
    
    while i < len(line):
        c = line[i]
        if escaped:
            current.append(c)
            escaped = False
            i += 1
            continue
        if c == '\\':
            escaped = True
            i += 1
            continue
        if c == "'" and not in_quote:
            in_quote = True
            i += 1
            continue
        if c == "'" and in_quote:
            if i + 1 < len(line) and line[i+1] == "'":
                current.append("'")
                i += 2
                continue
            in_quote = False
            i += 1
            continue
        if c == ',' and not in_quote:
            v = ''.join(current).strip()
            vals.append(None if v == 'NULL' else v)
            current = []
            i += 1
            continue
        current.append(c)
        i += 1
    
    v = ''.join(current).strip()
    vals.append(None if v == 'NULL' else v)
    return vals

def g(vals, col):
    idx = COL_IDX.get(col)
    if idx is None or idx >= len(vals):
        return None
    return vals[idx]

def gi(vals, col):
    v = g(vals, col)
    try: return int(v)
    except: return 0

print("=" * 60)
print("IPL AKINATOR - Player Database Builder v3 (ALL PLAYERS)")
print("=" * 60)

bat_runs = defaultdict(int)
bat_balls = defaultdict(int)
bat_fours = defaultdict(int)
bat_sixes = defaultdict(int)
bat_teams = defaultdict(set)
bat_seasons = defaultdict(set)
bat_matches = defaultdict(set)
bat_positions = defaultdict(lambda: defaultdict(int))
innings_runs = defaultdict(lambda: defaultdict(int))
innings_balls_map = defaultdict(lambda: defaultdict(int))

bowl_wickets = defaultdict(int)
bowl_balls = defaultdict(int)
bowl_runs = defaultdict(int)
bowl_teams = defaultdict(set)
bowl_seasons = defaultdict(set)
bowl_matches = defaultdict(set)

stumping_fielders = defaultdict(int)
caught_fielders = defaultdict(int)
player_pom = defaultdict(set)
player_teams_all = defaultdict(set)
player_seasons_all = defaultdict(set)
title_wins = {}
player_catches = defaultdict(int)

print("Phase 1: Parsing SQL (283K+ deliveries)...")
row_count = 0

with open(SQL_FILE, 'r', encoding='utf-8') as f:
    for line in f:
        if not line.strip().startswith('('):
            continue
        
        vals = parse_tuple_line(line)
        if not vals or len(vals) < 60:
            continue
        
        row_count += 1
        if row_count % 50000 == 0:
            print(f"  Rows: {row_count:,}", flush=True)
        
        batter = g(vals, 'batter')
        bowler = g(vals, 'bowler')
        match_id = g(vals, 'match_id')
        innings = g(vals, 'innings')
        batting_team = g(vals, 'batting_team')
        bowling_team = g(vals, 'bowling_team')
        r_batter = gi(vals, 'runs_batter')
        bat_pos = gi(vals, 'bat_pos')
        valid = gi(vals, 'valid_ball')
        wk_kind = g(vals, 'wicket_kind')
        p_out = g(vals, 'player_out')
        fielders = g(vals, 'fielders')
        pom = g(vals, 'player_of_match')
        season = g(vals, 'season')
        stage = g(vals, 'stage')
        won_by = g(vals, 'match_won_by')
        non_striker = g(vals, 'non_striker')
        
        if not batter or not bowler:
            continue
        
        # Batter
        bat_runs[batter] += r_batter
        if valid:
            bat_balls[batter] += 1
        if r_batter == 4:
            bat_fours[batter] += 1
        if r_batter == 6:
            bat_sixes[batter] += 1
        if batting_team:
            bat_teams[batter].add(batting_team)
            player_teams_all[batter].add(batting_team)
        if season:
            bat_seasons[batter].add(season)
            player_seasons_all[batter].add(season)
        if match_id:
            bat_matches[batter].add(match_id)
            key = (match_id, str(innings))
            innings_runs[batter][key] += r_batter
            if valid:
                innings_balls_map[batter][key] += 1
        if bat_pos > 0:
            bat_positions[batter][bat_pos] += 1
        
        if non_striker:
            if batting_team:
                player_teams_all[non_striker].add(batting_team)
            if season:
                player_seasons_all[non_striker].add(season)
        
        # Bowler
        if valid:
            bowl_balls[bowler] += 1
        bowl_runs[bowler] += gi(vals, 'runs_bowler')
        if bowling_team:
            bowl_teams[bowler].add(bowling_team)
            player_teams_all[bowler].add(bowling_team)
        if season:
            bowl_seasons[bowler].add(season)
            player_seasons_all[bowler].add(season)
        if match_id:
            bowl_matches[bowler].add(match_id)
        
        if wk_kind and p_out and wk_kind not in ('run out', 'retired hurt', 'retired out', 'obstructing the field', 'retired not out'):
            bowl_wickets[bowler] += 1
        
        if wk_kind == 'stumped' and fielders:
            keeper = fielders.strip().strip('"').strip("'")
            if keeper:
                stumping_fielders[keeper] += 1
        
        if wk_kind == 'caught' and fielders:
            catcher = fielders.strip().strip('"').strip("'")
            if catcher:
                caught_fielders[catcher] += 1
                player_catches[catcher] += 1
        
        if pom and match_id:
            player_pom[pom].add(match_id)
        
        if stage and 'Final' in str(stage) and 'Semi' not in str(stage):
            if won_by and season:
                title_wins[season] = won_by

print(f"\n  Total deliveries: {row_count:,}")

print("\nPhase 2: Building ALL player profiles...")

TEAM_ABBR = {
    'Chennai Super Kings': 'CSK', 'Mumbai Indians': 'MI',
    'Royal Challengers Bangalore': 'RCB', 'Royal Challengers Bengaluru': 'RCB',
    'Kolkata Knight Riders': 'KKR', 'Delhi Capitals': 'DC',
    'Delhi Daredevils': 'DC', 'Rajasthan Royals': 'RR',
    'Sunrisers Hyderabad': 'SRH', 'Kings XI Punjab': 'PBKS',
    'Punjab Kings': 'PBKS', 'Gujarat Titans': 'GT',
    'Lucknow Super Giants': 'LSG', 'Rising Pune Supergiant': 'RPS',
    'Rising Pune Supergiants': 'RPS', 'Gujarat Lions': 'GL',
    'Kochi Tuskers Kerala': 'KTK', 'Pune Warriors': 'PWI',
    'Deccan Chargers': 'DCH',
}

def abbr(teams):
    return sorted({TEAM_ABBR.get(t, t) for t in teams})

def parse_seasons(ss):
    years = set()
    for s in ss:
        try:
            y = int(str(s).split('/')[0])
            if y < 100: y += 2000
            years.add(y)
        except: pass
    return sorted(years)

all_players = set()
all_players |= set(bat_runs.keys())
all_players |= set(bowl_wickets.keys())
all_players |= set(bowl_balls.keys())

# Also add non-strikers and fielders we tracked
for p in player_teams_all:
    all_players.add(p)

print(f"  Total unique players: {len(all_players)}")

# NO MINIMUM FILTER - include every single player
qualified = sorted(all_players)
print(f"  Players to export: {len(qualified)}")

def match_count(p):
    return len(bat_matches.get(p, set()) | bowl_matches.get(p, set()))

profiles = []
for p in qualified:
    mc = match_count(p)
    if mc == 0:
        continue  # Skip players we only saw as non-strikers with no actual ball data
    
    runs = bat_runs.get(p, 0)
    b_balls = bat_balls.get(p, 0)
    wkts = bowl_wickets.get(p, 0)
    bw_balls = bowl_balls.get(p, 0)
    bw_runs_c = bowl_runs.get(p, 0)
    
    if runs >= 300 and wkts >= 30:
        role = 'All-rounder'
    elif wkts >= 15 and runs < 300:
        role = 'Bowler'
    elif wkts >= 10 and runs < 150:
        role = 'Bowler'
    elif runs >= 50:
        role = 'Batsman'
    elif wkts >= 3:
        role = 'Bowler'
    else:
        role = 'Batsman'
    
    teams = abbr(player_teams_all.get(p, set()))
    seasons = parse_seasons(player_seasons_all.get(p, set()))
    debut = min(seasons) if seasons else 2008
    last = max(seasons) if seasons else 2008
    
    pos = bat_positions.get(p, {})
    total_pos = sum(pos.values()) or 1
    opener_pct = (pos.get(1, 0) + pos.get(2, 0)) / total_pos
    middle_pct = sum(pos.get(i, 0) for i in range(3, 6)) / total_pos
    lower_pct = sum(pos.get(i, 0) for i in range(6, 12)) / total_pos
    
    hi_score = 0
    centuries = 0
    fifties = 0
    for key, r in innings_runs.get(p, {}).items():
        if r > hi_score: hi_score = r
        if r >= 100: centuries += 1
        elif r >= 50: fifties += 1
    
    is_wk = stumping_fielders.get(p, 0) >= 1 or (stumping_fielders.get(p, 0) >= 1 and caught_fielders.get(p, 0) >= 5)
    if is_wk and role == 'Batsman':
        role = 'Wicketkeeper-Batsman'
    
    pom_count = len(player_pom.get(p, set()))
    
    titles = 0
    p_teams_full = player_teams_all.get(p, set())
    p_seasons_set = player_seasons_all.get(p, set())
    for ssn, winner in title_wins.items():
        if winner in p_teams_full and ssn in p_seasons_set:
            titles += 1
    
    sr = round((runs / max(b_balls, 1)) * 100, 1) if b_balls > 0 else 0
    overs = bw_balls / 6
    econ = round(bw_runs_c / max(overs, 0.1), 2) if bw_balls >= 6 else None
    
    catches = player_catches.get(p, 0)
    fame = runs/100 + wkts/5 + pom_count*2 + len(seasons) + (10 if centuries > 0 else 0) + (mc / 10)
    
    profiles.append({
        'id': p.replace(' ', '_').replace("'", '').lower(),
        'name': p,
        'role': role,
        'teams': teams,
        'seasons': seasons,
        'debut': debut,
        'last_year': last,
        'num_seasons': len(seasons),
        'runs': runs,
        'wickets': wkts,
        'hi_score': hi_score,
        'centuries': centuries,
        'fifties': fifties,
        'is_opener': opener_pct > 0.5,
        'is_middle': middle_pct > 0.4,
        'is_finisher': lower_pct > 0.3 and role != 'Bowler',
        'is_wk': is_wk,
        'is_overseas': p in OVERSEAS,
        'is_active': last >= 2024,
        'pom': pom_count,
        'titles': titles,
        'sr': sr,
        'econ': econ,
        'matches': mc,
        'fours': bat_fours.get(p, 0),
        'sixes': bat_sixes.get(p, 0),
        'catches': catches,
        'fame': round(fame, 1),
    })

profiles.sort(key=lambda x: x['fame'], reverse=True)

print(f"  Built {len(profiles)} profiles.")
print(f"\n  Top 20 by fame:")
for p in profiles[:20]:
    print(f"    {p['name']:30s} runs={p['runs']:5d} wkts={p['wickets']:3d} matches={p['matches']:3d} fame={p['fame']:.1f}")

js = f"// IPL Akinator Player Database - ALL PLAYERS\n"
js += f"// {len(profiles)} players | IPL 2008-2026 | {row_count:,} deliveries\n"
js += f"// Auto-generated - do not edit\n\n"
js += "const PLAYERS_DB = " + json.dumps(profiles, ensure_ascii=False) + ";\n"

with open(OUT_FILE, 'w', encoding='utf-8') as f:
    f.write(js)

print(f"\nDone! Written {OUT_FILE} ({len(js):,} bytes) with {len(profiles)} players")
