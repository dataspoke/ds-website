import type { TextLink } from "@/types";

// Copy for /services/company-brain. "We" voice, like /services/software-factory.
// Describes what DataSpoke sets up for a client, in general terms. Nothing about
// DataSpoke's own internal setup, tools or numbers. No prices, client names,
// quotes or invented stats. Hyphens only, no em or en dashes.
// The longer first-person take lives at /insights/company-brain.

export interface BrainCard {
  title: string;
  note: string;
}

export const BRAIN_PAGE = {
  path: "/services/company-brain",
  metaTitle: "Company Brain Setup for Your Team and AI",
  metaDescription:
    "We write down how your company runs and keep it accurate, current and permission-safe, so your people and AI assistants work from the same picture.",

  eyebrow: "Company brain setup",
  title: "A company brain: one picture of how your company runs, for your people and your AI.",
  lede:
    "We write down your definitions, playbooks and decisions, connect them to your live numbers, and keep the whole thing accurate. Your team and your AI assistants answer from the same source, instead of guessing.",
  intro: ["Built on records you can trust", "Kept current, not set up once", "Each person sees only what they should"],

  /** Hero visual: the layers, top to bottom. */
  stackLabel: "How a company brain is built, top to bottom",
  stack: [
    { name: "Your team and AI assistants", note: "Ask, decide, do the work" },
    { name: "Playbooks", note: "How each job gets done here" },
    { name: "Definitions and decisions", note: "What words mean, what was agreed" },
    { name: "Live numbers", note: "Read from your systems, not pasted in" },
    { name: "One trustworthy set of records", note: "The foundation" },
  ],

  insideEyebrow: "What goes in it",
  insideTitle: "Four things your company already knows, written down once.",
  inside: [
    {
      title: "Definitions",
      note: "What \"active client\", \"booked job\" or \"margin\" means at your company. One answer, used everywhere.",
    },
    {
      title: "Playbooks",
      note: "How each recurring job gets done: intake, proposals, onboarding, month-end. Steps a new hire or an AI can follow.",
    },
    {
      title: "Decisions",
      note: "What was agreed, when, and by whom, linked to the call or email where it happened.",
    },
    {
      title: "Live numbers",
      note: "Pipeline, jobs, cash and tasks read straight from your systems, so answers use today's data.",
    },
  ] satisfies BrainCard[],

  compareEyebrow: "Two ways to build one",
  compareTitle: "Connecting your tools is the easy part.",
  compareLede: "Plugging Slack, Notion and your CRM into an AI gives it a pile to read. A company brain gives it a picture it can trust.",
  compareCols: { wired: "Just connect the tools", ours: "What we set up for you" },
  compareRows: [
    { topic: "What it reads", wired: "Everything, old and new, all mixed together", ours: "Agreed definitions, playbooks and decisions, with sources" },
    { topic: "When facts change", wired: "Old answers stay until someone notices", ours: "An owner and a routine keep it current" },
    { topic: "Who sees what", wired: "Whatever the connector can reach", ours: "Each person and assistant sees only what they are allowed to" },
    { topic: "When two sources disagree", wired: "The AI picks one", ours: "One record wins, and the other gets fixed" },
  ],

  keepEyebrow: "The real work",
  keepTitle: "Accurate, fresh and permission-safe.",
  keepLede: "A company brain is only useful while people trust it. These three are where setups usually break, so they are where we spend the effort.",
  keep: [
    {
      title: "Accurate",
      note: "Every fact links to where it came from. A passing comment never gets treated as company policy.",
    },
    {
      title: "Fresh",
      note: "Each part has an owner and an update habit. Changes to your systems and processes flow back into the written picture.",
    },
    {
      title: "Permission-safe",
      note: "Access follows your existing roles. An AI assistant can never show someone what that person could not open themselves.",
    },
  ] satisfies BrainCard[],

  foundationEyebrow: "The foundation",
  foundationTitle: "It starts with one trustworthy set of records.",
  foundationText:
    "If your CRM, accounting and job records disagree, a company brain just repeats the disagreement faster. That is why we usually start with Data Organization & Warehousing, then build the company brain on top.",
  foundationLinks: [{ label: "Data Organization & Warehousing", href: "/services/organize" }] satisfies TextLink[],

  stepsEyebrow: "How we set it up",
  stepsTitle: "Small first, then wider.",
  steps: [
    { title: "Find the repeat questions", note: "What your team asks every week, and where the answers live today." },
    { title: "Write it down", note: "Definitions, playbooks and recent decisions for one team or one part of the business." },
    { title: "Connect live data", note: "Read-only first, through your own logins, so nothing changes without a person." },
    { title: "Hand over the upkeep", note: "Named owners, a review rhythm and checks that flag anything going stale." },
  ] satisfies BrainCard[],

  readMoreText: "Why a company brain is a data problem, not a tools problem. Read the longer take.",
  readMoreLinks: [{ label: "Read the longer take", href: "/insights/company-brain" }] satisfies TextLink[],

  startEyebrow: "How to start",
  startTitle: "Book a free AI strategy call.",
  startPoints: [
    "A free 30-minute call.",
    "Tell us the questions your team keeps asking, and where two answers disagree today.",
    "Within two business days we send a written estimate with a recommended plan and a price range.",
    "No obligation. You keep the estimate either way.",
  ],
  assessmentNote:
    "If you want a deeper two-week review of your systems and data first, that is the Data & AI Assessment, scoped on that call.",
  assessmentLinks: [{ label: "Data & AI Assessment", href: "/approach#assessment" }] satisfies TextLink[],

  ctaButton: "Book your free AI strategy call",
  ctaSupport:
    "A free 30-minute call, then a written estimate with a recommended plan and a price range within two business days. No obligation.",

  /** Card on the /services index. */
  card: {
    eyebrow: "Want everyone working from the same facts?",
    title: "Company brain setup",
    oneLiner: "One picture of how your company runs, for your people and your AI.",
    summary:
      "We write down your definitions, playbooks and decisions, connect them to your live numbers, and keep them accurate, current and permission-safe.",
    steps: "Definitions · Playbooks · Decisions · Live numbers · Upkeep",
    link: "See company brain setup",
  },
};
