import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Durham",
    addressRegion: "CT",
    addressCountry: "US",
  },
  founder: {
    "@type": "Person",
    name: "Nick",
    jobTitle: "Founder",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  priceRange: "$$",
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
