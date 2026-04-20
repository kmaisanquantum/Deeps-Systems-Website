import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  ShoppingBag,
  Store,
  CreditCard,
  Activity,
  Truck,
  ShieldCheck,
  Wallet,
  Monitor,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Radio
} from 'lucide-react';

const saasSystems = [
  {
    name: "PNG Property",
    desc: "a data aggregation and market intelligence tool designed specifically for the Papua New Guinea (PNG) real estate market",
    url: "https://property.dspng.tech",
    icon: <Building2 className="w-6 h-6" />,
    color: "text-blue-600"
  },
  {
    name: "Unity Mall",
    desc: "Unity Mall SME center. The digital marketplace for PNG's finest local vendors and artisans.",
    url: "https://unity.dspng.tech",
    icon: <ShoppingBag className="w-6 h-6" />,
    color: "text-emerald-600"
  },
  {
    name: "Garden City",
    desc: "Garden City SME. The digital marketplace for PNG's finest local vendors and artisans.",
    url: "https://gc.dspng.tech",
    icon: <Store className="w-6 h-6" />,
    color: "text-emerald-600"
  },
  {
    name: "Kingsmen Finance",
    desc: "Underwriting & Loan Management System. Port Moresby, PNG Est. 2026 · Digital Lending.",
    url: "https://kingsmen.dspng.tech",
    icon: <CreditCard className="w-6 h-6" />,
    color: "text-amber-600"
  },
  {
    name: "Helt",
    desc: "A remote medical triage portal for rural PNG.",
    url: "https://helt.dspng.tech",
    icon: <Activity className="w-6 h-6" />,
    color: "text-blue-600"
  },
  {
    name: "Maket",
    desc: "A lightweight logistics and market-price portal for PNG farmers.",
    url: "https://maket.dspng.tech",
    icon: <Truck className="w-6 h-6" />,
    color: "text-amber-600"
  },
  {
    name: "Trust",
    desc: "A verified e-commerce marketplace for Papua New Guinea.",
    url: "https://trust.dspng.tech",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "text-blue-600"
  },
  {
    name: "Pe",
    desc: "A micro-payment and credit-scoring app for PNG SMEs.",
    url: "https://pe.dspng.tech",
    icon: <Wallet className="w-6 h-6" />,
    color: "text-amber-600"
  },
  {
    name: "RBM",
    desc: "A reserve business monitoring tool to help SMEs and business in PNG.",
    url: "https://rbm.dspng.tech",
    icon: <Monitor className="w-6 h-6" />,
    color: "text-blue-600"
  }
];

