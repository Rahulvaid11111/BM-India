export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BEST Magazine',
    url: 'https://bestmagazine.ca',
    logo: 'https://bestmagazine.ca/logo.png',
    description: 'The number 1 digital magazine covering the best in lifestyle, culture, fashion, beauty, timepieces, celebrities, podcasts, jewellery, automotive and around the world.',
    sameAs: [
      'https://twitter.com/bestmagazine',
      'https://facebook.com/bestmagazine',
      'https://instagram.com/bestmagazine',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@bestmagazine.ca',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
