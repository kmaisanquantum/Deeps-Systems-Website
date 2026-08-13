import React from 'react';
import Testimonials from '../components/Testimonials';
import News from '../components/News';
import Seo from '../components/Seo';

const InsightsPage: React.FC = () => {
  return (
    <div className="pt-16 sm:pt-24">
      <Seo
        title="Business Insights, Trends & Success Stories | Deeps Systems"
        description="Explore the latest technology trends, cloud optimization insights, and client success stories from the digital transformation experts at Deeps Systems."
        canonicalUrl="https://dspng.tech/insights"
      />
      <Testimonials />
      <News />
    </div>
  );
};

export default InsightsPage;
