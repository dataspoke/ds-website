import { ASSESSMENT, KPI_HIERARCHY, PHASES } from "@/content/approach";
import { CASE_STUDIES } from "@/content/case-studies";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  SERVICE_AREA,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";
import { CREDENTIALS, HERO, HOME_FAQS, TOOLS } from "@/content/home";
import { FREE_ESTIMATE } from "@/content/free-estimate";
import { SERVICE_PAGE_EXTRAS } from "@/content/service-pages";
import { HUB_LINES, SPOKE_LINES } from "@/content/services";
import type { CaseStudy, ServiceLine } from "@/types";

// Plain-text summary for AI assistants and answer engines (https://llmstxt.org).
// Built from the same constants as the pages, so it stays in sync with the site copy.
export const dynamic = "force-static";

function lineEntry(l: ServiceLine) {
  return `- [${l.title}](${SITE_URL}/services/${l.slug}): ${l.oneLiner} You get: ${l.youGet.join(" ")}`;
}

function caseStudyEntry(c: CaseStudy) {
  const band = [c.industry, c.size, c.revenueBand].filter(Boolean).join(", ");
  return `- [${c.title}](${SITE_URL}/work/${c.slug}): ${band}. ${c.summary.problem} ${c.summary.result}`;
}

function body() {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `${SITE_NAME} is a data and AI consulting firm founded by Nick Paul (${CREDENTIALS.slice(0, 3).join("; ")}). ${SERVICE_AREA} Clients are established businesses, from owner-run to mid-size, whose CRM, accounting, phone and marketing tools don't talk to each other. Owners come to ${SITE_NAME} to ${HERO.outcomes.map((o) => o.replace(/\.$/, "").toLowerCase()).join(", ")}, and to grow their business with the data they already have.`,
    "",
    `Systems commonly connected: ${TOOLS.join(", ")}.`,
    "",
    "## Quick answers",
    "",
    ...HOME_FAQS.map((f) => `- ${f.question} ${f.answer}`),
    "",
    "## Services",
    "",
    "Six services. Two get the company's information into one trustworthy place it owns. Four put it to work.",
    "",
    "### The foundation",
    "",
    ...HUB_LINES.map(lineEntry),
    "",
    "### What runs on it",
    "",
    ...SPOKE_LINES.map(lineEntry),
    "",
    "## Questions on the service pages",
    "",
    "Each service page answers these in the visible FAQ, with the same words in FAQPage structured data. Pricing on every page points at the free 30-minute estimate and the Data & AI Assessment. No other prices are quoted.",
    "",
    ...[...HUB_LINES, ...SPOKE_LINES].flatMap((l) => {
      const extra = SERVICE_PAGE_EXTRAS[l.slug];
      return [
        `### [${l.title}](${SITE_URL}/services/${l.slug})`,
        "",
        `${extra.engagement.title} ${extra.engagement.lede}`,
        "",
        ...extra.faqs.map((f) => `- ${f.question} ${f.answer}`),
        "",
      ];
    }),
    `## The [${ASSESSMENT.name}](${SITE_URL}/approach#assessment)`,
    "",
    `Price: ${ASSESSMENT.price}, ${ASSESSMENT.terms}.`,
    "",
    ASSESSMENT.lede,
    "",
    ...ASSESSMENT.includes.map((i) => `- ${i}`),
    "",
    ASSESSMENT.credit,
    "",
    "## Approach",
    "",
    ...PHASES.map((p) => `- ${p.title}: ${p.description}`),
    "",
    `${KPI_HIERARCHY.title} ${KPI_HIERARCHY.lede}`,
    "",
    ...(CASE_STUDIES.length
      ? ["## Case studies", "", ...CASE_STUDIES.map(caseStudyEntry), ""]
      : []),
    "## Pages",
    "",
    `- [Home](${SITE_URL}): what ${SITE_NAME} does for business owners and who it's for`,
    `- [Services](${SITE_URL}/services): the six services, each described by what changes for the owner`,
    `- [Work](${SITE_URL}/work): case studies, filterable by service`,
    `- [Approach](${SITE_URL}/approach): the ${ASSESSMENT.name}, then build, hand-over and retainer, plus how the numbers that run a business get picked`,
    `- [About](${SITE_URL}/about): Nick Paul's background and how he works`,
    `- [Free estimate](${SITE_URL}${FREE_ESTIMATE.path}): ${FREE_ESTIMATE.lede}`,
    `- [Contact](${SITE_URL}/contact): book a free 30-minute call or send a note`,
    "",
    "## Contact",
    "",
    `- Email: ${CONTACT_EMAIL}`,
    `- Book a free 30-minute estimate: ${SITE_URL}${FREE_ESTIMATE.path} (calendar: ${BOOKING_URL})`,
    "",
  ];

  return lines.join("\n");
}

export function GET() {
  return new Response(body(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
