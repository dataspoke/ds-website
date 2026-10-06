import type { Product, ServiceLine, ServiceLineSlug, Stage } from "@/types";

// Product copy. Each product belongs to one service line below.
// The legacy STAGES grouping at the bottom reuses these same objects.

const CONNECTED_COMPANY: Product = {
  slug: "connected-company",
  title: "Connected Company",
  description:
    "Every source your business produces, flowing into one place you own: calls, call transcripts, meeting notes, ads, CRM activity, operations and finance.",
  result:
    "Phone calls, signed documents and emails land on the right customer record without anyone filing them.",
  soundsLike: [
    "Someone on your team spends hours a week copying data from one program to another.",
    "You have a Zapier setup that breaks quietly and nobody notices for weeks.",
    "You've changed staff and half your automations still run under the person who left.",
  ],
  youGet: [
    "Information moves between your tools without anyone copying it.",
    "An alert when something needs a human decision, instead of a silent failure.",
    "One customer record that follows the person from first call to final payment.",
    "Automations that are documented and owned, not a black box.",
  ],
};

const LEAD_FLOW: Product = {
  slug: "lead-flow",
  title: "Lead Flow",
  description:
    "Every lead from every source captured in minutes, acknowledged instantly and followed up by text and email until they book or say no.",
  result:
    "Leads from ads, your website and lead vendors reach your CRM in minutes, and the customer hears back right away.",
  soundsLike: [
    "A lead comes in Saturday night and nobody sees it until Tuesday.",
    "Your team copies leads by hand from a vendor's email into the CRM.",
    "Someone who said \"not interested\" keeps getting your marketing emails.",
  ],
  youGet: [
    "Every lead in your CRM within minutes, with the customer's original message attached.",
    "An instant, friendly acknowledgment so the customer knows a real company got their request.",
    "Follow-up that starts and stops on its own based on what the lead actually does.",
    "A phone line that can take intake questions and route the call when nobody can pick up.",
  ],
};

const TRUST_LADDER: Product = {
  slug: "trust-ladder",
  title: "Trust Ladder",
  description:
    "I collect what your business produces, process it and turn it into structured records: clients, projects, decisions, policies. Not one giant pile of files. Every fact carries a trust level and a link to where it came from.",
  result:
    "AI and reports draw on what was decided, not on what someone once said in a meeting.",
  soundsLike: [
    "Two documents say different things and nobody knows which one is current.",
    "A decision was made on a call, and three weeks later nobody can find it.",
    "You'd like AI to answer questions, but you don't trust what it would read.",
  ],
  youGet: [
    "Calls, emails and documents turned into structured records with a source on each one.",
    "Every fact tagged Decided, Documented, Discussed or Hearsay.",
    "One place where the current answer lives, and a trail to how it got there.",
    "AI that says \"this was only discussed\" instead of passing hearsay off as policy.",
  ],
};

const LIVE_NUMBERS: Product = {
  slug: "live-numbers",
  title: "Live Numbers",
  description:
    "Dashboards and monthly reports that build themselves from your real systems. Some numbers you need every Monday, the same way, without asking anyone.",
  result:
    "A weekly scorecard that matches your CRM to the lead, and shows cost per paying customer by channel.",
  soundsLike: [
    "Your leadership meeting starts with a debate about whose number is right.",
    "Month-end means someone spends a day reconciling reports by hand.",
    "Ad platforms report conversions your sales team can't find.",
  ],
  youGet: [
    "A scorecard that matches your CRM, down to the individual lead.",
    "Monthly reports that build and send themselves.",
    "One trusted answer to what you spent and what you got, by channel and by agency.",
    "Numbers you can hand to your bookkeeper or your board without caveats.",
  ],
};

const KPI_HIERARCHY: Product = {
  slug: "kpi-hierarchy",
  title: "KPI Hierarchy",
  description:
    "One goal at the top. The lagging numbers that prove you hit it. The leading indicators your team can move this week. A weekly scorecard that ties them together.",
  result:
    "Every number on the dashboard answers to the goal, and every manager knows which one is theirs.",
  soundsLike: [
    "Your dashboard has forty numbers and nobody can say which three matter.",
    "You find out you missed the quarter when the quarter is over.",
  ],
  youGet: [
    "A goal broken down into lagging KPIs and leading indicators.",
    "An owner for each number.",
    "A weekly scorecard built from the systems you already run.",
  ],
};

