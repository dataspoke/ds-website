import type { TextLink } from "@/types";

// Copy for /services/claude. First person ("I"): Nick does this work himself.
// Proof stays anonymized: kinds of business, no names, no results, no prices.
// Do not add prices, client names, review quotes, or made-up numbers here.

export interface JourneyStep {
  /** Short label for the path overview. */
  short: string;
  title: string;
  lede: string;
  bullets: string[];
}

export interface Guardrail {
  title: string;
  description: string;
}

export const CLAUDE_PAGE = {
  path: "/services/claude",
  metaTitle: "Claude Cowork, Claude Code, Skills and MCP setup",
  metaDescription:
    "I connect Claude to QuickBooks, Xero or your CRM, set up Claude Cowork and Claude Code, and build Skills and a first agent. Free AI strategy call.",
  eyebrow: "Claude setup and training",
  title: "I set Claude up on your business, then teach you to run it.",
  lede:
    "Claude connected to the systems you already use, a reviewed Claude Cowork or Claude Code setup, Claude Skills for the work that repeats, and a first agent done properly. Limited access, human approvals, and an audit trail. I build with you and teach you, so you're not stuck when I leave.",
  intro: [
    "I set Claude up on the systems you already pay for.",
    "I stay until you and your team can run it.",
    "I do the work myself. No hand-offs.",
  ],
  pathLabel: "The path, in order",

  journeyEyebrow: "How it works",
  journeyTitle: "Five steps, from connecting your data to an agent your team runs.",
  journeyLede:
    "Each step builds on the one before. You can start at step one, or tell me where you are and we pick up from there.",
  journey: [
    {
      short: "Connect your data",
      title: "Connect Claude to your data",
      lede:
        "Claude starts with your data. An MCP connector (a secure way for Claude to use a system you already have) links it to the tools you already pay for.",
      bullets: [
        "Connect Claude to QuickBooks, Xero, your ERP, your CRM, or HubSpot",
        "Claude can read the records it needs and, where you approve it, draft the next step",
        "Access stays limited, in accounts you own",
        "You don't have to start running your own servers to get this working",
      ],
    },
    {
      short: "Cowork or Code setup",
      title: "Set up Claude Cowork projects or Claude Code",
      lede:
        "Claude Cowork projects for your team's everyday work, or a Claude Code setup for the people who build. I review the setup you have and tighten it, or build it with you and teach you as we go.",
      bullets: [
        "A screen-share review of your current Claude Cowork or Claude Code setup and workflow",
        "Cowork projects with the instructions and files each job needs, or a Claude Code setup with project instructions and guardrails you keep",
        "Coaching while you do the work, so the knowledge stays in your company",
        "Help with Claude Skills, Claude Cowork, and Claude Code, until you can run them yourself",
      ],
    },
    {
      short: "Claude Skills",
      title: "Claude Skills for the work that repeats",
      lede: "A repeating job, written as a skill you and your team will actually run.",
      bullets: [
        "A skill for work you do the same way every week, such as a report, an intake, or a close process",
        "Written so you can change it later, not locked in a setup only I understand",
        "Yours to keep, in the Claude account you already use",
      ],
    },
    {
      short: "Staff training",
      title: "Your team learns to run it",
      lede:
        "I build alongside the people who will run it, so your team owns the setup, not me.",
      bullets: [
        "Hands-on sessions on your team's real work, not a slide deck",
        "Your staff practice the everyday jobs: running a skill, approving a draft, reading the audit trail",
        "Plain notes on how each piece works and how to change it",
        "Coaching continues until your team can add the next skill on their own",
      ],
    },
    {
      short: "Prototype to production",
      title: "A first agent, from prototype to production",
      lede:
        "One standing agent on a real operations workflow: reporting, billing, follow-up, or another job your team already does the same way every week. A person still approves the exceptions.",
      bullets: [
        "I map how the work actually moves today, then stand up one guarded workflow first",
        "The prototype flags issues that need a person, instead of acting on its own",
        "Then I harden it: access limited to the systems that job needs, and a record of every step",
        "Once it runs the same way every week, it rolls out to the rest of the team",
        "Once the first agent is solid, the next one is easier to add",
      ],
    },
  ] satisfies JourneyStep[],

  guardrailsEyebrow: "Guardrails",
  guardrailsTitle: "How each setup stays under your control.",
  guardrails: [
    {
      title: "Limited access",
      description: "Claude only sees the systems and records you approve.",
    },
    {
      title: "Human approvals",
      description: "Drafts and exceptions wait for a person.",
    },
    {
      title: "An audit trail",
      description: "You can see what ran, what it touched, and what was approved.",
    },
  ] satisfies Guardrail[],

  proofEyebrow: "What this has looked like",
  proofTitle: "Guarded agent setups for operations businesses.",
  proofLede: "Names stay off the page. The work looks like this:",
  proof: [
    {
      who: "A construction company",
      what:
        "Agents that support day-to-day operations and flag issues a manager needs to see. I ran construction projects as an engineer, so I already know how that work moves.",
    },
    {
      who: "A fuel distributor",
      what:
        "Claude-powered reporting that connects accounting, point of sale, and operations software, and flags what needs a person.",
    },
    {
      who: "A hospitality operator",
      what: "A first agent on one front-office workflow, done properly, with exceptions sent to staff.",
    },
    {
      who: "A finance firm",
      what:
        "Practical Claude systems around the accounting tools they already use, with unusual movements flagged for investigation.",
    },
  ],

  startEyebrow: "How to start",
  startTitle: "Book a free AI strategy call.",
  startPoints: [
    "A free 30-minute call.",
    "Tell me what you want to do first: connect Claude to a system you already run, set up Claude Cowork or Claude Code, turn a repeating job into a skill, or stand up a first agent.",
    "Within two business days I send a written estimate with a recommended plan and a price range.",
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
    eyebrow: "Already working in Claude?",
    title: "Claude setup and training",
    oneLiner: "I set Claude up on your business, then teach you to run it.",
    summary:
      "Claude connected to QuickBooks, Xero or your CRM, a Claude Cowork or Claude Code setup, Claude Skills for the work that repeats, and a first guarded agent your team can run.",
    steps: "Connect your data · Cowork or Code setup · Claude Skills · Staff training · First agent",
    link: "See Claude setup and training",
  },
};

