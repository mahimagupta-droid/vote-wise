import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useUserStore } from '../store/useUserStore';
import { candidates } from '../data/mockData';
import { Search, MapPin, Fingerprint, CheckCircle, Volume2 } from 'lucide-react';

export const VotingSimulator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [voterId, setVoterId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showVvpat, setShowVvpat] = useState(false);
  const { setHasVoted } = useUserStore();

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setStep(2);
    }, 1500);
  };

  const handleVote = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    
    // Play beep sound (simulated with a short visual delay)
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // Beep frequency
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);

    setTimeout(() => {
      setShowVvpat(true);
      setTimeout(() => {
        setShowVvpat(false);
        setStep(5);
        triggerConfetti();
        setHasVoted();
      }, 7000); // VVPAT shows for 7 seconds
    }, 500);
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ea580c', '#ffffff', '#16a34a']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ea580c', '#ffffff', '#16a34a']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section id="simulator" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">How to Vote Simulator</h2>
          <p className="text-xl text-slate-600">Walk through the exact process you'll experience on polling day.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-secondary -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          ></div>
          
          {[
            { num: 1, icon: <Search size={20} />, label: 'Check Roll' },
            { num: 2, icon: <MapPin size={20} />, label: 'Find Booth' },
            { num: 3, icon: <Fingerprint size={20} />, label: 'Verification' },
            { num: 4, icon: <Volume2 size={20} />, label: 'Cast Vote' },
            { num: 5, icon: <CheckCircle size={20} />, label: 'Done' }
          ].map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${step >= s.num ? 'bg-secondary text-white shadow-lg' : 'bg-slate-200 text-slate-500'}`}>
                {s.icon}
              </div>
              <span className={`text-xs font-semibold ${step >= s.num ? 'text-slate-800' : 'text-slate-400'} hidden sm:block`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Simulator Content */}
        <div className="glass-card rounded-3xl p-8 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 border border-slate-200">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Check Electoral Roll */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                className="w-full max-w-md text-center"
              >
                <Search className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-2">Check Your Name</h3>
                <p className="text-slate-600 mb-8">Enter your EPIC (Voter ID) number to check if you are on the electoral roll.</p>
                
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter ABC1234567" 
                    className="flex-grow p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value)}
                  />
                  <button 
                    onClick={handleSearch}
                    disabled={voterId.length < 5 || isSearching}
                    className="bg-blue-600 text-white px-6 rounded-xl font-bold disabled:opacity-50 hover:bg-blue-700 transition-colors"
                  >
                    {isSearching ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Booth Info */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                className="w-full text-center"
              >
                <div className="bg-green-100 text-green-800 p-4 rounded-xl mb-8 font-semibold inline-block">
                  ✅ Success! Your name is on the Electoral Roll.
                </div>
                <h3 className="text-2xl font-bold mb-6">Your Polling Booth</h3>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-6 text-left max-w-2xl mx-auto mb-8">
                  <div className="bg-slate-100 w-full sm:w-48 h-32 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <MapPin className="text-red-500 absolute z-10 w-8 h-8" />
                    {/* Simulated Map Background */}
                    <div className="w-[200%] h-[200%] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGFyZWEgc2hhcGU9InJlY3QiIGNvb3Jkcz0iMCwwLDQwLDQwIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGw0MCA0ME00MCAwbC00MCA0MCIgc3Ryb2tlPSIjZTJlOGYwIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-50"></div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">Govt. Primary School, Sector 4</h4>
                    <p className="text-slate-600 mt-2">Part No: 142 | Serial No: 532</p>
                    <p className="text-slate-500 text-sm mt-1">Polling Date: 12th May, 7:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <button onClick={() => setStep(3)} className="bg-secondary text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all">
                  Next: ID Verification
                </button>
              </motion.div>
            )}

            {/* Step 3: Verification & Ink */}
            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                className="w-full max-w-2xl text-center"
              >
                <h3 className="text-2xl font-bold mb-4">Inside the Polling Booth</h3>
                <p className="text-slate-600 mb-8">The Polling Officer verifies your identity and marks your finger with indelible ink.</p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-8 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow border border-slate-200 flex-1">
                    <h4 className="font-bold mb-4">Valid IDs you can use:</h4>
                    <ul className="text-left text-sm text-slate-600 space-y-2 list-disc pl-4">
                      <li>EPIC (Voter ID)</li>
                      <li>Aadhaar Card</li>
                      <li>PAN Card</li>
                      <li>Driving License</li>
                      <li>Indian Passport</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow border border-slate-200 flex-1 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4 relative">
                      <Fingerprint size={48} className="text-slate-400" />
                      <motion.div 
                        initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute bottom-0 left-0 w-full bg-purple-600/30 rounded-full mix-blend-multiply"
                      ></motion.div>
                    </div>
                    <p className="font-semibold text-purple-700">Ink Applied!</p>
                  </div>
                </div>
                <button onClick={() => setStep(4)} className="bg-secondary text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all">
                  Proceed to EVM
                </button>
              </motion.div>
            )}

            {/* Step 4: EVM Simulator */}
            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold">Cast Your Vote</h3>
                  <p className="text-slate-600 text-sm">Press the blue button next to your candidate.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                  {/* EVM Ballot Unit */}
                  <div className="bg-slate-200 p-4 rounded-xl border-4 border-slate-300 w-full max-w-sm shadow-inner relative">
                    <div className="bg-slate-800 text-white text-center py-2 rounded mb-4 font-mono text-xs">BALLOT UNIT</div>
                    <div className="space-y-2">
                      {[...candidates, { id: 'nota', name: 'NOTA', party: 'None of the Above', symbol: '❌' }].map((c, idx) => (
                        <div key={c.id} className="flex items-center gap-2 bg-white p-2 border border-slate-300 rounded">
                          <div className="w-8 font-mono text-center font-bold text-slate-500 border-r">{idx + 1}</div>
                          <div className="flex-grow flex items-center justify-between px-2">
                            <div>
                              <div className="font-bold text-sm uppercase">{c.name}</div>
                            </div>
                            <div className="text-2xl">{c.symbol}</div>
                          </div>
                          {/* Ready Light */}
                          <div className={`w-3 h-3 rounded-full ${selectedCandidate === c.id ? 'bg-red-500 shadow-[0_0_5px_red]' : 'bg-red-900'}`}></div>
                          {/* Button */}
                          <button 
                            onClick={() => handleVote(c.id)}
                            disabled={selectedCandidate !== null}
                            className={`w-8 h-8 rounded-full ml-2 shadow-inner transition-transform active:scale-90 ${selectedCandidate !== null ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
                          ></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VVPAT Machine */}
                  <div className="w-full max-w-xs relative">
                    <div className="bg-slate-300 rounded-t-3xl border-4 border-slate-400 p-4 h-64 flex flex-col items-center justify-center relative z-10 shadow-lg">
                      <div className="bg-slate-800 text-white text-center px-4 py-1 rounded mb-4 font-mono text-xs absolute top-4">VVPAT</div>
                      
                      {/* VVPAT Window */}
                      <div className="w-48 h-32 bg-slate-900 rounded border-8 border-slate-700 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                        <AnimatePresence>
                          {showVvpat && selectedCandidate && (
                            <motion.div 
                              initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ duration: 1 }}
                              className="bg-white w-40 h-24 p-2 text-center border-b border-dashed border-slate-300 flex flex-col justify-center items-center shadow-lg"
                            >
                              <div className="font-bold text-sm truncate w-full">
                                {selectedCandidate === 'nota' ? 'NOTA' : candidates.find(c => c.id === selectedCandidate)?.name}
                              </div>
                              <div className="text-3xl mt-1">
                                {selectedCandidate === 'nota' ? '❌' : candidates.find(c => c.id === selectedCandidate)?.symbol}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-4 text-center">Slip is visible for 7 seconds and then drops into sealed box.</p>
                    </div>
                    <div className="h-16 bg-slate-400 rounded-b-xl border-x-4 border-b-4 border-slate-500 w-full shadow-lg flex items-center justify-center">
                       <div className="w-3/4 h-2 bg-slate-800 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Celebration */}
            {step === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="w-full text-center py-12"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-4xl font-bold text-slate-800 mb-4">You Voted! 🗳️</h3>
                <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto">
                  You successfully navigated the entire process. You've earned the <strong>"First-Time Voter"</strong> badge!
                </p>
                <button 
                  onClick={() => { setStep(1); setVoterId(''); setSelectedCandidate(null); }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Start Over
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
