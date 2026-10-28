import { FREE_ESTIMATE_PATH } from "@/lib/constants";
import type { FaqItem } from "@/types";

export const FREE_ESTIMATE = {
  path: FREE_ESTIMATE_PATH,
  metaTitle: "Free 30-minute estimate for data, dashboards, software and AI work",
  metaDescription:
    "Book a free 30-minute estimate with DataSpoke. Tell us what's slowing your business down, and within two business days you get a written plan and a price range. No obligation. Serving Connecticut, New York and businesses across the US.",
  eyebrow: "For established businesses, from owner-run to mid-size",
  headline: "Free 30-minute data & AI estimate",
  lede: "A call about what's slowing your business down and the tools you already use. Then a written estimate with a recommended plan and a price range. No obligation.",
  cta: "Book your free estimate",
  youGet: {
    eyebrow: "What you get",
    title: "A plan you can act on, or walk away from.",
    items: [
      "A 30-minute call about the tools you run, the information they hold and the result you want: a team that gets more done, numbers you can trust, hours back each week.",
      "A written estimate with a recommended plan and a price range, sent within two business days.",
      "No obligation. You keep the estimate whether or not you work with us.",
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
          "We talk through your tools, your data and what you want to change. No preparation and no technical background needed.",
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
      "We ask about the software you already pay for, where your information lives and what you want to be different. You don't need to prepare anything or know any technical terms. Bring the problem that is costing you time or money.",
  },
  {
    question: "What is in the written estimate?",
    answer:
      "A recommended plan and a price range. It names what we would do first and which services that work uses. It is not a full inventory of every system you run. You have it within two business days of the call.",
  },
  {
    question: "Is there any cost or commitment?",
    answer:
      "No. The call and the written estimate are free, and there is no obligation to continue. If we are not the right fit, we will say so and point you to someone who is.",
  },
  {
    question: "Who is this for?",
    answer:
      "Established businesses, from owner-run to mid-size, that already run on several tools and want those tools, the information in them and the next project to fit together. Most owners come to us wanting to know their numbers, save hours of manual work or help their team do more. We work with companies in Connecticut, New York and across the United States.",
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
