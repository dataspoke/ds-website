import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ToolsStrip } from "@/components/home/tools-strip";
import { ProblemStatement } from "@/components/home/problem-statement";
import { ServiceGrid } from "@/components/home/service-grid";
import { FeaturedWork } from "@/components/home/featured-work";
import { HowItWorks } from "@/components/home/how-it-works";
import { AboutTeaser } from "@/components/home/about-teaser";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
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
