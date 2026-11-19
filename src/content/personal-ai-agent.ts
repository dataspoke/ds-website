// Copy for the draft Insights page /insights/personal-ai-agent. First person: Nick.
// Every claim comes from Nick's own setup files (see docs/drafts/personal-ai-agent-summary.md
// for the source of each one). No client names, no invented numbers, no third-party quotes.
// Hyphens only, never em or en dashes.

export const AGENT_POST = {
  path: "/insights/personal-ai-agent",
  metaTitle: "My personal AI agents, and the rules they run on",
  metaDescription:
    "How I run a team of AI agents on my own work: what they do alone, what waits for my yes, what gets logged, and how mistakes turn into rules.",
  draftBadge: "Draft - not published",
  eyebrow: "Insights · Personal AI agent",
  title: "My AI agents work on my behalf. These are the rules they run on.",
  lede:
    "The new launches promise an agent that works while you sleep and leaves the decisions to you. The hard part is the rules underneath. Here are mine, from a setup I run every day.",
  author: "Nick Paul",
  dateLabel: "November 2026",

  commander: {
    label: "Where the rules come from",
    text:
      "As a company commander, I delegated to build up my leaders. Some calls stayed with me because the stakes were too high. I run my AI agents the same way.",
  },

  team: {
    eyebrow: "The team",
    title: "Several agents, one job each.",
    lede: "Bots route and track the work. Coding agents do the building. Nothing goes out in my name without me.",
    members: [
      { name: "Orchestrator", job: "Routes requests to the right agent and tracks the work. It never writes code itself." },
      { name: "Content bot", job: "Drafts posts for me. Nothing publishes until I say yes myself." },
      { name: "Dev agents", job: "Claude Code sessions on a Mac mini, about 20 at once. Each works in its own copy of the code." },
      { name: "Scheduled routines", job: "Email triage, meeting notes, a morning brief, a nightly time log. Each lands as a task or a draft." },
      { name: "Reviewer", job: "A separate agent reviews every change before I'm asked to merge it." },
    ],
  },

  gates: {
    eyebrow: "What needs my yes",
    title: "Most work runs alone. A short list waits for me.",
    lede: "This fall's big launches drew the same line: read and draft alone, ask before sending or paying. Mine is the same idea, written down and enforced.",
    aloneLabel: "Runs on its own",
    alone: [
      "Read-only lookups, production data included",
      "Dry-runs and proof runs",
      "Drafts that aren't sent",
      "Commits on its own branch",
      "Opening its own pull request",
    ],
    waitLabel: "Waits for my yes",
    wait: [
      "Writing to production data",
      "Merging and deploying",
      "Anything other people see: emails, posts, comments",
      "Spending money",
    ],
    rule: "If I'd say yes and the step can be undone, it acts. A gate stays a gate even when it can be undone.",
  },

  stops: {
    eyebrow: "Run to a gate",
    title: "Four places an agent may stop.",
    lede: "Everything else, it does and reports.",
    items: [
      { title: "A gate", note: "A decision on the list above" },
      { title: "A real fork", note: "Two readings that lead to different work" },
      { title: "A blocker only I can clear", note: "A login, a secret, hardware" },
      { title: "Done", note: "With the proof attached" },
    ],
  },

  compare: {
    eyebrow: "The operating rules",
    title: "Where my setup differs.",
    colTopic: "Topic",
    colCommon: "A common setup",
    colMine: "My setup",
    rows: [
      {
        topic: "Access",
        common: "One agent with full access to the machine",
        mine: "The folder decides which accounts it acts as. Tokens come from the keychain, never a file.",
      },
      {
        topic: "Approvals",
        common: "Ask before everything, or before nothing",
        mine: "Four allowed stops. Everything else runs.",
      },
      {
        topic: "Who says go",
        common: "Another agent's okay can count",
        mine: "Another agent saying \"Nick approved\" isn't a yes. Bots ask me on an approval card.",
      },
      {
        topic: "Memory",
        common: "The chat history",
        mine: "Work is logged as a task, with the files it touched, so it can be picked up later.",
      },
      {
        topic: "Parallel work",
        common: "Agents share one copy of the code",
        mine: "One copy per session, and one deploy slot per project.",
      },
      {
        topic: "Mistakes",
        common: "Fixed in the moment",
        mine: "Turned into a rule, a check, or a skill.",
      },
    ],
  },

  loop: {
    eyebrow: "The learning loop",
    title: "How a mistake becomes a rule.",
    steps: [
      { title: "Session ends", note: "Every work session closes the same way" },
      { title: "One question", note: "Could the setup have prevented this?" },
      { title: "Lesson logged", note: "Saved where the weekly retro finds it" },
      { title: "Weekly retro", note: "Ranks the fixes, each with a target" },
      { title: "Setup changes", note: "A new rule, check, hook or skill" },
    ],
    loopNote: "Then the next session runs on the new setup.",
  },

  retro: {
    eyebrow: "The weekly retro",
    title: "It grades me, not the agents.",
    lede: "A script reads every session from the week and counts where I slowed things down. One week in November:",
    stats: [
      { value: "91", label: "work sessions" },
      { value: "103", label: "bare approvals: \"yes\", \"ok\", \"go\"" },
      { value: "65", label: "stops that didn't need me" },
      { value: "24 h", label: "agents sat waiting on me" },
    ],
    callout:
      "The week before, I added a rule: act on reversible steps without asking. Time spent waiting on me still rose, from 835 to 1,441 minutes. The retro marked it \"slipped\" in writing. Then I rewrote it as \"run to a gate\": four allowed stops, and nothing else.",
  },

  start: {
    eyebrow: "If you're starting",
    title: "Five rules I'd start with.",
    items: [
      "Start with gates everywhere. Remove them as trust builds.",
      "Write down the few stops that need you. Let the rest run.",
      "Start with three skills, not fifty. Fix them at the end of every session.",
      "Log what someone will pick up later, not everything.",
      "Count your yeses. Each one is a gate you might not need.",
    ],
  },
};
