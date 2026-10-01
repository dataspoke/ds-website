import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ToolsStrip } from "@/components/home/tools-strip";
import { ProblemStatement } from "@/components/home/problem-statement";
import { Stages } from "@/components/home/stages";
import { ExpertiseSection } from "@/components/home/expertise";
import { Assessment } from "@/components/home/assessment";
import { HowItWorks } from "@/components/home/how-it-works";
import { Examples } from "@/components/home/examples";
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
      <Stages />
      <ExpertiseSection />
      <Assessment />
      <HowItWorks />
      <Examples />
      <AboutTeaser />
      <CtaBanner />
    </>
  );
}
