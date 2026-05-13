// IPL Akinator Player Database
// Contains enriched tags for accuracy
const players = [
  {
    "name": "Yashasvi Jaiswal",
    "displayName": "Yashasvi Jaiswal",
    "tags": [
      "batsman",
      "indian",
      "active",
      "opener",
      "rr",
      "post-2015"
    ]
  },
  {
    "name": "SC Ganguly",
    "tags": [
      "pwi",
      "kkr",
      "pre-2015",
      "retired",
      "batsman",
      "opener",
      "indian",
      "left-handed",
      "captain",
      "aggressive",
      "title-winner"
    ],
    "displayName": "Sourav Ganguly"
  },
  {
    "name": "P Kumar",
    "tags": [
      "pbks",
      "srh",
      "gl",
      "mi",
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "BB McCullum",
    "tags": [
      "rcb",
      "csk",
      "gl",
      "ktk",
      "kkr",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener",
      "overseas",
      "new-zealander",
      "right-handed",
      "aggressive",
      "wicketkeeper",
      "power-hitter",
      "captain"
    ],
    "displayName": "Brendon McCullum"
  },
  {
    "name": "Z Khan",
    "tags": [
      "rcb",
      "mi",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "AA Noffke",
    "tags": [
      "rcb",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "RT Ponting",
    "tags": [
      "kkr",
      "mi",
      "pre-2015",
      "retired",
      "batsman",
      "opener",
      "overseas",
      "australian",
      "right-handed",
      "captain"
    ],
    "displayName": "Ricky Ponting"
  },
  {
    "name": "JH Kallis",
    "tags": [
      "rcb",
      "kkr",
      "pre-2015",
      "retired",
      "allrounder",
      "opener",
      "legend",
      "overseas",
      "south-african",
      "right-handed",
      "pacer"
    ],
    "displayName": "Jacques Kallis"
  },
  {
    "name": "SB Joshi",
    "tags": [
      "rcb",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "DJ Hussey",
    "tags": [
      "kkr",
      "csk",
      "pbks",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "CL White",
    "tags": [
      "srh",
      "rcb",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "Mohammad Hafeez",
    "tags": [
      "kkr",
      "pre-2015",
      "retired",
      "allrounder",
      "opener"
    ]
  },
  {
    "name": "R Dravid",
    "tags": [
      "rr",
      "rcb",
      "pre-2015",
      "retired",
      "batsman",
      "opener",
      "indian",
      "right-handed",
      "captain",
      "anchor"
    ],
    "displayName": "Rahul Dravid"
  },
  {
    "name": "AB Dinda",
    "tags": [
      "pwi",
      "rcb",
      "rps",
      "dd",
      "kkr",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "legend"
    ]
  },
  {
    "name": "W Jaffer",
    "tags": [
      "rcb",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "I Sharma",
    "tags": [
      "pbks",
      "srh",
      "rps",
      "gt",
      "kkr",
      "dc",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "legend",
      "indian",
      "right-handed",
      "pacer",
      "death-overs"
    ],
    "displayName": "Ishant Sharma"
  },
  {
    "name": "V Kohli",
    "tags": [
      "rcb",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "opener",
      "legend",
      "indian",
      "right-handed",
      "captain",
      "aggressive",
      "anchor",
      "orange-cap",
      "title-winner",
      "big-match-player",
      "mr-ipl"
    ],
    "displayName": "Virat Kohli"
  },
  {
    "name": "AB Agarkar",
    "tags": [
      "kkr",
      "dd",
      "pre-2015",
      "retired",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "MV Boucher",
    "tags": [
      "rcb",
      "kkr",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "B Akhil",
    "tags": [
      "rcb",
      "ktk",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "LR Shukla",
    "tags": [
      "kkr",
      "dd",
      "pre-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "PA Patel",
    "tags": [
      "srh",
      "csk",
      "mi",
      "ktk",
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "B Lee",
    "tags": [
      "kkr",
      "pbks",
      "pre-2015",
      "retired",
      "bowler",
      "finisher",
      "overseas",
      "australian",
      "right-handed",
      "pacer",
      "death-overs"
    ],
    "displayName": "Brett Lee"
  },
  {
    "name": "ML Hayden",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "S Sreesanth",
    "tags": [
      "rr",
      "ktk",
      "pbks",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "MEK Hussey",
    "tags": [
      "mi",
      "csk",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "JR Hopes",
    "tags": [
      "dd",
      "pbks",
      "pre-2015",
      "retired",
      "allrounder",
      "opener"
    ]
  },
  {
    "name": "IK Pathan",
    "tags": [
      "pbks",
      "srh",
      "gl",
      "rps",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher",
      "legend",
      "indian",
      "left-handed",
      "pacer",
      "left-arm-pacer",
      "swing-bowler"
    ],
    "displayName": "Irfan Pathan"
  },
  {
    "name": "MS Dhoni",
    "tags": [
      "csk",
      "rps",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "finisher",
      "legend",
      "indian",
      "right-handed",
      "captain",
      "wicketkeeper",
      "death-overs",
      "title-winner",
      "big-match-player",
      "mr-ipl",
      "power-hitter"
    ],
    "displayName": "MS Dhoni"
  },
  {
    "name": "SK Raina",
    "tags": [
      "csk",
      "gl",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "legend",
      "indian",
      "left-handed",
      "title-winner",
      "aggressive",
      "mr-ipl"
    ],
    "displayName": "Suresh Raina"
  },
  {
    "name": "K Goel",
    "tags": [
      "pbks",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "PP Chawla",
    "tags": [
      "kkr",
      "mi",
      "csk",
      "pbks",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "legend",
      "indian",
      "right-handed",
      "spinner",
      "leg-spinner",
      "title-winner"
    ],
    "displayName": "Piyush Chawla"
  },
  {
    "name": "WA Mota",
    "tags": [
      "pbks",
      "pre-2015",
      "retired",
      "allrounder"
    ]
  },
  {
    "name": "JDP Oram",
    "tags": [
      "rr",
      "mi",
      "csk",
      "pre-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "S Badrinath",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "MS Gony",
    "tags": [
      "gl",
      "srh",
      "csk",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "KC Sangakkara",
    "tags": [
      "srh",
      "pbks",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "M Muralitharan",
    "tags": [
      "rcb",
      "csk",
      "ktk",
      "pre-2015",
      "retired",
      "bowler",
      "legend",
      "overseas",
      "sri-lankan",
      "right-handed",
      "spinner",
      "off-spinner",
      "mystery-spinner",
      "title-winner"
    ],
    "displayName": "Muttiah Muralitharan"
  },
  {
    "name": "P Amarnath",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Joginder Sharma",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Yuvraj Singh",
    "tags": [
      "pbks",
      "srh",
      "pwi",
      "mi",
      "dd",
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher",
      "indian",
      "left-handed",
      "power-hitter",
      "aggressive",
      "big-match-player"
    ],
    "displayName": "Yuvraj Singh"
  },
  {
    "name": "SM Katich",
    "tags": [
      "pbks",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "T Kohli",
    "tags": [
      "rr",
      "pbks",
      "pre-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "GD McGrath",
    "tags": [
      "dd",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "YK Pathan",
    "tags": [
      "srh",
      "rr",
      "kkr",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher",
      "legend",
      "indian",
      "right-handed",
      "power-hitter",
      "aggressive",
      "title-winner"
    ],
    "displayName": "Yusuf Pathan"
  },
  {
    "name": "B Geeves",
    "tags": [
      "dd",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "SR Watson",
    "tags": [
      "rr",
      "rcb",
      "csk",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "opener",
      "legend",
      "overseas",
      "australian",
      "right-handed",
      "pacer",
      "power-hitter",
      "aggressive",
      "captain",
      "orange-cap",
      "title-winner"
    ],
    "displayName": "Shane Watson"
  },
  {
    "name": "M Kaif",
    "tags": [
      "rr",
      "rcb",
      "pbks",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "MF Maharoof",
    "tags": [
      "dd",
      "pre-2015",
      "retired",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "R Bhatia",
    "tags": [
      "rr",
      "rps",
      "kkr",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "DS Lehmann",
    "tags": [
      "rr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "RA Jadeja",
    "tags": [
      "gl",
      "rr",
      "csk",
      "ktk",
      "pre-2015",
      "post-2015",
      "active",
      "allrounder",
      "finisher",
      "legend",
      "indian",
      "left-handed",
      "spinner",
      "left-arm-orthodox",
      "title-winner",
      "big-match-player"
    ],
    "displayName": "Ravindra Jadeja"
  },
  {
    "name": "M Rawat",
    "tags": [
      "pwi",
      "rr",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "DL Vettori",
    "tags": [
      "rcb",
      "dd",
      "pre-2015",
      "retired",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "D Salunkhe",
    "tags": [
      "rr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "SK Warne",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "SK Trivedi",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "bowler",
      "legend"
    ]
  },
  {
    "name": "G Gambhir",
    "tags": [
      "kkr",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener",
      "legend",
      "indian",
      "left-handed",
      "captain",
      "title-winner",
      "big-match-player",
      "anchor"
    ],
    "displayName": "Gautam Gambhir"
  },
  {
    "name": "MM Patel",
    "tags": [
      "rr",
      "mi",
      "gl",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "V Sehwag",
    "tags": [
      "pbks",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "S Dhawan",
    "tags": [
      "pbks",
      "srh",
      "mi",
      "dd",
      "dc",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "opener",
      "legend",
      "indian",
      "left-handed",
      "aggressive",
      "orange-cap",
      "title-winner"
    ],
    "displayName": "Shikhar Dhawan"
  },
  {
    "name": "L Ronchi",
    "tags": [
      "mi",
      "pre-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "ST Jayasuriya",
    "tags": [
      "mi",
      "pre-2015",
      "retired",
      "allrounder",
      "opener"
    ]
  },
  {
    "name": "DJ Thornely",
    "tags": [
      "mi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "RV Uthappa",
    "tags": [
      "rr",
      "kkr",
      "pwi",
      "csk",
      "mi",
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener",
      "legend"
    ]
  },
  {
    "name": "PR Shah",
    "tags": [
      "rr",
      "mi",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "R Vinay Kumar",
    "tags": [
      "rcb",
      "mi",
      "kkr",
      "ktk",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "AM Nayar",
    "tags": [
      "pwi",
      "rr",
      "mi",
      "pbks",
      "pre-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "SM Pollock",
    "tags": [
      "mi",
      "pre-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "Harbhajan Singh",
    "tags": [
      "kkr",
      "mi",
      "csk",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "finisher",
      "legend",
      "indian",
      "right-handed",
      "spinner",
      "off-spinner",
      "title-winner",
      "death-overs"
    ],
    "displayName": "Harbhajan Singh"
  },
  {
    "name": "S Chanderpaul",
    "tags": [
      "rcb",
      "pre-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "A Nehra",
    "tags": [
      "srh",
      "pwi",
      "csk",
      "mi",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "legend",
      "indian",
      "left-handed",
      "pacer",
      "left-arm-pacer",
      "swing-bowler",
      "death-overs"
    ],
    "displayName": "Ashish Nehra"
  },
  {
    "name": "DS Kulkarni",
    "tags": [
      "rr",
      "mi",
      "gl",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "LRPL Taylor",
    "tags": [
      "rr",
      "pwi",
      "rcb",
      "dd",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "AC Gilchrist",
    "tags": [
      "srh",
      "pbks",
      "pre-2015",
      "retired",
      "batsman",
      "opener",
      "overseas",
      "australian",
      "left-handed",
      "wicketkeeper",
      "captain",
      "power-hitter",
      "aggressive",
      "title-winner"
    ],
    "displayName": "Adam Gilchrist"
  },
  {
    "name": "Y Venugopal Rao",
    "tags": [
      "srh",
      "dd",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "VVS Laxman",
    "tags": [
      "srh",
      "ktk",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "A Symonds",
    "tags": [
      "srh",
      "mi",
      "pre-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "M Kartik",
    "tags": [
      "pwi",
      "kkr",
      "rcb",
      "pbks",
      "pre-2015",
      "retired",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "RG Sharma",
    "tags": [
      "srh",
      "mi",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "opener",
      "legend",
      "indian",
      "right-handed",
      "captain",
      "power-hitter",
      "aggressive",
      "title-winner",
      "big-match-player"
    ],
    "displayName": "Rohit Sharma"
  },
  {
    "name": "SB Styris",
    "tags": [
      "srh",
      "csk",
      "pre-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "AS Yadav",
    "tags": [
      "srh",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "SB Bangar",
    "tags": [
      "srh",
      "kkr",
      "pre-2015",
      "retired",
      "allrounder"
    ]
  },
  {
    "name": "WPUJC Vaas",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "RP Singh",
    "tags": [
      "srh",
      "rps",
      "mi",
      "ktk",
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "legend",
      "indian",
      "left-handed",
      "pacer",
      "left-arm-pacer",
      "swing-bowler"
    ],
    "displayName": "RP Singh"
  },
  {
    "name": "WP Saha",
    "tags": [
      "pbks",
      "srh",
      "csk",
      "gt",
      "kkr",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "opener",
      "indian",
      "right-handed",
      "wicketkeeper"
    ],
    "displayName": "Wriddhiman Saha"
  },
  {
    "name": "PP Ojha",
    "tags": [
      "srh",
      "mi",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "legend",
      "indian",
      "left-handed",
      "spinner",
      "left-arm-orthodox",
      "purple-cap"
    ],
    "displayName": "Pragyan Ojha"
  },
  {
    "name": "DPMD Jayawardene",
    "tags": [
      "dd",
      "ktk",
      "pbks",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Pankaj Singh",
    "tags": [
      "rr",
      "rcb",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "S Sohal",
    "tags": [
      "srh",
      "pbks",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Kamran Akmal",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Mohammad Asif",
    "tags": [
      "dd",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "VY Mahesh",
    "tags": [
      "csk",
      "dd",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Shahid Afridi",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "bowler",
      "opener",
      "overseas",
      "right-handed",
      "spinner",
      "leg-spinner",
      "aggressive",
      "power-hitter"
    ],
    "displayName": "Shahid Afridi"
  },
  {
    "name": "DJ Bravo",
    "tags": [
      "mi",
      "csk",
      "gl",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher",
      "legend",
      "overseas",
      "west-indian",
      "right-handed",
      "pacer",
      "death-overs",
      "title-winner",
      "purple-cap",
      "big-match-player"
    ],
    "displayName": "Dwayne Bravo"
  },
  {
    "name": "VS Yeligati",
    "tags": [
      "mi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "MA Khote",
    "tags": [
      "mi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "GC Smith",
    "tags": [
      "pwi",
      "rr",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "D Kalyankrishna",
    "tags": [
      "srh",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "RR Sarwan",
    "tags": [
      "pbks",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "VRV Singh",
    "tags": [
      "pbks",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "SS Tiwary",
    "tags": [
      "rps",
      "rcb",
      "mi",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "Sohail Tanvir",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "A Kumble",
    "tags": [
      "rcb",
      "pre-2015",
      "retired",
      "bowler",
      "indian",
      "right-handed",
      "spinner",
      "leg-spinner",
      "captain"
    ],
    "displayName": "Anil Kumble"
  },
  {
    "name": "DNT Zoysa",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "AM Rahane",
    "tags": [
      "rr",
      "csk",
      "rps",
      "mi",
      "kkr",
      "dc",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "opener",
      "legend",
      "indian",
      "right-handed",
      "anchor"
    ],
    "displayName": "Ajinkya Rahane"
  },
  {
    "name": "SD Chitnis",
    "tags": [
      "rr",
      "mi",
      "pbks",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "Shoaib Malik",
    "tags": [
      "dd",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "MK Tiwary",
    "tags": [
      "pbks",
      "rps",
      "kkr",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "KD Karthik",
    "tags": [
      "pbks",
      "kkr",
      "gl",
      "mi",
      "dd",
      "rcb",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "finisher",
      "legend",
      "indian",
      "right-handed",
      "wicketkeeper",
      "captain",
      "death-overs",
      "big-match-player"
    ],
    "displayName": "Dinesh Karthik"
  },
  {
    "name": "TM Srivastava",
    "tags": [
      "pbks",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "DW Steyn",
    "tags": [
      "srh",
      "rcb",
      "gl",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "legend",
      "overseas",
      "south-african",
      "right-handed",
      "pacer",
      "death-overs",
      "swing-bowler",
      "purple-cap"
    ],
    "displayName": "Dale Steyn"
  },
  {
    "name": "B Chipli",
    "tags": [
      "srh",
      "rcb",
      "dd",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "JA Morkel",
    "tags": [
      "rps",
      "rcb",
      "csk",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher",
      "legend",
      "overseas",
      "south-african",
      "left-handed",
      "pacer"
    ],
    "displayName": "Albie Morkel"
  },
  {
    "name": "DB Das",
    "tags": [
      "kkr",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "CRD Fernando",
    "tags": [
      "mi",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "MK Pandey",
    "tags": [
      "lsg",
      "kkr",
      "srh",
      "pwi",
      "mi",
      "rcb",
      "dc",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "legend",
      "indian",
      "right-handed"
    ],
    "displayName": "Manish Pandey"
  },
  {
    "name": "HH Gibbs",
    "tags": [
      "srh",
      "mi",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Gagandeep Singh",
    "tags": [
      "pbks",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "SE Marsh",
    "tags": [
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "SA Asnodkar",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Umar Gul",
    "tags": [
      "kkr",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Salman Butt",
    "tags": [
      "kkr",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "BJ Hodge",
    "tags": [
      "rr",
      "kkr",
      "ktk",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "SP Fleming",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "S Vidyut",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "PJ Sangwan",
    "tags": [
      "gl",
      "mi",
      "dd",
      "gt",
      "kkr",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "M Ntini",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "AB de Villiers",
    "tags": [
      "rcb",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "finisher",
      "legend",
      "overseas",
      "south-african",
      "right-handed",
      "aggressive",
      "power-hitter",
      "wicketkeeper",
      "death-overs",
      "big-match-player",
      "360-degree"
    ],
    "displayName": "AB de Villiers"
  },
  {
    "name": "DP Vijaykumar",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Misbah-ul-Haq",
    "tags": [
      "rcb",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "YV Takawale",
    "tags": [
      "rcb",
      "mi",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "RR Raje",
    "tags": [
      "mi",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "DT Patil",
    "tags": [
      "rcb",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "S Anirudha",
    "tags": [
      "srh",
      "csk",
      "pre-2015",
      "retired",
      "batsman",
      "opener",
      "finisher"
    ]
  },
  {
    "name": "L Balaji",
    "tags": [
      "kkr",
      "csk",
      "pbks",
      "pre-2015",
      "retired",
      "bowler",
      "legend"
    ]
  },
  {
    "name": "CK Kapugedera",
    "tags": [
      "csk",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "A Chopra",
    "tags": [
      "kkr",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "T Taibu",
    "tags": [
      "kkr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "J Arunkumar",
    "tags": [
      "rcb",
      "pre-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "DB Ravi Teja",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "U Kaul",
    "tags": [
      "pbks",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "AD Mascarenhas",
    "tags": [
      "rr",
      "pbks",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "TM Dilshan",
    "tags": [
      "rcb",
      "dd",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "A Mishra",
    "tags": [
      "lsg",
      "srh",
      "dc",
      "dd",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "NK Patel",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "batsman",
      "opener",
      "finisher"
    ]
  },
  {
    "name": "LA Pomersbach",
    "tags": [
      "rcb",
      "pbks",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "Iqbal Abdulla",
    "tags": [
      "rr",
      "kkr",
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Shoaib Akhtar",
    "tags": [
      "kkr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "SR Tendulkar",
    "tags": [
      "mi",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "PM Sarvesh Kumar",
    "tags": [
      "srh",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "RR Powar",
    "tags": [
      "ktk",
      "pbks",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Abdur Razzak",
    "tags": [
      "rcb",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "LPC Silva",
    "tags": [
      "srh",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "H Das",
    "tags": [
      "srh",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "SP Goswami",
    "tags": [
      "rr",
      "srh",
      "rcb",
      "kkr",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "DR Smith",
    "tags": [
      "srh",
      "mi",
      "csk",
      "gl",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "A Nel",
    "tags": [
      "mi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "A Mukund",
    "tags": [
      "rcb",
      "csk",
      "pre-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "BAW Mendis",
    "tags": [
      "pwi",
      "kkr",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Younis Khan",
    "tags": [
      "rr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "T Thushara",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "A Flintoff",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "allrounder"
    ]
  },
  {
    "name": "JP Duminy",
    "tags": [
      "srh",
      "mi",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "SL Malinga",
    "tags": [
      "mi",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "legend",
      "overseas",
      "sri-lankan",
      "right-handed",
      "pacer",
      "death-overs",
      "title-winner",
      "purple-cap",
      "big-match-player"
    ],
    "displayName": "Lasith Malinga"
  },
  {
    "name": "JD Ryder",
    "tags": [
      "pwi",
      "rcb",
      "pre-2015",
      "retired",
      "allrounder",
      "opener"
    ]
  },
  {
    "name": "KP Pietersen",
    "tags": [
      "rps",
      "rcb",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "Kamran Khan",
    "tags": [
      "pwi",
      "rr",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "T Henderson",
    "tags": [
      "rr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "RS Bopara",
    "tags": [
      "srh",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "opener",
      "finisher"
    ]
  },
  {
    "name": "DP Nannes",
    "tags": [
      "rcb",
      "csk",
      "dd",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "AM Salvi",
    "tags": [
      "dd",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "YA Abdulla",
    "tags": [
      "pbks",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "VS Malik",
    "tags": [
      "rr",
      "pbks",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "FH Edwards",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "CH Gayle",
    "tags": [
      "kkr",
      "rcb",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener",
      "legend",
      "overseas",
      "west-indian",
      "left-handed",
      "aggressive",
      "power-hitter",
      "orange-cap",
      "big-match-player",
      "explosive-opener"
    ],
    "displayName": "Chris Gayle"
  },
  {
    "name": "Harmeet Singh",
    "tags": [
      "srh",
      "rr",
      "pbks",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "MC Henriques",
    "tags": [
      "pbks",
      "srh",
      "rcb",
      "dd",
      "kkr",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "R Bishnoi",
    "tags": [
      "rcb",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "KV Sharma",
    "tags": [
      "srh",
      "rcb",
      "mi",
      "csk",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "PC Valthaty",
    "tags": [
      "rr",
      "pbks",
      "pre-2015",
      "retired",
      "allrounder",
      "opener"
    ]
  },
  {
    "name": "Anureet Singh",
    "tags": [
      "rr",
      "kkr",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "RJ Quiney",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "AS Raut",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "Yashpal Singh",
    "tags": [
      "kkr",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "RR Bose",
    "tags": [
      "pbks",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "KP Appanna",
    "tags": [
      "rcb",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "M Manhas",
    "tags": [
      "pwi",
      "csk",
      "dd",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "Shoaib Ahmed",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "AA Bilakhia",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "AN Ghosh",
    "tags": [
      "kkr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "RE van der Merwe",
    "tags": [
      "rcb",
      "dd",
      "pre-2015",
      "retired",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "MN van Wyk",
    "tags": [
      "kkr",
      "pre-2015",
      "retired",
      "batsman",
      "opener",
      "finisher"
    ]
  },
  {
    "name": "TL Suman",
    "tags": [
      "srh",
      "mi",
      "pwi",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "S Tyagi",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "GR Napier",
    "tags": [
      "mi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "SM Harwood",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "LA Carseldine",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "NV Ojha",
    "tags": [
      "srh",
      "rr",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "M Vijay",
    "tags": [
      "pbks",
      "csk",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "SB Jakati",
    "tags": [
      "rcb",
      "csk",
      "gl",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "DA Warner",
    "tags": [
      "srh",
      "dc",
      "dd",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "opener",
      "legend",
      "overseas",
      "australian",
      "left-handed",
      "captain",
      "aggressive",
      "power-hitter",
      "orange-cap",
      "title-winner",
      "explosive-opener"
    ],
    "displayName": "David Warner"
  },
  {
    "name": "D du Preez",
    "tags": [
      "rcb",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "RJ Harris",
    "tags": [
      "srh",
      "pbks",
      "pre-2015",
      "retired",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "A Singh",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "M Morkel",
    "tags": [
      "rr",
      "kkr",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "A Mithun",
    "tags": [
      "rcb",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "C Nanda",
    "tags": [
      "mi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "SS Sarkar",
    "tags": [
      "kkr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "AD Mathews",
    "tags": [
      "pwi",
      "kkr",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "J Botha",
    "tags": [
      "rr",
      "kkr",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "Mashrafe Mortaza",
    "tags": [
      "kkr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "GJ Bailey",
    "tags": [
      "rps",
      "csk",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "AB McDonald",
    "tags": [
      "rcb",
      "dd",
      "pre-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "Y Nagar",
    "tags": [
      "dd",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "CK Langeveldt",
    "tags": [
      "kkr",
      "rcb",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "SS Shaikh",
    "tags": [
      "kkr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "R Ashwin",
    "tags": [
      "rr",
      "pbks",
      "csk",
      "rps",
      "dc",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "Mohammad Ashraful",
    "tags": [
      "mi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "RA Shaikh",
    "tags": [
      "mi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "Jaskaran Singh",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "CA Pujara",
    "tags": [
      "kkr",
      "rcb",
      "pbks",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "OA Shah",
    "tags": [
      "rr",
      "kkr",
      "ktk",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "Anirudh Singh",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "SW Tait",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "A Uniyal",
    "tags": [
      "rr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "AP Tare",
    "tags": [
      "srh",
      "mi",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "AT Rayudu",
    "tags": [
      "mi",
      "csk",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "legend"
    ]
  },
  {
    "name": "AA Jhunjhunwala",
    "tags": [
      "srh",
      "pwi",
      "rr",
      "pre-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "R Sathish",
    "tags": [
      "kkr",
      "mi",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "R McLaren",
    "tags": [
      "kkr",
      "mi",
      "pbks",
      "pre-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "AG Murtaza",
    "tags": [
      "pwi",
      "mi",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "P Dogra",
    "tags": [
      "rr",
      "kkr",
      "pbks",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "MS Bisla",
    "tags": [
      "kkr",
      "rcb",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "EJG Morgan",
    "tags": [
      "pbks",
      "srh",
      "rcb",
      "kkr",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "RS Gavaskar",
    "tags": [
      "kkr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "JM Kemp",
    "tags": [
      "csk",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "S Ladda",
    "tags": [
      "gl",
      "kkr",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Bipul Sharma",
    "tags": [
      "srh",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "SE Bond",
    "tags": [
      "kkr",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "KA Pollard",
    "tags": [
      "mi",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher",
      "legend",
      "overseas",
      "west-indian",
      "right-handed",
      "power-hitter",
      "aggressive",
      "death-overs",
      "title-winner",
      "big-match-player"
    ],
    "displayName": "Kieron Pollard"
  },
  {
    "name": "MJ Lumb",
    "tags": [
      "srh",
      "rr",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "DR Martyn",
    "tags": [
      "rr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "S Narwal",
    "tags": [
      "rr",
      "kkr",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "UT Yadav",
    "tags": [
      "gt",
      "kkr",
      "rcb",
      "dd",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "SJ Srivastava",
    "tags": [
      "pbks",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "AB Barath",
    "tags": [
      "pbks",
      "pre-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "FY Fazal",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "AC Voges",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "MD Mishra",
    "tags": [
      "srh",
      "pwi",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "R Sharma",
    "tags": [
      "srh",
      "pwi",
      "dd",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "J Theron",
    "tags": [
      "srh",
      "rr",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "NLTC Perera",
    "tags": [
      "pbks",
      "srh",
      "csk",
      "rps",
      "mi",
      "ktk",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "KM Jadhav",
    "tags": [
      "srh",
      "csk",
      "ktk",
      "dd",
      "rcb",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "Mandeep Singh",
    "tags": [
      "kkr",
      "rcb",
      "dc",
      "pbks",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "KB Arun Karthik",
    "tags": [
      "rcb",
      "csk",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "KAJ Roach",
    "tags": [
      "srh",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "PD Collingwood",
    "tags": [
      "dd",
      "pre-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "C Ganapathy",
    "tags": [
      "csk",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "MB Parmar",
    "tags": [
      "kkr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "SB Wagh",
    "tags": [
      "pwi",
      "rr",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "DE Bollinger",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "JD Unadkat",
    "tags": [
      "rr",
      "lsg",
      "srh",
      "rcb",
      "rps",
      "mi",
      "dd",
      "kkr",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "AP Dole",
    "tags": [
      "rr",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "AN Ahmed",
    "tags": [
      "rcb",
      "mi",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "MR Marsh",
    "tags": [
      "lsg",
      "srh",
      "pwi",
      "rps",
      "dc",
      "pre-2015",
      "post-2015",
      "active",
      "allrounder",
      "opener"
    ]
  },
  {
    "name": "L Ablish",
    "tags": [
      "pbks",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "RS Sodhi",
    "tags": [
      "pbks",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "S Sriram",
    "tags": [
      "rcb",
      "dd",
      "pre-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "B Sumanth",
    "tags": [
      "srh",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "C Madan",
    "tags": [
      "mi",
      "pre-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "AG Paunikar",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "AJ Finch",
    "tags": [
      "rr",
      "pbks",
      "kkr",
      "srh",
      "pwi",
      "gl",
      "mi",
      "dd",
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "STR Binny",
    "tags": [
      "rr",
      "mi",
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "ND Doshi",
    "tags": [
      "rr",
      "rcb",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "TG Southee",
    "tags": [
      "rr",
      "rcb",
      "csk",
      "mi",
      "kkr",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "S Randiv",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "IR Jaggi",
    "tags": [
      "srh",
      "kkr",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "DT Christian",
    "tags": [
      "dd",
      "srh",
      "rcb",
      "rps",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "AL Menaria",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "AUK Pathan",
    "tags": [
      "rcb",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "RV Gomez",
    "tags": [
      "pwi",
      "ktk",
      "pre-2015",
      "retired",
      "allrounder"
    ]
  },
  {
    "name": "MA Agarwal",
    "tags": [
      "pbks",
      "srh",
      "rps",
      "dd",
      "rcb",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "UBT Chand",
    "tags": [
      "rr",
      "mi",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "JEC Franklin",
    "tags": [
      "mi",
      "pre-2015",
      "retired",
      "allrounder",
      "opener"
    ]
  },
  {
    "name": "DJ Jacobs",
    "tags": [
      "mi",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "AC Thomas",
    "tags": [
      "pwi",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Sunny Singh",
    "tags": [
      "pbks",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "WD Parnell",
    "tags": [
      "pwi",
      "rcb",
      "dd",
      "pre-2015",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "NJ Rimmington",
    "tags": [
      "pbks",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "RN ten Doeschate",
    "tags": [
      "kkr",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "S Nadeem",
    "tags": [
      "srh",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "BA Bhatt",
    "tags": [
      "pbks",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "JJ van der Wath",
    "tags": [
      "rcb",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "S Aravind",
    "tags": [
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "R Ninan",
    "tags": [
      "rcb",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "Shakib Al Hasan",
    "tags": [
      "srh",
      "kkr",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "MS Wade",
    "tags": [
      "gt",
      "dd",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "TD Paine",
    "tags": [
      "pwi",
      "pre-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "DH Yagnik",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "BJ Haddin",
    "tags": [
      "kkr",
      "pre-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "J Syed Mohammad",
    "tags": [
      "rcb",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "VR Aaron",
    "tags": [
      "rr",
      "pbks",
      "dd",
      "gt",
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "NL McCullum",
    "tags": [
      "pwi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "JE Taylor",
    "tags": [
      "pwi",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "KMDN Kulasekara",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "TR Birt",
    "tags": [
      "dd",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "Harpreet Singh",
    "tags": [
      "pwi",
      "pbks",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "M Klinger",
    "tags": [
      "ktk",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "P Parameswaran",
    "tags": [
      "rcb",
      "ktk",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "AC Blizzard",
    "tags": [
      "mi",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "I Malhotra",
    "tags": [
      "srh",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "CA Ingram",
    "tags": [
      "dc",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "B Kumar",
    "tags": [
      "srh",
      "pwi",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "CJ Ferguson",
    "tags": [
      "pwi",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "AA Kazi",
    "tags": [
      "rcb",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "Anand Rajan",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "P Prasanth",
    "tags": [
      "ktk",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "Y Gnaneswara Rao",
    "tags": [
      "ktk",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "AA Chavan",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "S Rana",
    "tags": [
      "pwi",
      "rcb",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "JP Faulkner",
    "tags": [
      "gl",
      "pwi",
      "rr",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "SS Mundhe",
    "tags": [
      "pwi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "RW Price",
    "tags": [
      "mi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "F du Plessis",
    "tags": [
      "rcb",
      "dc",
      "csk",
      "rps",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "opener",
      "legend"
    ]
  },
  {
    "name": "RE Levi",
    "tags": [
      "mi",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "GJ Maxwell",
    "tags": [
      "pbks",
      "rcb",
      "mi",
      "dd",
      "pre-2015",
      "post-2015",
      "active",
      "allrounder"
    ]
  },
  {
    "name": "M de Lange",
    "tags": [
      "kkr",
      "mi",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "SPD Smith",
    "tags": [
      "pwi",
      "rr",
      "dc",
      "rps",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "MN Samuels",
    "tags": [
      "pwi",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder"
    ]
  },
  {
    "name": "SA Yadav",
    "tags": [
      "kkr",
      "mi",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "legend",
      "indian",
      "right-handed",
      "aggressive",
      "360-degree",
      "power-hitter"
    ],
    "displayName": "Suryakumar Yadav"
  },
  {
    "name": "KK Cooper",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "DAJ Bracewell",
    "tags": [
      "dd",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "HV Patel",
    "tags": [
      "pbks",
      "srh",
      "dd",
      "rcb",
      "dc",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "Ankit Sharma",
    "tags": [
      "srh",
      "rr",
      "rps",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "opener"
    ]
  },
  {
    "name": "DJ Harris",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "TP Sudhindra",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "SP Narine",
    "tags": [
      "kkr",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "opener",
      "legend",
      "overseas",
      "west-indian",
      "left-handed",
      "spinner",
      "mystery-spinner",
      "off-spinner",
      "title-winner",
      "aggressive",
      "power-hitter",
      "explosive-opener"
    ],
    "displayName": "Sunil Narine"
  },
  {
    "name": "GB Hogg",
    "tags": [
      "rr",
      "kkr",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "RR Bhatkal",
    "tags": [
      "rcb",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "P Awana",
    "tags": [
      "pbks",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "CJ McKay",
    "tags": [
      "mi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "V Pratap Singh",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "N Saini",
    "tags": [
      "pbks",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "DA Miller",
    "tags": [
      "rr",
      "lsg",
      "pbks",
      "gt",
      "dc",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "Azhar Mahmood",
    "tags": [
      "kkr",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "P Negi",
    "tags": [
      "rcb",
      "csk",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "A Chandila",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "LJ Wright",
    "tags": [
      "pwi",
      "pre-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "RJ Peterson",
    "tags": [
      "mi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "A Ashish Reddy",
    "tags": [
      "srh",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "R Shukla",
    "tags": [
      "rr",
      "mi",
      "dd",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "BB Samantray",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "MJ Clarke",
    "tags": [
      "pwi",
      "pre-2015",
      "retired",
      "allrounder",
      "opener"
    ]
  },
  {
    "name": "BW Hilfenhaus",
    "tags": [
      "csk",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Gurkeerat Singh",
    "tags": [
      "rcb",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "AP Majumdar",
    "tags": [
      "pwi",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "PA Reddy",
    "tags": [
      "srh",
      "pre-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "AD Russell",
    "tags": [
      "kkr",
      "dd",
      "pre-2015",
      "post-2015",
      "active",
      "allrounder",
      "finisher",
      "legend",
      "overseas",
      "west-indian",
      "right-handed",
      "pacer",
      "power-hitter",
      "aggressive",
      "death-overs",
      "big-match-player"
    ],
    "displayName": "Andre Russell"
  },
  {
    "name": "K Upadhyay",
    "tags": [
      "pwi",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "CA Lynn",
    "tags": [
      "srh",
      "kkr",
      "mi",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Sunny Gupta",
    "tags": [
      "dd",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "MC Juneja",
    "tags": [
      "dd",
      "pre-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "MG Johnson",
    "tags": [
      "kkr",
      "mi",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "JJ Bumrah",
    "tags": [
      "mi",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "legend",
      "indian",
      "right-handed",
      "pacer",
      "death-overs",
      "purple-cap",
      "title-winner",
      "big-match-player"
    ],
    "displayName": "Jasprit Bumrah"
  },
  {
    "name": "KK Nair",
    "tags": [
      "rr",
      "pbks",
      "dd",
      "rcb",
      "dc",
      "pre-2015",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "GH Vihari",
    "tags": [
      "srh",
      "dc",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "MDKJ Perera",
    "tags": [
      "rr",
      "pre-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "S Badree",
    "tags": [
      "rr",
      "rcb",
      "csk",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "AS Rajpoot",
    "tags": [
      "rr",
      "kkr",
      "csk",
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "B Laughlin",
    "tags": [
      "rr",
      "csk",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "M Vohra",
    "tags": [
      "rr",
      "rcb",
      "lsg",
      "pbks",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Mohammed Shami",
    "tags": [
      "lsg",
      "pbks",
      "srh",
      "dd",
      "gt",
      "kkr",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "legend"
    ]
  },
  {
    "name": "BMAJ Mendis",
    "tags": [
      "dd",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "CH Morris",
    "tags": [
      "rr",
      "csk",
      "dd",
      "rcb",
      "dc",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "S Kaul",
    "tags": [
      "srh",
      "rcb",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "R Dhawan",
    "tags": [
      "mi",
      "pbks",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "MM Sharma",
    "tags": [
      "gt",
      "dc",
      "csk",
      "pbks",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "R Rampaul",
    "tags": [
      "rcb",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "SMSM Senanayake",
    "tags": [
      "kkr",
      "pre-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "SV Samson",
    "tags": [
      "rr",
      "csk",
      "dd",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "legend"
    ]
  },
  {
    "name": "BJ Rohrer",
    "tags": [
      "dd",
      "pre-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "KL Rahul",
    "tags": [
      "lsg",
      "pbks",
      "srh",
      "rcb",
      "dc",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "opener",
      "legend",
      "indian",
      "right-handed",
      "wicketkeeper",
      "captain",
      "orange-cap",
      "anchor"
    ],
    "displayName": "KL Rahul"
  },
  {
    "name": "Q de Kock",
    "tags": [
      "lsg",
      "kkr",
      "srh",
      "mi",
      "dd",
      "rcb",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "opener",
      "legend"
    ]
  },
  {
    "name": "JO Holder",
    "tags": [
      "rr",
      "lsg",
      "srh",
      "csk",
      "kkr",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "IC Pandey",
    "tags": [
      "pwi",
      "csk",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "YS Chahal",
    "tags": [
      "rr",
      "rcb",
      "mi",
      "pbks",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "legend"
    ]
  },
  {
    "name": "X Thalaivan Sargunam",
    "tags": [
      "srh",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "DJG Sammy",
    "tags": [
      "srh",
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "KW Richardson",
    "tags": [
      "pwi",
      "rr",
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "P Suyal",
    "tags": [
      "mi",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "MG Neser",
    "tags": [
      "pbks",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "CM Gautam",
    "tags": [
      "mi",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener",
      "finisher"
    ]
  },
  {
    "name": "PV Tambe",
    "tags": [
      "rr",
      "gl",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Parvez Rasool",
    "tags": [
      "srh",
      "pwi",
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "UA Birla",
    "tags": [
      "pwi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "Sandeep Sharma",
    "tags": [
      "srh",
      "rr",
      "pbks",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "legend"
    ]
  },
  {
    "name": "Sachin Baby",
    "tags": [
      "rr",
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "NM Coulter-Nile",
    "tags": [
      "rr",
      "kkr",
      "mi",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "CJ Anderson",
    "tags": [
      "rcb",
      "mi",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "MA Starc",
    "tags": [
      "rcb",
      "dc",
      "kkr",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "overseas",
      "australian",
      "left-handed",
      "pacer",
      "left-arm-pacer",
      "death-overs",
      "swing-bowler"
    ],
    "displayName": "Mitchell Starc"
  },
  {
    "name": "NJ Maddinson",
    "tags": [
      "rcb",
      "pre-2015",
      "post-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "JDS Neesham",
    "tags": [
      "pbks",
      "rr",
      "mi",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder"
    ]
  },
  {
    "name": "AR Patel",
    "tags": [
      "dc",
      "pbks",
      "pre-2015",
      "post-2015",
      "active",
      "allrounder",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "BR Dunk",
    "tags": [
      "mi",
      "pre-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "RR Rossouw",
    "tags": [
      "rcb",
      "dc",
      "pbks",
      "pre-2015",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "R Tewatia",
    "tags": [
      "rr",
      "pbks",
      "dd",
      "gt",
      "dc",
      "pre-2015",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "Shivam Sharma",
    "tags": [
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Imran Tahir",
    "tags": [
      "rps",
      "csk",
      "dd",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "LMP Simmons",
    "tags": [
      "mi",
      "pre-2015",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "VH Zol",
    "tags": [
      "rcb",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "V Shankar",
    "tags": [
      "gt",
      "srh",
      "csk",
      "dd",
      "pre-2015",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "BCJ Cutting",
    "tags": [
      "srh",
      "rr",
      "mi",
      "pre-2015",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "K Santokie",
    "tags": [
      "mi",
      "pre-2015",
      "retired"
    ]
  },
  {
    "name": "S Gopal",
    "tags": [
      "srh",
      "rr",
      "mi",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "BE Hendricks",
    "tags": [
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "PJ Cummins",
    "tags": [
      "srh",
      "kkr",
      "dd",
      "pre-2015",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "JW Hastings",
    "tags": [
      "kkr",
      "csk",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Karanveer Singh",
    "tags": [
      "pbks",
      "pre-2015",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "DJ Muthuswami",
    "tags": [
      "dd",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "SS Iyer",
    "tags": [
      "pbks",
      "kkr",
      "dc",
      "dd",
      "post-2015",
      "active",
      "batsman",
      "legend"
    ]
  },
  {
    "name": "DJ Hooda",
    "tags": [
      "rr",
      "lsg",
      "pbks",
      "srh",
      "csk",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "TA Boult",
    "tags": [
      "rr",
      "srh",
      "mi",
      "dd",
      "kkr",
      "dc",
      "post-2015",
      "active",
      "bowler",
      "legend"
    ]
  },
  {
    "name": "KS Williamson",
    "tags": [
      "gt",
      "srh",
      "post-2015",
      "active",
      "batsman",
      "overseas",
      "new-zealander",
      "right-handed",
      "captain",
      "anchor"
    ],
    "displayName": "Kane Williamson"
  },
  {
    "name": "SA Abbott",
    "tags": [
      "srh",
      "rcb",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "KC Cariappa",
    "tags": [
      "kkr",
      "pbks",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "J Suchith",
    "tags": [
      "srh",
      "mi",
      "dc",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "D Wiese",
    "tags": [
      "rcb",
      "kkr",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "HH Pandya",
    "tags": [
      "gt",
      "mi",
      "post-2015",
      "active",
      "allrounder",
      "finisher",
      "legend",
      "indian",
      "right-handed",
      "pacer",
      "power-hitter",
      "death-overs",
      "captain",
      "title-winner",
      "aggressive",
      "big-match-player"
    ],
    "displayName": "Hardik Pandya"
  },
  {
    "name": "MJ McClenaghan",
    "tags": [
      "mi",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "SN Khan",
    "tags": [
      "rcb",
      "dc",
      "csk",
      "pbks",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "RG More",
    "tags": [
      "csk",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "SN Thakur",
    "tags": [
      "lsg",
      "pbks",
      "csk",
      "rps",
      "mi",
      "kkr",
      "dc",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "GS Sandhu",
    "tags": [
      "dd",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "J Yadav",
    "tags": [
      "gt",
      "mi",
      "dd",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "BB Sran",
    "tags": [
      "srh",
      "rr",
      "mi",
      "pbks",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "JC Buttler",
    "tags": [
      "gt",
      "rr",
      "mi",
      "post-2015",
      "active",
      "batsman",
      "opener",
      "legend"
    ]
  },
  {
    "name": "M Ashwin",
    "tags": [
      "rr",
      "pbks",
      "rps",
      "mi",
      "rcb",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "C Munro",
    "tags": [
      "kkr",
      "dc",
      "dd",
      "post-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "CR Brathwaite",
    "tags": [
      "srh",
      "kkr",
      "dd",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "MP Stoinis",
    "tags": [
      "lsg",
      "rcb",
      "dc",
      "pbks",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "P Sahu",
    "tags": [
      "pbks",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Ishan Kishan",
    "tags": [
      "srh",
      "mi",
      "gl",
      "post-2015",
      "active",
      "batsman",
      "opener",
      "legend"
    ]
  },
  {
    "name": "Mustafizur Rahman",
    "tags": [
      "rr",
      "srh",
      "csk",
      "mi",
      "dc",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "AF Milne",
    "tags": [
      "rcb",
      "mi",
      "csk",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Kuldeep Yadav",
    "tags": [
      "kkr",
      "dc",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "KH Pandya",
    "tags": [
      "mi",
      "lsg",
      "post-2015",
      "active",
      "allrounder",
      "finisher",
      "legend",
      "indian",
      "left-handed",
      "spinner",
      "left-arm-orthodox"
    ],
    "displayName": "Krunal Pandya"
  },
  {
    "name": "AD Nath",
    "tags": [
      "pbks",
      "rcb",
      "gl",
      "post-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "KJ Abbott",
    "tags": [
      "pbks",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "MJ Guptill",
    "tags": [
      "srh",
      "mi",
      "pbks",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "TM Head",
    "tags": [
      "srh",
      "rcb",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "T Shamsi",
    "tags": [
      "rr",
      "rcb",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "NS Naik",
    "tags": [
      "kkr",
      "pbks",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "RR Pant",
    "tags": [
      "lsg",
      "dc",
      "dd",
      "post-2015",
      "active",
      "batsman",
      "legend",
      "indian",
      "left-handed",
      "wicketkeeper",
      "captain",
      "aggressive",
      "power-hitter",
      "big-match-player"
    ],
    "displayName": "Rishabh Pant"
  },
  {
    "name": "S Kaushik",
    "tags": [
      "gl",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "SW Billings",
    "tags": [
      "kkr",
      "csk",
      "dd",
      "post-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "PSP Handscomb",
    "tags": [
      "rps",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "SM Boland",
    "tags": [
      "rps",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "Swapnil Singh",
    "tags": [
      "lsg",
      "pbks",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "UT Khawaja",
    "tags": [
      "rps",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "CJ Jordan",
    "tags": [
      "pbks",
      "srh",
      "csk",
      "mi",
      "rcb",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "A Zampa",
    "tags": [
      "rr",
      "srh",
      "rcb",
      "rps",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "HM Amla",
    "tags": [
      "pbks",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "F Behardien",
    "tags": [
      "pbks",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "N Rana",
    "tags": [
      "rr",
      "kkr",
      "mi",
      "dc",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "DL Chahar",
    "tags": [
      "mi",
      "csk",
      "rps",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "ER Dwivedi",
    "tags": [
      "gl",
      "post-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "TS Mills",
    "tags": [
      "rcb",
      "mi",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "A Choudhary",
    "tags": [
      "rcb",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Rashid Khan",
    "tags": [
      "gt",
      "srh",
      "post-2015",
      "active",
      "bowler",
      "legend",
      "overseas",
      "afghan",
      "right-handed",
      "spinner",
      "leg-spinner",
      "mystery-spinner",
      "death-overs",
      "captain",
      "big-match-player"
    ],
    "displayName": "Rashid Khan"
  },
  {
    "name": "BA Stokes",
    "tags": [
      "rr",
      "csk",
      "rps",
      "post-2015",
      "active",
      "allrounder",
      "opener"
    ]
  },
  {
    "name": "JJ Roy",
    "tags": [
      "dd",
      "srh",
      "kkr",
      "gl",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "CR Woakes",
    "tags": [
      "kkr",
      "rcb",
      "dc",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "T Natarajan",
    "tags": [
      "srh",
      "dc",
      "pbks",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "RD Chahar",
    "tags": [
      "pbks",
      "srh",
      "csk",
      "rps",
      "mi",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "Vishnu Vinod",
    "tags": [
      "rcb",
      "mi",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "B Stanlake",
    "tags": [
      "srh",
      "rcb",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Basil Thampi",
    "tags": [
      "srh",
      "mi",
      "gl",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Tejas Baroka",
    "tags": [
      "gl",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "RA Tripathi",
    "tags": [
      "rr",
      "srh",
      "csk",
      "rps",
      "kkr",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "C de Grandhomme",
    "tags": [
      "kkr",
      "rcb",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "AJ Tye",
    "tags": [
      "pbks",
      "rr",
      "lsg",
      "gl",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "LH Ferguson",
    "tags": [
      "pbks",
      "gt",
      "kkr",
      "rps",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Mohammad Nabi",
    "tags": [
      "srh",
      "mi",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "Mohammed Siraj",
    "tags": [
      "gt",
      "srh",
      "rcb",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "K Rabada",
    "tags": [
      "pbks",
      "gt",
      "dc",
      "dd",
      "post-2015",
      "active",
      "bowler",
      "finisher",
      "legend"
    ]
  },
  {
    "name": "Washington Sundar",
    "tags": [
      "gt",
      "srh",
      "rcb",
      "rps",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "SS Agarwal",
    "tags": [
      "gl",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "NB Singh",
    "tags": [
      "gl",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "DM Bravo",
    "tags": [
      "kkr",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "Ankit Soni",
    "tags": [
      "gl",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "AR Bawne",
    "tags": [
      "dd",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "SP Jackson",
    "tags": [
      "kkr",
      "post-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "MJ Henry",
    "tags": [
      "lsg",
      "csk",
      "pbks",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Avesh Khan",
    "tags": [
      "rr",
      "lsg",
      "dd",
      "rcb",
      "dc",
      "post-2015",
      "active",
      "bowler",
      "legend"
    ]
  },
  {
    "name": "E Lewis",
    "tags": [
      "rr",
      "mi",
      "lsg",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "MA Wood",
    "tags": [
      "lsg",
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "M Markande",
    "tags": [
      "srh",
      "rr",
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Mujeeb Ur Rahman",
    "tags": [
      "srh",
      "mi",
      "pbks",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "K Khejroliya",
    "tags": [
      "gt",
      "rcb",
      "kkr",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "RK Singh",
    "tags": [
      "kkr",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "DJM Short",
    "tags": [
      "rr",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "K Gowtham",
    "tags": [
      "rr",
      "lsg",
      "pbks",
      "post-2015",
      "active",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "TK Curran",
    "tags": [
      "rr",
      "kkr",
      "dc",
      "post-2015",
      "retired",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "A Dananjaya",
    "tags": [
      "mi",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "Shubman Gill",
    "tags": [
      "gt",
      "kkr",
      "post-2015",
      "active",
      "batsman",
      "opener",
      "legend"
    ]
  },
  {
    "name": "Shivam Mavi",
    "tags": [
      "kkr",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "H Klaasen",
    "tags": [
      "srh",
      "rr",
      "rcb",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "RK Bhui",
    "tags": [
      "srh",
      "dc",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "JC Archer",
    "tags": [
      "rr",
      "mi",
      "post-2015",
      "active",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "LE Plunkett",
    "tags": [
      "dd",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "PP Shaw",
    "tags": [
      "dc",
      "dd",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "AD Hales",
    "tags": [
      "srh",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "IS Sodhi",
    "tags": [
      "rr",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "MK Lomror",
    "tags": [
      "rr",
      "rcb",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "L Ngidi",
    "tags": [
      "dc",
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "KM Asif",
    "tags": [
      "rr",
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "DJ Willey",
    "tags": [
      "rcb",
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "DR Shorey",
    "tags": [
      "csk",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "M Prasidh Krishna",
    "tags": [
      "rr",
      "kkr",
      "gt",
      "post-2015",
      "active",
      "bowler",
      "legend"
    ]
  },
  {
    "name": "MM Ali",
    "tags": [
      "rcb",
      "csk",
      "kkr",
      "post-2015",
      "active",
      "allrounder"
    ]
  },
  {
    "name": "P Chopra",
    "tags": [
      "rr",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "JPR Scantlebury-Searles",
    "tags": [
      "kkr",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "Abhishek Sharma",
    "tags": [
      "srh",
      "dd",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "S Lamichhane",
    "tags": [
      "dc",
      "dd",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "CJ Dala",
    "tags": [
      "dd",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "KK Ahmed",
    "tags": [
      "srh",
      "dc",
      "csk",
      "post-2015",
      "active",
      "bowler",
      "legend"
    ]
  },
  {
    "name": "SO Hetmyer",
    "tags": [
      "rr",
      "rcb",
      "dc",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "S Dube",
    "tags": [
      "rr",
      "rcb",
      "csk",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "Navdeep Saini",
    "tags": [
      "rr",
      "rcb",
      "kkr",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "JM Bairstow",
    "tags": [
      "srh",
      "mi",
      "pbks",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Rasikh Salam",
    "tags": [
      "kkr",
      "mi",
      "dc",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "KMA Paul",
    "tags": [
      "dc",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "N Pooran",
    "tags": [
      "srh",
      "lsg",
      "pbks",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "SM Curran",
    "tags": [
      "csk",
      "pbks",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "CV Varun",
    "tags": [
      "kkr",
      "pbks",
      "post-2015",
      "active",
      "bowler",
      "legend"
    ]
  },
  {
    "name": "GC Viljoen",
    "tags": [
      "pbks",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "P Ray Barman",
    "tags": [
      "rcb",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "MJ Santner",
    "tags": [
      "mi",
      "csk",
      "post-2015",
      "active",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "JP Behrendorff",
    "tags": [
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "SC Kuggeleijn",
    "tags": [
      "csk",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "AS Joseph",
    "tags": [
      "gt",
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "HF Gurney",
    "tags": [
      "kkr",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "S Midhun",
    "tags": [
      "rr",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "SD Lad",
    "tags": [
      "mi",
      "post-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "R Parag",
    "tags": [
      "rr",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "JL Denly",
    "tags": [
      "kkr",
      "post-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "LS Livingstone",
    "tags": [
      "srh",
      "rr",
      "pbks",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "Arshdeep Singh",
    "tags": [
      "pbks",
      "post-2015",
      "active",
      "bowler",
      "legend"
    ]
  },
  {
    "name": "AJ Turner",
    "tags": [
      "rr",
      "lsg",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "SE Rutherford",
    "tags": [
      "gt",
      "rcb",
      "mi",
      "dc",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "Harpreet Brar",
    "tags": [
      "pbks",
      "post-2015",
      "active",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "Y Prithvi Raj",
    "tags": [
      "kkr",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "O Thomas",
    "tags": [
      "rr",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "AS Roy",
    "tags": [
      "kkr",
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "S Sandeep Warrier",
    "tags": [
      "gt",
      "kkr",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "P Simran Singh",
    "tags": [
      "pbks",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "JL Pattinson",
    "tags": [
      "mi",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "SS Cottrell",
    "tags": [
      "pbks",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Ravi Bishnoi",
    "tags": [
      "rr",
      "lsg",
      "pbks",
      "post-2015",
      "active",
      "bowler",
      "legend"
    ]
  },
  {
    "name": "A Nortje",
    "tags": [
      "lsg",
      "kkr",
      "dc",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "D Padikkal",
    "tags": [
      "rr",
      "rcb",
      "lsg",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "JR Philippe",
    "tags": [
      "rcb",
      "post-2015",
      "retired",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "PK Garg",
    "tags": [
      "srh",
      "dc",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "YBK Jaiswal",
    "tags": [
      "rr",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "RD Gaikwad",
    "tags": [
      "csk",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "JR Hazlewood",
    "tags": [
      "rcb",
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "KL Nagarkoti",
    "tags": [
      "kkr",
      "dc",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "I Udana",
    "tags": [
      "rcb",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Abdul Samad",
    "tags": [
      "srh",
      "lsg",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "Kartik Tyagi",
    "tags": [
      "gt",
      "srh",
      "rr",
      "kkr",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "N Jagadeesan",
    "tags": [
      "kkr",
      "csk",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "AT Carey",
    "tags": [
      "dc",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "T Banton",
    "tags": [
      "kkr",
      "post-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "TU Deshpande",
    "tags": [
      "rr",
      "dc",
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "CJ Green",
    "tags": [
      "kkr",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "Shahbaz Ahmed",
    "tags": [
      "srh",
      "rcb",
      "lsg",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "DR Sams",
    "tags": [
      "rcb",
      "mi",
      "dc",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "Monu Kumar",
    "tags": [
      "csk",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "P Dubey",
    "tags": [
      "dc",
      "pbks",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "KA Jamieson",
    "tags": [
      "rcb",
      "pbks",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "M Jansen",
    "tags": [
      "srh",
      "mi",
      "pbks",
      "post-2015",
      "active",
      "bowler",
      "finisher"
    ]
  },
  {
    "name": "RM Patidar",
    "tags": [
      "rcb",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "C Sakariya",
    "tags": [
      "rr",
      "dc",
      "kkr",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "M Shahrukh Khan",
    "tags": [
      "gt",
      "pbks",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "JA Richardson",
    "tags": [
      "dc",
      "pbks",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "RP Meredith",
    "tags": [
      "mi",
      "pbks",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Lalit Yadav",
    "tags": [
      "dc",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "Virat Singh",
    "tags": [
      "srh",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "LI Meriwala",
    "tags": [
      "dc",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "Jalaj S Saxena",
    "tags": [
      "pbks",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "FA Allen",
    "tags": [
      "mi",
      "pbks",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "DJ Malan",
    "tags": [
      "pbks",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "Anmolpreet Singh",
    "tags": [
      "srh",
      "mi",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "KS Bharat",
    "tags": [
      "rcb",
      "dc",
      "post-2015",
      "retired",
      "batsman"
    ]
  },
  {
    "name": "PWH de Silva",
    "tags": [
      "rr",
      "rcb",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "VR Iyer",
    "tags": [
      "kkr",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "IC Porel",
    "tags": [
      "pbks",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "AU Rashid",
    "tags": [
      "srh",
      "pbks",
      "post-2015",
      "active",
      "bowler",
      "overseas",
      "english",
      "right-handed",
      "spinner",
      "leg-spinner"
    ],
    "displayName": "Adil Rashid"
  },
  {
    "name": "AK Markram",
    "tags": [
      "srh",
      "lsg",
      "pbks",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "TH David",
    "tags": [
      "rcb",
      "mi",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "NT Ellis",
    "tags": [
      "csk",
      "pbks",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "GHS Garton",
    "tags": [
      "rcb",
      "post-2015",
      "retired",
      "bowler"
    ]
  },
  {
    "name": "TL Seifert",
    "tags": [
      "kkr",
      "dc",
      "post-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "Akash Singh",
    "tags": [
      "rr",
      "lsg",
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "GD Phillips",
    "tags": [
      "gt",
      "srh",
      "rr",
      "post-2015",
      "active",
      "finisher"
    ]
  },
  {
    "name": "Umran Malik",
    "tags": [
      "srh",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "RV Patel",
    "tags": [
      "dc",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "K Yadav",
    "tags": [
      "rr",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Anuj Rawat",
    "tags": [
      "rr",
      "rcb",
      "post-2015",
      "active",
      "batsman",
      "opener",
      "finisher"
    ]
  },
  {
    "name": "DP Conway",
    "tags": [
      "csk",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Tilak Varma",
    "tags": [
      "mi",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "R Powell",
    "tags": [
      "rr",
      "dc",
      "kkr",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "OF Smith",
    "tags": [
      "pbks",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "Akash Deep",
    "tags": [
      "rcb",
      "lsg",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "PBB Rajapaksa",
    "tags": [
      "pbks",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "RA Bawa",
    "tags": [
      "mi",
      "pbks",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "A Badoni",
    "tags": [
      "lsg",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "PVD Chameera",
    "tags": [
      "kkr",
      "dc",
      "lsg",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Mohsin Khan",
    "tags": [
      "lsg",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "A Manohar",
    "tags": [
      "gt",
      "srh",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "R Shepherd",
    "tags": [
      "srh",
      "mi",
      "lsg",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "D Pretorius",
    "tags": [
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Mukesh Choudhary",
    "tags": [
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "JM Sharma",
    "tags": [
      "pbks",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "VG Arora",
    "tags": [
      "kkr",
      "pbks",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "D Brevis",
    "tags": [
      "mi",
      "csk",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "DG Nalkande",
    "tags": [
      "gt",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "B Sai Sudharsan",
    "tags": [
      "gt",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "M Theekshana",
    "tags": [
      "rr",
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Ramandeep Singh",
    "tags": [
      "kkr",
      "mi",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "HE van der Dussen",
    "tags": [
      "rr",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "KR Sen",
    "tags": [
      "rr",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "SS Prabhudessai",
    "tags": [
      "rcb",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "Yash Dayal",
    "tags": [
      "gt",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Shashank Singh",
    "tags": [
      "srh",
      "pbks",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "Aman Hakim Khan",
    "tags": [
      "kkr",
      "dc",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "OC McCoy",
    "tags": [
      "rr",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "HR Shokeen",
    "tags": [
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "DJ Mitchell",
    "tags": [
      "rr",
      "csk",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "B Indrajith",
    "tags": [
      "kkr",
      "post-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "Harshit Rana",
    "tags": [
      "kkr",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "K Kartikeya",
    "tags": [
      "rr",
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Simarjeet Singh",
    "tags": [
      "srh",
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Fazalhaq Farooqi",
    "tags": [
      "srh",
      "rr",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "KS Sharma",
    "tags": [
      "lsg",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "R Sai Kishore",
    "tags": [
      "gt",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "T Stubbs",
    "tags": [
      "mi",
      "dc",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "PH Solanki",
    "tags": [
      "csk",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "M Pathirana",
    "tags": [
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "R Sanjay Yadav",
    "tags": [
      "mi",
      "post-2015",
      "retired"
    ]
  },
  {
    "name": "A Tomar",
    "tags": [
      "kkr",
      "post-2015",
      "retired",
      "opener"
    ]
  },
  {
    "name": "PN Mankad",
    "tags": [
      "lsg",
      "pbks",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "J Little",
    "tags": [
      "gt",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "RS Hangargekar",
    "tags": [
      "csk",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Sikandar Raza",
    "tags": [
      "pbks",
      "post-2015",
      "active",
      "allrounder"
    ]
  },
  {
    "name": "Rahmanullah Gurbaz",
    "tags": [
      "kkr",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "KR Mayers",
    "tags": [
      "lsg",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Mukesh Kumar",
    "tags": [
      "dc",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "HC Brook",
    "tags": [
      "srh",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "NA Saini",
    "tags": [
      "rr",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "RJW Topley",
    "tags": [
      "rcb",
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "C Green",
    "tags": [
      "kkr",
      "mi",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "MG Bracewell",
    "tags": [
      "rcb",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "N Wadhera",
    "tags": [
      "mi",
      "pbks",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "Arshad Khan",
    "tags": [
      "gt",
      "mi",
      "lsg",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "Yash Thakur",
    "tags": [
      "lsg",
      "pbks",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Abishek Porel",
    "tags": [
      "dc",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Dhruv Jurel",
    "tags": [
      "rr",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "Suyash Sharma",
    "tags": [
      "kkr",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "SSB Magala",
    "tags": [
      "csk",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "MW Short",
    "tags": [
      "csk",
      "pbks",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "Mohit Rathee",
    "tags": [
      "pbks",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "YV Dhull",
    "tags": [
      "dc",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Vijaykumar Vyshak",
    "tags": [
      "rcb",
      "pbks",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Yudhvir Singh",
    "tags": [
      "rr",
      "lsg",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Atharva Taide",
    "tags": [
      "srh",
      "pbks",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Arjun Tendulkar",
    "tags": [
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "D Jansen",
    "tags": [
      "mi",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Noor Ahmad",
    "tags": [
      "gt",
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Naveen-ul-Haq",
    "tags": [
      "lsg",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Liton Das",
    "tags": [
      "kkr",
      "post-2015",
      "active",
      "opener"
    ]
  },
  {
    "name": "PD Salt",
    "tags": [
      "kkr",
      "dc",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Mayank Dagar",
    "tags": [
      "srh",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Abdul Basith",
    "tags": [
      "rr",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Gurnoor Brar",
    "tags": [
      "pbks",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "AJ Hosein",
    "tags": [
      "srh",
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Akash Madhwal",
    "tags": [
      "rr",
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "R Goyal",
    "tags": [
      "mi",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Vivrant Sharma",
    "tags": [
      "srh",
      "post-2015",
      "active",
      "opener"
    ]
  },
  {
    "name": "JE Root",
    "tags": [
      "rr",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "MD Shanaka",
    "tags": [
      "gt",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Sanvir Singh",
    "tags": [
      "srh",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Nithish Kumar Reddy",
    "tags": [
      "srh",
      "post-2015",
      "active",
      "allrounder"
    ]
  },
  {
    "name": "H Sharma",
    "tags": [
      "rcb",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "R Ravindra",
    "tags": [
      "csk",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "SD Hope",
    "tags": [
      "dc",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "Sumit Kumar",
    "tags": [
      "dc",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "N Burger",
    "tags": [
      "rr",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "L Wood",
    "tags": [
      "mi",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "SZ Mulani",
    "tags": [
      "mi",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Azmatullah Omarzai",
    "tags": [
      "gt",
      "pbks",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Naman Dhir",
    "tags": [
      "mi",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "G Coetzee",
    "tags": [
      "gt",
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "SH Johnson",
    "tags": [
      "gt",
      "kkr",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Sameer Rizvi",
    "tags": [
      "dc",
      "csk",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "KT Maphaka",
    "tags": [
      "rr",
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "M Siddharth",
    "tags": [
      "lsg",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "MP Yadav",
    "tags": [
      "lsg",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "SB Dubey",
    "tags": [
      "rr",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "A Raghuvanshi",
    "tags": [
      "kkr",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "Ashutosh Sharma",
    "tags": [
      "dc",
      "pbks",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "Saurav Chauhan",
    "tags": [
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Kumar Kushagra",
    "tags": [
      "gt",
      "dc",
      "post-2015",
      "active",
      "opener"
    ]
  },
  {
    "name": "BR Sharath",
    "tags": [
      "gt",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "KA Maharaj",
    "tags": [
      "rr",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "WG Jacks",
    "tags": [
      "mi",
      "post-2015",
      "active",
      "allrounder"
    ]
  },
  {
    "name": "J Fraser-McGurk",
    "tags": [
      "dc",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Tanush Kotian",
    "tags": [
      "rr",
      "post-2015",
      "active",
      "opener"
    ]
  },
  {
    "name": "Arshad Khan (2)",
    "tags": [
      "lsg",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "S Joseph",
    "tags": [
      "lsg",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "N Thushara",
    "tags": [
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "LB Williams",
    "tags": [
      "dc",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "AA Kulkarni",
    "tags": [
      "lsg",
      "post-2015",
      "active",
      "opener"
    ]
  },
  {
    "name": "RJ Gleeson",
    "tags": [
      "mi",
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "MJ Suthar",
    "tags": [
      "gt",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "A Kamboj",
    "tags": [
      "mi",
      "csk",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Gulbadin Naib",
    "tags": [
      "dc",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "D Ferreira",
    "tags": [
      "rr",
      "dc",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "V Viyaskanth",
    "tags": [
      "srh",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "V Kaverappa",
    "tags": [
      "pbks",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "T Kohler-Cadmore",
    "tags": [
      "rr",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Shivam Singh",
    "tags": [
      "pbks",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Aniket Verma",
    "tags": [
      "srh",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "RD Rickelton",
    "tags": [
      "mi",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "R Minz",
    "tags": [
      "mi",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "PVSN Raju",
    "tags": [
      "mi",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "V Puthur",
    "tags": [
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "V Nigam",
    "tags": [
      "dc",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "DS Rathi",
    "tags": [
      "lsg",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Prince Yadav",
    "tags": [
      "lsg",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Priyansh Arya",
    "tags": [
      "pbks",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "PWA Mulder",
    "tags": [
      "srh",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Zeeshan Ansari",
    "tags": [
      "srh",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "J Overton",
    "tags": [
      "csk",
      "post-2015",
      "active",
      "allrounder",
      "finisher"
    ]
  },
  {
    "name": "Ashwani Kumar",
    "tags": [
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "PHKD Mendis",
    "tags": [
      "srh",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Suryansh Shedge",
    "tags": [
      "pbks",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "E Malinga",
    "tags": [
      "srh",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "SK Rasheed",
    "tags": [
      "csk",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "JP Inglis",
    "tags": [
      "pbks",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "XC Bartlett",
    "tags": [
      "pbks",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "MS Bhandage",
    "tags": [
      "post-2015",
      "active"
    ]
  },
  {
    "name": "V Suryavanshi",
    "tags": [
      "rr",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "A Mhatre",
    "tags": [
      "csk",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "C Bosch",
    "tags": [
      "mi",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "JG Bethell",
    "tags": [
      "post-2015",
      "active",
      "opener"
    ]
  },
  {
    "name": "Karim Janat",
    "tags": [
      "gt",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "KS Rathore",
    "tags": [
      "rr",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Urvil Patel",
    "tags": [
      "csk",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "M Tiwari",
    "tags": [
      "dc",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "MJ Owen",
    "tags": [
      "pbks",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Harsh Dubey",
    "tags": [
      "srh",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "W ORourke",
    "tags": [
      "lsg",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Sediqullah Atal",
    "tags": [
      "dc",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "MP Breetzke",
    "tags": [
      "lsg",
      "post-2015",
      "active",
      "opener"
    ]
  },
  {
    "name": "Musheer Khan",
    "tags": [
      "pbks",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "BKG Mendis",
    "tags": [
      "gt",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "JA Duffy",
    "tags": [
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "Abhinandan Singh",
    "tags": [
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "S Arora",
    "tags": [
      "srh",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "DA Payne",
    "tags": [
      "srh",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "FH Allen",
    "tags": [
      "kkr",
      "post-2015",
      "active",
      "opener"
    ]
  },
  {
    "name": "AM Ghazanfar",
    "tags": [
      "mi",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "B Muzarabani",
    "tags": [
      "kkr",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Brijesh Sharma",
    "tags": [
      "rr",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Kartik Sharma",
    "tags": [
      "csk",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "C Connolly",
    "tags": [
      "pbks",
      "post-2015",
      "active",
      "batsman"
    ]
  },
  {
    "name": "Ashok Sharma",
    "tags": [
      "gt",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "MD Choudhary",
    "tags": [
      "lsg",
      "post-2015",
      "active",
      "batsman",
      "finisher"
    ]
  },
  {
    "name": "P Nissanka",
    "tags": [
      "dc",
      "post-2015",
      "active",
      "batsman",
      "opener"
    ]
  },
  {
    "name": "Shivang Kumar",
    "tags": [
      "srh",
      "post-2015",
      "active",
      "bowler"
    ]
  },
  {
    "name": "PR Veer",
    "tags": [
      "csk",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Auqib Nabi",
    "tags": [
      "dc",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Gurjapneet Singh",
    "tags": [
      "csk",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "GF Linde",
    "tags": [
      "lsg",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "PP Hinge",
    "tags": [
      "srh",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "LG Pretorius",
    "tags": [
      "rr",
      "post-2015",
      "active"
    ]
  },
  {
    "name": "Sakib Hussain",
    "tags": [
      "srh",
      "post-2015",
      "active"
    ]
  }
];

export default players;
