import React from 'react';
import { useUserStore } from '../store/useUserStore';

export const Navbar: React.FC = () => {
  const { badges } = useUserStore();

  return (
    <header className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-secondary">Vote</span>Wise
        </h1>
        <nav className="hidden md:flex gap-6 font-medium text-sm items-center">
          <a href="#journey" className="hover:text-secondary transition-colors">Journey</a>
          <a href="#simulator" className="hover:text-secondary transition-colors">Simulator</a>
          <a href="#candidates" className="hover:text-secondary transition-colors">Candidates</a>
          <a href="#eci" className="hover:text-secondary transition-colors">ECI</a>
          <a href="#quiz" className="hover:text-secondary transition-colors">Quiz</a>
          <a href="#myths" className="hover:text-secondary transition-colors">Myths</a>
          
          <div className="flex gap-2 ml-4 border-l border-slate-700 pl-4">
            <Badge title="First-Time Voter" earned={badges.voter} icon="🗳️" />
            <Badge title="Civics Scholar" earned={badges.scholar} icon="📚" />
            <Badge title="Myth Buster" earned={badges.mythbuster} icon="🔍" />
            <Badge title="Democracy Champion" earned={badges.champion} icon="⚖️" />
          </div>
        </nav>
      </div>
    </header>
  );
};

const Badge: React.FC<{ title: string; earned: boolean; icon: string }> = ({ title, earned, icon }) => (
  <div 
    className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${earned ? 'bg-secondary ring-2 ring-secondary/50 shadow-[0_0_10px_rgba(234,88,12,0.8)]' : 'bg-slate-800 opacity-40 grayscale'} transition-all duration-500`}
    title={title}
  >
    {icon}
  </div>
);
