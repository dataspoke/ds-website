import type { NavItem } from "@/types";

// Site-wide config. Page copy lives in src/content/*.

export const SITE_NAME = "DataSpoke";
export const SITE_TAGLINE = "Your company, running on connected data. Ready for AI.";
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

export const SERVICE_OPTIONS = [
  { value: "assessment", label: "Start with the Data & AI Assessment" },
  { value: "connected-company", label: "Connect our systems" },
  { value: "live-numbers", label: "Numbers and reports we can trust" },
  { value: "lead-flow", label: "Respond to every lead faster" },
  { value: "company-brain", label: "Get answers from our own business data" },
  { value: "ai-ready-company", label: "Get our company and team AI‑ready" },
  { value: "automate-the-busywork", label: "Automate repeat work" },
  { value: "early-warnings", label: "Know what's coming before it hits" },
  { value: "find-the-margin", label: "Find where the money is" },
  { value: "other", label: "Not sure yet. Let's talk." },
];

export const TRADEMARK_NOTE =
  "Product names are trademarks of their respective owners. DataSpoke is not affiliated with, endorsed by or a partner of these companies.";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/nick-paul-8b466818/",
};
