import type { Metadata } from "next";
import { HeroB } from "@/components/home-b/hero";
import { ToolsRowB } from "@/components/home-b/tools-row";
import { OutcomesB } from "@/components/home-b/outcomes";
import { UseCasesB } from "@/components/home-b/use-cases";
import { ServicesB } from "@/components/home-b/services";
import { DevicesB } from "@/components/home-b/devices";
import { StepsB } from "@/components/home-b/steps";
import { AboutStripB } from "@/components/home-b/about-strip";
import { FaqB, HOME_B_FAQS } from "@/components/home-b/faq";
import { CtaB } from "@/components/home-b/cta";
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
      <FaqPageJsonLd path="/" faqs={HOME_B_FAQS} />
      <HeroB />
      <ToolsRowB />
      <OutcomesB />
      <UseCasesB />
      <DevicesB />
      <ServicesB />
      <StepsB />
      <AboutStripB />
      <FaqB />
      <CtaB />
    </>
  );
}
