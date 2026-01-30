import React, { useCallback } from 'react';
import { Phone, Mail, MapPin, Cpu } from 'lucide-react';

const Footer: React.FC = () => {
  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
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
    }
  }, []);

  return (
    <footer id="contact" className="bg-slate-900/50 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <a href="#" onClick={(e) => handleSmoothScroll(e, '#')} className="flex items-center gap-2 mb-6 group">
              <div className="p-2 rounded-lg quantum-gradient group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-teal-500/20">
                <Cpu className="text-white w-6 h-6" />
              </div>
              <span className="font-montserrat text-2xl font-bold tracking-tight">
                Deeps <span className="text-teal-400 group-hover:text-teal-300 transition-colors">Systems</span>
              </span>
            </a>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Leading PNG into the future with Quantum-Inspired Optimization and BITC solutions since 2014.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li>
                <a 
                  href="#advantages" 
                  onClick={(e) => handleSmoothScroll(e, '#advantages')}
                  className="hover:text-teal-400 hover:pl-2 transition-all duration-300 inline-block"
                >
                  BITC Advantage
                </a>
              </li>
              <li>
                <a 
                  href="#solutions" 
                  onClick={(e) => handleSmoothScroll(e, '#solutions')}
                  className="hover:text-teal-400 hover:pl-2 transition-all duration-300 inline-block"
                >
                  Sector Solutions
                </a>
              </li>
              <li>
                <a 
                  href="#gap" 
                  onClick={(e) => handleSmoothScroll(e, '#gap')}
                  className="hover:text-teal-400 hover:pl-2 transition-all duration-300 inline-block"
                >
                  The Gap
                </a>
              </li>
              <li>
                <a 
                  href="#partners" 
                  onClick={(e) => handleSmoothScroll(e, '#partners')}
                  className="hover:text-teal-400 hover:pl-2 transition-all duration-300 inline-block"
                >
                  Partners
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Contact Us</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="p-1 rounded-lg transition-all duration-500 group-hover:bg-teal-500/10">
                  <Phone className="w-5 h-5 text-teal-400 group-hover:scale-125 group-hover:text-teal-200 group-hover:drop-shadow-[0_0_10px_rgba(20,184,166,0.6)] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)" />
                </div>
                <a href="tel:+67579452732" className="hover:text-white transition-colors duration-200">+675 79452732</a>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="p-1 rounded-lg transition-all duration-500 group-hover:bg-teal-500/10">
                  <Mail className="w-5 h-5 text-teal-400 group-hover:scale-125 group-hover:text-teal-200 group-hover:drop-shadow-[0_0_10px_rgba(20,184,166,0.6)] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)" />
                </div>
                <a href="mailto:wokman@dspnq.tech" className="hover:text-white transition-colors duration-200">wokman@dspnq.tech</a>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="p-1 rounded-lg transition-all duration-500 group-hover:bg-teal-500/10">
                  <MapPin className="w-5 h-5 text-teal-400 group-hover:scale-125 group-hover:text-teal-200 group-hover:drop-shadow-[0_0_10px_rgba(20,184,166,0.6)] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)" />
                </div>
                <span className="group-hover:text-white transition-colors duration-200">Port Moresby, PNG</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Credentials</h4>
            <div className="glass p-6 rounded-2xl text-sm text-slate-400 border border-white/10 hover:border-teal-500/20 transition-all duration-500 cursor-default shadow-lg hover:shadow-teal-500/5">
              <p className="mb-2 flex justify-between"><span className="text-white font-medium uppercase text-[10px] tracking-wider">IPA Reg:</span> <span>6-165201</span></p>
              <p className="mb-2 flex justify-between"><span className="text-white font-medium uppercase text-[10px] tracking-wider">TIN (IRC):</span> <span>500286059</span></p>
              <p className="flex justify-between"><span className="text-white font-medium uppercase text-[10px] tracking-wider">Est:</span> <span>2014</span></p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Deeps Systems. All rights reserved.
          </p>
          <div className="flex gap-8 text-slate-500 text-sm">
            <a href="#" className="hover:text-white hover:scale-105 transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-white hover:scale-105 transition-all">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;