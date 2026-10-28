import type { Expertise, FaqItem, Problem } from "@/types";

// Homepage copy. Every section leads with what changes for the owner, and the
// technology comes second. Claims here stay general: kinds of work, no numbers.

export const HERO = {
  eyebrow: "Data and AI consulting for owner-led businesses",
  headline: "Grow your business with the data you already have.",
  lede:
    "DataSpoke connects the software your business already runs on, so your numbers are right, the retyping stops and your team gets hours back every week. Data, dashboards, custom software and AI for businesses in Connecticut, New York and across the US.",
  /** Three outcomes under the lede, in the spot the proof line used to hold. */
  outcomes: [
    "Know your numbers without chasing spreadsheets.",
    "Save hours of manual work every week.",
    "See where the money is going and decide faster.",
  ],
  primaryCta: "Book your free estimate",
  secondaryCta: { label: "See what each service does for you", href: "/services" },
};

/** Nick's own result, shown on the About page only. Not a client testimonial. */
export const PROOF_LINE = {
  claim: "I doubled my revenue in the last year by running my own business on these tools.",
  offer: "I can set the same thing up for yours.",
};

/** Spokes on the hero diagram: one per area of the business, clockwise from the top. */
export const SPOKES = [
  "Sales",
  "Marketing",
  "Phone calls",
  "Meetings",
  "Operations",
  "Finance",
  "Customers",
  "Documents",
];

/** Text only. Vendor brand rules do not allow logo use without a partner agreement; see public/logos/README.md. */
export const TOOL_GROUPS = [
  {
    label: "CRM",
    tools: ["Salesforce", "HubSpot", "GoHighLevel", "Lawmatics"],
  },
  {
    label: "Marketing",
    tools: ["Google Ads", "Meta Ads"],
  },
  {
    label: "Calls & meetings",
    tools: ["RingCentral", "Zoom", "Fathom"],
  },
  {
    label: "Team tools",
    tools: ["Slack", "Google Workspace", "Airtable"],
  },
  {
    label: "Industry software",
    tools: ["Clio", "Mindbody"],
  },
  {
    label: "Finance",
    tools: ["QuickBooks", "Xero", "Bookkeep", "Stripe", "Gusto", "ADP"],
  },
];

export const TOOLS = TOOL_GROUPS.flatMap((g) => g.tools);

export const PROBLEMS_HEAD = {
  eyebrow: "Sound familiar?",
  title: "You're running a bigger business than your tools let you see.",
  lede:
    "Most businesses already have the information they need. It's spread across the CRM, the accounting software, the phone system, email and people's heads, and nobody has time to pull it together.",
};

export const PROBLEMS: Problem[] = [
  {
    title: "Your programs don't talk to each other.",
    description:
      "Sales, accounting, scheduling and phones each hold part of the story. Month-end means exporting four reports and hoping they match, and someone spends hours retyping what one program already knows into another.",
  },
  {
    title: "You find out too late.",
    description:
      "A customer left, a job went over budget, a lead sat all weekend. The signs were there in your own records. Nobody had a way to see them in time.",
  },
  {
    title: "Growth means more admin, not more profit.",
    description:
      "Every new customer adds follow-ups, invoices and status calls. Right now the only way to handle more of them is to hire someone to do the busywork.",
  },
];

export const PROBLEMS_CLOSE =
  "The fix is the same in every case. Get the information flowing into one place you own, make sure it can be trusted, then put it to work in dashboards, software and AI that do the repetitive parts for you.";

/** Home: hub-and-spoke grid of the six service lines. */
export const SERVICES_HEAD = {
  eyebrow: "What we do",
  title: "Six services, each described by what changes for you.",
  lede:
    "Two services get your information flowing into one place you own and make it trustworthy. Four put it to work. Most clients start with the first two, then add what their business needs most.",
  hubLabel: "The foundation",
  spokeLabel: "What runs on it",
  allLink: { label: "Compare all six services", href: "/services" },
};

/** Home: featured case studies. */
export const WORK_HEAD = {
  eyebrow: "Work",
  title: "What this looks like in a real business.",
  lede: "Industry and size only. Our clients' names and numbers stay theirs.",
  allLink: { label: "Read all the case studies", href: "/work" },
  readLabel: "Read the case study",
};

