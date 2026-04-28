import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useUserStore } from '../store/useUserStore';
import { useBadgeStore } from '../store/useBadgeStore';
import { Search, MapPin, CheckCircle, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';

export const VotingSimulator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [voterId, setVoterId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showVvpat, setShowVvpat] = useState(false);
  const [inkApplied, setInkApplied] = useState(false);
  
  const { setHasVoted } = useUserStore();
  const { unlockBadge } = useBadgeStore();

  const totalSteps = 7;

  const mockCandidates = [
    { id: '1', name: 'Aarav Sharma', symbol: '☀️', party: 'Progressive Alliance' },
    { id: '2', name: 'Priya Patel', symbol: '🌳', party: 'Green Future Party' },
    { id: '3', name: 'Vikram Singh', symbol: '🦁', party: 'Heritage Front' },
    { id: '4', name: 'Meera Reddy', symbol: '🚲', party: 'Janata Vikas' },
    { id: '5', name: 'Rahul Das', symbol: '⚖️', party: 'Equality Front' }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult(true);
    }, 1000);
  };

  const handleVote = (id: string) => {
    setSelectedCandidate(id);
    
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
        nextStep();
      }, 7000); // VVPAT shows for 7 seconds
    }, 500);
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(s => s + 1);
      if (step + 1 === 7) {
        triggerConfetti();
        setHasVoted();
        unlockBadge('first_time_voter');
      }
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#FF9933', '#ffffff', '#138808'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#FF9933', '#ffffff', '#138808'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const StepHeader = ({ title, desc }: { title: string, desc: string }) => (
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </div>
  );

  return (
    <section id="simulator" className="reveal-section py-20 bg-white dark:bg-slate-900 transition-colors duration-300" role="region" aria-labelledby="simulator-heading">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 id="simulator-heading" className="text-4xl font-bold mb-4 text-[#000080] dark:text-blue-400">How to Vote Simulator</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">Walk through the exact 7-step process you'll experience on polling day.</p>
        </div>

        {/* Stepper UI */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Step {step} of {totalSteps}</span>
            <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">Progress</span>
          </div>
          <div className="relative h-2 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-between px-0.5">
            <div 
              className="absolute top-0 left-0 h-full bg-[#138808] dark:bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
            {[...Array(totalSteps)].map((_, i) => (
              <div 
                key={i} 
                onClick={() => i + 1 < step && setStep(i + 1)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full z-10 transition-colors cursor-pointer ${
                  step > i ? 'bg-[#138808] dark:bg-green-500 shadow-[0_0_10px_rgba(19,136,8,0.5)]' : 
                  step === i + 1 ? 'bg-[#FF9933] scale-125 shadow-[0_0_10px_rgba(255,153,51,0.5)]' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Simulator Content */}
        <div className="glass-card simulator-content rounded-3xl p-6 md:p-10 min-h-[500px] flex flex-col relative overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Check Electoral Roll */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-grow flex flex-col items-center justify-center">
                <StepHeader title="Check Electoral Roll" desc="Search your name to ensure you are eligible to vote." />
                
                <div className="w-full max-w-md bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
                  <div className="flex gap-2 mb-4">
                    <input 
                      type="text" placeholder="Enter Name or EPIC No." 
                      className="flex-grow p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent dark:text-white focus:ring-2 focus:ring-[#FF9933] outline-none"
                      value={voterId} onChange={(e) => setVoterId(e.target.value)}
                    />
                    <button 
                      onClick={handleSearch} disabled={isSearching || voterId.length < 3}
                      className="bg-[#000080] dark:bg-blue-600 text-white px-6 rounded-xl font-bold disabled:opacity-50 hover:bg-blue-900 dark:hover:bg-blue-500 transition-colors"
                    >
                      {isSearching ? '...' : <Search size={20} />}
                    </button>
                  </div>

                  {searchResult && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 text-left">
                      <div className="text-green-600 dark:text-green-400 font-bold mb-2 flex items-center gap-2"><CheckCircle size={16} /> Name Found!</div>
                      <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Name:</strong> Rohan Kumar</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300"><strong>EPIC No:</strong> ABC9876543</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Constituency:</strong> 42-Central</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Booth No:</strong> 115</p>
                    </motion.div>
                  )}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/50 flex items-start gap-2 max-w-md">
                  <span className="text-blue-500 font-bold">ℹ️</span>
                  <span>You can check on <strong>voters.eci.gov.in</strong> or the Voter Helpline app in real life.</span>
                </div>
              </motion.div>
            )}

            {/* Step 2: Find Your Polling Booth */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-grow flex flex-col items-center justify-center">
                <StepHeader title="Find Your Polling Booth" desc="Locate where you need to go to cast your vote." />
                
                <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-6">
                  {/* CSS Map */}
                  <div className="h-48 bg-slate-100 dark:bg-slate-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGFyZWEgc2hhcGU9InJlY3QiIGNvb3Jkcz0iMCwwLDQwLDQwIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGw0MCA0ME00MCAwbC00MCA0MCIgc3Ryb2tlPSIjZTIlOGYwIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=')] opacity-30 dark:opacity-10"></div>
                    {/* Roads */}
                    <div className="absolute top-1/2 left-0 w-full h-4 bg-white dark:bg-slate-600 transform -translate-y-1/2 -rotate-12"></div>
                    <div className="absolute top-0 left-1/3 w-4 h-full bg-white dark:bg-slate-600 transform rotate-12"></div>
                    {/* Pin */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full animate-bounce">
                      <MapPin className="text-red-500 w-10 h-10 drop-shadow-md" fill="currentColor" />
                    </div>
                  </div>
                  <div className="p-6 text-left">
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">Govt. Primary School, Sector 4</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Room No. 2, Main Building</p>
                    <div className="mt-4 flex gap-4">
                      <div className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-semibold">Distance: 1.2 km</div>
                      <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">Booth: #115</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Note: Booths are usually within 2km of your residence.</p>
              </motion.div>
            )}

            {/* Step 3: Carry Your ID */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-grow flex flex-col items-center justify-center w-full">
                <StepHeader title="Carry Your ID" desc="Bring an approved photo ID to prove your identity." />
                
                <div className="w-full overflow-x-auto pb-4 snap-x hide-scrollbar">
                  <div className="flex gap-4 w-max px-4">
                    {[
                      { name: 'Voter ID (EPIC)', color: 'border-[#000080] dark:border-blue-500' },
                      { name: 'Aadhaar Card', color: 'border-slate-200 dark:border-slate-700' },
                      { name: 'Passport', color: 'border-slate-200 dark:border-slate-700' },
                      { name: 'Driving Licence', color: 'border-slate-200 dark:border-slate-700' },
                      { name: 'PAN Card', color: 'border-slate-200 dark:border-slate-700' },
                      { name: 'Job Card (MGNREGA)', color: 'border-slate-200 dark:border-slate-700' }
                    ].map((doc, i) => (
                      <div key={i} className={`w-40 h-28 bg-white dark:bg-slate-800 rounded-xl shadow-sm border-2 ${doc.color} flex flex-col items-center justify-center p-2 text-center snap-center shrink-0`}>
                        <CreditCard size={32} className={i === 0 ? "text-[#000080] dark:text-blue-400 mb-2" : "text-slate-400 dark:text-slate-500 mb-2"} />
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{doc.name}</span>
                        {i === 0 && <span className="text-[10px] bg-[#000080] dark:bg-blue-600 text-white px-2 rounded-full mt-1">Preferred</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 text-sm text-slate-500 dark:text-slate-400 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 p-3 rounded-lg max-w-md text-center">
                  Highlight: Voter ID is preferred but not mandatory if you have other approved documents.
                </div>
              </motion.div>
            )}

            {/* Step 4: Enter the Polling Booth */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-grow flex flex-col items-center justify-center">
                <StepHeader title="Enter the Polling Booth" desc="Follow the officials' instructions inside the booth." />
                
                <div className="w-full max-w-2xl bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6 relative overflow-hidden h-64">
                  <div className="absolute inset-0 flex">
                    {/* Queue */}
                    <div className="w-1/3 border-r border-dashed border-slate-300 dark:border-slate-600 p-4 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50">
                      <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase">1. Queue</div>
                      <div className="flex gap-2 opacity-50">
                        <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                        <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                      </div>
                    </div>
                    {/* Desk */}
                    <div className="w-1/3 border-r border-dashed border-slate-300 dark:border-slate-600 p-4 flex flex-col items-center justify-center relative">
                      <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase">2. Officer Desk</div>
                      <div className="w-16 h-8 bg-[#FF9933] rounded mb-2"></div>
                      <div className="w-8 h-8 rounded-full bg-[#000080] dark:bg-blue-600 text-white flex items-center justify-center text-xs">Off.</div>
                    </div>
                    {/* Cabin */}
                    <div className="w-1/3 p-4 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50">
                      <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase">3. Voting Cabin</div>
                      <div className="w-20 h-24 border-l-4 border-t-4 border-[#138808] border-dashed rounded-tl-lg relative flex items-center justify-center">
                         <div className="w-8 h-10 bg-slate-300 dark:bg-slate-600 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated Voter */}
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full border-2 border-white dark:border-slate-800 shadow-md z-10 flex items-center justify-center text-white text-xs"
                    animate={{ left: ['10%', '50%', '80%'] }}
                    transition={{ duration: 6, times: [0, 0.5, 1], repeat: Infinity, ease: "linear" }}
                  >
                    You
                  </motion.div>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Animated sequence: You wait in queue → Officer checks register & applies ink → You enter cabin to vote.</p>
                <p className="text-sm text-red-500 dark:text-red-400 font-bold mt-2 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 px-4 py-1 rounded-full">
                  Note: No phones or cameras allowed inside the voting compartment!
                </p>
              </motion.div>
            )}

            {/* Step 5: Cast Vote on EVM */}
            {step === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                <StepHeader title="Cast Your Vote" desc="Press the blue button next to your candidate on the EVM." />

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-3xl mx-auto transform scale-90 md:scale-100 origin-top">
                  {/* EVM Ballot Unit */}
                  <div className="bg-slate-200 dark:bg-slate-700 p-4 rounded-xl border-4 border-slate-400 dark:border-slate-600 w-full md:w-1/2 shadow-xl relative transition-colors">
                    <div className="bg-slate-800 dark:bg-slate-900 text-white text-center py-1 rounded mb-4 font-mono text-xs tracking-widest">BALLOT UNIT</div>
                    <div className="space-y-1">
                      {[...mockCandidates, { id: 'nota', name: 'NOTA', symbol: '❌', party: 'None of the Above' }].map((c, idx) => {
                        const isSelected = selectedCandidate === c.id;
                        return (
                          <div key={c.id} className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 border border-slate-300 dark:border-slate-600 rounded shadow-sm">
                            <div className="w-6 font-mono text-center font-bold text-slate-400 dark:text-slate-500 border-r dark:border-slate-600">{idx + 1}</div>
                            <div className="flex-grow px-2 flex justify-between items-center">
                              <div>
                                <div className="font-bold text-xs uppercase dark:text-slate-200">{c.name}</div>
                              </div>
                              <div className="text-xl">{c.symbol}</div>
                            </div>
                            {/* Light */}
                            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isSelected ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-red-900'}`}></div>
                            {/* Button */}
                            <button 
                              onClick={(e) => {
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
                                handleVote(c.id);
                              }}
                              disabled={selectedCandidate !== null}
                              className={`w-10 h-6 rounded-full ml-1 shadow-inner flex-shrink-0 transition-transform active:scale-90 relative overflow-hidden touch-target
                                ${selectedCandidate !== null ? 'bg-blue-300 dark:bg-blue-900 cursor-not-allowed' : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-500 hover:shadow-[0_0_10px_blue]'}`}
                            >
                              {isSelected && <span className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-bold animate-ping">BEEP</span>}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* VVPAT Machine */}
                  <div className="w-full md:w-1/3 relative flex flex-col">
                    <div className="bg-slate-300 dark:bg-slate-600 rounded-t-3xl border-4 border-slate-500 dark:border-slate-700 p-4 h-64 flex flex-col items-center justify-center relative shadow-xl transition-colors">
                      <div className="bg-slate-800 dark:bg-slate-900 text-white text-center px-4 py-1 rounded mb-4 font-mono text-xs absolute top-4">VVPAT</div>
                      
                      <div className="w-40 h-32 bg-slate-900 dark:bg-slate-950 rounded border-8 border-slate-700 dark:border-slate-800 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,1)]"></div>
                        
                        <AnimatePresence>
                          {showVvpat && selectedCandidate && (
                            <motion.div 
                              initial={{ y: -120, opacity: 1 }} 
                              animate={{ y: 0, opacity: 1 }} 
                              exit={{ y: 120, opacity: 0 }} 
                              transition={{ y: { duration: 1, ease: "easeOut" }, opacity: { duration: 1, delay: 5.5 } }}
                              className="bg-[#fefefe] w-32 h-24 p-2 text-center border-l-2 border-r-2 border-b-2 border-slate-300 border-dashed flex flex-col justify-center items-center relative z-10 text-slate-800"
                              style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05), 0 5px 10px rgba(0,0,0,0.1)' }}
                            >
                              <div className="font-bold text-xs truncate w-full border-b border-slate-300 pb-1 mb-1">
                                {selectedCandidate === 'nota' ? 'NOTA' : mockCandidates.find(c => c.id === selectedCandidate)?.name}
                              </div>
                              <div className="text-3xl">
                                {selectedCandidate === 'nota' ? '❌' : mockCandidates.find(c => c.id === selectedCandidate)?.symbol}
                              </div>
                              <div className="text-[10px] font-mono mt-1 text-slate-500">
                                S.No: {selectedCandidate === 'nota' ? 6 : mockCandidates.findIndex(c => c.id === selectedCandidate) + 1}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="h-16 bg-slate-400 dark:bg-slate-700 rounded-b-xl border-x-4 border-b-4 border-slate-600 dark:border-slate-800 w-full shadow-lg flex items-center justify-center">
                       <div className="w-3/4 h-2 bg-slate-800 dark:bg-slate-900 rounded-full shadow-inner"></div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <p className="text-sm text-slate-600 dark:text-slate-400 bg-blue-50 dark:bg-blue-900/20 inline-block px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800/50">
                    Explain: Your vote is stored electronically <strong>AND</strong> verified by paper (VVPAT).
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 6: Indelible Ink */}
            {step === 6 && (
              <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-grow flex flex-col items-center justify-center">
                <StepHeader title="Indelible Ink" desc="The mark of a proud voter." />
                
                <div 
                  className="w-64 h-64 bg-white dark:bg-slate-800 rounded-full shadow-lg border-4 border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center relative cursor-pointer group"
                  onClick={() => setInkApplied(true)}
                >
                  {/* CSS Hand representation */}
                  <div className="relative w-24 h-40 mt-10">
                    <div className="absolute bottom-0 left-4 w-16 h-20 bg-[#fbcda1] rounded-b-xl"></div> {/* Palm */}
                    <div className="absolute bottom-20 left-4 w-4 h-16 bg-[#fbcda1] rounded-t-full origin-bottom transform -rotate-12"></div> {/* Thumb */}
                    <div className="absolute bottom-20 left-12 w-4 h-20 bg-[#fbcda1] rounded-t-full"> {/* Index Finger */}
                      {inkApplied && (
                        <motion.div 
                          initial={{ height: 0 }} animate={{ height: '40%' }} transition={{ duration: 0.8, ease: "easeOut" }}
                          className="absolute top-4 left-0 w-full bg-purple-900 rounded-sm mix-blend-multiply opacity-80"
                        ></motion.div>
                      )}
                    </div> 
                    <div className="absolute bottom-20 left-16 w-4 h-18 bg-[#fbcda1] rounded-t-full"></div> {/* Middle */}
                    {!inkApplied && (
                      <div className="absolute -top-10 left-12 w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-300 animate-bounce">
                         Click!
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="mt-8 text-slate-600 dark:text-slate-400 font-medium max-w-md text-center">
                  Explain: Ink lasts 2–3 weeks and prevents double voting. It is applied on the left index finger.
                </p>
                {inkApplied && (
                   <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={nextStep} className="mt-6 bg-[#138808] dark:bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-green-700 transition-colors">
                     Finish Simulation
                   </motion.button>
                )}
              </motion.div>
            )}

            {/* Step 7: Celebration */}
            {step === 7 && (
              <motion.div key="s7" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-grow flex flex-col items-center justify-center text-center py-4">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#138808] dark:text-green-500 mb-8">🗳️ Your vote has been cast!</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-10">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow border-t-4 border-[#FF9933] transform hover:-translate-y-1 transition-transform">
                    <div className="text-3xl mb-2">📊</div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">In 2024 Lok Sabha, <strong>642 million</strong> people voted — a massive 65.79% turnout.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow border-t-4 border-slate-300 dark:border-slate-500 border-x border-b border-slate-200 dark:border-x-slate-700 dark:border-b-slate-700 transform hover:-translate-y-1 transition-transform">
                    <div className="text-3xl mb-2">⚖️</div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">The smallest winning margin in Indian electoral history was just <strong>1 vote</strong> (1957).</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow border-t-4 border-[#138808] transform hover:-translate-y-1 transition-transform">
                    <div className="text-3xl mb-2">🔒</div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Your vote is <strong>100% secret</strong> — no one can trace it back to you.</p>
                  </div>
                </div>

                <button 
                  onClick={() => { setStep(1); setVoterId(''); setSearchResult(false); setSelectedCandidate(null); setInkApplied(false); }}
                  className="bg-slate-800 dark:bg-slate-700 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow-lg"
                >
                  Restart Simulation
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {step < 7 && (
          <div className="flex flex-col md:flex-row justify-between mt-8 gap-4">
            <button 
              onClick={prevStep} disabled={step === 1}
              className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-full font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft size={20} /> Previous
            </button>
            <button 
              onClick={nextStep} 
              disabled={(step === 1 && !searchResult) || (step === 5 && !selectedCandidate) || (step === 6 && !inkApplied)}
              className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 rounded-full font-bold text-white bg-[#000080] dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-500 disabled:opacity-50 transition-colors shadow-lg"
            >
              Next <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
