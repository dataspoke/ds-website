import type { Product, ServiceLine, ServiceLineSlug } from "@/types";

// Service copy. Every line and product leads with what changes for the owner,
// then says what gets built. Technical words are explained where they appear.
// Claims stay general: kinds of work, no client names, no made-up numbers.

const CONNECTED_COMPANY: Product = {
  slug: "connected-company",
  title: "Connected Company",
  description:
    "Nobody on your team copies information from one program to another. Calls, signed documents, emails and invoices land on the right customer record on their own. We connect the tools you already pay for so the information flows between them.",
  result:
    "Hours of retyping disappear each week, and every customer has one complete record from first call to final payment.",
  soundsLike: [
    "Someone on your team spends hours a week copying data from one program to another.",
    "You have a Zapier setup that breaks quietly and nobody notices for weeks.",
    "You've changed staff and half your automations still run under the person who left.",
  ],
  youGet: [
    "Information moves between your tools without anyone copying it.",
    "An alert when something needs a human decision, instead of a silent failure.",
    "One customer record that follows the person from first call to final payment.",
    "Automations that are written down and owned by you, not a black box.",
  ],
};

const LEAD_FLOW: Product = {
  slug: "lead-flow",
  title: "Lead Flow",
  description:
    "Every lead gets a reply within minutes, including the ones that come in Saturday night. Leads from ads, your website and lead vendors reach your CRM (your customer list) on their own, and follow-up by text and email keeps going until they book or say no.",
  result:
    "No lead sits in an inbox over the weekend, and customers hear back from a real company right away.",
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
    "Everyone works from the same facts. We turn your calls, emails and documents into organized records of clients, projects, decisions and policies, instead of one giant pile of files. Every fact carries a trust level and a link to where it came from, so a passing comment never gets treated as company policy.",
  result:
    "Reports and AI draw on what was actually decided, and anyone can check where an answer came from.",
  soundsLike: [
    "Two documents say different things and nobody knows which one is current.",
    "A decision was made on a call, and three weeks later nobody can find it.",
    "You'd like AI to answer questions, but you don't trust what it would read.",
  ],
  youGet: [
    "Calls, emails and documents turned into organized records with a source on each one.",
    "Every fact tagged Decided, Documented, Discussed or Hearsay.",
    "One place where the current answer lives, and a trail to how it got there.",
    "AI that says \"this was only discussed\" instead of passing hearsay off as policy.",
  ],
};

const LIVE_NUMBERS: Product = {
  slug: "live-numbers",
  title: "Live Numbers",
  description:
    "You know your numbers every Monday without asking anyone to build a report. Dashboards and monthly reports update themselves from your real systems, so the same question gets the same answer every week.",
  result:
    "A weekly scorecard that matches your CRM lead for lead, and shows what each marketing channel costs you per paying customer.",
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
    "You know which three numbers matter and who is responsible for each. We start from the one goal the year is about, then pick the results that prove you hit it and the weekly activities your team can move right now. (KPI stands for key performance indicator: a number you track because it tells you whether the business is on course.)",
  result:
    "Every number on the dashboard answers to the goal, and every manager knows which one is theirs.",
  soundsLike: [
    "Your dashboard has forty numbers and nobody can say which three matter.",
    "You find out you missed the quarter when the quarter is over.",
  ],
  youGet: [
    "A goal broken down into the results that prove it and the weekly activities that drive it.",
    "An owner for each number.",
    "A weekly scorecard built from the systems you already run.",
  ],
};

const YOUR_OWN_APP: Product = {
  slug: "your-own-app",
  title: "Internal Tools",
  description:
    "Your team works in one screen built for them instead of five programs built for everyone. We build a web app at your own address, such as app.yourcompany.com, that sits on top of the systems you already pay for and shows each person the work that's theirs.",
  result:
    "The side spreadsheet goes away, new staff learn one screen instead of five, and the data stays in systems you own.",
  soundsLike: [
    "Your team keeps a spreadsheet next to the software because the software doesn't fit.",
    "You pay for features you don't use and still can't do the one thing you need.",
    "New staff need a week to learn which of five tools holds which answer.",
  ],
  youGet: [
    "A web app on your own domain, built for your process.",
    "Each person's work on one screen, pulled from the systems you already run.",
    "Your data stays in systems you own, not locked in ours or a new vendor's.",
  ],
};

