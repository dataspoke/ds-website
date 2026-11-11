import { SERVICE_LINES } from "@/content/services";
import type { FaqItem, ServiceLineSlug, TextLink } from "@/types";

// Industry pages and the /industries hub. Copy approved in
// docs/plans/industries-pages-2026-11-10/one-pager.html (Draft copy appendix).
// Copy rules: no phone numbers, no state or city names, no prices, no client
// names, no call-answering offer. Name only systems DataSpoke has built on;
// field-service platforms appear only inside a statistic's source.

export type IndustrySlug = "law-firms" | "home-services";

/** Lucide icon names, mapped to components on the page. */
export type ProblemIcon =
  | "inbox"
  | "keyboard"
  | "megaphone"
  | "git-compare-arrows"
  | "video-off"
  | "calendar-clock"
  | "target"
  | "user-search"
  | "file-spreadsheet";

export interface IndustryBuildCard {
  title: string;
  body: string;
  serviceSlug: ServiceLineSlug;
}

export interface IndustryStat {
  figure: string;
  label: string;
  /** Fine print under the tile: context, then publisher, report and year. */
  source: string;
}

export interface IndustryStep {
  title: string;
  description: string;
}

export interface Industry {
  slug: IndustrySlug;
  /** Breadcrumb, footer and card name. */
  name: string;
  /** Lower-case audience in a sentence, e.g. "We build this for law firms". */
  audienceName: string;
  /** schema.org BusinessAudience audienceType. */
  audienceType: string;
  /** schema.org Service name. */
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  definition: string;
  /** YYYY-MM-DD, shown as "Last updated". */
  lastUpdated: string;
  /** Hub and home page card. */
  card: { body: string };
  problems: { title: string; intro: string; items: { text: string; icon: ProblemIcon }[] };
  build: { title: string; intro: string; cards: IndustryBuildCard[] };
  systems: {
    title: string;
    intro: string;
    primary: string[];
    /** Shown under a "Commonly connected" label when `commonLabel` is set. */
    common: string[];
    commonLabel?: string;
    close: string;
  };
  stats: { title: string; intro: string; tiles: IndustryStat[]; close: string };
  /** DataSpoke results in this industry, named by industry only. */
  outcomes?: { heading: string; items: string[] };
  steps: {
    title: string;
    intro: string;
    items: IndustryStep[];
    close: string;
    closeLinks: TextLink[];
    approachLink: TextLink;
  };
  faqTitle: string;
  faqs: FaqItem[];
  cta: { title: string; text: string; button: string };
}

const assessment: TextLink = { label: "Data & AI Assessment", href: "/approach#assessment" };
const approachLink: TextLink = { label: "See how an engagement works", href: "/approach" };
const CTA_BUTTON = "Book your free AI strategy call";
/** schema.org serviceType on each industry page. */
export const INDUSTRY_SERVICE_TYPE = "AI and data consulting";

const stepsIntro =
  "Every engagement follows the same steps: you see a plan and a price range before anything is built, and you own everything at the end.";

