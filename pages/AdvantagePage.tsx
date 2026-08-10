import React from 'react';
import Advantages from '../components/Advantages';
import Partnerships from '../components/Partnerships';
import Seo from '../components/Seo';

const AdvantagePage: React.FC = () => {
  return (
    <div className="pt-16 sm:pt-24">
      <Advantages />
      <Partnerships />
    </div>
  );
};

export default AdvantagePage;
