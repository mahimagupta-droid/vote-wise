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
    myth: "My one vote doesn't matter",
    truth: "In 2019, 15 Indian constituencies were won by under 1000 votes. Every vote literally changes outcomes."
  },
  {
    id: 2,
    myth: "EVMs can be hacked",
    truth: "EVMs are standalone machines with no WiFi, Bluetooth, or internet. They've never been connected to any network."
  },
  {
    id: 3,
    myth: "I need my Voter ID card to vote",
    truth: "12 alternate documents are accepted including Aadhaar, Passport, and Driving Licence."
  },
  {
    id: 4,
    myth: "Elections are rigged",
    truth: "Each booth has IAS observers, micro-observers, CCTV, flying squads, and VVPAT paper audit trails."
  },
  {
    id: 5,
    myth: "I can't vote if I've moved cities",
    truth: "You can re-register at your new address on voters.eci.gov.in or cast a postal ballot in some cases."
  },
  {
    id: 6,
    myth: "Rich candidates always win",
    truth: "India has elected candidates with declared assets under ₹10,000. Money doesn't guarantee a win."
  }
];

export const candidates = [
  {
    id: 'c1',
    name: 'Priya Sharma',
    age: 42,
    party: 'National Progress Party',
    color: 'bg-blue-500',
    symbol: '📘',
    constituency: 'Central Delhi',
    education: 'Ph.D. Economics',
    manifesto: [
      'Free metro rides for women',
      '500 new govt schools',
      '₹5000/month farmer support'
    ],
    assets: '₹45L',
    criminalCases: 0,
    scoringWeights: {
      q1: { 'Economy': 10, 'Education': 10, 'Healthcare': 5, 'Infrastructure': 0 },
      q2: { 'Education': 10, 'Jobs': 5, 'Both equally': 10 },
      q3: { 'Raise for rich': 10, 'Current is fine': 5, 'Keep low': 0 },
      q4: { 'Expand aggressively': 10, 'Maintain current': 5, 'Private is better': 0 },
      q5: { 'Important but balance with growth': 10, 'Top priority': 5, 'Economy first': 0 }
    }
  },
  {
    id: 'c2',
    name: 'Rahul Verma',
    age: 56,
    party: "People's Alliance",
    color: 'bg-orange-500',
    symbol: '🏗️',
    constituency: 'Central Delhi',
    education: 'B.Tech',
    manifesto: [
      '1 lakh jobs in manufacturing',
      'Expressway expansion',
      'Free electricity up to 300 units'
    ],
    assets: '₹2.1Cr',
    criminalCases: 1,
    scoringWeights: {
      q1: { 'Economy': 10, 'Infrastructure': 10, 'Healthcare': 0, 'Education': 0 },
      q2: { 'Jobs': 10, 'Education': 0, 'Both equally': 5 },
      q3: { 'Keep low': 10, 'Current is fine': 5, 'Raise for rich': 0 },
      q4: { 'Expand aggressively': 5, 'Maintain current': 5, 'Private is better': 10 },
      q5: { 'Economy first': 10, 'Important but balance with growth': 5, 'Top priority': 0 }
    }
  },
  {
    id: 'c3',
    name: 'Anjali Singh',
    age: 38,
    party: 'Green Future Party',
    color: 'bg-green-500',
    symbol: '🌳',
    constituency: 'Central Delhi',
    education: 'M.Sc. Environmental Science',
    manifesto: [
      'Plant 10 lakh trees by 2026',
      'Ban single-use plastic',
      'Solar panels on all govt buildings'
    ],
    assets: '₹12L',
    criminalCases: 0,
    scoringWeights: {
      q1: { 'Environment': 10, 'Economy': 0, 'Healthcare': 5, 'Infrastructure': 0 },
      q2: { 'Education': 5, 'Jobs': 5, 'Both equally': 10 },
      q3: { 'Raise for rich': 5, 'Current is fine': 10, 'Keep low': 0 },
      q4: { 'Expand aggressively': 10, 'Maintain current': 5, 'Private is better': 0 },
      q5: { 'Top priority': 10, 'Important but balance with growth': 5, 'Economy first': 0 }
    }
  },
  {
    id: 'c4',
    name: 'Mohammad Iqbal',
    age: 61,
    party: 'Unity Front',
    color: 'bg-purple-500',
    symbol: '🏥',
    constituency: 'Central Delhi',
    education: 'MBBS',
    manifesto: [
      'New hospitals in every ward',
      'Free medicines for seniors',
      'CCTV in all public spaces'
    ],
    assets: '₹78L',
    criminalCases: 0,
    scoringWeights: {
      q1: { 'Healthcare': 10, 'Economy': 0, 'Environment': 0, 'Infrastructure': 5 },
      q2: { 'Education': 5, 'Jobs': 5, 'Both equally': 10 },
      q3: { 'Raise for rich': 5, 'Current is fine': 10, 'Keep low': 0 },
      q4: { 'Expand aggressively': 5, 'Maintain current': 10, 'Private is better': 0 },
      q5: { 'Important but balance with growth': 10, 'Top priority': 5, 'Economy first': 0 }
    }
  }
];
