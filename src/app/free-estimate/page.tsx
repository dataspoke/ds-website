import type { Metadata } from "next";
import { EstimateOffer } from "@/components/estimate/estimate-offer";
import { EstimateJsonLd } from "@/components/shared/json-ld";
import { FREE_ESTIMATE } from "@/content/free-estimate";
import { generateMetadata as pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: FREE_ESTIMATE.metaTitle,
  description: FREE_ESTIMATE.metaDescription,
  path: FREE_ESTIMATE.path,
});

export default function FreeEstimatePage() {
  return (
    <>
      <EstimateJsonLd />
      <EstimateOffer ctaLocation="estimate-hero" fallbackLocation="estimate-fallback" />
    </>
  );
}
