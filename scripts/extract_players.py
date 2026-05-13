import os
import json
import ast
import re

sql_file = 'iplAkinator/IPL.sql'
output_file = 'data/players.js'

if not os.path.exists(sql_file):
    print(f"File not found: {sql_file}")
    exit(1)

players_data = {}

def get_player(name):
    if name not in players_data:
        players_data[name] = {
            'teams': set(),
            'runs': 0,
            'balls_faced': 0,
            'balls_bowled': 0,
            'opener_count': 0,
            'finisher_runs': 0,
            'years': set()
        }
    return players_data[name]

# Helper to map full team names to our short tags
TEAM_MAP = {
    'Chennai Super Kings': 'csk',
    'Mumbai Indians': 'mi',
    'Royal Challengers Bangalore': 'rcb',
    'Kolkata Knight Riders': 'kkr',
    'Sunrisers Hyderabad': 'srh',
    'Delhi Capitals': 'dc',
    'Delhi Daredevils': 'dd',
    'Rajasthan Royals': 'rr',
    'Punjab Kings': 'pbks',
    'Kings XI Punjab': 'pbks',
    'Gujarat Titans': 'gt',
    'Lucknow Super Giants': 'lsg',
    'Rising Pune Supergiant': 'rps',
    'Rising Pune Supergiants': 'rps',
    'Gujarat Lions': 'gl',
    'Deccan Chargers': 'srh', # Map to SRH or DC? Let's just use original or srh
    'Pune Warriors': 'pwi',
    'Kochi Tuskers Kerala': 'ktk'
}

def parse_row(row_str):
    # row_str is like "141607, 335982, '2008-04-18', 'T20', ..."
    # we can use ast.literal_eval if we wrap it in a tuple
    # some fields might be NULL
    row_str = row_str.replace('NULL', 'None')
    try:
        # replace double quotes inside single quotes if any
        return ast.literal_eval(f"({row_str})")
    except Exception as e:
        return None

print("Starting extraction from IPL.sql...")

total_lines = 0
parsed_rows = 0

with open(sql_file, 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if line.startswith('(') and (line.endswith('),') or line.endswith(');')):
            # It's a data row
            row_content = line[1:-2] # remove '(' and '),'/');'
            row = parse_row(row_content)
            if row and len(row) >= 44: # ensure we have enough columns
                parsed_rows += 1
                
                # Column mapping based on standard IPL dataset
                # 6: batting_team
                # 7: bowling_team
                # 8: over
                # 11: batter
                # 12: bat_pos
                # 13: runs_batter
                # 15: bowler
                # 16: valid_ball
                # 42: year
                
                batting_team = row[6]
                bowling_team = row[7]
                over = row[8]
                batter = row[11]
                bat_pos = row[12]
                runs_batter = row[13]
                bowler = row[15]
                valid_ball = row[16]
                year = row[42]
                
                # Batter stats
                if batter:
                    p = get_player(batter)
                    if batting_team in TEAM_MAP:
                        p['teams'].add(TEAM_MAP[batting_team])
                    p['runs'] += runs_batter
                    p['balls_faced'] += 1
                    if bat_pos in [1, 2]:
                        p['opener_count'] += 1
                    if over >= 15:
                        p['finisher_runs'] += runs_batter
                    if year:
                        p['years'].add(year)
                        
                # Bowler stats
                if bowler:
                    p = get_player(bowler)
                    if bowling_team in TEAM_MAP:
                        p['teams'].add(TEAM_MAP[bowling_team])
                    if valid_ball:
                        p['balls_bowled'] += 1
                    if year:
                        p['years'].add(year)

print(f"Parsed {parsed_rows} rows. Found {len(players_data)} unique players.")

print("Generating tags...")
final_players = []

for name, stats in players_data.items():
    tags = []
    
    # Teams
    tags.extend(list(stats['teams']))
    
    # Active/Era
    if stats['years']:
        min_year = min(stats['years'])
        max_year = max(stats['years'])
        
        if min_year < 2015:
            tags.append("pre-2015")
        if max_year >= 2015:
            tags.append("post-2015")
        if max_year >= 2023:
            tags.append("active")
        else:
            tags.append("retired")
            
    # Roles
    balls_faced = stats['balls_faced']
    balls_bowled = stats['balls_bowled']
    
    if balls_faced > balls_bowled * 3 and balls_faced > 50:
        tags.append("batsman")
    elif balls_bowled > balls_faced * 3 and balls_bowled > 50:
        tags.append("bowler")
    elif balls_faced > 50 and balls_bowled > 50:
        tags.append("allrounder")
        
    # Opener / Finisher
    if stats['opener_count'] > (balls_faced * 0.3): # heavily opens
        tags.append("opener")
    if stats['finisher_runs'] > (stats['runs'] * 0.3) and stats['runs'] > 100:
        tags.append("finisher")
        
    if stats['runs'] > 3000 or balls_bowled > 1500:
        tags.append("legend")

    final_players.append({
        "name": name,
        "tags": tags
    })

# Write to data/players.js
js_content = f"""// AUTO-GENERATED from IPL.sql
// Contains {len(final_players)} players

const players = {json.dumps(final_players, indent=2)};

export default players;
"""

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully wrote {len(final_players)} players to {output_file}")