const YOUR_OWN_APP: Product = {
  slug: "your-own-app",
  title: "Internal Tools",
  description:
    "An app.yourcompany.com built around how your business actually works. It sits on top of the systems you already pay for and shows each person the work that's theirs.",
  result:
    "Your team works in one screen built for them, instead of five tools built for everyone.",
  soundsLike: [
    "Your team keeps a spreadsheet next to the software because the software doesn't fit.",
    "You pay for features you don't use and still can't do the one thing you need.",
    "New staff need a week to learn which of five tools holds which answer.",
  ],
  youGet: [
    "A web app on your own domain, built for your process.",
    "Each person's work on one screen, pulled from the systems you already run.",
    "Your data stays in systems you own, not locked in mine or a new vendor's.",
  ],
};

const CLIENT_PORTAL: Product = {
  slug: "client-portal",
  title: "Client Portal",
  description:
    "A place where your clients log in and see their status, documents and invoices. It reads from your CRM and accounting system, so nobody updates it by hand.",
  result:
    "Fewer \"where is this at?\" calls, and clients who feel looked after between meetings.",
  soundsLike: [
    "Clients email to ask for a status you could simply show them.",
    "Documents go back and forth as attachments and nobody knows which version is final.",
  ],
  youGet: [
    "A branded portal on your own domain.",
    "Status, documents and invoices pulled live from the systems you already use.",
    "Per-client logins, so each client sees only their own work.",
  ],
};

const MOBILE_APP: Product = {
  slug: "mobile-app",
  title: "Mobile Apps",
  description:
    "iOS and Android apps for your customers or your crew, built on the booking, CRM or field system you already pay for. Your brand, your data, your app store listing.",
  result:
    "Customers book and pay in your app, and you own the relationship instead of a vendor.",
  soundsLike: [
    "Customers use an app from a vendor nobody can reach.",
    "Your crew fills in paper forms that someone retypes at the office.",
  ],
  youGet: [
    "Native-feeling iOS and Android apps under your company's name.",
    "Built on your existing systems, so nothing has to migrate.",
    "Plain-English documentation and code you own, so you're never stuck with me.",
  ],
};

const COMPANY_BRAIN: Product = {
  slug: "company-brain",
  title: "Company Brain",
  description:
    "A private assistant that can see your CRM, calls, documents and numbers. Ask in plain English, get an answer with the source behind it. Runs under your own logins.",
  result:
    "An owner asks \"what do I need to know before this meeting?\" and gets the client history, recent calls and open tasks in one answer.",
  soundsLike: [
    "You answer the same \"where is this at?\" questions from your team every day.",
    "Important details live in call recordings nobody has time to re-listen to.",
    "You've tried ChatGPT but it doesn't know anything about your business.",
  ],
  youGet: [
    "Plain-English answers about your own clients, calls and tasks, with sources.",
    "Call and meeting recordings turned into searchable transcripts and summaries.",
    "First drafts of reports and proposals that already reflect your data.",
    "Secure, per-person access. Nothing shared beyond the people you approve.",
  ],
};

const AI_READY_COMPANY: Product = {
  slug: "ai-ready-company",
  title: "AI‑Ready Company",
  description:
    "How your business actually runs, written down and kept current: systems, processes, roles. Then your team trained to use AI on it, with custom AI tools set up for the jobs they do every day.",
  result:
    "An internal playbook that updates itself from the documents your team already edits, and a team that knows how to put AI to work on it.",
  soundsLike: [
    "New hires learn the job by shadowing, because the written process is outdated or missing.",
    "Your team uses AI tools inconsistently, or not at all, because nobody set them up for the work.",
    "You'd like to use AI but aren't sure what it would even have access to.",
  ],
  youGet: [
    "A company playbook: systems, processes and roles, kept current from the documents you already edit.",
    "Hands-on training for your team on the AI tools that fit their jobs.",
    "Custom AI tools for your recurring work: intake, proposals, reports, follow-up.",
    "A clear map of what AI can and can't see, so nothing leaks.",
  ],
};

const AUTOMATE_THE_BUSYWORK: Product = {
  slug: "automate-the-busywork",
  title: "Automate the Busywork",
  description:
    "Any job someone does the same way every week runs itself: intake, follow-up, reconciliation, sending reports. Where AI can do the work, it drafts and a person approves.",
  result:
    "Hours back every week, and nobody retyping what the business already knows.",
  soundsLike: [
    "The same report gets rebuilt by hand every Monday.",
    "Proposals, intake forms and follow-ups are written from scratch each time.",
    "A person is the only thing moving work from one step to the next.",
  ],
  youGet: [
    "Repeat work that runs on a schedule or on a trigger, with a person reviewing instead of retyping.",
    "AI that drafts the document, the reply or the summary, and waits for approval.",
    "A record of every automated step, so you can see what happened and why.",
  ],
};

