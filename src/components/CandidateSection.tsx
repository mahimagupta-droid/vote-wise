import React, { useState } from 'react';
import { candidates } from '../data/mockData';
import { FileText, Briefcase, GraduationCap, Building, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBadgeStore } from '../store/useBadgeStore';

const ManifestoBlock: React.FC<{ manifesto: string[] }> = ({ manifesto }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <h4 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 pb-2 mb-3 cursor-pointer md:cursor-auto touch-target"
      >
        <span className="flex items-center gap-2"><FileText size={18} className="text-slate-400 dark:text-slate-500" /> Top 3 Promises</span>
        <span className="md:hidden text-slate-400 transition-transform duration-300 text-xs" style={{ rotate: isOpen ? '180deg' : '0deg' }}>▼</span>
      </h4>
      <AnimatePresence initial={false}>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.ul 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pl-6 text-slate-600 dark:text-slate-400 space-y-2 text-sm font-medium overflow-hidden md:!h-auto md:!opacity-100"
          >
            {manifesto.map((m, i) => (
              <li key={i} className="relative before:content-['•'] before:absolute before:-left-4 before:text-slate-300 dark:before:text-slate-600 before:text-lg">{m}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export const CandidateSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'compare' | 'quiz'>('compare');
  const [quizStep, setQuizStep] = useState(0);
  const [preferences, setPreferences] = useState<Record<string, string>>({});
  const [matchResults, setMatchResults] = useState<any[] | null>(null);
  const { unlockBadge } = useBadgeStore();

  const questions = [
    {
      id: 'q1',
      title: 'What is your top priority?',
      options: ['Economy', 'Environment', 'Healthcare', 'Infrastructure']
    },
    {
      id: 'q2',
      title: 'What is most important for the youth?',
      options: ['Jobs', 'Education', 'Both equally']
    },
    {
      id: 'q3',
      title: 'What is your stance on taxes?',
      options: ['Keep low', 'Raise for rich', 'Current is fine']
    },
    {
      id: 'q4',
      title: 'How should we handle public transport?',
      options: ['Expand aggressively', 'Maintain current', 'Private is better']
    },
    {
      id: 'q5',
      title: 'What is your view on the environment?',
      options: ['Top priority', 'Important but balance with growth', 'Economy first']
    }
  ];

  const handleAnswer = (val: string) => {
    const key = questions[quizStep].id;
    const newPrefs = { ...preferences, [key]: val };
    setPreferences(newPrefs);
    
    if (quizStep < questions.length - 1) {
      setQuizStep(s => s + 1);
    } else {
      calculateMatch(newPrefs);
    }
  };

  const calculateMatch = (finalPrefs: Record<string, string>) => {
    // Max possible score per question is 10, total 50.
    const maxScore = 50; 
    
    const results = candidates.map(c => {
      let score = 0;
      Object.keys(finalPrefs).forEach(qKey => {
        const answer = finalPrefs[qKey];
        // Safely add points based on candidate's specific weighting for that answer
        score += (c.scoringWeights as any)[qKey]?.[answer] || 0;
      });
      return {
        candidate: c,
        percentage: Math.round((score / maxScore) * 100)
      };
    }).sort((a, b) => b.percentage - a.percentage);

    setMatchResults(results);
    unlockBadge('issue_voter');
  };

  return (
    <section id="candidates" className="reveal-section py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300" role="region" aria-labelledby="candidates-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="candidates-heading" className="text-4xl font-bold mb-4 text-slate-800 dark:text-white">Know Your Candidates</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Compare fictional candidates, analyze their profiles, and find who aligns with your values.</p>
          <p className="mt-2 text-sm font-bold text-orange-500 dark:text-orange-400 uppercase tracking-widest bg-orange-100 dark:bg-orange-900/30 inline-block px-3 py-1 rounded-full">
            Disclaimer: This is a fictional educational exercise only.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-full flex gap-1 shadow-inner">
            <button 
              onClick={() => setActiveTab('compare')}
              className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === 'compare' ? 'bg-white dark:bg-slate-900 shadow-md text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
            >
              Candidate Comparison
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === 'quiz' ? 'bg-white dark:bg-slate-900 shadow-md text-orange-600 dark:text-orange-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
            >
              "What Matters to You?" Matcher
            </button>
          </div>
        </div>

        {/* Comparison View */}
        {activeTab === 'compare' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {candidates.map((c, idx) => (
              <motion.div 
                key={c.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all relative overflow-hidden flex flex-col h-full"
              >
                <div className={`absolute top-0 left-0 w-full h-3 ${c.color}`}></div>
                
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex-shrink-0 ${c.color} bg-opacity-10 dark:bg-opacity-20`}>
                    {c.symbol}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                      {c.name} <span className="text-sm font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{c.age} yrs</span>
                    </h3>
                    <p className={`font-bold text-sm uppercase tracking-wider mt-1 ${c.color.replace('bg-', 'text-')} ${c.color.includes('blue') ? 'dark:text-blue-400' : c.color.includes('orange') ? 'dark:text-orange-400' : c.color.includes('green') ? 'dark:text-green-400' : 'dark:text-indigo-400'}`}>
                      {c.party}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1 mt-1 font-medium">
                      <Building size={14} /> {c.constituency}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6 flex-grow">
                  {/* Manifesto */}
                  <ManifestoBlock manifesto={c.manifesto} />
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                      <h4 className="flex items-center gap-2 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase mb-1">
                        <GraduationCap size={14} /> Education
                      </h4>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{c.education}</p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                      <h4 className="flex items-center gap-2 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase mb-1">
                        <Briefcase size={14} /> Assets
                      </h4>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{c.assets}</p>
                    </div>
                  </div>

                  {/* Criminal Cases Badge */}
                  <div>
                    {c.criminalCases === 0 ? (
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 px-4 py-3 rounded-xl font-bold text-sm">
                        <CheckCircle2 size={18} /> Criminal Cases: None
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 px-4 py-3 rounded-xl font-bold text-sm">
                        <AlertTriangle size={18} /> Criminal Cases: {c.criminalCases}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Matcher Quiz View */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            {!matchResults ? (
              <motion.div 
                key={quizStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
                <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Question {quizStep + 1} of {questions.length}</div>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-10">{questions[quizStep].title}</h3>
                <div className="space-y-4">
                  {questions[quizStep].options.map((opt, i) => (
                    <button 
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      className="w-full text-left p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-bold text-slate-700 dark:text-slate-300 hover:text-orange-700 dark:hover:text-orange-400 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1 touch-target ripple-container"
                      onClickCapture={(e) => {
                        const button = e.currentTarget;
                        const circle = document.createElement("span");
                        const diameter = Math.max(button.clientWidth, button.clientHeight);
                        const radius = diameter / 2;
                        circle.style.width = circle.style.height = `${diameter}px`;
                        circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
                        circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
                        circle.classList.add("ripple");
                        const existingRipple = button.getElementsByClassName("ripple")[0];
                        if (existingRipple) existingRipple.remove();
                        button.appendChild(circle);
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                
                {/* Progress Dots */}
                <div className="mt-10 flex gap-2 justify-center">
                  {questions.map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full transition-colors duration-300 ${i === quizStep ? 'bg-orange-500 scale-125' : i < quizStep ? 'bg-orange-300 dark:bg-orange-800' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden"
              >
                <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 text-center">Your Candidate Match</h3>
                <p className="text-slate-500 dark:text-slate-400 text-center mb-10 font-medium">Based on your policy preferences, here is how the candidates align with your values.</p>
                
                <div className="space-y-8">
                  {matchResults.map((result, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      key={idx} 
                      className={`relative ${idx === 0 ? 'bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/50 p-6 rounded-2xl shadow-sm' : 'px-4'}`}
                    >
                      {idx === 0 && (
                         <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-md">
                           Top Match
                         </div>
                      )}
                      <div className="flex justify-between items-end mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${result.candidate.color} bg-opacity-20`}>
                            {result.candidate.symbol}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 dark:text-white text-lg">{result.candidate.name}</h4>
                            <p className={`text-xs font-bold uppercase tracking-wider ${result.candidate.color.replace('bg-', 'text-')} ${result.candidate.color.includes('blue') ? 'dark:text-blue-400' : result.candidate.color.includes('orange') ? 'dark:text-orange-400' : result.candidate.color.includes('green') ? 'dark:text-green-400' : 'dark:text-indigo-400'}`}>
                              {result.candidate.party}
                            </p>
                          </div>
                        </div>
                        <div className={`font-black text-2xl ${idx === 0 ? 'text-orange-600 dark:text-orange-400' : 'text-slate-600 dark:text-slate-400'}`}>
                          {result.percentage}%
                        </div>
                      </div>
                      
                      {/* Percentage Bar */}
                      <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-3">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${result.percentage}%` }}
                          transition={{ duration: 1, delay: idx * 0.2 + 0.5, ease: "easeOut" }}
                          className={`h-full rounded-full ${idx === 0 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 'bg-slate-400 dark:bg-slate-500'}`}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <button 
                    onClick={() => { setMatchResults(null); setQuizStep(0); setPreferences({}); }}
                    className="bg-slate-800 dark:bg-slate-700 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Retake Matcher
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
