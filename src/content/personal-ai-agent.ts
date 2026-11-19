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
  metaTitle: "Personal AI assistant setup for business leaders",
  metaDescription:
    "A personal AI assistant built around your inbox, calendar, meetings, and follow-ups, with clear rules on what runs on its own and what waits for your approval.",
  draftBadge: "Draft - not published",
  eyebrow: "Personal AI assistant setup",
  title: "An AI assistant that takes work off your plate, under your rules.",
  lede:
    "I set up personal AI assistants for business owners and executives. They stay on top of your inbox, prep you for meetings, track your follow-ups, and brief you every morning, while anything that leaves your desk waits for your approval.",
  intro: [
    "Built on the tools you already use",
    "Nothing goes out without your approval",
    "Set up with you, so you own it",
  ],

  handles: {
    eyebrow: "What it handles",
    title: "Dedicated support for the work that eats your week.",
    lede:
      "Instead of one general-purpose bot with access to everything, I set up focused assistants for specific parts of your day. Everything that needs your decision lands in one place.",
    items: [
      {
        name: "Inbox",
        job: "Reviews incoming email each morning, filters out the noise, drafts replies in your voice, and flags what actually needs your attention.",
      },
      {
        name: "Meetings",
        job: "Sends a concise brief before every call, then pulls together clean notes and action items as soon as it wraps.",
      },
      {
        name: "Follow-ups",
        job: "Keeps track of commitments you made in emails and meetings, and prepares the follow-up message when it's due.",
      },
      {
        name: "Morning brief",
        job: "One clear page to start your day: what needs a decision, what's on your calendar, and what's already handled.",
      },
      {
        name: "Content",
        job: "Drafts posts and updates in your voice so you stay visible without staring at a blank page. Nothing publishes until you approve it.",
      },
    ],
  },

  gates: {
    eyebrow: "Clear boundaries",
    title: "Prep work runs automatically. Decisions wait for you.",
    lede:
      "The fear with AI isn't that it can't do the work. It's that it will send the wrong email or change the wrong record. We draw a hard line up front between preparation and action.",
    aloneLabel: "Handled automatically",
    alone: [
      "Pulling context from your email, calendar, and connected tools",
      "Sorting, summarizing, and organizing incoming requests",
      "Drafting replies, briefs, meeting notes, and reports",
      "Checking what a proposed change would affect before anything moves",
      "Keeping a clear record of what ran and why",
    ],
    waitLabel: "Always waits for your approval",
    wait: [
      "Sending anything in your name: emails, messages, or public posts",
      "Updating live business records: clients, accounts, or financials",
      "Spending money or approving commitments",
      "Any other sensitive area you want locked down",
    ],
    rule:
      "The operating principle is simple: routine, reversible prep work runs on its own. Anything external, financial, or hard to undo waits for your sign-off.",
  },

  stops: {
    eyebrow: "No constant pings",
    title: "Only four reasons it interrupts your day.",
    lede:
      "A good assistant doesn't tap you on the shoulder every ten minutes. Yours works quietly in the background and only reaches out when it genuinely needs you.",
    items: [
      {
        title: "An approval on your list",
        note: "A draft is ready to send, or an action touches something you've marked for sign-off.",
      },
      {
        title: "A judgment call",
        note: "There are two reasonable ways forward, and it needs your direction before proceeding.",
      },
      {
        title: "Something only you can do",
        note: "A secure login, a signature, or a personal call that can't be delegated.",
      },
      {
        title: "Finished work to review",
        note: "The job is complete, with a quick summary of what was done and where to find it.",
      },
    ],
  },

  steps: {
    eyebrow: "How it comes together",
    title: "Five steps, starting with the biggest drain on your week.",
    lede:
      "I don't drop a complicated system on your desk and walk away. We start with one high-value workflow, prove it works, and expand at your pace.",
    items: [
      {
        title: "Audit your week",
        note: "We look at where your time actually goes and pick the repetitive work that will give you the most hours back first.",
      },
      {
        title: "Connect your tools safely",
        note: "I connect email, calendar, and the software you already use, with reading, drafting, and sending kept as separate permissions.",
      },
      {
        title: "Set your operating rules",
        note: "We put your boundaries in writing: what runs automatically, what waits for your approval, and what is strictly off-limits.",
      },
      {
        title: "Launch with training wheels",
        note: "We turn on one assistant first with approvals required on everything. As it earns your trust, we relax the checks you don't need.",
      },
      {
        title: "Tune it every week",
        note: "We review where it slowed down or asked unnecessarily, refine the rules, and add the next workflow when you're ready.",
      },
    ],
  },

  compare: {
    eyebrow: "Why this works",
    title: "Built like a real operating system, not a chat window.",
    colTopic: "Area",
    colCommon: "Typical AI setup",
    colMine: "How I build it",
    rows: [
      {
        topic: "Permissions",
        common: "One assistant logged into everything with broad access.",
        mine: "Each assistant only sees the tools its job requires. Access to read your inbox never quietly includes permission to send as you.",
      },
      {
        topic: "Oversight",
        common: "Either asks permission for every tiny step or runs unchecked.",
        mine: "A clear, written approval list. Everything else gets handled quietly in the background.",
      },
      {
        topic: "Sign-off",
        common: "Rules live in a chat prompt and get ignored or overridden over time.",
        mine: "Only your explicit sign-off counts, using a simple approve or decline card. No AI ever approves work on your behalf.",
      },
      {
        topic: "Continuity",
        common: "Context stays buried in old chat threads nobody can find later.",
        mine: "Every task, draft, and decision is logged in one place, so nothing gets lost and your team can pick up the thread.",
      },
      {
        topic: "Reliability",
        common: "You correct the same mistake again next week.",
        mine: "Every miss becomes a permanent rule or checklist update, so the system stops making that mistake.",
      },
    ],
  },

  loop: {
    eyebrow: "Gets sharper over time",
    title: "Like a great hire, you shouldn't have to correct the same thing twice.",
    lede:
      "Most AI tools forget your preferences the moment you open a new chat. Every setup I build includes a simple weekly improvement loop, so small corrections turn into lasting habits.",
    steps: [
      { title: "Work wraps up", note: "A brief, email draft, or follow-up finishes." },
      { title: "Spot the friction", note: "If something missed the mark, we ask why." },
      { title: "Capture the lesson", note: "That miss is logged automatically instead of forgotten." },
      { title: "Weekly review", note: "We look at the patterns that cost you the most time." },
      { title: "Update the playbook", note: "We tighten a rule, add a check, or refine a template." },
    ],
    loopNote: "Next week, the system runs on the updated playbook without needing reminders.",
  },

  proof: {
    eyebrow: "Proven on my own business",
    title: "I don't sell theory. I run my own work this way every day.",
    commander:
      "As a company commander, I delegated to develop my leaders, while keeping the high-stakes calls on my desk. I manage AI assistants the exact same way, and that's how I set them up for clients.",
    lede:
      "Most people either give AI too much leash or spend all day babysitting it. I review my own system every week to spot where my rules create unnecessary busywork. Here's what one week of tracking uncovered:",
    stats: [
      { value: "91", label: "assistant work sessions" },
      { value: "103", label: "times I only replied \"yes\", \"ok\" or \"go\"" },
      { value: "65", label: "interruptions that didn't actually need me" },
      { value: "24 h", label: "work left waiting on a rubber-stamp approval" },
    ],
    callout:
      "Every one-word \"yes\" points to a bottleneck you can remove safely. Measuring those stops is how we trim the noise, keep the real guardrails in place, and get more of your week back without giving up control.",
  },

  startEyebrow: "How to start",
  startTitle: "Book a free AI strategy call.",
  startPoints: [
    "A free 30-minute conversation, no sales pitch.",
    "Walk me through the parts of your week you want off your plate first: inbox, meetings, follow-ups, or daily briefs.",
    "Within two business days, I send a written estimate with a recommended plan and a clear price range.",
    "No obligation. You keep the plan either way.",
  ],
  assessmentNote:
    "Looking to roll out AI with the same guardrails across your whole team, not just for yourself? See Claude setup and training.",
  assessmentLinks: [{ label: "Claude setup and training", href: "/services/claude" }] satisfies TextLink[],

  ctaButton: "Book your free AI strategy call",
  ctaSupport:
    "A free 30-minute call, followed by a written estimate with a recommended plan and a price range within two business days. No obligation.",
};
