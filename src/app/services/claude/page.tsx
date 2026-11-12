import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, Lock, UserCheck } from "lucide-react";
import { generateMetadata } from "@/lib/metadata";
import { LinkedText } from "@/components/shared/faq-list";
import { Section, SectionHead } from "@/components/shared/section";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { JourneyPath, JourneyTimeline } from "@/components/services/claude-journey";
import { CLAUDE_PAGE as P } from "@/content/claude-services";
import { LINE_PAGE } from "@/content/services";

export const metadata: Metadata = generateMetadata({
  title: P.metaTitle,
  description: P.metaDescription,
  path: P.path,
});

const GUARDRAIL_ICONS = [Lock, UserCheck, ClipboardList];

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
      <Section tight>
        <Link href="/services" className="inline-block py-2 text-sm font-semibold text-primary hover:text-primary/80">
          &larr; {LINE_PAGE.backLabel}
        </Link>
        <div className="mt-4 grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div className="grid gap-6">
            <SectionHead as="h1" eyebrow={P.eyebrow} title={P.title} lede={P.lede} />
            <div className="grid gap-2.5">
              <div>
                <Cta location="service-claude-hero" />
              </div>
              <p className="max-w-xl text-sm text-muted-foreground">{P.ctaSupport}</p>
            </div>
          </div>
          <JourneyPath steps={P.journey} label={P.pathLabel} />
        </div>
        <ul className="mt-12 grid gap-3 border-t border-border pt-8 sm:grid-cols-3 sm:gap-6">
          {P.intro.map((line) => (
            <SpokeBullet key={line} as="li" size="list" className="font-semibold text-foreground/85">
              {line}
            </SpokeBullet>
          ))}
        </ul>
      </Section>

      <Section tint id="journey">
        <SectionHead eyebrow={P.journeyEyebrow} title={P.journeyTitle} lede={P.journeyLede} />
        <JourneyTimeline steps={P.journey} />
      </Section>

      <Section id="guardrails">
        <SectionHead eyebrow={P.guardrailsEyebrow} title={P.guardrailsTitle} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {P.guardrails.map((g, i) => {
            const Icon = GUARDRAIL_ICONS[i];
            return (
              <li key={g.title} className="grid content-start gap-3 rounded-xl border border-tint-strong bg-background p-6">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-tint text-primary" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-bold">{g.title}</h3>
                <p className="text-muted-foreground">{g.description}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tint id="proof">
        <SectionHead eyebrow={P.proofEyebrow} title={P.proofTitle} lede={P.proofLede} />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {P.proof.map((p) => (
            <li key={p.who} className="grid content-start gap-2 rounded-xl border border-tint-strong bg-background p-6">
              <h3 className="text-lg font-bold">{p.who}</h3>
              <p className="text-muted-foreground">{p.what}</p>
            </li>
          ))}
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
