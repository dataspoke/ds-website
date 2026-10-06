// Copy for the /lp/* landing pages. These pages have no site nav and one CTA
// (BookCall), so copy here is self-contained and doesn't link elsewhere.
//
// Audience: established businesses past $1M in revenue. Owners and
// leadership teams, not one-person shops.

export interface LpBullet {
  title: string;
  description: string;
}

export interface LpProduct {
  title: string;
  description: string;
  result: string;
}

export interface LpAssessment {
  name: string;
  lede: string;
  includes: string[];
  price: string;
  terms: string;
  credit: string;
}

/** Shown on every /lp/* page. */
export const PROOF_LINE =
  "I doubled my revenue in the last year by running my own business on these tools. I can do the same for yours.";

export const LP_AI = {
  eyebrow: "For established businesses past $1M in revenue that run on too many tools",
  headline: "Your company, running on connected data. Ready for AI.",
  lede:
    "Your sales, operations and finance tools each know part of the story. I connect them into one picture you own, so every decision is made on what's actually happening.",
  problemsEyebrow: "Sound familiar?",
  problemsTitle: "Your business knows more than you can see.",
  problems: [
    {
      title: "The big systems don't talk to each other.",
      description:
        "CRM, accounting, scheduling, phones. Each one is right about its own piece and wrong about the whole. Month-end means exporting four reports and hoping they match.",
    },
    {
      title: "Data you produce every day and never use.",
      description:
        "Every call, meeting, email and text is a record of the business. Almost none of it is captured anywhere you can look at it, and AI can't reach any of it.",
    },
    {
      title: "Things that live only in people's heads.",
      description:
        "How a job really gets quoted. Why that customer left. What the Tuesday process actually is. If someone quits, it's gone.",
    },
  ] as LpBullet[],
  problemsClose:
    "Connecting the software is the first step. Capturing what the business already knows is the second. That's what makes you AI‑ready.",
  productsEyebrow: "AI that knows your business",
  productsTitle: "A team that's AI-ready, not a chatbot that's guessing.",
  products: [
    {
      title: "Company Brain",
      description:
        "A private assistant that can see your CRM, calls, documents and numbers. Ask in plain English, get an answer with the source behind it. Runs under your own logins.",
      result:
        "An owner asks “what do I need to know before this meeting?” and gets the client history, recent calls and open tasks in one answer.",
    },
    {
      title: "AI‑Ready Company",
      description:
        "How your business actually runs, written down and kept current: systems, processes, roles. Then your team trained to use AI on it, with custom AI tools set up for the jobs they do every day.",
      result:
        "An internal playbook that updates itself from the documents your team already edits, and a team that knows how to put AI to work on it.",
    },
    {
      title: "Automate the Busywork",
      description:
        "Any job someone does the same way every week runs itself: intake, follow-up, reconciliation, sending reports. Where AI can do the work, it drafts and a person approves.",
      result: "Hours back every week, and nobody retyping what the business already knows.",
    },
  ] as LpProduct[],
  assessment: {
    name: "Data & AI Assessment",
    lede:
      "Two weeks. I inventory every system and data source your company runs on, score how connected and AI‑ready it is today and hand you a prioritized plan. You keep the plan whether or not we work together.",
    includes: [
      "A map of every tool, who uses it and what data lives there",
      "A connected-data score and an AI‑readiness score, with the gaps named",
      "The three projects worth doing first, with what each would cost and return",
      "A 60-minute walkthrough with you and your leadership team",
    ],
    price: "$999",
    terms: "fixed price · 2 weeks",
    credit: "Credited toward your first project if you go ahead.",
  } as LpAssessment,
  ctaLabel: "Book the assessment call",
};

export const LP_CUSTOM_SOFTWARE = {
  eyebrow: "For established businesses past $1M in revenue",
  // ​ (zero-width space) lets the domain wrap after "app." on narrow phones.
  headline: "Every business should have an app.​yourcompany.com built around how it actually works.",
  lede:
    "Internal tools, client portals and mobile apps, built on the systems you already pay for. You own the code and you own the accounts.",
  soundsLikeEyebrow: "Sounds like you if",
  soundsLike: [
    "Your team keeps a spreadsheet next to the software because the software doesn't fit.",
    "You pay for features you don't use and still can't do the one thing you need.",
    "Customers use an app from a vendor nobody can reach.",
  ],
  youGetEyebrow: "What you get",
  youGet: [
    "A web or mobile app built for your process, on your own domain.",
    "Built on top of the systems you already own, not a rip-and-replace.",
    "Your data in accounts you control, not locked in a vendor's.",
    "Plain-English documentation, so you're never stuck with me.",
  ],
  examplesEyebrow: "What this has looked like",
  examples: [
    {
      title: "Client portal",
      description:
        "A professional-services firm's clients log in to see their own file, instead of calling to ask what's happening.",
    },
    {
      title: "Internal tool",
      description:
        "A scheduling screen built around how a crew actually plans a week, sitting on top of the CRM the office already runs.",
    },
    {
      title: "Customer-facing app",
      description:
        "A membership business's iOS and Android apps, rebuilt on the booking system it already pays for, with the owner holding the keys.",
    },
  ] as LpBullet[],
  ctaLabel: "Book a call",
};

export const LP_DASHBOARDS = {
  eyebrow: "For established businesses past $1M in revenue",
  headline: "Routine reports belong in a dashboard. Not in a prompt you re-type every Monday.",
  lede:
    "A dashboard runs the same calculation the same way every time. That's not a job for re-prompting an AI chat window at the start of every week.",
  soundsLikeEyebrow: "Sounds like you if",
  soundsLike: [
    "Your leadership meeting starts with a debate about whose number is right.",
    "Month-end means someone spends a day reconciling reports by hand.",
    "Your dashboard has forty numbers and nobody can say which three matter.",
  ],
  hierarchyEyebrow: "The KPI hierarchy",
  hierarchyTitle: "One goal. A short chain of numbers that prove you're hitting it.",
  hierarchy: [
    {
      title: "Goal",
      description: "The one outcome that matters this year, stated as a number.",
    },
    {
      title: "Lagging KPIs",
      description: "The handful of numbers that prove you hit the goal, after the fact.",
    },
    {
      title: "Leading indicators",
      description: "What your team can move this week that drives the lagging KPIs.",
    },
    {
      title: "Weekly scorecard",
      description: "All of it on one screen, built from the systems you already run, the same way every week.",
    },
  ] as LpBullet[],
  trustedNumberEyebrow: "One trusted number",
  trustedNumberTitle: "Everyone in the room looking at the same figure.",
  trustedNumberBody:
    "A scorecard that matches your CRM, down to the individual lead. Monthly reports that build and send themselves. One trusted answer to what you spent and what you got, by channel and by agency, that you can hand to your bookkeeper or your board without caveats.",
  ctaLabel: "Book a call",
};
