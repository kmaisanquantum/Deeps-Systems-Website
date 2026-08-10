import React from 'react';
import Solutions from '../components/Solutions';
import AdvancedSolutions from '../components/AdvancedSolutions';
import Comparison from '../components/Comparison';
import Seo from '../components/Seo';

const SolutionsPage: React.FC = () => {
  return (
    <div className="pt-16 sm:pt-24">
      <Solutions />
      <AdvancedSolutions />
      <Comparison />
    </div>
  );
};

export default SolutionsPage;
