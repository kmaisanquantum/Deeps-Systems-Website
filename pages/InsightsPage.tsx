import React from 'react';
import Testimonials from '../components/Testimonials';
import News from '../components/News';
import Seo from '../components/Seo';

const InsightsPage: React.FC = () => {
  return (
    <div className="pt-16 sm:pt-24">
      <Testimonials />
      <News />
    </div>
  );
};

export default InsightsPage;
