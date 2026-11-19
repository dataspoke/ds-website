// Copy for the draft Insights page /insights/personal-ai-agent. First person: Nick.
// Audience: business professionals and owners, not developers. Keep it in plain
// business words: no branches, deploys, worktrees, commits or tool names.
// Every claim comes from Nick's own setup files (see docs/drafts/personal-ai-agent-summary.md
// for the source of each one). No client names, no invented numbers, no third-party quotes.
// Hyphens only, never em or en dashes.

export const AGENT_POST = {
  path: "/insights/personal-ai-agent",
  metaTitle: "My personal AI assistants, and the rules they follow",
  metaDescription:
    "How I hand my inbox, meetings, content and client work to a team of AI assistants: what they do alone, what waits for my yes, and how mistakes turn into rules.",
  draftBadge: "Draft - not published",
  eyebrow: "Insights · Personal AI agent",
  title: "My AI assistants work on my behalf. Here are the rules they follow.",
  lede:
    "The big launches promise an assistant that works through your inbox while you sleep and leaves the decisions to you. The hard part is the rules underneath. Here are mine, from a setup I run every day.",
  author: "Nick Paul",
  dateLabel: "November 2026",

  commander: {
    label: "Where the rules come from",
    text:
      "As a company commander, I delegated to build up my leaders. Some calls stayed with me because the stakes were too high. I run my AI assistants the same way.",
  },

  team: {
    eyebrow: "The team",
    title: "Several assistants, one job each.",
    lede: "One coordinates. The others each own one kind of work. Nothing goes out in my name without me.",
    members: [
      { name: "Coordinator", job: "Takes my requests, hands each one to the right assistant, and tracks it to done." },
      { name: "Inbox", job: "Sorts my email every morning. Anything that needs me becomes a task on my list." },
      { name: "Meetings", job: "Pulls notes and action items from my calls, every hour, into my records." },
      { name: "Content", job: "Drafts my posts. Nothing publishes until I say yes myself." },
      { name: "Client work", job: "Builds and fixes the tools I run for clients. A separate assistant checks the work before it reaches me." },
    ],
  },

  gates: {
    eyebrow: "What needs my yes",
    title: "Most work runs alone. A short list waits for me.",
    lede: "This fall's big launches drew the same line: read and draft alone, ask before sending or paying. Mine is the same idea, written down and enforced.",
    aloneLabel: "Runs on its own",
    alone: [
      "Looking things up, in any system it can read",
      "Sorting, summarizing and drafting",
      "Preparing a plan, a report or a reply",
      "Test runs that show what a change would do",
      "Working on its own copy, never the live version",
    ],
    waitLabel: "Waits for my yes",
    wait: [
      "Changing live records: customers, accounts, money",
      "Putting a change live for a client",
      "Anything other people see: emails, posts, comments",
      "Spending money",
    ],
    rule: "If I'd say yes and it can be undone, it goes ahead. The short list always waits, even when it could be undone.",
  },

  stops: {
    eyebrow: "When it may interrupt me",
    title: "Four reasons an assistant may stop and ask.",
    lede: "Otherwise, it does the work and reports back.",
    items: [
      { title: "A decision", note: "Something on the short list above" },
      { title: "A real fork", note: "Two fair readings that lead to different work" },
      { title: "Something only I can do", note: "A login, a password, a device in my hand" },
      { title: "Done", note: "With proof that it worked" },
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
        common: "One assistant signed in to everything",
        mine: "Each client has its own accounts, so an assistant can't act as the wrong company. Passwords stay in a locked vault, never in a file.",
      },
      {
        topic: "Approvals",
        common: "It asks about everything, or about nothing",
        mine: "Four reasons to interrupt me. Everything else runs.",
      },
      {
        topic: "Who says go",
        common: "One assistant can okay another's work",
        mine: "Only my own yes counts. Assistants ask on an approve or don't-approve card.",
      },
      {
        topic: "Memory",
        common: "Whatever is in the chat",
        mine: "Every job is logged as a task, with its files, so it can be picked up later.",
      },
      {
        topic: "Mistakes",
        common: "Fixed once, then forgotten",
        mine: "Turned into a written rule, a check, or a playbook.",
      },
    ],
  },

  loop: {
    eyebrow: "The learning loop",
    title: "How a mistake becomes a rule.",
    steps: [
      { title: "Job ends", note: "Every piece of work closes the same way" },
      { title: "One question", note: "Could my setup have prevented this?" },
      { title: "Lesson logged", note: "Saved where the weekly review finds it" },
      { title: "Weekly review", note: "Ranks the fixes, each with a target" },
      { title: "Setup changes", note: "A new rule, check or playbook" },
    ],
    loopNote: "Then the next job runs on the better setup.",
  },

  retro: {
    eyebrow: "The weekly review",
    title: "It grades me, not the assistants.",
    lede: "Each week, a report reads every work session and counts where I slowed things down. One week in November:",
    stats: [
      { value: "91", label: "work sessions" },
      { value: "103", label: "times I only typed \"yes\", \"ok\" or \"go\"" },
      { value: "65", label: "interruptions that didn't need me" },
      { value: "24 h", label: "assistants sat waiting on me" },
    ],
    callout:
      "The week before, I added a rule: if it can be undone, don't ask me. Waiting on me still rose, from about 14 hours to 24. The review marked it \"slipped\" in writing. Then I rewrote the rule: four reasons to interrupt me, and nothing else.",
  },

  start: {
    eyebrow: "If you're starting",
    title: "Five rules I'd start with.",
    items: [
      "Start with approvals on everything. Remove them as trust builds.",
      "Write down the few decisions that need you. Let the rest run.",
      "Start with three playbooks, not fifty. Improve them after each use.",
      "Log what someone will need to pick up later, not everything.",
      "Count your yeses. Each one may be an approval you don't need.",
    ],
  },
};
