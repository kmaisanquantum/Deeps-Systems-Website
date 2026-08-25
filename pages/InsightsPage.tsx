import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  X,
  Mail,
  Linkedin,
  Facebook,
  MessageCircle,
  Twitter,
  Zap,
  BookOpen,
  ShoppingBag,
  Rocket,
  Loader2,
  ExternalLink
} from 'lucide-react';
import Seo from '../components/Seo';
import { getApiUrl } from '../utils/api';

export interface ArticleData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  featured_image_url: string | null;
  category: string;
  author_name: string;
  author_title: string;
  author_image_url: string;
  tags: string[];
  date: string;
  reading_time: string;
  seo_title: string;
  meta_description: string;
  og_image: string;
  related_solutions: { label: string; href: string }[];
  related_products: { label: string; href: string }[];
  cta_label: string | null;
  cta_href: string | null;
  is_featured: boolean;
  external_url?: string | null;
  created_at: string;
}

export const CATEGORY_TOPICS = [
  { name: 'All Topics', slug: 'all' },
  { name: 'Digital Transformation', slug: 'digital-transformation' },
  { name: 'Business & Technology', slug: 'business-technology' },
  { name: 'PNG & Pacific', slug: 'png-pacific' },
  { name: 'E-Commerce', slug: 'e-commerce' },
  { name: 'Business Management', slug: 'business-management' },
  { name: 'Cybersecurity', slug: 'cybersecurity' },
  { name: 'Case Studies', slug: 'case-studies' },
  { name: 'Deeps Systems', slug: 'deeps-systems' }
];

