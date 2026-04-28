import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { toggleDarkMode, state } = useUserStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = ['timeline', 'simulator', 'candidates', 'eci', 'myths', 'rights', 'quiz'];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.4 });

    navLinks.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
          {navLinks.map((item, i) => (
            <motion.a 
              key={item}
              href={`#${item}`} 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, type: "spring" }}
              className={`hover:text-secondary transition-colors capitalize nav-link-underline ${activeSection === item ? 'active text-secondary' : ''}`}
            >
              {item === 'timeline' ? 'Journey' : item === 'eci' ? 'ECI' : item}
            </motion.a>
          ))}
          
          <div className="flex items-center gap-4 ml-4 border-l border-slate-700 pl-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-yellow-400 transition-colors overflow-hidden relative w-9 h-9 flex items-center justify-center touch-target"
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
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-yellow-400 transition-colors overflow-hidden relative w-9 h-9 flex items-center justify-center touch-target"
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
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-secondary transition-colors touch-target"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[72px] bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 overflow-hidden md:hidden z-50 shadow-xl"
            >
              <nav className="flex flex-col py-4">
                {navLinks.map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-6 py-3 font-medium capitalize border-l-4 transition-colors touch-target ${activeSection === item ? 'border-secondary text-secondary bg-slate-800/50' : 'border-transparent text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                  >
                    {item === 'timeline' ? 'Journey' : item === 'eci' ? 'ECI' : item}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

