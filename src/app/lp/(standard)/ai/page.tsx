import type { Metadata } from "next";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { Section, SectionHead } from "@/components/shared/section";
import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { LpProductCard } from "@/components/lp/lp-product-card";
import { LpCtaBanner } from "@/components/lp/lp-cta-banner";
import { LP_AI } from "@/content/lp";
import { generateMetadata as pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "AI-Ready Company",
  description:
    "Connect your systems, make your company AI-ready and automate the busywork. Start with a free AI strategy call.",
  path: "/lp/ai",
  noIndex: true,
});

export default function LpAiPage() {
  return (
    <>
      <Section tight>
        <div className="grid max-w-3xl gap-5">
          <p className="eyebrow">{LP_AI.eyebrow}</p>
          <h1 className="text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
            {LP_AI.headline}
          </h1>
          <p className="lede max-w-xl">{LP_AI.lede}</p>
          <EstimateCta location="lp-ai-hero" lp className="justify-self-start max-sm:h-auto max-sm:min-h-11 max-sm:whitespace-normal max-sm:py-2.5">
            {LP_AI.ctaLabel}
          </EstimateCta>
        </div>
      </Section>

      <Section tint>
        <SectionHead eyebrow={LP_AI.problemsEyebrow} title={LP_AI.problemsTitle} />
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
          {LP_AI.problems.map((p) => (
            <SpokeBullet key={p.title} size="heading">
              <h3 className="text-[1.15rem] font-bold leading-snug">{p.title}</h3>
              <p className="text-muted-foreground">{p.description}</p>
            </SpokeBullet>
          ))}
        </div>
        <p className="mt-9 max-w-3xl text-muted-foreground">{LP_AI.problemsClose}</p>
      </Section>

      <Section>
        <SectionHead eyebrow={LP_AI.productsEyebrow} title={LP_AI.productsTitle} />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {LP_AI.products.map((p) => (
            <LpProductCard key={p.title} {...p} />
          ))}
        </div>
      </Section>

      <Section tint>
        <div className="grid items-start gap-9 lg:grid-cols-2 lg:gap-14">
          <div className="grid gap-5">
            <SectionHead eyebrow="If you want the full map" title={LP_AI.assessment.name} lede={LP_AI.assessment.lede} />
            <ul className="grid gap-3">
              {LP_AI.assessment.includes.map((item) => (
                <SpokeBullet key={item} as="li" size="list" className="text-muted-foreground">
                  {item}
                </SpokeBullet>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 rounded-2xl border border-border bg-background p-6 sm:p-8">
            <p className="text-muted-foreground">{LP_AI.assessment.scope}</p>
            <EstimateCta
              location="lp-ai-assessment"
              lp
              className="justify-self-start max-sm:h-auto max-sm:min-h-11 max-sm:whitespace-normal max-sm:py-2.5"
            >
              {LP_AI.ctaLabel}
            </EstimateCta>
          </div>
        </div>
      </Section>

      <LpCtaBanner
        title={LP_AI.bannerTitle}
        ctaLabel={LP_AI.ctaLabel}
        estimateLocation="lp-ai-banner"
      />
    </>
  );
}
