import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Deeps Systems transformed our logistics overnight. Their minimalist approach eliminated our legacy bottlenecks, saving us 30% in operational costs within the first quarter.",
      author: "James Kila",
      position: "Operations Director",
      company: "PNG Logistics Corp"
    },
    {
      quote: "The digital re-architecting gave us an edge we didn't think was possible in our local market. Truly a world-class team working for PNG.",
      author: "Sarah Vagi",
      position: "Head of FinTech",
      company: "Kumul Finance"
    },
    {
      quote: "Reliability is critical for our agribusiness. Deeps Systems delivered a mobile-first solution that works perfectly in the remote highlands with zero lag.",
      author: "Peter Maru",
      position: "CEO",
      company: "Highland Harvest"
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/[0.02] dark:bg-rose-500/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-gray-900 dark:text-white">
            What Our <span className="quantum-text-gradient">Clients Say</span>
          </h2>
          <p className="text-gray-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
            Proven outcomes from PNG's leading institutions powered by Deeps Systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-[#0a0a0a] p-8 rounded-3xl border border-gray-100 dark:border-white/5 transition-all duration-500 hover:border-rose-500/20 hover:-translate-y-2 group flex flex-col justify-between shadow-sm hover:shadow-xl cursor-default"
            >
              <div>
                <div className="mb-6 p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 inline-block group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-6 h-6 text-rose-600 fill-rose-600/20" />
                </div>
                <p className="text-gray-600 dark:text-slate-300 italic mb-8 leading-relaxed text-lg font-medium">
                  "{t.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full quantum-gradient flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-rose-500/20">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-rose-600 transition-colors">
                    {t.author}
                  </h4>
                  <p className="text-xs text-gray-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                    {t.position} @ <span className="text-rose-600">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