export const getCategoryLabel = (slug: string): string => {
  const found = CATEGORY_TOPICS.find(c => c.slug === slug);
  if (found) return found.name;
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

const InsightsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategoryParam = searchParams.get('category') || 'all';
  const currentSearchParam = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(currentSearchParam);
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeShareArticle, setActiveShareArticle] = useState<ArticleData | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Synchronize search input with URL search param
  useEffect(() => {
    setSearchInput(currentSearchParam);
  }, [currentSearchParam]);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let queryParams = new URLSearchParams();
        if (currentCategoryParam && currentCategoryParam !== 'all') {
          queryParams.set('category', currentCategoryParam);
        }
        if (currentSearchParam) {
          queryParams.set('search', currentSearchParam);
        }
        queryParams.set('page', String(page));
        queryParams.set('limit', '9');

        const res = await fetch(getApiUrl(`/api/articles?${queryParams.toString()}`));
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }
        const data = await res.json();
        if (data && Array.isArray(data.articles)) {
          setArticles(data.articles);
          if (data.pagination) {
            setTotalPages(data.pagination.totalPages || 1);
          }
        } else if (Array.isArray(data)) {
          setArticles(data);
        } else {
          setArticles([]);
        }
      } catch (err: any) {
        console.error('Failed to fetch articles:', err);
        setError(err.message || 'Failed to load insights.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [currentCategoryParam, currentSearchParam, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleCategorySelect = (categorySlug: string) => {
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (categorySlug === 'all') {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }
    setSearchParams(params);
  };

  const getArticleUrl = (article: ArticleData) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://dspng.tech';
    return `${origin}/insights/${article.category}/${article.slug}`;
  };

  const shareLinks = (article: ArticleData) => {
    const fullUrl = getArticleUrl(article);
    return [
      {
        name: 'LinkedIn',
        icon: <Linkedin className="w-5 h-5 text-blue-600" />,
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
        color: 'hover:border-blue-500/30'
      },
      {
        name: 'Facebook',
        icon: <Facebook className="w-5 h-5 text-blue-500" />,
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
        color: 'hover:border-blue-400/30'
      },
      {
        name: 'WhatsApp',
        icon: <MessageCircle className="w-5 h-5 text-emerald-500" />,
        url: `https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + fullUrl)}`,
        color: 'hover:border-emerald-500/30'
      },
      {
        name: 'X (Twitter)',
        icon: <Twitter className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
        url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(article.title)}`,
        color: 'hover:border-slate-500/30'
      },
      {
        name: 'Email',
        icon: <Mail className="w-5 h-5 text-emerald-600" />,
        url: `mailto:?subject=${encodeURIComponent(article.title)}&body=Read this article from Deeps Systems: ${encodeURIComponent(fullUrl)}`,
        color: 'hover:border-emerald-500/30'
      }
    ];
  };

  const featuredArticle = articles.find(a => a.is_featured) || articles[0];
  const remainingArticles = articles.filter(a => a.id !== featuredArticle?.id);

  return (
    <div className="pt-20 sm:pt-24 min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
      <Seo
        title="Insights for a Digital Pacific | Deeps Systems Knowledge Hub"
        description="Explore high-performance digital strategies, cloud architecture analysis, satellite connectivity trends, and technology benchmarks tailored for PNG and Pacific enterprise growth."
        canonicalUrl="https://dspng.tech/insights"
      />

      {/* Hero Section */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-slate-900/40 dark:to-[#0a0a0a] border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <BookOpen className="w-4 h-4" />
              Knowledge Hub & Insights
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white leading-tight">
              Insights for a <span className="quantum-text-gradient">Digital Pacific</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 font-medium leading-relaxed mb-10">
              High-performance digital strategies, cloud architecture analysis, satellite connectivity trends, and technology benchmarks tailored for PNG and Pacific enterprise growth.
            </p>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-gray-400 dark:text-slate-500" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search articles by topic, keyword, or tag..."
                  className="w-full pl-12 pr-28 py-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all shadow-lg font-medium text-sm"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput('');
                      const params = new URLSearchParams(searchParams);
                      params.delete('search');
                      setSearchParams(params);
                    }}
                    className="absolute right-24 text-gray-400 hover:text-gray-600 dark:hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 px-5 py-2.5 rounded-xl quantum-gradient text-white text-xs font-bold hover:shadow-emerald-500/20 shadow-md transition-all active-click"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Explore Topics (Filter Chips) */}
      <section className="py-8 bg-gray-50/50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-slate-400 shrink-0">
              Explore Topics:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              {CATEGORY_TOPICS.map((topic) => {
                const isActive = currentCategoryParam === topic.slug;
                return (
                  <button
                    key={topic.slug}
                    onClick={() => handleCategorySelect(topic.slug)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 active-click ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-slate-300 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-white'
                    }`}
                  >
                    {topic.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="py-24 text-center">
              <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-slate-400 font-medium text-sm">Loading Pacific Insights...</p>
            </div>
          ) : error ? (
            <div className="p-8 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-500 text-center max-w-md mx-auto">
              <p className="font-bold mb-2">Notice</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto">
              <BookOpen className="w-12 h-12 text-gray-400 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No Articles Found</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm mb-6">
                No published articles matched your search query or topic filter.
              </p>
              <button
                onClick={() => {
                  setSearchInput('');
                  setSearchParams({});
                }}
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest shadow-md hover:bg-emerald-500 transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured Insight Section (Only when viewing all or on page 1) */}
              {page === 1 && featuredArticle && !currentSearchParam && (
                <div className="mb-16">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 mb-6">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Featured Insight
                  </div>

                  <div className="bg-white dark:bg-[#0d0d0d] rounded-[2.5rem] border border-gray-100 dark:border-white/10 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 group">
                    <div className="lg:col-span-7 h-64 sm:h-80 lg:h-full min-h-[300px] relative overflow-hidden bg-gray-100 dark:bg-slate-900">
                      <img
                        src={featuredArticle.featured_image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200'}
                        alt={featuredArticle.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-md">
                          {getCategoryLabel(featuredArticle.category)}
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                            {featuredArticle.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-emerald-600" />
                            {featuredArticle.reading_time}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-montserrat font-bold mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                          {featuredArticle.external_url ? (
                            <a href={featuredArticle.external_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-emerald-600">
                              {featuredArticle.title}
                              <ExternalLink className="w-5 h-5 shrink-0 opacity-70 group-hover:opacity-100" />
                            </a>
                          ) : (
                            <Link to={`/insights/${featuredArticle.category}/${featuredArticle.slug}`}>
                              {featuredArticle.title}
                            </Link>
                          )}
                        </h2>

                        <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base font-medium line-clamp-3 mb-8">
                          {featuredArticle.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3">
                          <img
                            src={featuredArticle.author_image_url || '/assets/logo.jpg'}
                            alt={featuredArticle.author_name}
                            className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-white/10"
                          />
                          <div>
                            <div className="text-xs font-bold">{featuredArticle.author_name}</div>
                            <div className="text-[10px] text-gray-500 dark:text-slate-400">{featuredArticle.author_title}</div>
                          </div>
                        </div>

                        {featuredArticle.external_url ? (
                          <a
                            href={featuredArticle.external_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all active-click shadow-md shadow-emerald-600/20"
                          >
                            Read Insight
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : (
                          <Link
                            to={`/insights/${featuredArticle.category}/${featuredArticle.slug}`}
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all active-click shadow-md shadow-emerald-600/20"
                          >
                            Read Insight
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Latest Insights Card Grid */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-montserrat font-bold text-gray-900 dark:text-white">
                    {currentSearchParam ? `Search Results (${articles.length})` : currentCategoryParam !== 'all' ? `${getCategoryLabel(currentCategoryParam)} Articles` : 'Latest Insights'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(page === 1 && featuredArticle && !currentSearchParam ? remainingArticles : articles).map((article, idx) => (
                    <div
                      key={article.id}
                      className="bg-white dark:bg-[#0a0a0a] flex flex-col rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-500 group shadow-sm hover:shadow-xl"
                    >
                      <div className="h-48 bg-gray-50 dark:bg-slate-900/50 relative overflow-hidden">
                        <img
                          src={article.featured_image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200'}
                          alt={article.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-emerald-500/20 backdrop-blur-md text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-white/20 shadow-sm">
                            {getCategoryLabel(article.category)}
                          </span>
                        </div>
                      </div>

                      <div className="p-8 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                              {article.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-emerald-600" />
                              {article.reading_time}
                            </span>
                          </div>

                          <h4 className="text-xl font-bold mb-3 group-hover:text-emerald-600 transition-colors leading-snug text-gray-900 dark:text-white">
                            {article.external_url ? (
                              <a href={article.external_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-emerald-600">
                                {article.title}
                                <ExternalLink className="w-4 h-4 shrink-0 opacity-70 group-hover:opacity-100" />
                              </a>
                            ) : (
                              <Link to={`/insights/${article.category}/${article.slug}`}>
                                {article.title}
                              </Link>
                            )}
                          </h4>

                          <p className="text-gray-600 dark:text-slate-300 text-xs sm:text-sm mb-6 line-clamp-3 font-medium leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                          {article.external_url ? (
                            <a
                              href={article.external_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors group/read active-click px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10"
                            >
                              Read Article
                              <ExternalLink className="w-3.5 h-3.5 group-hover/read:translate-x-1 transition-transform" />
                            </a>
                          ) : (
                            <Link
                              to={`/insights/${article.category}/${article.slug}`}
                              className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors group/read active-click px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10"
                            >
                              Read Article
                              <ArrowRight className="w-3.5 h-3.5 group-hover/read:translate-x-1 transition-transform" />
                            </Link>
                          )}

                          <button
                            onClick={() => setActiveShareArticle(article)}
                            className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-600 dark:text-slate-300 hover:text-emerald-600 active-click transition-all group/share"
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 pt-8">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className="px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 font-bold text-xs disabled:opacity-40 hover:border-emerald-500 transition-all"
                  >
                    Previous
                  </button>
                  <span className="text-xs font-bold text-gray-500 dark:text-slate-400">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    className="px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 font-bold text-xs disabled:opacity-40 hover:border-emerald-500 transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Explore Deeps Systems CTA Row */}
      <section className="py-16 bg-gradient-to-r from-emerald-900/10 via-emerald-600/10 to-blue-900/10 border-y border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">
                Explore Deeps Systems
              </span>
              <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-gray-900 dark:text-white mb-2">
                Ready to Implement High-Performance Digital Solutions?
              </h3>
              <p className="text-gray-600 dark:text-slate-300 text-sm font-medium max-w-2xl">
                From Born-in-the-Cloud architectures to authorized Starlink satellite hardware and Microsoft 365 licensing.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <Link
                to="/solutions"
                className="px-6 py-3.5 rounded-2xl quantum-gradient text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all active-click"
              >
                <Rocket className="w-4 h-4" />
                Outcome Solutions
              </Link>
              <Link
                to="/shop"
                className="px-6 py-3.5 rounded-2xl bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-white/20 transition-all active-click"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                Online Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Newsletter Section (Disabled / Non-submitting backend) */}
      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-montserrat font-extrabold uppercase mb-4 tracking-tight">
            Stay Ahead of the <span className="text-emerald-400">Digital Curve</span>
          </h2>
          <p className="text-slate-400 text-base font-medium max-w-xl mx-auto mb-8">
            Get early access to PNG technology benchmarks, IT security alerts, and Born-in-the-Cloud insights.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              disabled
              placeholder="Enter your enterprise email..."
              className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 placeholder-slate-600 text-sm font-medium outline-none cursor-not-allowed"
            />
            <button
              type="button"
              disabled
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600/50 text-white/70 text-xs font-bold uppercase tracking-widest shrink-0 cursor-not-allowed"
            >
              Subscribe
            </button>
          </form>
          <p className="text-[11px] text-slate-500 mt-4 font-medium">
            Newsletter subscriptions launching soon. Read all insights freely without signup.
          </p>
        </div>
      </section>

      {/* Share Modal */}
      {activeShareArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-md rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/10 shadow-2xl relative animate-in zoom-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => setActiveShareArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-slate-400 transition-all active-click"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-montserrat font-bold mb-2 text-gray-900 dark:text-white">Share Insight</h3>
            <p className="text-gray-600 dark:text-slate-300 text-sm mb-6 font-medium">Spread knowledge with your professional network.</p>

            <div className="space-y-3">
              {shareLinks(activeShareArticle).map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 transition-all group ${link.color} active-click shadow-sm`}
                >
                  <div className="p-2 rounded-xl bg-white dark:bg-white/10 shadow-sm">
                    {link.icon}
                  </div>
                  <span className="font-bold text-sm text-gray-800 dark:text-white">{link.name}</span>
                </a>
              ))}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(getArticleUrl(activeShareArticle));
                alert('Article link copied to clipboard!');
              }}
              className="w-full mt-6 py-3.5 rounded-xl bg-gray-900 dark:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-all active-click shadow-lg"
            >
              Copy Direct Article Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsPage;
