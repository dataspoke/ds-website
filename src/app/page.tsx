import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ToolsStrip } from "@/components/home/tools-strip";
import { ProblemStatement } from "@/components/home/problem-statement";
import { ServiceGrid } from "@/components/home/service-grid";
import { FeaturedWork } from "@/components/home/featured-work";
import { HowItWorks } from "@/components/home/how-it-works";
import { AboutTeaser } from "@/components/home/about-teaser";
import { CtaBanner } from "@/components/home/cta-banner";
import { OrganizationJsonLd } from "@/components/shared/json-ld";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { generateMetadata as pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: `${SITE_NAME} | ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <Hero />
      <ToolsStrip />
      <ProblemStatement />
      <ServiceGrid />
      <FeaturedWork />
      <HowItWorks />
      <AboutTeaser />
      <CtaBanner />
    </>
  );
}
