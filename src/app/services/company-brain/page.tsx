import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  BookOpen,
  Check,
  ClipboardList,
  Database,
  Gavel,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  X,
} from "lucide-react";
import { generateMetadata } from "@/lib/metadata";
import { ServicePageJsonLd } from "@/components/shared/json-ld";
import { cn } from "@/lib/utils";
import { LinkedText } from "@/components/shared/faq-list";
import { Section, SectionHead } from "@/components/shared/section";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { BRAIN_PAGE as P } from "@/content/company-brain-service";
import { LINE_PAGE } from "@/content/services";

export const metadata: Metadata = generateMetadata({
  title: P.metaTitle,
  description: P.metaDescription,
  path: P.path,
});

const INSIDE_ICONS = [BookOpen, ClipboardList, Gavel, Database];
const KEEP_ICONS = [ShieldCheck, RefreshCw, KeyRound];

function Cta({ location }: { location: string }) {
  return (
    <EstimateCta location={location} className="w-full sm:w-auto">
      {P.ctaButton}
    </EstimateCta>
  );
}

function CardIcon({ Icon }: { Icon: typeof Check }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
      <Icon className="h-5 w-5" />
    </span>
  );
}

/** Hero visual: the layers of a company brain, widest at the foundation. */
function BrainStack() {
  const last = P.stack.length - 1;
  return (
    <ol className="grid gap-1.5" aria-label={P.stackLabel}>
      {P.stack.map((layer, i) => (
        <li key={layer.name} className="grid justify-items-center gap-1.5">
          <div
            className={cn(
              "flex w-full flex-col gap-0.5 rounded-xl px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:px-5",
              i === 0 && "bg-primary text-primary-foreground",
              i === last && "bg-ink text-white",
              i !== 0 && i !== last && "border border-tint-strong bg-white"
            )}
            style={{ maxWidth: `${76 + i * 6}%` }}
          >
            <span className="font-display font-bold">{layer.name}</span>
            <span className={cn("text-sm", i === 0 || i === last ? "text-white/80" : "text-muted-foreground")}>
              {layer.note}
            </span>
          </div>
          {i < last && <ArrowUp className="size-4 text-brand" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

export default function CompanyBrainServicePage() {
  return (
    <>
      <ServicePageJsonLd name={P.card.title} description={P.metaDescription} path={P.path} />
      <section className="relative overflow-hidden bg-gradient-to-b from-tint via-white to-white pb-12 pt-10 sm:pb-16 sm:pt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Link href="/services" className="inline-block py-2 text-sm font-semibold text-primary hover:text-primary/80">
            &larr; {LINE_PAGE.backLabel}
          </Link>
          <div className="mt-4 grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
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
                  <Cta location="service-company-brain-hero" />
                </div>
                <p className="max-w-xl text-sm text-muted-foreground">{P.ctaSupport}</p>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-[560px]">
              <BrainStack />
            </figure>
          </div>
        </div>
      </section>

      <Section tint id="inside">
        <SectionHead eyebrow={P.insideEyebrow} title={P.insideTitle} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {P.inside.map((item, i) => (
            <li key={item.title} className="grid content-start gap-3 rounded-xl border border-tint-strong bg-background p-5">
              <CardIcon Icon={INSIDE_ICONS[i] ?? BookOpen} />
              <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
              <p className="text-[0.95rem] text-muted-foreground">{item.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="compare">
        <SectionHead eyebrow={P.compareEyebrow} title={P.compareTitle} lede={P.compareLede} />
        {/* Wide screens: a table. Phones: one card per question. */}
        <div className="mt-10 hidden overflow-hidden rounded-xl border border-tint-strong bg-background md:block">
          <table className="w-full text-left">
            <caption className="sr-only">{P.compareTitle}</caption>
            <thead>
              <tr className="border-b border-tint-strong">
                <th scope="col" className="p-5">
                  <span className="sr-only">Question</span>
                </th>
                <th scope="col" className="p-5 font-display text-lg font-bold text-muted-foreground">{P.compareCols.wired}</th>
                <th scope="col" className="bg-primary p-5 font-display text-lg font-bold text-primary-foreground">{P.compareCols.ours}</th>
              </tr>
            </thead>
            <tbody>
              {P.compareRows.map((r) => (
                <tr key={r.topic} className="border-b border-tint-strong last:border-0">
                  <th scope="row" className="p-5 align-top font-semibold">{r.topic}</th>
                  <td className="p-5 align-top text-muted-foreground">
                    <span className="inline-flex gap-2">
                      <X className="mt-1 size-4 shrink-0 text-muted-foreground/70" aria-hidden="true" />
                      {r.wired}
                    </span>
                  </td>
                  <td className="bg-tint/60 p-5 align-top font-semibold">
                    <span className="inline-flex gap-2">
                      <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
                      {r.ours}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-8 grid gap-3 md:hidden">
          {P.compareRows.map((r) => (
            <li key={r.topic} className="rounded-xl border border-tint-strong bg-background p-4">
              <h3 className="font-bold">{r.topic}</h3>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-tint p-3">
                  <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">{P.compareCols.wired}</dt>
                  <dd className="mt-1">{r.wired}</dd>
                </div>
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <dt className="text-xs font-semibold uppercase tracking-[0.06em] opacity-85">{P.compareCols.ours}</dt>
                  <dd className="mt-1 font-semibold">{r.ours}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </Section>

      <Section tint id="keep">
        <SectionHead eyebrow={P.keepEyebrow} title={P.keepTitle} lede={P.keepLede} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {P.keep.map((k, i) => (
            <li key={k.title} className="grid content-start gap-3 rounded-xl border border-tint-strong bg-background p-6">
              <CardIcon Icon={KEEP_ICONS[i] ?? ShieldCheck} />
              <h3 className="font-display text-xl font-bold">{k.title}</h3>
              <p className="text-[0.95rem] text-muted-foreground">{k.note}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-4 rounded-xl bg-ink p-5 text-white sm:p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="grid gap-2">
            <p className="text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#9cc4f0]">{P.foundationEyebrow}</p>
            <p className="font-display text-xl font-bold leading-snug sm:text-2xl">{P.foundationTitle}</p>
            <p className="max-w-3xl text-white/80 [&_a]:font-semibold [&_a]:text-white [&_a]:underline">
              <LinkedText text={P.foundationText} links={P.foundationLinks} />
            </p>
          </div>
          <Database className="hidden size-14 text-[#9cc4f0] md:block" aria-hidden="true" />
        </div>
      </Section>

      <Section id="setup">
        <SectionHead eyebrow={P.stepsEyebrow} title={P.stepsTitle} />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {P.steps.map((s, i) => (
            <li key={s.title} className="relative grid content-start gap-3 rounded-xl border border-tint-strong bg-background p-5">
              <span
                className="grid h-10 w-10 place-items-center rounded-full bg-tint font-display font-extrabold text-primary ring-2 ring-tint-strong"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
              <p className="text-[0.95rem] text-muted-foreground">{s.note}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 flex flex-wrap items-center gap-2 rounded-xl border border-tint-strong bg-tint px-5 py-4 text-foreground/85 [&_a]:font-semibold [&_a]:text-primary hover:[&_a]:text-primary/80">
          <ArrowRight className="size-4 shrink-0 text-brand" aria-hidden="true" />
          <span>
            <LinkedText text={P.readMoreText} links={P.readMoreLinks} />
          </span>
        </p>
      </Section>

      <Section tint id="contact-cta">
        <div className="grid gap-10 rounded-2xl bg-ink p-6 text-white sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="grid content-start gap-4">
            <p className="text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#9cc4f0]">{P.startEyebrow}</p>
            <h2 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl">{P.startTitle}</h2>
            <div className="mt-2">
              <Cta location="service-company-brain-footer" />
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
