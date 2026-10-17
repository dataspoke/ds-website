import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_TAGLINE } from "./constants";

// A page that sets `openGraph`/`twitter` replaces the root's fields entirely, so subpages
// would lose the file-based share image (app/opengraph-image.tsx). Pass it explicitly.
/** Keep a meta description to whole sentences, then a word boundary. */
export function clipMetaDescription(text: string, max = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;

  // Split on sentence endings followed by a space, so "app.yourcompany.com" stays intact.
  const sentences = normalized.split(/(?<=[.!?])\s+/);
  let out = "";
  for (const sentence of sentences) {
    const next = out ? `${out} ${sentence}` : sentence;
    if (next.length > max) break;
    out = next;
  }
  if (out.length >= 70) return out;

  const clipped = normalized
    .slice(0, max)
    .replace(/\s+\S*$/, "")
    .replace(/[,:;]\s*$/, "");
  return /[.!?]$/.test(clipped) ? clipped : `${clipped}.`;
}

export const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}: ${SITE_TAGLINE}`,
};

export function generateMetadata(page: {
  title: string;
  description: string;
  path: string;
  /** Use `title` verbatim, without the "| DataSpoke" template. */
  absoluteTitle?: boolean;
  /** Ad landing pages and other URLs that should stay out of the index. */
  noIndex?: boolean;
}): Metadata {
  const fullTitle = page.absoluteTitle ? page.title : `${page.title} | ${SITE_NAME}`;
  // Drop any query or hash. /contact?service=* must canonical to /contact,
  // including retired params such as ai-integration, fractional-cto, and web-apps.
  const pathname = page.path.split(/[?#]/)[0] || "/";
  const pageUrl = pathname === "/" ? SITE_URL : `${SITE_URL}${pathname}`;
  return {
    title: page.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: fullTitle,
      description: page.description,
      url: pageUrl,
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
    ...(page.noIndex ? { robots: { index: false, follow: false } } : {}),
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
    "data and AI consulting for business owners",
    "connect business software",
    "business dashboards",
    "custom software for business",
    "AI implementation for business",
    "data and AI assessment",
    "data consultant Connecticut",
    "data consultant New York",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    images: [shareImage],
  },
};
