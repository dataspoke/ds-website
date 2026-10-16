import type { Metadata } from "next";
import { EstimateOffer } from "@/components/estimate/estimate-offer";
import { FREE_ESTIMATE } from "@/content/free-estimate";
import { BOOKING_EMBED_URL, LP_FREE_ESTIMATE_PATH } from "@/lib/constants";
import { generateMetadata as pageMetadata } from "@/lib/metadata";
import { withUtmParams } from "@/lib/utm";

export const metadata: Metadata = pageMetadata({
  title: FREE_ESTIMATE.metaTitle,
  description: FREE_ESTIMATE.metaDescription,
  path: LP_FREE_ESTIMATE_PATH,
  noIndex: true,
});

/**
 * Distraction-free ad page for the free estimate. Reading the query string
 * keeps utm_* on the embedded calendar. The hero button scrolls to #book,
 * so those params also stay on this page's URL.
 */
export default async function LpFreeEstimatePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <EstimateOffer
      ctaLocation="lp"
      showServices={false}
      linkFaqs={false}
      showBookingFallback={false}
      bookClassName="scroll-mt-4"
      embedUrl={withUtmParams(BOOKING_EMBED_URL, params)}
    />
  );
}
