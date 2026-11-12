import type { Metadata } from "next";
import Link from "next/link";
import { WORK_PUBLISHED } from "@/lib/constants";
import { generateMetadata } from "@/lib/metadata";
import { Section, SectionHead } from "@/components/shared/section";
import { HowItWorksA } from "@/components/home-a/how-it-works";
import { CtaA } from "@/components/home-a/cta";
import { LegacyAnchorRedirect } from "@/components/services/legacy-anchor-redirect";
import { LineTile } from "@/components/services/line-tile";
import { ServicesHero } from "@/components/services/services-hero";
import { LINE_PAGE, SERVICE_LINES, SERVICE_PIPELINE, SERVICES_PAGE } from "@/content/services";

export const metadata: Metadata = generateMetadata({
  title: SERVICES_PAGE.metaTitle,
  description: SERVICES_PAGE.metaDescription,
  path: "/services",
});

const LINES = Object.fromEntries(SERVICE_LINES.map((l) => [l.slug, l]));
/** Pipeline order, numbered; the foundation lines come first. */
const TILES = SERVICE_PIPELINE.map((p, i) => ({ ...p, step: i + 1, line: LINES[p.slug] }));
const FOUNDATION = TILES.filter((t) => t.line.kind === "hub");
const BUILD_ON_IT = TILES.filter((t) => t.line.kind === "spoke");

export default function ServicesPage() {
  return (
    <>
      <LegacyAnchorRedirect />
      <ServicesHero />

      <Section tight id="lines">
        <SectionHead eyebrow={SERVICES_PAGE.hubEyebrow} title={SERVICES_PAGE.hubTitle} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {FOUNDATION.map((t) => (
            <LineTile key={t.slug} line={t.line} step={t.step} verb={t.verb} blurb={t.blurb} large />
          ))}
        </div>

        {/* Connector: the foundation feeds everything below it. */}
        <div aria-hidden="true" className="my-8 flex flex-col items-center gap-2">
          <span className="h-10 w-0.5 bg-gradient-to-b from-tint-strong to-primary" />
          <span className="size-2.5 rounded-full bg-primary ring-4 ring-tint" />
        </div>

        <SectionHead eyebrow={SERVICES_PAGE.spokeEyebrow} title={SERVICES_PAGE.spokeTitle} lede={SERVICES_PAGE.spokeLede} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BUILD_ON_IT.map((t) => (
            <LineTile key={t.slug} line={t.line} step={t.step} verb={t.verb} blurb={t.blurb} />
          ))}
        </div>

        {WORK_PUBLISHED && (
          <Link
            href={LINE_PAGE.workLink.href}
            className="mt-8 inline-block py-2 font-semibold text-primary hover:text-primary/80"
          >
            {LINE_PAGE.workLink.label} &rarr;
          </Link>
        )}
      </Section>

      <HowItWorksA />
      <CtaA location="services-banner" />
    </>
  );
}
