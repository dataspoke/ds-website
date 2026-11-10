import type { Metadata } from "next";
import { Suspense } from "react";
import { generateMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { ContactForm } from "@/components/contact/contact-form";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";
import { STEPS } from "@/content/approach";

export const metadata: Metadata = generateMetadata({
  title: "Book your free AI strategy call",
  description:
    "Book your free AI strategy call with DataSpoke, or send a note about what's slowing your business down. We reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section>
        <div className="grid max-w-2xl gap-4">
          <p className="eyebrow">Contact</p>
          <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl">
            Let&apos;s talk about what&apos;s slowing you down.
          </h1>
          <p className="lede">
            The fastest route is a free AI strategy call: 30 minutes, then a written estimate with a
            recommended plan and a price range within two business days. No obligation. If you&apos;d
            rather write, the form goes straight to us and you get a reply within one business day.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="grid content-start gap-8">
            <div className="grid gap-4 rounded-2xl border border-border p-6 sm:p-8">
              <h2 className="text-2xl font-bold">Book your free AI strategy call</h2>
              <p className="text-muted-foreground">
                See what the call covers and what you get afterward, then pick a slot there. Come
                with whatever is slowing your business down. No preparation and no technical
                background needed.
              </p>
              <EstimateCta location="contact" className="justify-self-start">
                See how the call works
              </EstimateCta>
            </div>

            <div className="grid gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                What happens next
              </p>
              <ol className="grid gap-3">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-3 text-[0.95rem] text-muted-foreground">
                    <span className="w-4 shrink-0 text-center font-display font-bold text-primary tabular-nums">{i + 1}</span>
                    <span>
                      <span className="font-semibold text-foreground">{s.title}.</span>{" "}
                      {s.description}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-1.5 text-sm text-muted-foreground">
              <p>
                Email{" "}
                <span className="font-semibold text-foreground select-all">{CONTACT_EMAIL}</span>
              </p>
              <p>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:text-primary/80"
                >
                  LinkedIn
                </a>{" "}
                · Serving clients nationwide
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-2xl font-bold">Or send a note</h2>
            <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-tint" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </Section>
    </>
  );
}
