import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, CONTACT_EMAIL, PRODUCTS } from "@/lib/constants";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Durham",
    addressRegion: "CT",
    addressCountry: "US",
  },
  founder: {
    "@type": "Person",
    name: "Nick Paul",
    jobTitle: "Founder",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Products",
    itemListElement: PRODUCTS.map((p) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: p.title,
        description: p.description,
        url: `${SITE_URL}/services#${p.slug}`,
      },
    })),
  },
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
