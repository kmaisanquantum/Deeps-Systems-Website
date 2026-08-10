import React from 'react';
import Testimonials from '../components/Testimonials';
import News from '../components/News';
import Seo from '../components/Seo';

const InsightsPage: React.FC = () => {
  return (
    <div className="pt-20">
      <Seo
        title="Ecosystem Insights & News | Deeps Systems"
        description="Read the latest articles, client success testimonials, and updates from Deeps Systems about digital transformation and PWA developments in PNG."
        canonicalUrl="https://dspng.tech/insights"
      />
      <Testimonials />
      <News />
    </div>
  );
};

export default InsightsPage;
