// Copy for /insights/company-brain. DRAFT: noindex, not in the nav, the
// /insights index, the sitemap, or llms.txt. See docs/drafts/company-brain-summary.md.
// First person as Nick. Every claim comes from Nick's own setup (paths in the
// summary doc). No client names, no invented numbers, no quotes from third parties.

export const COMPANY_BRAIN = {
  path: "/insights/company-brain",
  metaTitle: "A company brain is a data problem",
  metaDescription:
    "What a company brain is, why wiring Slack and Notion into an AI is not one, and the four pieces I run so people and agents work from the same picture.",
  date: "2026-11-19",
  author: "Nick Paul",
  draftBadge: "Draft - not published",

  eyebrow: "Insights · AI in practice",
  title: "A company brain is a data problem, not a chatbot.",
  lede:
    "A company brain is the shared picture of how your company runs, written down so people and AI agents work from the same one. Connecting tools is the easy part. Keeping it true is the job.",
  tldrLabel: "The short version",
  tldr: [
    "If you explain the same thing to AI every day, the context is missing, not the model.",
    "Start with definitions and playbooks. Connectors come after.",
    "Log the work, or the next session starts from zero.",
    "Freshness and permissions are where these setups break. Treat them like data quality.",
  ],

  compareEyebrow: "Two ways to build one",
  compareTitle: "Wiring tools in vs running it like data.",
  compareHead: ["Wiring tools in", "What I run"],
  compare: [
    { topic: "Starting point", wired: "Connect Slack, Notion and the CRM to an AI", run: "Write down what words mean first" },
    { topic: "Context", wired: "One big pile for the AI to search", run: "A context file per project, read at the start of every session" },
    { topic: "How work gets done", wired: "Prompts often retyped each time", run: "Skills: saved processes, improved after each use" },
    { topic: "Memory", wired: "Often gone when the chat closes", run: "Tasks and file locations logged to a CRM" },
    { topic: "Access", wired: "Often whatever the connector can reach", run: "Read-only by default, scoped per folder, gates on writes" },
    { topic: "Upkeep", wired: "Set up once, then left", run: "Drift checks and a weekly retro" },
  ],

  layersEyebrow: "The layers",
  layersTitle: "Each layer is only as good as the one under it.",
  layersLede: "Agents sit on top. The work that makes them useful is below them.",
  /** Top to bottom. */
  layers: [
    { name: "People and agents", note: "Ask questions, do the work, wait at gates" },
    { name: "Playbooks", note: "Skills that say how a job is done here" },
    { name: "Shared definitions", note: "What a client, an active account or a closed job means" },
    { name: "Connected, clean data", note: "One place to read from, through MCP tools" },
    { name: "Source systems", note: "CRM, accounting, email, meetings, the app database" },
  ],

  piecesEyebrow: "What I run",
  piecesTitle: "Four pieces, all plain files and tables.",
  pieces: [
    {
      title: "A definitions doc",
      body: "One glossary for a client platform, built largely from meeting transcripts. It sits next to the database schema, and agents read it before they build.",
      quoteLead: "What I told the team:",
      quote: "The tighter we get this, the better the MCP tools will be.",
    },
    {
      title: "A context file per project",
      body: "One file per repo with the rules, the data sources and what not to touch. No re-explaining.",
    },
    {
      title: "A skills library",
      body: "Saved processes, grouped in bundles. The first version of each one is rough. Use fixes it.",
    },
    {
      title: "A work log in the CRM",
      body: "Every session ties to one task, with where its files live. The next session picks it up.",
    },
  ],

  loopEyebrow: "Keeping it true",
  loopTitle: "A brain that isn't maintained rots. So maintenance is a loop.",
  loop: [
    { title: "Do the work", note: "One task, one session" },
    { title: "Close the session", note: "Ask: could the setup have prevented this mistake?" },
    { title: "Log the lesson", note: "A dev learning in the CRM" },
    { title: "Weekly retro", note: "Lessons become skill and rule changes" },
  ],
  loopChecks: [
    "The glossary and the context file change in the same commit as the schema.",
    "A CI job flags it when the MCP tool docs drift from the live tools.",
    "Two agent systems share one claim-check skill, and the build warns when the copies differ.",
  ],

  gatesEyebrow: "Permissions",
  gatesTitle: "Who can see and change what.",
  gates: [
    { title: "Read-only by default", note: "Production databases are opened read-only" },
    { title: "Identity per folder", note: "Each client folder picks its own cloud and GitHub account" },
    { title: "A ratchet on private data", note: "New code that reads contact data is blocked from merging unless approved" },
    { title: "A person at the gates", note: "Prod writes, merges, deploys and messages wait for a yes" },
  ],

  failEyebrow: "Where these break",
  failTitle: "The common failure modes.",
  fails: [
    { title: "Rot", note: "The doc says one thing, the system does another" },
    { title: "Two meanings for one word", note: "The same word is defined in several places, and they disagree" },
    { title: "Leaky access", note: "The AI can read what the person asking can't" },
    { title: "Logging everything", note: "Noise buries the one note someone needed" },
    { title: "No owner", note: "No owner and no update habit, so it drifts out of date" },
  ],

  startEyebrow: "Where to start",
  startTitle: "Start with less than you think.",
  start: [
    { title: "Write one context file", note: "For the project you touch most. Add a line every time you repeat yourself." },
    { title: "Save three skills", note: "Not fifty. Three jobs you do every week." },
    { title: "Log the work", note: "Decide what someone will pick up later. Log that, not everything." },
    { title: "Then connect data", note: "Through an MCP server or API, read-only first." },
  ],
};
