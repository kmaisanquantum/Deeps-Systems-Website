import React from 'react';
import ServiceRequest from '../components/ServiceRequest';
import Seo from '../components/Seo';

const ServicePage: React.FC = () => {
  return (
    <>
      <Seo
        title="After-Sales Support & Warranty | Deeps Systems"
        description="Report an issue or claim warranty support for products and services purchased from Deeps Systems in Papua New Guinea."
        canonical="https://dspng.tech/service"
      />
      <div className="pt-[64px]">
        <ServiceRequest />
      </div>
    </>
  );
};

export default ServicePage;
