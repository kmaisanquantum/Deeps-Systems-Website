import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Deeps Systems transformed our logistics overnight. Their BITC approach eliminated our legacy bottlenecks, saving us 30% in operational costs within the first quarter.",
      author: "James Kila",
      position: "Operations Director",
      company: "PNG Logistics Corp"
    },
    {
      quote: "The quantum-inspired portfolio rebalancing gave us an edge we didn't think was possible in our local market. Truly a world-class team working for PNG.",
      author: "Sarah Vagi",
      position: "Head of FinTech",
      company: "Kumul Finance"
    },
    {
      quote: "Traceability is critical for our agribusiness. Deeps Systems delivered a mobile-first solution that works perfectly in the remote highlands with zero lag.",
      author: "Peter Maru",
      position: "CEO",
      company: "Highland Harvest"
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-slate-900/10">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            What Our <span className="quantum-text-gradient">Clients Say</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Real outcomes from PNG's leading institutions powered by Deeps Systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="glass p-8 rounded-3xl border border-white/5 transition-all duration-500 hover:border-teal-500/40 hover:-translate-y-2 group flex flex-col justify-between shadow-xl hover:shadow-[0_22px_40px_-15px_rgba(20,184,166,0.2)] cursor-default"
            >
              <div>
                <div className="mb-6 p-3 rounded-xl bg-teal-500/10 inline-block group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-6 h-6 text-teal-400 fill-teal-400/20" />
                </div>
                <p className="text-slate-300 italic mb-8 leading-relaxed text-lg">
                  "{t.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full quantum-gradient flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/20">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-teal-400 transition-colors">
                    {t.author}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                    {t.position} @ <span className="text-teal-400/80">{t.company}</span>
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