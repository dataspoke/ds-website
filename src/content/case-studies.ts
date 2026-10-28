import type { CaseStudy } from "@/types";

// Use cases: one per service line, each a pain the reader recognizes and what I
// did about it. Drawn from real client work. Rules: industry, size and revenue
// band only. No location, no client names, no proprietary method.

/** Client use cases held back until the client approves the text. Remove a slug to publish it. */
const AWAITING_CLIENT_OK = new Set([
  "every-lead-in-under-a-minute",
  "where-every-sale-came-from",
  "cost-per-paying-job",
  "own-app-own-data",
  "members-before-they-leave",
]);

const ALL_CASE_STUDIES: CaseStudy[] = [
  {
    slug: "every-lead-in-under-a-minute",
    title: "Every lead in the CRM in under a minute",
    industry: "Roofing contractor",
    size: "About 100 staff",
    revenueBand: "$10M+",
    lines: ["capture"],
    summary: {
      problem:
        "Leads came from about ten places, including six outside agencies. Many arrived by email and someone typed them into the CRM.",
      built:
        "One pipeline that takes every web and agency lead, checks it and creates it in the CRM, with a retry for anything that fails.",
      result: "Web and agency leads reach the CRM in under a minute. Nobody retypes them.",
    },
    sources: ["Web forms", "Ad platforms", "Lead agencies", "CRM"],
    sections: [
      {
        heading: "Sound familiar?",
        body: "A lead comes in Saturday night and sits in an inbox until Monday. A new agency starts sending leads and the plan is \"whoever sees the email first types it in.\" Some leads never reach the CRM at all, so nobody calls them and nobody counts them.",
      },
      {
        heading: "What I did",
        body: "I built one front door for leads. Every web form, ad platform and agency sends to it. It checks each lead, catches duplicates and creates it in the CRM with its source attached. If the CRM rejects a lead, it tries again every hour and tells someone if it still fails. Adding a new agency now takes a day, not a new manual process.",
      },
      {
        heading: "What changed",
        body: "Web and agency leads land in the CRM in under a minute. The sales team works from one list. And because every lead is counted, the marketing numbers start from the truth.",
      },
    ],
    featured: true,
  },
  {
    slug: "where-every-sale-came-from",
    title: "Untangling where every sale came from",
    industry: "Roofing contractor",
    size: "About 100 staff",
    revenueBand: "$10M+",
    lines: ["organize"],
    summary: {
      problem:
        "Most sales were credited to a source only by a field someone typed by hand. Different reports gave different answers.",
      built:
        "One clean record of each lead's source, carried from first contact to signed job, with written rules for which system wins.",
      result: "Every sale traces back to a channel. Reports agree because they read the same data.",
    },
    sources: ["CRM", "Lead pipeline", "Ad platforms", "Call tracking"],
    sections: [
      {
        heading: "Sound familiar?",
        body: "Ask three people where last month's jobs came from and you get three answers. The CRM has a lead source field, but everyone fills it in differently and half the options mean the same thing.",
      },
      {
        heading: "What I did",
        body: "I mapped every place a lead could start and every way it was being labeled. Then I set one rule for each case, cleaned up the history and made the source flow on its own from first contact to signed job. Where systems disagreed, I wrote down which one is trusted and why, so the rule outlives me.",
      },
      {
        heading: "What changed",
        body: "Reports, dashboards and AI tools all read from the same organized data. Leadership stopped arguing about the number and started using it.",
      },
    ],
    featured: false,
  },
  {
    slug: "cost-per-paying-job",
    title: "The number the owner had wanted for years",
    industry: "Roofing contractor",
    size: "About 100 staff",
    revenueBand: "$10M+",
    lines: ["metrics-dashboards"],
    summary: {
      problem:
        "The owner had asked for cost per paying job by channel for years. Ad spend, payroll and sales lived in separate systems.",
      built:
        "A dashboard that joins ad spend, field labor and closed jobs into cost per paying job for each channel, and updates on its own.",
      result:
        "One trusted cost per job across five channels. Building it showed nearly half the field marketing team was missing from labor cost.",
    },
    sources: ["Ad platforms", "Payroll", "CRM", "Canvassing app"],
    sections: [
      {
        heading: "Sound familiar?",
        body: "You spend real money on ads, agencies and a door-to-door team. Each one reports its own results. None of them can tell you what a paying customer actually cost.",
      },
      {
        heading: "What I did",
        body: "We started with the question the owner wanted answered, then worked down to the data it needed: ad spend, payroll for the field team and jobs that actually closed. I connected each source, matched every job to the channel that produced it and put the result in a dashboard that refreshes itself. Nobody rebuilds it by hand, and nobody has to ask an AI to recreate it every Monday.",
      },
      {
        heading: "What changed",
        body: "Leadership sees cost per paying job for every channel in one place. Building it uncovered that nearly half the field marketers were missing from labor cost, so that channel had looked far cheaper than it was.",
      },
    ],
    featured: false,
  },
  {
    slug: "own-app-own-data",
    title: "Their own app on the booking system they already pay for",
    industry: "Gym with several locations",
    size: "Several locations",
    revenueBand: "$1M–5M",
    lines: ["custom-software"],
    summary: {
      problem:
        "Members booked through a generic app the gym didn't control. The owners couldn't change it or easily get their own data out.",
      built:
        "A member app in the gym's own brand, built on the booking system it already uses, plus a private copy of its data.",
      result: "Members book in the gym's own app. The owners own the app, the code and their data.",
    },
    sources: ["Booking system", "Payments", "Member app"],
    sections: [
      {
        heading: "Sound familiar?",
        body: "Your customers log in to software you rent. It carries someone else's brand, it works the way the vendor wants and your data is locked inside it.",
      },
      {
        heading: "What I did",
        body: "I built the gym its own member app on top of the booking system it already pays for. Members book and cancel in the gym's app, and the booking system still runs the schedule behind it. Alongside it, I set up a private copy of the gym's data that the owners control.",
      },
      {
        heading: "What changed",
        body: "The gym has its own app without replacing the systems that already work. The data copy became the foundation for the analytics that came next.",
      },
    ],
    featured: true,
  },
  {
    slug: "members-before-they-leave",
    title: "Spotting members before they leave",
    industry: "Gym with several locations",
    size: "Several locations",
    revenueBand: "$1M–5M",
    lines: ["analytics-data-science"],
    summary: {
      problem: "The owners found out a member had left when the payment stopped.",
      built:
        "Churn and at-risk member reports from the gym's own data, plus trainer and upsell views managers can question in plain English.",
      result: "Managers get a list of members drifting away while there is still time to reach them.",
    },
    sources: ["Booking history", "Payments", "Member records"],
    sections: [
      {
        heading: "Sound familiar?",
        body: "Membership businesses lose most customers quietly. Visits drop off, then the cancellation comes. By the time it shows up in revenue, the member is gone.",
      },
      {
        heading: "What I did",
        body: "Using the gym's own booking history, I built a churn report, a list of members whose visits are falling off and views of which trainers keep their clients and where the upsell chances are. Managers can also ask plain-English questions like \"who hasn't been in for three weeks?\" and get answers for their own locations only.",
      },
      {
        heading: "What changed",
        body: "Retention became something the team works every week, not something they read about at month-end.",
      },
    ],
    featured: false,
  },
  {
    slug: "back-office-on-autopilot",
    title: "The system I run my own business on",
    industry: "Consulting (my own business)",
    size: "Owner-run",
    lines: ["ai-implementation"],
    summary: {
      problem:
        "Calls, five inboxes, client notes and time tracking were eating the hours that should go to clients.",
      built:
        "Meetings recorded and filed by client, email sorted into reply tasks, action items drafted from calls and an assistant that answers from all of it.",
      result:
        "I doubled my revenue in the last year. This is the system I install for clients. I ran it on my own business first.",
    },
    sources: ["Meeting recordings", "Email", "CRM", "Calendar"],
    sections: [
      {
        heading: "Sound familiar?",
        body: "Your day disappears into inboxes, follow-ups and \"what did we agree on that call?\" The important decisions are in recordings nobody rewatches.",
      },
      {
        heading: "What I did",
        body: "With permission, every client meeting is recorded, transcribed and filed with the right client. Email from all my accounts is sorted, and anything that needs a reply becomes a task. Action items from calls become draft tasks I approve. My time is logged from the work I actually did. On top of it sits an assistant that answers \"what do I need to know before this meeting?\" with the source for each fact.",
      },
      {
        heading: "What changed",
        body: "My hours go to client work, not admin. Over the last year that let me double my revenue. It is the same system I set up for clients: capture what the business already produces, organize it, then put AI to work on it.",
      },
    ],
    featured: true,
    // The summary is in Nick's voice, so search results get a third-person version.
    // Source for the claim: "What changed" above ("Over the last year that let me double my revenue").
    metaDescription:
      "Calls, five inboxes, client notes and time tracking ate the hours meant for clients. Running on this system, the owner doubled revenue over the past year.",
    // fe56d73 (2026-10-06T14:21:26-04:00) added this study. No later commit changed its text.
    dates: {
      published: "2026-10-06T14:21:26-04:00",
      modified: "2026-10-06T14:21:26-04:00",
    },
  },
];

export const CASE_STUDIES = ALL_CASE_STUDIES.filter((c) => !AWAITING_CLIENT_OK.has(c.slug));
