import { CASE_STUDIES } from "@/content/case-studies";
import { SERVICE_LINES } from "@/content/services";
import type { CaseStudy, ServiceLine, ServiceLineSlug } from "@/types";

// Copy and lookups for the /work pages. Case study text lives in
// src/content/case-studies.ts; this file holds the page chrome around it.

export const WORK_COPY = {
  index: {
    eyebrow: "Work",
    proofLine:
      "I doubled my revenue in the last year by running my own business on these tools. I can do the same for yours.",
    lede: "Here is what I built for other businesses. Each one reads in under a minute: the problem, what I built and the result.",
    filterLabel: "Filter by service line",
    allLabel: "All",
    showing: (line: string) => `Showing work in ${line}.`,
    empty: "No case studies in this line yet. Here is everything else.",
    readMore: "Read the case study",
    metaTitle: "Work",
    metaDescription:
      "Case studies from established businesses: the problem, what I built and the result. Dashboards, custom software, AI and analytics built on the systems they already run.",
  },
  detail: {
    backLabel: "All work",
    summaryLabel: "At a glance",
    problem: "Problem",
    built: "Built",
    result: "Result",
    sourcesHeading: "What I connected",
    linesHeading: "Service lines",
    ctaHeading: "Want the same for your business?",
    ctaLede: "Tell me what's slowing you down. I'll tell you honestly whether I can fix it.",
    ctaBook: "Book a 30-minute call",
    ctaContact: "Or send me a message",
  },
} as const;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function getLine(slug: string): ServiceLine | undefined {
  return SERVICE_LINES.find((l) => l.slug === slug);
}

export function isLineSlug(value: unknown): value is ServiceLineSlug {
  return typeof value === "string" && SERVICE_LINES.some((l) => l.slug === value);
}

/** "Industry · size · revenue band", skipping any part that's missing. */
export function caseStudyMeta(c: CaseStudy): string {
  return [c.industry, c.size, c.revenueBand].filter(Boolean).join(" · ");
}
