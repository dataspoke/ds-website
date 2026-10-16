import type { Metadata } from "next";
import Link from "next/link";
import { EstimateJsonLd } from "@/components/shared/json-ld";
import { FaqList } from "@/components/shared/faq-list";
import { Section, SectionHead } from "@/components/shared/section";
import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { ESTIMATE_FAQS, FREE_ESTIMATE } from "@/content/free-estimate";
import { LINE_PAGE, SERVICE_LINES } from "@/content/services";
import { BOOKING_EMBED_URL, CONTACT_EMAIL } from "@/lib/constants";
import { generateMetadata as pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: FREE_ESTIMATE.metaTitle,
  description: FREE_ESTIMATE.metaDescription,
  path: FREE_ESTIMATE.path,
});

export default function FreeEstimatePage() {
  return (
    <>
      <EstimateJsonLd />
      <section className="pt-14 pb-10 sm:pt-20 sm:pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6">
          <div className="grid max-w-2xl gap-5">
            <p className="eyebrow">{FREE_ESTIMATE.eyebrow}</p>
            <h1 className="text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-[3.4rem]">
              {FREE_ESTIMATE.headline}
            </h1>
            <p className="lede">{FREE_ESTIMATE.lede}</p>
            <div className="mt-1">
              <EstimateCta location="estimate-hero">{FREE_ESTIMATE.cta}</EstimateCta>
            </div>
          </div>
        </div>
      </section>

      <Section tint>
        <SectionHead eyebrow={FREE_ESTIMATE.youGet.eyebrow} title={FREE_ESTIMATE.youGet.title} />
        <ul className="mt-8 grid max-w-2xl gap-4">
          {FREE_ESTIMATE.youGet.items.map((item) => (
            <SpokeBullet key={item} as="li" className="text-[1.05rem]">
              {item}
            </SpokeBullet>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead eyebrow={FREE_ESTIMATE.how.eyebrow} title={FREE_ESTIMATE.how.title} />
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {FREE_ESTIMATE.how.steps.map((step, i) => (
            <li key={step.title} className="relative grid content-start gap-3 pt-7">
              <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-brand" aria-hidden="true" />
              {i < FREE_ESTIMATE.how.steps.length - 1 && (
                <span
                  className="absolute left-4 top-[13px] hidden h-0.5 w-[calc(100%+2rem)] bg-tint-strong md:block"
                  aria-hidden="true"
                />
              )}
              <p className="text-sm font-semibold uppercase tracking-[0.06em] text-primary">{step.label}</p>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tint>
        <SectionHead
          eyebrow={FREE_ESTIMATE.services.eyebrow}
          title={FREE_ESTIMATE.services.title}
          lede={FREE_ESTIMATE.services.lede}
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_LINES.map((line) => (
            <li key={line.slug}>
              <Link
                href={`/services/${line.slug}`}
                className="group grid h-full content-start gap-2.5 rounded-xl border border-tint-strong bg-background p-6 transition-colors hover:border-brand"
              >
                <h3 className="text-xl font-bold">{line.title}</h3>
                <p className="text-[0.97rem] text-muted-foreground">{line.oneLiner}</p>
                <span className="mt-1 text-sm font-semibold text-primary group-hover:text-primary/80">
                  {LINE_PAGE.seeLine(line.title)} &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="book">
        <SectionHead
          eyebrow={FREE_ESTIMATE.booking.eyebrow}
          title={FREE_ESTIMATE.booking.title}
          lede={FREE_ESTIMATE.booking.lede}
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-background">
          <iframe
            src={BOOKING_EMBED_URL}
            title="Book a free 30-minute data and AI estimate"
            className="h-[720px] w-full"
            loading="lazy"
          />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <EstimateCta location="estimate-fallback" external>
            {FREE_ESTIMATE.booking.fallback}
          </EstimateCta>
          <span className="text-muted-foreground">
            or email <span className="font-semibold text-foreground select-all">{CONTACT_EMAIL}</span>
          </span>
        </div>
      </Section>

      <Section tint id="faq">
        <SectionHead eyebrow={FREE_ESTIMATE.faq.eyebrow} title={FREE_ESTIMATE.faq.title} />
        <FaqList faqs={ESTIMATE_FAQS} />
      </Section>
    </>
  );
}
