import React from 'react';
import Hero from '../components/Hero';
import BriefIntroduction from '../components/BriefIntroduction';
import SaaSSlider from '../components/SaaSSlider';
import OnlineStorePreview from '../components/OnlineStorePreview';
import ClientLogos from '../components/ClientLogos';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <BriefIntroduction />
      <SaaSSlider />
      <OnlineStorePreview />
      <ClientLogos />
    </>
  );
};

export default Home;
