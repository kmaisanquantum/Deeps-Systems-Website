import React from 'react';
import Advantages from '../components/Advantages';
import Partnerships from '../components/Partnerships';
import Seo from '../components/Seo';

const AdvantagePage: React.FC = () => {
  return (
    <div className="pt-20">
      <Seo
        title="Deeps Advantage & Partnerships | Deeps Systems"
        description="Our unique approach combines minimalist software architecture, enterprise-grade cloud integrations, and localized support."
        canonicalUrl="https://dspng.tech/advantage"
      />
      <Advantages />
      <Partnerships />
    </div>
  );
};

export default AdvantagePage;
