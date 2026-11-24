import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDown,
  BookOpen,
  Check,
  ClipboardList,
  FileText,
  FolderLock,
  KeyRound,
  Library,
  Lock,
  RefreshCw,
  ShieldCheck,
  UserCheck,
  X,
} from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/shared/json-ld";
import { LinkedText } from "@/components/shared/faq-list";
import { Section, SectionHead } from "@/components/shared/section";
import { generateMetadata } from "@/lib/metadata";
import { formatLongDate } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { COMPANY_BRAIN as P } from "@/content/company-brain";

export const metadata: Metadata = generateMetadata({
  title: P.metaTitle,
  description: P.metaDescription,
  path: P.path,
  article: {
    publishedTime: P.date,
    modifiedTime: P.date,
    authors: [P.author],
  },
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
  { name: P.title, path: P.path },
];

const PIECE_ICONS = [BookOpen, FileText, Library, ClipboardList];
const GATE_ICONS = [Lock, KeyRound, ShieldCheck, UserCheck];

function CardIcon({ Icon }: { Icon: typeof Lock }) {
  return (
    <span
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
      aria-hidden="true"
    >
      <Icon className="h-5 w-5" />
    </span>
  );
}

export default function CompanyBrainPost() {
  return (
    <>
      <BreadcrumbJsonLd items={CRUMBS} />
      <ArticleJsonLd
        headline={P.title}
        description={P.metaDescription}
        path={P.path}
        datePublished={P.date}
        dateModified={P.date}
        authorName={P.author}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-tint via-white to-white pb-12 pt-8 sm:pb-16 sm:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Link href="/insights" className="inline-block py-2 text-sm font-semibold text-primary hover:text-primary/80">
            &larr; Insights
          </Link>
          <div className="mt-4 grid items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
            <div className="grid gap-5">
              <p className="eyebrow">{P.eyebrow}</p>
              <h1 className="text-[2.2rem] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-5xl">{P.title}</h1>
              <p className="lede max-w-xl">{P.lede}</p>
              <p className="text-sm text-muted-foreground">
                <Link href="/about" className="font-semibold text-foreground hover:text-primary">
                  {P.author}
                </Link>
                {" · "}
                <time dateTime={P.date}>{formatLongDate(P.date)}</time>
                {" · "}
                <span>{P.readingTime}</span>
              </p>
            </div>
            <aside
              aria-labelledby="tldr"
              className="rounded-2xl border border-tint-strong bg-background p-6 shadow-[0_1px_2px_rgba(15,30,51,0.04)] sm:p-7"
            >
              <h2 id="tldr" className="eyebrow">
                {P.tldrLabel}
              </h2>
              <ul className="mt-4 grid gap-3">
                {P.tldr.map((line) => (
                  <li key={line} className="grid grid-cols-[1.25rem_1fr] gap-3 text-foreground/90">
                    <Check className="mt-1 size-4 text-brand" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <Section tint id="compare">
        <SectionHead eyebrow={P.compareEyebrow} title={P.compareTitle} />
        {/* Wide screens: a table. Phones: stacked cards with the same content. */}
        <div className="mt-10 hidden overflow-hidden rounded-xl border border-tint-strong bg-background md:block">
          <table className="w-full text-left">
            <caption className="sr-only">{P.compareTitle}</caption>
            <thead>
              <tr className="border-b border-tint-strong bg-tint/60 text-sm">
                <th scope="col" className="w-1/5 px-5 py-3 font-semibold text-muted-foreground">
                  <span className="sr-only">Topic</span>
                </th>
                <th scope="col" className="px-5 py-3 font-semibold text-muted-foreground">
                  {P.compareHead[0]}
                </th>
                <th scope="col" className="px-5 py-3 font-semibold text-primary">
                  {P.compareHead[1]}
                </th>
              </tr>
            </thead>
            <tbody>
              {P.compare.map((row) => (
                <tr key={row.topic} className="border-b border-tint-strong last:border-0">
                  <th scope="row" className="px-5 py-4 align-top font-display font-bold">
                    {row.topic}
                  </th>
                  <td className="px-5 py-4 align-top text-muted-foreground">
                    <span className="inline-flex gap-2">
                      <X className="mt-1 size-4 shrink-0 text-muted-foreground/70" aria-hidden="true" />
                      {row.wired}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-top font-medium">
                    <span className="inline-flex gap-2">
                      <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
                      {row.run}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-8 grid gap-3 md:hidden">
          {P.compare.map((row) => (
            <li key={row.topic} className="rounded-xl border border-tint-strong bg-background p-4">
              <h3 className="font-display font-bold">{row.topic}</h3>
              <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
                <X className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  <span className="sr-only">{P.compareHead[0]}: </span>
                  {row.wired}
                </span>
              </p>
              <p className="mt-1.5 flex gap-2 text-sm font-medium">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                <span>
                  <span className="sr-only">{P.compareHead[1]}: </span>
                  {row.run}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Layers */}
      <Section id="layers">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
          <SectionHead eyebrow={P.layersEyebrow} title={P.layersTitle} lede={P.layersLede} />
          <ol className="grid gap-1.5" aria-label="Layers of a company brain, top to bottom">
            {P.layers.map((layer, i) => {
              const depth = P.layers.length - 1 - i;
              return (
                <li key={layer.name} className="grid justify-items-center gap-1.5">
                  <div
                    className={cn(
                      "flex w-full flex-col gap-0.5 rounded-xl px-5 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4",
                      i === 0 ? "bg-primary text-primary-foreground" : "border border-tint-strong bg-tint"
                    )}
                    style={{ maxWidth: `${76 + depth * 6}%` }}
                  >
                    <span className="font-display font-bold">{layer.name}</span>
                    <span className={cn("text-sm", i === 0 ? "text-primary-foreground/85" : "text-muted-foreground")}>
                      {layer.note}
                    </span>
                  </div>
                  {i < P.layers.length - 1 && <ArrowDown className="size-4 rotate-180 text-brand" aria-hidden="true" />}
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      {/* Four pieces */}
      <Section tint id="pieces">
        <SectionHead eyebrow={P.piecesEyebrow} title={P.piecesTitle} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {P.pieces.map((piece, i) => (
            <li key={piece.title} className="grid content-start gap-3 rounded-xl border border-tint-strong bg-background p-5">
              <CardIcon Icon={PIECE_ICONS[i]} />
              <h3 className="text-lg font-bold leading-snug">{piece.title}</h3>
              <p className="text-[0.95rem] text-muted-foreground">{piece.body}</p>
              {piece.quote && (
                <figure className="border-l-2 border-brand pl-3 text-sm text-foreground/85">
                  <figcaption className="text-xs font-semibold text-muted-foreground">{piece.quoteLead}</figcaption>
                  <blockquote className="italic">&ldquo;{piece.quote}&rdquo;</blockquote>
                </figure>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {/* Loop */}
      <Section id="loop">
        <SectionHead eyebrow={P.loopEyebrow} title={P.loopTitle} />
        <div className="mt-10 rounded-2xl border border-tint-strong bg-tint p-6 sm:p-8">
          <ol className="grid gap-3 md:grid-cols-4 md:gap-0">
            {P.loop.map((step, i) => {
              const last = i === P.loop.length - 1;
              return (
                <li key={step.title} className="relative flex items-start gap-4 md:flex-col md:items-center md:px-3 md:text-center">
                  {!last && (
                    <span
                      className="absolute left-6 top-12 h-[calc(100%-1.5rem)] w-0.5 bg-tint-strong md:left-[calc(50%+2rem)] md:top-6 md:h-0.5 md:w-[calc(100%-4rem)]"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-background font-display font-extrabold text-primary ring-2 ring-tint-strong"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="grid gap-1 pb-3 md:pb-0">
                    <span className="font-display text-lg font-bold leading-snug">{step.title}</span>
                    <span className="text-sm text-muted-foreground">{step.note}</span>
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 flex items-center justify-center gap-2 border-t border-tint-strong pt-5 text-sm font-semibold text-primary">
            <RefreshCw className="size-4 shrink-0" aria-hidden="true" />
            Then back to step 1, with a better setup.
          </p>
        </div>
        <h3 className="mt-8 font-display text-lg font-bold">Checks that catch drift</h3>
        <ul className="mt-3 grid gap-3 md:grid-cols-3">
          {P.loopChecks.map((c) => (
            <li key={c} className="flex gap-3 rounded-xl border border-tint-strong bg-background p-4 text-sm text-foreground/85">
              <FolderLock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      </Section>

      {/* Permissions */}
      <Section tint id="permissions">
        <SectionHead eyebrow={P.gatesEyebrow} title={P.gatesTitle} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {P.gates.map((g, i) => (
            <li key={g.title} className="flex gap-4 rounded-xl border border-tint-strong bg-background p-5 lg:flex-col">
              <CardIcon Icon={GATE_ICONS[i]} />
              <div className="grid gap-1">
                <h3 className="font-bold leading-snug">{g.title}</h3>
                <p className="text-sm text-muted-foreground">{g.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Failure modes */}
      <Section id="failure-modes">
        <SectionHead eyebrow={P.failEyebrow} title={P.failTitle} />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {P.fails.map((f) => (
            <li key={f.title} className="grid content-start gap-2 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
              <AlertTriangle className="size-5 text-amber-700" aria-hidden="true" />
              <h3 className="font-bold leading-snug">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Where to start */}
      <Section tint id="start">
        <SectionHead eyebrow={P.startEyebrow} title={P.startTitle} />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {P.start.map((s, i) => (
            <li key={s.title} className="grid content-start gap-3 rounded-xl border border-tint-strong bg-background p-5">
              <span
                className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display font-extrabold text-primary-foreground"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
              <p className="text-[0.95rem] text-muted-foreground">{s.note}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 rounded-xl border border-tint-strong bg-background px-5 py-4 text-foreground/85 [&_a]:font-semibold [&_a]:text-primary hover:[&_a]:text-primary/80">
          <LinkedText text={P.serviceText} links={P.serviceLinks} />
        </p>
      </Section>
    </>
  );
}
