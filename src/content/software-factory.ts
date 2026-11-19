import type { TextLink } from "@/types";

// Copy for /services/software-factory (DRAFT, noindex, not linked anywhere).
// Written for business leaders in plain English: what DataSpoke sets up for
// companies, backed by real lessons and numbers from our own operation.
// Sources are listed in docs/drafts/software-factory-summary.md.
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
  metaTitle: "AI software factory setup: AI builds, your team owns the sign-offs",
  metaDescription:
    "We set up an AI-powered software assembly line for your company: AI assistants build and test updates, a second AI checks every change, and your team owns every approval before anything goes live.",
  draftBadge: "Draft - not published",

  eyebrow: "AI software factory setup",
  title: "A software factory, not a dark factory.",
  lede:
    "AI assistants run the assembly line. Your team owns the sign-offs. We set up the workflow, safeguards, and review gates so your company can build and update software faster without losing control.",
  intro: [
    "AI builds, your team decides",
    "A second AI checks every change",
    "Separate sign-offs to approve, update data, and launch",
  ],

  compareEyebrow: "Two kinds of factory",
  compareTitle: "Same AI tools. Different answer to who is in charge.",
  compareLede:
    "A \"dark factory\" takes people out of building and reviewing software altogether. The factory we set up keeps your team in charge of the few decisions that can actually hurt your business.",
  compareCols: { topic: "", dark: "Dark factory", ours: "What we set up for you" },
  compareRows: [
    { topic: "Who builds the software", dark: "AI assistants", ours: "AI assistants" },
    {
      topic: "Who checks the work",
      dark: "No person. Automated tests decide",
      ours: "A second AI that did not build it, then your team",
    },
    {
      topic: "Who approves changes, data updates, and launch",
      dark: "Automated software",
      ours: "A person on your team, one sign-off for each",
    },
    {
      topic: "When something goes wrong",
      dark: "Add more automated tests and rerun",
      ours: "The lesson becomes an automatic safeguard or rule",
    },
  ],
  compareNote:
    "The term is older than AI. A software factory simply meant building and releasing software on one repeatable assembly line. We set up that line for your company, with AI assistants at the workstations and your team at the quality gates.",

  lineEyebrow: "The assembly line",
  lineTitle: "From business request to live software, step by step.",
  lineLegendStation: "AI workstation",
  lineLegendGate: "Human sign-off",
  lineEndLabel: "Live, and watched",
  lineLoopLabel: "Mistakes loop back as automatic checks or rules",
  stations: [
    {
      title: "Work comes in",
      note: "Automated intake turns requests and system alerts into owned tasks. AI assistants pick up the build work.",
    },
    {
      title: "Separate workspace",
      note: "Every software change is built in its own isolated workspace, so multiple AI assistants working at once cannot overwrite each other.",
    },
    {
      title: "Build and test",
      note: "AI builds the update and tests it in a real browser using plain-English checklists written like a real user.",
    },
    {
      title: "Second-AI review",
      note: "A separate AI that did not build the change inspects it for accuracy, security, and side effects before your team sees it.",
    },
    {
      title: "Approve the change",
      note: "A person on your team reviews the plain-English summary and signs off before the update joins your main software.",
      gate: true,
    },
    {
      title: "Update data & launch",
      note: "One sign-off for any database update, then a separate sign-off to launch to users. Only one release runs per system at a time, and nothing launches without a monitoring plan.",
      gate: true,
    },
    {
      title: "Watch and improve",
      note: "Every work session ends by asking what check or rule would have stopped any mistake earlier.",
    },
  ] satisfies FactoryStation[],

  stopsEyebrow: "Clear boundaries",
  stopsTitle: "An AI assistant may stop and ask your team for only four reasons.",
  stops: [
    {
      title: "An approval gate",
      note: "Changing live business data, approving a change, launching to users, anything external people see, or spending money.",
    },
    {
      title: "A real business choice",
      note: "Two reasonable readings of the request would lead to very different outcomes.",
    },
    {
      title: "Access only a person has",
      note: "A password, a private account login, or a physical device.",
    },
    {
      title: "Finished work",
      note: "Ready for your team's review, with proof that it works attached.",
    },
  ] satisfies FactoryCard[],
  stopsRule: "If your team would say yes and the step can be undone, the AI acts without waiting.",
  stopsRuleNote:
    "Approval gates stay gates even when a step can be reversed. A software change can be rolled back, but it still requires a person's sign-off.",

  bottleneckEyebrow: "Where teams get stuck",
  bottleneckTitle: "Building software is fast now. Proof isn't.",
  bottleneckLede:
    "When AI builds software faster, the bottleneck moves to reviewing changes, sharing test systems, and launching safely. That is where we put your team's controls.",
  bottleneckSrJam: "The bottleneck: ",
  bottleneckSrFix: "How we solve it: ",
  bottlenecks: [
    {
      title: "Review",
      jam: "AI produces more changes than your team can check line by line.",
      fix: "A second AI inspects every change for accuracy, fit, business impact, and security. Your team reads a clear summary instead of raw code.",
    },
    {
      title: "Shared test systems",
      jam: "Multiple AI assistants working at once collide on the same test database and break each other's tests.",
      fix: "Only one release at a time holds the update lane, from the database change through confirming a clean launch.",
    },
    {
      title: "Launching live",
      jam: "Updates go out to staff or customers before anyone agrees on what to watch.",
      fix: "Nothing is allowed to launch until there is a monitoring plan: what to watch, when to check it, and when to roll back.",
    },
  ],

  incidentsEyebrow: "Safeguards from real lessons",
  incidentsTitle: "When something goes wrong once, it becomes a permanent safeguard.",
  incidentsLede: "Not a note people have to remember. An automatic check or warning that runs every time.",
  incidentBeforeLabel: "What went wrong",
  incidentAfterLabel: "The safeguard now",
  incidents: [
    {
      incident:
        "A finished feature vanished from a test version of a gym's mobile app because the build was pulled from an unfinished draft instead of the official version.",
      rule: "An automatic check fires before every mobile app build and tells the AI to stop and confirm it is packaging the official version with all approved features included.",
    },
    {
      incident:
        "Three parallel projects shared one test environment. Updates collided and one AI assistant accidentally deleted a table in the test database.",
      rule: "Only one update and launch can run per software system at a time, backed by a required checklist before parallel work starts.",
    },
    {
      incident:
        "An expired cloud account login failed three times during a build and cost an entire overnight release window.",
      rule: "Every live release checks account access first, and a built-in guard blocks AI assistants from changing the shared login settings.",
    },
  ] satisfies IncidentRule[],

  ratchetEyebrow: "Safeguards that test themselves",
  ratchetTitle: "Lock down customer data. Flag any new access.",
  ratchetSteps: [
    {
      title: "Lock the list",
      note: "Every place the software reads private customer contact information goes on a locked inventory.",
    },
    {
      title: "Flag anything new",
      note: "Any new or changed access to customer data turns the check red. Approvals wait until a person signs off.",
    },
    {
      title: "Test the alarm",
      note: "Before checking the real software, the safeguard plants fake unauthorized reads. Every single one must trigger an alarm.",
    },
    {
      title: "Only shrink the risk",
      note: "The count of older data touchpoints still waiting to be upgraded can go down, never up.",
    },
  ] satisfies FactoryCard[],
  ratchetStat: {
    value: "355",
    label: "older customer-data touchpoints tracked in one real run of the check. A test fails if that number ever rises.",
  },

  loopEyebrow: "Safe autonomous work",
  loopTitle: "No independent check, no autopilot.",
  loopQuote: "An AI assistant works unattended only when something other than that AI can prove the job is done.",
  loopParts: [
    {
      title: "A clear finish line",
      note: "Done means an objective test passes, not the AI saying it feels ready.",
    },
    {
      title: "A separate judge",
      note: "The checker is never the same AI that did the work.",
    },
    {
      title: "Built-in stop limits",
      note: "Work stops on success, after 12 tries max, if progress stalls, or when the budget limit is reached.",
    },
    {
      title: "A written handoff log",
      note: "Every round leaves a written record so the next try knows what the last one already tried.",
    },
  ] satisfies FactoryCard[],

  retroEyebrow: "Measuring the human bottleneck",
  retroTitle: "Every routine \"yes\" gets counted. Most shouldn't be needed.",
  retroLede:
    "We set up a weekly review that audits every AI work session and shows where people are slowing the line down: how long AI assistants sat waiting for an answer, and how often someone approved a routine step with nothing real to decide. One real week from our own operation:",
  retroStats: [
    { value: "91", label: "AI work sessions" },
    { value: "707", label: "human check-ins" },
    { value: "24 h", label: "spent waiting on a person" },
    { value: "103", label: "rubber-stamp yeses" },
  ],
  retroNote: "Each finding becomes an action with a target. Next week's review checks whether it held.",

  startEyebrow: "How to start",
  startTitle: "Book a free AI strategy call.",
  startPoints: [
    "A free 30-minute call.",
    "Tell us where your company is today: AI tools running without guardrails, parallel work colliding, or software changes piling up waiting for review.",
    "Within two business days we send a written estimate with a recommended plan and a price range.",
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
    "Diagram: an assembly line. AI workstations build, test and review each software change. Two human sign-offs sit before anything goes live: approving the change, then updating data and launching, each with its own sign-off. Lessons loop back to the start.",
};
