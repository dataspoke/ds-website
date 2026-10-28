export interface NavItem {
  label: string;
  href: string;
}

export interface Product {
  slug: string;
  title: string;
  description: string;
  result: string;
  soundsLike: string[];
  youGet: string[];
}

export type ServiceLineSlug =
  | "capture"
  | "organize"
  | "metrics-dashboards"
  | "custom-software"
  | "ai-implementation"
  | "analytics-data-science";

export interface ServiceLine {
  slug: ServiceLineSlug;
  /** Hub lines are the foundation every spoke builds on. */
  kind: "hub" | "spoke";
  title: string;
  /** The outcome for the owner, in plain words. Doubles as the page h1. */
  oneLiner: string;
  /** Browser-tab and search-result title, in buyers' words. */
  metaTitle: string;
  /** Search-result description. Whole sentences, in buyers' words. */
  metaDescription: string;
  problem: string;
  soundsLike: string[];
  youGet: string[];
  products: Product[];
}

export interface CaseStudySection {
  heading: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  /** Team size band, e.g. "20–50 staff". */
  size: string;
  /** Optional annual revenue band, e.g. "$1–5M revenue". Shown only when set. */
  revenueBand?: string;
  lines: ServiceLineSlug[];
  summary: {
    problem: string;
    built: string;
    result: string;
  };
  /** Data sources the work connected, e.g. "CRM", "Phone system". */
  sources: string[];
  sections: CaseStudySection[];
  featured: boolean;
  /**
   * Git author timestamps for this study's text in src/content/case-studies.ts.
   * published: the commit that introduced it. modified: the last commit that changed it.
   */
  dates?: {
    published: string;
    modified: string;
  };
}

export interface Problem {
  title: string;
  description: string;
}

export interface Expertise {
  title: string;
  description: string;
  example: string;
}

export interface Example {
  industry: string;
  before: string;
  after: string;
  result: string;
}

export interface Step {
  label: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

/** A phrase inside a plain-text answer that should render as a link. Schema keeps the plain text. */
export interface TextLink {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  /** One phrase inside `answer`. Prefer `links` when an answer has several. */
  link?: TextLink;
  /** Phrases inside `answer`, matched by exact text. */
  links?: TextLink[];
}
