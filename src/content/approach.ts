import type { Step } from "@/types";

export const ASSESSMENT = {
  name: "Data & AI Assessment",
  price: "$999",
  terms: "fixed price · 2 weeks",
  lede:
    "Two weeks. We list every system and data source your company runs on, score how connected and AI‑ready it is today and hand you a prioritized plan. You keep the plan whether or not we work together.",
  includes: [
    "A map of every tool, who uses it and what information lives there",
    "A connected-data score and an AI‑readiness score, with the gaps named",
    "The three projects worth doing first, with what each would cost and return",
    "A 60-minute walkthrough with you and your leadership team",
  ],
  credit: "Credited toward your first project if you go ahead.",
  sampleLabel: "Example scorecard: home-services company",
  cta: "Book an assessment call",
  sampleScores: [
    { label: "Sales (CRM)", score: 8 },
    { label: "Marketing (Ads)", score: 4 },
    { label: "Phone calls", score: 2 },
    { label: "Operations", score: 5 },
    { label: "Finance (Books)", score: 3 },
    { label: "AI‑ready", score: 1 },
  ],
};

export const STEPS: Step[] = [
  {
    label: "Step 1",
    title: "Free 30-minute estimate",
    description:
      "You tell us what's slowing your business down. We tell you honestly whether we can fix it, and you get a written estimate with a plan and a price range within two business days.",
  },
  {
    label: "Step 2",
    title: "Data & AI Assessment, if you want the full map",
    description:
      "Two weeks, fixed price. You get the map of your systems, the scores and a written plan with prices before any build work starts.",
  },
  {
    label: "Step 3",
    title: "Build, hand over, support",
    description:
      "Fixed-scope projects from the plan. You own every account and every line of code, with plain-English documentation.",
  },
];

export const RETAINER_NOTE =
  "Most clients keep DataSpoke on a monthly retainer afterward. We watch what we built, fix problems before you notice them and give you a straight answer before you buy the next tool a vendor is pitching.";

/** /approach page. */
export const APPROACH_PAGE = {
  metaTitle: "How working with DataSpoke goes, step by step",
  metaDescription:
    "How DataSpoke works with business owners: a free 30-minute estimate, an optional two-week Data & AI Assessment, fixed-scope projects you own, a clean hand-over and an optional monthly retainer. Plus the simple method we use to pick the numbers that run a business.",
  eyebrow: "Approach",
  title: "You see the plan and the price first. You own everything at the end.",
  lede:
    "Every engagement follows the same four phases, starting with a free 30-minute estimate. Nothing is built until you have agreed to a scope, a price and a finish line.",
};

export const PHASES: Step[] = [
  {
    label: "Phase 1",
    title: ASSESSMENT.name,
    description:
      "Two weeks, fixed price. We map every system and data source, score where you stand and write the plan. You keep the plan either way.",
  },
  {
    label: "Phase 2",
    title: "Build",
    description:
      "Fixed-scope projects taken straight from the plan. Each one has a price, a finish line and a result you can check.",
  },
  {
    label: "Phase 3",
    title: "Hand over",
    description:
      "Every account and every line of code is in your name. You get plain-English documentation and a walkthrough for the people who will use it.",
  },
  {
    label: "Phase 4",
    title: "Retainer",
    description: RETAINER_NOTE,
  },
];

export interface KpiLevel {
  label: string;
  question: string;
  description: string;
  example: string[];
}

export interface ScorecardRow {
  metric: string;
  owner: string;
  target: string;
  actual: string;
  onTrack: boolean;
}

/** "Metrics that run the business": goal → results → weekly activities → weekly scorecard. */
export const KPI_HIERARCHY = {
  eyebrow: "Metrics that run the business",
  title: "Start from what you want. Then pick the numbers.",
  lede:
    "Most dashboards start from whatever data is easy to pull. We start from the goal and work down. Each level answers a different question, and only the bottom one gets looked at every week.",
  exampleLabel: "Worked example, made up for illustration: a commercial cleaning company",
  levels: [
    {
      label: "Goal",
      question: "What do you want to achieve?",
      description: "One or two outcomes, in plain words, with a date.",
      example: ["Grow revenue by a third in two years while holding the net margin."],
    },
    {
      label: "Results that prove it (lagging KPIs)",
      question: "How will you know you got there?",
      description:
        "The results. They tell you the truth, but only after it's too late to change them.",
      example: ["Monthly revenue", "Net margin", "Client retention", "Average contract value"],
    },
    {
      label: "Weekly activities that drive it (leading indicators)",
      question: "What moves those numbers before they move?",
      description:
        "The activities and early signals your team controls this week. This is where the work happens.",
      example: [
        "Proposals sent per week",
        "Close rate on proposals",
        "Site inspection scores",
        "Complaints per 100 sites",
        "Crew overtime hours",
      ],
    },
    {
      label: "Weekly scorecard",
      question: "Are we on track this week?",
      description:
        "Five to ten weekly numbers, each with an owner and a target. Reviewed in the same meeting every week.",
      example: [],
    },
  ] satisfies KpiLevel[],
  scorecard: {
    columns: { metric: "Metric", owner: "Owner", target: "Target", actual: "This week" },
    onTrackLabel: "On track",
    offTrackLabel: "Off track",
    rows: [
      { metric: "Proposals sent", owner: "Sales", target: "12", actual: "9", onTrack: false },
      { metric: "Close rate (last 4 weeks)", owner: "Sales", target: "30%", actual: "33%", onTrack: true },
      { metric: "Average inspection score", owner: "Operations", target: "92", actual: "94", onTrack: true },
      { metric: "Complaints per 100 sites", owner: "Operations", target: "2 or fewer", actual: "3", onTrack: false },
      { metric: "Crew overtime hours", owner: "Operations", target: "120 or fewer", actual: "104", onTrack: true },
    ] satisfies ScorecardRow[],
  },
  close:
    "When a scorecard number goes red, you know which result is at risk weeks before it shows up in the books. We build the scorecard to update itself from the systems you already use.",
};
