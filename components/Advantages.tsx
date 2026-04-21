import React from 'react';
import { Cloud, Zap, Smartphone, Combine } from 'lucide-react';

const Advantages: React.FC = () => {
  const advantages = [
    {
      id: "adv-infra",
      icon: <Cloud className="w-8 h-8 text-emerald-600" />,
      title: "Zero Infrastructure",
      description: "Eliminate the burden of physical servers and legacy maintenance. We run entirely in the cloud for maximum agility and scalability."
    },
    {
      id: "adv-scale",
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Elastic Scalability",
      description: "Scale your computational power up or down instantly based on demand. High-performance architectures tailored for PNG's growth."
    },
    {
      id: "adv-resilience",
      icon: <Smartphone className="w-8 h-8 text-emerald-600" />,
      title: "Resilient Access",
      description: "Engineered specifically for the Pacific market, ensuring critical data and tools remain accessible on any network or device."
    },
    {
      id: "adv-precision",
      icon: <Combine className="w-8 h-8 text-amber-600" />,
      title: "Precision Methodology",
      description: "Minimalist, robust digital architectures that bridge the gap between traditional operations and future-ready excellence."
    }
  ];

  return (
    <section id="advantages" className="py-24 bg-gray-50/50 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            Performance Core
          </div>
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-4 text-gray-900 dark:text-white leading-tight">
            The <span className="text-emerald-600">BITC</span> Advantage
          </h2>
          <p className="text-gray-600 dark:text-slate-300 max-w-xl mx-auto font-medium">
            Born-in-the-Cloud means we don't just maintain tech—we architect high-performance outcomes for the modern economy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {advantages.map((adv, idx) => (
            <div 
              key={idx} 
              id={adv.id}
              className="scroll-mt-32 bg-white dark:bg-[#0a0a0a] p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-2 group cursor-default shadow-sm hover:shadow-xl outline-none"
            >
              <div className="mb-6 inline-block p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/50 group-hover:scale-110 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-all duration-300 shadow-inner">
                {adv.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-emerald-600 transition-colors duration-300 text-gray-900 dark:text-white leading-tight">{adv.title}</h3>
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-slate-300 transition-colors duration-300 text-sm font-medium">
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
