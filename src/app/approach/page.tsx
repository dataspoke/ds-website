import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { Section, SectionHead } from "@/components/shared/section";
import { Assessment } from "@/components/home/assessment";
import { KpiHierarchy } from "@/components/home/kpi-hierarchy";
import { CtaBanner } from "@/components/home/cta-banner";
import { APPROACH_PAGE, PHASES } from "@/content/approach";

export const metadata: Metadata = generateMetadata({
  title: APPROACH_PAGE.metaTitle,
  description: APPROACH_PAGE.metaDescription,
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <>
      <Section>
        <SectionHead
          as="h1"
          eyebrow={APPROACH_PAGE.eyebrow}
          title={APPROACH_PAGE.title}
          lede={APPROACH_PAGE.lede}
        />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((phase, i) => (
            <li key={phase.label} className="relative grid content-start gap-3 pt-7">
              <span
                className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-brand"
                aria-hidden="true"
              />
              {i < PHASES.length - 1 && (
                <span
                  className="absolute left-4 top-[13px] hidden h-0.5 w-[calc(100%+2rem)] bg-tint-strong lg:block"
                  aria-hidden="true"
                />
              )}
              <p className="text-sm font-semibold uppercase tracking-[0.06em] text-primary">
                {phase.label}
              </p>
              <h2 className="text-xl font-bold">{phase.title}</h2>
              <p className="text-muted-foreground">{phase.description}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Assessment tint />
      <KpiHierarchy />
      <CtaBanner />
    </>
  );
}