/**
 * Labels for the page's diagrams and step illustrations. The step pictures show
 * what each step looks like, not real client data, so each carries the
 * "Illustrative" tag.
 */
export const CLAUDE_VISUALS = {
  illustrative: "Illustrative",
  hub: "Claude",
  hubSpokes: ["QuickBooks", "Xero", "HubSpot", "Your CRM", "Your ERP", "Documents"],
  hubAriaLabel:
    "Diagram: Claude at the center, connected to QuickBooks, Xero, HubSpot, your CRM, your ERP and your documents",
  /** Step 1: connector list. */
  connectors: [
    { name: "QuickBooks", access: "Read invoices and customers" },
    { name: "Xero", access: "Read bills and payments" },
    { name: "HubSpot", access: "Read deals, draft follow-ups" },
  ],
  connected: "Connected",
  /** Step 2: a Cowork project beside a Claude Code window. */
  cowork: {
    label: "Claude Cowork project",
    name: "Weekly operations report",
    files: ["Instructions", "Report template", "Last month's report"],
  },
  code: {
    label: "Claude Code",
    lines: ["CLAUDE.md", "  How this project works", "  What Claude may touch", "  Who approves what"],
  },
  /** Step 3: a skill card. */
  skill: {
    label: "Claude Skill",
    name: "month-end-close",
    steps: ["Pull the trial balance", "Match payments to invoices", "Flag anything unusual for a person"],
  },
  /** Step 4: a training checklist. */
  training: {
    label: "Training session",
    items: [
      { text: "Run a skill", done: true },
      { text: "Approve a draft", done: true },
      { text: "Read the audit trail", done: false },
      { text: "Write the next skill", done: false },
    ],
  },
  /** Step 5: the rollout stages. */
  rollout: [
    { label: "Prototype", note: "One workflow" },
    { label: "Harden", note: "Access and audit trail" },
    { label: "Roll out", note: "The whole team" },
  ],
  /** Guardrails: the approval flow. */
  flowLabel: "What happens on every run",
  flow: [
    { title: "Claude drafts", note: "Using only the systems you approved" },
    { title: "Exceptions are flagged", note: "Anything unusual waits" },
    { title: "A person approves", note: "Nothing goes out on its own" },
    { title: "Every step is logged", note: "What ran, what it touched, who approved" },
  ],
};
