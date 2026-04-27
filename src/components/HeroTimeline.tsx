import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineSteps } from '../data/mockData';

export const HeroTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <section id="journey" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            The Great Indian Election Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            From the first announcement to the final oath-taking, explore the massive 
            machinery that powers the world's largest democracy.
          </motion.p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 relative z-10 overflow-x-auto pb-10 px-4 snap-x">
            {timelineSteps.map((step, index) => (
              <motion.div 
                key={step.id}
                className="w-full md:w-64 flex-shrink-0 snap-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  className={`glass-card p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-2 ${activeStep === step.id ? 'ring-4 ring-secondary/50 shadow-2xl' : 'hover:shadow-xl'}`}
                >
                  <div className={`w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center font-bold text-xl mb-4 shadow-lg mx-auto md:mx-0`}>
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800">{step.title}</h3>
                  <p className="text-sm text-slate-500 font-semibold mb-2">{step.actor}</p>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Details Modal / Expansion */}
        <AnimatePresence>
          {activeStep && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 max-w-3xl mx-auto overflow-hidden"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
                {timelineSteps.filter(s => s.id === activeStep).map(step => (
                  <div key={step.id}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-4 h-4 rounded-full ${step.color}`}></div>
                      <h3 className="text-2xl font-bold text-slate-800">{step.title} In-Depth</h3>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed">{step.details}</p>
                    <button 
                      onClick={() => setActiveStep(null)}
                      className="mt-6 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Close Details
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
