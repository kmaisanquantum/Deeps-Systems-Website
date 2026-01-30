import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Cpu, ChevronDown, Landmark, Truck, Sprout, Cloud, Zap, Smartphone, Moon, Sun, Rocket } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(
    localStorage.getItem('theme') as 'dark' | 'light' || 'dark'
  );
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (theme === 'light') document.documentElement.classList.add('light');
    else document.documentElement.classList.remove('light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setMobileActiveSubmenu(null);
    }
  }, [isMobileMenuOpen]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const cleanId = targetId.replace('#', '');
    const targetElement = document.getElementById(cleanId);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', `#${cleanId}`);
      setActiveDropdown(null);
      setIsMobileMenuOpen(false);
    }
  };

  const servicesItems = [
    { name: 'Financial Institutions', icon: <Landmark className="w-5 h-5" />, href: '#details-financial', desc: 'SME-in-a-Box SaaS solutions.' },
    { name: 'Energy & Logistics', icon: <Truck className="w-5 h-5" />, href: '#details-logistics', desc: 'Quantum-inspired pathfinding.' },
    { name: 'Agribusiness', icon: <Sprout className="w-5 h-5" />, href: '#details-agribusiness', desc: 'Traceability-as-a-Service.' },
    { name: 'Advanced Suite', icon: <Rocket className="w-5 h-5" />, href: '#advanced-solutions', desc: 'Disruptive BITC SaaS outcomes.' },
  ];

  const advantageItems = [
    { name: 'Infrastructure', icon: <Cloud className="w-5 h-5" />, href: '#advantages', desc: 'Zero legacy physical burden.' },
    { name: 'Scalability', icon: <Zap className="w-5 h-5" />, href: '#advantages', desc: 'Elastic cloud power.' },
    { name: 'Resilience', icon: <Smartphone className="w-5 h-5" />, href: '#advantages', desc: 'Mobile-first design.' },
  ];

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const toggleMobileSubmenu = (name: string) => {
    setMobileActiveSubmenu(mobileActiveSubmenu === name ? null : name);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'py-3 glass bg-black/40 dark:bg-black/40 border-b border-white/5 shadow-xl' 
          : 'py-5 md:py-6 bg-transparent border-b-transparent'
      }`}
      ref={dropdownRef}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between relative z-10">
        <a href="#" className="flex items-center gap-2 group">
          <div className="p-1.5 md:p-2 rounded-lg quantum-gradient group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
            <Cpu className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="font-montserrat text-lg md:text-xl font-bold tracking-tight text-white transition-colors duration-500">
            Deeps <span className="text-teal-400">Systems</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <div className="mr-4 flex items-center">
            <button 
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full glass border border-white/10 dark:border-white/10 flex items-center p-1 transition-all duration-500 hover:border-teal-500/40 group active-click"
            >
              <div className={`relative w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${theme === 'dark' ? 'translate-x-7 bg-slate-800 text-teal-400' : 'translate-x-0 bg-white text-blue-600'}`}>
                {theme === 'dark' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
              </div>
            </button>
          </div>

          {/* Advantages Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('advantages')}
              onMouseEnter={() => setActiveDropdown('advantages')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${activeDropdown === 'advantages' ? 'text-teal-400' : 'text-slate-300 hover:text-white'}`}
            >
              Advantages <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'advantages' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'advantages' && (
              <div 
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-0 mt-2 w-72 glass bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <div className="space-y-3">
                  {advantageItems.map((item) => (
                    <a key={item.name} href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 group/item">
                      <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 group-hover/item:scale-110 transition-transform">{item.icon}</div>
                      <div>
                        <div className="text-xs font-bold text-white mb-0.5 group-hover/item:text-teal-400 transition-colors">{item.name}</div>
                        <div className="text-[10px] text-slate-400 leading-tight">{item.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('services')}
              onMouseEnter={() => setActiveDropdown('services')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${activeDropdown === 'services' ? 'text-teal-400' : 'text-slate-300 hover:text-white'}`}
            >
              Services <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'services' && (
              <div 
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 glass bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <div className="space-y-1">
                  <div className="text-[9px] font-bold text-teal-400 uppercase tracking-widest px-2 mb-2">Outcome Solutions</div>
                  {servicesItems.map((item) => (
                    <a key={item.name} href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group/item">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover/item:scale-110 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover/item:text-teal-400 transition-colors">{item.name}</div>
                        <div className="text-[11px] text-slate-500 leading-tight">{item.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href="#gap" onClick={(e) => handleSmoothScroll(e, '#gap')} className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all">The Gap</a>
          
          <div className="ml-2 pl-4 border-l border-white/10">
            <a href="#contact-form" onClick={(e) => handleSmoothScroll(e, '#contact-form')} className="px-5 py-2.5 rounded-full quantum-gradient text-white text-sm font-bold btn-cta-pulse active-click shadow-lg">
              Contact Us
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle & Theme */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 glass rounded-lg text-teal-400"
          >
            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button 
            className="text-white p-2 glass rounded-lg" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 pt-[72px] bg-black/98 backdrop-blur-3xl z-[45] flex flex-col animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex-grow overflow-y-auto px-6 py-8 space-y-4">
            
            {/* Advantages Mobile Submenu */}
            <div className="space-y-2">
              <button 
                onClick={() => toggleMobileSubmenu('advantages')}
                className="w-full flex items-center justify-between p-4 glass rounded-2xl text-white active:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-3">
                   <Cloud className="w-5 h-5 text-teal-400" />
                   <span className="font-bold text-sm uppercase tracking-widest">Advantages</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileActiveSubmenu === 'advantages' ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${mobileActiveSubmenu === 'advantages' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="grid grid-cols-1 gap-2 pt-2 px-1">
                  {advantageItems.map(item => (
                    <a 
                      key={item.name} 
                      href={item.href} 
                      onClick={(e) => handleSmoothScroll(e, item.href)} 
                      className="flex items-center gap-4 p-4 glass rounded-xl text-white active:bg-white/10 group animate-in slide-in-from-left-2 duration-300"
                    >
                      <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 group-active:scale-110 transition-transform">{item.icon}</div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-[10px] text-slate-500">{item.desc}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Mobile Submenu */}
            <div className="space-y-2">
              <button 
                onClick={() => toggleMobileSubmenu('services')}
                className="w-full flex items-center justify-between p-4 glass rounded-2xl text-white active:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-3">
                   <Rocket className="w-5 h-5 text-blue-400" />
                   <span className="font-bold text-sm uppercase tracking-widest">Outcome Solutions</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileActiveSubmenu === 'services' ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${mobileActiveSubmenu === 'services' ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="grid grid-cols-1 gap-2 pt-2 px-1">
                  {servicesItems.map(item => (
                    <a 
                      key={item.name} 
                      href={item.href} 
                      onClick={(e) => handleSmoothScroll(e, item.href)} 
                      className="flex items-center gap-4 p-4 glass rounded-xl text-white active:bg-white/10 group animate-in slide-in-from-left-2 duration-300"
                    >
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-active:scale-110 transition-transform">{item.icon}</div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-[10px] text-slate-500">{item.desc}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Mobile Links */}
            <a 
              href="#gap" 
              onClick={(e) => handleSmoothScroll(e, '#gap')} 
              className="block w-full p-4 glass rounded-2xl text-white font-bold text-sm uppercase tracking-widest active:bg-white/5"
            >
              The Gap
            </a>

            <div className="pt-8">
              <a 
                href="#contact-form" 
                onClick={(e) => handleSmoothScroll(e, '#contact-form')} 
                className="block w-full text-center py-4 rounded-2xl quantum-gradient text-white font-bold text-lg shadow-xl shadow-teal-500/20 active:scale-95 transition-transform"
              >
                Start Consultation
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;