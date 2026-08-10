import React, { useEffect } from 'react';
import ShopServices from '../components/ShopServices';
import Seo from '../components/Seo';

const ShopPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[72px]">
      <Seo
        title="Online Shop & Starlink Reseller | Deeps Systems"
        description="Authorized Starlink reseller in Papua New Guinea. Buy Starlink Standard, Mini, and Business kits with priority local technical support."
        canonicalUrl="https://dspng.tech/shop"
      />
      <ShopServices />
    </div>
  );
};

export default ShopPage;
