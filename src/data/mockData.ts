export const timelineSteps = [
  {
    id: 'announcement',
    title: 'Election Announcement',
    color: 'bg-blue-600', // Blue = ECI action
    actor: 'ECI',
    description: 'ECI announces schedule',
    details: {
      what: 'The Election Commission of India holds a press conference to announce the dates for polling, counting, and results.',
      who: 'Election Commission of India (ECI)',
      duration: '1 Day',
      rule: 'The Model Code of Conduct (MCC) comes into effect immediately upon this announcement.'
    }
  },
  {
    id: 'mcc',
    title: 'Model Code of Conduct',
    color: 'bg-blue-600',
    actor: 'ECI',
    description: 'MCC kicks in',
    details: {
      what: 'A set of guidelines issued by the ECI for conduct of political parties and candidates during elections.',
      who: 'Election Commission of India (ECI)',
      duration: 'From Announcement to Result Declaration',
      rule: 'Ministers cannot use government machinery for campaign purposes or announce new financial grants.'
    }
  },
  {
    id: 'nominations',
    title: 'Nominations',
    color: 'bg-orange-500', // Orange = Candidate/Party action
    actor: 'Candidates',
    description: 'Candidates file papers',
    details: {
      what: 'Candidates submit their nomination papers along with an affidavit detailing their assets, liabilities, and criminal records.',
      who: 'Candidates',
      duration: '7 Days',
      rule: 'Providing false information in the affidavit can lead to rejection of the nomination or disqualification.'
    }
  },
  {
    id: 'campaign',
    title: 'Campaign Period',
    color: 'bg-orange-500',
    actor: 'Parties / Candidates',
    description: 'Parties canvass voters',
    details: {
      what: 'Political parties and candidates hold rallies, distribute manifestos, and reach out to voters to seek their support.',
      who: 'Political Parties & Candidates',
      duration: '14 to 21 Days',
      rule: 'Campaigning must stop 48 hours before the end of polling. This is known as the "Silence Period".'
    }
  },
  {
    id: 'voting',
    title: 'Voting Day',
    color: 'bg-green-600', // Green = Voter action
    actor: 'Voters',
    description: 'Silent period + polling',
    details: {
      what: 'Registered voters go to their designated polling booths to cast their votes using Electronic Voting Machines (EVMs).',
      who: 'Voters',
      duration: '1 Day (per phase)',
      rule: 'No campaigning or canvassing is allowed within 100 meters of the polling station.'
    }
  },
  {
    id: 'counting',
    title: 'Counting Day',
    color: 'bg-blue-600',
    actor: 'ECI',
    description: 'EVM results tallied',
    details: {
      what: 'EVMs are opened under heavy security in the presence of candidates or their agents, and votes are counted.',
      who: 'Election Commission of India (ECI)',
      duration: '1 Day',
      rule: 'VVPAT slips from 5 randomly selected polling stations per assembly segment are tallied with EVM counts.'
    }
  },
  {
    id: 'result',
    title: 'Result Declaration',
    color: 'bg-blue-600',
    actor: 'ECI',
    description: 'Winning candidate declared',
    details: {
      what: 'The Returning Officer officially declares the winning candidate who secured the highest number of votes.',
      who: 'Election Commission of India (ECI)',
      duration: '1 Day',
      rule: 'In India\'s First-Past-The-Post system, the candidate with the most votes wins, even if it is not an absolute majority.'
    }
  },
  {
    id: 'oath',
    title: 'Oath Taking',
    color: 'bg-orange-500',
    actor: 'Elected Representatives',
    description: 'Winner sworn into office',
    details: {
      what: 'The newly elected representatives take an oath of office and secrecy before assuming their duties.',
      who: 'Elected Candidates',
      duration: '1 Day',
      rule: 'An MP cannot participate in the proceedings of the House without taking the oath.'
    }
  }
];

export const quizQuestions = [
  {
    question: "What is the minimum age to vote in India?",
    options: ["16", "18", "21", "25"],
    correctAnswer: 1,
    explanation: "The voting age was reduced from 21 to 18 by the 61st Constitutional Amendment in 1988."
  },
  {
    question: "How many seats are there in the Lok Sabha?",
    options: ["250", "452", "543", "600"],
    correctAnswer: 2,
    explanation: "The Lok Sabha has 543 elected constituencies representing the people of India."
  },
  {
    question: "What does NOTA stand for?",
    options: ["None of the Allowed", "None of the Above", "No Other Than Allowed", "National Option Total Abstain"],
    correctAnswer: 1,
    explanation: "NOTA allows voters to officially register a vote of rejection for all contesting candidates."
  },
  {
    question: "Who conducts Lok Sabha elections in India?",
    options: ["President of India", "Prime Minister's Office", "Election Commission of India", "Supreme Court"],
    correctAnswer: 2,
    explanation: "The ECI is an independent constitutional body responsible for administering elections."
  },
  {
    question: "What is the Model Code of Conduct?",
    options: ["A rulebook for voters", "Rules for polling officers", "Guidelines that govern parties and candidates during elections", "EVM security protocol"],
    correctAnswer: 2,
    explanation: "The MCC ensures a level playing field and ethical campaigning by all political parties."
  },
  {
    question: "How long does indelible ink last on your finger?",
    options: ["1 day", "3–5 days", "2–3 weeks", "2 months"],
    correctAnswer: 2,
    explanation: "The silver nitrate ink reacts with the skin and typically takes 2–3 weeks to fade completely."
  },
  {
    question: "What is VVPAT?",
    options: ["A voter registration app", "A machine that prints a paper slip showing your vote for verification", "A political party tracking system", "A vote counting algorithm"],
    correctAnswer: 1,
    explanation: "Voter Verifiable Paper Audit Trail allows voters to verify that their vote was cast correctly."
  },
  {
    question: "Which document is NOT accepted as voter ID at polling booths?",
    options: ["Aadhaar Card", "Driving Licence", "School Report Card", "Passport"],
    correctAnswer: 2,
    explanation: "School report cards are not secure identity documents. Valid photo IDs like PAN or Aadhaar are required."
  },
  {
    question: "What happens if a voter finds their name missing from the electoral roll?",
    options: ["They cannot vote that year", "They can vote with just their Aadhaar", "They can cast a Tendered Vote", "They must go to the High Court"],
    correctAnswer: 2, // Wait, Tendered Vote is for when someone else has already voted in your name. 
    // BUT the prompt specifies EXACTLY: "Q9. What happens if a voter finds their name missing... C) They can cast a Tendered Vote ✓"
    // So I MUST use option 2 (index 2) as correct.
    explanation: "If someone else has voted in your name, you can cast a 'Tendered Vote' on paper. (Note: missing name generally means no vote, but we follow the quiz!)."
  },
  {
    question: "In which year were Electronic Voting Machines (EVMs) first used in all Indian parliamentary elections?",
    options: ["1989", "1998", "2004", "2009"],
    correctAnswer: 2,
    explanation: "EVMs were used in all 543 parliamentary constituencies for the first time in the 2004 General Elections."
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
