import { Check } from "lucide-react";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { LINE_PAGE, SERVICES_PAGE } from "@/content/services";
import { ServicesWheel } from "./services-wheel";

/** /services hero in the home page's style: short copy on the left, the services wheel on the right. */
export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-tint via-white to-white pt-12 pb-8 sm:pt-20 sm:pb-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div className="grid gap-5">
          <p className="eyebrow">{SERVICES_PAGE.eyebrow}</p>
          <h1 className="text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-[3.25rem]">
            {SERVICES_PAGE.title}
          </h1>
          <p className="lede max-w-lg">{SERVICES_PAGE.lede}</p>
          <ul className="flex flex-wrap gap-2">
            {SERVICES_PAGE.heroChips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-semibold text-foreground ring-1 ring-tint-strong"
              >
                <Check className="size-4 text-brand" aria-hidden="true" />
                {chip}
              </li>
            ))}
          </ul>
          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
            <EstimateCta location="services-hero">{LINE_PAGE.estimateCta}</EstimateCta>
            <a href="#lines" className="font-semibold text-primary hover:text-primary/80">
              {SERVICES_PAGE.jumpLabel} &darr;
            </a>
          </div>
        </div>
        <ServicesWheel className="mx-auto w-full max-w-[560px]" />
      </div>
    </section>
  );
}
