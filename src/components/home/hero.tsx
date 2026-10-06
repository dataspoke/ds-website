import Link from "next/link";
import { BookCall } from "@/components/shared/book-call";
import { SpokeDiagram } from "@/components/shared/spoke-diagram";
import { ProofLine } from "@/components/home/proof-line";
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
          <ProofLine className="max-w-xl" />
          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
            <BookCall>{HERO.primaryCta}</BookCall>
            <Link
              href={HERO.secondaryCta.href}
              className="font-semibold text-primary hover:text-primary/80"
            >
              {HERO.secondaryCta.label} &rarr;
            </Link>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{HERO.byline}</p>
        </div>
        <figure className="mx-auto w-full max-w-[700px]">
          <SpokeDiagram compact className="sm:hidden" />
          <SpokeDiagram className="hidden sm:block" />
        </figure>
      </div>
    </section>
  );
}
