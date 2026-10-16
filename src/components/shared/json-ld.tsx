import { ASSESSMENT } from "@/content/approach";
import { ESTIMATE_FAQS, FREE_ESTIMATE } from "@/content/free-estimate";
import { CREDENTIALS } from "@/content/home";
import type { ServiceLine } from "@/types";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";

// Stable ids let search engines join the business, its founder and its services across pages.
const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/about#nick-paul`;
const ASSESSMENT_ID = `${SITE_URL}/approach#data-ai-assessment`;
const ESTIMATE_ID = `${SITE_URL}${FREE_ESTIMATE.path}#service`;

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

const personSameAs = [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.upwork];
const organizationSameAs = [
  SOCIAL_LINKS.linkedinCompany,
  SOCIAL_LINKS.clutch,
  SOCIAL_LINKS.goodfirms,
  SOCIAL_LINKS.linkedinServices,
];

const organizationAreaServed = [
  { "@type": "State", name: "Connecticut" },
  { "@type": "State", name: "New York" },
  { "@type": "Country", name: "United States" },
];

/**
 * Homepage only. Organization, not ProfessionalService (deprecated).
 * Company profiles are on Organization sameAs. Nick's personal profiles stay on the Person.
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
    sameAs: organizationSameAs,
    image: `${SITE_URL}/opengraph-image`,
    email: CONTACT_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      url: `${SITE_URL}/contact`,
      availableLanguage: ["English"],
      areaServed: "US",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Durham",
      addressRegion: "CT",
      addressCountry: "US",
    },
    areaServed: organizationAreaServed,
    potentialAction: {
      "@type": "ReserveAction",
      name: FREE_ESTIMATE.cta,
      url: `${SITE_URL}${FREE_ESTIMATE.path}`,
    },
    founder: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Nick Paul",
      jobTitle: "Founder",
      url: `${SITE_URL}/about`,
      sameAs: personSameAs,
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
    sameAs: personSameAs,
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

/** Free estimate offer. Rendered only on /free-estimate, with the FAQ block on that page. */
export function EstimateJsonLd() {
  const pageUrl = `${SITE_URL}${FREE_ESTIMATE.path}`;
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": ESTIMATE_ID,
    name: FREE_ESTIMATE.headline,
    description: FREE_ESTIMATE.metaDescription,
    url: pageUrl,
    provider,
    areaServed,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: pageUrl,
      description: "Free 30-minute call and a written estimate. No obligation.",
    },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: ESTIMATE_FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  return (
    <>
      <LdScript data={service} />
      <LdScript data={faq} />
    </>
  );
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
