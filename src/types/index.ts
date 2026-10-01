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
