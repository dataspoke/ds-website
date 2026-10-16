import type { NavItem } from "@/types";

// Site-wide config. Page copy lives in src/content/*.

export const SITE_NAME = "DataSpoke";
export const SITE_TAGLINE = "Your business, running on its own data.";
export const SITE_DESCRIPTION =
  "DataSpoke connects the software an established business already runs on into one picture the owner controls, makes it ready for AI, and builds the dashboards, automations and analysis that turn it into better decisions.";
export const SITE_URL = "https://www.dataspoke.io";
export const CONTACT_EMAIL = "nick@dataspoke.io";
export const BOOKING_URL = "https://calendar.app.google/jzAtxw6Pjtwz8WDV9";
export const LOCATION = "Durham, CT";

export const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Approach", href: "/approach" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// One option per service line slug (src/content/services.ts), so /contact?service=<slug> preselects.
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
  upwork: "https://www.upwork.com/freelancers/~013f135f6dfc7660c7",
};

/** Public profile facts, read 2026-10-15. No quotes, earnings, job count, or badge artwork. */
export const UPWORK_PROOF = {
  rating: "5.0",
  clientCount: 28,
  jobSuccess: "100% Job Success",
  badge: "Top Rated Plus",
} as const;

// GA4. Loaded on every page from the root layout.
// AiReferralTracker sends ai_referral and sets user property ai_source.
export const GA_MEASUREMENT_ID = "G-JWYN8NRDFS";
