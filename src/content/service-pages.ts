import type { FaqItem, ServiceLineSlug, TextLink } from "@/types";

// Service-page FAQ and engagement copy, written so the first sentence of each
// answer is the answer. Only restates claims already published on the site:
// the $999 fixed-price two-week Data & AI Assessment, the free 30-minute
// estimate with a written plan within two business days, ownership, who the
// work is for, and the systems listed on the home page.
// Do not add prices, clients, results, timelines, or guarantees here.

const estimate: TextLink = { label: "free 30-minute estimate", href: "/free-estimate" };
const assessment: TextLink = { label: "Data & AI Assessment", href: "/approach#assessment" };
const approach: TextLink = { label: "Approach page", href: "/approach" };

const lineLink = {
  capture: { label: "Data Capture & Integration", href: "/services/capture" },
  organize: { label: "Data Organization & Warehousing", href: "/services/organize" },
  "metrics-dashboards": { label: "Metrics & Dashboards", href: "/services/metrics-dashboards" },
  "custom-software": { label: "Custom Software", href: "/services/custom-software" },
  "ai-implementation": { label: "AI Implementation", href: "/services/ai-implementation" },
  "analytics-data-science": {
    label: "Analytics & Data Science",
    href: "/services/analytics-data-science",
  },
} as const satisfies Record<ServiceLineSlug, TextLink>;

export interface EngagementStep {
  label: string;
  title: string;
  description: string;
  links?: TextLink[];
}

export interface ServiceEngagement {
  eyebrow: string;
  title: string;
  lede: string;
  ledeLinks?: TextLink[];
  steps: EngagementStep[];
  close: string;
  closeLinks?: TextLink[];
}

export interface ServicePageExtra {
  faqEyebrow: string;
  faqTitle: string;
  faqs: FaqItem[];
  engagement: ServiceEngagement;
}

const estimateStep = {
  label: "Step 1",
  title: "Free 30-minute estimate",
  links: [estimate, assessment],
};

const assessmentStep = {
  label: "Step 2",
  title: "Data & AI Assessment (optional)",
  links: [assessment],
};

const handOverStep = {
  label: "Step 4",
  title: "Hand over, then keep it running",
};

/** The same fit answer on every page, with the line-specific trigger in front of it. */
function fitAnswer(trigger: string) {
  return `Yes, if you run an established business past $1M in annual revenue, anywhere in the United States, and ${trigger} You do not need a technical background. You talk to the people who scope and build the work, with no account manager and no hand-off to a junior team. If you want a website or a logo, we'll point you to someone good. If you're looking for the cheapest hourly rate, or you want a tool built without changing how anyone works, we'll say so on the free 30-minute estimate.`;
}

