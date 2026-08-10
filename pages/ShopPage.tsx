import React, { useEffect } from 'react';
import ShopServices from '../components/ShopServices';

const ShopPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[64px] sm:pt-[76px]">
      <ShopServices />
    </div>
  );
};

export default ShopPage;
