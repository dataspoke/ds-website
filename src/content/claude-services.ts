import type { HeroSpoke } from "@/components/home-a/illustrations";
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

/** A real screenshot, cropped to the part that matters. */
export interface Shot {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
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
  /** Short promises shown as chips in the hero. */
  intro: ["On systems you already pay for", "I stay until your team can run it", "I do the work myself. No hand-offs"],
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
        "I set up a change process with you: when the work changes, your team updates the skill, a person approves it, and everyone learns the new way",
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
  hub: "Claude",
  /** Hero spokes, clockwise from the top, each with a glyph from the home hero set. */
  hubSpokes: [
    { name: "QuickBooks", glyph: "dollar" },
    { name: "Xero", glyph: "chart" },
    { name: "HubSpot", glyph: "users" },
    { name: "Your ERP", glyph: "truck" },
    { name: "Your CRM", glyph: "chat" },
    { name: "Calendar", glyph: "calendar" },
    { name: "Email", glyph: "mail" },
    { name: "Documents", glyph: "doc" },
  ] satisfies HeroSpoke[],
  hubAriaLabel:
    "Illustration: Claude at the center, with spokes to QuickBooks, Xero, HubSpot, your ERP, your CRM, calendar, email and documents",
  /**
   * Real screenshots of the Claude desktop app for steps 1 and 2 (connectors, a
   * Cowork project), cropped to leave out account details. Keyed by step number.
   */
  shots: {
    1: {
      src: "/images/claude/connectors.png",
      width: 725,
      height: 470,
      alt: "Claude's connector directory, showing the Google Drive and Google Calendar connectors",
      caption: "Claude's connector directory.",
    },
    2: {
      src: "/images/claude/projects.png",
      width: 1250,
      height: 700,
      alt: "The Claude desktop app with a Cowork project pinned in the sidebar, along with its morning brief skill",
      caption: "A Cowork project, pinned with its skill.",
    },
  } as Record<number, Shot>,
  /** Cartoons for steps 3 to 5, keyed by step number. */
  cartoons: {
    3: {
      alt: "Illustration: a skills library window. A skills folder holds month-end, weekly-report, client-intake, invoice-chase and morning-brief, and the open month-end skill file lists its four steps, ending with wait for your OK",
      caption: "A skills library: one folder per repeating job, with the steps written down. Illustration.",
    },
    4: {
      alt: "Cartoon: a learning loop around your team. Run the skill, spot a change, update and approve, teach the team, then run it again",
      caption: "The learning loop: when the work changes, your team updates the skill, a person approves it, and everyone learns the new way. Illustration.",
    },
    5: {
      alt: "Cartoon: a CLAUDE.md page with a short note about the business, then guardrails for what Claude may read, may write, must never do, and must ask a person about",
      caption: "The project's CLAUDE.md: what Claude knows about your business, and the guardrails it follows. Illustration.",
    },
  } as Record<number, { alt: string; caption: string }>,
  /** Guardrails: the approval flow. */
  flowLabel: "What happens on every run",
  flow: [
    { title: "Claude drafts", note: "Limited access: only the systems and records you approve" },
    { title: "Exceptions are flagged", note: "Anything unusual waits" },
    { title: "A person approves", note: "Human approvals: drafts and exceptions wait for a person" },
    { title: "Every step is logged", note: "An audit trail: what ran, what it touched, what was approved" },
  ],
};
