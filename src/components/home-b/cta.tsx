import { EstimateCta } from "@/components/shared/estimate-cta";
import { Section } from "@/components/shared/section";
import { CONTACT_EMAIL } from "@/lib/constants";

export function CtaB() {
  return (
    <Section id="contact-cta" className="pt-0 sm:pt-0">
      <div className="grid gap-5 rounded-2xl bg-ink px-6 py-10 text-white sm:px-10 sm:py-14 md:grid-cols-[1fr_auto] md:items-center">
        <div className="grid gap-2">
          <h2 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl">
            Tell us what&apos;s slowing you down.
          </h2>
          <p className="text-white/75">
            Free 30-minute call, then a written estimate with a plan and a price range.
          </p>
        </div>
        <div className="grid justify-items-start gap-2 md:justify-items-end">
          <EstimateCta location="home-banner" className="bg-brand text-white hover:bg-brand/90">
            Book your free estimate
          </EstimateCta>
          <span className="text-sm text-white/70">
            or email <span className="font-semibold text-white select-all">{CONTACT_EMAIL}</span>
          </span>
        </div>
      </div>
    </Section>
  );
}
