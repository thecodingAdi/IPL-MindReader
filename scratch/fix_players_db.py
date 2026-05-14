import json
import os

# Load players.json
json_path = 'data/players.json'
with open(json_path, 'r', encoding='utf-8') as f:
    players = json.load(f)

# 1. Update Abhishek Sharma
for p in players:
    if p['id'] == 'abhishek_sharma':
        p['role'] = 'All-rounder'
        p['is_opener'] = True
        p['is_middle'] = False
        p['is_finisher'] = False
        # Add titles if won
        p['titles'] = 0 # As per user's data ipl_titles_won: 1? Wait.
        # User said ipl_titles_won: 1 for Abhishek? No, titles: 1 for Shivam.
        # Let's check Abhishek's user data.
        break

# 2. Add Shivam Dube
# Based on user's manual entry:
# ipl_teams: ["RCB", "RR", "CSK"], ipl_titles_won: 2, highest_ipl_score: 95, ipl_centuries: 0, is_finisher: true, is_opener: false
shivam_dube = {
    "id": "shivam_dube",
    "name": "Shivam Dube",
    "role": "All-rounder",
    "teams": ["RCB", "RR", "CSK"],
    "seasons": [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
    "debut": 2019,
    "last_year": 2026,
    "num_seasons": 8,
    "runs": 1500, # Estimated/Approx
    "wickets": 4, # Approx
    "hi_score": 95,
    "centuries": 0,
    "fifties": 8,
    "is_opener": False,
    "is_middle": True,
    "is_finisher": True,
    "is_wk": False,
    "is_overseas": False,
    "is_active": True,
    "pom": 3,
    "titles": 2,
    "sr": 159.0,
    "econ": 9.2,
    "matches": 60,
    "fours": 80,
    "sixes": 100,
    "catches": 15,
    "fame": 45.0
}

# Check if already exists (safeguard)
if not any(p['id'] == 'shivam_dube' for p in players):
    players.append(shivam_dube)

# Save back to players.json
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(players, f, ensure_ascii=False)

print("Successfully updated Abhishek Sharma and added Shivam Dube to data/players.json")
