import Link from "next/link";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { CONTACT_EMAIL } from "@/lib/constants";

/** Founder note plus the final call to action, on navy. */
export function ClosingC() {
  return (
    <section id="contact-cta" className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <h2 className="text-[clamp(2.4rem,7vw,4.8rem)] font-extrabold leading-[1] tracking-[-0.035em] text-white">
            Tell us what&apos;s slowing you down.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            A free 30-minute call, then a written estimate with a price range.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <EstimateCta
              location="home-banner"
              className="h-13 rounded-none bg-brand px-7 text-[1.05rem] text-white hover:bg-brand/90"
            >
              Book your free estimate
            </EstimateCta>
            <span className="text-white/70">
              or email <span className="font-semibold text-white select-all">{CONTACT_EMAIL}</span>
            </span>
          </div>
        </div>
        <div className="border-t border-white/15 pt-8 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-brand">Who you work with</p>
          <p className="mt-3 font-display text-2xl font-bold tracking-tight">Nick Paul, founder</p>
          <p className="mt-2 text-white/75">
            One person scopes and builds the work. You own all of it at the end.
          </p>
          <Link
            href="/about"
            className="mt-4 inline-block font-semibold text-white underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand"
          >
            About Nick
          </Link>
        </div>
      </div>
    </section>
  );
}
