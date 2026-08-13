import React from 'react';
import Solutions from '../components/Solutions';
import AdvancedSolutions from '../components/AdvancedSolutions';
import Comparison from '../components/Comparison';
import Seo from '../components/Seo';

const SolutionsPage: React.FC = () => {
  return (
    <div className="pt-16 sm:pt-24">
      <Seo
        title="High-Performance Outcome Solutions | Deeps Systems"
        description="Deeps Systems delivers high-performance digital transformation, data analytics, and cloud optimization outcomes for PNG SMEs, finance, and logistics."
        canonicalUrl="https://dspng.tech/solutions"
      />
      <Solutions />
      <AdvancedSolutions />
      <Comparison />
    </div>
  );
};

export default SolutionsPage;
