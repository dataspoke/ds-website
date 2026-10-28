import Link from "next/link";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { SpokeDiagram } from "@/components/shared/spoke-diagram";
import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { HERO } from "@/content/home";

export function Hero() {
  return (
    <section className="pt-14 pb-10 sm:pt-20 sm:pb-14">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="grid gap-5">
          <p className="eyebrow hidden sm:block">{HERO.eyebrow}</p>
          <h1 className="text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-[3.6rem]">
            {HERO.headline}
          </h1>
          <p className="lede max-w-xl">{HERO.lede}</p>
          <ul className="grid max-w-xl gap-2 border-l-4 border-brand py-1 pl-4">
            {HERO.outcomes.map((outcome) => (
              <SpokeBullet
                key={outcome}
                as="li"
                size="list"
                className="text-[1.05rem] font-semibold leading-snug text-foreground"
              >
                {outcome}
              </SpokeBullet>
            ))}
          </ul>
          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
            <EstimateCta location="home-hero">{HERO.primaryCta}</EstimateCta>
            <Link
              href={HERO.secondaryCta.href}
              className="font-semibold text-primary hover:text-primary/80"
            >
              {HERO.secondaryCta.label} &rarr;
            </Link>
          </div>
        </div>
        <figure className="mx-auto w-full max-w-[700px]">
          <SpokeDiagram compact className="sm:hidden" />
          <SpokeDiagram className="hidden sm:block" />
        </figure>
      </div>
    </section>
  );
}
