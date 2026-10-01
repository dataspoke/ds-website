import Link from "next/link";
import { BookCall } from "@/components/shared/book-call";
import { SpokeDiagram } from "@/components/shared/spoke-diagram";
import { HERO } from "@/lib/constants";

export function Hero() {
  return (
    <section className="pt-14 pb-10 sm:pt-20 sm:pb-14">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="grid gap-5">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 className="text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-[3.6rem]">
            {HERO.headline}
          </h1>
          <p className="lede max-w-xl">{HERO.lede}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
            <BookCall>Start with an AI Assessment</BookCall>
            <Link href="/services" className="font-semibold text-primary hover:text-primary/80">
              See the products &rarr;
            </Link>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{HERO.byline}</p>
        </div>
        <figure className="mx-auto w-full max-w-[700px]">
          <SpokeDiagram />
        </figure>
      </div>
    </section>
  );
}
