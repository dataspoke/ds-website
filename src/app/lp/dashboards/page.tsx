import type { Metadata } from "next";
import { BookCall } from "@/components/shared/book-call";
import { Section, SectionHead } from "@/components/shared/section";
import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { LpCtaBanner } from "@/components/lp/lp-cta-banner";
import { LP_DASHBOARDS } from "@/content/lp";

export const metadata: Metadata = {
  title: "Metrics & Dashboards",
  description:
    "Routine reports belong in a dashboard, not in a prompt you re-type every Monday. A KPI hierarchy from goal to weekly scorecard, and one trusted number.",
  robots: { index: false, follow: false },
};

export default function LpDashboardsPage() {
  return (
    <>
      <Section tight>
        <div className="grid max-w-3xl gap-5">
          <p className="eyebrow">{LP_DASHBOARDS.eyebrow}</p>
          <h1 className="text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
            {LP_DASHBOARDS.headline}
          </h1>
          <p className="lede max-w-xl">{LP_DASHBOARDS.lede}</p>
          <BookCall className="justify-self-start">{LP_DASHBOARDS.ctaLabel}</BookCall>
        </div>
      </Section>

      <Section tint>
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
          {LP_DASHBOARDS.soundsLikeEyebrow}
        </p>
        <ul className="mt-4 grid max-w-2xl gap-3">
          {LP_DASHBOARDS.soundsLike.map((s) => (
            <SpokeBullet key={s} as="li" size="list" className="text-muted-foreground">
              {s}
            </SpokeBullet>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead eyebrow={LP_DASHBOARDS.hierarchyEyebrow} title={LP_DASHBOARDS.hierarchyTitle} />
        <ol className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {LP_DASHBOARDS.hierarchy.map((h, i) => (
            <li key={h.title} className="grid content-start gap-2.5">
              <div className="flex items-center gap-3 border-b-2 border-brand pb-2.5">
                <span className="font-display font-extrabold text-primary">{`0${i + 1}`}</span>
                <h3 className="text-[1.05rem] font-bold">{h.title}</h3>
              </div>
              <p className="text-muted-foreground">{h.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tint>
        <SectionHead eyebrow={LP_DASHBOARDS.trustedNumberEyebrow} title={LP_DASHBOARDS.trustedNumberTitle} />
        <p className="mt-8 max-w-3xl text-muted-foreground">{LP_DASHBOARDS.trustedNumberBody}</p>
      </Section>

      <LpCtaBanner title="Build the scorecard once. Trust it every week." ctaLabel={LP_DASHBOARDS.ctaLabel} />
    </>
  );
}