const EARLY_WARNINGS: Product = {
  slug: "early-warnings",
  title: "Early Warnings",
  description:
    "Your business tells you what's about to happen before it does. A customer about to leave, a job drifting over budget, a quarter that needs two more crews, cash getting tight.",
  result:
    "You call the customer before they call you, and you hire before the rush instead of during it.",
  soundsLike: [
    "You find out a customer left when the payment stops.",
    "Jobs go over budget and you learn about it at invoicing.",
    "Hiring always happens in a panic.",
  ],
  youGet: [
    "A short list every morning of what needs attention today.",
    "Alerts on the signals that matter: silence from a good customer, a stalled deal, a slipping margin.",
    "Forecasts for demand, capacity and cash, built from your own history.",
  ],
};

const FIND_THE_MARGIN: Product = {
  slug: "find-the-margin",
  title: "Find the Margin",
  description:
    "Where the next customers and the next dollars are. Prospects that look like your best customers, services and segments that actually pay, pricing that's leaking. Tested properly before you spend.",
  result:
    "A ranked list of who to call next, and proof of which bet paid off.",
  soundsLike: [
    "You suspect one service or customer type loses money but can't prove it.",
    "Your best customers have something in common and nobody has looked for it.",
    "Marketing decisions are made on gut feel and the agency's own report.",
  ],
  youGet: [
    "Profitability by customer, service and channel, from connected finance and operations data.",
    "Prospect lists built from your best existing customers or from public records.",
    "Experiments set up and measured properly, so you know a bet paid off before you double it.",
  ],
};

