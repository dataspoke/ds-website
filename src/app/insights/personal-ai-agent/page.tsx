import type { Metadata } from "next";
import Link from "next/link";
import { Quote } from "lucide-react";
import { generateMetadata } from "@/lib/metadata";
import { Section, SectionHead } from "@/components/shared/section";
import {
  CompareTable,
  GateLanes,
  LearningLoop,
  RetroStats,
  StopTiles,
  TeamGrid,
} from "@/components/insights/personal-agent-visuals";
import { AGENT_POST as P } from "@/content/personal-ai-agent";

// DRAFT. noIndex keeps it out of search, even on the Vercel preview. It is not
// linked from the nav, /insights, the home page, sitemap.ts or llms.txt. Remove
// noIndex and the draft badge when Nick approves publishing.
export const metadata: Metadata = generateMetadata({
  title: P.metaTitle,
  description: P.metaDescription,
  path: P.path,
  noIndex: true,
});

export default function PersonalAiAgentPost() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-tint via-white to-white pb-12 pt-10 sm:pb-16 sm:pt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl gap-5 px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/insights" className="inline-block py-2 text-sm font-semibold text-primary hover:text-primary/80">
              &larr; Insights
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
          <p className="text-sm text-muted-foreground">
            <Link href="/about" className="font-semibold text-foreground hover:text-primary">
              {P.author}
            </Link>
            {" · "}
            {P.dateLabel}
          </p>
          <figure className="mt-4 grid max-w-3xl grid-cols-[auto_1fr] gap-4 rounded-2xl bg-ink p-6 text-white sm:p-8">
            <Quote className="h-7 w-7 text-[#9cc4f0]" aria-hidden="true" />
            <div className="grid gap-2">
              <figcaption className="text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#9cc4f0]">
                {P.commander.label}
              </figcaption>
              <blockquote className="font-display text-lg font-bold leading-snug text-white sm:text-xl">
                {P.commander.text}
              </blockquote>
            </div>
          </figure>
        </div>
      </section>

      <Section tint id="team">
        <SectionHead eyebrow={P.team.eyebrow} title={P.team.title} lede={P.team.lede} />
        <TeamGrid />
      </Section>

      <Section id="gates">
        <SectionHead eyebrow={P.gates.eyebrow} title={P.gates.title} lede={P.gates.lede} />
        <GateLanes />
      </Section>

      <Section tint id="stops">
        <SectionHead eyebrow={P.stops.eyebrow} title={P.stops.title} lede={P.stops.lede} />
        <StopTiles />
      </Section>

      <Section id="rules">
        <SectionHead eyebrow={P.compare.eyebrow} title={P.compare.title} />
        <CompareTable />
      </Section>

      <Section tint id="loop">
        <SectionHead eyebrow={P.loop.eyebrow} title={P.loop.title} />
        <LearningLoop />
      </Section>

      <Section id="retro">
        <SectionHead eyebrow={P.retro.eyebrow} title={P.retro.title} lede={P.retro.lede} />
        <RetroStats />
      </Section>

      <Section tint id="start">
        <SectionHead eyebrow={P.start.eyebrow} title={P.start.title} />
        <ol className="mt-10 grid max-w-3xl gap-3">
          {P.start.items.map((item, i) => (
            <li
              key={item}
              className="grid grid-cols-[2.25rem_1fr] items-center gap-3 rounded-xl border border-tint-strong bg-background px-4 py-3.5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground">
                {i + 1}
              </span>
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
