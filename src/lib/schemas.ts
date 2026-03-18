import type { ContactFormData } from "@/types";

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Name is required";
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.service || data.service.trim().length === 0) {
    errors.service = "Please select a service";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
