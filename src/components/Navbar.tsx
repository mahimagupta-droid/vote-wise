import React from 'react';
import { useUserStore } from '../store/useUserStore';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { badges, toggleDarkMode, state } = useUserStore();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-slate-900 dark:bg-slate-950 text-white p-4 sticky top-0 z-50 shadow-md border-b border-slate-800 transition-colors duration-300"
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-secondary">Vote</span>Wise
        </h1>
        <nav className="hidden md:flex gap-6 font-medium text-sm items-center">
          {['timeline', 'simulator', 'candidates', 'eci', 'quiz', 'myths'].map((item, i) => (
            <motion.a 
              key={item}
              href={`#${item}`} 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, type: "spring" }}
              className="hover:text-secondary transition-colors capitalize"
            >
              {item === 'timeline' ? 'Journey' : item === 'eci' ? 'ECI' : item}
            </motion.a>
          ))}
          
          <div className="flex items-center gap-4 ml-4 border-l border-slate-700 pl-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-yellow-400 transition-colors overflow-hidden relative w-9 h-9 flex items-center justify-center"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {state.isDarkMode ? (
                  <motion.div key="sun" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun size={18} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <div className="flex gap-2">
              <Badge title="First-Time Voter" earned={badges.voter} icon="🗳️" />
              <Badge title="Civics Scholar" earned={badges.scholar} icon="📚" />
              <Badge title="Myth Buster" earned={badges.mythbuster} icon="🔍" />
              <Badge title="Democracy Champion" earned={badges.champion} icon="⚖️" />
            </div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

const Badge: React.FC<{ title: string; earned: boolean; icon: string }> = ({ title, earned, icon }) => (
  <motion.div 
    animate={earned ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
    transition={{ duration: 0.5 }}
    className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${earned ? 'bg-secondary ring-2 ring-secondary/50 shadow-[0_0_10px_rgba(234,88,12,0.8)]' : 'bg-slate-800 opacity-40 grayscale'} transition-colors duration-500`}
    title={title}
  >
    {icon}
  </motion.div>
);
