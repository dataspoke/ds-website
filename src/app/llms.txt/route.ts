import { ASSESSMENT, KPI_HIERARCHY, PHASES } from "@/content/approach";
import { CASE_STUDIES } from "@/content/case-studies";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";
import { CREDENTIALS, PROOF_LINE, TOOLS } from "@/content/home";
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
    `${SITE_NAME} is run by Nick Paul: ${CREDENTIALS.slice(0, 3).join("; ")}. One senior consultant, no hand-offs. Clients are established businesses past $1M in annual revenue, across the United States, whose CRM, accounting, phone and marketing tools don't talk to each other.`,
    "",
    `${PROOF_LINE.claim} ${PROOF_LINE.offer}`,
    "",
    `Systems commonly connected: ${TOOLS.join(", ")}.`,
    "",
    "## Services",
    "",
    "Six service lines in a hub and spokes. The hub captures and organizes the company's data. The spokes put it to work.",
    "",
    "### Hub: the data in the middle",
    "",
    ...HUB_LINES.map(lineEntry),
    "",
    "### Spokes: what runs on it",
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
    `- [Home](${SITE_URL}): what ${SITE_NAME} does and who it's for`,
    `- [Services](${SITE_URL}/services): the six service lines and how they fit together`,
    `- [Work](${SITE_URL}/work): case studies, filterable by service line`,
    `- [Approach](${SITE_URL}/approach): the ${ASSESSMENT.name}, then build, hand-over and retainer, plus the KPI hierarchy`,
    `- [About](${SITE_URL}/about): Nick Paul's background and how he works`,
    `- [Free estimate](${SITE_URL}/free-estimate): a free 30-minute call about tools, data, and goals, then a written estimate with a recommended plan and a price range. No obligation.`,
    `- [Contact](${SITE_URL}/contact): book a free 30-minute call or send a note`,
    "",
    "## Contact",
    "",
    `- Email: ${CONTACT_EMAIL}`,
    `- Book a free 30-minute call: ${BOOKING_URL}`,
    "",
  ];

  return lines.join("\n");
}

export function GET() {
  return new Response(body(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
