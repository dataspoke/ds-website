export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  whoItsFor: string;
  icon: string;
  features?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}
