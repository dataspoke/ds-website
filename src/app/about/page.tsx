import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { Section, SectionHead } from "@/components/shared/section";
import { PhotoPlaceholder } from "@/components/home/about-teaser";
import { ExpertiseSection } from "@/components/home/expertise";
import { CtaBanner } from "@/components/home/cta-banner";
import { CREDENTIALS, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = generateMetadata({
  title: "About",
  description:
    "Nick Paul runs DataSpoke from Durham, CT. Army veteran, M.S. in operations research, 10+ years connecting data and building software for small businesses nationwide.",
  path: "/about",
});

const PRINCIPLES = [
  {
    title: "You talk to the person doing the work.",
    description: "No account manager, no hand-off to a junior team. I scope it, build it and support it.",
  },
  {
    title: "Plain English, no jargon.",
    description: "If I can't explain what I'm building and why in a sentence you'd use yourself, I haven't finished thinking.",
  },
  {
    title: "You own all of it.",
    description: "Every account, every line of code, every document. Nothing sits in my name.",
  },
  {
    title: "Everything is written down.",
    description: "What was built, how it works and what to do when it breaks, so you're never locked in to me.",
  },
];

const FIT = {
  yes: [
    "Owner-run businesses, roughly 5 to 50 people",
    "You already pay for a CRM, accounting software and a phone system, and they don't talk",
    "You want numbers you can trust and a team that can use AI on real work",
  ],
  no: [
    "You want a website or a logo (I'll point you to someone good)",
    "You're looking for the cheapest hourly rate",
    "You want a tool built but don't want to change how anyone works",
  ],
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <div className="grid items-start gap-10 md:grid-cols-[260px_1fr] md:gap-14">
          <PhotoPlaceholder className="max-w-[260px]" />
          <div className="grid max-w-2xl gap-5">
            <p className="eyebrow">About</p>
            <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl">
              I&apos;m Nick Paul. I help small businesses get their software working together.
            </h1>
            <p className="lede">
              The name is the whole idea. Your business is the hub. Every tool you use is a spoke.
              My job is making the spokes carry data to the hub, so you can see the business
              clearly and so AI has something real to work with.
            </p>
            <p className="text-muted-foreground">
              I served in the U.S. Army and earned a master&apos;s in operations research, which
              is a discipline about one thing: using data to make better decisions. I&apos;ve
              spent the ten years since building the systems that let small businesses do that,
              from connecting a law firm&apos;s phones to its case files, to tracing a
              contractor&apos;s ad spend through to paid jobs, to shipping a membership app on top
              of a booking system the business already owned.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {CREDENTIALS.map((c) => (
                <span key={c}>{c}</span>
              ))}
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:text-primary/80"
              >
                LinkedIn &rarr;
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section tint>
        <SectionHead eyebrow="How I work" title="Four things you can hold me to." />
        <div className="mt-10 grid gap-7 sm:grid-cols-2 md:gap-10">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="grid content-start gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-brand" aria-hidden="true" />
              <h3 className="text-[1.15rem] font-bold">{p.title}</h3>
              <p className="text-muted-foreground">{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <ExpertiseSection />

      <Section className="pt-0 sm:pt-0">
        <SectionHead eyebrow="Fit" title="Who I work best with." />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              A good fit
            </p>
            <ul className="mt-3 grid gap-2.5">
              {FIT.yes.map((s) => (
                <li key={s} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Probably not
            </p>
            <ul className="mt-3 grid gap-2.5">
              {FIT.no.map((s) => (
                <li key={s} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-full bg-border" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
