import { SERVICE_LINES } from "@/content/services";
import type { FaqItem, ServiceLineSlug, TextLink } from "@/types";

// Industry pages and the /industries hub. Copy approved in
// docs/plans/industries-pages-2026-11-10/one-pager.html (Draft copy appendix).
// Copy rules: no phone numbers, no state or city names, no prices, no client
// names, no call-answering offer. Name only systems DataSpoke has built on;
// field-service platforms appear only inside a statistic's source.

export type IndustrySlug =
  | "law-firms"
  | "home-services"
  | "gyms-and-fitness"
  | "health-and-wellness"
  | "manufacturing";

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
  | "file-spreadsheet"
  | "user-minus"
  | "smartphone"
  | "split"
  | "users"
  | "truck"
  | "repeat"
  | "file-check"
  | "database"
  | "shield-check";

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
  /** Hub page card. */
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
  {
    slug: "gyms-and-fitness",
    name: "Gyms and fitness",
    audienceName: "gyms",
    audienceType: "Gyms and fitness businesses",
    serviceName: "AI and data consulting for gyms and fitness businesses",
    metaTitle: "AI and Data Consulting for Gyms and Fitness",
    metaDescription:
      "We connect Mindbody, payments and accounting, then build a member app in your brand and reports that flag members at risk. Free AI strategy call.",
    h1: "AI and data consulting for gyms and fitness: see which members are drifting away while there is time to act.",
    definition:
      "DataSpoke is a data and AI consulting firm that works with gyms and fitness businesses across the United States. We connect your booking system, payments and accounting so every member, visit and payment sits in one place you own. Then we build what the business runs on: a member app in your own brand, reports that flag members drifting away, and views of how each trainer and location is doing. You own every account and every line of code.",
    lastUpdated: "2026-11-10",
    card: {
      body: "Booking, payments and member records in one place you own, with a member app in your brand and reports that flag members drifting away.",
    },
    problems: {
      title: "Where members slip away",
      intro:
        "Most gyms learn a member has left when the payment stops, even though the signs were in the booking data weeks earlier.",
      items: [
        { text: "Visits drop off for weeks before anyone notices.", icon: "user-minus" },
        { text: "Members book through a generic app the gym can't change.", icon: "smartphone" },
        { text: "Booking, payment and accounting data sit in separate systems.", icon: "split" },
        { text: "Nobody can say which trainers keep their clients.", icon: "users" },
        { text: "Each location's numbers get pulled and lined up by hand.", icon: "file-spreadsheet" },
      ],
    },
    build: {
      title: "What we build for gyms and fitness businesses",
      intro:
        "We build on the booking system you already pay for, and most gyms start by getting their own data into one place they control.",
      cards: [
        {
          title: "Your data in one place you own",
          body: "A private copy of your booking, payment and member records, kept in accounts you control and updated on its own.",
          serviceSlug: "organize",
        },
        {
          title: "A member app in your own brand",
          body: "Members book and cancel in your app, and your booking system still runs the schedule behind it.",
          serviceSlug: "custom-software",
        },
        {
          title: "Members at risk, flagged in time",
          body: "A list of members whose visits are falling off, so managers can reach them while there is still time.",
          serviceSlug: "analytics-data-science",
        },
        {
          title: "Trainer, location and upsell views",
          body: "See which trainers keep their clients, how each location is trending and where the upsell chances are, without exporting a report.",
          serviceSlug: "metrics-dashboards",
        },
      ],
    },
    systems: {
      title: "Systems we connect for gyms",
      intro:
        "We have built on Mindbody for a gym with several locations, and we connect the rest of your tools to it.",
      primary: ["Mindbody"],
      common: ["Stripe", "Google Workspace", "QuickBooks"],
      commonLabel: "Commonly connected",
      close:
        "Running a different booking system? Tell us on the free AI strategy call, and we check how it lets data in and out before we promise anything.",
    },
    stats: {
      title: "By the numbers",
      intro:
        "Gym membership is at a record high, and keeping those members coming back is where the data helps.",
      tiles: [
        {
          figure: "81 million",
          label: "Americans belonged to a gym, studio or fitness facility in 2025",
          // Primary source: https://www.healthandfitness.org/81-million-americans-were-members-of-a-fitness-facility-in-2025-new-hfa-report-finds/
          source: "An all-time high. Health & Fitness Association, 2026 US Health & Fitness Consumer Report.",
        },
        {
          figure: "4.6%",
          label: "of members did not use their membership at all",
          // Primary source: https://www.healthandfitness.org/81-million-americans-were-members-of-a-fitness-facility-in-2025-new-hfa-report-finds/
          source: "Down from about 10%, an all-time low. Health & Fitness Association, 2026 US Health & Fitness Consumer Report.",
        },
        {
          figure: "23%",
          label: "of members used a personal trainer in 2024",
          // Primary source: https://www.healthandfitness.org/new-hfa-data-shows-how-77-million-us-fitness-facility-members-work-out/
          source:
            "They averaged 21 sessions a year, down from 28 in 2019. Health & Fitness Association, 2025 US Health & Fitness Consumer Report.",
        },
      ],
      close:
        "More members means more booking history to learn from. We put that history to work, so managers see who is drifting away and which trainers keep their clients in time to act on it.",
    },
    outcomes: {
      heading: "From our work with a gym with several locations:",
      items: [
        "Members book in the gym's own app, and the owners own the app, the code and their data.",
        "Managers get a list of members drifting away while there is still time to reach them.",
        "Managers see which trainers keep their clients and where the upsell chances are.",
      ],
    },
    steps: {
      title: "How it works",
      intro: stepsIntro,
      items: [
        {
          title: "Free AI strategy call",
          description: "30 minutes on your booking system, your members and where they slip away, and whether we can help.",
        },
        sharedSteps.estimate,
        sharedSteps.build,
        {
          title: "Hand over",
          description:
            "Every account and line of code in your business's name, with plain-English documentation.",
        },
      ],
      close: "Gyms that want the full map first can start with the two-week Data & AI Assessment.",
      closeLinks: [assessment],
      approachLink,
    },
    faqTitle: "Questions gym owners ask",
    faqs: [
      {
        question: "What does an AI and data consultant do for a gym?",
        answer:
          "An AI and data consultant connects the systems a business already runs, organizes the information in them and puts it to work. For a gym or fitness business, that usually means getting booking, payment and member records into one place you own. Then we build reports that flag members drifting away, views of trainers and locations, and sometimes a member app in your own brand. Most gyms start with their data, because every report after it depends on it.",
      },
      {
        question: "Can you work with Mindbody and the other tools we already use?",
        answer:
          "Yes. We have built on Mindbody for a gym with several locations, including a member app that books through it. Payments, accounting and team tools such as Stripe, QuickBooks and Google Workspace can connect to the same records. If you run a different booking system, we check how it lets data in and out on the free AI strategy call, and we tell you plainly what is possible.",
      },
      {
        question: "How do we spot members who are about to cancel?",
        answer:
          "We look at each member's booking history for the pattern that comes before a cancellation, such as visits falling off over several weeks. Managers get a list of those members for their own locations, while there is still time to reach them. The same data shows which trainers keep their clients and which members might want more, such as personal training.",
      },
      {
        question: "Who owns our member data and the app?",
        answer:
          "You do. Your data sits in accounts your business owns, under logins you control, and a member app we build is yours along with its code. We write down where each kind of data lives and who can see it. Because every account is in your name, you can remove our access at any time.",
      },
      {
        question: "Do we have to replace our booking software?",
        answer:
          "No. We build on the booking system you already pay for. It keeps running the schedule, and members can book through it or through your own app. The goal is for your systems to share information, not for your staff to learn a new one.",
      },
      {
        question: "How do we start?",
        answer:
          "Book a free AI strategy call. It is a 30-minute call about the tools you run and where members slip away. Within two business days you get a written estimate with a recommended plan and a price range, with no obligation to go ahead. Gyms that want the full map first can start with the two-week Data & AI Assessment.",
      },
    ],
    cta: {
      title: "See which members are drifting away.",
      text: "A free 30-minute call about your tools and your members, then a written estimate within two business days.",
      button: CTA_BUTTON,
    },
  },
  {
    slug: "health-and-wellness",
    name: "Health and wellness",
    audienceName: "health and wellness brands",
    audienceType: "Health and wellness businesses",
    serviceName: "AI and data consulting for health and wellness businesses",
    metaTitle: "AI and Data Consulting for Health and Wellness",
    metaDescription:
      "For clinics and supplement brands: we connect your store, shipping and accounting systems, then build customer segments and reports. Free AI strategy call.",
    h1: "AI and data consulting for health and wellness: every order, shipment and customer in one place you own.",
    definition:
      "DataSpoke is a data and AI consulting firm that works with health and wellness businesses across the United States, from clinics to supplement brands. We connect the e-commerce, shipping and accounting systems you already run, bring the data into one place, and build reports, customer segments and tools on top. Customer data stays in accounts your business owns, and you own every line of code.",
    lastUpdated: "2026-11-10",
    card: {
      body: "Clinics and supplement brands: orders, shipping and customer records in one place you own, with customer segments and reports on top.",
    },
    problems: {
      title: "Where the picture breaks",
      intro:
        "Health and wellness businesses collect plenty of data, from orders and shipments to appointments, and it rarely sits in one place.",
      items: [
        { text: "Orders, shipments and payments live in separate systems.", icon: "split" },
        { text: "Shipping costs and delivery problems surface weeks late.", icon: "truck" },
        { text: "Every customer gets the same email, whatever they buy.", icon: "users" },
        { text: "Nobody can say which customers come back and which buy once.", icon: "repeat" },
        { text: "Month-end means exporting and lining up reports by hand.", icon: "file-spreadsheet" },
      ],
    },
    build: {
      title: "What we build for health and wellness businesses",
      intro:
        "We build on the systems you already pay for, and most businesses start by bringing their order and customer data into one place.",
      cards: [
        {
          title: "Orders and shipping in one place",
          body: "Order, shipping and payment data flow into one place on their own, so nobody exports and pastes them together.",
          serviceSlug: "capture",
        },
        {
          title: "Customer segments you can act on",
          body: "Customers grouped by what they buy, how often and how recently, ready for marketing and follow-up.",
          serviceSlug: "analytics-data-science",
        },
        {
          title: "A weekly view of the business",
          body: "Sales, repeat customers, shipping costs and delivery times in one view that updates itself, by product or location.",
          serviceSlug: "metrics-dashboards",
        },
        {
          title: "Customer data in accounts you own",
          body: "Customer records organized in accounts your business owns and controls, with a written map of who can see what.",
          serviceSlug: "organize",
        },
      ],
    },
    systems: {
      title: "Systems we connect",
      intro:
        "We connect the e-commerce, shipping and accounting systems you already run. Clinics add scheduling and billing systems, and we check those the same way.",
      primary: [],
      common: [],
      close:
        "Tell us what you run on the free AI strategy call, and we check how each system lets data in and out before we promise anything.",
    },
    stats: {
      title: "By the numbers",
      intro:
        "Supplements are part of most American households, and a growing share of what people buy arrives by mail.",
      tiles: [
        {
          figure: "75%",
          label: "of US adults use dietary supplements",
          // Primary source: https://crnusa.org/node/7743
          source: "46% use them regularly. Council for Responsible Nutrition, 2026 Consumer Survey on Dietary Supplements.",
        },
        {
          figure: "17.1%",
          label: "of US retail sales were e-commerce in the second quarter of 2026",
          // Primary source: https://www.census.gov/retail/ecommerce.html
          source: "U.S. Census Bureau, Quarterly Retail E-Commerce Sales, 2026.",
        },
      ],
      close:
        "When more sales happen online, more of a business's data lives in order, shipping and payment systems. We bring those together first, so reports, customer segments and AI all read from the same records.",
    },
    outcomes: {
      heading: "From our work with a supplement brand:",
      items: ["Shipping data brought together and customers segmented."],
    },
    steps: {
      title: "How it works",
      intro: stepsIntro,
      items: [
        {
          title: "Free AI strategy call",
          description: "30 minutes on your systems, your customers and where the picture breaks, and whether we can help.",
        },
        sharedSteps.estimate,
        sharedSteps.build,
        {
          title: "Hand over",
          description:
            "Every account and line of code in your business's name, with plain-English documentation.",
        },
      ],
      close: "Businesses that want the full map first can start with the two-week Data & AI Assessment.",
      closeLinks: [assessment],
      approachLink,
    },
    faqTitle: "Questions health and wellness businesses ask",
    faqs: [
      {
        question: "What does an AI and data consultant do for a health and wellness business?",
        answer:
          "An AI and data consultant connects the systems a business already runs, organizes the information in them and puts it to work. For a supplement brand, that often means bringing order, shipping and payment data together and grouping customers by how they buy. For a clinic, it can mean joining scheduling, billing and follow-up records. Then we build reports and tools on top, and set up AI where it saves your team time.",
      },
      {
        question: "Can you connect our online store, shipping and accounting systems?",
        answer:
          "We check on the free AI strategy call before we promise anything. We look at how each system lets data in and out, and we tell you plainly what is possible. For a supplement brand, we brought shipping data together in one place, and the same approach carries over to orders, payments and accounting. If a connection cannot be built, you hear it before the project starts.",
      },
      {
        question: "How do you segment customers?",
        answer:
          "We group customers by what their records show, such as what they buy, how often and how recently. Each segment has a plain definition your team can check, and it updates itself as new orders come in. Marketing and customer service can then reach each group with a message that fits, instead of sending everyone the same email. The segments also feed your reports, so you can see how each group's buying changes over time.",
      },
      {
        question: "Where does our customer data live, and who controls it?",
        answer:
          "Customer data stays in accounts your business owns, under logins you control. We set up reports and AI tools to read only what you give them access to. We write down where each kind of data lives and who can see it, so you can check it against your own obligations. Because every account is in your name, you can remove our access at any time.",
      },
      {
        question: "Do we have to replace our software?",
        answer:
          "No. We build on the store, shipping, scheduling and accounting systems you already pay for. Supplement brands keep their store and shipping tools, and clinics keep their scheduling and billing systems. The goal is for those systems to share information, not for your team to learn a new one.",
      },
      {
        question: "How do we start?",
        answer:
          "Book a free AI strategy call. It is a 30-minute call about the tools you run and where your data stops lining up. Within two business days you get a written estimate with a recommended plan and a price range, with no obligation to go ahead. Businesses that want the full map first can start with the two-week Data & AI Assessment.",
      },
    ],
    cta: {
      title: "See your customers and orders in one place.",
      text: "A free 30-minute call about your tools and your customers, then a written estimate within two business days.",
      button: CTA_BUTTON,
    },
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    audienceName: "manufacturers",
    audienceType: "Manufacturers",
    serviceName: "AI and data consulting for manufacturers",
    metaTitle: "AI and Data Consulting for Manufacturers",
    metaDescription:
      "We copy plant data out of validated systems into one place you own, then build scheduling tools, customer portals and dashboards. Free AI strategy call.",
    h1: "AI and data consulting for manufacturers: put plant data to work without touching validated systems.",
    definition:
      "DataSpoke is a data and AI consulting firm that works with manufacturers across the United States, including contract and regulated manufacturers. We copy data out of the systems your plant runs into a separate place you own, so validated systems are read from and never written to. Then we build the planning tools, customer portals, dashboards and AI your team runs on. You own every account and every line of code.",
    lastUpdated: "2026-11-10",
    card: {
      body: "Contract and regulated manufacturers: plant data copied into one place you own, with scheduling tools, a customer portal and dashboards on top.",
    },
    problems: {
      title: "Where the plant loses time",
      intro:
        "Plants run on several systems that were never meant to share data, and in a regulated plant nobody wants to risk touching the validated ones.",
      items: [
        { text: "The production schedule lives in a spreadsheet one person maintains.", icon: "calendar-clock" },
        { text: "Customers email for certificates, and someone digs each one out by hand.", icon: "file-check" },
        { text: "Reporting means exporting from validated systems, one file at a time.", icon: "database" },
        { text: "Production, quality and shipping numbers disagree from report to report.", icon: "git-compare-arrows" },
        { text: "Changing a validated system for a report would mean revalidating it.", icon: "shield-check" },
      ],
    },
    build: {
      title: "What we build for manufacturers",
      intro:
        "We build beside the systems your plant already runs, and most manufacturers start by getting a copy of their data somewhere it can be used safely.",
      cards: [
        {
          title: "A data lake beside your validated systems",
          body: "Data is copied out of validated systems into a separate data lake you own, so reports and tools never touch the systems themselves.",
          serviceSlug: "organize",
        },
        {
          title: "A scheduling planner for the floor",
          body: "Planners build the production schedule in one tool, and it writes to the floor calendar so every shift works from the same plan.",
          serviceSlug: "custom-software",
        },
        {
          title: "A certificate portal for customers",
          body: "Customers find the certificates for their orders in a portal on their own, instead of emailing your team and waiting.",
          serviceSlug: "custom-software",
        },
        {
          title: "Production and quality numbers in one view",
          body: "Output, schedule changes, quality results and shipments in one view that updates itself from the data lake.",
          serviceSlug: "metrics-dashboards",
        },
      ],
    },
    systems: {
      title: "Systems we connect",
      intro:
        "Plants run a mix of planning, quality, inventory and accounting systems, and some of them are validated. We read from them and copy the data out, and we never change them.",
      primary: [],
      common: [],
      close:
        "Tell us what your plant runs on the free AI strategy call, and we check how each system lets data out before we promise anything.",
    },
    stats: {
      title: "By the numbers",
      intro:
        "Manufacturers expect smart manufacturing to decide who stays competitive, and few have put AI to work across the plant.",
      tiles: [
        {
          figure: "92%",
          label: "of manufacturers surveyed say smart manufacturing will be the main driver of competitiveness over the next three years",
          // Primary source: https://www.deloitte.com/us/en/about/press-room/deloitte-2025-smart-manufacturing-survey.html
          source: "Deloitte, 2025 Smart Manufacturing Survey.",
        },
        {
          figure: "29%",
          label: "use AI or machine learning at the facility or network level",
          // Primary source: https://www.deloitte.com/us/en/about/press-room/deloitte-2025-smart-manufacturing-survey.html
          source: "Deloitte, 2025 Smart Manufacturing Survey.",
        },
        {
          figure: "400,000",
          label: "private manufacturing establishments, employing about 12.6 million people",
          // Primary source: https://data.bls.gov/cew/data/api/2025/a/industry/31_33.csv
          source:
            "About 400,000. U.S. Bureau of Labor Statistics, Quarterly Census of Employment and Wages, 2025 annual averages.",
        },
      ],
      close:
        "AI is only as useful as the records it reads, and in a regulated plant those records sit in systems nobody wants to touch. A separate copy of the data gives AI, dashboards and planning tools something to read with no risk to the validated systems.",
    },
    outcomes: {
      heading: "From our work with a contract processor in a regulated industry:",
      items: [
        "A production scheduling planner that writes to the floor calendar.",
        "A certificate portal for the processor's customers.",
        "Data copied out of validated systems into a separate data lake, so the validated systems are never touched.",
      ],
    },
    steps: {
      title: "How it works",
      intro: stepsIntro,
      items: [
        {
          title: "Free AI strategy call",
          description: "30 minutes on your systems, your schedule and where time goes, and whether we can help.",
        },
        sharedSteps.estimate,
        sharedSteps.build,
        {
          title: "Hand over",
          description:
            "Every account and line of code in your company's name, with plain-English documentation.",
        },
      ],
      close: "Manufacturers that want the full map first can start with the two-week Data & AI Assessment.",
      closeLinks: [assessment],
      approachLink,
    },
    faqTitle: "Questions manufacturers ask",
    faqs: [
      {
        question: "What does an AI and data consultant do for a manufacturer?",
        answer:
          "An AI and data consultant connects the systems a business already runs, organizes the information in them and puts it to work. For a manufacturer, that usually means copying data out of production, quality and shipping systems into one place the company owns. Then we build tools on top, such as a scheduling planner, a customer certificate portal or a dashboard for output and quality. Most manufacturers start with the data copy, because every tool after it reads from there.",
      },
      {
        question: "Can you work with the systems our plant already runs?",
        answer:
          "We check on the free AI strategy call before we promise anything. We look at how each system lets data out, whether through an export, a database or an interface the vendor provides, and we tell you plainly what is possible. If a connection cannot be built, you hear it before the project starts.",
      },
      {
        question: "How do we get production and quality numbers we can trust?",
        answer:
          "We bring production, schedule, quality and shipping data into one place and define each number once, such as output per line or on-time shipments. A dashboard reads from that one place and updates itself, so the plant manager and the front office see the same figures. When two numbers disagree, you can trace each one back to its source.",
      },
      {
        question: "How do you handle validated systems and the audit trail?",
        answer:
          "Validated systems are read from, never written to. We copy data out of them into a separate data lake, so the validated systems and their audit trails stay as they are. We write down which data is copied, from where and how often, so your quality team can review it. Tools we build, such as a scheduling planner, write only to systems outside the validated set, like the floor calendar.",
      },
      {
        question: "Do we have to replace our software?",
        answer:
          "No. We build beside the systems you already run. Your planning, quality and accounting systems stay in place, and the tools we add read from a copy of their data.",
      },
      {
        question: "How do we start?",
        answer:
          "Book a free AI strategy call. It is a 30-minute call about the systems you run and where time goes on the floor. Within two business days you get a written estimate with a recommended plan and a price range, with no obligation to go ahead. Manufacturers that want the full map first can start with the two-week Data & AI Assessment.",
      },
    ],
    cta: {
      title: "Put your plant's data to work.",
      text: "A free 30-minute call about your systems and where time goes, then a written estimate within two business days.",
      button: CTA_BUTTON,
    },
  },
];

