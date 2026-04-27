import React, { useState } from 'react';
import { Shield, Building, MapPin, Users, UserCheck, Check, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const eciRoles = [
  {
    id: 1,
    level: 1,
    title: 'Election Commission of India (ECI)',
    heldBy: 'Chief Election Commissioner + 2 Election Commissioners',
    icon: <Shield />,
    responsibilities: [
      'Superintends, directs, and controls all elections to Parliament and State Legislatures.',
      'Issues the Model Code of Conduct and ensures a level playing field.',
      'Registers political parties and allots symbols.'
    ],
    fact: 'The ECI is an independent constitutional authority established on January 25, 1950 (celebrated as National Voters\' Day).'
  },
  {
    id: 2,
    level: 2,
    title: 'Chief Electoral Officer (CEO)',
    heldBy: 'One per state, IAS rank officer',
    icon: <Building />,
    responsibilities: [
      'Supervises the election work in the state/Union Territory.',
      'Ensures continuous updating of the electoral rolls.',
      'Acts as the main link between the ECI and the state machinery.'
    ],
    fact: 'The CEO does not belong to the state government during elections; they are directly under the ECI.'
  },
  {
    id: 3,
    level: 3,
    title: 'District Election Officer (DEO)',
    heldBy: 'One per district, District Collector',
    icon: <MapPin />,
    responsibilities: [
      'Coordinates all election activities within the district.',
      'Provides polling stations and ensures their accessibility.',
      'Manages the deployment of polling personnel and security forces.'
    ],
    fact: 'The DEO has the power to requisition any premises or vehicles in the district for election purposes.'
  },
  {
    id: 4,
    level: 4,
    title: 'Returning Officer (RO)',
    heldBy: 'One per constituency',
    icon: <Users />,
    responsibilities: [
      'Receives and scrutinizes nomination papers from candidates.',
      'Publishes the final list of contesting candidates.',
      'Declares the final election result for their constituency.'
    ],
    fact: 'The RO is the absolute authority for deciding the validity of a candidate\'s nomination.'
  },
  {
    id: 5,
    level: 5,
    title: 'Presiding Officer',
    heldBy: 'In charge of one polling booth',
    icon: <UserCheck />,
    responsibilities: [
      'In charge of the polling station and maintains order.',
      'Ensures the EVM/VVPAT are functioning correctly.',
      'Seals the voting machines at the end of the poll in the presence of polling agents.'
    ],
    fact: 'The Presiding Officer can conduct a "mock poll" before actual voting starts to prove the EVM is empty.'
  },
  {
    id: 6,
    level: 6,
    title: 'Polling Officers (1st, 2nd, 3rd)',
    heldBy: 'Assist the Presiding Officer at the booth',
    icon: <Users />,
    responsibilities: [
      '1st Officer verifies the voter\'s identity against the electoral roll.',
      '2nd Officer applies indelible ink and obtains the voter\'s signature/thumbprint.',
      '3rd Officer controls the EVM Control Unit and enables the voter to cast their vote.'
    ],
    fact: 'They are the front-line workers making the world\'s largest democratic exercise possible.'
  }
];

const mccRules = {
  allowed: [
    'Holding public meetings with prior police permission.',
    'Distributing manifestos and campaign literature.',
    'Door-to-door campaigning between 6 AM and 10 PM.'
  ],
  notAllowed: [
    'Using government vehicles or machinery for campaigning.',
    'Appealing to caste or communal feelings for securing votes.',
    'Distributing cash, liquor, or gifts to voters.'
  ],
  grayArea: [
    'Promises in the manifesto that resemble freebies.',
    'Use of social media algorithms and deepfakes.',
    'Running non-political government ads that indirectly boost the ruling party.'
  ]
};

export const ECIChart: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <section id="eci" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#000080] dark:text-blue-400">Election Machinery</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">Discover the enormous organizational structure that makes Indian elections possible.</p>
        </div>

        {/* Top-down Org Chart */}
        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center mb-24">
          {/* Chart Graphic */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            {eciRoles.map((role, i) => {
              const isRoot = role.level === 1;
              const isActive = activeNode === role.id;
              
              return (
                <React.Fragment key={role.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setActiveNode(isActive ? null : role.id)}
                    className={`relative z-10 w-full max-w-md p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform
                      ${isRoot ? 'bg-[#000080] dark:bg-blue-900 text-white border-[#000080] dark:border-blue-700 hover:scale-105 shadow-lg' : 
                        isActive ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 shadow-md scale-105' : 
                        'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full flex-shrink-0 ${isRoot ? 'bg-white/20 text-white' : isActive ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                        {role.icon}
                      </div>
                      <div>
                        <div className={`text-xs font-bold uppercase tracking-wider mb-1 opacity-80 ${isRoot ? 'text-blue-200' : 'text-blue-600 dark:text-blue-400'}`}>Level {role.level}</div>
                        <h4 className={`font-bold ${isRoot ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>{role.title}</h4>
                        <p className={`text-xs font-medium mt-1 ${isRoot ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>{role.heldBy}</p>
                      </div>
                    </div>
                  </motion.div>
                  {/* Connecting Line */}
                  {i < eciRoles.length - 1 && (
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: 32 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.1 }}
                      className="w-1 bg-slate-300 dark:bg-slate-700 relative z-0"
                    ></motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Details Panel */}
          <div className="w-full lg:w-1/2 sticky top-24">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl min-h-[500px] transition-colors">
              <AnimatePresence mode="wait">
                {activeNode ? (
                  <motion.div 
                    key={activeNode}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="w-16 h-16 bg-[#000080] dark:bg-blue-900 text-white rounded-2xl flex items-center justify-center">
                        {eciRoles.find(n => n.id === activeNode)?.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                          {eciRoles.find(n => n.id === activeNode)?.title}
                        </h3>
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                          Hold by: {eciRoles.find(n => n.id === activeNode)?.heldBy}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest text-sm mb-4">Key Responsibilities</h4>
                      <ul className="space-y-3">
                        {eciRoles.find(n => n.id === activeNode)?.responsibilities.map((resp, i) => (
                          <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400">
                            <Check size={20} className="text-[#138808] dark:text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-2xl border border-orange-200 dark:border-orange-800/50 text-orange-900 dark:text-orange-100 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-bl-full -z-0"></div>
                       <h4 className="font-bold uppercase tracking-widest text-xs text-orange-600 dark:text-orange-400 mb-2 relative z-10">Interesting Fact</h4>
                       <p className="font-medium relative z-10 leading-relaxed text-slate-800 dark:text-slate-200">
                         {eciRoles.find(n => n.id === activeNode)?.fact}
                       </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-600">
                    <Shield size={64} className="mb-6 opacity-20" />
                    <h3 className="text-2xl font-bold text-slate-500 dark:text-slate-500 mb-2">Select a Role</h3>
                    <p className="text-lg">Click on any node in the org chart<br/>to explore their responsibilities.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Model Code of Conduct Box */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">Model Code of Conduct (MCC)</h3>
            <p className="text-slate-600 dark:text-slate-400">Guidelines ensuring a level playing field from announcement until results.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Allowed */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border-t-4 border-[#138808] dark:border-green-500 p-6 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4 text-[#138808] dark:text-green-500">
                <CheckCircleIcon />
                <h4 className="font-bold text-lg">Allowed</h4>
              </div>
              <ul className="space-y-3">
                {mccRules.allowed.map((rule, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                     <span className="text-green-500 mt-0.5">•</span> {rule}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Not Allowed */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border-t-4 border-red-500 p-6 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4 text-red-500">
                <XCircleIcon />
                <h4 className="font-bold text-lg">Not Allowed</h4>
              </div>
              <ul className="space-y-3">
                {mccRules.notAllowed.map((rule, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                     <span className="text-red-500 mt-0.5">•</span> {rule}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Gray Area */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border-t-4 border-slate-400 dark:border-slate-600 p-6 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4 text-slate-500 dark:text-slate-400">
                <HelpCircle size={24} />
                <h4 className="font-bold text-lg">Gray Area</h4>
              </div>
              <ul className="space-y-3">
                {mccRules.grayArea.map((rule, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                     <span className="text-slate-400 mt-0.5">•</span> {rule}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>;
const XCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>;
