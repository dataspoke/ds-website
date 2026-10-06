import { LOCATION, SITE_TAGLINE } from "@/lib/constants";
import type { Example, Expertise, Problem } from "@/types";

export const HERO = {
  eyebrow: "For established businesses past $1M in revenue that run on too many tools",
  headline: SITE_TAGLINE,
  lede:
    "Your sales, operations and finance tools each know part of the story. I connect them into one picture you own, so every decision is made on what's actually happening.",
  byline:
    "Nick Paul · Army Engineer officer · data scientist & software developer · M.S. Operations Research · one senior consultant, no hand-offs",
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
  "Lawmatics",
  "Clio",
  "QuickBooks",
  "RingCentral",
  "Google Ads",
  "Meta Ads",
  "Mindbody",
  "Google Workspace",
];

export const PROBLEMS: Problem[] = [
  {
    title: "The big systems don't talk to each other.",
    description:
      "CRM, accounting, scheduling, phones. Each one is right about its own piece and wrong about the whole. Month-end means exporting four reports and hoping they match.",
  },
  {
    title: "Data you produce every day and never use.",
    description:
      "Every call, meeting, email and text is a record of the business. Almost none of it is captured anywhere you can look at it, and AI can't reach any of it.",
  },
  {
    title: "Things that live only in people's heads.",
    description:
      "How a job really gets quoted. Why that customer left. What the Tuesday process actually is. If someone quits, it's gone.",
  },
];

export const PROBLEMS_CLOSE =
  "Connecting the software is the first step. Capturing what the business already knows is the second. That's what makes you AI‑ready.";

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

export const EXAMPLES: Example[] = [
  {
    industry: "Professional services",
    before:
      "Month-end reports built by hand from exports. The owner prepping for client meetings by digging through old calls and notes.",
    after:
      "Reports that check themselves against the books and send on their own. A private assistant that already knows every client, call and open task.",
    result: "Reports arrive without being asked for. Meeting prep is one question.",
  },
  {
    industry: "Home services",
    before:
      "Ad platforms reporting conversions the sales team can't find. Leads from several agencies and vendors arriving by email.",
    after:
      "Every lead source flowing into the CRM in minutes, junk filtered out and one view of cost per paying job by channel and by agency.",
    result: "One trusted number for what each marketing dollar brings back.",
  },
  {
    industry: "Membership business",
    before:
      "A customer-facing app that was slow, out of date and dependent on a vendor nobody could reach.",
    after:
      "Rebuilt iOS and Android apps on top of the booking system the business already pays for, and the owner holding the keys to their own data.",
    result: "Customers book in seconds. The owner owns the whole thing.",
  },
];

/** Shown on the home About teaser and the About page. */
export const CREDENTIALS = [
  "Army Engineer officer, combat veteran",
  "B.S. Mathematics · M.S. Operations Research",
  "Data scientist & software developer",
  "5 years consulting for owner-run businesses",
  `${LOCATION} · clients nationwide`,
];
