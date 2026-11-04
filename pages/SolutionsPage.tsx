import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Solutions from '../components/Solutions';
import AdvancedSolutions from '../components/AdvancedSolutions';
import Comparison from '../components/Comparison';
import Seo from '../components/Seo';

const SolutionsPage: React.FC = () => {
  return (
    <div className="pt-16 sm:pt-24">
      <Seo
        title="High-Performance Outcome Solutions | Deeps Systems"
        description="Deeps Systems delivers high-performance digital transformation, data analytics, and cloud optimization outcomes for PNG SMEs, finance, and logistics."
        canonicalUrl="https://dspng.tech/solutions"
      />
      <Solutions />
      <section className="bg-gray-50 px-5 py-16 dark:bg-white/[0.02] md:px-6 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-3xl border border-gray-100 bg-white p-8 dark:border-white/10 dark:bg-white/[0.03] md:flex-row md:items-center md:p-12">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600">
              <ShieldCheck className="h-4 w-4" /> Business platform
            </div>
            <h2 className="mb-3 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">DeepsGuard360</h2>
            <p className="text-gray-600 dark:text-slate-300">Integrated security management SaaS for security companies in PNG and the Pacific. Bring guards, patrols, incidents, and client access together in one platform.</p>
          </div>
          <Link to="/deepsguard360" className="inline-flex shrink-0 items-center gap-2 rounded-full quantum-gradient px-6 py-3 font-bold text-white">
            Explore DeepsGuard360 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <AdvancedSolutions />
      <Comparison />
    </div>
  );
};

export default SolutionsPage;
