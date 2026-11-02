import { EstimateCta } from "@/components/shared/estimate-cta";
import { WheelMark } from "@/components/shared/logo";
import { CONTACT_EMAIL } from "@/lib/constants";
import { CTA_A } from "./content";

export function CtaA() {
  return (
    <section id="contact-cta" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#5f9ee8] to-[#1f63b5] px-6 py-12 text-white sm:px-12 sm:py-16">
          <WheelMark className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 text-white opacity-15" />
          <div className="relative grid max-w-xl gap-4">
            <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl">{CTA_A.title}</h2>
            <p className="text-lg text-white/85">{CTA_A.text}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
              <EstimateCta location="home-banner" className="bg-white text-primary hover:bg-white/90">
                {CTA_A.button}
              </EstimateCta>
              <span className="text-white/85">
                or email <span className="font-semibold text-white select-all">{CONTACT_EMAIL}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
