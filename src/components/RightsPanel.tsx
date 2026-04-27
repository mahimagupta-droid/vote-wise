import React, { useState } from 'react';
import { Lock, FileSignature, ShieldAlert, Accessibility, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RightsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rights' | 'safeguards'>('rights');

  const rights = [
    { title: 'Right to Secret Ballot', icon: <Lock />, desc: 'No one has the right to know who you voted for. Your vote is completely confidential.' },
    { title: 'Right to Information', icon: <FileSignature />, desc: 'Voters have the right to know about the assets, liabilities, and criminal records (if any) of candidates.' },
    { title: 'Right to Complain', icon: <ShieldAlert />, desc: 'Use the cVIGIL app to report violations of the Model Code of Conduct, or call the 1950 helpline.' },
    { title: 'Right to Accessibility', icon: <Accessibility />, desc: 'Polling stations must be accessible for Persons with Disabilities (PwDs). Home voting is available for seniors 85+ and PwDs.' },
    { title: 'Proxy Voting for Service Voters', icon: <Mail />, desc: 'Members of armed forces or those posted outside their constituency can vote via postal ballot or proxy.' }
  ];

  const safeguards = [
    { title: 'Election Observers', desc: 'Senior civil servants (IAS/IPS/IRS) act as independent eyes and ears of the Commission.' },
    { title: 'Micro-Observers', desc: 'Central Govt employees placed directly inside sensitive polling booths to monitor proceedings.' },
    { title: 'Flying Squads', desc: 'Mobile teams equipped with GPS to track and intercept illegal cash, liquor, or goods meant for bribing.' },
    { title: 'Video Surveillance', desc: 'Webcasting and videography at sensitive polling stations to deter booth capturing or proxy voting.' },
    { title: 'VVPAT Random Audit', desc: 'VVPAT slips of 5 randomly selected polling stations per assembly constituency are mandatorily verified with EVM counts.' }
  ];

  return (
    <section className="py-20 bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-white">Your Rights & Protections</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">The system is designed to empower you and protect the integrity of your vote.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors">
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setActiveTab('rights')}
              className={`flex-1 py-4 font-bold text-lg transition-colors ${activeTab === 'rights' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              Voter Rights
            </button>
            <button 
              onClick={() => setActiveTab('safeguards')}
              className={`flex-1 py-4 font-bold text-lg transition-colors ${activeTab === 'safeguards' ? 'bg-orange-600 dark:bg-orange-600 text-white' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              System Safeguards
            </button>
          </div>

          <div className="p-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'rights' ? (
                <motion.div 
                  key="rights"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {rights.map((right, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                    >
                      <div className="text-blue-600 dark:text-blue-400 flex-shrink-0 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm h-min">
                        {right.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">{right.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{right.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="safeguards"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {safeguards.map((safe, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-5 rounded-xl border-l-4 border-orange-500 dark:border-orange-600 bg-orange-50/50 dark:bg-orange-900/10 shadow-sm"
                    >
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">{safe.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400">{safe.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
