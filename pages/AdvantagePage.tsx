import React from 'react';
import Advantages from '../components/Advantages';
import Partnerships from '../components/Partnerships';
import Seo from '../components/Seo';

const AdvantagePage: React.FC = () => {
  return (
    <div className="pt-16 sm:pt-24">
      <Seo
        title="Born-in-the-Cloud (BITC) Advantages | Deeps Systems"
        description="Experience the BITC advantage with Deeps Systems. Unlocking digital scalability, robust cloud optimization, and security for businesses in Papua New Guinea."
        canonicalUrl="https://dspng.tech/advantage"
      />
      <Advantages />
      <Partnerships />
    </div>
  );
};

export default AdvantagePage;