export const INDUSTRIES_HUB = {
  path: "/industries",
  name: "Industries",
  metaTitle: "Industries We've Worked In",
  metaDescription:
    "DataSpoke is a data and AI consulting firm. We connect the systems a business runs and build dashboards, tools and AI on top, in many industries.",
  h1: "Industries we've worked in",
  definition:
    "DataSpoke is a data and AI consulting firm for established businesses across the United States. We connect the systems a business already runs, organize the data in them and build dashboards, custom tools and AI on top, and that work carries from one industry to the next.",
  cardLink: "See the page",
  /** Industries we have worked in with no page of their own. Shown after the linked cards, without a link. */
  unlinked: [{ name: "Government", body: "Human resources and intelligence data work for government teams." }],
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

/** The sentence on each service page that links its industries: "We've built this for law firms, home service companies and gyms." */
export const SERVICE_INDUSTRIES_SENTENCE = { lead: "We've built this for", join: "and" };

/** Industries named on each service page. Kept to two or three so the sentence stays short. */
const SERVICE_INDUSTRIES: Record<ServiceLineSlug, IndustrySlug[]> = {
  capture: ["law-firms", "home-services", "health-and-wellness"],
  organize: ["law-firms", "manufacturing"],
  "metrics-dashboards": ["home-services", "gyms-and-fitness"],
  "custom-software": ["home-services", "gyms-and-fitness", "manufacturing"],
  "ai-implementation": ["law-firms"],
  "analytics-data-science": ["home-services", "health-and-wellness"],
};

/** Industries linked from a service page, in INDUSTRIES order. Drives the service page link sentence. */
export function industriesForService(slug: ServiceLineSlug): Industry[] {
  const slugs = SERVICE_INDUSTRIES[slug] ?? [];
  return INDUSTRIES.filter((i) => slugs.includes(i.slug));
}
