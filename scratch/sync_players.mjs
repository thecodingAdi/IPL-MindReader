import fs from 'fs';
import playersData from '../data/players.js';
// Using raw string read for the other file since it might not be a module we can import easily
const otherPlayersText = fs.readFileSync('./iplAkinator/players.js', 'utf8');
// Extract the array content
const match = otherPlayersText.match(/const players = (\[[\s\S]*?\]);/);
if (!match) {
    console.error("Could not find players array in iplAkinator/players.js");
    process.exit(1);
}
// This is risky but since we are in a controlled scratch script...
// Actually let's just parse it more safely if possible, but for a one-off it's okay.
const otherPlayers = eval(match[1]);

const existingNames = new Set(playersData.map(p => p.name));
const existingDisplayNames = new Set(playersData.map(p => p.displayName));

const newPlayers = [];

for (const p of otherPlayers) {
    if (existingNames.has(p.common_name) || existingDisplayNames.has(p.common_name)) {
        continue;
    }
    
    // Map properties to tags
    const tags = [];
    if (p.playing_role) tags.push(p.playing_role.toLowerCase());
    if (p.nationality) tags.push(p.nationality.toLowerCase());
    if (p.is_overseas) tags.push("overseas");
    else tags.push("indian");
    
    if (p.is_currently_active) tags.push("active");
    else tags.push("retired");
    
    if (p.is_captain_ever) tags.push("captain");
    if (p.is_finisher) tags.push("finisher");
    if (p.is_opener) tags.push("opener");
    if (p.is_wicketkeeper) tags.push("wicketkeeper");
    if (p.orange_cap_won) tags.push("orange-cap");
    if (p.purple_cap_won) tags.push("purple-cap");
    
    if (p.ipl_titles_won > 0) tags.push("title-winner");
    
    // Team tags
    if (p.ipl_teams) {
        p.ipl_teams.forEach(t => tags.push(t.toLowerCase()));
    }
    
    // Default era tags
    tags.push("post-2015"); // Most modern players are post-2015
    
    newPlayers.push({
        name: p.common_name, // fallback name
        displayName: p.full_name || p.common_name,
        tags: [...new Set(tags)]
    });
}

console.log(`Adding ${newPlayers.length} new players from iplAkinator/players.js`);

const updatedPlayers = [...newPlayers, ...playersData];

const fileContent = `// IPL Akinator Player Database
// Contains enriched tags for accuracy
const players = ${JSON.stringify(updatedPlayers, null, 2)};

export default players;
`;

fs.writeFileSync('./data/players.js', fileContent);
console.log("Updated data/players.js successfully.");
