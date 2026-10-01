import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ProblemStatement } from "@/components/home/problem-statement";
import { ServicesOverview } from "@/components/home/services-overview";
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
      <ProblemStatement />
      <ServicesOverview />
      <AboutTeaser />
      <CtaBanner />
    </>
  );
}
