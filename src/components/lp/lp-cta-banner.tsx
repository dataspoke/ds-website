import { BookCall } from "@/components/shared/book-call";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { Section } from "@/components/shared/section";
import { ProofLine } from "@/components/lp/proof-line";

interface LpCtaBannerProps {
  title: string;
  ctaLabel: string;
  /**
   * Send the CTA to /lp/free-estimate (utm_* carried over) instead of the
   * calendar, tracked under this GA location.
   */
  estimateLocation?: string;
}

/** Closing section for a landing page: proof line, then the one CTA. */
export function LpCtaBanner({ title, ctaLabel, estimateLocation }: LpCtaBannerProps) {
  return (
    <Section tint>
      <div className="grid max-w-2xl gap-6">
        <h2 className="text-2xl font-bold leading-[1.15] sm:text-3xl">{title}</h2>
        <ProofLine />
        {estimateLocation ? (
          <EstimateCta location={estimateLocation} lp className="justify-self-start max-sm:h-auto max-sm:min-h-11 max-sm:whitespace-normal max-sm:py-2.5">
            {ctaLabel}
          </EstimateCta>
        ) : (
          <BookCall className="justify-self-start">{ctaLabel}</BookCall>
        )}
      </div>
    </Section>
  );
}
