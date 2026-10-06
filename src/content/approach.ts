import type { Step } from "@/types";

export const ASSESSMENT = {
  name: "Data & AI Assessment",
  price: "$999",
  terms: "fixed price · 2 weeks",
  lede:
    "Two weeks. I inventory every system and data source your company runs on, score how connected and AI‑ready it is today and hand you a prioritized plan. You keep the plan whether or not we work together.",
  includes: [
    "A map of every tool, who uses it and what data lives there",
    "A connected-data score and an AI‑readiness score, with the gaps named",
    "The three projects worth doing first, with what each would cost and return",
    "A 60-minute walkthrough with you and your leadership team",
  ],
  credit: "Credited toward your first project if you go ahead.",
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
    title: "Free 30-minute call",
    description:
      "You tell me what's frustrating you. I tell you honestly whether I can fix it and whether the Data & AI Assessment is the right place to start.",
  },
  {
    label: "Step 2",
    title: "Data & AI Assessment",
    description:
      "You get the map, the scores and a written plan with prices before any build work starts.",
  },
  {
    label: "Step 3",
    title: "Build, hand over, support",
    description:
      "Fixed-scope projects from the plan. You own every account and every line of code, with plain-English documentation.",
  },
];

export const RETAINER_NOTE =
  "Most clients keep me on a monthly retainer afterward. I watch what I built, fix problems before you notice them and give you a straight answer before you buy the next tool a vendor is pitching.";
