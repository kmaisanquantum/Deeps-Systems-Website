import React, { useEffect } from 'react';
import ShopServices from '../components/ShopServices';
import Seo from '../components/Seo';

const ShopPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[64px] sm:pt-[76px]">
      <Seo
        title="Microsoft 365 & Starlink Reseller Shop PNG | Deeps Systems"
        description="Deeps Systems is your trusted Microsoft 365, Office 365, and Starlink hardware authorized reseller in PNG. Access digital products and services."
        canonicalUrl="https://dspng.tech/shop"
      />
      <ShopServices />
    </div>
  );
};

export default ShopPage;
