import Link from "next/link";
import { Check, Sparkles, Zap } from "lucide-react";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { HERO } from "@/content/home";
import { Bars, IllustrativeBadge, Stat, Window } from "./mock-ui";

const AUTOMATIONS = ["New lead → CRM", "Paid invoice → books"];

/** Hero: headline beside a composite of a dashboard, automations and an AI answer. Sample data only. */
function HeroMock() {
  return (
    <div className="relative mx-auto w-full max-w-[620px] lg:max-w-none">
      <div
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_70%_30%,#d6e6f8_0%,rgba(214,230,248,0)_70%)]"
        aria-hidden="true"
      />
      <Window title="This week">
        <div className="grid gap-3 p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-2">
            <Stat label="Revenue" value="$48,200" />
            <Stat label="Open leads" value="37" />
            <Stat label="Jobs this week" value="21" />
          </div>
          <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">Revenue by month</span>
              </div>
              <div className="mt-3">
                <Bars values={[42, 48, 45, 56, 60, 58, 66, 71, 69, 78, 84, 90]} highlight={11} />
              </div>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <Zap className="size-3.5 text-brand" aria-hidden="true" />
                Automations
              </div>
              <ul className="mt-2.5 grid gap-2">
                {AUTOMATIONS.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                      <Check className="size-2.5" aria-hidden="true" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Window>

      {/* Floating AI answer card */}
      <div className="relative -mt-5 ml-auto w-[88%] max-w-[360px] rounded-xl border border-border bg-background p-3 shadow-[0_14px_40px_-20px_rgba(15,30,51,0.4)] sm:absolute sm:-bottom-20 sm:-right-4 sm:mt-0 sm:w-[300px]">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
          <Sparkles className="size-3.5" aria-hidden="true" />
          Ask your business
        </div>
        <p className="mt-1.5 rounded-md bg-muted px-2.5 py-1.5 text-xs">
          Which customers haven&apos;t ordered in 90 days?
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground">14 customers. Call sheet ready.</p>
      </div>

      <IllustrativeBadge className="absolute left-3 top-[-14px]" />
    </div>
  );
}

export function HeroB() {
  return (
    <section className="overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        <div className="grid gap-5">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 className="text-[2.3rem] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]">
            {HERO.headline}
          </h1>
          <p className="lede max-w-lg">
            We connect the tools you already pay for, so the numbers are right and the retyping stops.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
            <EstimateCta location="home-hero">{HERO.primaryCta}</EstimateCta>
            <Link href="/services" className="font-semibold text-primary hover:text-primary/80">
              See the services &rarr;
            </Link>
          </div>
        </div>
        <div className="pt-4 sm:pb-20">
          <HeroMock />
        </div>
      </div>
    </section>
  );
}