/** Home: how it works. Steps live in STEPS in approach.ts. */
export const HOW_HEAD = {
  eyebrow: "How it works",
  title: "Three steps, no surprises.",
  moreLink: { label: "See how an engagement works, step by step", href: "/approach" },
};

/** Home: about teaser. Nick speaks in the first person here and on the About page. */
export const ABOUT_TEASER = {
  eyebrow: "About",
  title: "I'm Nick Paul, founder of DataSpoke.",
  paragraphs: [
    "The name is the whole idea. Your business is the hub. Every tool you use is a spoke. DataSpoke makes the spokes carry information to the hub, so you can see the business clearly and so AI has something real to work with.",
    "You work directly with the person who scopes and builds the work. Plain English, no jargon. You own all of it, documented, so you're never locked in.",
  ],
};

/**
 * Home: direct answers to the questions a buyer asks first. Rendered as the
 * visible FAQ and as FAQPage structured data, so assistants can quote them.
 */
export const HOME_FAQS_HEAD = {
  eyebrow: "Plain answers",
  title: "The questions people ask before they call.",
};

export const HOME_FAQS: FaqItem[] = [
  {
    question: "Who is DataSpoke for?",
    answer:
      "Established businesses, from owner-run to mid-size, that already pay for several tools such as a CRM, accounting software and a phone system, and want them to work together. Owners who want to know their numbers and take on more work without hiring come to us most often. We work with companies in Connecticut, New York and across the United States. You do not need a technical background.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free 30-minute estimate. You describe what is slowing your business down, and we ask about the tools you use. Within two business days you get a written estimate with a recommended plan and a price range. There is no obligation, and you keep the estimate either way.",
    link: { label: "free 30-minute estimate", href: "/free-estimate" },
  },
  {
    question: "What do I actually get?",
    answer:
      "Depending on the project: your systems connected so information moves on its own, one trustworthy set of records, dashboards that update themselves, software built around how your team works, AI set up on your own business with your people trained to use it, or analysis that shows where the money is going. Every project has a fixed scope, a price and a finish line you agree to before work starts, and you own every account and every line of code at the end.",
  },
  {
    question: "How long does it take?",
    answer:
      "The free estimate is one 30-minute call, with the written estimate in your hands within two business days. If you want a full map of your systems first, the Data & AI Assessment takes two weeks at a fixed price. Build projects after that are fixed-scope, and the finish line is part of the plan you approve. Nothing is built until you have seen the plan and the price.",
    link: { label: "Data & AI Assessment", href: "/approach#assessment" },
  },
  {
    question: "Do we have to replace the software we already use?",
    answer:
      "No. DataSpoke builds on top of the systems you already pay for, such as Salesforce, HubSpot, QuickBooks, Xero, RingCentral, Google Workspace, Clio and Mindbody. Nothing has to migrate, and your data stays in accounts you control.",
  },
];

export const EXPERTISE: Expertise[] = [
  {
    title: "Operations",
    description:
      "Trained in operations research. I look at how work actually moves through your business, where it waits and what it costs, then fix the flow before adding software to it.",
    example: "Replacing a whiteboard schedule with a planner that reads the real orders.",
  },
  {
    title: "Data science",
    description:
      "Anyone can run a model. Knowing whether it was done right, what the result means and what to do about it on Monday morning is the job. I guide the question, the method and the decision.",
    example: "Ranking which prospects a sales team should call first, and proving the ranking works.",
  },
  {
    title: "Custom software",
    description:
      "When nothing off the shelf fits how your team works, I build the piece that does, on top of the systems you already own, and document it so you're never stuck with me.",
    example: "A customer-facing app that sits on top of the booking system you already pay for.",
  },
];

/** Shown on the home About teaser and the About page. */
export const CREDENTIALS = [
  "Army Engineer officer, combat veteran",
  "B.S. Mathematics · M.S. Operations Research",
  "Data scientist & software developer",
  "5 years consulting for owner-run businesses",
  "Clients nationwide",
];
