import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { Section, SectionHead } from "@/components/shared/section";
import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { ProfilePhoto } from "@/components/home/about-teaser";
import { ExpertiseSection } from "@/components/home/expertise";
import { CtaBanner } from "@/components/home/cta-banner";
import { CREDENTIALS, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = generateMetadata({
  title: "About",
  description:
    "Nick Paul runs DataSpoke from Durham, CT. Data scientist and software developer, Army Engineer officer and combat veteran, B.S. in mathematics, M.S. in operations research, 5 years building analytics, automation, custom software and AI for small businesses nationwide.",
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
        <div className="grid items-start gap-10 md:grid-cols-[200px_1fr] md:gap-14 lg:grid-cols-[260px_1fr]">
          <ProfilePhoto priority className="max-w-[200px] sm:max-w-[260px]" />
          <div className="grid max-w-2xl gap-5">
            <p className="eyebrow">About</p>
            <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-[2.6rem] lg:text-5xl">
              I&apos;m Nick Paul. I help small businesses get their software working together.
            </h1>
            <p className="lede">
              The name is the whole idea. Your business is the hub. Every tool you use is a spoke.
              My job is making the spokes carry data to the hub, so you can see the business
              clearly and so AI has something real to work with.
            </p>
            <p className="text-muted-foreground">
              I learned operations as an Army Engineer officer, leading soldiers in combat zones.
              Out there a plan only counts if it works on the ground, the supplies have to show
              up, and people are depending on you to get it right. I run every project the same
              way.
            </p>
            <p className="text-muted-foreground">
              My training is in math: a bachelor&apos;s in mathematics and a master&apos;s in
              operations research, a discipline about one thing: using data to make better
              decisions. I&apos;m a data scientist and a software developer, so I can both find
              the answer in the numbers and build the system that puts it to work.
            </p>
            <p className="text-muted-foreground">
              For the last five years I&apos;ve brought all of that to small businesses as a
              technology consultant: analytics, automation, custom software and AI. For a law
              firm, I built a private AI assistant wired into its phones, case files and call
              recordings. Attorneys ask about any matter and get the whole history in seconds,
              plus what&apos;s still missing before a document can be drafted. For a home-services
              contractor, I traced every ad dollar through to paying jobs, so the owner knows
              which marketing actually makes money. For a membership business, I replaced a
              slow vendor app with iOS and Android apps the owner controls outright and serves to his customers.
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
            <SpokeBullet key={p.title} size="heading">
              <h3 className="text-[1.15rem] font-bold leading-snug">{p.title}</h3>
              <p className="text-muted-foreground">{p.description}</p>
            </SpokeBullet>
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
                <SpokeBullet key={s} as="li" size="list" className="text-muted-foreground">
                  {s}
                </SpokeBullet>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Probably not
            </p>
            <ul className="mt-3 grid gap-2.5">
              {FIT.no.map((s) => (
                <SpokeBullet key={s} as="li" size="list" tone="muted" className="text-muted-foreground">
                  {s}
                </SpokeBullet>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
