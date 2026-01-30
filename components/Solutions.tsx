import React, { useCallback } from 'react';
import { Truck, Sprout, Landmark, ChevronDown, BarChart3, ArrowUpRight, ArrowUp, Zap, Lock, Globe, Settings, Scale, ArrowRight } from 'lucide-react';

const Solutions: React.FC = () => {
  const solutions = [
    {
      sector: "Classical Optimization",
      id: "details-classical",
      icon: (className: string) => <Settings className={`${className} animate-icon-spin-slow`} />,
      items: [
        "Process Automation SaaS",
        "Lean BITC Architectures",
        "Strategic Resource Planning"
      ],
      buttonText: "Learn More: Business Logic",
      details: "The foundation of industrial excellence. Not every problem requires quantum interference—some need robust, reliable, and hyper-efficient classical frameworks. We provide lean, cloud-native business models that eliminate manual overhead and streamline PNG's core industries."
    },
    {
      sector: "SME & Finance",
      id: "details-financial",
      icon: (className: string) => <Landmark className={`${className} animate-icon-pulse`} />,
      items: [
        "Flexible 'SME-in-a-Box' SaaS",
        "Kina-based Subscription Model",
        "AI & Cyber Security Outcomes",
        "Multi-node Fraud Detection Logic",
        "Automated Credit-Risk Simulations"
      ],
      buttonText: "Learn More: SME SaaS",
      details: "Moving beyond legacy banking tech. We provide Papua New Guinean SMEs with world-class Software, AI, and Cyber outcomes through a flexible, Kina-based SaaS model designed to scale with local growth."
    },
    {
      sector: "Industrial Logistics",
      id: "details-logistics",
      icon: (className: string) => <Truck className={`${className} animate-icon-float`} />,
      items: [
        "Quantum-Inspired Route Optimization",
        "Predictive Maintenance SaaS",
        "BITC Fleet Management",
        "Terrain-Adaptive Fuel Efficiency",
        "Real-time Highland Corridor Tracking"
      ],
      buttonText: "Learn More: Logistics Tech",
      details: "Extreme efficiency for PNG's toughest terrains. Our Born-in-the-Cloud (BITC) platform uses quantum-inspired algorithms to minimize fuel costs and maximize asset life through predictive analytics."
    },
    {
      sector: "Agriculture & Supply",
      id: "details-agribusiness",
      icon: (className: string) => <Sprout className={`${className} animate-icon-sway`} />,
      items: [
        "Traceability-as-a-Service",
        "Born-in-the-Cloud (BITC) Sync",
        "Specialized Industrial Dashboards",
        "Multi-variate Yield Forecasting",
        "Last-mile Cold Storage Telemetry"
      ],
      buttonText: "Learn More: Traceability",
      details: "Bridging the gap between the highlands and global markets. Traceability-as-a-Service provides PNG producers with export-ready data, secured by BITC infrastructure that works anywhere."
    }
  ];

  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const cleanId = targetId.startsWith('#') ? targetId.slice(1) : targetId;
    const targetElement = document.getElementById(cleanId);
    
    if (targetElement) {
      const headerOffset = 90; 
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', `#${cleanId}`);
      
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
    }
  }, []);

  return (
    <section id="solutions" className="py-16 md:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="mb-12 md:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">
            <Zap className="w-3 h-3" />
            Outcome Driven
          </div>
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-4">
            Industrial-Grade <span className="quantum-text-gradient">Solutions</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base">
            Bridging robust classical frameworks with experimental quantum-inspired power to deliver BITC outcomes across PNG.
          </p>
        </div>

        {/* Overview Grid with Learn More Anchor Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-32">
          {solutions.map((sol, idx) => (
            <div key={idx} className="flex flex-col group reveal-on-scroll" style={{ transitionDelay: `${idx * 0.1}s` }}>
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="p-3 rounded-xl quantum-gradient text-white group-hover:scale-110 transition-all duration-500 shadow-lg shadow-teal-500/10">
                  {sol.icon("w-5 h-5 md:w-6 md:h-6")}
                </div>
                <div className="relative inline-block">
                  <h3 className="text-lg md:text-xl font-bold font-montserrat transition-all duration-500 group-hover:text-teal-400 group-hover:drop-shadow-[0_0_10px_rgba(20,184,166,0.5)] leading-tight">
                    {sol.sector}
                  </h3>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-400 transition-all duration-500 group-hover:w-full shadow-[0_0_8px_rgba(20,184,166,0.6)]"></span>
                </div>
              </div>
              
              <div className="glass rounded-2xl md:rounded-3xl flex-grow flex flex-col overflow-hidden border border-white/5 hover:border-teal-500/20 transition-all duration-500 shadow-lg">
                <ul className="divide-y divide-white/5 flex-grow">
                  {sol.items.map((item, i) => (
                    <li key={i} className="p-4 md:p-5 hover:bg-teal-500/5 hover:pl-6 transition-all duration-300 flex items-center gap-3 cursor-default group/li">
                      <div className="shrink-0 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-teal-400 group-hover/li:scale-150 transition-all"></div>
                      <span className="text-slate-300 font-medium text-xs md:text-sm group-hover/li:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="p-4 md:p-5 bg-white/2 border-t border-white/5">
                  <a 
                    href={`#${sol.id}`}
                    onClick={(e) => handleSmoothScroll(e, sol.id)}
                    className="w-full py-3 rounded-xl glass border border-white/10 text-teal-400 font-bold text-[10px] md:text-xs flex items-center justify-center gap-3 btn-secondary-cta active-click group/btn overflow-hidden"
                  >
                    <span>{sol.buttonText}</span>
                    <div className="flex flex-col h-4 overflow-hidden relative">
                       <ChevronDown className="w-3.5 h-3.5 text-teal-400 animate-arrow-down" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Deep Dive Detail Sections with Matching IDs */}
        <div className="space-y-16 md:space-y-32">
          {solutions.map((sol, idx) => (
            <div 
              key={`detail-${idx}`} 
              id={sol.id} 
              className="scroll-mt-32 glass rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-16 border border-white/5 relative overflow-hidden group shadow-2xl reveal-on-scroll outline-none focus:ring-0"
            >
              {/* Volumetric background glow */}
              <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-teal-500/5 rounded-full blur-[80px] md:blur-[100px] -z-10 group-target:bg-teal-500/10 transition-colors duration-1000"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
                <div>
                  <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                    <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full glass border border-white/10 text-[9px] md:text-[10px] font-bold text-teal-400 uppercase tracking-widest">
                      <ArrowUpRight className="w-3 h-3" />
                      BITC Outcome
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full glass border border-blue-500/20 text-[9px] md:text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                      <Scale className="w-3 h-3" />
                      Industrial Scale
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-montserrat font-bold mb-4 md:mb-6 leading-tight">
                    {sol.sector} <span className="text-slate-500">Excellence</span>
                  </h3>
                  <p className="text-slate-400 text-base md:text-xl leading-relaxed mb-8">
                    {sol.details}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
                    <div className="p-5 md:p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-teal-500/20 transition-all group/card">
                      <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-teal-400 mb-3 md:mb-4 group-hover/card:scale-110 transition-transform" />
                      <h4 className="font-bold text-white mb-1 md:mb-2 text-sm md:text-base">Measurable ROI</h4>
                      <p className="text-xs md:text-sm text-slate-500">Track performance metrics in Kina through our BITC dashboard.</p>
                    </div>
                    <div className="p-5 md:p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-blue-500/20 transition-all group/card">
                      <Lock className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mb-3 md:mb-4 group-hover/card:scale-110 transition-transform" />
                      <h4 className="font-bold text-white mb-1 md:mb-2 text-sm md:text-base">Cyber Resilience</h4>
                      <p className="text-xs md:text-sm text-slate-500">Outcomes secured by advanced cloud-native protection.</p>
                    </div>
                  </div>

                  {/* Navigation Footer for Deep Dive */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="#solutions" 
                      onClick={(e) => handleSmoothScroll(e, '#solutions')}
                      className="inline-flex items-center justify-center gap-2 text-teal-400 hover:text-white transition-colors text-xs md:text-sm font-bold active-click px-5 py-2.5 rounded-xl glass border border-white/5 btn-secondary-cta group/back"
                    >
                      <ArrowUp className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover/back:-translate-y-1" />
                      Back to Overview
                    </a>
                    <a 
                      href="#advanced-solutions" 
                      onClick={(e) => handleSmoothScroll(e, '#advanced-solutions')}
                      className="inline-flex items-center justify-center gap-2 text-white bg-teal-600 hover:bg-teal-500 transition-all text-xs md:text-sm font-bold btn-cta-pulse active-click px-6 py-3 rounded-xl shadow-lg shadow-teal-500/10 group/advanced"
                    >
                      View Advanced Suite
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover/advanced:translate-x-1" />
                    </a>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-video glass rounded-2xl md:rounded-3xl border border-white/10 flex items-center justify-center p-6 md:p-8 overflow-hidden">
                    <div className="absolute inset-0 quantum-gradient opacity-5"></div>
                    <div className="text-center z-10 flex flex-col items-center">
                       <div className="mb-4 md:mb-6 relative">
                          <div className={`absolute inset-0 bg-teal-500/10 rounded-full blur-2xl`}></div>
                          {sol.icon("w-16 h-16 md:w-24 md:h-24 text-teal-400 relative z-10")}
                       </div>
                       <div className="h-1.5 md:h-2 w-36 md:w-48 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-teal-400 animate-[loading_2.5s_ease-in-out_infinite]"></div>
                       </div>
                       <p className="text-[9px] md:text-xs text-slate-500 mt-4 md:mt-6 uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold">BITC Optimization Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading { 0% { width: 0%; transform: translateX(-100%); } 50% { width: 100%; transform: translateX(0%); } 100% { width: 0%; transform: translateX(100%); } }
      `}} />
    </section>
  );
};

export default Solutions;