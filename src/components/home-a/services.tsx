"use client";

import Link from "next/link";
import { BarChart3, Database, LayoutGrid, Plug, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import { Section, SectionHead } from "@/components/shared/section";
import { SERVICE_LINES } from "@/content/services";
import type { ServiceLineSlug } from "@/types";
import { cn } from "@/lib/utils";
import { SERVICES_A_HEAD } from "./content";
import { useInView } from "./dash";

/** The services as one pipeline, in the order a client builds them. */
const STEPS: { slug: ServiceLineSlug; verb: string; icon: LucideIcon; blurb: string }[] = [
  { slug: "capture", verb: "Connect", icon: Plug, blurb: "Leads and invoices land where they belong." },
  { slug: "organize", verb: "Organize", icon: Database, blurb: "One trustworthy set of records." },
  { slug: "metrics-dashboards", verb: "Measure", icon: BarChart3, blurb: "Know your numbers every Monday." },
  { slug: "analytics-data-science", verb: "Predict", icon: TrendingUp, blurb: "Where money goes, what's next." },
  { slug: "ai-implementation", verb: "Automate", icon: Sparkles, blurb: "AI on your data, a person approving." },
  { slug: "custom-software", verb: "Build", icon: LayoutGrid, blurb: "Built around how you work." },
];
const FOUNDATION = 2; // the first two steps are the foundation; the rest build on it
const STEP_MS = 220; // the line reaches each node in turn

const TITLES = Object.fromEntries(SERVICE_LINES.map((l) => [l.slug, l.title])) as Record<ServiceLineSlug, string>;

/**
 * Ordered pipeline: numbered nodes joined by connectors, left to right from lg
 * up and top to bottom below it. When the list scrolls into view each
 * connector fills in turn and each node lights up as the line reaches it.
 */
export function ServicesA() {
  const [ref, inView] = useInView<HTMLOListElement>(0.3);
  return (
    <Section tint tight id="services">
      <SectionHead eyebrow={SERVICES_A_HEAD.eyebrow} title={SERVICES_A_HEAD.title} lede={SERVICES_A_HEAD.lede} />

      <div aria-hidden="true" className="mt-10 hidden grid-cols-6 gap-4 lg:grid">
        <Group label="Foundation" className="col-span-2" />
        <Group label="Build on it" className="col-span-4" />
      </div>

      <ol ref={ref} className="mt-8 grid gap-6 lg:mt-4 lg:grid-cols-6 lg:gap-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <li key={step.slug} className="relative">
              {i < STEPS.length - 1 && (
                /* Connector to the next node: down below lg, right from lg up. */
                <span
                  aria-hidden="true"
                  className="absolute left-7 top-7 -bottom-[3.25rem] w-0.5 -translate-x-1/2 bg-tint-strong lg:bottom-auto lg:left-1/2 lg:h-0.5 lg:w-[calc(100%+1rem)] lg:translate-x-0 lg:-translate-y-1/2"
                >
                  <span
                    className={cn(
                      "absolute inset-0 origin-top bg-primary transition-transform ease-linear motion-reduce:transition-none lg:origin-left",
                      inView ? "scale-100" : "scale-y-0 lg:scale-x-0 lg:scale-y-100"
                    )}
                    style={{ transitionDuration: `${STEP_MS}ms`, transitionDelay: `${i * STEP_MS}ms` }}
                  />
                </span>
              )}
              <Link
                href={`/services/${step.slug}`}
                className="group flex gap-4 rounded-2xl lg:flex-col lg:items-center lg:text-center"
              >
                <span
                  className={cn(
                    "relative z-10 inline-flex size-14 shrink-0 items-center justify-center rounded-full ring-4 ring-tint transition-colors duration-300 motion-reduce:transition-none",
                    inView ? "bg-primary text-white" : "bg-white text-primary",
                    "group-hover:scale-105"
                  )}
                  style={{ transitionDelay: inView ? `${i * STEP_MS}ms` : undefined }}
                >
                  <Icon className="size-6" aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 inline-flex size-5 items-center justify-center rounded-full bg-ink text-[0.65rem] font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <span className="grid content-start gap-1 pt-1 lg:pt-2">
                  <span className="flex items-center gap-2 lg:justify-center">
                    <span className="font-display text-xl font-extrabold tracking-tight text-ink group-hover:text-primary">{step.verb}</span>
                    {i < FOUNDATION && (
                      <span className="rounded-full bg-white px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-primary ring-1 ring-tint-strong lg:hidden">
                        Foundation
                      </span>
                    )}
                  </span>
                  <span className="text-sm font-semibold leading-snug text-foreground">{TITLES[step.slug]}</span>
                  <span className="text-sm text-muted-foreground">{step.blurb}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <Link href={SERVICES_A_HEAD.allLink.href} className="mt-8 inline-block font-semibold text-primary hover:text-primary/80">
        {SERVICES_A_HEAD.allLink.label} &rarr;
      </Link>
    </Section>
  );
}

function Group({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("grid gap-2 text-center", className)}>
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-primary">{label}</span>
      <span className="h-2 rounded-t-md border-x-2 border-t-2 border-brand/40" />
    </div>
  );
}
