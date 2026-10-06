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

export interface Stage {
  number: string;
  slug: string;
  title: string;
  summary: string;
  products: Product[];
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
  oneLiner: string;
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
  /** Headcount band, e.g. "20–50 staff". */
  size: string;
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
