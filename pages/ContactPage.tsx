import React, { useEffect } from 'react';
import Contact from '../components/Contact';
import Seo from '../components/Seo';

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16 sm:pt-24">
      <Seo
        title="Contact Deeps Systems | PNG Digital Transformation"
        description="Get in touch with Deeps Systems. Contact our digital transformation and Born-in-the-Cloud (BITC) optimization experts in Papua New Guinea."
        canonicalUrl="https://dspng.tech/contact"
      />
      <Contact />
    </div>
  );
};

export default ContactPage;
