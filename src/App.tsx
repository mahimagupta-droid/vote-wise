import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroTimeline } from './components/HeroTimeline';
import { VotingSimulator } from './components/VotingSimulator';
import { CandidateSection } from './components/CandidateSection';
import { ECIChart } from './components/ECIChart';
import { QuizGame } from './components/QuizGame';
import { MythBusters } from './components/MythBusters';
import { RightsPanel } from './components/RightsPanel';
import { BadgeTray } from './components/BadgeTray'
import { useUserStore } from './store/useUserStore';
import { Loader2, ArrowUp } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center"
        >
          <Loader2 className="w-16 h-16 text-[#FF9933] animate-spin mb-4" />
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-[#FF9933]">Vote</span><span className="text-[#000080] dark:text-blue-400">Wise</span>
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const { state } = useUserStore();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }
      });
    });
  }, []);

  // Section Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('seen');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('section.reveal-section').forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Back to top listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 relative">
      <LoadingScreen />
      <Navbar />
      <BadgeTray />

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="reveal-section py-24 md:py-32 bg-slate-900 text-center relative overflow-hidden" role="region" aria-labelledby="hero-heading">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="container mx-auto px-4 relative z-10 hero-content"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block bg-white/10 px-4 py-1 rounded-full text-blue-300 text-sm font-bold tracking-widest uppercase mb-6 border border-white/20 shadow-lg backdrop-blur-sm"
            >
              Interactive Civic Education
            </motion.div>

            <h2 id="hero-heading" className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Democracy, <br className="md:hidden" /><span className="text-secondary text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Demystified.</span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Experience the Indian election process from start to finish through interactive simulations, games, and clear explanations.
            </motion.p>

            <motion.a
              href="#simulator"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 400, damping: 17 }}
              className="inline-block bg-secondary hover:bg-orange-600 text-white px-10 py-5 rounded-full font-bold text-xl shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] transition-all"
            >
              Start the Simulation
            </motion.a>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-30"
          ></motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-30"
          ></motion.div>
        </section>

        <HeroTimeline />
        <VotingSimulator />
        <CandidateSection />
        <ECIChart />
        <MythBusters />
        <RightsPanel />
        <QuizGame />
      </main>

      <footer className="bg-slate-950 text-slate-400 py-12 text-center border-t border-slate-800 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 relative z-10"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
            <span className="text-secondary">Vote</span>Wise
          </h2>
          <p className="mb-4 text-sm font-medium">Built for Prompt Wars · Hack2Skill 2025</p>
          <p className="text-xs text-slate-500 mb-8 max-w-md mx-auto border-t border-slate-800 pt-4">Data source: Election Commission of India (eci.gov.in). Educational purposes only.</p>
        </motion.div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 left-6 p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full shadow-lg z-40 group back-to-top ${showBackToTop ? 'visible' : ''}`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} className="arrow-icon transition-transform" />
      </button>
    </div>
  );
}

export default App;
