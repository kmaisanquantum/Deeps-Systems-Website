import React from 'react';
import Hero from '../components/Hero';
import BriefIntroduction from '../components/BriefIntroduction';
import SaaSSlider from '../components/SaaSSlider';
import OnlineStorePreview from '../components/OnlineStorePreview';
import Seo from '../components/Seo';

const Home: React.FC = () => {
  return (
    <>
      <Seo canonicalUrl="https://dspng.tech/" />
      <Hero />
      <BriefIntroduction />
      <SaaSSlider />
      <OnlineStorePreview />
    </>
  );
};

export default Home;
