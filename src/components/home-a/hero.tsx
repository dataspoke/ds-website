import Link from "next/link";
import { Check } from "lucide-react";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { HERO } from "@/content/home";
import { HeroIllustration } from "./illustrations";
import { HERO_A, TOOLS_A } from "./content";

export function HeroA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-tint via-white to-white pt-12 pb-8 sm:pt-20 sm:pb-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div className="grid gap-5">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 className="text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]">
            {HERO.headline}
          </h1>
          <p className="lede max-w-lg">{HERO_A.lede}</p>
          <ul className="flex flex-wrap gap-2">
            {HERO_A.chips.map((chip) => (
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
            <EstimateCta location="home-hero">{HERO_A.primaryCta}</EstimateCta>
            <Link href={HERO_A.secondaryCta.href} className="font-semibold text-primary hover:text-primary/80">
              {HERO_A.secondaryCta.label} &rarr;
            </Link>
          </div>
        </div>
        <figure className="mx-auto w-full max-w-[640px]">
          <HeroIllustration />
        </figure>
      </div>
      <div className="relative mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        <p className="text-center text-sm text-muted-foreground">Works with the tools you already use</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {TOOLS_A.map((t) => (
            <li key={t} className="font-display text-[1rem] font-bold tracking-tight text-muted-foreground/70">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
