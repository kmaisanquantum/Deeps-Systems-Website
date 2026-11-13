import React from 'react';
import Hero from '../components/Hero';
import BriefIntroduction from '../components/BriefIntroduction';
import DeepsGuard360Spotlight from '../components/DeepsGuard360Spotlight';
import VisitorsLog from '../components/VisitorsLog';
import VisitorStats from '../components/VisitorStats';
import Seo from '../components/Seo';

const Home: React.FC = () => {
  return (
    <>
      <Seo canonicalUrl="https://dspng.tech/" />
      <div className="relative">
        <Hero />
      </div>
      <BriefIntroduction />
      <DeepsGuard360Spotlight />
      <VisitorsLog />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <VisitorStats />
      </div>
    </>
  );
};

export default Home;
