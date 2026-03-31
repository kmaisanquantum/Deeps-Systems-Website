import React from 'react';
import { Landmark, Truck, Sprout, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BriefIntroduction: React.FC = () => {
  const sectors = [
    {
      name: 'Financial',
      icon: <Landmark className="w-8 h-8 text-rose-600" />,
      desc: 'Minimalist SaaS outcomes for the modern Pacific economy.',
      color: 'rose'
    },
    {
      name: 'Logistics',
      icon: <Truck className="w-8 h-8 text-rose-600" />,
      desc: 'Precision-driven supply chain management and digital mapping.',
      color: 'rose'
    },
    {
      name: 'Agribusiness',
      icon: <Sprout className="w-8 h-8 text-rose-600" />,
      desc: 'Traceability-as-a-Service for global export readiness.',
      color: 'rose'
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0a0a0a] border-y border-gray-100 dark:border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/[0.02] dark:bg-rose-500/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-[10px] font-bold text-rose-600 uppercase tracking-widest mb-8 shadow-sm">
          The Deeps Mission
        </div>

        <h2 className="text-4xl md:text-6xl font-montserrat font-bold mb-10 leading-tight text-gray-900 dark:text-white">
          PNG's <span className="quantum-text-gradient">BITC</span> Transformation Partner
        </h2>

        <p className="text-xl md:text-2xl text-gray-500 dark:text-slate-400 leading-relaxed mb-16 max-w-4xl mx-auto font-medium">
          Deeps Systems bridges the gap between traditional operations and digital-first excellence.
          We provide high-impact solutions that eliminate physical burdens with zero-infrastructure cloud scalability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {sectors.map((sector) => (
            <div key={sector.name} className="p-8 bg-white dark:bg-white/2 rounded-[2rem] border border-gray-100 dark:border-white/5 hover:border-rose-500/20 transition-all hover:-translate-y-2 group shadow-sm hover:shadow-xl">
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 inline-block group-hover:scale-110 transition-transform">
                {sector.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{sector.name}</h3>
              <p className="text-sm text-gray-500 dark:text-slate-500 leading-relaxed">
                {sector.desc}
              </p>
            </div>
          ))}
        </div>

        <Link
          to="/solutions"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-transparent border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-all group shadow-sm"
        >
          Explore All Solutions
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-rose-600" />
        </Link>
      </div>
    </section>
  );
};

export default BriefIntroduction;