/** The six service lines. Two hub lines first, then four spokes. */
export const SERVICE_LINES: ServiceLine[] = [
  {
    slug: "capture",
    kind: "hub",
    title: "Capture",
    oneLiner: "Every system feeding one picture you own.",
    problem:
      "CRM, accounting, scheduling, phones. Each one is right about its own piece and wrong about the whole. Every call, meeting, email and text is a record of the business, and almost none of it is captured anywhere you can look at it.",
    soundsLike: [
      "Someone on your team spends hours a week copying data from one program to another.",
      "A lead comes in Saturday night and nobody sees it until Tuesday.",
      "You have a Zapier setup that breaks quietly and nobody notices for weeks.",
    ],
    youGet: [
      "Information moves between your tools without anyone copying it.",
      "One customer record that follows the person from first call to final payment.",
      "Every lead in your CRM within minutes, with the customer's original message attached.",
    ],
    products: [CONNECTED_COMPANY, LEAD_FLOW],
  },
  {
    slug: "organize",
    kind: "hub",
    title: "Organize",
    oneLiner: "A pile of data turned into records AI and reports can trust.",
    problem:
      "Once the data is captured, it's still a pile. Calls, emails and documents disagree with each other. Some of it was decided. Some of it was only said once in a meeting. AI can't tell the difference unless someone sorts it, so it treats a passing comment like company policy. I collect it, process it and turn it into structured records, each one marked with how far you can trust it.",
    soundsLike: [
      "Two documents say different things and nobody knows which one is current.",
      "A decision was made on a call, and three weeks later nobody can find it.",
      "You'd like AI to answer questions, but you don't trust what it would read.",
    ],
    youGet: [
      "Structured records built from your calls, emails and documents, not one giant pile of files.",
      "A trust level on every fact: Decided, Documented, Discussed or Hearsay.",
      "AI and reports that know what was decided and what is only hearsay.",
      "A source behind every answer, so you can check it.",
    ],
    products: [TRUST_LADDER],
  },
  {
    slug: "metrics-dashboards",
    kind: "spoke",
    title: "Metrics & Dashboards",
    oneLiner: "Numbers you need every Monday, the same way, without asking anyone.",
    problem:
      "Month-end means exporting four reports and hoping they match. The leadership meeting starts with a debate about whose number is right, and nobody can say which numbers actually move the goal. Routine reports belong in a dashboard. You shouldn't prompt AI to rebuild the same report every Monday and get a slightly different answer each time.",
    soundsLike: [
      "Your leadership meeting starts with a debate about whose number is right.",
      "Month-end means someone spends a day reconciling reports by hand.",
      "Someone asks AI to rebuild the same report every Monday.",
    ],
    youGet: [
      "A scorecard that matches your CRM, down to the individual lead.",
      "Monthly reports that build and send themselves.",
      "A KPI hierarchy: one goal, the lagging KPIs that prove it, the leading indicators your team can move this week and a weekly scorecard that ties them together.",
    ],
    products: [LIVE_NUMBERS, KPI_HIERARCHY],
  },
  {
    slug: "custom-software",
    kind: "spoke",
    title: "Custom Software",
    oneLiner: "Every business should have an app.yourcompany.com built around how it actually works.",
    problem:
      "Off-the-shelf software is built for everyone, so it fits nobody exactly. Your team fills the gaps with spreadsheets, sticky notes and copy and paste. You already pay for systems that hold the data. What's missing is the screen built around how your company works. I build internal tools, client portals and mobile apps on top of the systems you already pay for.",
    soundsLike: [
      "Your team keeps a spreadsheet next to the software because the software doesn't fit.",
      "You pay for features you don't use and still can't do the one thing you need.",
      "Clients email to ask for a status you could simply show them.",
    ],
    youGet: [
      "Internal tools that show each person the work that's theirs.",
      "Client portals where customers see status, documents and invoices without calling you.",
      "iOS and Android apps on the booking, CRM or accounting system you already pay for.",
      "Code you own and plain-English documentation, so you're never stuck with me.",
    ],
    products: [YOUR_OWN_APP, CLIENT_PORTAL, MOBILE_APP],
  },
  {
    slug: "ai-implementation",
    kind: "spoke",
    title: "AI Implementation",
    oneLiner: "AI that knows your business, and a team that knows how to use it.",
    problem:
      "You've tried ChatGPT but it doesn't know anything about your business. Your team uses AI tools inconsistently, or not at all, and the same work still gets retyped every week.",
    soundsLike: [
      "You answer the same \"where is this at?\" questions from your team every day.",
      "Your team uses AI tools inconsistently, or not at all, because nobody set them up for the work.",
      "The same report gets rebuilt by hand every Monday.",
    ],
    youGet: [
      "Plain-English answers about your own clients, calls and tasks, with sources.",
      "Hands-on training for your team on the AI tools that fit their jobs.",
      "AI that drafts the document, the reply or the summary, and waits for approval.",
    ],
    products: [COMPANY_BRAIN, AI_READY_COMPANY, AUTOMATE_THE_BUSYWORK],
  },
  {
    slug: "analytics-data-science",
    kind: "spoke",
    title: "Analytics & Data Science",
    oneLiner: "Know what's coming, and where the next dollars are.",
    problem:
      "You find out a customer left when the payment stops. You suspect one service loses money but can't prove it. Decisions get made on gut feel and the agency's own report.",
    soundsLike: [
      "You find out a customer left when the payment stops.",
      "You suspect one service or customer type loses money but can't prove it.",
      "Marketing decisions are made on gut feel and the agency's own report.",
    ],
    youGet: [
      "A short list every morning of what needs attention today.",
      "Profitability by customer, service and channel.",
      "Experiments set up and measured properly, so you know a bet paid off before you double it.",
    ],
    products: [EARLY_WARNINGS, FIND_THE_MARGIN],
  },
];

export const HUB_LINES = SERVICE_LINES.filter((l) => l.kind === "hub");
export const SPOKE_LINES = SERVICE_LINES.filter((l) => l.kind === "spoke");

export function getServiceLine(slug: string): ServiceLine | undefined {
  return SERVICE_LINES.find((l) => l.slug === slug);
}

/** Copy for the /services overview page. */
export const SERVICES_PAGE = {
  eyebrow: "Services",
  title: "Your data in the middle. Everything else runs on it.",
  lede:
    "Two hub services get your data captured and organized. Four spokes put it to work. You don't need to know what to ask for. Find the problem that sounds like yours.",
  diagramHub: "Your data",
  hubEyebrow: "The hub",
  hubTitle: "Start with the data.",
  hubLede:
    "Every spoke runs on what the hub collects. Most clients start here, because a dashboard or an AI tool is only as good as the data under it.",
  spokeEyebrow: "The spokes",
  spokeTitle: "Then put it to work.",
  spokeLede:
    "Each spoke is a project with a fixed scope. Pick the one that hurts most today. The others get easier once the hub is in place.",
};

