import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { SERVICE_LINES } from "@/content/services";
import { CREDENTIALS } from "@/content/home";

// Stable ids let search engines join the business and its founder across pages.
const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/about#nick-paul`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/opengraph-image`,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Durham",
    addressRegion: "CT",
    addressCountry: "US",
  },
  founder: {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Nick Paul",
    jobTitle: "Founder",
    url: `${SITE_URL}/about`,
    sameAs: [SOCIAL_LINKS.linkedin],
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: SERVICE_LINES.map((l) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: l.title,
        description: `${l.oneLiner} ${l.problem}`,
        url: `${SITE_URL}/services/${l.slug}`,
      },
    })),
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Nick Paul",
  jobTitle: "Founder",
  description: CREDENTIALS.join(". "),
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/nick-paul-family.jpg`,
  email: CONTACT_EMAIL,
  worksFor: { "@id": ORG_ID },
  sameAs: [SOCIAL_LINKS.linkedin],
  knowsAbout: [
    "Data science",
    "Operations research",
    "Software development",
    "Data integration",
    "Business automation",
    "Artificial intelligence",
  ],
};

function LdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLd() {
  return <LdScript data={jsonLd} />;
}

/** Founder profile, rendered on /about. */
export function PersonJsonLd() {
  return <LdScript data={personJsonLd} />;
}
