export const timelineSteps = [
  {
    id: 'announcement',
    title: 'Announcement',
    color: 'bg-blue-500',
    description: 'The Election Commission of India (ECI) announces the election dates and schedule.',
    details: 'This press conference sets the wheels in motion. The ECI declares the dates for polling, counting, and results. From this moment, the Model Code of Conduct comes into effect.',
    actor: 'ECI'
  },
  {
    id: 'mcc',
    title: 'Model Code of Conduct',
    color: 'bg-orange-500',
    description: 'Rules for political parties and candidates come into force immediately.',
    details: 'The MCC ensures a level playing field. Ministers cannot announce new schemes, use government machinery for campaigning, or make appeals based on caste or religion.',
    actor: 'Parties/Candidates'
  },
  {
    id: 'nominations',
    title: 'Nominations',
    color: 'bg-orange-500',
    description: 'Candidates file their nomination papers and affidavits.',
    details: 'Candidates must submit details about their criminal records (if any), assets, liabilities, and educational qualifications. This is public information.',
    actor: 'Candidates'
  },
  {
    id: 'campaigning',
    title: 'Campaigning',
    color: 'bg-orange-500',
    description: 'Parties and candidates hold rallies, distribute manifestos, and seek votes.',
    details: 'Campaigning must stop 48 hours before the polling day (the "Silence Period") to allow voters a peaceful time to make up their minds.',
    actor: 'Parties/Candidates'
  },
  {
    id: 'voting',
    title: 'Voting Day',
    color: 'bg-green-500',
    description: 'Citizens go to polling booths to cast their votes using EVMs.',
    details: 'Voters show their ID, get marked with indelible ink, and press the button on the EVM next to their chosen candidate or NOTA. The VVPAT prints a slip for verification.',
    actor: 'Voters'
  },
  {
    id: 'counting',
    title: 'Counting & Results',
    color: 'bg-blue-500',
    description: 'Votes are counted under strict security and results are declared.',
    details: 'EVMs are opened in the presence of candidate representatives. The candidate with the highest number of votes in a constituency is declared the winner (First Past the Post system).',
    actor: 'ECI'
  }
];

export const quizQuestions = [
  {
    question: "What is the minimum age to vote in India?",
    options: ["16", "18", "21", "25"],
    correctAnswer: 1,
    explanation: "The minimum voting age in India was reduced from 21 to 18 years by the 61st Constitutional Amendment Act of 1988."
  },
  {
    question: "What does NOTA stand for?",
    options: ["None of the Above", "No Other True Alternative", "New Option To All", "National Option To Abstain"],
    correctAnswer: 0,
    explanation: "NOTA allows voters to officially register a vote of rejection for all candidates contesting in that election."
  },
  {
    question: "How many constituencies are there in the Lok Sabha?",
    options: ["543", "545", "250", "500"],
    correctAnswer: 0,
    explanation: "There are 543 elected constituencies in the Lok Sabha. (The provision for 2 nominated Anglo-Indian members was removed in 2020)."
  },
  {
    question: "Which device is used to physically verify a vote cast on an EVM?",
    options: ["VVPAT", "Voter ID", "Ballot Box", "Electoral Roll"],
    correctAnswer: 0,
    explanation: "VVPAT (Voter Verifiable Paper Audit Trail) prints a paper slip showing the candidate chosen, which is visible for 7 seconds before falling into a sealed drop box."
  },
  {
    question: "Who oversees the election process in a specific district?",
    options: ["Chief Minister", "District Election Officer (DEO)", "Chief Electoral Officer (CEO)", "Presiding Officer"],
    correctAnswer: 1,
    explanation: "The DEO (usually the District Magistrate) coordinates and supervises all election work in the district."
  }
];

export const myths = [
  {
    id: 1,
    myth: "My one vote doesn't matter.",
    truth: "Elections have been won or lost by a single vote. High turnout strengthens democracy and holds leaders accountable. Your vote is your voice.",
    category: "Impact"
  },
  {
    id: 2,
    myth: "EVMs can be easily hacked over the internet.",
    truth: "EVMs are standalone machines with no internet or wireless connectivity. They are manufactured under strict security and randomly allocated to booths.",
    category: "Security"
  },
  {
    id: 3,
    myth: "I can't vote if I don't have a Voter ID card.",
    truth: "If your name is on the electoral roll, you can vote using any of the 12 approved alternative photo identity documents, such as Aadhaar, PAN, Driving License, or Passport.",
    category: "Access"
  },
  {
    id: 4,
    myth: "Elections are completely unmonitored.",
    truth: "The ECI appoints independent General, Police, and Expenditure Observers (usually senior IAS/IPS/IRS officers). There are also micro-observers and webcasting at polling stations.",
    category: "Process"
  }
];

export const candidates = [
  {
    id: 'c1',
    name: 'Aarav Sharma',
    party: 'Progressive Alliance',
    symbol: '☀️',
    constituency: 'Central City',
    manifesto: [
      'Increase education budget by 20%',
      'Build 5 new multi-specialty hospitals',
      'Create 100,000 tech jobs'
    ],
    record: 'Former Mayor, successfully completed metro phase 1.',
    affidavit: 'Assets: ₹2.5 Cr. Criminal Cases: 0.',
    stances: { economy: 'tech-focus', environment: 'moderate', infrastructure: 'high' }
  },
  {
    id: 'c2',
    name: 'Priya Patel',
    party: 'Green Future Party',
    symbol: '🌳',
    constituency: 'Central City',
    manifesto: [
      'Transition to 100% renewable energy',
      'Free public transport for students',
      'Ban single-use plastics'
    ],
    record: 'Environmental activist, planted 1M trees.',
    affidavit: 'Assets: ₹80 L. Criminal Cases: 1 (Protest related).',
    stances: { economy: 'sustainable', environment: 'high', infrastructure: 'moderate' }
  },
  {
    id: 'c3',
    name: 'Vikram Singh',
    party: 'Heritage Front',
    symbol: '🦁',
    constituency: 'Central City',
    manifesto: [
      'Tax cuts for small businesses',
      'Strengthen local law enforcement',
      'Heritage preservation fund'
    ],
    record: 'Two-term MLA, improved local business licensing.',
    affidavit: 'Assets: ₹5 Cr. Criminal Cases: 0.',
    stances: { economy: 'pro-business', environment: 'low', infrastructure: 'moderate' }
  }
];
