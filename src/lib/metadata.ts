import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "./constants";

export function generateMetadata(page: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${page.title} | ${SITE_NAME}`;
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: fullTitle,
      description: page.description,
      url: `${SITE_URL}${page.path}`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | AI Integration, Connected Data & Analytics`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI integration small business",
    "business data analytics",
    "AI automation consulting",
    "connected data solutions",
    "CRM implementation",
    "custom dashboard development",
    "data science consulting",
    "small business AI tools",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | AI Integration, Connected Data & Analytics`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
};
