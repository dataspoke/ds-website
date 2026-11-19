import type { TextLink } from "@/types";

// Copy for the DRAFT service page /services/personal-ai-agent. First person ("I"),
// matching /services/claude: Nick does this work himself.
// Audience: business owners and professionals, not developers. Plain business words.
// What the client gets is described as the setup and its rules. Proof comes from the
// setup Nick runs on his own work (sources in docs/drafts/personal-ai-agent-summary.md).
// No client names, no client results, no prices, no invented numbers, no third-party quotes.
// Hyphens only, never em or en dashes.

export const AGENT_PAGE = {
  path: "/services/personal-ai-agent",
  metaTitle: "Personal AI assistant setup for business owners",
  metaDescription:
    "I set up AI assistants for your inbox, meetings, follow-ups and reports, with clear rules on what runs alone and what waits for your yes. Free AI strategy call.",
  draftBadge: "Draft - not published",
  eyebrow: "Personal AI assistant setup",
  title: "An AI assistant that works on your behalf, by your rules.",
  lede:
    "I set up AI assistants for business owners and leaders. They handle the inbox, meeting prep, follow-ups and reports. You decide what they may do alone and what waits for your yes.",
  intro: ["On accounts you already use", "Nothing goes out without your yes", "I teach you to run it"],

  handles: {
    eyebrow: "What it handles",
    title: "Several assistants, one job each.",
    lede: "Each assistant owns one kind of work. Anything that needs you lands on one list.",
    items: [
      { name: "Inbox", job: "Sorts your email each morning, drafts replies, and turns what needs you into a task." },
      { name: "Meetings", job: "Preps you before the call, then captures notes and action items after it." },
      { name: "Follow-ups", job: "Tracks what you promised and to whom, and drafts the nudge when it's due." },
      { name: "Morning brief", job: "One page each morning: what needs you today, and what can wait." },
      { name: "Content", job: "Drafts posts and updates in your voice. Nothing publishes until you say yes." },
    ],
  },

  gates: {
    eyebrow: "Your rules",
    title: "Most work runs alone. A short list waits for you.",
    lede: "This fall's big launches drew the same line: read and draft alone, ask before sending or paying. I write your version down and set the assistants to follow it.",
    aloneLabel: "Runs on its own",
    alone: [
      "Looking things up in the systems you connect",
      "Sorting, summarizing and drafting",
      "Preparing a plan, a report or a reply",
      "Test runs that show what a change would do",
      "Logging what it did and why",
    ],
    waitLabel: "Waits for your yes",
    wait: [
      "Sending anything in your name: emails, posts, comments",
      "Changing live records: customers, accounts, money",
      "Spending money",
      "Anything else you add to the list",
    ],
    rule: "If you'd say yes and it can be undone, it goes ahead. The short list always waits, even when it could be undone.",
  },

  stops: {
    eyebrow: "When it may interrupt you",
    title: "Four reasons an assistant may stop and ask.",
    lede: "Otherwise, it does the work and reports back. Fewer interruptions, and the ones you get matter.",
    items: [
      { title: "A decision", note: "Something on your short list" },
      { title: "A real fork", note: "Two fair readings that lead to different work" },
      { title: "Something only you can do", note: "A login, a password, a signature" },
      { title: "Done", note: "With proof that it worked" },
    ],
  },

  steps: {
    eyebrow: "How I set it up",
    title: "Five steps, one assistant at a time.",
    items: [
      { title: "Map your week", note: "Where your time goes, and which jobs repeat." },
      { title: "Connect your accounts", note: "Email, calendar and the tools you already use. Reading, drafting and sending are separate permissions." },
      { title: "Write your rules", note: "What runs alone, what waits for your yes, and what it may never do." },
      { title: "Turn on one assistant", note: "Start with approvals on everything. Remove them as trust builds." },
      { title: "Review weekly", note: "Count where it stopped for you, then cut the approvals you don't need." },
    ],
  },

  compare: {
    eyebrow: "The difference",
    title: "What I set up, next to a common setup.",
    colTopic: "Topic",
    colCommon: "A common setup",
    colMine: "What I set up",
    rows: [
      {
        topic: "Access",
        common: "One assistant signed in to everything",
        mine: "Each assistant gets only the accounts its job needs. Reading your inbox never quietly means sending as you.",
      },
      {
        topic: "Approvals",
        common: "It asks about everything, or about nothing",
        mine: "A written short list. Everything else runs.",
      },
      {
        topic: "Who says go",
        common: "One assistant can okay another's work",
        mine: "Only your own yes counts, on a simple approve or don't-approve card.",
      },
      {
        topic: "Memory",
        common: "Whatever is in the chat",
        mine: "Every job is logged as a task, so you or your team can pick it up later.",
      },
      {
        topic: "Mistakes",
        common: "Fixed once, then forgotten",
        mine: "Turned into a written rule, a check, or a playbook, so it doesn't repeat.",
      },
    ],
  },

  loop: {
    eyebrow: "It gets better every week",
    title: "How a mistake becomes a rule.",
    steps: [
      { title: "Job ends", note: "Every piece of work closes the same way" },
      { title: "One question", note: "Could the setup have prevented this?" },
      { title: "Lesson logged", note: "Saved where the weekly review finds it" },
      { title: "Weekly review", note: "Ranks the fixes, each with a target" },
      { title: "Setup changes", note: "A new rule, check or playbook" },
    ],
    loopNote: "Then the next job runs on the better setup.",
  },

  proof: {
    eyebrow: "I run this myself",
    title: "Same rules, on my own work, every day.",
    commander:
      "As a company commander, I delegated to build up my leaders. Some calls stayed with me because the stakes were too high. I run AI assistants the same way, and I set yours up that way too.",
    lede: "My weekly review counts where I slowed my own assistants down. One week in November:",
    stats: [
      { value: "91", label: "work sessions" },
      { value: "103", label: "times I only typed \"yes\", \"ok\" or \"go\"" },
      { value: "65", label: "interruptions that didn't need me" },
      { value: "24 h", label: "assistants sat waiting on me" },
    ],
    callout:
      "Those numbers are why the rules exist. Every bare \"yes\" is an approval you may not need. Counting them is how you know which ones to cut.",
  },

  startEyebrow: "How to start",
  startTitle: "Book a free AI strategy call.",
  startPoints: [
    "A free 30-minute call.",
    "Tell me which part of your week you want back first: the inbox, meetings, follow-ups or reports.",
    "Within two business days I send a written estimate with a recommended plan and a price range.",
    "No obligation. You keep the estimate either way.",
  ],
  assessmentNote:
    "Want the same rules for your whole team's AI, not just your own assistant? See Claude setup and training.",
  assessmentLinks: [{ label: "Claude setup and training", href: "/services/claude" }] satisfies TextLink[],

  ctaButton: "Book your free AI strategy call",
  ctaSupport:
    "A free 30-minute call, then a written estimate with a recommended plan and a price range within two business days. No obligation.",
};
