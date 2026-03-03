import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Moon, Sun, Cloud, Rocket, ShoppingBag } from 'lucide-react';
import { servicesItems, advantageItems, storeItem } from './navbarData';

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
        <a href="#" onClick={(e) => handleSmoothScroll(e, '#')} className="flex items-center gap-2 group">
          <div className="p-1.5 md:p-2 rounded-lg quantum-gradient group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-teal-500/20">
            <Rocket className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="font-montserrat text-xl md:text-2xl font-bold tracking-tight text-white">
            Deeps <span className="text-teal-400 group-hover:text-teal-300 transition-colors">Systems</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center lg:gap-8 md:gap-4">
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

          <div className="relative">
            <button 
              onClick={() => toggleDropdown('services')}
              onMouseEnter={() => setActiveDropdown('services')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${activeDropdown === 'services' ? 'text-teal-400' : 'text-slate-300 hover:text-white'}`}
            >
              Outcome Solutions <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
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
          
          <a href={storeItem.href} onClick={(e) => handleSmoothScroll(e, storeItem.href)} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-teal-400 hover:text-white transition-all group">
            <ShoppingBag className="w-4 h-4" />
            <span>Online Store</span>
          </a>

          <div className="ml-2 pl-4 border-l border-white/10 flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 glass rounded-lg text-teal-400 hover:scale-110 transition-transform"
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <a href="#contact-form" onClick={(e) => handleSmoothScroll(e, '#contact-form')} className="px-5 py-2.5 rounded-full quantum-gradient text-white text-sm font-bold btn-cta-pulse active-click shadow-lg">
              Contact Us
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden">
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
            
            {/* Theme Toggle Mobile */}
            <div className="flex justify-center pb-4">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-6 py-3 glass rounded-2xl text-teal-400 font-bold text-sm uppercase tracking-widest"
              >
                {theme === 'dark' ? <><Moon className="w-5 h-5" /> Dark Mode</> : <><Sun className="w-5 h-5" /> Light Mode</>}
              </button>
            </div>

            {/* Online Store Link Mobile */}
            <a
              href={storeItem.href}
              onClick={(e) => handleSmoothScroll(e, storeItem.href)}
              className="w-full flex items-center gap-3 p-4 glass rounded-2xl text-teal-400 active:bg-white/5 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-bold text-sm uppercase tracking-widest">{storeItem.name}</span>
            </a>

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
