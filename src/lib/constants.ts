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
      "We embed AI directly into your business workflows — from intelligent document processing to custom chatbots that handle real customer questions. Not buzzwords, real tools that save your team hours every week.",
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
      "Your data lives in a dozen different places. We connect it all — CRMs, ad platforms, spreadsheets, databases — into a single view so you can finally see what's actually happening in your business.",
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
    slug: "crm-implementation",
    title: "CRM Implementation",
    description:
      "Expert implementation of Lawmatics, Clio, Salesforce, and custom CRM solutions. From migration to training, we get your team up and running fast with systems that actually get used.",
    whoItsFor: "Law firms and professional services needing CRM systems",
    icon: "Users",
    features: [
      "Lawmatics & Clio setup",
      "Data migration & cleanup",
      "Workflow automation",
      "Team training & adoption",
    ],
  },
  {
    slug: "custom-development",
    title: "Custom Development",
    description:
      "When off-the-shelf tools don't cut it, we build exactly what you need. Web applications, internal tools, APIs, and integrations — designed around how your business actually works.",
    whoItsFor: "Companies that need software built for their specific workflows",
    icon: "Code",
    features: [
      "Web applications & portals",
      "Internal tools & dashboards",
      "API development & integration",
      "Database design & optimization",
    ],
  },
  {
    slug: "data-security",
    title: "Data Security & Governance",
    description:
      "Protect your data and stay compliant as you grow. We set up the policies, controls, and infrastructure to keep your business secure — enterprise-grade practices, right-sized for you.",
    whoItsFor: "Businesses handling sensitive data that need proper security",
    icon: "Shield",
    features: [
      "Security assessments & policies",
      "Data governance frameworks",
      "Compliance & privacy controls",
      "Access management & monitoring",
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
  { value: "crm-implementation", label: "CRM Implementation" },
  { value: "custom-development", label: "Custom Development" },
  { value: "data-security", label: "Data Security & Governance" },
  { value: "fractional-cto", label: "Fractional CTO" },
  { value: "other", label: "Other" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "DataSpoke connected all our data sources into one dashboard. We went from guessing to knowing — and it took weeks, not months.",
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
