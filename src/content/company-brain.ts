// Copy for /insights/company-brain. First person as Nick. Every claim comes from
// Nick's own setup. No client names, no invented numbers, no quotes from third parties.

export const COMPANY_BRAIN = {
  path: "/insights/company-brain",
  metaTitle: "Your company brain is a data problem",
  metaDescription:
    "What I mean by a company brain, why connecting Slack and Notion to an AI falls short, and the four pieces I run so people and agents work from the same picture.",
  date: "2026-11-24",
  readingTime: "3 min read",
  author: "Nick Paul",

  eyebrow: "Insights · AI in practice",
  title: "Your company brain is a data problem.",
  lede:
    "A company brain is how your company runs, written down so people and AI agents work from the same picture. Connecting tools is the easy part; keeping it true is the real work.",
  tldrLabel: "The short version",
  tldr: [
    "Explaining the same thing to AI every day? The context is missing.",
    "Write definitions and playbooks first. Connect tools after.",
    "Log the work, or the next session starts from zero.",
    "Treat freshness and permissions like data quality. That's where I see these setups break.",
  ],

  compareEyebrow: "Two ways to build one",
  compareTitle: "Wiring tools in vs running it like data.",
  compareHead: ["Wiring tools in", "What I run"],
  compare: [
    {
      topic: "Context",
      wired: "Often one big pile from Slack, Notion and the CRM",
      run: "A context file per project, plus shared definitions",
    },
    {
      topic: "How work gets done",
      wired: "Prompts often retyped each time",
      run: "Skills: saved processes that get better with use",
    },
    {
      topic: "Memory",
      wired: "Often gone when the chat closes",
      run: "Each session logged to a CRM task, with file locations",
    },
    {
      topic: "Access",
      wired: "Often whatever the connector can reach",
      run: "Read-only by default, with folder-level access and a person approving writes",
    },
    {
      topic: "Upkeep",
      wired: "Often set up once, then left alone",
      run: "Drift checks and a weekly retro",
    },
  ],

  layersEyebrow: "The layers",
  layersTitle: "Each layer leans on the one below it.",
  layersLede: "Agents sit on top. The work that makes them useful sits underneath.",
  /** Top to bottom. */
  layers: [
    { name: "People and agents", note: "Do the work and stop at the gates" },
    { name: "Playbooks", note: "Skills that say how we do a job here" },
    { name: "Shared definitions", note: "What the company's key terms mean, defined once" },
    { name: "Connected, clean data", note: "One place to read from, through MCP tools" },
    { name: "Source systems", note: "CRM, meetings, and the app database" },
  ],

  piecesEyebrow: "What I run",
  piecesTitle: "Four pieces. Plain files and tables.",
  pieces: [
    {
      title: "A definitions doc",
      body: "One glossary for a client platform, built largely from meeting transcripts. It sits next to the database schema, so agents read it when they change code.",
      quoteLead: "What I told the team:",
      quote: "The tighter we get this, the better the MCP tools will be.",
    },
    {
      title: "A context file per project",
      body: "A markdown file in each repo covering the rules and what not to touch. I don't have to re-explain the basics each session.",
    },
    {
      title: "A skills library",
      body: "Saved processes, grouped in bundles. My first pass at a skill is usually rough, and using it is what fixes it.",
    },
    {
      title: "A work log in the CRM",
      body: "Each session ties to one task and notes where its files live. The next session picks up from there.",
    },
  ],

  loopEyebrow: "Keeping it true",
  loopTitle: "Left alone, it rots. So upkeep runs as a loop.",
  loop: [
    { title: "Do the work", note: "One task per session" },
    { title: "Close the session", note: "Ask: could the setup have prevented this mistake?" },
    { title: "Log the lesson", note: "Saved as a dev learning in the CRM" },
    { title: "Run a weekly retro", note: "Lessons turn into skill and rule changes" },
  ],
  loopChecks: [
    "Glossary and context files update in the same commit as schema changes.",
    "A CI job flags MCP tool docs that drift from the live tools.",
    "Two agent systems share our claim-check skill, and the build warns when the copies drift.",
  ],

  gatesEyebrow: "Permissions",
  gatesTitle: "Who can see what, and who can change it.",
  gates: [
    { title: "Read-only by default", note: "I open production databases read-only." },
    { title: "Identity per folder", note: "Each client folder uses its own cloud and GitHub account." },
    { title: "A ratchet on private data", note: "New code that reads contact data fails CI and waits for my review." },
    { title: "A person at the gates", note: "Production writes, merges, deploys and messages wait for my yes." },
  ],

  failEyebrow: "Failure modes",
  failTitle: "How these setups go wrong.",
  fails: [
    { title: "Rot", note: "The doc says one thing, and the system does another." },
    { title: "One word, two meanings", note: "The same word is defined in a few places, and they disagree." },
    { title: "Leaky access", note: "The AI can read what the person asking can't." },
    { title: "Logging everything", note: "Noise buries the one note someone needed." },
    { title: "No owner", note: "Without an owner or an update habit, it drifts." },
  ],

  startEyebrow: "Where to start",
  startTitle: "Start with less than you think.",
  start: [
    { title: "Write one context file", note: "Pick one active project. Add a line each time you repeat yourself." },
    { title: "Save three skills", note: "Pick three jobs you do every week. Skip the rest for now." },
    { title: "Log what matters", note: "Decide what someone will need in the next session, and log only that." },
    { title: "Then connect data", note: "Through an MCP server or API. Read-only first." },
  ],

  serviceText: "Want one set up for your company? See Company brain setup.",
  serviceLinks: [{ label: "Company brain setup", href: "/services/company-brain" }],
};
