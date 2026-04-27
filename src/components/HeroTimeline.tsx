import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineSteps } from '../data/mockData';
import { ChevronDown, Calendar, Users, AlertCircle, Info } from 'lucide-react';

export const HeroTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <section id="timeline" className="py-20 bg-slate-50 relative overflow-hidden">
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
            Election Journey Timeline
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Trace the steps from the first announcement to the final oath-taking. Click on any stage to see detailed rules and responsibilities.
          </motion.p>
        </div>

        <div className="relative">
          {/* Desktop Line */}
          <div className="hidden md:block absolute top-24 left-0 w-full h-1 bg-slate-200 z-0"></div>
          
          <div className="flex flex-col md:flex-row gap-6 relative z-10 overflow-x-auto pb-8 snap-x pt-4 px-2 md:px-0">
            {timelineSteps.map((step, index) => {
              const isActive = activeStep === step.id;
              
              return (
                <motion.div 
                  key={step.id}
                  className="w-full md:w-64 flex-shrink-0 snap-center flex flex-col md:block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Mobile Line */}
                  {index > 0 && <div className="h-6 w-1 bg-slate-200 mx-auto md:hidden"></div>}
                  
                  <div 
                    onClick={() => setActiveStep(isActive ? null : step.id)}
                    className={`bg-white p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] border-2 relative
                      ${isActive ? `border-[${step.color.replace('bg-', '')}] shadow-[0_0_20px_rgba(0,0,0,0.15)] ring-4 ring-offset-2 ring-blue-100 scale-[1.02] z-20` : 'border-slate-100 shadow-lg hover:shadow-xl'}`}
                  >
                    <div className={`w-14 h-14 rounded-full ${step.color} text-white flex items-center justify-center font-bold text-xl mb-4 shadow-md mx-auto`}>
                      {index + 1}
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-bold mb-1 text-slate-800 leading-tight h-10 flex items-center justify-center">{step.title}</h3>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                        step.color.includes('blue') ? 'text-blue-600' :
                        step.color.includes('green') ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {step.actor}
                      </p>
                      <p className="text-slate-500 text-sm">{step.description}</p>
                    </div>
                    
                    <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-1 shadow transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
                      <ChevronDown size={16} className="text-slate-400" />
                    </div>
                  </div>

                  {/* Mobile Details Panel (Inline) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="md:hidden overflow-hidden"
                      >
                        <DetailsPanel step={step} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Desktop Details Panel (Below Timeline) */}
        <AnimatePresence>
          {activeStep && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="hidden md:block mt-8 max-w-4xl mx-auto overflow-hidden"
            >
              <DetailsPanel step={timelineSteps.find(s => s.id === activeStep)!} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const DetailsPanel: React.FC<{ step: any }> = ({ step }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
      <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
        <div className={`w-4 h-4 rounded-full ${step.color}`}></div>
        <h3 className="text-2xl font-bold text-slate-800">{step.title} <span className="text-slate-400 font-normal">| Detailed View</span></h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
              <Info size={16} /> What Happens
            </h4>
            <p className="text-slate-700 leading-relaxed font-medium">{step.details.what}</p>
          </div>
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
              <Users size={16} /> Responsible Actor
            </h4>
            <p className="text-slate-700 font-semibold">{step.details.who}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
              <Calendar size={16} /> Typical Duration
            </h4>
            <div className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-md font-mono text-sm">
              {step.details.duration}
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-bl-full -z-0"></div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-orange-600 uppercase tracking-wider mb-2 relative z-10">
              <AlertCircle size={16} /> Key Rule / Fact
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed relative z-10">{step.details.rule}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
