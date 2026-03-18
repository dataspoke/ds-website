import type { Metadata } from "next";
import { Suspense } from "react";
import { Linkedin, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with DataSpoke for AI integration, connected data, CRM implementation, or a free consultation.",
};

export default function ContactPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a question or ready to talk? Fill out the form and I'll get back to you within 24 hours."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-card" />}>
              <ContactForm />
            </Suspense>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border/40 bg-card p-8 space-y-6">
              <h3 className="text-lg font-semibold">Other Ways to Reach Me</h3>

              <div className="flex items-start gap-3">
                <Linkedin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">LinkedIn</p>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">
                    Durham, CT &mdash; serving clients nationwide
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-lg bg-primary/5 border border-primary/10 p-6">
                <h4 className="text-sm font-semibold text-primary">
                  Free 30-Minute Consultation
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Not sure where to start? Book a free call and we&apos;ll
                  discuss your challenges and see if we&apos;re a good fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
