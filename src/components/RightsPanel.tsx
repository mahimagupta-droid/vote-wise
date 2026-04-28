import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface RightCardProps {
  icon: string;
  title: string;
  desc: string;
  details: string;
}

const RightCard: React.FC<RightCardProps> = ({ icon, title, desc, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 transition-all hover:shadow-md">
      <div className="flex gap-4">
        <div className="text-3xl flex-shrink-0">{icon}</div>
        <div className="flex-grow">
          <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">{title}</h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">{desc}</p>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {isExpanded ? 'Show less' : 'Learn more'}
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                  {details}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const RightsPanel: React.FC = () => {
  const rights = [
    { 
      icon: '🗳️', 
      title: 'Right to Secret Ballot', 
      desc: 'No one can ask how you voted, ever', 
      details: 'The secret ballot is a fundamental democratic right. Your vote is recorded anonymously, ensuring that you can vote according to your conscience without fear of intimidation or coercion.' 
    },
    { 
      icon: '📋', 
      title: 'Right to Candidate Info', 
      desc: 'Affidavits are public on ECI website', 
      details: 'Voters have the right to informed choice. The Election Commission mandates that all candidates disclose their criminal records, assets, liabilities, and educational qualifications through public affidavits.' 
    },
    { 
      icon: '📱', 
      title: 'Right to Complain', 
      desc: 'cVIGIL app, 1950 helpline, 1800-111-950', 
      details: 'If you witness Model Code of Conduct violations or any electoral malpractices, you can report them securely and anonymously through the cVIGIL mobile app or the official toll-free election helplines.' 
    },
    { 
      icon: '♿', 
      title: 'Right to Accessibility', 
      desc: 'Ramps, wheelchairs, priority queues for PwD', 
      details: 'To ensure inclusive elections, polling booths are equipped with Assured Minimum Facilities (AMF) including ramps, wheelchairs, sign language interpreters, and Braille-enabled EVMs for Persons with Disabilities.' 
    },
    { 
      icon: '🏠', 
      title: 'Right to Home Voting', 
      desc: 'Voters aged 85+ and PwD can vote from home', 
      details: 'Eligible senior citizens (85+ years) and Persons with Disabilities (40%+ benchmark disability) can opt for the postal ballot facility to vote from the comfort of their homes under complete secrecy.' 
    },
    { 
      icon: '🔕', 
      title: 'Right to NOTA', 
      desc: '"None of the Above" is a valid, protected choice', 
      details: 'NOTA allows voters to officially register a vote of rejection for all contesting candidates. It empowers citizens to express dissatisfaction while still participating in the electoral process.' 
    },
    { 
      icon: '🪖', 
      title: 'Right to Proxy Voting', 
      desc: 'Armed forces personnel can assign a proxy', 
      details: 'Classified Service Voters, including members of the Armed Forces and paramilitary forces, can either vote through postal ballots or appoint a proxy from their home constituency to cast a vote on their behalf.' 
    }
  ];

  const safeguards = [
    { stage: 'Before voting', desc: 'Electoral roll revision, BLO verification, photo electoral rolls' },
    { stage: 'During voting', desc: 'Micro-observers, flying squads, webcasting, CCTV at sensitive booths' },
    { stage: 'Vote security', desc: 'EVM sealing with candidate signatures, strong room 24/7 CCTV' },
    { stage: 'Count day', desc: 'VVPAT random audit of 5 booths per constituency, multi-layer counting hall access' },
    { stage: 'Complaint system', desc: 'cVIGIL app resolves complaints within 100 minutes' }
  ];

  return (
    <section id="rights" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white tracking-tight">Your Rights & Safeguards</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The electoral system is designed to empower every citizen and protect the integrity of the democratic process.
          </p>
        </div>

        <div className="space-y-16">
          {/* Subsection A: Voter Rights */}
          <div>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg text-sm font-black uppercase tracking-wider">Part A</span>
                Voter Rights
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rights.map((right, idx) => (
                <RightCard 
                  key={idx}
                  icon={right.icon}
                  title={right.title}
                  desc={right.desc}
                  details={right.details}
                />
              ))}
            </div>
          </div>

          {/* Subsection B: Election Safeguards */}
          <div>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
                <span className="bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-lg text-sm font-black uppercase tracking-wider">Part B</span>
                Election Safeguards
              </h3>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-8">
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
                  {safeguards.map((safe, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      {/* Timeline dot */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <CheckCircle2 size={20} />
                      </div>
                      
                      {/* Card */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                        <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">{safe.stage}</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{safe.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Callout Box */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 border-t border-orange-200 dark:border-orange-900/50 flex flex-col md:flex-row items-center gap-4">
                <div className="bg-orange-500 text-white p-3 rounded-full shrink-0">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h4 className="text-orange-800 dark:text-orange-300 font-bold text-lg">File a complaint on cVIGIL</h4>
                  <p className="text-orange-700 dark:text-orange-400 font-medium">Election violations are resolved within <span className="font-bold underline decoration-orange-400">100 minutes</span> on polling day.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

