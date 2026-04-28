import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBadgeStore, BADGE_DEFINITIONS, type BadgeId } from '../store/useBadgeStore';
import { Lock, Share2, X, Award } from 'lucide-react';

export const BadgeTray: React.FC = () => {
  const { unlockedBadges, lastUnlocked, clearLastUnlocked } = useBadgeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const badgeIds = Object.keys(BADGE_DEFINITIONS) as BadgeId[];
  const unlockedCount = badgeIds.filter(id => unlockedBadges[id]).length;

  useEffect(() => {
    if (lastUnlocked) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        clearLastUnlocked();
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowToast(false);
    }
  }, [lastUnlocked, clearLastUnlocked]);

  const handleShare = () => {
    const text = `I earned ${unlockedCount}/6 badges on VoteWise! 🗳️ #PromptWars #VoteWise`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <>
      <div className="sticky top-[72px] z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="text-orange-500" size={20} />
            <span className="font-bold text-slate-700 dark:text-slate-300 hidden sm:inline">My Badges</span>
          </div>
          
          <div 
            className="flex items-center gap-2 md:gap-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            {badgeIds.map(id => {
              const badge = BADGE_DEFINITIONS[id];
              const isUnlocked = unlockedBadges[id];
              const isNewlyUnlocked = lastUnlocked === id;
              
              return (
                <motion.div
                  key={id}
                  animate={isNewlyUnlocked ? { scale: [1, 1.2, 1] } : {}}
                  transition={isNewlyUnlocked ? { repeat: Infinity, duration: 1.5 } : {}}
                  className={`text-2xl transition-all duration-300 ${isUnlocked ? 'opacity-100 grayscale-0' : 'opacity-40 grayscale'}`}
                  title={badge.name}
                >
                  {badge.icon}
                </motion.div>
              );
            })}
            <div className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-2">
              {unlockedCount}/6
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showToast && lastUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-xl p-4 flex items-center gap-4"
          >
            <div className="text-4xl">{BADGE_DEFINITIONS[lastUnlocked].icon}</div>
            <div>
              <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">Badge Unlocked!</p>
              <h4 className="font-bold text-slate-800 dark:text-white text-lg">{BADGE_DEFINITIONS[lastUnlocked].name}</h4>
            </div>
            <button onClick={() => setShowToast(false)} className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Award className="text-orange-500" />
                    Badge Collection
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{unlockedCount} of 6 badges earned</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500 dark:text-slate-400"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {badgeIds.map(id => {
                    const badge = BADGE_DEFINITIONS[id];
                    const isUnlocked = unlockedBadges[id];

                    return (
                      <div 
                        key={id} 
                        className={`p-5 rounded-2xl border-2 transition-all flex gap-4 ${isUnlocked ? 'border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-900/10' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30'}`}
                      >
                        <div className={`text-5xl flex-shrink-0 flex items-center justify-center w-16 h-16 ${isUnlocked ? '' : 'opacity-30 grayscale'}`}>
                          {badge.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-bold text-lg ${isUnlocked ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-500'}`}>
                              {badge.name}
                            </h3>
                            {!isUnlocked && <Lock size={14} className="text-slate-400" />}
                          </div>
                          <p className={`text-sm mb-2 ${isUnlocked ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400 dark:text-slate-600'}`}>
                            {badge.description}
                          </p>
                          <div className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md inline-block ${isUnlocked ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`}>
                            {isUnlocked ? 'Unlocked' : badge.condition}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition-colors shadow-md hover:shadow-lg"
                >
                  <Share2 size={18} />
                  Share your progress
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