export const SERVICE_PAGE_EXTRAS: Record<ServiceLineSlug, ServicePageExtra> = {
  capture: {
    faqEyebrow: "Questions",
    faqTitle: "Before we connect anything",
    engagement: {
      eyebrow: "How an engagement works",
      title: "Connect what you already run. Then decide what to build.",
      lede: "Connecting your systems is usually the first project, because a dashboard or an AI tool is only as good as the information under it. You see the plan and the price before any build work starts, and you own everything at the end.",
      steps: [
        {
          ...estimateStep,
          description:
            "Book a free 30-minute estimate. You tell us where leads and records fall between tools. We tell you honestly whether we can fix it and whether the Data & AI Assessment is the right place to start. A written estimate with a recommended plan and a price range follows within two business days. No obligation.",
        },
        {
          ...assessmentStep,
          description:
            "When you want the full map first, the Data & AI Assessment is two weeks at a fixed $999. We list every system and data source, score how connected it is, and name the three projects worth doing first, with what each would cost and return. You keep the plan either way, and the fee is credited toward your first project if you go ahead.",
        },
        {
          label: "Step 3",
          title: "Connect the systems",
          description:
            "A fixed-scope project from that plan. Information moves between the tools you already pay for. A lead reaches the CRM within minutes, with the customer's original message attached, and you get an alert when a person needs to decide instead of a silent failure. Each project has a price, a finish line and a result you can check.",
        },
        {
          ...handOverStep,
          description:
            "Every account and every line of code is in your name, with plain-English documentation and a walkthrough for the people who will use it. Most clients keep DataSpoke on a monthly retainer afterward. We watch what we built, fix problems before you notice them, and give you a straight answer before you buy the next tool a vendor is pitching.",
        },
      ],
      close: "If the records still disagree after they are captured, Data Organization & Warehousing is the next service. Metrics & Dashboards, Custom Software, AI Implementation and Analytics & Data Science all run on what these two collect.",
      closeLinks: [
        lineLink.organize,
        lineLink["metrics-dashboards"],
        lineLink["custom-software"],
        lineLink["ai-implementation"],
        lineLink["analytics-data-science"],
      ],
    },
    faqs: [
      {
        question: "What does it cost to connect our systems?",
        answer:
          "It depends on how many tools are involved, so there is no menu price. Book a free 30-minute estimate and you get a written estimate with a recommended plan and a price range within two business days, with no obligation. If the right first step is a full map of every tool, who uses it and what information lives there, that is the Data & AI Assessment: two weeks at a fixed $999, including a 60-minute walkthrough with you and your leadership team. You keep the plan either way, and the fee is credited toward your first project if you go ahead.",
        links: [estimate, assessment],
      },
      {
        question: "How long does it take to connect our systems?",
        answer:
          "The estimate is one 30-minute call, and the written plan is in your hands within two business days. The Data & AI Assessment, if you want the map before any build, takes two weeks. Connection work after that is a fixed-scope project taken from the plan, with a price, a finish line and a result you can check. Nothing is built until you have seen the plan and the price.",
        links: [assessment],
      },
      {
        question: "Which systems can you connect?",
        answer:
          "The ones your business already pays for. Systems we commonly connect include Salesforce, HubSpot, GoHighLevel and Lawmatics for the CRM; QuickBooks, Xero, Bookkeep, Stripe, Gusto and ADP for finance; RingCentral, Zoom and Fathom for calls and meetings; Google Ads and Meta Ads for marketing; Slack, Google Workspace and Airtable for the team; and Clio and Mindbody where the work lives in industry software. The free 30-minute estimate names which of those your project actually needs. Nothing has to migrate off them.",
        links: [estimate],
      },
      {
        question: "Who owns the connections and the data?",
        answer:
          "You do. The customer record stays in systems you own, not locked in ours or a new vendor's. Every account and every line of code is in your name. You get plain-English documentation and a walkthrough for the people who will use it, so you're never stuck with us.",
      },
      {
        question: "Is this a fit for a company our size?",
        answer: fitAnswer(
          "you already run on a CRM, accounting software and a phone system that don't talk to each other."
        ),
      },
      {
        question: "What do we do about a Zapier setup that keeps breaking?",
        answer:
          "Replace it with connections that are written down, owned by you and watched. If someone on your team spends hours copying data between programs, or a Zapier setup breaks quietly and nobody notices for weeks, that is the problem this service is for. We replace that chain with automations that are documented and owned, and with an alert when something needs a human decision instead of a silent failure. Leads from ads, your website and lead vendors reach the CRM within minutes, with the customer's original message attached.",
      },
      {
        question: "How do we start, and what comes next?",
        answer:
          "Book a free 30-minute estimate and bring the spot where information falls on the floor. We will tell you honestly whether connecting your systems is the right first project. Most clients start here, because a dashboard or an AI tool is only as good as the information under it. If the records still disagree once they are captured, Data Organization & Warehousing comes next. Metrics & Dashboards, Custom Software, AI Implementation and Analytics & Data Science sit on that foundation.",
        links: [
          estimate,
          lineLink.organize,
          lineLink["metrics-dashboards"],
          lineLink["custom-software"],
          lineLink["ai-implementation"],
          lineLink["analytics-data-science"],
        ],
      },
    ],
  },
  organize: {
    faqEyebrow: "Questions",
    faqTitle: "Before we sort the pile",
    engagement: {
      eyebrow: "How an engagement works",
      title: "Sort what's decided from what was only said.",
      lede: "Once the information is captured, it's still a pile. We collect what your business produces, sort it and turn it into organized records, each one marked with how far you can trust it. You see the plan and the price before any of that build work starts.",
      steps: [
        {
          ...estimateStep,
          description:
            "Book a free 30-minute estimate. Tell us where two documents disagree, or where a decision lived on a call and then disappeared. We tell you honestly whether this is the right project and whether the Data & AI Assessment should come first. You get a written estimate with a recommended plan and a price range within two business days. No obligation.",
        },
        {
          ...assessmentStep,
          description:
            "The Data & AI Assessment is two weeks at a fixed $999. We map every tool, who uses it and what information lives there, then score how connected and how AI-ready it is, with the gaps named. You keep the plan whether or not we work together, and the fee is credited toward your first project if you go ahead.",
        },
        {
          label: "Step 3",
          title: "Turn the pile into records",
          description:
            "A fixed-scope project from the plan. Calls, emails and documents become records of clients, projects, decisions and policies. Each fact is filed as Decided, Documented, Discussed or Hearsay, with a link back to the source. The project has a price, a finish line and a result you can check.",
        },
        {
          ...handOverStep,
          description:
            "The records live in systems you own. Every account, every line of code and every document is in your name, with plain-English documentation and a walkthrough for the people who will use it. Most clients keep DataSpoke on a monthly retainer afterward so we can watch what we built and fix problems before you notice them.",
        },
      ],
      close: "Data Capture & Integration comes first when calls, emails and leads are not in one place you own yet. Once the records can be trusted, Metrics & Dashboards and AI Implementation are the services that read them.",
      closeLinks: [lineLink.capture, lineLink["metrics-dashboards"], lineLink["ai-implementation"]],
    },
    faqs: [
      {
        question: "What does it cost to organize our data?",
        answer:
          "There is no rate card for this, because the size of the pile varies a lot. Start with a free 30-minute estimate. You get a written estimate with a recommended plan and a price range within two business days, and there is no obligation to continue. A full inventory, a connected-data score and an AI-readiness score are the Data & AI Assessment: two weeks, fixed price, $999, including a 60-minute walkthrough with you and your leadership team. You keep the plan whether or not we work together. The fee is credited toward your first project if you go ahead.",
        links: [estimate, assessment],
      },
      {
        question: "How long does it take?",
        answer:
          "You see the plan and the price before any build work starts. The Data & AI Assessment that maps what you already have takes two weeks. Turning calls, emails and documents into records is a fixed-scope project from that plan, with a finish line you can check. We don't start the build until you decide.",
        links: [assessment],
      },
      {
        question: "What is a data warehouse, in plain words?",
        answer:
          "One central, well-kept copy of your business information that you own, and that your reports, software and AI all read from. Instead of every program holding its own partial version of a customer or a job, the warehouse holds the organized record and keeps a link back to where each fact came from. You never have to look at it directly. It is what makes everything built on top of it agree.",
      },
      {
        question: "What records do you actually create?",
        answer:
          "Clients, projects, decisions and policies. Not one giant pile of files. We collect what the business produces, sort it and file each fact on one of four rungs. Decided means someone who can make the call signed off: a contract, an approved price, a written policy. Documented is written down in a place of record but not formally approved. Discussed was talked through on a call or in a meeting and is not yet a commitment. Hearsay was mentioned once, second-hand or unconfirmed. Every fact keeps a link back to its source.",
      },
      {
        question: "Which systems does this read from?",
        answer:
          "Whatever already holds the record of the business. CRM notes in Salesforce, HubSpot, GoHighLevel, Lawmatics or Clio. Email and files in Google Workspace. Calls and meetings in RingCentral, Zoom and Fathom. Threads in Slack. Accounting context from QuickBooks or Xero when the question is which number is current. The result is one place where the current answer lives, and a trail to how it got there.",
      },
      {
        question: "Who owns the organized records?",
        answer:
          "You do. They live in systems you own, not locked in ours or a new vendor's. Every account, every line of code and every document is in your name. You get plain-English documentation and a walkthrough for the people who will use it, so you're never locked in to us.",
      },
      {
        question: "Will this stop AI from treating a comment as policy?",
        answer:
          "Yes, that is the job. Reports and AI lean on the top rungs. When the only answer is hearsay, they say so, instead of passing a passing comment off as company policy. You also get a clear map of what AI can and can't see, so nothing leaks. The assistant and the training on top of that are AI Implementation. Data Capture & Integration comes first when the calls and emails are not in one place you own yet.",
        links: [lineLink["ai-implementation"], lineLink.capture],
      },
      {
        question: "Is this a fit for a business our size?",
        answer: fitAnswer(
          "two documents say different things and nobody knows which is current, or a decision was made on a call and three weeks later nobody can find it."
        ),
      },
    ],
  },
  "metrics-dashboards": {
    faqEyebrow: "Questions",
    faqTitle: "Before the numbers go on a page",
    engagement: {
      eyebrow: "How an engagement works",
      title: "Agree on the goal, then let Monday's numbers build themselves.",
      lede: "Routine reports belong in a dashboard. You shouldn't have to ask anyone, or an AI, to rebuild the same report every Monday and hope it matches. We start from the goal and work down, and the scorecard updates itself from systems you already use.",
      steps: [
        {
          ...estimateStep,
          description:
            "Book a free 30-minute estimate. Bring the meeting that starts with an argument about whose number is right. We tell you honestly whether a scorecard is the right first project or whether the Data & AI Assessment should map the systems first. A written estimate with a recommended plan and a price range follows within two business days. No obligation.",
        },
        {
          ...assessmentStep,
          description:
            "The Data & AI Assessment is two weeks at a fixed $999. We list every source the numbers come from, score how connected they are, and name the three projects worth doing first, with what each would cost and return. You get a 60-minute walkthrough with your leadership team. You keep the plan either way, and the fee is credited toward your first project if you go ahead.",
        },
        {
          label: "Step 3",
          title: "Build the scorecard",
          description:
            "A fixed-scope project from the plan. One goal, the results that prove you hit it, the weekly activities your team can move right now, and a scorecard with an owner on every number. Monthly reports can build and send themselves. The project has a price, a finish line and a result you can check against your CRM.",
        },
        {
          ...handOverStep,
          description:
            "The dashboard reads from systems you own. Every account and every line of code is in your name, with plain-English documentation, so you're never stuck with us to keep Monday's report running. Most clients keep DataSpoke on a monthly retainer afterward to watch it and fix a break before you notice it.",
        },
      ],
      close: "If the systems still don't share a record, start with Data Capture & Integration. If two reports still disagree, start with Data Organization & Warehousing. A question you have not asked before belongs on AI Implementation, not in a Monday prompt. The full scorecard method is on the Approach page.",
      closeLinks: [lineLink.capture, lineLink.organize, lineLink["ai-implementation"], approach],
    },
    faqs: [
      {
        question: "How much does a dashboard cost?",
        answer:
          "It depends on how many numbers and how many systems, so there is no price list. Book a free 30-minute estimate and you get a written estimate with a recommended plan and a price range within two business days, with no obligation. If the numbers can't be trusted until every system is mapped, the Data & AI Assessment is two weeks at a fixed $999. It names the three projects worth doing first, with what each would cost and return, and includes a 60-minute walkthrough with you and your leadership team. The fee is credited toward your first project if you go ahead. You keep the plan either way.",
        links: [estimate, assessment],
      },
      {
        question: "How long until we have a scorecard we can use on Monday?",
        answer:
          "The free 30-minute estimate is one call, with a written plan within two business days. The Data & AI Assessment, if you start there, takes two weeks and hands you the map, the scores and a written plan with prices before any build work starts. The dashboard itself is a fixed-scope project from that plan: a price, a finish line and a result you can check. We build the scorecard to update itself from the systems you already use, so Monday's definitions are the same next Monday. We don't quote a build length until the estimate, because a weekly scorecard and a set of monthly reports that send themselves are different projects.",
        links: [estimate, assessment],
      },
      {
        question: "Where do the numbers come from?",
        answer:
          "From the systems you already run, not from a new place to type them. A CRM such as Salesforce, HubSpot, GoHighLevel or Lawmatics, so the scorecard can match down to the individual lead. Google Ads and Meta Ads, so a reported conversion is one your sales team can find. QuickBooks, Xero, Stripe or Bookkeep for what you spent and what you got. RingCentral when calls are part of the count. If those systems don't talk yet, Data Capture & Integration is the work that connects them, and Data Organization & Warehousing is what makes the records agree.",
        links: [lineLink.capture, lineLink.organize],
      },
      {
        question: "Who owns the dashboard?",
        answer:
          "You do. It reads from systems you own. Every account and every line of code is in your name, with plain-English documentation, so you're never stuck with us to keep it running. The numbers are ones you can hand to your bookkeeper or your board without caveats.",
      },
      {
        question: "What is a KPI hierarchy, in plain words?",
        answer:
          "A short chain of numbers that starts with your goal and ends with what your team does this week. KPI stands for key performance indicator, a number you track because it tells you whether the business is on course. At the top is one goal. Under it are the results that prove you hit it, which only tell you the truth after it has happened. Under those are the weekly activities your team can move right now, such as response time, quotes sent or calls made. A weekly scorecard ties them together, with an owner on every number. A dashboard with forty numbers tells you nothing. We build it from the top down so each number has a reason to be there. The full method is on the Approach page.",
        links: [approach],
      },
      {
        question: "Should we ask AI to rebuild this report every Monday?",
        answer:
          "No. Routine reports belong in the dashboard. You shouldn't prompt AI to rebuild the same report every Monday and get a slightly different answer each time. Monthly reports can build and send themselves. Save AI for the questions you haven't asked before. That work is AI Implementation.",
        links: [lineLink["ai-implementation"]],
      },
      {
        question: "Is this for a business our size?",
        answer: fitAnswer(
          "month-end still means exporting reports and hoping they match. A scorecard only helps if someone owns each number, so say on the call if nobody will."
        ),
      },
    ],
  },
  "custom-software": {
    faqEyebrow: "Questions",
    faqTitle: "Before we write the app",
    engagement: {
      eyebrow: "How an engagement works",
      title: "A screen for how you work, on systems you already pay for.",
      lede: "Off-the-shelf software is built for everyone, so it fits nobody exactly. You already pay for systems that hold the information. What's missing is the screen built around how your company works. We build that screen, then hand you the code.",
      steps: [
        {
          ...estimateStep,
          description:
            "Book a free 30-minute estimate. Show us the spreadsheet your team keeps next to the software, or the status clients email you to ask for. We tell you honestly whether an internal tool, a portal or a mobile app is the right build, and whether the Data & AI Assessment should come first. A written estimate with a recommended plan and a price range follows within two business days. No obligation.",
        },
        {
          ...assessmentStep,
          description:
            "The Data & AI Assessment is two weeks at a fixed $999 when you want every system mapped before anyone writes code. We name the three projects worth doing first, with what each would cost and return, and walk through it with you and your leadership team for 60 minutes. You keep the plan either way. The fee is credited toward your first project if you go ahead.",
        },
        {
          label: "Step 3",
          title: "Build the screen",
          description:
            "A fixed-scope project from the plan: an internal tool on your own domain, a client portal, or iPhone and Android apps under your company's name. Each person's work is pulled from the booking, CRM or accounting system you already pay for, so nothing has to migrate. The project has a price, a finish line and a result you can check.",
        },
        {
          ...handOverStep,
          description:
            "Every line of code and every account is in your name. Your data stays in systems you own, not locked in ours or a new vendor's. You get plain-English documentation and a walkthrough for the people who will use it. Most clients keep DataSpoke on a monthly retainer afterward to watch what we built and fix problems before you notice them.",
        },
      ],
      close: "The app sits on information you can trust. When the tools don't talk, that work is Data Capture & Integration. When the records disagree, it is Data Organization & Warehousing. A number that has to be the same every Monday belongs on Metrics & Dashboards.",
      closeLinks: [lineLink.capture, lineLink.organize, lineLink["metrics-dashboards"]],
    },
    faqs: [
      {
        question: "How much does custom software cost?",
        answer:
          "An internal tool, a client portal and a mobile app are different projects, so there is no single price. Book a free 30-minute estimate and you get a written estimate with a recommended plan and a price range within two business days, with no obligation. When you want every system mapped before anyone writes code, the Data & AI Assessment is two weeks at a fixed $999, with a 60-minute walkthrough, credited toward your first project if you go ahead. You keep the plan either way. Each build after that is fixed-scope: a price, a finish line and a result you can check, all seen before work starts.",
        links: [estimate, assessment],
      },
      {
        question: "How long does it take to build an app?",
        answer:
          "The free 30-minute estimate is one call, and the written plan follows within two business days. The Data & AI Assessment, if you start there, is two weeks. We don't publish a standard build time, because it depends on how your team actually works and which systems the screen has to sit on. The finish line is part of the plan you approve. Nothing is built until you have seen the price.",
        links: [estimate, assessment],
      },
      {
        question: "What do you build on top of?",
        answer:
          "The systems you already pay for, so nothing has to migrate. CRMs such as Salesforce, HubSpot, GoHighLevel and Lawmatics. Industry and booking software such as Mindbody and Clio. Accounting such as QuickBooks, Xero and Stripe. Calls and meetings in RingCentral, Zoom and Fathom. Team tools such as Google Workspace, Slack and Airtable. The app shows each person the work that's theirs, pulled from those systems. iPhone and Android apps use the same idea: your brand, your data, your app store listing.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do. Every line of code and every account is in your name. Your data stays in systems you own, not locked in ours or a new vendor's. You get plain-English documentation and a walkthrough for the people who will use it. The point of the hand-over is that you're never stuck with us.",
      },
      {
        question: "Will this replace Salesforce or QuickBooks?",
        answer:
          "No. We leave the systems you already pay for in place and build the screen they don't have: an internal tool, a client portal or a mobile app around how your company actually works. Your team can stop keeping a spreadsheet next to the software because the software doesn't fit. Customers can book and pay in your app, and you own the relationship instead of a vendor.",
      },
      {
        question: "What does a client portal include?",
        answer:
          "A private, branded page on your own domain where each client logs in and sees their own status, documents and invoices. The information is pulled live from your CRM and accounting system, so nobody updates it by hand. Per-client logins mean each client sees only their own work. The aim is fewer \"where is this at?\" calls, and clients who feel looked after between meetings.",
      },
      {
        question: "Is custom software a fit for us?",
        answer: fitAnswer(
          "you already pay for tools and still can't do the one thing you need. If the information under the app is still a pile, we'll suggest starting with Data Capture & Integration and Data Organization & Warehousing."
        ),
        links: [lineLink.capture, lineLink.organize],
      },
    ],
  },
  "ai-implementation": {
    faqEyebrow: "Questions",
    faqTitle: "Before AI touches your data",
    engagement: {
      eyebrow: "How an engagement works",
      title: "AI on your data, with a person approving the draft.",
      lede: "A general chatbot doesn't know your business. This work gives an assistant your CRM, calls, documents and numbers, under logins you control, and trains the people who do the work. Where AI does the job, it drafts and a person approves.",
      steps: [
        {
          ...estimateStep,
          description:
            "Book a free 30-minute estimate. Tell us the question your team asks you every day, or the job someone retypes every week. We tell you honestly whether AI is the right next project and whether the Data & AI Assessment should score readiness first. A written estimate with a recommended plan and a price range follows within two business days. No obligation.",
        },
        {
          ...assessmentStep,
          description:
            "The Data & AI Assessment is two weeks at a fixed $999. We map what AI would be able to see, score how AI-ready the company is, and name the gaps. You get the three projects worth doing first, with what each would cost and return, and a 60-minute walkthrough with your leadership team. You keep the plan either way. The fee is credited toward your first project if you go ahead.",
        },
        {
          label: "Step 3",
          title: "Put it to work",
          description:
            "Fixed-scope projects from the plan. That can be a private assistant with sources on each answer, a company playbook of systems, processes and roles kept current from documents you already edit, hands-on training, or automations where AI drafts and a person approves. Each one has a price, a finish line and a result you can check.",
        },
        {
          ...handOverStep,
          description:
            "It runs under your own logins. Every account and every line of code is in your name, with plain-English documentation. The playbook is yours. Most clients keep DataSpoke on a monthly retainer afterward so we can watch what we built and give you a straight answer before you buy the next tool a vendor is pitching.",
        },
      ],
      close: "Most clients start with Data Capture & Integration and Data Organization & Warehousing, then add this once the records can be trusted. A report you need every Monday belongs on Metrics & Dashboards. A forecast or a margin question belongs on Analytics & Data Science.",
      closeLinks: [
        lineLink.capture,
        lineLink.organize,
        lineLink["metrics-dashboards"],
        lineLink["analytics-data-science"],
      ],
    },
    faqs: [
      {
        question: "What does AI implementation cost?",
        answer:
          "A private assistant, hands-on training and automations are separate fixed-scope projects, so there is no single price. Book a free 30-minute estimate and you get a written estimate with a recommended plan and a price range within two business days, with no obligation. If you want a score of what AI can even see before we build anything, that is the Data & AI Assessment: two weeks at a fixed $999, with a 60-minute walkthrough with you and your leadership team. You keep the plan either way, and the fee is credited toward your first project if you go ahead.",
        links: [estimate, assessment],
      },
      {
        question: "How long until the team is using it on real work?",
        answer:
          "You can have a written plan within two business days of the free 30-minute estimate. The Data & AI Assessment that scores AI-readiness takes two weeks. Training, the company playbook and custom tools come after that, each with a price and a finish line from the plan. Where AI does the work, it drafts and a person approves. That review is part of the build, not a phase added later. We don't quote a build length until we've seen the work.",
        links: [estimate, assessment],
      },
      {
        question: "What can a company assistant see?",
        answer:
          "Only what you approve, under your own logins. That can include the CRM, such as Salesforce, HubSpot, GoHighLevel, Lawmatics or Clio; call and meeting recordings from RingCentral, Zoom or Fathom; documents in Google Workspace; threads in Slack; and numbers in QuickBooks or Xero. You get plain-English answers with the source behind each one, and secure, per-person access so nothing is shared beyond the people you approve. Part of the work is a clear map of what AI can and can't see, so nothing leaks.",
      },
      {
        question: "Does our team need to be technical?",
        answer:
          "No. We train the people who do the job, on the AI tools that fit that job. Custom tools cover the recurring work: intake, proposals, reports and follow-up. If the team uses AI inconsistently, or not at all, because nobody set them up for the work, that is what this service is for. You talk to the people who scope, build and support it. There is no account manager and no hand-off to a junior team.",
      },
      {
        question: "Who owns the AI setup and the playbook?",
        answer:
          "You do. It runs under your own logins. Every account and every line of code is in your name, with plain-English documentation. The playbook is yours: systems, processes and roles, kept current from the documents your team already edits. Your data stays in systems you own, not locked in ours, so you're never locked in.",
      },
      {
        question: "What if our data isn't ready for AI?",
        answer:
          "Then we won't pretend it is. AI that reads a pile treats a passing comment like company policy. Data Organization & Warehousing files each fact as Decided, Documented, Discussed or Hearsay, with a source, so an answer can say it was only discussed. Data Capture & Integration puts calls, emails and leads in one place you own first. Most clients start there and add AI once the records can be trusted. A report you rebuild every Monday belongs on Metrics & Dashboards, not in a prompt.",
        links: [lineLink.organize, lineLink.capture, lineLink["metrics-dashboards"]],
      },
      {
        question: "Is this for a company our size?",
        answer: fitAnswer(
          "you already pay for a CRM, accounting software and a phone system, and you've tried a general chatbot that doesn't know anything about your business."
        ),
      },
    ],
  },
  "analytics-data-science": {
    faqEyebrow: "Questions",
    faqTitle: "Before we run the numbers",
    engagement: {
      eyebrow: "How an engagement works",
      title: "A question, a method and a result you can check.",
      lede: "You find out a customer left when the payment stops, or you suspect one service loses money and can't prove it. We use your own history to show what's coming and where the next dollars are. We will not promise a revenue figure.",
      steps: [
        {
          ...estimateStep,
          description:
            "Book a free 30-minute estimate. Bring the decision you're making on gut feel, or on a report you don't trust. We tell you honestly whether we can answer it and whether the Data & AI Assessment is the right place to start. A written estimate with a recommended plan and a price range follows within two business days. No obligation.",
        },
        {
          ...assessmentStep,
          description:
            "The Data & AI Assessment is two weeks at a fixed $999. We map the finance, CRM and marketing sources the question depends on, score the gaps, and name the three projects worth doing first, with what each would cost and return. You keep the plan either way, and the fee is credited toward your first project if you go ahead.",
        },
        {
          label: "Step 3",
          title: "Do the analysis",
          description:
            "A fixed-scope project from the plan. That might be a short list each morning of what needs attention, profit by customer, service and channel, a prospect list drawn from your best customers or from public records, or an experiment measured properly before you double it. The project has a price, a finish line and a result you can check against your own books.",
        },
        {
          ...handOverStep,
          description:
            "The analysis is built from your history, in systems you own. Every account and every line of code is in your name, with plain-English documentation, so someone else can see what was calculated and why. You're never stuck with us to rerun it. Most clients keep DataSpoke on a monthly retainer afterward to watch what we built and fix problems before you notice them.",
        },
      ],
      close: "A number you review every week, with an owner, belongs on Metrics & Dashboards. Connecting the systems underneath is Data Capture & Integration, and making the records agree is Data Organization & Warehousing. The path from a goal down to a weekly scorecard is on the Approach page.",
      closeLinks: [lineLink["metrics-dashboards"], lineLink.capture, lineLink.organize, approach],
    },
    faqs: [
      {
        question: "How much do analytics and data science cost?",
        answer:
          "A morning list of what needs attention, a profit view and a prospect list are different fixed-scope projects, so there is no posted price. Book a free 30-minute estimate and you get a written estimate with a recommended plan and a price range within two business days, with no obligation. The Data & AI Assessment is the two-week, $999 way to map every source, score where you stand and name the three projects worth doing first, with what each would cost and return. It includes a 60-minute walkthrough with you and your leadership team. That fee is credited toward your first project if you go ahead. You keep the plan either way.",
        links: [estimate, assessment],
      },
      {
        question: "How long before we can see margin, or what's coming?",
        answer:
          "The free 30-minute estimate says which question comes first, with a written plan within two business days. The Data & AI Assessment, if you start there, takes two weeks and gives you the map, the scores and a written plan with prices before any build work starts. The analysis project after that has a finish line you approve up front. We don't publish one standard duration, because a list of customers going quiet and a full view of profit by service are different sizes of work.",
        links: [estimate, assessment],
      },
      {
        question: "What data does this need?",
        answer:
          "Your own history, from systems you already run. Finance from QuickBooks, Xero, Stripe, Bookkeep, Gusto or ADP. The customer record from Salesforce, HubSpot, GoHighLevel, Lawmatics, Clio or Mindbody. Ad spend from Google Ads and Meta Ads when the question is which channel pays. Calls from RingCentral when the trail starts on the phone. If those systems don't share a record yet, Data Capture & Integration is what connects them, and Data Organization & Warehousing is what stops two reports from disagreeing. Profit by customer, service and channel only holds when the underlying records agree.",
        links: [lineLink.capture, lineLink.organize],
      },
      {
        question: "Who owns the analysis and the data behind it?",
        answer:
          "You do. It is built from your history, in systems you own, not locked in ours or a new vendor's. Every account and every line of code is in your name, with plain-English documentation, so a later analyst can see what was calculated and why. You're never stuck with us to rerun it.",
      },
      {
        question: "What will you tell me, and what won't you promise?",
        answer:
          "We will tell you where to look, and we will not promise a revenue figure or any other result. What you get is a short list of what needs attention today: silence from a good customer, a stalled deal, a job drifting over budget, cash getting tight, or a quarter that needs two more crews. Profit by customer, service and channel. Prospect lists built from your best existing customers or from public records. Experiments set up and measured properly, so you know a bet paid off before you double it. The result you can check is whether the ranking, the margin or the alert matches your own books.",
      },
      {
        question: "How is this different from a dashboard?",
        answer:
          "A dashboard answers the same question every Monday, the same way, without anyone rebuilding it. That is Metrics & Dashboards. This service is the question you have not automated yet: who is about to leave, which service loses money, which bet paid off. When a number should be reviewed every week, we put it on the scorecard instead of asking you to prompt for it. The scorecard method, from the goal down to an owner on each number, is on the Approach page.",
        links: [lineLink["metrics-dashboards"], approach],
      },
      {
        question: "Is analytics a fit for a business our size?",
        answer: fitAnswer(
          "you already suspect one service or customer type loses money and can't prove it, or you find out a customer left when the payment stops."
        ),
      },
    ],
  },
};

function assertLinked(text: string, links: TextLink[] | undefined, where: string) {
  for (const link of links ?? []) {
    if (!text.includes(link.label)) {
      throw new Error(`${where} is missing the link text "${link.label}"`);
    }
  }
}

for (const [slug, extra] of Object.entries(SERVICE_PAGE_EXTRAS) as [ServiceLineSlug, ServicePageExtra][]) {
  assertLinked(extra.engagement.lede, extra.engagement.ledeLinks, `${slug} lede`);
  assertLinked(extra.engagement.close, extra.engagement.closeLinks, `${slug} close`);
  for (const step of extra.engagement.steps) {
    assertLinked(step.description, step.links, `${slug} step ${step.title}`);
  }
  const seen = new Set<string>();
  for (const faq of extra.faqs) {
    if (seen.has(faq.question)) throw new Error(`${slug} repeats the question "${faq.question}"`);
    seen.add(faq.question);
    assertLinked(faq.answer, [...(faq.links ?? []), ...(faq.link ? [faq.link] : [])], `${slug} FAQ "${faq.question}"`);
  }
}
