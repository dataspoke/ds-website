import type { Metadata } from "next";
import { Suspense } from "react";
import { generateMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { BookCall } from "@/components/shared/book-call";
import { ContactForm } from "@/components/contact/contact-form";
import { CONTACT_EMAIL, LOCATION, SOCIAL_LINKS, STEPS } from "@/lib/constants";

export const metadata: Metadata = generateMetadata({
  title: "Contact",
  description:
    "Book a free 30-minute call with DataSpoke, or send a note about what's slowing your business down. Replies within one business day.",
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
            The fastest route is a 30-minute call. If you&apos;d rather write, the form goes
            straight to me and I reply within one business day.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="grid content-start gap-8">
            <div className="grid gap-4 rounded-2xl border border-border p-6 sm:p-8">
              <h2 className="text-2xl font-bold">Book a free 30-minute call</h2>
              <p className="text-muted-foreground">
                Pick a time that suits you. You&apos;ll get a calendar invite with a video link.
                Come with whatever is frustrating you; no preparation needed.
              </p>
              <BookCall className="justify-self-start">Pick a time</BookCall>
            </div>

            <div className="grid gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                What happens next
              </p>
              <ol className="grid gap-3">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-3 text-[0.95rem] text-muted-foreground">
                    <span className="font-display font-bold text-brand">{i + 1}</span>
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
                · {LOCATION}, working with clients nationwide
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
