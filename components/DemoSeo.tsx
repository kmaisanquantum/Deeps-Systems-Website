import React from 'react';
import { useLocation } from 'react-router-dom';
import Seo from './Seo';

const DemoSeo: React.FC = () => {
  const { pathname } = useLocation();

  if (!pathname.endsWith('/demo')) return null;

  return (
    <Seo
      title="Interactive product demo | Deeps Systems"
      description="Explore the Deeps Systems interactive product demo."
      canonicalUrl={`https://dspng.tech${pathname}`}
      robots="noindex, nofollow"
    />
  );
};

export default DemoSeo;
