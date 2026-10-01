import type {
  Example,
  Expertise,
  NavItem,
  Problem,
  Stage,
  Step,
} from "@/types";

export const SITE_NAME = "DataSpoke";
export const SITE_TAGLINE = "Your company, running on connected data. Ready for AI.";
export const SITE_DESCRIPTION =
  "DataSpoke connects the software a small business already runs on into one picture the owner controls, makes it ready for AI, and builds the dashboards, automations and analysis that turn it into better decisions.";
export const SITE_URL = "https://www.dataspoke.io";
export const CONTACT_EMAIL = "nick@dataspoke.io";
export const BOOKING_URL = "https://calendar.app.google/jzAtxw6Pjtwz8WDV9";
export const LOCATION = "Durham, CT";

export const NAV_ITEMS: NavItem[] = [
  { label: "Products", href: "/services" },
  { label: "AI Assessment", href: "/services#assessment" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const HERO = {
  eyebrow: "For small businesses with too many tools and not enough answers",
  headline: SITE_TAGLINE,
  lede:
    "Your sales, operations and finance tools each know part of the story. I connect them into one picture you own, so every decision is made on what's actually happening.",
  byline:
    "Nick Paul · Army Engineer officer · data scientist & software developer · M.S. Operations Research · one senior consultant, no hand-offs",
};

/** Spokes on the hero diagram: one per area of the business, clockwise from the top. */
export const SPOKES = [
  "Sales",
  "Marketing",
  "Phone calls",
  "Meetings",
  "Operations",
  "Finance",
  "Customers",
  "Documents",
];

/** Text only. Vendor brand rules do not allow logo use without a partner agreement; see public/logos/README.md. */
export const TOOLS = [
  "Salesforce",
  "Lawmatics",
  "Clio",
  "QuickBooks",
  "RingCentral",
  "Google Ads",
  "Meta Ads",
  "Mindbody",
  "Google Workspace",
];

export const PROBLEMS: Problem[] = [
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
];

export const PROBLEMS_CLOSE =
  "Connecting the software is the first step. Capturing what the business already knows is the second. That's what makes you AI\u2011ready.";

export const STAGES: Stage[] = [
  {
    number: "01",
    slug: "connected",
    title: "Connected",
    summary: "Every system feeding one picture you own.",
    products: [
      {
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
      },
      {
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
      },
      {
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
      },
    ],
  },
  {
    number: "02",
    slug: "ai-ready",
    title: "AI\u2011Ready",
    summary: "AI that knows your business, and a team that knows how to use it.",
    products: [
      {
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
      },
      {
        slug: "ai-ready-company",
        title: "AI\u2011Ready Company",
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
      },
    ],
  },
  {
    number: "03",
    slug: "optimized",
    title: "Optimized",
    summary: "New ways of running the business that weren't possible before.",
    products: [
      {
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
      },
      {
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
      },
      {
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
      },
    ],
  },
];

export const PRODUCTS = STAGES.flatMap((s) => s.products);

export const RETAINER_NOTE =
  "Most clients keep me on a monthly retainer afterward. I watch what I built, fix problems before you notice them, and give you a straight answer before you buy the next tool a vendor is pitching.";

export const EXPERTISE: Expertise[] = [
  {
    title: "Operations",
    description:
      "Trained in operations research. I look at how work actually moves through your business, where it waits and what it costs, then fix the flow before adding software to it.",
    example: "Replacing a whiteboard schedule with a planner that reads the real orders.",
  },
  {
    title: "Data science",
    description:
      "Anyone can run a model. Knowing whether it was done right, what the result means and what to do about it on Monday morning is the job. I guide the question, the method and the decision.",
    example: "Ranking which prospects a sales team should call first, and proving the ranking works.",
  },
  {
    title: "Custom software",
    description:
      "When nothing off the shelf fits how your team works, I build the piece that does, on top of the systems you already own, and document it so you're never stuck with me.",
    example: "A customer-facing app that sits on top of the booking system you already pay for.",
  },
];

export const ASSESSMENT = {
  price: "$999",
  terms: "fixed price · 2 weeks",
  lede:
    "Two weeks. I inventory every system and data source your company runs on, score how connected and AI\u2011ready it is today, and hand you a prioritized plan. You keep the plan whether or not we work together.",
  includes: [
    "A map of every tool, who uses it and what data lives there",
    "A connected-data score and an AI\u2011readiness score, with the gaps named",
    "The three projects worth doing first, with what each would cost and return",
    "A 60-minute walkthrough with you and your leadership team",
  ],
  credit: "Credited toward your first project if you go ahead.",
  sampleScores: [
    { label: "Sales (CRM)", score: 8 },
    { label: "Marketing (Ads)", score: 4 },
    { label: "Phone calls", score: 2 },
    { label: "Operations", score: 5 },
    { label: "Finance (Books)", score: 3 },
    { label: "AI\u2011ready", score: 1 },
  ],
};

export const STEPS: Step[] = [
  {
    label: "Step 1",
    title: "Free 30-minute call",
    description:
      "You tell me what's frustrating you. I tell you honestly whether I can fix it and whether the AI Assessment is the right place to start.",
  },
  {
    label: "Step 2",
    title: "AI Assessment",
    description:
      "You get the map, the scores and a written plan with prices before any build work starts.",
  },
  {
    label: "Step 3",
    title: "Build, hand over, support",
    description:
      "Fixed-scope projects from the plan. You own every account and every line of code, with plain-English documentation.",
  },
];

export const EXAMPLES: Example[] = [
  {
    industry: "Professional services",
    before:
      "Month-end reports built by hand from exports. The owner prepping for client meetings by digging through old calls and notes.",
    after:
      "Reports that check themselves against the books and send on their own. A private assistant that already knows every client, call and open task.",
    result: "Reports arrive without being asked for. Meeting prep is one question.",
  },
  {
    industry: "Home services",
    before:
      "Ad platforms reporting conversions the sales team can't find. Leads from several agencies and vendors arriving by email.",
    after:
      "Every lead source flowing into the CRM in minutes, junk filtered out, and one view of cost per paying job by channel and by agency.",
    result: "One trusted number for what each marketing dollar brings back.",
  },
  {
    industry: "Membership business",
    before:
      "A customer-facing app that was slow, out of date and dependent on a vendor nobody could reach.",
    after:
      "Rebuilt iOS and Android apps on top of the booking system the business already pays for, and the owner holding the keys to their own data.",
    result: "Customers book in seconds. The owner owns the whole thing.",
  },
];

export const CREDENTIALS = [
  "Army Engineer officer, combat veteran",
  "B.S. Mathematics · M.S. Operations Research",
  "Data scientist & software developer",
  "5 years consulting for small businesses",
  `${LOCATION} · clients nationwide`,
];

export const SERVICE_OPTIONS = [
  { value: "assessment", label: "Start with the AI Assessment" },
  { value: "connected-company", label: "Connect our systems" },
  { value: "live-numbers", label: "Numbers and reports we can trust" },
  { value: "lead-flow", label: "Respond to every lead faster" },
  { value: "company-brain", label: "Get answers from our own business data" },
  { value: "ai-ready-company", label: "Get our company and team AI\u2011ready" },
  { value: "automate-the-busywork", label: "Automate repeat work" },
  { value: "early-warnings", label: "Know what's coming before it hits" },
  { value: "find-the-margin", label: "Find where the money is" },
  { value: "other", label: "Not sure yet. Let's talk." },
];

export const TRADEMARK_NOTE =
  "Product names are trademarks of their respective owners. DataSpoke is not affiliated with, endorsed by or a partner of these companies.";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/nick-paul-8b466818/",
};
