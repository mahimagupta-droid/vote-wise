import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '../data/mockData';
import { useUserStore } from '../store/useUserStore';
import { Timer, Award, AlertTriangle, Play } from 'lucide-react';

export const QuizGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  
  const { setQuizScore } = useUserStore();

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
    setTimeLeft(30);
    setShowExplanation(false);
    setIsFinished(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === quizQuestions[currentQIndex].correctAnswer) {
      setScore(s => s + 20); // 5 questions, 20 points each = 100 max
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
      setIsFinished(true);
      setQuizScore(score); // Save to store
    }
  };

  return (
    <section id="quiz" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent"></div>
      
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Civic Scholar Quiz</h2>
          <p className="text-xl text-slate-400">Test your knowledge of the Indian election process.</p>
        </div>

        <div className="bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden min-h-[500px] flex flex-col relative">
          
          {!isPlaying && !isFinished && (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
              <Award size={80} className="text-yellow-400 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Ready to test your knowledge?</h3>
              <p className="text-slate-400 mb-8 max-w-md">
                Answer 5 questions. You have 30 seconds for each. Score 80 or above to earn the Civics Scholar badge!
              </p>
              <button 
                onClick={startGame}
                className="bg-secondary hover:bg-orange-500 text-white px-10 py-4 rounded-full font-bold text-xl transition-all shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] flex items-center gap-3"
              >
                <Play fill="currentColor" /> Start Quiz
              </button>
            </div>
          )}

          {isPlaying && !isFinished && (
            <div className="flex-grow flex flex-col p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                <div className="flex items-center gap-2 text-slate-400 font-bold">
                  <span>Question {currentQIndex + 1} of {quizQuestions.length}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 font-bold text-yellow-400">
                    <Award size={20} /> {score} pts
                  </div>
                  <div className={`flex items-center gap-2 font-mono text-xl ${timeLeft < 10 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}>
                    <Timer size={20} /> 00:{timeLeft.toString().padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Question */}
              <h3 className="text-2xl font-bold mb-8 leading-relaxed">
                {quizQuestions[currentQIndex].question}
              </h3>

              {/* Options */}
              <div className="space-y-4 flex-grow">
                {quizQuestions[currentQIndex].options.map((opt, idx) => {
                  let btnClass = "bg-slate-700 border-slate-600 hover:bg-slate-600 text-white";
                  if (showExplanation) {
                    if (idx === quizQuestions[currentQIndex].correctAnswer) {
                      btnClass = "bg-green-600 border-green-500 text-white";
                    } else if (idx === selectedAnswer) {
                      btnClass = "bg-red-600 border-red-500 text-white";
                    } else {
                      btnClass = "bg-slate-800 border-slate-700 opacity-50";
                    }
                  }
                  
                  return (
                    <button
                      key={idx}
                      disabled={showExplanation}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${btnClass}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Panel */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-slate-700 p-6 rounded-xl border border-slate-600"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="text-yellow-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-2">Did you know?</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {quizQuestions[currentQIndex].explanation}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={nextQuestion}
                      className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-colors"
                    >
                      {currentQIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {isFinished && (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <div className="relative mb-8">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="#1e293b" strokeWidth="12" />
                  <circle 
                    cx="80" cy="80" r="70" fill="transparent" 
                    stroke={score >= 80 ? '#16a34a' : '#ea580c'} 
                    strokeWidth="12" 
                    strokeDasharray={440} 
                    strokeDashoffset={440 - (440 * score) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
                  {score}%
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-4">
                {score >= 80 ? 'Exceptional Work!' : 'Good Effort!'}
              </h3>
              <p className="text-slate-400 mb-8 max-w-md">
                {score >= 80 
                  ? "You have a deep understanding of the electoral process. You've earned the Civics Scholar badge!"
                  : "Review the explainer sections above to improve your knowledge."}
              </p>
              
              <button 
                onClick={startGame}
                className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-full font-bold transition-colors"
              >
                Play Again
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
