import type { FaqItem } from "@/types";

// Homepage-only copy for the illustration-led design. Short on purpose: the
// pictures carry the explanation. Claims stay general, no numbers.

export const HERO_A = {
  lede: "We connect the software you already pay for, so your numbers are right and busywork runs itself.",
  chips: ["Accurate numbers", "Less retyping", "Faster decisions"],
  primaryCta: "Book your free estimate",
  secondaryCta: { label: "All services", href: "/services" },
};

export const TOOLS_A = [
  "Salesforce",
  "HubSpot",
  "QuickBooks",
  "Xero",
  "Google Workspace",
  "RingCentral",
  "Slack",
  "Stripe",
  "Clio",
  "Mindbody",
];

export const USE_CASES_HEAD = {
  eyebrow: "Where it helps",
  title: "Four places it pays off.",
};

export const SERVICES_A_HEAD = {
  eyebrow: "What we do",
  title: "Start with the foundation.",
  allLink: { label: "Compare all six", href: "/services" },
};

export const EVERY_DEVICE_HEAD = {
  eyebrow: "Custom software",
  title: "One view of your business, on any screen.",
};

export const HOW_A = {
  eyebrow: "How it works",
  title: "See the plan and price first.",
  steps: [
    { title: "Free 30-minute estimate", text: "No obligation." },
    { title: "Written plan and price", text: "Fixed scope, agreed upfront." },
    { title: "Build and hand over", text: "You own all of it." },
  ],
  moreLink: { label: "How an engagement works", href: "/approach" },
};

export const FAQ_A_HEAD = {
  eyebrow: "Plain answers",
  title: "Before you call",
};

/** Three short Q&As. The FAQPage JSON-LD on the page is built from this same array. */
export const FAQS_A: FaqItem[] = [
  {
    question: "Who is DataSpoke for?",
    answer:
      "Established businesses that pay for several tools, such as a CRM, accounting and a phone system, and want them working together.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free 30-minute estimate. Within two business days you get a written plan and price range.",
    link: { label: "free 30-minute estimate", href: "/free-estimate" },
  },
  {
    question: "Do we have to replace the software we already use?",
    answer:
      "No. We build on what you already pay for, and your data stays in accounts you control.",
  },
];

export const CTA_A = {
  title: "Tell us what's slowing you down.",
  text: "A free 30-minute call, then a written plan and price.",
  button: "Book your free estimate",
};
