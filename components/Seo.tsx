import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title?: string;
  description?: string;
  canonicalUrl: string;
  robots?: string;
  imageUrl?: string;
  type?: string;
  schema?: object | string;
}

const Seo: React.FC<SeoProps> = ({
  title = "Deeps Systems | Digital Transformation & Optimization",
  description = "Deeps Systems: Born-in-the-Cloud (BITC) optimization for PNG SMEs, finance, and logistics. High-performance digital outcomes.",
  canonicalUrl,
  robots = "index, follow",
  imageUrl = "https://dspng.tech/assets/logo.jpg",
  type = "website",
  schema
}) => {
  const schemaString = schema
    ? typeof schema === 'string'
      ? schema
      : JSON.stringify(schema)
    : null;

  return (
    <Helmet>
      {/* General Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={robots} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />

      {/* Structured Data (JSON-LD) */}
      {schemaString && (
        <script type="application/ld+json">
          {schemaString}
        </script>
      )}
    </Helmet>
  );
};

export default Seo;