const sharedSteps = {
  estimate: {
    title: "Written estimate in two business days",
    description: "A recommended plan and price range, with no obligation to go ahead.",
  },
  build: {
    title: "Fixed-scope build",
    description: "Projects taken straight from the plan, each with a finish line you can check.",
  },
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "law-firms",
    name: "Law firms",
    audienceName: "law firms",
    audienceType: "Law firms",
    serviceName: "AI and data consulting for law firms",
    metaTitle: "AI and Data Consulting for Law Firms",
    metaDescription:
      "We connect Lawmatics, Clio, your phones and billing, then build intake dashboards and AI drafts a lawyer approves. Nationwide. Free AI strategy call.",
    h1: "AI and data consulting for law firms: every lead, call and matter in one place you own.",
    definition:
      "DataSpoke is a data and AI consulting firm for law firms across the United States. We connect your intake CRM, practice management, phones and accounting so every lead, call and matter sits in one record. Then we build dashboards for intake and revenue by case type, and set up AI that drafts from your firm's own files, with a lawyer approving every word. You own every account and every line of code.",
    lastUpdated: "2026-11-10",
    card: {
      body: "Intake, phones, practice management and billing in one record you own, with a weekly intake scorecard and AI drafts a lawyer approves.",
    },
    problems: {
      title: "Where firms lose cases and hours",
      intro:
        "Most firms lose prospective clients and billable hours in the gaps between their tools, and these five gaps show up in almost every firm we talk to.",
      items: [
        { text: "A web lead sits in a shared inbox overnight, with no owner.", icon: "inbox" },
        { text: "Intake details get retyped into the case system, then into billing.", icon: "keyboard" },
        { text: "Nobody can say which ad source actually signs cases.", icon: "megaphone" },
        { text: "Partners argue over whose report is right before using the numbers.", icon: "git-compare-arrows" },
        { text: "Decisions made on client calls get lost within weeks.", icon: "video-off" },
      ],
    },
    build: {
      title: "What we build for law firms",
      intro:
        "We build on the software your firm already pays for, and most firms start with intake because every report depends on it.",
      cards: [
        {
          title: "Intake connected to the matter",
          body: "Every web form, email and call lands in your intake CRM with its source attached, then becomes the matter in practice management without retyping.",
          serviceSlug: "capture",
        },
        {
          title: "One record per client and matter",
          body: "Intake, matter, billing and call history sit in one organized record your firm owns, so every report and AI tool agrees.",
          serviceSlug: "organize",
        },
        {
          title: "A weekly intake and revenue scorecard",
          body: "Leads, consultations, signed cases and collected revenue by source and case type, ready before the Monday meeting with nothing built by hand.",
          serviceSlug: "metrics-dashboards",
        },
        {
          title: "AI on your own files, lawyer-approved",
          body: "An assistant drafts intake summaries, follow-up emails and first-pass letters from your firm's own files, and a lawyer approves every draft.",
          serviceSlug: "ai-implementation",
        },
      ],
    },
    systems: {
      title: "Systems we connect for firms",
      intro:
        "We work with the software your firm already runs, and we have built on Lawmatics and Clio for law firms.",
      primary: ["Lawmatics", "Clio"],
      common: ["RingCentral", "Zoom", "Fathom", "QuickBooks", "Google Workspace", "Google Ads", "Meta Ads"],
      close:
        "Running something else? Tell us on the free AI strategy call, and we will say plainly whether we have connected it before.",
    },
    stats: {
      title: "By the numbers",
      intro:
        "Clio, the practice management company, surveys firms across the profession every year, and its numbers show the same gaps.",
      tiles: [
        {
          figure: "33%",
          label: "of 500 firms replied to a prospective client's email",
          // Primary source: https://www.clio.com/about/press/clio-latest-legal-trends-report/
          source: "Down from 40% in 2019. Clio, Legal Trends Report, 2024.",
        },
        {
          figure: "48%",
          label: "of firms were essentially unreachable by phone",
          // Primary source: https://www.clio.com/about/press/clio-latest-legal-trends-report/
          source: "Only 40% answered calls, down from 56% in 2019. Clio, Legal Trends Report, 2024.",
        },
        {
          figure: "38%",
          label: "average utilization: about 3 of every 8 working hours billed",
          // Primary source: https://www.clio.com/resources/legal-trends/ (2025 report, Appendix A, p. 62)
          source: "Firms collect on roughly 2.4 hours of work per day. Clio, Legal Trends Report, 2025.",
        },
      ],
      close:
        "We do not take your calls for you. We make sure every call, form and email becomes a lead in your intake CRM with an owner and a next step, and we take the retyping and report-building off the people whose hours you bill.",
    },
    steps: {
      title: "How it works",
      intro: stepsIntro,
      items: [
        {
          title: "Free AI strategy call",
          description: "30 minutes on where leads and hours slip away, and whether we can help.",
        },
        sharedSteps.estimate,
        sharedSteps.build,
        {
          title: "Hand over",
          description: "Every account and line of code in the firm's name, with plain-English documentation.",
        },
      ],
      close: "Firms that want the full map first can start with the two-week Data & AI Assessment.",
      closeLinks: [assessment],
      approachLink,
    },
    faqTitle: "Questions law firms ask",
    faqs: [
      {
        question: "What does an AI and data consultant do for a law firm?",
        answer:
          "An AI and data consultant connects the systems a firm already runs, organizes the information in them and puts it to work. For a law firm, that usually means linking intake, practice management, phones and accounting. Then we build a scorecard for intake and revenue, and set up AI that drafts from the firm's own files. We do not give legal advice, and we do not replace your case management software. Most firms start with intake, because every report and AI tool depends on clean intake records.",
      },
      {
        question: "Can you connect Clio or Lawmatics to our intake forms, phones and accounting?",
        answer:
          "Yes. We have built on both Lawmatics and Clio for law firms. Common connections send web forms and email into Lawmatics, put RingCentral call logs on the right lead or matter, open a matter in Clio when an intake signs, and carry billing into QuickBooks. We confirm what your setup allows on the free AI strategy call before we promise anything, and if you run different software, we tell you what it would take.",
      },
      {
        question: "How do we see which marketing source signs cases?",
        answer:
          "We carry the source of each lead from first contact to signed matter and collected fee. Ad spend from Google Ads and Meta Ads, intake records from your CRM and revenue from billing go into one dashboard that updates itself. You see cost per signed case by source and by case type, without anyone exporting a report, so you know which campaigns to grow and which to cut.",
      },
      {
        question: "How do you keep client data confidential when we use AI?",
        answer:
          "Your data stays in accounts the firm owns, under logins the firm controls. We set up AI tools to read only what you give them access to, and nothing goes to a client or a court until a lawyer approves it. We write down where each kind of data lives and who can see it, so your firm can check it against its own confidentiality duties. Because every account is in the firm's name, the firm can remove our access at any time.",
      },
      {
        question: "Do we have to replace our case management software?",
        answer:
          "No. We build on the systems you already pay for, such as Clio and Lawmatics. The goal is for those systems to share information, not for your team to learn a new one. Your intake team keeps working in Lawmatics, and your lawyers keep working in Clio.",
      },
      {
        question: "How do we start?",
        answer:
          "Book a free AI strategy call. It is a 30-minute call about the tools you run and where leads and hours slip away. Within two business days you get a written estimate with a recommended plan and a price range, with no obligation to go ahead. Firms that want the full map first can start with the two-week Data & AI Assessment.",
      },
    ],
    cta: {
      title: "See where your firm's leads and hours go.",
      text: "A free 30-minute call about your tools and where leads slip away, then a written estimate within two business days.",
      button: CTA_BUTTON,
    },
  },
  {
    slug: "home-services",
    name: "Home services",
    audienceName: "home service companies",
    audienceType: "Home service businesses",
    serviceName: "AI and data consulting for home services",
    metaTitle: "AI and Data Consulting for Home Services",
    metaDescription:
      "Trace every ad dollar to a booked, paid job. We connect Salesforce, your ad accounts and accounting, then build a weekly scorecard. Free AI strategy call.",
    h1: "AI and data consulting for home service companies: trace every ad dollar to a paid job.",
    definition:
      "DataSpoke is a data and AI consulting firm for home service companies across the United States, including roofing, HVAC, plumbing and other trades. We connect your CRM, ad accounts and accounting so every lead is counted, build a weekly scorecard your managers run on, and put AI to work on the office busywork. You own every account and every line of code.",
    lastUpdated: "2026-11-10",
    card: {
      body: "Roofing, HVAC, plumbing and other trades: every lead counted, every ad dollar traced to a paid job, and a weekly scorecard for your managers.",
    },
    problems: {
      title: "Where the money leaks",
      intro:
        "A home service company can spend heavily on ads, lead vendors and canvassing and still not know what a paying customer costs.",
      items: [
        { text: "A weekend lead sits unseen until the office opens Monday.", icon: "calendar-clock" },
        { text: "Office staff retype vendor leads into the CRM by hand.", icon: "keyboard" },
        { text: "Ad reports count conversions the sales team can't find.", icon: "target" },
        { text: "Close rate by lead source and by rep is a guess.", icon: "user-search" },
        { text: "Month-end means a day spent exporting and lining up four reports.", icon: "file-spreadsheet" },
      ],
    },
    build: {
      title: "What we build for home service companies",
      intro:
        "We build on the systems you already pay for, and most companies start with leads because every cost figure depends on counting them.",
      cards: [
        {
          title: "One front door for every lead",
          body: "Forms, ad platforms and lead vendors feed one place that checks each lead, catches duplicates and creates it in your CRM with its source.",
          serviceSlug: "capture",
        },
        {
          title: "Ad dollar to paid job",
          body: "We match every booked and paid job to the channel that produced it, and join ad spend, labor and revenue into cost per paying job.",
          serviceSlug: "analytics-data-science",
        },
        {
          title: "A weekly scorecard from the goal down",
          body: "Five to ten weekly numbers that move your yearly goal, such as leads, appointments and close rate, each with an owner and a target.",
          serviceSlug: "metrics-dashboards",
        },
        {
          title: "Internal tools and a customer portal",
          body: "A screen that shows each person in the office and on crews their own work, and a page where customers see job status and invoices.",
          serviceSlug: "custom-software",
        },
      ],
    },
    systems: {
      title: "Systems we connect",
      intro:
        "We have built on Salesforce for home service companies and connect the rest to it, so nothing has to migrate.",
      primary: ["Salesforce"],
      common: ["Google Ads", "Meta Ads", "QuickBooks"],
      commonLabel: "Commonly connected",
      close:
        "Running different software? Tell us on the free AI strategy call, and we check how it lets data in and out before we promise anything.",
    },
    stats: {
      title: "By the numbers",
      intro: "Most contractors know their data could work harder, and few have it set up to.",
      tiles: [
        {
          figure: "74%",
          label: "of residential contractors see AI as a way to run more efficiently",
          // Primary source: https://servicetitan.com/press/servicetitan-report-finds-74-of-residential-contractors-see-ai-as-key
          source: "Only about 25% use it. ServiceTitan, Residential State of the Trades Report, 2026.",
        },
        {
          figure: "4%",
          label: "of roofing and exteriors contractors use AI built into their CRM",
          // Primary source: https://www.servicetitan.com/blog/roofing-exteriors-market-report-2026
          source: "ServiceTitan, Roofing & Exteriors Market Report, 2026.",
        },
        {
          figure: "598,000",
          label: "specialty trade contractor establishments, employing about 5.3 million people",
          // Primary source: https://www.bls.gov/iag/tgs/iag238.htm (preliminary figures)
          source:
            "About 598,000. U.S. Bureau of Labor Statistics, Industries at a Glance, NAICS 238, 2026, preliminary.",
        },
      ],
      close:
        "AI is only as useful as the records it reads, so we connect the CRM, ad accounts, payroll and books first. Then AI can draft the follow-up, summarize the job file or flag the lead nobody called back.",
    },
    outcomes: {
      heading: "From our work with a roofing contractor:",
      items: [
        "Web and agency leads reach the CRM in under a minute. Nobody retypes them.",
        "Every sale traces back to a channel. Reports agree because they read the same data.",
        "One trusted cost per paying job across five channels. Building it showed that nearly half the field marketing team was missing from labor cost.",
      ],
    },
    steps: {
      title: "How it works",
      intro: stepsIntro,
      items: [
        {
          title: "Free AI strategy call",
          description: "30 minutes on where leads and money slip away, and whether we can help.",
        },
        sharedSteps.estimate,
        sharedSteps.build,
        {
          title: "Hand over",
          description:
            "Every account and line of code in your company's name, with plain-English documentation.",
        },
      ],
      close: "Companies that want the full map first can start with the two-week Data & AI Assessment.",
      closeLinks: [assessment],
      approachLink,
    },
    faqTitle: "Questions home service owners ask",
    faqs: [
      {
        question: "What does an AI and data consultant do for a home service company?",
        answer:
          "An AI and data consultant connects the systems a company already runs, organizes the information in them and puts it to work. For a home service company, that usually means getting every lead into the CRM with its source, tying ad spend to booked and paid jobs, and building a weekly scorecard. Then we put AI to work on the office tasks your staff retype today, with a person approving what it writes. Most companies start with leads, because cost per job and every report after it depend on every lead being counted.",
      },
      {
        question: "How do we tell which ads produce booked and paid jobs?",
        answer:
          "We carry the source of each lead from the first click or call to the paid invoice. Ad spend from Google Ads and Meta Ads, leads and jobs from your CRM and payments from accounting go into one dashboard. You see cost per paying job by channel, and the dashboard updates itself, so you know which channels to grow and which to cut.",
      },
      {
        question: "Can you work with the field-service software and CRM we already use?",
        answer:
          "We check on the free AI strategy call before we promise anything. We have built on Salesforce for home service companies. For other field-service software, we look at how it lets data in and out, and we tell you plainly what is possible and what is not. If a connection cannot be built, you hear it before the project starts.",
      },
      {
        question: "What belongs on a weekly scorecard for a trades business?",
        answer:
          "Five to ten numbers that move your yearly goal, each with an owner and a target. Common ones are leads by source, appointments set, close rate by rep, jobs completed, average job value and cost per paying job by channel. We pick them with you, starting from the goal rather than from whatever data is easy to pull. The scorecard then updates itself from your systems, so nobody builds it by hand.",
      },
      {
        question: "Do our office staff need to be technical?",
        answer:
          "No. We build the connections and the scorecard, and we train your team on the parts they use. They keep working in the tools they know, with less retyping, and every account and every line of code is yours, with plain-English documentation.",
      },
      {
        question: "How do we start?",
        answer:
          "Book a free AI strategy call. It is a 30-minute call about the tools you run and where leads and money slip away. Within two business days you get a written estimate with a recommended plan and a price range, with no obligation to go ahead. Companies that want the full map first can start with the two-week Data & AI Assessment.",
      },
    ],
    cta: {
      title: "Find out what a paying job really costs you.",
      text: "A free 30-minute call about your tools and where leads slip away, then a written estimate within two business days.",
      button: CTA_BUTTON,
    },
  },
];

