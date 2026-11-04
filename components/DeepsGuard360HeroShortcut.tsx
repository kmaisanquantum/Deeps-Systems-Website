import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

/** Compact DeepsGuard360 shortcut positioned within the homepage hero area. */
const DeepsGuard360HeroShortcut: React.FC = () => (
  <Link
    to="/deepsguard360"
    className="absolute left-1/2 top-[76px] z-20 inline-flex w-max max-w-[calc(100%-2rem)] -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-2 text-center text-[10px] font-bold leading-tight text-sky-600 shadow-sm transition hover:bg-sky-500/15 focus:outline-none focus:ring-2 focus:ring-sky-400 sm:top-[80px] sm:px-4 sm:text-xs dark:text-sky-300 md:top-[132px]"
    aria-label="Explore DeepsGuard360, security management platform for Papua New Guinea"
  >
    <ShieldCheck className="h-4 w-4 shrink-0" />
    <span><span className="uppercase tracking-wide">New</span><span className="mx-1.5 opacity-60">·</span>DeepsGuard360 — Security Management Platform for PNG</span>
    <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
  </Link>
);

export default DeepsGuard360HeroShortcut;
