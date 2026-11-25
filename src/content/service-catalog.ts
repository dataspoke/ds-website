import type { ServiceLineSlug } from "@/types";
import { CLAUDE_PAGE } from "./claude-services";
import { BRAIN_PAGE } from "./company-brain-service";
import { AGENT_PAGE } from "./personal-ai-agent";
import { SERVICE_LINES } from "./services";
import { FACTORY_PAGE } from "./software-factory";

/**
 * The one list of every service DataSpoke offers: the six service lines (src/content/services.ts),
 * then the setup services that have their own page under /services. Counts in copy
 * ("Ten ways…", "Compare all ten") and the contact form's options come from here,
 * so adding a service updates both.
 */

/** Setup services with their own page, in the order the /services cards show them. */
export const SETUP_SERVICES = [CLAUDE_PAGE, AGENT_PAGE, FACTORY_PAGE, BRAIN_PAGE] as const;

/** URL slug of a setup service, e.g. "/services/claude" -> "claude". Also its /contact?service= value. */
export function setupServiceSlug(page: { path: string }): string {
  return page.path.replace(/^\/services\//, "");
}

/** Every service, by name and page path. */
export const ALL_SERVICES: { slug: string; name: string; path: string }[] = [
  ...SERVICE_LINES.map((l) => ({ slug: l.slug, name: l.title, path: `/services/${l.slug}` })),
  ...SETUP_SERVICES.map((p) => ({ slug: setupServiceSlug(p), name: p.card.title, path: p.path })),
];

export const SERVICE_COUNT = ALL_SERVICES.length;

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

/** "ten" for 10. Falls back to digits past twelve. */
export function countWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

/** `countWord` with a capital first letter, for the start of a sentence. */
export function countWordCapitalized(n: number): string {
  const word = countWord(n);
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/** Contact form label for each service line. Typed by slug, so a new line fails the build until it has one. */
const LINE_CONTACT_LABELS: Record<ServiceLineSlug, string> = {
  capture: "Get all our systems feeding one place",
  organize: "Clean up and organize our data",
  "metrics-dashboards": "Numbers and dashboards we can trust",
  "custom-software": "Build our own app or internal tool",
  "ai-implementation": "Put AI to work on our business",
  "analytics-data-science": "Find where the money is and what's coming",
};

/** Contact form label for each setup service, keyed by its slug. */
const SETUP_CONTACT_LABELS: Record<string, string> = {
  claude: "Set up Claude for our team",
  "personal-ai-agent": "A personal AI assistant for me",
  "software-factory": "An AI software factory for internal tools",
  "company-brain": "A company brain our team and AI can use",
};

function setupContactLabel(slug: string): string {
  const label = SETUP_CONTACT_LABELS[slug];
  if (!label) throw new Error(`service-catalog: no contact form label for setup service "${slug}"`);
  return label;
}

/**
 * Contact form options: the assessment, every service (value = its slug, so /contact?service=<slug>
 * preselects), then "other". "assessment" and "other" have no service page; "assessment" maps to
 * /approach#assessment.
 */
export const SERVICE_OPTIONS: { value: string; label: string }[] = [
  { value: "assessment", label: "Start with the Data & AI Assessment" },
  ...SERVICE_LINES.map((l) => ({ value: l.slug, label: LINE_CONTACT_LABELS[l.slug] })),
  ...SETUP_SERVICES.map((p) => {
    const slug = setupServiceSlug(p);
    return { value: slug, label: setupContactLabel(slug) };
  }),
  { value: "other", label: "Not sure yet. Let's talk." },
];
