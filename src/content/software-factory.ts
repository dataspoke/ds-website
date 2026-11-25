import type { TextLink } from "@/types";

// Copy for /services/software-factory.
// Written for business leaders in plain English: what DataSpoke sets up for
// companies, in general terms. No prices, client names, internal stack details,
// quotes from third parties, or made-up numbers. Hyphens only, no em or en dashes.

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

export const FACTORY_PAGE = {
  path: "/services/software-factory",
  metaTitle: "AI Internal Tools & Software Factory",
  metaDescription:
    "Set up an AI software factory to build and update apps and internal tools every week, with your team owning every sign-off. Free AI strategy call.",

  eyebrow: "AI software factory setup",
  title: "Build and update your software and internal tools every week with AI.",
  lede:
    "We set up an AI assembly line for your company so you can build and update the apps and internal tools your business needs every week, without hiring a full dev team or waiting months for changes. AI assistants do the heavy lifting, a second AI checks every change, and your team owns the sign-offs.",
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
      note: "One sign-off for any database update, then a separate sign-off to launch to users, with releases run one at a time per system and a clear plan for what to watch after launch.",
      gate: true,
    },
    {
      title: "Watch and improve",
      note: "Monitor live behavior after launch, and run a regular review that turns lessons and bottlenecks into simpler rules and stronger automated checks.",
    },
  ] satisfies FactoryStation[],

  stopsEyebrow: "Clear boundaries",
  stopsTitle: "Clear rules for when AI moves forward and when it asks your team.",
  stops: [
    {
      title: "An approval gate",
      note: "Changing live business data, approving a software update, launching to users, external communications, or spending money.",
    },
    {
      title: "A business decision",
      note: "When a request could reasonably be handled two different ways and needs a judgment call.",
    },
    {
      title: "Restricted access",
      note: "Logins, credentials, or approvals that only a designated person on your team should touch.",
    },
    {
      title: "Ready for review",
      note: "Completed work with plain-English notes and test proof attached for your team to sign off.",
    },
  ] satisfies FactoryCard[],
  stopsRule: "Routine, reversible work keeps moving. High-impact decisions always wait for your team.",
  stopsRuleNote:
    "Approval gates stay in place even for changes that can be rolled back, so nothing reaches your team or customers without a human sign-off.",

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
      jam: "Multiple AI assistants working at once can collide on the same test database and disrupt each other's tests.",
      fix: "Releases move through shared test environments one at a time, so parallel work does not interfere with an active update.",
    },
    {
      title: "Launching live",
      jam: "Updates go out to staff or customers before anyone agrees on how to verify they are working.",
      fix: "Every release includes a simple post-launch checklist: what to watch, when to check it, and how to roll back if needed.",
    },
  ],

  ratchetEyebrow: "Safeguards that test themselves",
  ratchetTitle: "Lock down customer data. Flag any new access.",
  ratchetSteps: [
    {
      title: "Lock the list",
      note: "Every place your software reads private customer contact information goes on a controlled inventory.",
    },
    {
      title: "Flag anything new",
      note: "Any new or changed access to sensitive customer data triggers an alert and waits for a person to sign off.",
    },
    {
      title: "Test the alarm",
      note: "Safeguards are tested against simulated unauthorized reads so you know the checks actually catch issues before they matter.",
    },
    {
      title: "Shrink exposure over time",
      note: "As older parts of your software are modernized, automated checks keep new data exposure from creeping back in.",
    },
  ] satisfies FactoryCard[],

  loopEyebrow: "Safe autonomous work",
  loopTitle: "No independent check, no autopilot.",
  loopQuote: "An AI assistant works unattended only when an independent check can verify the job is done.",
  loopParts: [
    {
      title: "A clear finish line",
      note: "Done means an objective test passes, not the AI saying it feels ready.",
    },
    {
      title: "An independent checker",
      note: "Verification runs separately from the AI that built the change.",
    },
    {
      title: "Built-in stop limits",
      note: "Work stops automatically on success, if progress stalls, or when time or budget caps are reached.",
    },
    {
      title: "A clear audit trail",
      note: "Every step leaves a written record of what was tried, what changed, and what passed.",
    },
  ] satisfies FactoryCard[],

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

  /** Card on the /services index. */
  card: {
    eyebrow: "Want weekly software updates?",
    title: "AI software factory setup",
    oneLiner: "Build and update your software and internal tools every week with AI.",
    summary:
      "An AI assembly line for your business apps and internal tools: AI assistants build and test updates, a second AI inspects every change, and your team owns the sign-offs before anything goes live.",
    steps: "Automated intake · Isolated workspaces · Build & test · Second-AI review · Human sign-offs",
    link: "See AI software factory setup",
  },
};
