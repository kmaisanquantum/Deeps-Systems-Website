import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Linkedin,
  Facebook,
  MessageCircle,
  Twitter,
  Mail,
  CheckCircle2,
  BookOpen,
  Rocket,
  ShoppingBag,
  Loader2,
  Tag
} from 'lucide-react';
import Seo from '../components/Seo';
import { getApiUrl } from '../utils/api';
import { ArticleData, getCategoryLabel } from './InsightsPage';

const ArticlePage: React.FC = () => {
  const { category, slug } = useParams<{ category?: string; slug?: string }>();
  const activeSlug = slug || category;

  const [article, setArticle] = useState<ArticleData | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeSlug) return;

    const fetchArticle = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(getApiUrl(`/api/articles/${activeSlug}`));
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Insight article not found.');
          }
          throw new Error(`Server returned status ${res.status}`);
        }
        const data = await res.json();
        if (data && data.article) {
          setArticle(data.article);
          setRelatedArticles(Array.isArray(data.related) ? data.related : []);
        } else {
          throw new Error('Invalid article response structure.');
        }
      } catch (err: any) {
        console.error('Failed to load article:', err);
        setError(err.message || 'Failed to load article.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [activeSlug]);

  const fullUrl = typeof window !== 'undefined' ? window.location.href : `https://dspng.tech/insights/${article?.category}/${article?.slug}`;

  const shareLinks = article ? [
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4 text-blue-600" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4 text-blue-500" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4 text-emerald-500" />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + fullUrl)}`
    },
    {
      name: 'X (Twitter)',
      icon: <Twitter className="w-4 h-4 text-slate-800 dark:text-slate-200" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(article.title)}`
    },
    {
      name: 'Email',
      icon: <Mail className="w-4 h-4 text-emerald-600" />,
      url: `mailto:?subject=${encodeURIComponent(article.title)}&body=Check out this article from Deeps Systems: ${encodeURIComponent(fullUrl)}`
    }
  ] : [];

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-4" />
        <p className="text-gray-600 dark:text-slate-400 text-sm font-medium">Loading Insight Article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-24 min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center py-12 px-8 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl">
          <BookOpen className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-montserrat font-bold mb-2">Article Not Found</h2>
          <p className="text-gray-600 dark:text-slate-400 text-sm mb-6">{error || 'The requested article could not be located.'}</p>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest shadow-md hover:bg-emerald-500 transition-all active-click"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.seo_title || article.title,
    'description': article.meta_description || article.excerpt,
    'image': article.og_image || article.featured_image_url || 'https://dspng.tech/assets/logo.jpg',
    'datePublished': article.created_at,
    'author': {
      '@type': 'Person',
      'name': article.author_name
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Deeps Systems',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://dspng.tech/assets/logo.jpg'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': fullUrl
    }
  };

  return (
    <div className="pt-20 sm:pt-24 min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
      <Seo
        title={`${article.seo_title || article.title} | Deeps Systems Insights`}
        description={article.meta_description || article.excerpt}
        canonicalUrl={fullUrl}
        imageUrl={article.og_image || article.featured_image_url || 'https://dspng.tech/assets/logo.jpg'}
        type="article"
        schema={articleSchema}
      />

      {/* Header & Breadcrumb */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white transition-colors mb-6 group active-click"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Insights
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
              {getCategoryLabel(article.category)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              {article.reading_time}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-extrabold mb-6 leading-tight text-gray-900 dark:text-white">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 font-medium leading-relaxed mb-8">
            {article.excerpt}
          </p>

          {/* Author Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-4">
              <img
                src={article.author_image_url || '/assets/logo.jpg'}
                alt={article.author_name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-white/10 shadow-sm"
              />
              <div>
                <div className="font-bold text-sm text-gray-900 dark:text-white">{article.author_name}</div>
                <div className="text-xs text-gray-500 dark:text-slate-400">{article.author_title}</div>
              </div>
            </div>

            {/* Social Sharing Bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2 hidden sm:inline">
                Share:
              </span>
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${link.name}`}
                  className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-white/10 transition-all active-click"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.featured_image_url && (
          <div className="mb-12 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-xl bg-gray-100 dark:bg-slate-900 max-h-[500px]">
            <img
              src={article.featured_image_url}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div
          className="prose dark:prose-invert max-w-none text-gray-700 dark:text-slate-200 leading-relaxed font-medium text-base sm:text-lg space-y-6"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-100 dark:border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mr-2">
              <Tag className="w-3.5 h-3.5" />
              Tags:
            </span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-xs font-bold text-gray-600 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Configurable CTA Box */}
        {(article.cta_label || article.cta_href) && (
          <div className="mt-12 p-8 sm:p-10 rounded-[2.5rem] quantum-gradient text-white shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200 block mb-2">
                Deeps Systems Engagement
              </span>
              <h3 className="text-2xl font-montserrat font-bold">
                {article.cta_label || 'Transform Your Business Capabilities'}
              </h3>
            </div>
            <Link
              to={article.cta_href || '/contact'}
              className="px-8 py-4 rounded-2xl bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs uppercase tracking-widest shrink-0 shadow-lg transition-all active-click"
            >
              Get Started
            </Link>
          </div>
        )}

        {/* Related Solutions & Products */}
        {((article.related_solutions && article.related_solutions.length > 0) || (article.related_products && article.related_products.length > 0)) && (
          <div className="mt-16 p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 space-y-6">
            <h3 className="text-xl font-montserrat font-bold text-gray-900 dark:text-white">
              Related Solutions & Hardware
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.related_solutions.map((sol, idx) => (
                <Link
                  key={idx}
                  to={sol.href}
                  className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-emerald-500/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm text-gray-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {sol.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all" />
                </Link>
              ))}

              {article.related_products.map((prod, idx) => (
                <Link
                  key={idx}
                  to={prod.href}
                  className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-emerald-500/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm text-gray-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {prod.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-slate-900/30 border-t border-gray-100 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-2xl font-montserrat font-bold mb-8 text-gray-900 dark:text-white">
              Related Insights
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-300 shadow-sm flex flex-col justify-between group p-6"
                >
                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-widest inline-block mb-3">
                      {getCategoryLabel(rel.category)}
                    </span>
                    <h4 className="text-lg font-bold mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      <Link to={`/insights/${rel.category}/${rel.slug}`}>
                        {rel.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-slate-300 line-clamp-2 mb-4">
                      {rel.excerpt}
                    </p>
                  </div>

                  <Link
                    to={`/insights/${rel.category}/${rel.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-all pt-4 border-t border-gray-50 dark:border-white/5"
                  >
                    Read Insight <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ArticlePage;
