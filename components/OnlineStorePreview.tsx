import React from 'react';
import { ShoppingBag, ArrowRight, Zap, ShieldCheck, Cpu } from 'lucide-react';

const OnlineStorePreview: React.FC = () => {
  const features = [
    { icon: <Zap className="w-4 h-4" />, text: 'Instant SaaS Activation' },
    { icon: <Cpu className="w-4 h-4" />, text: 'Quantum Hardware Licenses' },
    { icon: <ShieldCheck className="w-4 h-4" />, text: 'Enterprise-Grade Support' },
  ];

  return (
    <section id="online-store" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[150px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="glass rounded-[3rem] p-8 md:p-16 lg:p-24 border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 quantum-gradient opacity-5"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                <ShoppingBag className="w-3.5 h-3.5" />
                Coming Soon
              </div>

              <h2 className="text-4xl md:text-6xl font-montserrat font-bold mb-8 leading-tight">
                Our <span className="text-green-400">Online Store</span>
              </h2>

              <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
                Access the Deeps Systems ecosystem of BITC optimization tools, SaaS licenses, and specialized hardware.
                Built to power the next generation of PNG entrepreneurs with digital-first solutions.
              </p>

              <div className="space-y-4 mb-12">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
                      {f.icon}
                    </div>
                    <span className="font-bold text-sm tracking-wide">{f.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="px-10 py-5 rounded-full quantum-gradient text-white font-bold text-lg shadow-xl shadow-green-500/20 hover:scale-105 transition-transform active:scale-95">
                  Get Early Access
                </button>
                <div className="flex items-center gap-4 text-slate-500 text-sm font-bold">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                  500+ Early Registrations
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-center">
              <div className="w-full max-w-md aspect-square glass rounded-[3rem] border border-white/10 flex items-center justify-center relative group/inner overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 bg-green-500/5 group-hover/inner:bg-green-500/10 transition-colors"></div>
                 <div className="text-center p-12">
                    <div className="w-32 h-32 bg-green-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 group-hover/inner:scale-110 group-hover/inner:rotate-12 transition-all duration-500">
                       <ShoppingBag className="w-14 h-14 text-green-400" />
                    </div>
                    <p className="text-3xl font-bold mb-4 tracking-tight">BITC Marketplace</p>
                    <p className="text-slate-500 text-lg leading-relaxed">
                       Bridging the gap to enterprise-grade tools for every PNG business.
                    </p>
                 </div>

                 {/* Decorative elements */}
                 <div className="absolute top-10 left-10 w-4 h-4 border border-green-400/20 rounded-full"></div>
                 <div className="absolute bottom-10 right-10 w-8 h-8 border border-white/10 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineStorePreview;
