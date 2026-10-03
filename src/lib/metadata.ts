import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_TAGLINE } from "./constants";

// A page that sets `openGraph`/`twitter` replaces the root's fields entirely, so subpages
// would lose the file-based share image (app/opengraph-image.tsx). Pass it explicitly.
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}: ${SITE_TAGLINE}`,
};

export function generateMetadata(page: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${page.title} | ${SITE_NAME}`;
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      title: fullTitle,
      description: page.description,
      url: `${SITE_URL}${page.path}`,
      siteName: SITE_NAME,
      type: "website",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
      images: [shareImage],
    },
  };
}

const defaultTitle = `${SITE_NAME} | ${SITE_TAGLINE}`;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "connected data small business",
    "AI readiness assessment",
    "small business dashboards",
    "CRM data integration consultant",
    "business automation consulting",
    "data science consulting small business",
    "operations research consultant",
    "AI assistant for business data",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: SITE_DESCRIPTION,
  },
};
