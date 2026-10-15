import { ASSESSMENT } from "@/content/approach";
import { CREDENTIALS } from "@/content/home";
import type { ServiceLine } from "@/types";
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";

// Stable ids let search engines join the business, its founder and its services across pages.
const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/about#nick-paul`;
const ASSESSMENT_ID = `${SITE_URL}/approach#data-ai-assessment`;

const provider = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
};

const areaServed = {
  "@type": "Country",
  name: "United States",
};

function LdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Homepage only. Organization, not ProfessionalService (deprecated).
 * No sameAs: the only profile on file is Nick's personal LinkedIn, which is on the founder.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/opengraph-image`,
    email: CONTACT_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      url: `${SITE_URL}/contact`,
      availableLanguage: ["English"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Durham",
      addressRegion: "CT",
      addressCountry: "US",
    },
    areaServed,
    founder: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Nick Paul",
      jobTitle: "Founder",
      url: `${SITE_URL}/about`,
      sameAs: [SOCIAL_LINKS.linkedin],
    },
  };
  return <LdScript data={data} />;
}

/** Founder profile, rendered on /about. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Nick Paul",
    jobTitle: "Founder",
    description: CREDENTIALS.join(". "),
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/nick-paul-family.jpg`,
    email: CONTACT_EMAIL,
    worksFor: provider,
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
  return <LdScript data={data} />;
}

/** One service line. Rendered only on that line's page, which carries the matching copy. */
export function ServiceJsonLd({ line }: { line: ServiceLine }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${line.slug}#service`,
    name: line.title,
    description: `${line.oneLiner} ${line.problem}`,
    url: `${SITE_URL}/services/${line.slug}`,
    provider,
    areaServed,
  };
  return <LdScript data={data} />;
}

/** Article for a case study or an insight. Author links to the About page Person when it is Nick Paul. */
export function ArticleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  authorName,
  about,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  about?: { id: string; name: string; url: string }[];
}) {
  const url = `${SITE_URL}${path}`;
  const author =
    authorName === "Nick Paul"
      ? {
          "@type": "Person",
          "@id": PERSON_ID,
          name: authorName,
          url: `${SITE_URL}/about`,
        }
      : { "@type": "Person", name: authorName };
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified,
    author,
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: `${SITE_URL}/opengraph-image`,
    ...(about?.length
      ? {
          about: about.map((item) => ({
            "@type": "Service",
            "@id": item.id,
            name: item.name,
            url: item.url,
          })),
        }
      : {}),
  };
  return <LdScript data={data} />;
}

/** The priced assessment. Rendered only where the assessment block is on the page. */
export function AssessmentJsonLd() {
  const price = ASSESSMENT.price.replace(/[^0-9.]/g, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": ASSESSMENT_ID,
    name: ASSESSMENT.name,
    description: ASSESSMENT.lede,
    url: `${SITE_URL}/approach#assessment`,
    provider,
    areaServed,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      description: `${ASSESSMENT.terms}. ${ASSESSMENT.credit}`,
      url: `${SITE_URL}/contact`,
    },
  };
  return <LdScript data={data} />;
}
