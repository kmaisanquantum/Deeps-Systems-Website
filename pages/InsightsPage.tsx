import React from 'react';
import News from '../components/News';
import Seo from '../components/Seo';

const InsightsPage: React.FC = () => {
  return (
    <div className="pt-16 sm:pt-24">
      <Seo
        title="Business Insights & Technology Trends | Deeps Systems"
        description="Explore the latest technology trends and cloud optimization insights from the digital transformation experts at Deeps Systems."
        canonicalUrl="https://dspng.tech/insights"
      />
      <News />
    </div>
  );
};

export default InsightsPage;
