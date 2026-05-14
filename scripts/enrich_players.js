/**
 * Enrich players.json with new properties needed for improved question bank:
 *   - nationality (string)
 *   - is_captain (boolean)
 *   - is_left_handed (boolean)
 *   - is_pacer (boolean)
 *   - is_spinner (boolean)
 *
 * Also fixes known is_overseas data errors.
 */
const fs = require('fs');
const path = require('path');

const PLAYERS_FILE = path.join(__dirname, '..', 'data', 'players.json');

// ─── NATIONALITY LOOKUP (for overseas players) ───
// Maps player IDs to their nationality.
// Indian players default to "Indian" unless listed here with a correction.
const NATIONALITY = {
  // Australian
  da_warner: 'Australian', sr_watson: 'Australian', gj_maxwell: 'Australian',
  mek_hussey: 'Australian', se_marsh: 'Australian', ac_gilchrist: 'Australian',
  spd_smith: 'Australian', bb_mccullum: 'New Zealander', // NZ, not Aus
  aj_finch: 'Australian', ca_lynn: 'Australian', mp_stoinis: 'Australian',
  pj_cummins: 'Australian', ma_starc: 'Australian', tm_head: 'Australian',
  bj_hodge: 'Australian', mg_johnson: 'Australian', mr_marsh: 'Australian',
  a_symonds: 'Australian', dj_hussey: 'Australian', cl_white: 'Australian',
  gj_bailey: 'Australian', dt_christian: 'Australian', mc_henriques: 'Australian',
  c_green: 'Australian', nm_coulter_nile: 'Australian',
  mj_mcclenaghan: 'New Zealander', // NZ
  de_bollinger: 'Australian', bw_hilfenhaus: 'Australian',
  ls_livingstone: 'English',
  wg_jacks: 'English',

  // West Indian
  ch_gayle: 'West Indian', ad_russell: 'West Indian', ka_pollard: 'West Indian',
  dj_bravo: 'West Indian', sp_narine: 'West Indian', n_pooran: 'West Indian',
  so_hetmyer: 'West Indian', e_lewis: 'West Indian', cr_brathwaite: 'West Indian',
  djg_sammy: 'West Indian', lmp_simmons: 'West Indian', r_powell: 'West Indian',
  kk_cooper: 'West Indian', r_shepherd: 'West Indian',
  bcj_cutting: 'Australian',

  // South African
  ab_de_villiers: 'South African', f_du_plessis: 'South African',
  da_miller: 'South African', q_de_kock: 'South African', h_klaasen: 'South African',
  dw_steyn: 'South African', ja_morkel: 'South African', m_morkel: 'South African',
  jp_duminy: 'South African', gc_smith: 'South African', hh_gibbs: 'South African',
  hm_amla: 'South African', ak_markram: 'South African',
  imran_tahir: 'South African', ch_morris: 'South African',
  k_rabada: 'South African', l_ngidi: 'South African',
  a_nortje: 'South African', rr_rossouw: 'South African',
  dp_nannes: 'Australian', // Dirk Nannes was Australian
  mv_boucher: 'South African', wd_parnell: 'South African',
  re_van_der_merwe: 'South African', d_brevis: 'South African',
  t_stubbs: 'South African',

  // English
  ba_stokes: 'English', jm_bairstow: 'English', sm_curran: 'English',
  mm_ali: 'English', pd_salt: 'English', ejg_morgan: 'English',
  kp_pietersen: 'English', jc_archer: 'English', cj_jordan: 'English',
  cr_woakes: 'English', rs_bopara: 'English', sw_billings: 'English',
  hc_brook: 'English', jj_roy: 'English', ad_mascarenhas: 'English',
  nt_ellis: 'Australian', // Nathan Ellis is Australian

  // New Zealand
  ta_boult: 'New Zealander', ks_williamson: 'New Zealander',
  dp_conway: 'New Zealander', mj_santner: 'New Zealander',
  tg_southee: 'New Zealander', lh_ferguson: 'New Zealander',
  lrpl_taylor: 'New Zealander', jd_ryder: 'New Zealander',
  dl_vettori: 'New Zealander', cj_anderson: 'New Zealander',

  // Sri Lankan
  sl_malinga: 'Sri Lankan', dpmd_jayawardene: 'Sri Lankan',
  kc_sangakkara: 'Sri Lankan', tm_dilshan: 'Sri Lankan',
  nltc_perera: 'Sri Lankan', ad_mathews: 'Sri Lankan',
  m_theekshana: 'Sri Lankan', pwh_de_silva: 'Sri Lankan',
  st_jayasuriya: 'Sri Lankan', m_muralitharan: 'Sri Lankan',
  mf_maharoof: 'Sri Lankan', m_pathirana: 'Sri Lankan',

  // Afghan
  rashid_khan: 'Afghan', mohammad_nabi: 'Afghan',
  mujeeb_ur_rahman: 'Afghan', noor_ahmad: 'Afghan',

  // Bangladeshi
  shakib_al_hasan: 'Bangladeshi', mustafizur_rahman: 'Bangladeshi',

  // Pakistani
  azhar_mahmood: 'Pakistani',

  // Jamaican / Other WI
  jc_buttler: 'English', // Jos Buttler is English

  // Australian (additional)
  aj_tye: 'Australian', jr_hazlewood: 'Australian', a_zampa: 'Australian',
  rj_harris: 'Australian', b_lee: 'Australian',
};

