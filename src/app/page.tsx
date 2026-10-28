import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ToolsStrip } from "@/components/home/tools-strip";
import { ProblemStatement } from "@/components/home/problem-statement";
import { ServiceGrid } from "@/components/home/service-grid";
import { FeaturedWork } from "@/components/home/featured-work";
import { HowItWorks } from "@/components/home/how-it-works";
import { AboutTeaser } from "@/components/home/about-teaser";
import { HomeFaq } from "@/components/home/home-faq";
import { CtaBanner } from "@/components/home/cta-banner";
import { FaqPageJsonLd, OrganizationJsonLd } from "@/components/shared/json-ld";
import { HOME_FAQS } from "@/content/home";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { generateMetadata as pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: `${SITE_NAME} | AI and Data Consulting for Business Owners`,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <FaqPageJsonLd path="/" faqs={HOME_FAQS} />
      <Hero />
      <ToolsStrip />
      <ProblemStatement />
      <ServiceGrid />
      <FeaturedWork />
      <HowItWorks />
      <AboutTeaser />
      <HomeFaq />
      <CtaBanner />
    </>
  );
}
