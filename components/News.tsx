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
      color: 'hover:text-emerald-600'
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
      color: 'hover:text-blue-700'
    }
  ];

  return (
    <section id="news" className="py-24 relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            Knowledge Center
          </div>
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-4 text-gray-900 dark:text-white leading-tight">
            Digital <span className="quantum-text-gradient">Insights</span>
          </h2>
          <p className="text-gray-500 dark:text-slate-400 font-medium">The latest developments in BITC technology and high-performance digital architectures.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <div 
              key={article.id} 
              className="bg-white dark:bg-[#0a0a0a] flex flex-col rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 hover:border-emerald-500/20 transition-all duration-500 group reveal-on-scroll shadow-sm hover:shadow-xl"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="h-48 bg-gray-50 dark:bg-slate-900/50 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 quantum-gradient opacity-[0.02] dark:opacity-5 group-hover:opacity-10 transition-opacity"></div>
                <Zap className="w-12 h-12 text-emerald-600 opacity-10 group-hover:opacity-30 transition-opacity" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-widest border border-gray-100 dark:border-emerald-500/20 shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-emerald-600 transition-colors leading-snug text-gray-900 dark:text-white">
                  {article.title}
                </h3>
                
                <p className="text-gray-500 dark:text-slate-400 text-sm mb-8 line-clamp-2 font-medium">
                  {article.summary}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50 dark:border-white/5">
                  <a href={article.url} className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-all group/read active-click px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover/read:translate-x-1 transition-transform" />
                  </a>
                  
                  <button 
                    onClick={() => setActiveShare(article)}
                    className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-400 dark:text-slate-400 hover:text-emerald-600 active-click transition-all group/share shadow-sm"
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-sm rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/10 shadow-2xl relative animate-in zoom-in slide-in-from-bottom-4 duration-300">
            <button 
              onClick={() => setActiveShare(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-50 dark:hover:bg-white/10 text-gray-400 transition-all active-click"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-montserrat font-bold mb-2 text-gray-900 dark:text-white">Share Insight</h3>
            <p className="text-gray-500 dark:text-slate-400 text-sm mb-8 font-medium">Spread knowledge with your network.</p>
            
            <div className="space-y-4">
              {shareLinks(activeShare).map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 transition-all group ${link.color} active-click shadow-sm`}
                >
                  <div className="p-2.5 rounded-xl bg-white dark:bg-white/10 group-hover:bg-white/20 transition-colors shadow-sm">
                    {link.icon}
                  </div>
                  <span className="font-bold text-gray-700 dark:text-white/90">{link.name}</span>
                </a>
              ))}
            </div>
            
            <button 
              onClick={() => {
                navigator.clipboard.writeText(activeShare.url);
                alert('Article link copied to clipboard!');
              }}
              className="w-full mt-6 py-4 rounded-xl bg-gray-900 dark:bg-emerald-600 text-white text-sm font-bold transition-all active-click shadow-lg"
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