const SaaSSlider: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Double the list for seamless infinite feeling scroll
  const extendedSystems = [...saasSystems, ...saasSystems];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let lastTimestamp = 0;
    const speed = 0.05; // Pixels per millisecond

    const scroll = (timestamp: number) => {
      if (!isPaused && scrollContainer) {
        if (lastTimestamp !== 0) {
          const deltaTime = timestamp - lastTimestamp;
          scrollContainer.scrollLeft += speed * deltaTime;

          // Infinite loop reset
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
          }
        }
        lastTimestamp = timestamp;
      } else {
        lastTimestamp = 0;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollAmount = 300; // Width of one card including margins
    const targetScroll = direction === 'left'
      ? scrollContainer.scrollLeft - scrollAmount
      : scrollContainer.scrollLeft + scrollAmount;

    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section
      className="py-12 bg-gray-950 overflow-hidden relative border-y border-emerald-500/20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Big Sparkling Fireworks Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
      </div>

      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-10">
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Compact Header for Medium Slider */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
           <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse border border-emerald-400/20">
                 <Radio className="w-4 h-4 text-white" />
                 <span className="text-white font-black text-xs uppercase tracking-tighter">Live Status Update</span>
              </div>
              <div className="h-8 w-px bg-white/10 hidden md:block"></div>
           </div>

           <div className="flex-grow text-center md:text-left">
              <h2 className="text-xl md:text-3xl font-montserrat font-black text-white leading-tight uppercase tracking-tight">
                 Active <span className="text-emerald-500 underline decoration-emerald-500/30 decoration-4 underline-offset-8">BITC</span> Ecosystem Deployments
              </h2>
           </div>

           <div className="flex items-center gap-2">
              <button
                onClick={() => handleManualScroll('left')}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/40 text-white transition-all active:scale-95 group backdrop-blur-md"
                aria-label="Scroll Backwards"
              >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleManualScroll('right')}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/40 text-white transition-all active:scale-95 group backdrop-blur-md"
                aria-label="Scroll Forwards"
              >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="relative flex overflow-x-auto no-scrollbar group cursor-grab active:cursor-grabbing pb-8 z-20"
      >
        <div className="flex whitespace-nowrap">
          {extendedSystems.map((system, idx) => (
            <a
              key={idx}
              href={system.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col w-72 md:w-80 mx-4 p-8 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 hover:border-emerald-500/50 transition-all duration-700 group/card active-click whitespace-normal shadow-2xl hover:bg-white/[0.08] hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-8">
                <div className={`p-5 rounded-2xl bg-white/5 ${system.color} group-hover/card:scale-110 group-hover/card:bg-emerald-500/10 transition-all duration-500 shadow-inner`}>
                  {system.icon}
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
                   <div className="p-2 rounded-xl bg-white/5 group-hover/card:bg-emerald-500/20 transition-colors border border-white/10">
                     <ExternalLink className="w-4 h-4 text-white/40 group-hover/card:text-white transition-colors" />
                   </div>
                </div>
              </div>

              <div className="mb-4">
                 <h4 className="text-white font-black text-lg mb-2 group-hover/card:text-emerald-400 transition-colors flex items-center gap-2">
                    {system.name}
                 </h4>
                 <div className="h-1 w-12 bg-emerald-500 rounded-full group-hover/card:w-full transition-all duration-700"></div>
              </div>

              <p className="text-slate-400 text-[11px] font-medium leading-relaxed mb-6 line-clamp-3">
                {system.desc}
              </p>

              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                 <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">PLATFORM ID: {system.name.toUpperCase().replace(' ', '_')}</span>
                 <div className="flex h-1.5 w-1.5 relative">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                 </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes firework {
          0% { transform: translate(var(--x), var(--initialY)); width: var(--initialSize); opacity: 1; }
          50% { width: var(--initialSize); opacity: 1; }
          100% { width: var(--finalSize); opacity: 0; }
        }

        .firework,
        .firework::before,
        .firework::after {
          --initialSize: 0.8vmin;
          --finalSize: 85vmin;
          --particleSize: 0.4vmin;
          --color1: #10b981;
          --color2: #3b82f6;
          --color3: #ffffff;
          --color4: #f59e0b;
          --color5: #ec4899;
          --color6: #8b5cf6;
          --y: -40vmin;
          --x: -50%;
          --initialY: 60vmin;
          content: "";
          animation: firework 2.5s infinite;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, var(--y));
          width: var(--initialSize);
          aspect-ratio: 1;
          background:
            radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 0% 0%,
            radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 100% 0%,
            radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 100% 100%,
            radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 0% 100%,

            radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 50% 0%,
            radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 100% 50%,
            radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 50% 100%,
            radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 0% 50%,

            radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 33% 33%,
            radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 66% 33%,
            radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 66% 66%,
            radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 33% 66%,

            radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 15% 15%,
            radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 85% 15%,
            radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 85% 85%,
            radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 15% 85%,

            radial-gradient(circle, #ffffff var(--particleSize), #0000 0) 50% 50%
            ;
          background-size: var(--initialSize) var(--initialSize);
          background-repeat: no-repeat;
          filter: drop-shadow(0 0 12px rgba(255,255,255,0.6));
        }

        .firework::before {
          --x: -50%;
          --y: -50%;
          --initialY: -50%;
          transform: translate(-50%, -50%) rotate(40deg) scale(1.6) rotateY(40deg);
          animation-delay: -0.1s;
        }

        .firework::after {
          --x: -50%;
          --y: -50%;
          --initialY: -50%;
          transform: translate(-50%, -50%) rotate(-40deg) scale(1.3) rotateY(-40deg);
          animation-delay: -0.2s;
        }

        .firework:nth-child(2) { --x: 35vmin; left: 30%; top: 60%; }
        .firework:nth-child(2), .firework:nth-child(2)::before, .firework:nth-child(2)::after {
          --color1: #3b82f6; --color2: #10b981; --color3: #f59e0b; --finalSize: 75vmin;
          animation-delay: -0.5s;
        }

        .firework:nth-child(3) { --x: -35vmin; --y: -55vmin; left: 70%; top: 40%; }
        .firework:nth-child(3), .firework:nth-child(3)::before, .firework:nth-child(3)::after {
          --color1: #f59e0b; --color2: #ffffff; --color3: #3b82f6; --finalSize: 70vmin;
          animation-delay: -1s;
        }

        .firework:nth-child(4) { --x: 15vmin; --y: -45vmin; left: 20%; top: 35%; }
        .firework:nth-child(4), .firework:nth-child(4)::before, .firework:nth-child(4)::after {
          --color1: #ec4899; --color2: #8b5cf6; --color3: #10b981; --finalSize: 95vmin;
          animation-delay: -1.5s;
        }

        .firework:nth-child(5) { --x: -15vmin; --y: -40vmin; left: 85%; top: 55%; }
        .firework:nth-child(5), .firework:nth-child(5)::before, .firework:nth-child(5)::after {
          --color1: #8b5cf6; --color2: #3b82f6; --color3: #ec4899; --finalSize: 90vmin;
          animation-delay: -2s;
        }

        .firework:nth-child(6) { --x: 5vmin; --y: -30vmin; left: 50%; top: 25%; }
        .firework:nth-child(6), .firework:nth-child(6)::before, .firework:nth-child(6)::after {
          --color1: #ffffff; --color2: #10b981; --color3: #3b82f6; --finalSize: 80vmin;
          animation-delay: -0.75s;
        }

        .firework:nth-child(7) { --x: -5vmin; --y: -25vmin; left: 10%; top: 70%; }
        .firework:nth-child(7), .firework:nth-child(7)::before, .firework:nth-child(7)::after {
          --color1: #10b981; --color2: #f59e0b; --color3: #ffffff; --finalSize: 85vmin;
          animation-delay: -1.25s;
        }
      `}} />
    </section>
  );
};

export default SaaSSlider;
