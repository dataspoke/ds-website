import type { TextLink } from "@/types";

// Copy for /services/software-factory (DRAFT, noindex, not linked anywhere).
// First person ("I"): Nick runs this setup himself. Every claim and number comes
// from Nick's own repos; sources are listed in docs/drafts/software-factory-summary.md.
// Clients stay anonymous. No prices, client names, quotes from third parties,
// or made-up numbers. Hyphens only, no em or en dashes.

export interface FactoryStation {
  title: string;
  note: string;
  /** True for a station where a person says yes. */
  gate?: boolean;
}

export interface FactoryCard {
  title: string;
  note: string;
}

export interface IncidentRule {
  incident: string;
  rule: string;
}

export const FACTORY_PAGE = {
  path: "/services/software-factory",
  metaTitle: "AI software factory setup: agents build, people own the gates",
  metaDescription:
    "How I run software as an assembly line: Claude Code agents do the stations, a second agent reviews, and people own merge, migration and deploy.",
  draftBadge: "Draft - not published",

  eyebrow: "AI software factory setup",
  title: "A software factory, not a dark factory.",
  lede:
    "Agents do the stations. People own the gates. This is the line I run every day across client codebases, and the one I set up for teams that build with Claude Code.",
  intro: ["Agents build, people decide", "A second agent reviews every change", "Separate yeses for merge, migration and deploy"],

  compareEyebrow: "Two kinds of factory",
  compareTitle: "Same agents. Different answer to who says yes.",
  compareLede:
    "A dark factory takes people out of writing and reviewing code. I keep people at the few steps that can hurt you.",
  compareCols: { topic: "", dark: "Dark factory", mine: "The line I run" },
  compareRows: [
    { topic: "Who writes the code", dark: "Agents", mine: "Agents" },
    { topic: "Who reviews it", dark: "No person. Tests and scenarios decide", mine: "A second agent that did not write it, then me" },
    { topic: "Who approves merge, migration, deploy", dark: "The pipeline", mine: "A person, one yes for each" },
    { topic: "When something breaks", dark: "Run more agents", mine: "The lesson becomes a hook, a check, or a rule" },
  ],
  compareNote:
    "The term is older than AI. A software factory meant running delivery as one repeatable line. I keep that meaning and put agents at the stations.",

  lineEyebrow: "The line",
  lineTitle: "From request to running code, station by station.",
  lineLegendStation: "Agent station",
  lineLegendGate: "Human gate",
  stations: [
    { title: "Work comes in", note: "Bots turn requests and alerts into owned tasks. Claude Code sessions do the building" },
    { title: "Own workspace", note: "Every session gets its own git worktree, so parallel agents don't undo each other" },
    { title: "Build and test", note: "Plain-English test scenarios, driven in a real browser" },
    { title: "Second-agent review", note: "An agent that did not write the change reviews it before I see it" },
    { title: "Merge", note: "My yes, on a pull request", gate: true },
    { title: "Migrate and deploy", note: "Its own yes. One deploy slot per codebase. No monitoring plan, no deploy", gate: true },
    { title: "Watch and learn", note: "Each session ends by asking what check would have stopped its mistakes" },
  ] satisfies FactoryStation[],

  stopsEyebrow: "Run to a gate",
  stopsTitle: "An agent may stop for only four reasons.",
  stops: [
    { title: "A gate", note: "Production data, merge, deploy, anything other people see, spending money" },
    { title: "A real fork", note: "Two readings of the job lead to different work" },
    { title: "A blocker only I can clear", note: "A login, a secret, hardware" },
    { title: "Done", note: "With the proof attached" },
  ] satisfies FactoryCard[],
  stopsRule: "If I would say yes and the step can be undone, the answer is yes: act.",
  stopsRuleNote: "Gates stay gates even when they can be undone. A merge can be reverted. It still needs my yes.",

  bottleneckEyebrow: "Where the line jams",
  bottleneckTitle: "Writing code got cheap. Trusting it didn't.",
  bottleneckLede: "Faster code moves the jam to review, shared environments and deploys. That's where my gates sit.",
  bottlenecks: [
    {
      title: "Review",
      jam: "More code than one person can read",
      fix: "A second agent reviews every branch for correctness, fit, blast radius and security. I read its findings, not every line.",
    },
    {
      title: "Shared environments",
      jam: "Parallel agents collide on the same test database and backend",
      fix: "One session at a time holds the migration and deploy slot, from the database change to a clean watch.",
    },
    {
      title: "Deploys",
      jam: "Code ships before anyone says what to watch",
      fix: "A deploy refuses to run until there is a monitoring plan: what to watch, when, and when to roll back.",
    },
  ],

  incidentsEyebrow: "Rules from incidents",
  incidentsTitle: "Every time an agent burns me, the lesson becomes a guard.",
  incidentsLede: "Not a reminder. A hook or a check that runs whether anyone remembers or not.",
  incidents: [
    {
      incident: "A feature vanished from a test build of a gym's app. The build was cut from a feature branch.",
      rule: "A hook fires on every app-store build and makes the agent confirm it is from main with all features merged.",
    },
    {
      incident: "Three parallel build tracks shared one test database and one backend. Deploys collided and one session dropped a table.",
      rule: "One migration and deploy slot per codebase, plus a checklist before fanning out.",
    },
    {
      incident: "A cloud login expired three times during one build and cost an overnight release window.",
      rule: "Every production gate checks the cloud login first, and a guard blocks changes to the login all sessions share.",
    },
  ] satisfies IncidentRule[],

  ratchetEyebrow: "Checks that test themselves",
  ratchetTitle: "Freeze the risky surface. Fail on anything new.",
  ratchetSteps: [
    { title: "Freeze", note: "Every place the code reads private contact data goes on a fingerprinted list" },
    { title: "Fail on new", note: "Any new or changed read turns the check red. Merges wait until a person signs off" },
    { title: "Test the test", note: "Before checking the code, the check plants bad reads. Each one must fail" },
    { title: "Only down", note: "A count of reads still to convert can go down, never up" },
  ] satisfies FactoryCard[],
  ratchetStat: { value: "355", label: "reads left to convert in one run of the check. A test fails if that number rises." },

  loopEyebrow: "Unattended loops",
  loopTitle: "A loop is a task with a check.",
  loopQuote: "A task without a check is just hope.",
  loopParts: [
    { title: "A checkable exit", note: "Done means a test passes, not a feeling" },
    { title: "A separate judge", note: "Never the agent that did the work" },
    { title: "Stacked stops", note: "Success, 12 rounds max, no progress, or budget spent" },
    { title: "A state file", note: "So the next round knows what the last one tried" },
  ] satisfies FactoryCard[],

  retroEyebrow: "The human gets graded too",
  retroTitle: "Every bare yes I type is a gate that shouldn't exist.",
  retroLede:
    "A weekly retro reads every session and measures me: how long agents sat waiting on me, and how often I typed a yes with nothing to decide. One week:",
  retroStats: [
    { value: "91", label: "sessions" },
    { value: "707", label: "prompts from me" },
    { value: "24 h", label: "agents waited on me" },
    { value: "103", label: "rubber-stamp yeses" },
  ],
  retroNote: "Each finding becomes an action with a target. Next week's retro checks whether it held.",

  startEyebrow: "How to start",
  startTitle: "Book a free AI strategy call.",
  startPoints: [
    "A free 30-minute call.",
    "Tell me where your team is: Claude Code with no rails yet, parallel agents stepping on each other, or review piling up.",
    "Within two business days I send a written estimate with a recommended plan and a price range.",
    "No obligation. You keep the estimate either way.",
  ],
  assessmentNote:
    "If you want a deeper two-week review of your systems and data first, that is the Data & AI Assessment, scoped on that call.",
  assessmentLinks: [{ label: "Data & AI Assessment", href: "/approach#assessment" }] satisfies TextLink[],

  ctaButton: "Book your free AI strategy call",
  ctaSupport:
    "A free 30-minute call, then a written estimate with a recommended plan and a price range within two business days. No obligation.",

  /** Alt text for the hero diagram. */
  heroDiagramLabel:
    "Diagram: an assembly line. Agent stations build, test and review the change. Two human gates, merge and deploy, sit before the code goes live, and lessons loop back to the start.",
};
