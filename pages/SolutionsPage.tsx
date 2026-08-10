import React from 'react';
import Solutions from '../components/Solutions';
import AdvancedSolutions from '../components/AdvancedSolutions';
import Comparison from '../components/Comparison';
import Seo from '../components/Seo';

const SolutionsPage: React.FC = () => {
  return (
    <div className="pt-20">
      <Seo
        title="Industrial-Grade Solutions | Deeps Systems"
        description="Bridging robust digital frameworks with high-performance architectures to deliver BITC outcomes across PNG."
        canonicalUrl="https://dspng.tech/solutions"
      />
      <Solutions />
      <AdvancedSolutions />
      <Comparison />
    </div>
  );
};

export default SolutionsPage;
