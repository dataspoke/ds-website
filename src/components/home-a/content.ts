import { HOME_FAQS } from "@/content/home";
import type { FaqItem } from "@/types";

// Homepage-only copy for the illustration-led design. Short on purpose: the
// pictures carry the explanation. Claims stay general, no numbers.

export const HERO_A = {
  lede: "We connect the software you already pay for, so your numbers are right and the busywork runs itself.",
  chips: ["Accurate numbers", "Less retyping", "Faster decisions"],
  primaryCta: "Book your free estimate",
  secondaryCta: { label: "See the services", href: "/services" },
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
  title: "Four places AI and connected data pay off.",
};

export const SERVICES_A_HEAD = {
  eyebrow: "What we do",
  title: "Six services. Start with the foundation, add what you need.",
  allLink: { label: "Compare all six", href: "/services" },
};

export const HOW_A = {
  eyebrow: "How it works",
  title: "See the plan and price first. Own everything at the end.",
  steps: [
    { title: "Free 30-minute estimate", text: "Tell us what's slowing you down." },
    { title: "Written plan and price", text: "Fixed scope, agreed before any build." },
    { title: "Build and hand over", text: "You own every account and every line of code." },
  ],
  moreLink: { label: "How an engagement works", href: "/approach" },
};

export const FAQ_A_HEAD = {
  eyebrow: "Plain answers",
  title: "Before you call",
};

/** Three of the site FAQs, text unchanged, so the FAQPage schema matches what is on the page. */
export const FAQS_A: FaqItem[] = HOME_FAQS.filter((f) =>
  [
    "Who is DataSpoke for?",
    "How do I get started?",
    "Do we have to replace the software we already use?",
  ].includes(f.question)
);

export const CTA_A = {
  title: "Tell us what's slowing you down.",
  text: "A free 30-minute call, then a written estimate with a plan and a price range.",
  button: "Book your free estimate",
};
