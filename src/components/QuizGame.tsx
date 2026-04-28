import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '../data/mockData';
import { useUserStore } from '../store/useUserStore';
import { useBadgeStore } from '../store/useBadgeStore';
import { Award, Zap, Check, X, Play, RotateCcw } from 'lucide-react';

export const QuizGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pointsAddedAnim, setPointsAddedAnim] = useState<number | null>(null);
  
  const { setQuizScore } = useUserStore();
  const { unlockBadge } = useBadgeStore();

  useEffect(() => {
    const savedHighScore = localStorage.getItem('votewise_highscore');
    if (savedHighScore) setHighScore(parseInt(savedHighScore));
  }, []);

  useEffect(() => {
    let timer: any;
    if (isPlaying && !showExplanation && !isFinished && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && !showExplanation) {
      handleAnswer(-1); // Timeout
    }
    return () => clearInterval(timer);
  }, [isPlaying, showExplanation, isFinished, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setCurrentQIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
    setShowExplanation(false);
    setIsFinished(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    const isCorrect = index === quizQuestions[currentQIndex].correctAnswer;
    
    if (isCorrect) {
      let pointsToAdd = 100;
      let newStreak = streak + 1;
      
      // Speed bonus: answered in < 10s (i.e. timeLeft >= 20)
      if (timeLeft >= 20) {
        pointsToAdd += 50;
      }
      
      // Streak multiplier
      if (newStreak >= 3) {
        pointsToAdd = Math.floor(pointsToAdd * 1.5);
      }
      
      setScore(s => s + pointsToAdd);
      setStreak(newStreak);
      
      // Show animated points
      setPointsAddedAnim(pointsToAdd);
      setTimeout(() => setPointsAddedAnim(null), 1500);
      
    } else {
      setStreak(0);
    }
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex(i => i + 1);
      setTimeLeft(30);
      setShowExplanation(false);
      setSelectedAnswer(null);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setIsFinished(true);
    setQuizScore(score);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('votewise_highscore', score.toString());
    }
    
    // Check Civics Scholar badge condition (score >= 80%)
    const maxScore = quizQuestions.length * 100;
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) {
      unlockBadge('civics_scholar');
    }
  };

  const getGrade = () => {
    const maxScore = quizQuestions.length * 100; // Ignoring bonuses for base grade calc
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { grade: 'A', text: 'Outstanding!', color: 'text-green-500' };
    if (percentage >= 70) return { grade: 'B', text: 'Great Job!', color: 'text-blue-500' };
    if (percentage >= 50) return { grade: 'C', text: 'Good Effort!', color: 'text-orange-500' };
    return { grade: 'D', text: 'Keep Learning!', color: 'text-red-500' };
  };

  return (
    <section id="quiz" className="reveal-section py-20 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white relative overflow-hidden transition-colors duration-300" role="region" aria-labelledby="quiz-heading">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-400 to-transparent"></div>
      
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <h2 id="quiz-heading" className="text-4xl font-bold mb-4 text-[#FF9933] dark:text-orange-500">Civic Quiz Game</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">Test your knowledge. Answer fast for speed bonuses and build a streak!</p>
        </div>

        <div className="quiz-card bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 min-h-[500px] flex flex-col relative overflow-hidden transition-colors duration-300">
          
          {/* Points Added Animation */}
          <AnimatePresence>
            {pointsAddedAnim !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.5 }} animate={{ opacity: 1, y: -50, scale: 1.5 }} exit={{ opacity: 0 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-4xl font-black text-green-500 dark:text-green-400 z-50 pointer-events-none drop-shadow-lg"
              >
                +{pointsAddedAnim}
              </motion.div>
            )}
          </AnimatePresence>

          {!isPlaying && !isFinished && (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
              <Award size={80} className="text-[#FF9933] mb-6" />
              <h3 className="text-3xl font-bold mb-4 dark:text-white">Are you ready?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
                10 Questions. 30 seconds each. 100 points base score.<br/>
                <span className="text-yellow-600 dark:text-yellow-400 font-bold">+50</span> if answered in under 10s.<br/>
                <span className="text-orange-600 dark:text-orange-400 font-bold">1.5x</span> points for a 3-streak!
              </p>
              {highScore > 0 && <p className="mb-6 text-sm font-mono text-slate-500 dark:text-slate-400">High Score: {highScore}</p>}
              <button 
                onClick={startGame}
                className="bg-[#FF9933] hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-xl transition-all flex items-center gap-3 shadow-lg hover:scale-105"
              >
                <Play fill="currentColor" /> Play Now
              </button>
            </div>
          )}

          {isPlaying && !isFinished && (
            <div className="flex-grow flex flex-col p-6 md:p-10">
              {/* Header Info */}
              <div className="flex justify-between items-center mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-full text-sm font-bold text-slate-700 dark:text-slate-300">
                  Q {currentQIndex + 1}/{quizQuestions.length}
                </div>
                
                <div className="flex items-center gap-6">
                  {streak >= 3 && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-bold text-sm bg-orange-100 dark:bg-orange-400/20 px-2 py-1 rounded-md">
                      <Zap size={14} fill="currentColor" /> {streak} Streak! (1.5x)
                    </motion.div>
                  )}
                  <div className="flex items-center gap-2 font-bold text-[#FF9933] text-xl">
                    <AnimatedNumber value={score} />
                  </div>
                  {/* Timer Circular Indicator */}
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle cx="20" cy="20" r="16" fill="none" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="4" />
                      <circle cx="20" cy="20" r="16" fill="none" 
                        stroke={timeLeft <= 10 ? '#ef4444' : timeLeft <= 20 ? '#f59e0b' : '#10b981'} strokeWidth="4" 
                        strokeDasharray={100} strokeDashoffset={100 - (timeLeft/30)*100} 
                        className="transition-all duration-1000 linear" />
                    </svg>
                    <span className={`text-xs font-mono font-bold ${timeLeft <= 10 ? 'text-red-500 dark:text-red-400 animate-pulse' : 'text-slate-700 dark:text-slate-200'}`}>{timeLeft}</span>
                  </div>
                </div>
              </div>

              {/* Question */}
              <h3 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed dark:text-white">
                {quizQuestions[currentQIndex].question}
              </h3>

              {/* Options */}
              <div className="space-y-3 flex-grow perspective-1000">
                {quizQuestions[currentQIndex].options.map((opt, idx) => {
                  const isCorrectAnswer = idx === quizQuestions[currentQIndex].correctAnswer;
                  const isSelected = selectedAnswer === idx;
                  
                  let frontClass = "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-800 dark:text-white";
                  let backClass = "";
                  let showBack = showExplanation && (isCorrectAnswer || isSelected);

                  let shakeClass = "";
                  
                  if (showExplanation) {
                    if (isCorrectAnswer) {
                      backClass = "bg-green-600 border-green-500 text-white font-bold pulse-ring-active";
                    } else if (isSelected) {
                      backClass = "bg-red-600 border-red-500 text-white font-bold";
                      shakeClass = "shake";
                    } else {
                      frontClass = "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 opacity-50";
                    }
                  }
                  
                  return (
                    <motion.div 
                      key={idx}
                      className={`relative w-full cursor-pointer h-auto min-h-[60px] touch-target ${shakeClass}`}
                      style={{ transformStyle: 'preserve-3d' }}
                      animate={{ rotateX: showBack ? 180 : 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => !showExplanation && handleAnswer(idx)}
                    >
                      {/* Front */}
                      <div className={`absolute inset-0 backface-hidden flex items-center p-4 rounded-xl border-2 transition-colors ${frontClass}`}>
                        <div className="w-6 h-6 rounded bg-slate-300 dark:bg-slate-800 flex items-center justify-center text-xs font-bold mr-4 flex-shrink-0 text-slate-700 dark:text-slate-300">
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="font-medium">{opt}</span>
                      </div>
                      
                      {/* Back (Revealed State) */}
                      <div 
                        className={`absolute inset-0 backface-hidden flex items-center p-4 rounded-xl border-2 shadow-lg ${backClass}`}
                        style={{ transform: 'rotateX(180deg)' }}
                      >
                         <div className="w-6 h-6 rounded bg-black/20 flex items-center justify-center text-xs font-bold mr-4 flex-shrink-0">
                          {isCorrectAnswer ? <Check size={16} className="text-white" /> : <X size={16} className="text-white" />}
                        </div>
                        <span className="font-medium">{opt}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Explanation Panel */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                    animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                    className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-1 h-full ${selectedAnswer === quizQuestions[currentQIndex].correctAnswer ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed pl-3 font-medium">
                      {quizQuestions[currentQIndex].explanation}
                    </p>
                    <button 
                      onClick={nextQuestion}
                      className="mt-4 w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 touch-target btn-shimmer"
                    >
                      {currentQIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ChevronRightIcon />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {isFinished && (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <div className="text-6xl font-black mb-4 flex items-baseline gap-2">
                <span className={getGrade().color}>{getGrade().grade}</span>
                <span className="text-2xl text-slate-500 dark:text-slate-500 font-normal">Grade</span>
              </div>
              <h3 className="text-3xl font-bold mb-2 dark:text-white">{getGrade().text}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 font-mono text-xl">Final Score: <span className="text-slate-800 dark:text-white font-bold">{score}</span></p>
              
              <div className="flex gap-4">
                <button 
                  onClick={startGame}
                  className="bg-[#000080] dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-colors flex items-center gap-2"
                >
                  <RotateCcw size={18} /> Try Again
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;
    
    const duration = 500;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setDisplayValue(Math.floor(start + (end - start) * progress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue}</span>;
};