export const INDUSTRIES_HUB = {
  path: "/industries",
  name: "Industries",
  metaTitle: "Industries We Serve",
  metaDescription:
    "DataSpoke is a data and AI consulting firm for law firms and home service companies across the United States. See what we build for each industry.",
  h1: "Industries we serve",
  definition:
    "DataSpoke is a data and AI consulting firm for established businesses across the United States. We connect the software you already run, organize the information in it and put it to work in dashboards, custom tools and AI. We work in many industries, and we go deepest in two: law firms and home service companies.",
  cardLink: "See the page",
  notListed: {
    title: "Not on the list?",
    text: "The work is the same in every industry: connect what you run, organize it, then build on top. If your industry is not listed, tell us on a free AI strategy call and we will say honestly whether we are a fit.",
  },
  cta: {
    title: "Start with a 30-minute call.",
    text: "A free AI strategy call, then a written estimate with a recommended plan within two business days.",
    button: CTA_BUTTON,
  },
};

/** Labels shared by the industry page template. */
export const INDUSTRY_PAGE = {
  eyebrow: "Industries",
  lastUpdated: "Last updated",
  seeService: "See the service",
  stepLabel: (n: number) => `Step ${n}`,
};

export function industryPath(slug: IndustrySlug): string {
  return `${INDUSTRIES_HUB.path}/${slug}`;
}

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

/** Service page title and href for a build card, read from SERVICE_LINES. */
export function buildCardService(card: IndustryBuildCard): { title: string; href: string } {
  const line = SERVICE_LINES.find((l) => l.slug === card.serviceSlug);
  if (!line) throw new Error(`Unknown service line: ${card.serviceSlug}`);
  return { title: line.title, href: `/services/${line.slug}` };
}

/** The sentence on each service page that links its industries: "We build this for law firms and home service companies." */
export const SERVICE_INDUSTRIES_SENTENCE = { lead: "We build this for", join: "and" };

/** Industries whose build cards use this service, in INDUSTRIES order. Drives the service page link sentence. */
export function industriesForService(slug: ServiceLineSlug): Industry[] {
  return INDUSTRIES.filter((i) => i.build.cards.some((c) => c.serviceSlug === slug));
}
