import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { BioSection } from "@/components/about/bio-section";
import { Credentials } from "@/components/about/credentials";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata: Metadata = generateMetadata({
  title: "About",
  description:
    "Nick is a Durham, CT-based AI integrator and data consultant. Army veteran with a master's in operations research and 10+ years helping small businesses with technology.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <BioSection />
      <Credentials />
      <CtaBanner />
    </>
  );
}
