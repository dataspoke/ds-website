import type { NavItem } from "@/types";

// Site-wide config. Page copy lives in src/content/*.

export const SITE_NAME = "DataSpoke";
export const SITE_TAGLINE = "Grow your business with data you already have.";
export const SITE_DESCRIPTION =
  "Data and AI consulting for business owners across the US. We connect tools, automate busywork and show your numbers. Free AI strategy call.";
export const SITE_URL = "https://www.dataspoke.io";
export const CONTACT_EMAIL = "nick@dataspoke.io";
export const BOOKING_URL = "https://calendar.app.google/jzAtxw6Pjtwz8WDV9";
/**
 * Same appointment schedule as BOOKING_URL. The short link sends
 * X-Frame-Options: SAMEORIGIN, so it cannot be embedded. This is the URL it
 * redirects to, which Google allows other sites to frame.
 */
export const BOOKING_EMBED_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ug-9sT7CsY63Cypht12egXKITsJwCyHhyx-Hs85nJyxHcby5GlWqOuVqBWix1vFC83Byi3Eah?gv=true";
/**
 * The offer is now called "Free AI strategy call", but the URL intentionally
 * stays /free-estimate (as do FREE_ESTIMATE_* names and the estimate_cta_click
 * event) so existing links, ads and analytics keep working. Don't rename it.
 */
export const FREE_ESTIMATE_PATH = "/free-estimate";
/** Ad landing page. Same offer as /free-estimate, with no site navigation. */
export const LP_FREE_ESTIMATE_PATH = "/lp/free-estimate";
export const PRIVACY_PATH = "/privacy";
/** Plain-English service area, used in page copy. No street address anywhere on the site. */
export const SERVICE_AREA = "Serving clients across the United States.";

/**
 * /work is taken down (redirected to /about) until clients approve their case studies.
 * Set to true to bring it back. next-sitemap.config.js repeats this value; keep both in sync.
 */
export const WORK_PUBLISHED = false;

export const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Approach", href: "/approach" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// One option per service line slug (src/content/services.ts), so /contact?service=<slug> preselects.
// "assessment" and "other" have no service page: "assessment" maps to /approach#assessment.
export const SERVICE_OPTIONS = [
  { value: "assessment", label: "Start with the Data & AI Assessment" },
  { value: "capture", label: "Get all our systems feeding one place" },
  { value: "organize", label: "Clean up and organize our data" },
  { value: "metrics-dashboards", label: "Numbers and dashboards we can trust" },
  { value: "custom-software", label: "Build our own app or internal tool" },
  { value: "ai-implementation", label: "Put AI to work on our business" },
  { value: "analytics-data-science", label: "Find where the money is and what's coming" },
  { value: "other", label: "Not sure yet. Let's talk." },
];

export const TRADEMARK_NOTE =
  "Product names are trademarks of their respective owners. DataSpoke is not affiliated with, endorsed by or a partner of these companies.";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/nick-paul-8b466818/",
  linkedinCompany: "https://www.linkedin.com/company/dataspoke-io/",
  linkedinServices: "https://www.linkedin.com/services/page/a800a0347a5aa45b29",
  clutch: "https://clutch.co/profile/dataspoke",
  goodfirms: "https://www.goodfirms.co/company/dataspoke",
};

// GA4. Loaded on every page from the root layout.
// AiReferralTracker sends ai_referral and sets user property ai_source.
export const GA_MEASUREMENT_ID = "G-JWYN8NRDFS";
