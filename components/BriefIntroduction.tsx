import React from 'react';
import { Landmark, Truck, Sprout, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BriefIntroduction: React.FC = () => {
  const sectors = [
    {
      name: 'Financial',
      icon: <Landmark className="w-8 h-8 text-green-400" />,
      desc: 'SME-in-a-Box SaaS outcomes for the modern economy.',
      color: 'green'
    },
    {
      name: 'Logistics',
      icon: <Truck className="w-8 h-8 text-amber-400" />,
      desc: 'Quantum-inspired pathfinding for complex supply chains.',
      color: 'amber'
    },
    {
      name: 'Agribusiness',
      icon: <Sprout className="w-8 h-8 text-purple-400" />,
      desc: 'Traceability-as-a-Service for global export readiness.',
      color: 'purple'
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-2 rounded-full glass border border-white/10 text-[10px] font-bold text-green-400 uppercase tracking-widest mb-8">
          The Deeps Mission
        </div>

        <h2 className="text-4xl md:text-6xl font-montserrat font-bold mb-10 leading-tight">
          PNG's <span className="quantum-text-gradient">BITC</span> Transformation Partner
        </h2>

        <p className="text-xl md:text-2xl text-slate-400 leading-relaxed mb-16 max-w-4xl mx-auto">
          Deeps Systems bridges the gap between classical business logic and quantum-inspired efficiency.
          We provide outcome-driven solutions that eliminate legacy physical burdens with zero-infrastructure cloud excellence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {sectors.map((sector) => (
            <div key={sector.name} className="p-8 glass rounded-[2rem] border border-white/5 hover:border-white/10 transition-all hover:-translate-y-2 group">
              <div className="mb-6 p-4 rounded-2xl bg-white/5 inline-block group-hover:scale-110 transition-transform">
                {sector.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{sector.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {sector.desc}
              </p>
            </div>
          ))}
        </div>

        <Link
          to="/solutions"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass border border-white/10 text-white font-bold hover:bg-white/5 transition-all group"
        >
          Explore All Solutions
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default BriefIntroduction;