/** Diagram labels, split into lines so they fit on a phone. */
export const SERVICE_DIAGRAM_LABELS: Record<ServiceLineSlug, string[]> = {
  capture: ["Capture"],
  organize: ["Organize"],
  "metrics-dashboards": ["Metrics &", "Dashboards"],
  "custom-software": ["Custom", "Software"],
  "ai-implementation": ["AI", "Implementation"],
  "analytics-data-science": ["Analytics &", "Data Science"],
};

export interface LadderRung {
  label: string;
  description: string;
}

export interface Ladder {
  eyebrow: string;
  title: string;
  lede: string;
  rungs: LadderRung[];
  caption: string;
}

/** Simple step graphics shown on some line pages. Top rung first. */
export const LINE_LADDERS: Partial<Record<ServiceLineSlug, Ladder>> = {
  organize: {
    eyebrow: "The trust ladder",
    title: "Not every fact is equal.",
    lede:
      "I collect what your business produces, process it and file each fact on one of four rungs. Each one keeps a link back to its source.",
    rungs: [
      {
        label: "Decided",
        description:
          "Signed off by someone who can make the call. A contract, an approved price, a written policy.",
      },
      {
        label: "Documented",
        description:
          "Written down in a place of record but not formally approved. A process doc, a proposal, a CRM note.",
      },
      {
        label: "Discussed",
        description:
          "Talked through on a call or in a meeting. Useful context, not yet a commitment.",
      },
      {
        label: "Hearsay",
        description:
          "Mentioned once, second-hand or unconfirmed. Kept on file but never treated as fact.",
      },
    ],
    caption:
      "AI and reports lean on the top rungs. When the only answer is hearsay, they say so.",
  },
  "metrics-dashboards": {
    eyebrow: "The KPI hierarchy",
    title: "Every number answers to the goal.",
    lede:
      "A dashboard with forty numbers tells you nothing. I build it from the top down, so each number has a reason to be there and an owner.",
    rungs: [
      {
        label: "Goal",
        description: "The one outcome the year is about. Revenue, margin or jobs completed.",
      },
      {
        label: "Lagging KPIs",
        description:
          "The numbers that prove you hit it. They tell you what happened, after it happened.",
      },
      {
        label: "Leading indicators",
        description:
          "The numbers your team can move this week. Response time, quotes sent, calls made.",
      },
      {
        label: "Weekly scorecard",
        description:
          "One page every Monday, built from your systems, with an owner on every number.",
      },
    ],
    caption:
      "Routine reports belong in the dashboard. Save AI for the questions you haven't asked before.",
  },
};

/** Labels for the shared blocks on each line page. */
export const LINE_PAGE = {
  backLabel: "All services",
  problemHeading: "The problem",
  soundsLikeHeading: "Sounds like you if",
  youGetHeading: "What you get",
  productsEyebrow: "What I build",
  productsTitle: "The pieces of this service",
  caseStudiesEyebrow: "Related work",
  caseStudiesTitle: "Where I've done this before",
  caseStudyLink: "Read the case study",
  otherLinesHeading: "Other services",
  ctaTitle: (title: string) => `Ask me about ${title}.`,
  ctaLede:
    "Tell me what's frustrating you. I'll tell you honestly whether I can fix it, and what it would take.",
  ctaButton: "Ask about this",
  bookCall: "Book a 30-minute call",
  seeLine: (title: string) => `See ${title}`,
};

/**
 * Legacy three-stage grouping. The /services page no longer uses it.
 * Still imported by src/components/home/stages.tsx, src/app/llms.txt/route.ts
 * and (via PRODUCTS) src/components/shared/json-ld.tsx. Retire in Phase 2.
 */
export const STAGES: Stage[] = [
  {
    number: "01",
    slug: "connected",
    title: "Connected",
    summary: "Every system feeding one picture you own.",
    products: [CONNECTED_COMPANY, LIVE_NUMBERS, LEAD_FLOW],
  },
  {
    number: "02",
    slug: "ai-ready",
    title: "AI‑Ready",
    summary: "AI that knows your business, and a team that knows how to use it.",
    products: [COMPANY_BRAIN, AI_READY_COMPANY],
  },
  {
    number: "03",
    slug: "optimized",
    title: "Optimized",
    summary: "New ways of running the business that weren't possible before.",
    products: [AUTOMATE_THE_BUSYWORK, EARLY_WARNINGS, FIND_THE_MARGIN],
  },
];

/** Products shown on the current site (legacy stages). Used by JSON-LD. */
export const PRODUCTS = STAGES.flatMap((s) => s.products);
