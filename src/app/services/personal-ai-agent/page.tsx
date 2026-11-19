import type { Metadata } from "next";
import Link from "next/link";
import { Check, Quote } from "lucide-react";
import { generateMetadata } from "@/lib/metadata";
import { LinkedText } from "@/components/shared/faq-list";
import { Section, SectionHead } from "@/components/shared/section";
import { EstimateCta } from "@/components/shared/estimate-cta";
import {
  CompareTable,
  GateLanes,
  LearningLoop,
  RetroStats,
  SetupSteps,
  StopTiles,
  TeamGrid,
} from "@/components/services/personal-agent-visuals";
import { AGENT_PAGE as P } from "@/content/personal-ai-agent";
import { LINE_PAGE } from "@/content/services";

// DRAFT. noIndex keeps it out of search, even on the Vercel preview. It is not
// linked from the nav, the /services index, the home page, sitemap.ts or llms.txt.
// Remove noIndex and the draft badge when Nick approves publishing.
export const metadata: Metadata = generateMetadata({
  title: P.metaTitle,
  description: P.metaDescription,
  path: P.path,
  noIndex: true,
});

function Cta({ location }: { location: string }) {
  return (
    <EstimateCta location={location} className="w-full sm:w-auto">
      {P.ctaButton}
    </EstimateCta>
  );
}

export default function PersonalAiAgentPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-tint via-white to-white pb-12 pt-10 sm:pb-16 sm:pt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl gap-5 px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/services" className="inline-block py-2 text-sm font-semibold text-primary hover:text-primary/80">
              &larr; {LINE_PAGE.backLabel}
            </Link>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.06em] text-amber-900 ring-1 ring-amber-300">
              {P.draftBadge}
            </span>
          </div>
          <p className="eyebrow">{P.eyebrow}</p>
          <h1 className="max-w-4xl text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-[3.25rem]">
            {P.title}
          </h1>
          <p className="lede max-w-2xl">{P.lede}</p>
          <ul className="flex flex-wrap gap-2">
            {P.intro.map((line) => (
              <li
                key={line}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-semibold text-foreground ring-1 ring-tint-strong"
              >
                <Check className="size-4 shrink-0 text-brand" aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-1 grid gap-2.5">
            <div>
              <Cta location="service-personal-agent-hero" />
            </div>
            <p className="max-w-xl text-sm text-muted-foreground">{P.ctaSupport}</p>
          </div>
        </div>
      </section>

      <Section tint id="handles">
        <SectionHead eyebrow={P.handles.eyebrow} title={P.handles.title} lede={P.handles.lede} />
        <TeamGrid />
      </Section>

      <Section id="rules">
        <SectionHead eyebrow={P.gates.eyebrow} title={P.gates.title} lede={P.gates.lede} />
        <GateLanes />
      </Section>

      <Section tint id="stops">
        <SectionHead eyebrow={P.stops.eyebrow} title={P.stops.title} lede={P.stops.lede} />
        <StopTiles />
      </Section>

      <Section id="setup">
        <SectionHead eyebrow={P.steps.eyebrow} title={P.steps.title} />
        <SetupSteps />
      </Section>

      <Section tint id="difference">
        <SectionHead eyebrow={P.compare.eyebrow} title={P.compare.title} />
        <CompareTable />
      </Section>

      <Section id="loop">
        <SectionHead eyebrow={P.loop.eyebrow} title={P.loop.title} />
        <LearningLoop />
      </Section>

      <Section tint id="proof">
        <SectionHead eyebrow={P.proof.eyebrow} title={P.proof.title} />
        <figure className="mt-8 grid max-w-3xl grid-cols-[auto_1fr] gap-4 rounded-2xl border border-tint-strong bg-background p-6 sm:p-8">
          <Quote className="h-7 w-7 text-brand" aria-hidden="true" />
          <blockquote className="font-display text-lg font-bold leading-snug sm:text-xl">{P.proof.commander}</blockquote>
        </figure>
        <p className="lede mt-10 max-w-2xl">{P.proof.lede}</p>
        <RetroStats />
      </Section>

      <Section id="contact-cta">
        <div className="grid gap-10 rounded-2xl bg-ink p-6 text-white sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="grid content-start gap-4">
            <p className="text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#9cc4f0]">{P.startEyebrow}</p>
            <h2 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl">{P.startTitle}</h2>
            <div className="mt-2">
              <Cta location="service-personal-agent-footer" />
            </div>
          </div>
          <div className="grid content-start gap-5">
            <ol className="grid gap-3">
              {P.startPoints.map((point, i) => (
                <li key={point} className="grid grid-cols-[1.75rem_1fr] items-baseline gap-3">
                  <span className="font-display text-sm font-extrabold tabular-nums text-[#9cc4f0]">{i + 1}</span>
                  <span className="text-white/90">{point}</span>
                </li>
              ))}
            </ol>
            <p className="border-t border-white/15 pt-5 text-sm text-white/75 [&_a]:font-semibold [&_a]:text-white [&_a]:underline">
              <LinkedText text={P.assessmentNote} links={P.assessmentLinks} />
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
