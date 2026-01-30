import React from 'react';
import { Cloud, Zap, Smartphone, Combine } from 'lucide-react';

const Advantages: React.FC = () => {
  const advantages = [
    {
      icon: <Cloud className="w-8 h-8 text-teal-400" />,
      title: "Zero Infrastructure",
      description: "Eliminate the burden of physical servers and legacy maintenance. We run entirely in the cloud for maximum agility."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      title: "Elastic Scalability",
      description: "Scale your computational power up or down instantly based on demand. Pay only for what you actually use."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-purple-400" />,
      title: "Mobile-First Resilience",
      description: "Engineered specifically for the PNG market, ensuring critical data and tools are accessible even on low-bandwidth networks."
    },
    {
      icon: <Combine className="w-8 h-8 text-orange-400" />,
      title: "Hybrid Methodology",
      description: "The best of both worlds. We blend robust classical business optimization with experimental quantum-inspired power."
    }
  ];

  return (
    <section id="advantages" className="py-24 bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            The <span className="text-teal-400">BITC</span> Advantage
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Born-in-the-Cloud means we don't fix old tech—we build the future using a dual-track strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {advantages.map((adv, idx) => (
            <div 
              key={idx} 
              className="glass p-8 rounded-2xl border border-white/5 hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-2 group cursor-default hover:shadow-2xl hover:shadow-teal-500/5"
            >
              <div className="mb-6 inline-block p-4 rounded-xl bg-slate-900/50 group-hover:scale-110 group-hover:bg-slate-900 transition-all duration-300">
                {adv.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-teal-400 transition-colors duration-300">{adv.title}</h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                {adv.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;