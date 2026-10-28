import Link from "next/link";
import { cn } from "@/lib/utils";

/** Each step sits a little lower than the last, so the row reads as a staircase. */
const STAIR = ["lg:pt-0", "lg:pt-9", "lg:pt-18", "lg:pt-27"];

interface Step {
  n: string;
  title: string;
  line: string;
  icon: React.ReactNode;
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Connect",
    line: "Your CRM, accounting, phones and email start talking.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" {...stroke}>
        <circle cx="10" cy="12" r="5" />
        <circle cx="10" cy="36" r="5" />
        <circle cx="38" cy="24" r="6" />
        <path d="M15 13l17 9M15 35l17-9" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Organize",
    line: "One set of records you own and can trust.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" {...stroke}>
        <rect x="8" y="8" width="32" height="32" rx="3" />
        <path d="M8 19h32M8 30h32M20 8v32" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Automate",
    line: "Retyping, follow-ups and reports run on their own.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" {...stroke}>
        <path d="M26 6L12 27h11l-2 15 15-22H25z" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Grow",
    line: "See the whole business, decide faster, take on more.",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" {...stroke}>
        <path d="M6 38l12-13 8 7 16-18" />
        <path d="M32 14h10v10" />
      </svg>
    ),
  },
];

/** Numbered process as a large stair-stepped visual. */
export function ProcessC() {
  return (
    <section id="how" className="overflow-hidden bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-12 md:items-end">
          <p className="eyebrow md:col-span-3">How it works</p>
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:col-span-9 md:text-5xl">
            Four steps. Each one you can see.
          </h2>
        </div>

        <ol className="relative mt-14 grid gap-10 sm:mt-20 lg:grid-cols-4 lg:gap-0">
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[23px] w-0.5 bg-tint-strong lg:hidden"
          />
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="relative grid grid-cols-[48px_1fr] gap-x-5 lg:block lg:border-l lg:border-tint-strong lg:px-6 lg:pb-4"
            >
              <span
                className="relative z-10 flex h-12 w-12 items-center justify-center bg-ink text-brand lg:mb-7 lg:h-14 lg:w-14"
                aria-hidden="true"
              >
                <span className="h-7 w-7 lg:h-8 lg:w-8">{step.icon}</span>
              </span>
              <div className={cn("min-w-0", STAIR[i])}>
                <p className="font-display text-[clamp(3.2rem,8vw,5.6rem)] font-extrabold leading-none tracking-[-0.05em] text-brand">
                  {step.n}
                </p>
                <h3 className="mt-1 font-display text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold leading-none tracking-[-0.03em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[16rem] text-[0.97rem] leading-snug text-muted-foreground">
                  {step.line}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="absolute top-[18px] right-0 hidden h-6 w-6 translate-x-1/2 text-brand lg:block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
            </li>
          ))}
        </ol>

        <p className="mt-12 text-[0.97rem]">
          <Link href="/approach" className="font-semibold text-primary hover:text-primary/80">
            See an engagement step by step &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
