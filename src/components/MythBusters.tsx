import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { myths } from '../data/mockData';
import { useUserStore } from '../store/useUserStore';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

export const MythBusters: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const { setReadMyths } = useUserStore();

  const handleFlip = (id: number) => {
    if (!flippedCards.includes(id)) {
      const newFlipped = [...flippedCards, id];
      setFlippedCards(newFlipped);
      if (newFlipped.length === myths.length) {
        setReadMyths();
      }
    } else {
      setFlippedCards(flippedCards.filter(c => c !== id));
    }
  };

  return (
    <section id="myths" className="py-20 bg-slate-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-orange-600">Myth vs. Reality</h2>
          <p className="text-xl text-slate-600">Click the cards to reveal the truth behind common election misconceptions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto perspective-1000">
          {myths.map((myth) => (
            <motion.div
              key={myth.id}
              className="relative w-full h-80 cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: flippedCards.includes(myth.id) ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => handleFlip(myth.id)}
            >
              {/* Front side (Myth) */}
              <div 
                className="absolute w-full h-full backface-hidden bg-white rounded-3xl p-8 shadow-lg border-2 border-slate-100 flex flex-col items-center justify-center text-center hover:border-orange-300 transition-colors"
              >
                <div className="bg-orange-100 text-orange-600 p-3 rounded-full mb-6">
                  <HelpCircle size={32} />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{myth.category}</div>
                <h3 className="text-xl font-bold text-slate-800">"{myth.myth}"</h3>
                <p className="absolute bottom-6 text-sm font-semibold text-orange-500 animate-pulse">Click to Reveal</p>
              </div>

              {/* Back side (Reality) */}
              <div 
                className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-xl text-white flex flex-col items-center justify-center text-center"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="bg-white/20 p-2 rounded-full mb-4">
                  <CheckCircle2 size={24} className="text-green-300" />
                </div>
                <h4 className="text-lg font-bold mb-4 text-blue-200 uppercase tracking-wide">The Truth</h4>
                <p className="text-sm leading-relaxed">{myth.truth}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
