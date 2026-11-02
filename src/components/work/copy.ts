import { CASE_STUDIES } from "@/content/case-studies";
import { SERVICE_LINES } from "@/content/services";
import { clipMetaDescription } from "@/lib/metadata";
import type { CaseStudy, ServiceLine, ServiceLineSlug } from "@/types";

// Copy and lookups for the /work pages. Case study text lives in
// src/content/case-studies.ts; this file holds the page chrome around it.

export const WORK_COPY = {
  index: {
    eyebrow: "Work",
    title: "What this looks like in a real business.",
    lede: "Each case study reads in under a minute: the problem, what DataSpoke built and what changed. Industry and size only. Clients' names and numbers stay theirs.",
    filterLabel: "Filter by service",
    allLabel: "All",
    showing: (line: string) => `Showing work in ${line}.`,
    empty: "No case studies for this service yet. Here is everything else.",
    readMore: "Read the case study",
    metaTitle: "Case studies: what we built and what changed",
    metaDescription:
      "Case studies: how connecting a business's software, dashboards, custom apps and AI changed day-to-day work. Industry and size only, no client names.",
  },
  detail: {
    backLabel: "All work",
    summaryLabel: "At a glance",
    problem: "Problem",
    built: "Built",
    result: "Result",
    sourcesHeading: "What was connected",
    linesHeading: "Services used",
    ctaHeading: "Want the same for your business?",
    ctaLede:
      "Tell us what's slowing you down. A free 30-minute call, then a written estimate with a plan and a price range.",
    ctaBook: "Book your free estimate",
    ctaContact: "Or send us a message",
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

// First-person or quoted sentences read as testimonials, not facts. Keep them out of search snippets.
const TESTIMONIAL_SENTENCE = /\b(I|I'm|I've|me|my|mine|myself)\b|["\u201C\u201D]/i;

/**
 * Meta and JSON-LD description for a case study. Uses the study's own metaDescription when set;
 * otherwise the problem and result, minus any first-person or quoted sentence.
 */
export function caseStudyDescription(study: CaseStudy): string {
  if (study.metaDescription) return clipMetaDescription(study.metaDescription, 155);
  const sentences = `${study.summary.problem} ${study.summary.result}`
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter((s) => !TESTIMONIAL_SENTENCE.test(s));
  return clipMetaDescription(sentences.join(" "), 155);
}
