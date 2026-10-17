import { FREE_ESTIMATE_PATH } from "@/lib/constants";
import type { FaqItem } from "@/types";

export const FREE_ESTIMATE = {
  path: FREE_ESTIMATE_PATH,
  metaTitle: "Free 30-minute data & AI estimate",
  metaDescription:
    "A free 30-minute call about your tools, data, and goals, then a written estimate with a plan and price range within two business days. No obligation.",
  eyebrow: "For established businesses",
  headline: "Free 30-minute data & AI estimate",
  lede: "A call about your tools, your data, and your goals. Then a written estimate with a recommended plan and a price range. No obligation.",
  cta: "Book your free estimate",
  youGet: {
    eyebrow: "What you get",
    title: "A plan you can act on, or walk away from.",
    items: [
      "A 30-minute call about the tools you run, the data they hold, and the goals you care about.",
      "A written estimate with a recommended plan and a price range, sent within two business days.",
      "No obligation. You keep the estimate whether or not you hire us.",
    ],
  },
  how: {
    eyebrow: "How it works",
    title: "Three steps. Then you decide.",
    steps: [
      {
        label: "Step 1",
        title: "Book a time",
        description: "Choose a time that works. You get a calendar invite with a video link.",
      },
      {
        label: "Step 2",
        title: "30-minute call",
        description:
          "We talk through your tools, your data, and what you want to change. No deck required.",
      },
      {
        label: "Step 3",
        title: "Written estimate within 2 business days",
        description:
          "A recommended plan and a price range, in writing. Nothing starts until you decide.",
      },
    ],
  },
  services: {
    eyebrow: "What it covers",
    title: "Any of the work we do.",
    lede: "The estimate can cover any of these. On the call we'll say which ones fit, and which to leave for later.",
  },
  booking: {
    eyebrow: "Book a time",
    title: "Pick a 30-minute slot.",
    /** Used where the page has no second link out to the calendar. */
    embedLede: "The calendar below is the same booking page we use for this estimate.",
    lede: "The calendar below is the same booking page we use for this estimate. If it does not load, open it in a new tab.",
    fallback: "Open the booking page",
  },
  faq: {
    eyebrow: "Questions",
    title: "Before you book",
  },
} as const;

export const ESTIMATE_FAQS: FaqItem[] = [
  {
    question: "What happens on the call?",
    answer:
      "We ask about the software you already pay for, where your data lives, and what you want to be different. You don't need to prepare anything. Bring the problem that is costing time or money.",
  },
  {
    question: "What is in the written estimate?",
    answer:
      "A recommended plan and a price range. It names what we would do first and which services that work uses. It is not a full inventory of every system you run. You have it within two business days of the call.",
  },
  {
    question: "Is there any cost or commitment?",
    answer:
      "The call and the written estimate are free. There is no obligation to continue. If we are not the right fit, we will say so.",
  },
  {
    question: "Who is this for?",
    answer:
      "Established businesses that already run on several tools and want those tools, the data, and the next project to fit together. We work with companies across the United States.",
  },
  {
    question: "Is this the Data & AI Assessment?",
    answer:
      "No. This is a free call and a written estimate. The Data & AI Assessment is a separate two-week engagement at a fixed price, for a full map of your systems and a scored plan. We'll tell you on the call if that is the better next step. The details are on the Approach page.",
    link: { label: "Approach page", href: "/approach#assessment" },
  },
  {
    question: "Who will be on the call?",
    answer:
      "Someone from our senior team, the same people who do the work. We're a small team. You will not be passed to a junior salesperson.",
  },
];
