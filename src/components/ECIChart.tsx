import React, { useState } from 'react';
import { Shield, Users, Building, Flag, AlertCircle } from 'lucide-react';

export const ECIChart: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const orgData = [
    { id: 1, title: 'Election Commission of India', role: 'Apex Body', icon: <Shield />, desc: 'Constitutional body responsible for administering elections in India.' },
    { id: 2, title: 'Chief Electoral Officer (CEO)', role: 'State Level', icon: <Building />, desc: 'Supervises election work in the state/Union Territory.' },
    { id: 3, title: 'District Election Officer (DEO)', role: 'District Level', icon: <Flag />, desc: 'Coordinates all election work in the district (usually the District Magistrate).' },
    { id: 4, title: 'Returning Officer (RO)', role: 'Constituency Level', icon: <Users />, desc: 'Conducts the election in a parliamentary or assembly constituency.' },
    { id: 5, title: 'Presiding Officer', role: 'Polling Booth Level', icon: <AlertCircle />, desc: 'In charge of a specific polling station, ensures free and fair voting.' }
  ];

  return (
    <section id="eci" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-blue-900">The Election Machinery</h2>
          <p className="text-xl text-slate-600">Discover the enormous organizational structure that makes Indian elections possible.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Org Chart Visual */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            {orgData.map((node, i) => (
              <React.Fragment key={node.id}>
                <div 
                  onClick={() => setActiveNode(node.id)}
                  className={`w-full max-w-sm p-4 rounded-xl border-2 cursor-pointer transition-all ${activeNode === node.id ? 'bg-blue-50 border-blue-500 shadow-md transform scale-105' : 'bg-white border-slate-200 hover:border-blue-300'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${activeNode === node.id ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {node.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{node.title}</h4>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{node.role}</p>
                    </div>
                  </div>
                </div>
                {i < orgData.length - 1 && (
                  <div className="w-1 h-8 bg-slate-300"></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Details Panel */}
          <div className="w-full md:w-1/2 sticky top-24">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 min-h-[400px]">
              {activeNode ? (
                <div className="animate-fade-in">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    {orgData.find(n => n.id === activeNode)?.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    {orgData.find(n => n.id === activeNode)?.title}
                  </h3>
                  <div className="inline-block bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-bold mb-6">
                    {orgData.find(n => n.id === activeNode)?.role}
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {orgData.find(n => n.id === activeNode)?.desc}
                  </p>
                  
                  {activeNode === 1 && (
                    <div className="mt-8 bg-orange-50 p-4 rounded-xl border border-orange-200 text-orange-800">
                      <strong>Did you know?</strong> The ECI is an independent body that operates without government interference to ensure fair elections.
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                  <Shield size={64} className="mb-4 opacity-20" />
                  <p className="text-xl">Click on any role in the chart<br/>to learn more about their responsibilities.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
