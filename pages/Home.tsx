import React from 'react';
import Hero from '../components/Hero';
import BriefIntroduction from '../components/BriefIntroduction';
import OnlineStorePreview from '../components/OnlineStorePreview';
import ClientLogos from '../components/ClientLogos';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <BriefIntroduction />
      <OnlineStorePreview />
      <ClientLogos />
    </>
  );
};

export default Home;