const CLIENT_PORTAL: Product = {
  slug: "client-portal",
  title: "Client Portal",
  description:
    "Fewer \"where is this at?\" calls, and clients who feel looked after between meetings. A portal is a private page where each client logs in and sees their own status, documents and invoices. It reads from your CRM and accounting system, so nobody updates it by hand.",
  result:
    "Clients answer their own status questions, and your team spends that time on the work.",
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
    "Your customers book and pay in an app with your name on it, and you own the relationship instead of a vendor. We build iPhone and Android apps for your customers or your crew on top of the booking, CRM or field system you already pay for.",
  result:
    "Your brand in the app store, your data in your hands, and nothing to migrate.",
  soundsLike: [
    "Customers use an app from a vendor nobody can reach.",
    "Your crew fills in paper forms that someone retypes at the office.",
  ],
  youGet: [
    "Native-feeling iPhone and Android apps under your company's name.",
    "Built on your existing systems, so nothing has to migrate.",
    "Plain-English documentation and code you own, so you're never stuck with us.",
  ],
};

const COMPANY_BRAIN: Product = {
  slug: "company-brain",
  title: "Company Brain",
  description:
    "Ask a question about your own business in plain English and get the answer with the source behind it. A private assistant that can see your CRM, calls, documents and numbers, running under your own logins, so nothing leaves your control.",
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
    "Your team uses AI on real work, every day, the same way. We write down how your business actually runs (systems, processes, roles) and keep it current, then train your people on the AI tools that fit their jobs and set up custom tools for the work they repeat every week.",
  result:
    "A company playbook that updates itself from the documents your team already edits, and a team that knows how to put AI to work on it.",
  soundsLike: [
    "New team members learn the job by shadowing, because the written process is outdated or missing.",
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
    "Hours back every week for the people you already have. Any job someone does the same way every week runs itself: intake, follow-up, matching payments to invoices, sending reports. Where AI can do the work, it writes the draft and a person approves it.",
  result:
    "Your team handles more customers with less admin, and nobody retypes what the business already knows.",
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
    "You hear about problems while there is still time to fix them. A customer about to leave, a job drifting over budget, a quarter that needs two more crews, cash getting tight. We use your own history to flag the signals that matter and to forecast what's coming.",
  result:
    "You call the customer before they call you, and you plan staffing before the rush instead of during it.",
  soundsLike: [
    "You find out a customer left when the payment stops.",
    "Jobs go over budget and you learn about it at invoicing.",
    "Staffing up always happens in a panic.",
  ],
  youGet: [
    "A short list every morning of what needs attention today.",
    "Alerts on the signals that matter: silence from a good customer, a stalled deal, a slipping margin.",
    "Forecasts for demand, staffing and cash, built from your own history.",
  ],
};

const FIND_THE_MARGIN: Product = {
  slug: "find-the-margin",
  title: "Find the Margin",
  description:
    "You see where the money is actually made and where it leaks. Which customers, services and marketing channels pay, which prospects look like your best customers, and which pricing is costing you. Each bet is tested properly before you spend more on it.",
  result:
    "A ranked list of who to call next, and proof of which bet paid off.",
  soundsLike: [
    "You suspect one service or customer type loses money but can't prove it.",
    "Your best customers have something in common and nobody has looked for it.",
    "Marketing decisions are made on gut feel and the agency's own report.",
  ],
  youGet: [
    "Profit by customer, service and channel, from connected finance and operations data.",
    "Prospect lists built from your best existing customers or from public records.",
    "Experiments set up and measured properly, so you know a bet paid off before you double it.",
  ],
};

/** The six service lines. Two hub lines first, then four spokes. */
export const SERVICE_LINES: ServiceLine[] = [
  {
    slug: "capture",
    kind: "hub",
    title: "Data Capture & Integration",
    oneLiner: "Stop retyping. Every lead, call and invoice lands where it belongs on its own.",
    metaTitle: "Connect your business software so nothing gets retyped",
    metaDescription:
      "DataSpoke connects the CRM, accounting, phone and marketing tools your business already uses, so leads, calls and invoices flow between them on their own. Save hours of manual work each week and never miss a lead. Free 30-minute estimate. Serving CT, NY and the US.",
    problem:
      "Your CRM, accounting software, scheduler and phone system each know part of the story, and someone on your team spends hours a week carrying information between them by hand. Leads wait in inboxes. Calls, emails and texts hold facts about your customers that never get written down anywhere you can find. Integration is the plain word for fixing that: we connect the programs you already pay for so the information moves on its own.",
    soundsLike: [
      "Someone on your team spends hours a week copying data from one program to another.",
      "A lead comes in Saturday night and nobody sees it until Tuesday.",
      "You have a Zapier setup that breaks quietly and nobody notices for weeks.",
    ],
    youGet: [
      "Hours of retyping back every week, because information moves between your tools without anyone copying it.",
      "One customer record that follows the person from first call to final payment.",
      "Every lead in your CRM within minutes, with the customer's original message attached.",
    ],
    products: [CONNECTED_COMPANY, LEAD_FLOW],
  },
  {
    slug: "organize",
    kind: "hub",
    title: "Data Organization & Warehousing",
    oneLiner: "One trustworthy set of records, so everyone works from the same facts.",
    metaTitle: "Organize your business data into one trustworthy record",
    metaDescription:
      "DataSpoke turns the calls, emails, documents and spreadsheets your business produces into one organized, trustworthy set of records you own. End the argument about whose number is right and give AI something real to read. Free 30-minute estimate. CT, NY and nationwide.",
    problem:
      "Once the information is captured, it's still a pile. Two documents disagree. A decision was made on a call and nobody can find it. A report says one thing and the accounting software says another. We sort the pile into organized records of clients, projects, decisions and policies, and we mark each fact with how far you can trust it. A data warehouse is the plain word for where that organized copy lives: one central, well-kept store of your business information that you own and that your reports, software and AI all read from.",
    soundsLike: [
      "Two documents say different things and nobody knows which one is current.",
      "A decision was made on a call, and three weeks later nobody can find it.",
      "You'd like AI to answer questions, but you don't trust what it would read.",
    ],
    youGet: [
      "Organized records built from your calls, emails and documents, not one giant pile of files.",
      "A trust level on every fact: Decided, Documented, Discussed or Hearsay.",
      "Reports and AI that know what was decided and what is only hearsay.",
      "A source behind every answer, so you can check it.",
    ],
    products: [TRUST_LADDER],
  },
  {
    slug: "metrics-dashboards",
    kind: "spoke",
    title: "Metrics & Dashboards",
    oneLiner: "Know your numbers every Monday without anyone building a report.",
    metaTitle: "Business dashboards that show you your numbers every Monday",
    metaDescription:
      "DataSpoke builds dashboards and weekly scorecards that update themselves from the systems your business already runs. Know your numbers, end the debate about whose report is right and see which marketing actually pays. Free 30-minute estimate. Serving CT, NY and the US.",
    problem:
      "Month-end means exporting four reports and hoping they match. The leadership meeting starts with a debate about whose number is right, and nobody can say which numbers actually move the goal. A dashboard is a page of your key numbers that updates itself from your real systems. Routine reports belong there, built once and the same every week, not rebuilt by hand or re-asked of an AI chat window every Monday.",
    soundsLike: [
      "Your leadership meeting starts with a debate about whose number is right.",
      "Month-end means someone spends a day reconciling reports by hand.",
      "Someone asks AI to rebuild the same report every Monday.",
    ],
    youGet: [
      "A scorecard that matches your CRM, down to the individual lead.",
      "Monthly reports that build and send themselves.",
      "A short chain of numbers from your goal down to this week's activities, with an owner on each one.",
    ],
    products: [LIVE_NUMBERS, KPI_HIERARCHY],
  },
  {
    slug: "custom-software",
    kind: "spoke",
    title: "Custom Software",
    oneLiner: "Software built around how your business works, so your team stops working around the software.",
    metaTitle: "Custom software built around how your business works",
    metaDescription:
      "DataSpoke builds internal tools, client portals and mobile apps on top of the systems your business already pays for. Your team works in one screen built for them, clients answer their own status questions, and you own the code. Free 30-minute estimate. CT, NY and nationwide.",
    problem:
      "Off-the-shelf software is built for everyone, so it fits nobody exactly. Your team fills the gaps with spreadsheets, sticky notes and copy and paste. You already pay for systems that hold the information. What's missing is the screen built around how your company works. We build internal tools (a screen for your team), client portals (a private page where clients see their own status) and mobile apps, all on top of the systems you already pay for, and you own the code.",
    soundsLike: [
      "Your team keeps a spreadsheet next to the software because the software doesn't fit.",
      "You pay for features you don't use and still can't do the one thing you need.",
      "Clients email to ask for a status you could simply show them.",
    ],
    youGet: [
      "Internal tools that show each person the work that's theirs.",
      "Client portals where customers see status, documents and invoices without calling you.",
      "iPhone and Android apps on the booking, CRM or accounting system you already pay for.",
      "Code you own and plain-English documentation, so you're never stuck with us.",
    ],
    products: [YOUR_OWN_APP, CLIENT_PORTAL, MOBILE_APP],
  },
  {
    slug: "ai-implementation",
    kind: "spoke",
    title: "AI Implementation",
    oneLiner: "Put AI to work on your own business, with your team trained to use it and a person approving what it writes.",
    metaTitle: "AI for your business: set up on your data, with your team trained",
    metaDescription:
      "We set up AI on your business data, train your team to use it and automate busywork so your people do more. A person approves every draft. Free estimate.",
    problem:
      "You've tried ChatGPT but it doesn't know anything about your business. Your team uses AI tools inconsistently, or not at all, and the same work still gets retyped every week. AI implementation means giving an assistant access to your own CRM, calls, documents and numbers under logins you control, training the people who do the work, and letting AI write the first draft while a person approves it. The result is more work handled by the team you already have.",
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
    oneLiner: "See where the money is going and what's coming next, so you decide faster and with proof.",
    metaTitle: "See where the money is going and what's coming next",
    metaDescription:
      "We use your business's own history to show which customers, services and channels pay, who is about to leave and when to staff up. Free 30-minute estimate.",
    problem:
      "You find out a customer left when the payment stops. You suspect one service loses money but can't prove it. Decisions get made on gut feel and the agency's own report. Analytics means answering those questions from your own history, and data science is the careful version of it: checking that the answer holds up before you act on it. We tell you where to look and prove whether a bet paid off.",
    soundsLike: [
      "You find out a customer left when the payment stops.",
      "You suspect one service or customer type loses money but can't prove it.",
      "Marketing decisions are made on gut feel and the agency's own report.",
    ],
    youGet: [
      "A short list every morning of what needs attention today.",
      "Profit by customer, service and channel.",
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

/** Anchor text for a link to a service page: the name plus the outcome it delivers. */
export function serviceLinkText(line: { title: string; oneLiner: string }): string {
  return `${line.title}: ${line.oneLiner.replace(/\.\s*$/, "")}`;
}

/** Copy for the /services overview page. */
export const SERVICES_PAGE = {
  metaTitle: "Services: data, dashboards, custom software and AI for your business",
  metaDescription:
    "What DataSpoke does for business owners, in plain words: connect your software so nothing gets retyped, know your numbers every Monday, build tools around how you work, put AI to work on your business and see where the money goes. Free 30-minute estimate. CT, NY and the US.",
  eyebrow: "Services",
  title: "Six ways to run a bigger business with the team you have.",
  lede:
    "Each service is described by what changes for you, with the technology second. You don't need to know what to ask for. Find the problem that sounds like yours, and the free estimate will tell you where to start.",
  diagramHub: "Your data",
  hubEyebrow: "The foundation",
  hubTitle: "Start by getting your information in one place you can trust.",
  hubLede:
    "Everything else runs on these two. Most clients start here, because a dashboard or an AI tool is only as good as the information under it.",
  spokeEyebrow: "What runs on it",
  spokeTitle: "Then put it to work.",
  spokeLede:
    "Each of these is a project with a fixed scope and a price you see first. Pick the one that hurts most today. The others get easier once the foundation is in place.",
};

/** Diagram labels, split into lines so they fit on a phone. Hub pills are fixed width, so they stay short. */
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
      "We collect what your business produces, sort it and file each fact on one of four rungs. Each one keeps a link back to its source.",
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
      "Reports and AI lean on the top rungs. When the only answer is hearsay, they say so.",
  },
  "metrics-dashboards": {
    eyebrow: "The KPI hierarchy",
    title: "Every number answers to the goal.",
    lede:
      "A dashboard with forty numbers tells you nothing. We build it from the top down, so each number has a reason to be there and an owner.",
    rungs: [
      {
        label: "Goal",
        description: "The one outcome the year is about. Revenue, margin or jobs completed.",
      },
      {
        label: "Results that prove it",
        description:
          "The numbers that show you hit the goal. They tell you what happened, after it happened.",
      },
      {
        label: "Weekly activities that drive it",
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
  problemHeading: "The problem this solves",
  soundsLikeHeading: "Sounds like you if",
  youGetHeading: "What you get",
  productsEyebrow: "What we build",
  productsTitle: "The pieces of this service",
  caseStudiesEyebrow: "Related work",
  caseStudiesTitle: "Where we've done this before",
  otherLinesHeading: "Other services",
  ctaTitle: (title: string) => `Ask us about ${title}.`,
  ctaLede:
    "Tell us what's slowing you down. We'll tell you honestly whether we can fix it, and what it would take.",
  ctaButton: "Ask a question about this service",
  estimateCta: "Book your free estimate",
  seeLine: (title: string) => `See ${title}`,
};

/**
 * Retired /services#<id> anchors from the old three-stage page, mapped to the
 * line page that now holds that copy. Product ids keep their hash so the line
 * page scrolls to the product. #assessment still lives on /services.
 */
export const LEGACY_SERVICE_ANCHORS: Record<string, string> = {
  connected: "/services/capture",
  "connected-company": "/services/capture#connected-company",
  "lead-flow": "/services/capture#lead-flow",
  "live-numbers": "/services/metrics-dashboards#live-numbers",
  "ai-ready": "/services/ai-implementation",
  "company-brain": "/services/ai-implementation#company-brain",
  "ai-ready-company": "/services/ai-implementation#ai-ready-company",
  "automate-the-busywork": "/services/ai-implementation#automate-the-busywork",
  optimized: "/services/analytics-data-science",
  "early-warnings": "/services/analytics-data-science#early-warnings",
  "find-the-margin": "/services/analytics-data-science#find-the-margin",
};
