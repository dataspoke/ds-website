import type { Metadata } from "next";
import { HeroA } from "@/components/home-a/hero";
import { UseCases } from "@/components/home-a/use-cases";
import { ServicesA } from "@/components/home-a/services";
import { HowItWorksA } from "@/components/home-a/how-it-works";
import { FaqA } from "@/components/home-a/faq";
import { CtaA } from "@/components/home-a/cta";
import { FAQS_A } from "@/components/home-a/content";
import { FaqPageJsonLd, OrganizationJsonLd } from "@/components/shared/json-ld";
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
      <FaqPageJsonLd path="/" faqs={FAQS_A} />
      <HeroA />
      <UseCases />
      <ServicesA />
      <HowItWorksA />
      <FaqA />
      <CtaA />
    </>
  );
}
