import type { Metadata } from "next";
import { HeroC } from "@/components/home-c/hero";
import { ToolsBandC } from "@/components/home-c/tools-band";
import { ProcessC } from "@/components/home-c/process";
import { UseCasesC } from "@/components/home-c/use-cases";
import { FaqC, HOME_C_FAQS } from "@/components/home-c/faq";
import { ClosingC } from "@/components/home-c/closing";
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
      <FaqPageJsonLd path="/" faqs={HOME_C_FAQS} />
      <HeroC />
      <ToolsBandC />
      <ProcessC />
      <UseCasesC />
      <FaqC />
      <ClosingC />
    </>
  );
}