// ─── FIX is_overseas ERRORS ───
// Players wrongly marked as overseas (they're Indian)
const SHOULD_BE_INDIAN = new Set([
  'pp_chawla', 'n_rana', 'ut_yadav', 'ik_pathan', 'a_nehra',
  'ms_bisla', 'p_kumar', 's_sreesanth', 'rp_singh', 'a_kumble',
  'sb_jakati', 'a_singh', 't_natarajan', 'so_hetmyer',
]);
// Players wrongly marked as Indian (they're overseas)
const SHOULD_BE_OVERSEAS = new Set([
  'lmp_simmons', 'mc_henriques', 'dt_christian', 'so_hetmyer',
]);

// ─── CAPTAIN LOOKUP ───
const CAPTAINS = new Set([
  'ms_dhoni', 'v_kohli', 'rg_sharma', 'g_gambhir', 'da_warner',
  'kl_rahul', 'ss_iyer', 'rr_pant', 'f_du_plessis', 'shubman_gill',
  'hh_pandya', 'ks_williamson', 'sr_watson', 'r_ashwin', 'sk_warne',
  'sc_ganguly', 'a_kumble', 'sr_tendulkar', 'ba_stokes', 'sv_samson',
  'am_rahane', 'v_sehwag', 's_dhawan', 'jh_kallis', 'ch_gayle',
  'ka_pollard', 'ejg_morgan', 'bb_mccullum', 'sp_narine',
  'r_dravid', 'ab_de_villiers', 'pj_cummins', 'kp_pietersen',
  'gc_smith', 'dpmd_jayawardene', 'kc_sangakkara', 'sl_malinga',
  'ad_mathews', 'da_miller', 'mk_pandey', 'ma_agarwal',
]);

// ─── LEFT-HANDED BATSMEN ───
const LEFT_HANDED = new Set([
  's_dhawan', 'sk_raina', 'yuvraj_singh', 'sc_ganguly', 'ch_gayle',
  'da_warner', 'q_de_kock', 'da_miller', 'ishan_kishan', 'd_padikkal',
  'tilak_varma', 'pp_shaw', 'ybk_jaiswal', 'ab_de_villiers', // ABD is right-handed actually
  'bb_mccullum', 'ac_gilchrist', 'mek_hussey', 'dp_conway',
  'm_vijay', 'rd_gaikwad', // Gaikwad is right-handed
  'abhishek_sharma', 'so_hetmyer', 'n_rana', 'b_sai_sudharsan',
  'dl_vettori', 'ejg_morgan', 'ba_stokes', 'sm_curran',
  'hm_amla', // Amla is right-handed actually
  'v_shankar', 'kv_sharma', 'e_lewis', 'priyansh_arya',
  'd_brevis', 'st_jayasuriya', 'tm_dilshan', // Dilshan is right-handed
]);
// Fix: Remove incorrectly marked left-handers
LEFT_HANDED.delete('ab_de_villiers'); // Right-handed
LEFT_HANDED.delete('rd_gaikwad'); // Right-handed
LEFT_HANDED.delete('hm_amla'); // Right-handed
LEFT_HANDED.delete('tm_dilshan'); // Right-handed

