import React, { useState, useEffect, useRef } from 'react';
import { ecosystemItems } from './navbarData';

const EcosystemMiniSlider: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Double items array for seamless infinite auto-scrolling
  const extendedItems = [...ecosystemItems, ...ecosystemItems];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let lastTimestamp = 0;
    const speed = 0.04; // Pixels per millisecond

    const scroll = (timestamp: number) => {
      if (!isPaused && scrollContainer) {
        if (lastTimestamp !== 0) {
          const deltaTime = timestamp - lastTimestamp;
          scrollContainer.scrollLeft += speed * deltaTime;

          // Loop reset when reaching half width
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

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto no-scrollbar py-1"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="flex whitespace-nowrap gap-3">
        {extendedItems.map((item, idx) => (
          <div
            key={idx}
            className="inline-flex flex-col shrink-0 w-60 p-3.5 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 whitespace-normal select-none"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
                Online Soon
              </span>
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.name}</div>
            <div className="text-xs text-gray-600 dark:text-slate-400 leading-snug line-clamp-2">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EcosystemMiniSlider;
