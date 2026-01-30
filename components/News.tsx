import React, { useState } from 'react';
import { Share2, ArrowRight, Calendar, Clock, Mail, Twitter, Linkedin, X, Zap } from 'lucide-react';
import { articles, Article } from '../data/newsData';

const News: React.FC = () => {
  const [activeShare, setActiveShare] = useState<Article | null>(null);

  const shareLinks = (article: Article) => [
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=${encodeURIComponent(article.title)}&body=Check this out from Deeps Systems: ${article.url}`,
      color: 'hover:text-red-400'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(article.url)}&text=${encodeURIComponent(article.title)}`,
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(article.url)}`,
      color: 'hover:text-blue-600'
    }
  ];

  return (
    <section id="news" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            Quantum <span className="quantum-text-gradient">Insights</span>
          </h2>
          <p className="text-slate-400">The latest developments in BITC technology and PNG optimization.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <div 
              key={article.id} 
              className="glass flex flex-col rounded-3xl overflow-hidden border border-white/5 hover:border-teal-500/20 transition-all duration-500 group reveal-on-scroll"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="h-48 bg-slate-900/50 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 quantum-gradient opacity-5 group-hover:opacity-10 transition-opacity"></div>
                <Zap className="w-12 h-12 text-teal-400/20 group-hover:text-teal-400/40 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-[10px] font-bold uppercase tracking-widest border border-teal-500/20">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-teal-400 transition-colors leading-snug">
                  {article.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-8 line-clamp-2">
                  {article.summary}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                  <a href={article.url} className="flex items-center gap-2 text-sm font-bold text-white hover:text-teal-400 transition-all group/read active-click px-4 py-2 rounded-xl glass btn-secondary-cta border-none bg-transparent">
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover/read:translate-x-1 transition-transform" />
                  </a>
                  
                  <button 
                    onClick={() => setActiveShare(article)}
                    className="p-2.5 rounded-xl glass border border-white/5 text-slate-400 hover:text-teal-400 active-click transition-all group/share btn-secondary-cta"
                    aria-label="Share article"
                  >
                    <Share2 className="w-4 h-4 group-hover/share:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {activeShare && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass w-full max-sm rounded-3xl p-8 border border-white/10 shadow-2xl relative animate-in zoom-in slide-in-from-bottom-4 duration-300">
            <button 
              onClick={() => setActiveShare(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all active-click"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-montserrat font-bold mb-2">Share Article</h3>
            <p className="text-slate-400 text-sm mb-8">Spread the insight with your network.</p>
            
            <div className="space-y-4">
              {shareLinks(activeShare).map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-2xl glass border border-white/5 transition-all group ${link.color} active-click btn-secondary-cta`}
                >
                  <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                    {link.icon}
                  </div>
                  <span className="font-bold text-white/90">{link.name}</span>
                </a>
              ))}
            </div>
            
            <button 
              onClick={() => {
                navigator.clipboard.writeText(activeShare.url);
                alert('Article link copied to clipboard!');
              }}
              className="w-full mt-6 py-3 rounded-xl border border-white/5 hover:border-teal-500/30 text-slate-300 hover:text-teal-400 text-sm font-bold transition-all active-click btn-secondary-cta"
            >
              Copy Direct Link
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;