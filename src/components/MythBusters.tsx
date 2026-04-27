import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { myths } from '../data/mockData';
import { useUserStore } from '../store/useUserStore';
import { XCircle, CheckCircle2, Hand } from 'lucide-react';

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
    <section id="myths" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-white">Myth Busters</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Click the cards to reveal the truth behind common election misconceptions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto perspective-1000">
          {myths.map((myth) => {
            const isFlipped = flippedCards.includes(myth.id);
            
            return (
              <motion.div
                key={myth.id}
                className="relative w-full h-64 cursor-pointer group"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateX: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                onClick={() => handleFlip(myth.id)}
              >
                {/* Front side (Myth) */}
                <div 
                  className="absolute inset-0 backface-hidden rounded-2xl p-8 shadow-md border-2 border-orange-200 dark:border-orange-900/50 flex flex-col items-center justify-center text-center transition-all group-hover:shadow-xl bg-gradient-to-br from-white to-orange-50 dark:from-slate-800 dark:to-orange-900/20"
                >
                  <div className="text-[#FF9933] dark:text-orange-500 mb-4">
                    <XCircle size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 px-4 leading-snug">"{myth.myth}"</h3>
                  
                  <div className="absolute bottom-4 flex items-center gap-2 text-sm font-bold text-[#FF9933] dark:text-orange-500 animate-pulse">
                    <Hand size={16} /> Click to reveal truth
                  </div>
                </div>

                {/* Back side (Reality) */}
                <div 
                  className="absolute inset-0 backface-hidden rounded-2xl p-8 shadow-xl border-2 border-green-200 dark:border-green-800/50 flex flex-col items-center justify-center text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/10"
                  style={{ transform: 'rotateX(180deg)' }}
                >
                  <div className="text-[#138808] dark:text-green-500 mb-4">
                    <CheckCircle2 size={48} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-sm font-bold mb-2 text-[#138808] dark:text-green-500 uppercase tracking-widest">The Truth</h4>
                  <p className="text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{myth.truth}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
