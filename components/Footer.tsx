import React from 'react';
import { Link } from 'react-router-dom';
import {
  Binary, Mail, MapPin,
  ShieldCheck, ArrowUpRight, ShoppingBag, Phone, MessageSquare
} from 'lucide-react';
import { storeItem } from './navbarData';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') || href.startsWith('#')) {
      const hash = href.includes('#') ? href.split('#')[1] : href.replace('#', '');
      const element = document.getElementById(hash);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const quickLinks = [
    { name: 'Advantages', href: '/advantage' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Insights', href: '/insights' },
    { name: storeItem.name, href: storeItem.href, icon: <ShoppingBag className="w-4 h-4" /> },
    { name: 'Partners', href: '/advantage#partners' },
  ];

  const contactInfo = [
    { icon: <Mail className="w-5 h-5 text-emerald-600" />, text: 'wokman@dspng.tech', href: 'mailto:wokman@dspng.tech' },
    { icon: <Phone className="w-5 h-5 text-emerald-600" />, text: '+675 83009881', href: 'tel:83009881' },
    { icon: <MessageSquare className="w-5 h-5 text-emerald-600" />, text: 'WhatsApp: +675 83009881', href: 'https://wa.me/67583009881' },
    { icon: <MapPin className="w-5 h-5 text-emerald-600" />, text: 'Port Moresby, PNG', href: '#' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-[#050505] border-t border-gray-100 dark:border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white shadow-lg">
                <img src="/assets/logo.jpg" alt="Deeps Systems Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-montserrat font-extrabold tracking-tight text-gray-900 dark:text-white">
                Deeps <span className="text-emerald-600">Systems</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-sm">
              Empowering PNG enterprises with high-performance digital architectures and minimalist cloud solutions since 2014.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    {link.icon && <span className="text-emerald-600/50 group-hover:text-emerald-600 transition-colors">{link.icon}</span>}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              {contactInfo.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="flex items-center gap-4 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/10 transition-colors shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Credentials */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Credentials</h4>
            <div className="bg-white dark:bg-white/2 p-6 rounded-2xl border border-gray-100 dark:border-white/5 space-y-4 shadow-sm">
              <div className="flex justify-between items-center text-xs tracking-widest uppercase font-bold">
                <span className="text-gray-600 dark:text-slate-400">IPA REG:</span>
                <span className="text-gray-900 dark:text-white">6-165201</span>
              </div>
              <div className="flex justify-between items-center text-xs tracking-widest uppercase font-bold">
                <span className="text-gray-600 dark:text-slate-400">TIN (IRC):</span>
                <span className="text-gray-900 dark:text-white">500286059</span>
              </div>
              <div className="flex justify-between items-center text-xs tracking-widest uppercase font-bold">
                <span className="text-gray-600 dark:text-slate-400">EST:</span>
                <span className="text-gray-900 dark:text-white">2014</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-10 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-600 dark:text-slate-400 text-xs text-center md:text-left">
            © {currentYear} Deeps Systems. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
