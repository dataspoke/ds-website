import { ASSESSMENT } from "@/content/approach";
import type { Expertise, Problem } from "@/types";

export const HERO = {
  eyebrow: "For established businesses past $1M in revenue that run on too many tools",
  headline: "Your business, running on its own data.",
  lede:
    "I capture what your business already produces, organize it into something you can trust, and build the dashboards, software and AI that run on it.",
  primaryCta: `Start with the ${ASSESSMENT.name}`,
  secondaryCta: { label: "See the services", href: "/services" },
};

/** The proof line. Shown on the home hero and the About page. */
export const PROOF_LINE = {
  claim: "I doubled my revenue in the last year by running my own business on these tools.",
  offer: "I can do the same for yours.",
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
export const TOOLS = [
  "Salesforce",
  "HubSpot",
  "GoHighLevel",
  "Lawmatics",
  "Clio",
  "QuickBooks",
  "Stripe",
  "RingCentral",
  "Zoom",
  "Google Ads",
  "Meta Ads",
  "Mindbody",
  "Google Workspace",
  "Slack",
  "Airtable",
];

export const PROBLEMS_HEAD = {
  eyebrow: "Sound familiar?",
  title: "Your business knows more than you can see.",
  lede:
    "Most businesses produce more data than they can use. It's spread across SaaS tools, calls, meetings, Slack and public records, and almost none of it is in one place.",
};

export const PROBLEMS: Problem[] = [
  {
    title: "The big systems don't talk to each other.",
    description:
      "CRM, accounting, scheduling, phones. Each one is right about its own piece and wrong about the whole. Month-end means exporting four reports and hoping they match.",
  },
  {
    title: "Data you produce every day and never use.",
    description:
      "Every call, meeting, email and Slack thread is a record of the business. So are the public records about your market. Almost none of it is captured anywhere you can look at it, and AI can't reach any of it.",
  },
  {
    title: "Things that live only in people's heads.",
    description:
      "How a job really gets quoted. Why that customer left. What the Tuesday process actually is. If someone quits, it's gone.",
  },
];

export const PROBLEMS_CLOSE =
  "Capturing that pile is the first step. Organizing it into something you can trust is the second. Every dashboard, app and AI tool runs on those two.";

/** Home: hub-and-spoke grid of the six service lines. */
export const SERVICES_HEAD = {
  eyebrow: "What I do",
  title: "Two foundations. Four things to build on them.",
  lede:
    "Capture and Organize are the hub. Every dashboard, app and AI tool I build runs on them. Most clients start at the hub and add spokes as they go.",
  hubLabel: "The hub",
  spokeLabel: "The spokes",
  allLink: { label: "See all services", href: "/services" },
};

/** Home: featured case studies. */
export const WORK_HEAD = {
  eyebrow: "Work",
  title: "What this looks like in a real business.",
  lede: "Industry and size only. My clients' names and numbers stay theirs.",
  allLink: { label: "See all work", href: "/work" },
  readLabel: "Read the case study",
};

/** Home: how it works. Steps live in STEPS in approach.ts. */
export const HOW_HEAD = {
  eyebrow: "How it works",
  title: "Three steps, no surprises.",
  moreLink: { label: "See the full approach", href: "/approach" },
};

/** Home: about teaser. */
export const ABOUT_TEASER = {
  eyebrow: "About",
  title: "I'm Nick Paul. I help established businesses run on their own data.",
  paragraphs: [
    "The name is the whole idea. Your business is the hub. Every tool you use is a spoke. My job is making the spokes carry data to the hub, so you can see the business clearly and so AI has something real to work with.",
    "You talk to the person doing the work. Plain English, no jargon. You own all of it, documented, so you're never locked in.",
  ],
};

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