// ─── BOWLING STYLE ───
const PACERS = new Set([
  'jj_bumrah', 'sl_malinga', 'b_kumar', 'mohammed_shami', 'mohammed_siraj',
  'arshdeep_singh', 'ta_boult', 'k_rabada', 'dw_steyn', 'i_sharma',
  'ut_yadav', 'dl_chahar', 'sandeep_sharma', 'hv_patel', 'a_nehra',
  'z_khan', 'ja_morkel', 'm_morkel', 'p_kumar', 'pj_cummins',
  'ma_starc', 'jr_hazlewood', 'jc_archer', 'sn_thakur', 'rd_chahar',
  'l_ngidi', 'a_nortje', 'lh_ferguson', 'ds_kulkarni',
  't_natarajan', 'umran_malik', 'avesh_khan', 'sm_curran',
  'ch_morris', 'ab_dinda', 'rp_singh', 'r_vinay_kumar',
  'mm_sharma', 'tg_southee', 'b_lee', 'jd_unadkat',
  'mg_johnson', 'wd_parnell', 'm_jansen', 'cj_jordan',
  'nm_coulter_nile', 'de_bollinger', 'cr_woakes', 'aj_tye',
  'basil_thampi', 'harshit_rana', 'yash_dayal', 'vg_arora',
  'm_prasidh_krishna', 'mf_maharoof', 'ab_agarkar', 's_kaul',
  'p_awana', 'as_rajpoot', 'navdeep_saini', 'bw_hilfenhaus',
  'rj_harris', 's_aravind', 'tu_deshpande', 'mukesh_kumar',
  'shivam_mavi', 'kartik_tyagi', 'yash_thakur', 'akash_madhwal',
  'r_dhawan', 'ms_gony', 'pj_sangwan', 'm_pathirana',
  'mohsin_khan', 'l_balaji', 'dp_nannes', 's_sreesanth',
  'jo_holder', 'ad_mascarenhas', 'nt_ellis', 'as_joseph',
  'mj_mcclenaghan',
]);

const SPINNERS = new Set([
  'r_ashwin', 'ys_chahal', 'kuldeep_yadav', 'rashid_khan',
  'sp_narine', 'a_mishra', 'pp_chawla', 'harbhajan_singh',
  'cv_varun', 'imran_tahir', 'pp_ojha', 'sk_warne',
  'm_muralitharan', 'dl_vettori', 'ar_patel', 'washington_sundar',
  'kv_sharma', 'ravi_bishnoi', 'noor_ahmad', 'm_theekshana',
  'pwh_de_silva', 'r_tewatia', 'shakib_al_hasan',
  's_gopal', 'm_ashwin', 'sb_jakati', 'harmeet_singh',
  'ankit_sharma', 'iqbal_abdulla', 'bipul_sharma',
  'r_bhatia', 'k_gowtham', 'mujeeb_ur_rahman', 'a_zampa',
  'pv_tambe', 'suyash_sharma', 'harpreet_brar',
  'r_sai_kishore', 're_van_der_merwe', 'p_negi',
  'j_suchith', 'm_kartik', 'mohammad_nabi', 'm_markande',
  's_nadeem', 'sk_trivedi',
]);

// ─── MAIN ───
const raw = fs.readFileSync(PLAYERS_FILE, 'utf8');
const players = JSON.parse(raw);

let fixed_overseas = 0;
let enriched = 0;

for (const p of players) {
  // ── Fix is_overseas errors ──
  if (SHOULD_BE_INDIAN.has(p.id) && p.is_overseas) {
    p.is_overseas = false;
    fixed_overseas++;
  }
  if (SHOULD_BE_OVERSEAS.has(p.id) && !p.is_overseas) {
    p.is_overseas = true;
    fixed_overseas++;
  }

  // ── Nationality & Overseas sync ──
  if (NATIONALITY[p.id]) {
    p.nationality = NATIONALITY[p.id];
    // Force is_overseas true for non-Indian nationalities
    if (p.nationality !== 'Indian') {
      p.is_overseas = true;
    }
  } else if (!p.is_overseas) {
    p.nationality = 'Indian';
  } else {
    p.nationality = 'Overseas'; 
  }

  // ── Captain ──
  p.is_captain = CAPTAINS.has(p.id);

  // ── Left-handed ──
  // Check both ID and Name for common patterns
  p.is_left_handed = LEFT_HANDED.has(p.id) || (p.name && p.name.includes('Head'));

  // ── Bowling style ──
  p.is_pacer = PACERS.has(p.id);
  p.is_spinner = SPINNERS.has(p.id);

  enriched++;
}

// Write back
fs.writeFileSync(PLAYERS_FILE, JSON.stringify(players, null, 2));

console.log(`✅ Enriched ${enriched} players`);
console.log(`🔧 Fixed ${fixed_overseas} is_overseas errors`);
console.log(`📝 Fields added: nationality, is_captain, is_left_handed, is_pacer, is_spinner`);
