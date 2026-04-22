import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  Rocket,
  Cloud,
  ArrowRight,
  Globe
} from 'lucide-react';
import { servicesItems, shopItems, advantageItems, ecosystemItems } from './navbarData';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileActiveSubmenu(null);
    setActiveDropdown(null);
  }, [location]);

  const handleMouseEnter = (menu: string) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleLinkClick = (e: React.MouseEvent | React.FocusEvent | React.KeyboardEvent, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        (element as HTMLElement).focus();
      }
    } else if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (location.pathname === path) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          (element as HTMLElement).focus();
        }
      }
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleMobileSubmenu = (menu: string) => {
    setMobileActiveSubmenu(mobileActiveSubmenu === menu ? null : menu);
  };

  const handleKeyDown = (e: React.KeyboardEvent, menu: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveDropdown(activeDropdown === menu ? null : menu);
    } else if (e.key === 'Escape') {
      setActiveDropdown(null);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={(e) => handleLinkClick(e, '/')}
          aria-label="Deeps Systems Home"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-emerald-500/20">
            <img src="/assets/logo.jpg" alt="" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl md:text-2xl font-montserrat font-extrabold tracking-tight text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
            Deeps <span className="text-emerald-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Systems</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2" role="menubar">

          <div className="relative group" onMouseEnter={() => handleMouseEnter('advantages')} onMouseLeave={handleMouseLeave}>
            <button 
              aria-expanded={activeDropdown === 'advantages'}
              aria-haspopup="true"
              onKeyDown={(e) => handleKeyDown(e, 'advantages')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${activeDropdown === 'advantages' ? 'text-emerald-600' : 'text-gray-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white'}`}
            >
              Advantages <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'advantages' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'advantages' && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[480px] z-50"
                role="menu"
              >
                <div className="bg-white dark:bg-[#0d0d0d] rounded-2xl border border-gray-100 dark:border-white/10 shadow-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-2 gap-4">
                    {advantageItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href} aria-current={location.pathname === item.href.split("#")[0] ? "page" : undefined}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5 border border-transparent transition-all group/item"
                        role="menuitem"
                      >
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 group-hover/item:scale-110 transition-all">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 dark:text-white mb-0.5 group-hover/item:text-emerald-600 transition-colors">{item.name}</div>
                          <div className="text-[10px] text-gray-600 dark:text-slate-300 leading-tight">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative group" onMouseEnter={() => handleMouseEnter('services')} onMouseLeave={handleMouseLeave}>
            <button 
              aria-expanded={activeDropdown === 'services'}
              aria-haspopup="true"
              onKeyDown={(e) => handleKeyDown(e, 'services')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${activeDropdown === 'services' ? 'text-emerald-600' : 'text-gray-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white'}`}
            >
              Outcome Solutions <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'services' && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[480px] z-50"
                role="menu"
              >
                <div className="bg-white dark:bg-[#0d0d0d] rounded-2xl border border-gray-100 dark:border-white/10 shadow-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-2 gap-4">
                    {servicesItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href} aria-current={location.pathname === item.href.split("#")[0] ? "page" : undefined}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5 border border-transparent transition-all group/item"
                        role="menuitem"
                      >
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 group-hover/item:scale-110 transition-all">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 dark:text-white group-hover/item:text-emerald-600 transition-colors">{item.name}</div>
                          <div className="text-[11px] text-gray-600 dark:text-slate-400 leading-tight">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative group" onMouseEnter={() => handleMouseEnter('ecosystem')} onMouseLeave={handleMouseLeave}>
            <button
              aria-expanded={activeDropdown === 'ecosystem'}
              aria-haspopup="true"
              onKeyDown={(e) => handleKeyDown(e, 'ecosystem')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${activeDropdown === 'ecosystem' ? 'text-emerald-600' : 'text-gray-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white'}`}
            >
              Ecosystem <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'ecosystem' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'ecosystem' && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[480px] z-50"
                role="menu"
              >
                <div className="bg-white dark:bg-[#0d0d0d] rounded-2xl border border-gray-100 dark:border-white/10 shadow-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-2 gap-4">
                    {ecosystemItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5 border border-transparent transition-all group/item"
                        role="menuitem"
                      >
                        <div className="p-2 rounded-lg bg-emerald-500/10 group-hover/item:scale-110 transition-all">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 dark:text-white group-hover/item:text-emerald-600 transition-colors">{item.name}</div>
                          <div className="text-[11px] text-gray-600 dark:text-slate-400 leading-tight">{item.desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Shop Dropdown */}
          <div className="relative group" onMouseEnter={() => handleMouseEnter('shop')} onMouseLeave={handleMouseLeave}>
            <button
              aria-expanded={activeDropdown === 'shop'}
              aria-haspopup="true"
              onKeyDown={(e) => handleKeyDown(e, 'shop')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${activeDropdown === 'shop' ? 'text-emerald-600' : 'text-gray-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white'}`}
            >
              Online Shop <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'shop' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'shop' && (
              <div
                className="absolute top-full right-0 pt-2 w-[380px] z-50"
                role="menu"
              >
                <div className="bg-white dark:bg-[#0d0d0d] rounded-2xl border border-gray-100 dark:border-white/10 shadow-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest px-2 mb-2">Shop & Services</div>
                    {shopItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href} aria-current={location.pathname === item.href.split("#")[0] ? "page" : undefined}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5 border border-transparent transition-all group/item"
                        role="menuitem"
                      >
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 group-hover/item:scale-110 transition-all">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 dark:text-white group-hover/item:text-emerald-600 transition-colors">{item.name}</div>
                          <div className="text-[11px] text-gray-600 dark:text-slate-400 leading-tight">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                    <div className="pt-2 mt-2 border-t border-gray-100 dark:border-white/5">
                      <Link
                        to="/shop"
                        className="flex items-center justify-between w-full p-3 rounded-xl bg-emerald-600 text-white font-bold text-xs group/all"
                        role="menuitem"
                      >
                        <span>Browse All Services</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/all:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/insights" aria-current={location.pathname === "/insights" ? "page" : undefined} className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white transition-all">Insights</Link>
          
          <div className="ml-2 pl-4 border-l border-gray-100 dark:border-white/10 flex items-center gap-4">
            <Link
              to="/contact" aria-current={location.pathname === "/contact" ? "page" : undefined}
              className="px-5 py-2.5 rounded-full quantum-gradient text-white text-sm font-bold relative btn-cta-pulse active-click shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="text-gray-900 dark:text-white p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 pt-[72px] bg-white dark:bg-[#0a0a0a] backdrop-blur-3xl z-[45] flex flex-col animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex-grow overflow-y-auto px-6 py-8 space-y-4">
            
            <div className="space-y-2">
              <button
                onClick={() => toggleMobileSubmenu('shop')}
                aria-expanded={mobileActiveSubmenu === 'shop'}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-emerald-600 border border-gray-100 dark:border-white/10"
              >
                <div className="flex items-center gap-3">
                   <ShoppingBag className="w-5 h-5 text-emerald-600" />
                   <span className="font-bold text-sm uppercase tracking-widest">Online Shop</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileActiveSubmenu === 'shop' ? 'rotate-180' : ''}`} />
              </button>

              {mobileActiveSubmenu === 'shop' && (
                <div className="grid grid-cols-1 gap-2 pt-2 px-1">
                  {shopItems.map(item => (
                    <Link
                      key={item.name}
                      to={item.href} aria-current={location.pathname === item.href.split("#")[0] ? "page" : undefined}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="flex items-center gap-4 p-4 bg-white dark:bg-white/2 rounded-xl text-gray-900 dark:text-white border border-gray-100 dark:border-white/10"
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">{item.icon}</div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-[10px] text-gray-600 dark:text-slate-400">{item.desc}</span>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="/shop"
                    className="flex items-center justify-center gap-2 p-4 bg-emerald-600 text-white rounded-xl font-bold text-sm uppercase tracking-widest"
                  >
                    Browse All Services <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => toggleMobileSubmenu('advantages')}
                aria-expanded={mobileActiveSubmenu === 'advantages'}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-900 dark:text-white border border-gray-100 dark:border-white/10"
              >
                <div className="flex items-center gap-3">
                   <Cloud className="w-5 h-5 text-emerald-600" />
                   <span className="font-bold text-sm uppercase tracking-widest">Advantages</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileActiveSubmenu === 'advantages' ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileActiveSubmenu === 'advantages' && (
                <div className="grid grid-cols-1 gap-2 pt-2 px-1">
                  {advantageItems.map(item => (
                    <Link
                      key={item.name} 
                      to={item.href} aria-current={location.pathname === item.href.split("#")[0] ? "page" : undefined}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="flex items-center gap-4 p-4 bg-white dark:bg-white/2 rounded-xl text-gray-900 dark:text-white border border-gray-100 dark:border-white/10"
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">{item.icon}</div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-[10px] text-gray-600 dark:text-slate-400">{item.desc}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => toggleMobileSubmenu('services')}
                aria-expanded={mobileActiveSubmenu === 'services'}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-900 dark:text-white border border-gray-100 dark:border-white/10"
              >
                <div className="flex items-center gap-3">
                   <Rocket className="w-5 h-5 text-emerald-600" />
                   <span className="font-bold text-sm uppercase tracking-widest">Outcome Solutions</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileActiveSubmenu === 'services' ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileActiveSubmenu === 'services' && (
                <div className="grid grid-cols-1 gap-2 pt-2 px-1">
                  {servicesItems.map(item => (
                    <Link
                      key={item.name} 
                      to={item.href} aria-current={location.pathname === item.href.split("#")[0] ? "page" : undefined}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="flex items-center gap-4 p-4 bg-white dark:bg-white/2 rounded-xl text-gray-900 dark:text-white border border-gray-100 dark:border-white/10"
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">{item.icon}</div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-[10px] text-gray-600 dark:text-slate-400">{item.desc}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={() => toggleMobileSubmenu('ecosystem')}
                aria-expanded={mobileActiveSubmenu === 'ecosystem'}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-900 dark:text-white border border-gray-100 dark:border-white/10"
              >
                <div className="flex items-center gap-3">
                   <Globe className="w-5 h-5 text-emerald-600" />
                   <span className="font-bold text-sm uppercase tracking-widest">Ecosystem</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileActiveSubmenu === 'ecosystem' ? 'rotate-180' : ''}`} />
              </button>

              {mobileActiveSubmenu === 'ecosystem' && (
                <div className="grid grid-cols-1 gap-2 pt-2 px-1">
                  {ecosystemItems.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white dark:bg-white/2 rounded-xl text-gray-900 dark:text-white border border-gray-100 dark:border-white/10"
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/10">{item.icon}</div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-[10px] text-gray-600 dark:text-slate-400">{item.desc}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <Link to="/insights" aria-current={location.pathname === "/insights" ? "page" : undefined} className="block w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-900 dark:text-white font-bold text-sm uppercase tracking-widest border border-gray-100 dark:border-white/10">Insights</Link>

            <div className="pt-8">
              <Link
                to="/contact" aria-current={location.pathname === "/contact" ? "page" : undefined}
                className="block w-full text-center py-4 rounded-2xl quantum-gradient text-white font-bold text-lg shadow-xl shadow-emerald-500/20"
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
