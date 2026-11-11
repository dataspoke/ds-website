import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarClock,
  ChevronDown,
  Database,
  FileCheck,
  FileSpreadsheet,
  GitCompareArrows,
  Inbox,
  Keyboard,
  Megaphone,
  Repeat,
  ShieldCheck,
  Smartphone,
  Split,
  Target,
  Truck,
  UserMinus,
  UserSearch,
  Users,
  VideoOff,
  type LucideIcon,
} from "lucide-react";
import { generateMetadata as pageMetadata } from "@/lib/metadata";
import { formatLongDate } from "@/lib/dates";
import { cn } from "@/lib/utils";
import {
  BreadcrumbJsonLd,
  FaqPageJsonLd,
  IndustryServiceJsonLd,
} from "@/components/shared/json-ld";
import { LinkedText } from "@/components/shared/faq-list";
import { Section, SectionHead } from "@/components/shared/section";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { Breadcrumbs } from "@/components/industries/breadcrumbs";
import {
  INDUSTRIES,
  INDUSTRIES_HUB,
  INDUSTRY_PAGE,
  INDUSTRY_SERVICE_TYPE,
  buildCardService,
  getIndustry,
  industryPath,
  type ProblemIcon,
} from "@/content/industries";

// Only the industries in src/content/industries.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

