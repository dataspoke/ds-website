import type { NavItem, Service, Testimonial } from "@/types";

export const SITE_NAME = "DataSpoke";
export const SITE_DESCRIPTION =
  "AI integration, connected data, and automation for small businesses. We help you integrate AI tools, unify your data, and make smarter decisions.";
export const SITE_URL = "https://dataspoke.io";
export const CONTACT_EMAIL = "nick@dataspoke.io";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES: Service[] = [
  {
    slug: "ai-integration",
    title: "AI Integration",
    description:
      "We embed AI directly into your business workflows. From intelligent document processing to custom chatbots that handle real customer questions. Not buzzwords, real tools that save your team hours every week.",
    whoItsFor: "Businesses ready to put AI to work on real problems",
    icon: "Sparkles",
    features: [
      "Custom AI assistants & chatbots",
      "Document processing & extraction",
      "Workflow automation with LLMs",
      "AI-powered search & recommendations",
    ],
  },
  {
    slug: "connected-data",
    title: "Connected Data & Analytics",
    description:
      "Your data lives in a dozen different places. We connect it all into a single view so you can finally see what's actually happening in your business. CRMs, ad platforms, spreadsheets, databases.",
    whoItsFor: "Companies with data scattered across tools and platforms",
    icon: "BarChart3",
    features: [
      "Data pipelines & integration",
      "Custom dashboards & reporting",
      "Google Ads conversion tracking",
      "Centralized data architecture",
    ],
  },
  {
    slug: "api-integration",
    title: "API Integration & Automation",
    description:
      "Your tools don't talk to each other. We connect them. Salesforce, Google Ads, Lawmatics, RingCentral, QuickBooks, and more. Automated syncs, real-time webhooks, and workflows that run without you.",
    whoItsFor: "Businesses with disconnected tools and manual workarounds",
    icon: "Users",
    features: [
      "Third-party API integration",
      "Automated data syncing",
      "Webhook & event-driven workflows",
      "Cross-platform automation",
    ],
  },
  {
    slug: "web-apps",
    title: "Web Apps & Tools",
    description:
      "When off-the-shelf software doesn't fit, we build exactly what you need. Client portals, analytics dashboards, internal tools, and custom platforms designed around how your business actually works.",
    whoItsFor: "Companies that need software built for their specific workflows",
    icon: "Code",
    features: [
      "Custom web applications",
      "Client portals & dashboards",
      "Internal tools & admin panels",
      "Mobile-friendly platforms",
    ],
  },
  {
    slug: "cloud-databases",
    title: "Cloud Infrastructure & Databases",
    description:
      "We design, build, and manage the cloud systems your business runs on. From database architecture to deployment pipelines, we make sure your infrastructure is fast, reliable, and scales with you.",
    whoItsFor: "Businesses that need reliable cloud systems and data architecture",
    icon: "Shield",
    features: [
      "Google Cloud Platform (GCP)",
      "Database design & optimization",
      "Cloud Run & serverless deployment",
      "BigQuery & data warehousing",
    ],
  },
  {
    slug: "fractional-cto",
    title: "Fractional CTO",
    description:
      "Senior tech leadership embedded in your business. We own your technology strategy, manage vendors, evaluate tools, and make sure every tech decision moves your business forward.",
    whoItsFor: "Growing businesses that need experienced tech leadership",
    icon: "Briefcase",
    features: [
      "Technology strategy & roadmap",
      "Vendor evaluation & management",
      "Team hiring & mentoring",
      "Architecture & security reviews",
    ],
  },
];

export const SERVICE_OPTIONS = [
  { value: "ai-integration", label: "AI Integration" },
  { value: "connected-data", label: "Connected Data & Analytics" },
  { value: "api-integration", label: "API Integration & Automation" },
  { value: "web-apps", label: "Web Apps & Tools" },
  { value: "cloud-databases", label: "Cloud Infrastructure & Databases" },
  { value: "fractional-cto", label: "Fractional CTO" },
  { value: "other", label: "Other" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "DataSpoke connected all our data sources into one dashboard. We went from guessing to knowing, and it took weeks, not months.",
    author: "Managing Partner",
    role: "Managing Partner",
    company: "Regional Law Firm",
  },
  {
    quote:
      "They integrated AI into our intake process and it cut our processing time by 70%. This is the kind of thing we couldn't have figured out on our own.",
    author: "Business Owner",
    role: "CEO",
    company: "Growing Services Company",
  },
  {
    quote:
      "We finally have a single source of truth for our business. Real-time visibility, automated reports, and no more chasing numbers across spreadsheets.",
    author: "Operations Director",
    role: "Director of Operations",
    company: "Home Services Business",
  },
];

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/nick-paul-8b466818/",
  upwork: "https://upwork.com/freelancers/",
};
