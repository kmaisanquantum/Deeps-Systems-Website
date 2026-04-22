import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollUpButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-24 w-14 h-14 rounded-full glass flex items-center justify-center text-emerald-600 dark:text-emerald-500 z-[60] shadow-2xl transition-all duration-500 hover:shadow-emerald-500/20 active-click group border border-emerald-500/30 ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <ChevronUp className="w-8 h-8 group-hover:-translate-y-1 transition-transform duration-300" />
    </button>
  );
};

export default ScrollUpButton;
