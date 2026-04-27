import React, { useState } from 'react';
import { candidates } from '../data/mockData';
import { FileText, Briefcase, Scale } from 'lucide-react';

export const CandidateSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'compare' | 'quiz'>('compare');
  const [quizStep, setQuizStep] = useState(0);
  const [preferences, setPreferences] = useState({ economy: '', environment: '', infrastructure: '' });
  const [matchedCandidate, setMatchedCandidate] = useState<any>(null);

  const questions = [
    {
      id: 'economy',
      title: 'What is your top economic priority?',
      options: [
        { label: 'Technology & Job Creation', value: 'tech-focus' },
        { label: 'Sustainable Green Economy', value: 'sustainable' },
        { label: 'Tax Cuts & Small Business', value: 'pro-business' }
      ]
    },
    {
      id: 'environment',
      title: 'How important are environmental regulations?',
      options: [
        { label: 'Very Important (Even if it costs jobs)', value: 'high' },
        { label: 'Somewhat Important (Balanced approach)', value: 'moderate' },
        { label: 'Less Important (Economy first)', value: 'low' }
      ]
    },
    {
      id: 'infrastructure',
      title: 'Where should infrastructure funds go?',
      options: [
        { label: 'High-tech hospitals and smart city tech', value: 'high' },
        { label: 'Public Transport & Parks', value: 'moderate' },
        { label: 'Law enforcement & Heritage sites', value: 'low' } // aligned loosely with c3
      ]
    }
  ];

  const handleAnswer = (val: string) => {
    const key = questions[quizStep].id;
    setPreferences(prev => ({ ...prev, [key]: val }));
    
    if (quizStep < questions.length - 1) {
      setQuizStep(s => s + 1);
    } else {
      calculateMatch({ ...preferences, [key]: val });
    }
  };

  const calculateMatch = (finalPrefs: any) => {
    let bestMatch = candidates[0];
    let maxScore = 0;

    candidates.forEach(c => {
      let score = 0;
      if (c.stances.economy === finalPrefs.economy) score++;
      if (c.stances.environment === finalPrefs.environment) score++;
      if (c.stances.infrastructure === finalPrefs.infrastructure) score++;
      
      if (score > maxScore) {
        maxScore = score;
        bestMatch = c;
      }
    });

    setMatchedCandidate(bestMatch);
  };

  return (
    <section id="candidates" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Know Your Candidates</h2>
          <p className="text-xl text-slate-600">Explore mock candidates and see who aligns with your values.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-200 p-1 rounded-full flex gap-1">
            <button 
              onClick={() => setActiveTab('compare')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${activeTab === 'compare' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-800'}`}
            >
              Candidate Comparison
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${activeTab === 'quiz' ? 'bg-white shadow text-orange-600' : 'text-slate-600 hover:text-slate-800'}`}
            >
              Match Quiz
            </button>
          </div>
        </div>

        {/* Comparison View */}
        {activeTab === 'compare' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {candidates.map(c => (
              <div key={c.id} className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-2 ${c.id === 'c1' ? 'bg-blue-500' : c.id === 'c2' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl shadow-sm border border-slate-200">
                    {c.symbol}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{c.name}</h3>
                    <p className="text-slate-500 font-semibold">{c.party}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-slate-700 border-b pb-2 mb-3">
                      <FileText size={18} /> Manifesto Highlights
                    </h4>
                    <ul className="list-disc pl-5 text-slate-600 space-y-1 text-sm">
                      {c.manifesto.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-slate-700 border-b pb-2 mb-3">
                      <Briefcase size={18} /> Past Record
                    </h4>
                    <p className="text-slate-600 text-sm">{c.record}</p>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-slate-700 border-b pb-2 mb-3">
                      <Scale size={18} /> Affidavit Details
                    </h4>
                    <p className="text-slate-600 text-sm bg-slate-50 p-3 rounded border border-slate-200">{c.affidavit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quiz View */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            {!matchedCandidate ? (
              <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100 text-center">
                <h3 className="text-2xl font-bold mb-8">{questions[quizStep].title}</h3>
                <div className="space-y-4">
                  {questions[quizStep].options.map((opt, i) => (
                    <button 
                      key={i}
                      onClick={() => handleAnswer(opt.value)}
                      className="w-full text-left p-4 rounded-xl border-2 border-slate-200 hover:border-secondary hover:bg-orange-50 font-semibold text-slate-700 transition-all hover:-translate-y-1"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex gap-2 justify-center">
                  {questions.map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${i === quizStep ? 'bg-secondary' : i < quizStep ? 'bg-orange-300' : 'bg-slate-200'}`}></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-secondary text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-9xl opacity-10">{matchedCandidate.symbol}</div>
                <h3 className="text-slate-500 font-bold uppercase tracking-wider mb-2">Your Best Match</h3>
                <div className="text-6xl mb-4">{matchedCandidate.symbol}</div>
                <h2 className="text-4xl font-bold text-slate-800 mb-2">{matchedCandidate.name}</h2>
                <p className="text-xl text-slate-600 font-medium mb-8">{matchedCandidate.party}</p>
                <p className="text-slate-600 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  Based on your answers, this candidate aligns with your priorities on the economy, environment, and infrastructure.
                </p>
                <button 
                  onClick={() => { setMatchedCandidate(null); setQuizStep(0); setPreferences({ economy: '', environment: '', infrastructure: '' }); }}
                  className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
