import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';

const NotFound: React.FC = () => {
  return (
    <div className="pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-48 lg:pb-32 min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <Seo
        title="Page Not Found | Deeps Systems"
        description="The page you are looking for does not exist or has been moved."
        canonicalUrl={window.location.href}
        robots="noindex"
      />
      <div className="p-5 rounded-full bg-emerald-500/10 text-emerald-600 mb-6 animate-pulse">
        <FileQuestion className="w-12 h-12" />
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-extrabold text-gray-900 dark:text-white mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-slate-300 max-w-md mb-8 text-sm sm:text-base font-medium">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
