import type { Metadata } from "next";
import Link from "next/link";
import { Check, ClipboardList, Fuel, HardHat, Hotel, Landmark, Lock, UserCheck } from "lucide-react";
import { generateMetadata } from "@/lib/metadata";
import { LinkedText } from "@/components/shared/faq-list";
import { Section, SectionHead } from "@/components/shared/section";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { HeroIllustration } from "@/components/home-a/illustrations";
import { ApprovalFlow, JourneyPath, JourneyTimeline } from "@/components/services/claude-journey";
import { CLAUDE_PAGE as P, CLAUDE_VISUALS as V } from "@/content/claude-services";
import { LINE_PAGE } from "@/content/services";

export const metadata: Metadata = generateMetadata({
  title: P.metaTitle,
  description: P.metaDescription,
  path: P.path,
});

const GUARDRAIL_ICONS = [Lock, UserCheck, ClipboardList];
/** One icon per proof item, in the order of P.proof. */
const PROOF_ICONS = [HardHat, Fuel, Hotel, Landmark];

function Cta({ location }: { location: string }) {
  return (
    <EstimateCta location={location} className="w-full sm:w-auto">
      {P.ctaButton}
    </EstimateCta>
  );
}

export default function ClaudeServicePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-tint via-white to-white pb-12 pt-10 sm:pb-16 sm:pt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Link href="/services" className="inline-block py-2 text-sm font-semibold text-primary hover:text-primary/80">
            &larr; {LINE_PAGE.backLabel}
          </Link>
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
                  <Cta location="service-claude-hero" />
                </div>
                <p className="max-w-xl text-sm text-muted-foreground">{P.ctaSupport}</p>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-[640px]">
              <HeroIllustration spokes={V.hubSpokes} hubLabel={V.hub} hubGlyph="sparkle" ariaLabel={V.hubAriaLabel} />
            </figure>
          </div>
          <JourneyPath
            steps={P.journey}
            label={P.pathLabel}
            className="mt-10 rounded-2xl border border-tint-strong bg-background p-6 shadow-[0_1px_2px_rgba(15,30,51,0.04)] sm:p-8"
          />
        </div>
      </section>

      <Section tint id="journey">
        <SectionHead eyebrow={P.journeyEyebrow} title={P.journeyTitle} lede={P.journeyLede} />
        <JourneyTimeline steps={P.journey} />
      </Section>

      <Section id="guardrails">
        <SectionHead eyebrow={P.guardrailsEyebrow} title={P.guardrailsTitle} />
        <div className="mt-10">
          <ApprovalFlow />
        </div>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {P.guardrails.map((g, i) => {
            const Icon = GUARDRAIL_ICONS[i];
            return (
              <li key={g.title} className="grid grid-cols-[2.75rem_1fr] gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-tint text-primary" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="grid content-start gap-1">
                  <h3 className="text-lg font-bold">{g.title}</h3>
                  <p className="text-muted-foreground">{g.description}</p>
                </span>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tint id="proof">
        <SectionHead eyebrow={P.proofEyebrow} title={P.proofTitle} lede={P.proofLede} />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {P.proof.map((p, i) => {
            const Icon = PROOF_ICONS[i];
            return (
              <li key={p.who} className="overflow-hidden rounded-xl border border-tint-strong bg-background">
                <div className="flex items-center gap-3 border-b border-tint-strong bg-gradient-to-r from-tint to-background px-6 py-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold">{p.who}</h3>
                </div>
                <p className="px-6 py-5 text-muted-foreground">{p.what}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="contact-cta">
        <div className="grid gap-10 rounded-2xl bg-ink p-6 text-white sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="grid content-start gap-4">
            <p className="text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#9cc4f0]">{P.startEyebrow}</p>
            <h2 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl">{P.startTitle}</h2>
            <div className="mt-2">
              <Cta location="service-claude-footer" />
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
