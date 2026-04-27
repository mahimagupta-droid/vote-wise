import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroTimeline } from './components/HeroTimeline';
import { VotingSimulator } from './components/VotingSimulator';
import { CandidateSection } from './components/CandidateSection';
import { ECIChart } from './components/ECIChart';
import { QuizGame } from './components/QuizGame';
import { MythBusters } from './components/MythBusters';
import { RightsPanel } from './components/RightsPanel';

function App() {
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

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-slate-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              Democracy, <span className="text-secondary text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Demystified.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-light">
              Experience the Indian election process from start to finish through interactive simulations, games, and clear explanations.
            </p>
            <a href="#simulator" className="inline-block bg-secondary hover:bg-orange-600 text-white px-10 py-5 rounded-full font-bold text-xl shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] transition-all hover:-translate-y-1">
              Start the Simulation
            </a>
          </div>
        </section>

        <HeroTimeline />
        <VotingSimulator />
        <CandidateSection />
        <ECIChart />
        <MythBusters />
        <RightsPanel />
        <QuizGame />
      </main>

      <footer className="bg-slate-950 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
            <span className="text-secondary">Vote</span>Wise
          </h2>
          <p className="mb-4">Built for Prompt Wars | Hack2Skill</p>
          <p className="text-sm text-slate-500">Data source: Election Commission of India (Educational purposes only)</p>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-8 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            Back to Top
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
