import React, { useEffect } from 'react';
import ShopServices from '../components/ShopServices';

const ShopPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[72px]">
      <ShopServices />
    </div>
  );
};

export default ShopPage;
