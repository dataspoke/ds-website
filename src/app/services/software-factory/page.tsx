import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Check, CheckCircle2, CircleStop, Flame, GitFork, KeyRound, ShieldCheck, Wrench } from "lucide-react";
import { generateMetadata } from "@/lib/metadata";
import { LinkedText } from "@/components/shared/faq-list";
import { Section, SectionHead } from "@/components/shared/section";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { FlowArrow, LineDiagram, LineLegend, LineTimeline } from "@/components/software-factory/factory-visuals";
import { FACTORY_PAGE as P } from "@/content/software-factory";
import { LINE_PAGE } from "@/content/services";

// DRAFT page. Kept out of search (noIndex) and out of the nav, /services,
// the home page, sitemap.ts and llms.txt until Nick approves publishing.
export const metadata: Metadata = generateMetadata({
  title: P.metaTitle,
  description: P.metaDescription,
  path: P.path,
  noIndex: true,
});

const STOP_ICONS = [CircleStop, GitFork, KeyRound, CheckCircle2];

function Cta({ location }: { location: string }) {
  return (
    <EstimateCta location={location} className="w-full sm:w-auto">
      {P.ctaButton}
    </EstimateCta>
  );
}

export default function SoftwareFactoryPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-tint via-white to-white pb-12 pt-10 sm:pb-16 sm:pt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/services" className="inline-block py-2 text-sm font-semibold text-primary hover:text-primary/80">
              &larr; {LINE_PAGE.backLabel}
            </Link>
            <p className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-amber-900 ring-1 ring-amber-300">
              {P.draftBadge}
            </p>
          </div>
          <div className="mt-4 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            <div className="grid gap-5">
              <p className="eyebrow">{P.eyebrow}</p>
              <h1 className="text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-[3.25rem]">
                {P.title}
              </h1>
              <p className="lede max-w-xl">{P.lede}</p>
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
                  <Cta location="service-software-factory-hero" />
                </div>
                <p className="max-w-xl text-sm text-muted-foreground">{P.ctaSupport}</p>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-[640px]">
              <LineDiagram stations={P.stations} label={P.heroDiagramLabel} endLabel={P.lineEndLabel} loopLabel={P.lineLoopLabel} />
            </figure>
          </div>
        </div>
      </section>

      <Section tint id="compare">
        <SectionHead eyebrow={P.compareEyebrow} title={P.compareTitle} lede={P.compareLede} />
        {/* Wide screens: a real table. */}
        <div className="mt-10 hidden overflow-hidden rounded-xl border border-tint-strong bg-background md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-tint-strong">
              <th scope="col" className="p-5"><span className="sr-only">Question</span></th>
              <th scope="col" className="p-5 font-display text-lg font-bold text-muted-foreground">{P.compareCols.dark}</th>
              <th scope="col" className="bg-primary p-5 font-display text-lg font-bold text-primary-foreground">{P.compareCols.ours}</th>
            </tr>
          </thead>
          <tbody>
            {P.compareRows.map((r) => (
              <tr key={r.topic} className="border-b border-tint-strong last:border-0">
                <th scope="row" className="p-5 font-semibold">{r.topic}</th>
                <td className="p-5 text-muted-foreground">{r.dark}</td>
                <td className="bg-tint/60 p-5 font-semibold">{r.ours}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {/* Phones: one card per question. */}
        <ul className="mt-8 grid gap-3 md:hidden">
          {P.compareRows.map((r) => (
            <li key={r.topic} className="rounded-xl border border-tint-strong bg-background p-4">
              <h3 className="font-bold">{r.topic}</h3>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-tint p-3">
                  <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">{P.compareCols.dark}</dt>
                  <dd className="mt-1">{r.dark}</dd>
                </div>
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <dt className="text-xs font-semibold uppercase tracking-[0.06em] opacity-85">{P.compareCols.ours}</dt>
                  <dd className="mt-1 font-semibold">{r.ours}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-muted-foreground">{P.compareNote}</p>
      </Section>

      <Section id="line">
        <SectionHead eyebrow={P.lineEyebrow} title={P.lineTitle} />
        <div className="mt-6">
          <LineLegend station={P.lineLegendStation} gate={P.lineLegendGate} />
        </div>
        <LineTimeline stations={P.stations} station={P.lineLegendStation} gate={P.lineLegendGate} />
      </Section>

      <Section tint id="stops">
        <SectionHead eyebrow={P.stopsEyebrow} title={P.stopsTitle} />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {P.stops.map((s, i) => {
            const Icon = STOP_ICONS[i] ?? CircleStop;
            return (
              <li key={s.title} className="grid content-start gap-3 rounded-xl border border-tint-strong bg-background p-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
                <p className="text-[0.95rem] text-muted-foreground">{s.note}</p>
              </li>
            );
          })}
        </ol>
        <div className="mt-6 rounded-xl bg-ink p-5 text-white sm:p-6">
          <p className="font-display text-xl font-bold leading-snug sm:text-2xl">{P.stopsRule}</p>
          <p className="mt-2 text-white/80">{P.stopsRuleNote}</p>
        </div>
      </Section>

      <Section id="bottleneck">
        <SectionHead eyebrow={P.bottleneckEyebrow} title={P.bottleneckTitle} lede={P.bottleneckLede} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {P.bottlenecks.map((b) => (
            <li key={b.title} className="grid content-start overflow-hidden rounded-xl border border-tint-strong bg-background">
              <h3 className="border-b border-tint-strong bg-gradient-to-r from-tint to-background px-5 py-4 text-lg font-bold">{b.title}</h3>
              <div className="grid gap-3 p-5">
                <p className="flex items-start gap-2.5 text-[0.95rem]">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                  <span><span className="sr-only">{P.bottleneckSrJam}</span>{b.jam}</span>
                </p>
                <p className="flex items-start gap-2.5 text-[0.95rem] text-muted-foreground">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span><span className="sr-only">{P.bottleneckSrFix}</span>{b.fix}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tint id="incidents">
        <SectionHead eyebrow={P.incidentsEyebrow} title={P.incidentsTitle} lede={P.incidentsLede} />
        <ol className="mt-10 grid gap-4">
          {P.incidents.map((x) => (
            <li key={x.rule} className="grid items-stretch gap-2 md:grid-cols-[1fr_2.5rem_1fr] md:gap-0">
              <div className="flex items-start gap-3 rounded-xl border border-tint-strong bg-background p-5">
                <Flame className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                <p><span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{P.incidentBeforeLabel}</span>{x.incident}</p>
              </div>
              <FlowArrow />
              <div className="flex items-start gap-3 rounded-xl border border-primary/30 bg-background p-5">
                <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="font-semibold"><span className="block text-xs font-semibold uppercase tracking-[0.08em] text-primary">{P.incidentAfterLabel}</span>{x.rule}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="ratchet">
        <SectionHead eyebrow={P.ratchetEyebrow} title={P.ratchetTitle} />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_17rem] lg:items-start">
          <ol className="grid gap-3 sm:grid-cols-2">
            {P.ratchetSteps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.25rem_1fr] gap-3 rounded-xl border border-tint-strong bg-background p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-tint font-display text-sm font-extrabold text-primary" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold leading-snug">{s.title}</h3>
                  <p className="mt-1 text-[0.95rem] text-muted-foreground">{s.note}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="rounded-xl bg-ink p-6 text-white">
            <p className="font-display text-5xl font-extrabold tabular-nums">{P.ratchetStat.value}</p>
            <p className="mt-2 text-sm text-white/80">{P.ratchetStat.label}</p>
          </div>
        </div>
      </Section>

      <Section tint id="loops">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="grid gap-3.5">
            <p className="eyebrow">{P.loopEyebrow}</p>
            <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl">{P.loopTitle}</h2>
            <p className="font-display text-2xl font-bold text-primary">{P.loopQuote}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {P.loopParts.map((s) => (
              <li key={s.title} className="rounded-xl border border-tint-strong bg-background p-5">
                <h3 className="font-bold leading-snug">{s.title}</h3>
                <p className="mt-1 text-[0.95rem] text-muted-foreground">{s.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="retro">
        <SectionHead eyebrow={P.retroEyebrow} title={P.retroTitle} lede={P.retroLede} />
        <dl className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {P.retroStats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-1 rounded-xl border border-tint-strong bg-tint p-5">
              <dt className="text-sm font-semibold text-muted-foreground">{s.label}</dt>
              <dd className="font-display text-4xl font-extrabold tabular-nums text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-2xl text-muted-foreground">{P.retroNote}</p>
      </Section>

      <Section tint id="contact-cta">
        <div className="grid gap-10 rounded-2xl bg-ink p-6 text-white sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="grid content-start gap-4">
            <p className="text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#9cc4f0]">{P.startEyebrow}</p>
            <h2 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl">{P.startTitle}</h2>
            <div className="mt-2">
              <Cta location="service-software-factory-footer" />
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
