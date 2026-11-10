import React from 'react';
import Hero from '../components/Hero';
import BriefIntroduction from '../components/BriefIntroduction';
import DeepsGuard360Spotlight from '../components/DeepsGuard360Spotlight';
import OnlineStorePreview from '../components/OnlineStorePreview';
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
      <OnlineStorePreview />
    </>
  );
};

export default Home;
