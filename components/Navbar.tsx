import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, ChevronDown, Rocket, Zap,
  Binary, Moon, Sun, Cloud, ShoppingBag
} from 'lucide-react';
import { servicesItems, advantageItems, storeItem } from './navbarData';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('light');
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') || href.startsWith('#') || href.includes('#')) {
      const [path, hash] = href.includes('#') ? href.split('#') : ['', href.replace('#', '')];
      const targetPath = path === '/' || path === '' ? '/' : path;
      const targetHash = hash.replace('#', '');

      if (location.pathname === targetPath) {
        e.preventDefault();
        const element = document.getElementById(targetHash);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        setIsMobileMenuOpen(false);
      } else if (path !== '') {
        // Let normal Link handling happen, but we might need to handle the hash after navigation
      }
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const toggleMobileSubmenu = (name: string) => {
    setMobileActiveSubmenu(mobileActiveSubmenu === name ? null : name);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${isScrolled ? 'py-3 md:py-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-6 md:py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group relative z-[60]"
          onClick={(e) => handleLinkClick(e, '/')}
        >
          <div className="p-2 rounded-xl quantum-gradient group-hover:rotate-[360deg] transition-transform duration-700 shadow-lg shadow-teal-500/20">
            <Binary className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-montserrat font-extrabold tracking-tight text-white group-hover:text-teal-400 transition-colors">
            Deeps <span className="text-teal-400 group-hover:text-white transition-colors">Systems</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">

          <div className="relative">
            <button 
              onMouseEnter={() => setActiveDropdown('advantages')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${activeDropdown === 'advantages' ? 'text-teal-400' : 'text-slate-300 hover:text-white'}`}
            >
              Advantages <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'advantages' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'advantages' && (
              <div 
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 glass bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <div className="space-y-1">
                  {advantageItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group/item"
                    >
                      <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 group-hover/item:scale-110 transition-all">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white mb-0.5 group-hover/item:text-teal-400 transition-colors">{item.name}</div>
                        <div className="text-[10px] text-slate-400 leading-tight">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onMouseEnter={() => setActiveDropdown('services')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${activeDropdown === 'services' ? 'text-teal-400' : 'text-slate-300 hover:text-white'}`}
            >
              Outcome Solutions <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'services' && (
              <div 
                onMouseLeave={() => setActiveDropdown(null)}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 glass bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <div className="space-y-1">
                  <div className="text-[9px] font-bold text-teal-400 uppercase tracking-widest px-2 mb-2">Outcome Solutions</div>
                  {servicesItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group/item"
                    >
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover/item:scale-110 transition-all">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover/item:text-teal-400 transition-colors">{item.name}</div>
                        <div className="text-[11px] text-slate-500 leading-tight">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link to="/insights" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all">Insights</Link>
          
          <Link
            to={storeItem.href}
            onClick={(e) => handleLinkClick(e, storeItem.href)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-teal-400 hover:text-white transition-all group"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Our Online Store</span>
          </Link>

          <div className="ml-2 pl-4 border-l border-white/10 flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 glass rounded-lg text-teal-400 hover:scale-110 transition-transform"
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full quantum-gradient text-white text-sm font-bold btn-cta-pulse active-click shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            className="text-white p-2 glass rounded-lg" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 pt-[72px] bg-black/98 backdrop-blur-3xl z-[45] flex flex-col animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex-grow overflow-y-auto px-6 py-8 space-y-4">
            
            <div className="flex justify-center pb-4">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-6 py-3 glass rounded-2xl text-teal-400 font-bold text-sm uppercase tracking-widest"
              >
                {theme === 'dark' ? <><Moon className="w-5 h-5" /> Dark Mode</> : <><Sun className="w-5 h-5" /> Light Mode</>}
              </button>
            </div>

            <Link
              to={storeItem.href}
              onClick={(e) => handleLinkClick(e, storeItem.href)}
              className="w-full flex items-center gap-3 p-4 glass rounded-2xl text-teal-400 active:bg-white/5 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-bold text-sm uppercase tracking-widest">{storeItem.name}</span>
            </Link>

            <div className="space-y-2">
              <button 
                onClick={() => toggleMobileSubmenu('advantages')}
                className="w-full flex items-center justify-between p-4 glass rounded-2xl text-white"
              >
                <div className="flex items-center gap-3">
                   <Cloud className="w-5 h-5 text-teal-400" />
                   <span className="font-bold text-sm uppercase tracking-widest">Advantages</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileActiveSubmenu === 'advantages' ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileActiveSubmenu === 'advantages' && (
                <div className="grid grid-cols-1 gap-2 pt-2 px-1">
                  {advantageItems.map(item => (
                    <Link
                      key={item.name} 
                      to={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="flex items-center gap-4 p-4 glass rounded-xl text-white"
                    >
                      <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">{item.icon}</div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-[10px] text-slate-500">{item.desc}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => toggleMobileSubmenu('services')}
                className="w-full flex items-center justify-between p-4 glass rounded-2xl text-white"
              >
                <div className="flex items-center gap-3">
                   <Rocket className="w-5 h-5 text-blue-400" />
                   <span className="font-bold text-sm uppercase tracking-widest">Outcome Solutions</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileActiveSubmenu === 'services' ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileActiveSubmenu === 'services' && (
                <div className="grid grid-cols-1 gap-2 pt-2 px-1">
                  {servicesItems.map(item => (
                    <Link
                      key={item.name} 
                      to={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="flex items-center gap-4 p-4 glass rounded-xl text-white"
                    >
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">{item.icon}</div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-[10px] text-slate-500">{item.desc}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/insights" className="block w-full p-4 glass rounded-2xl text-white font-bold text-sm uppercase tracking-widest">Insights</Link>

            <div className="pt-8">
              <Link
                to="/contact"
                className="block w-full text-center py-4 rounded-2xl quantum-gradient text-white font-bold text-lg shadow-xl shadow-teal-500/20"
              >
                Start Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