const ICONS: Record<ProblemIcon, LucideIcon> = {
  inbox: Inbox,
  keyboard: Keyboard,
  megaphone: Megaphone,
  "git-compare-arrows": GitCompareArrows,
  "video-off": VideoOff,
  "calendar-clock": CalendarClock,
  target: Target,
  "user-search": UserSearch,
  "file-spreadsheet": FileSpreadsheet,
  "user-minus": UserMinus,
  smartphone: Smartphone,
  split: Split,
  users: Users,
  truck: Truck,
  repeat: Repeat,
  "file-check": FileCheck,
  database: Database,
  "shield-check": ShieldCheck,
};

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return pageMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: industryPath(industry.slug),
  });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const path = industryPath(industry.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: INDUSTRIES_HUB.name, path: INDUSTRIES_HUB.path },
    { name: industry.name, path },
  ];
  const cards = industry.build.cards.map((card) => ({ ...card, service: buildCardService(card) }));
  // Two build cards can point at the same service; list each service once in the offer catalog.
  const offers = [...new Map(cards.map((c) => [c.service.href, { name: c.service.title, path: c.service.href }])).values()];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <IndustryServiceJsonLd
        name={industry.serviceName}
        description={industry.definition}
        path={path}
        serviceType={INDUSTRY_SERVICE_TYPE}
        audience={industry.audienceType}
        offers={offers}
      />
      <FaqPageJsonLd path={path} faqs={industry.faqs} />

      <Section tight>
        <Breadcrumbs items={crumbs} />
        <div className="mt-4 grid max-w-3xl gap-3.5">
          <p className="eyebrow">{INDUSTRY_PAGE.eyebrow}</p>
          <h1 className="text-3xl font-bold leading-[1.15] sm:text-4xl">{industry.h1}</h1>
          <p className="lede">{industry.definition}</p>
          <p className="text-sm text-muted-foreground">
            {INDUSTRY_PAGE.lastUpdated}{" "}
            <time dateTime={industry.lastUpdated}>{formatLongDate(industry.lastUpdated)}</time>
          </p>
        </div>
      </Section>

      <Section tint>
        <SectionHead title={industry.problems.title} lede={industry.problems.intro} />
        <ul className="mt-8 grid max-w-3xl gap-3">
          {industry.problems.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li
                key={item.text}
                className="flex items-center gap-4 rounded-xl border border-tint-strong bg-background px-4 py-3 font-semibold"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-tint text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                {item.text}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section>
        <SectionHead title={industry.build.title} lede={industry.build.intro} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.service.href}
              className="grid content-start gap-2.5 rounded-xl border border-tint-strong bg-background p-6 transition-colors hover:border-brand"
            >
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="text-[0.97rem] text-muted-foreground">{card.body}</p>
              <p className="font-semibold text-primary">
                {INDUSTRY_PAGE.seeService}
                <span className="sr-only">: {card.service.title}</span> &rarr;
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <SectionHead title={industry.systems.title} lede={industry.systems.intro} />
        {industry.systems.commonLabel ? (
          <>
            <SystemChips names={industry.systems.primary} primary className="mt-8" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              {industry.systems.commonLabel}
            </p>
            <SystemChips names={industry.systems.common} className="mt-3" />
          </>
        ) : (
          <SystemChips names={industry.systems.primary} more={industry.systems.common} primary className="mt-8" />
        )}
        <p className="mt-6 max-w-2xl text-muted-foreground">{industry.systems.close}</p>
      </Section>

      <Section tint>
        <SectionHead title={industry.stats.title} lede={industry.stats.intro} />
        <div
          className={cn("mt-10 grid gap-4", industry.stats.tiles.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}
        >
          {industry.stats.tiles.map((tile) => (
            <div key={tile.figure} className="grid content-start rounded-xl border border-tint-strong bg-background p-6">
              <p className="font-display text-4xl font-extrabold tracking-tight text-primary">{tile.figure}</p>
              <p className="mt-3 font-semibold leading-snug">{tile.label}</p>
              <p className="mt-3 border-t border-border pt-2.5 text-xs leading-relaxed text-muted-foreground">
                {tile.source}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl">{industry.stats.close}</p>
        {industry.outcomes && (
          <div className="mt-8 max-w-3xl">
            <p className="font-bold">{industry.outcomes.heading}</p>
            <ul className="mt-3 grid gap-2">
              {industry.outcomes.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2.5 size-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <Section id="how-it-works">
        <SectionHead title={industry.steps.title} lede={industry.steps.intro} />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {industry.steps.items.map((step, i) => (
            <li key={step.title} className="relative grid content-start gap-3 pt-7">
              <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-brand" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase tracking-[0.06em] text-primary">
                {INDUSTRY_PAGE.stepLabel(i + 1)}
              </p>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-2xl text-muted-foreground">
          <LinkedText text={industry.steps.close} links={industry.steps.closeLinks} />
        </p>
        <Link
          href={industry.steps.approachLink.href}
          className="mt-4 inline-block py-2 font-semibold text-primary hover:text-primary/80"
        >
          {industry.steps.approachLink.label} &rarr;
        </Link>
      </Section>

      <Section id="faq" className="pt-0 sm:pt-0">
        <SectionHead title={industry.faqTitle} />
        <div className="mt-8 grid max-w-3xl gap-3">
          {industry.faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-tint-strong bg-white open:shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  className="size-5 shrink-0 text-brand transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-5 pb-5 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section tint id="contact-cta">
        <div className="grid max-w-2xl gap-4">
          <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl">{industry.cta.title}</h2>
          <p className="lede">{industry.cta.text}</p>
          <div className="mt-1">
            <EstimateCta location={`industry-${industry.slug}`}>{industry.cta.button}</EstimateCta>
          </div>
        </div>
      </Section>
    </>
  );
}

/** System names as chips. `primary` names are highlighted; `more` follow them unhighlighted in the same row. */
function SystemChips({
  names,
  more = [],
  primary,
  className,
}: {
  names: string[];
  more?: string[];
  primary?: boolean;
  className?: string;
}) {
  const chips = [...names.map((name) => ({ name, on: !!primary })), ...more.map((name) => ({ name, on: false }))];
  if (chips.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {chips.map((chip) => (
        <li
          key={chip.name}
          className={cn(
            "rounded-full border px-3.5 py-1 text-sm",
            chip.on ? "border-brand bg-tint font-semibold text-primary" : "border-border bg-background font-medium"
          )}
        >
          {chip.name}
        </li>
      ))}
    </ul>
  );
}
