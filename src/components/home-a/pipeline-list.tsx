"use client";

import Link from "next/link";
import { BarChart3, Database, LayoutGrid, Plug, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import type { ServiceLineSlug } from "@/types";
import { cn } from "@/lib/utils";
import { useInView } from "./dash";

export interface PipelineStep {
  slug: ServiceLineSlug;
  verb: string;
  title: string;
  blurb: string;
}

// Icons stay on the client: components can't cross the server-to-client boundary as props.
const ICONS: Record<ServiceLineSlug, LucideIcon> = {
  capture: Plug,
  organize: Database,
  "metrics-dashboards": BarChart3,
  "analytics-data-science": TrendingUp,
  "ai-implementation": Sparkles,
  "custom-software": LayoutGrid,
};
const FOUNDATION = 2; // the first two steps are the foundation; the rest build on it
const STEP_MS = 220; // the line reaches each node in turn

/**
 * Numbered nodes joined by connectors. When the list scrolls into view each
 * connector fills in turn and each node lights up as the line reaches it.
 */
export function PipelineList({ steps }: { steps: PipelineStep[] }) {
  const [ref, inView] = useInView<HTMLOListElement>(0.3);
  return (
    <ol ref={ref} className="mt-8 grid gap-6 lg:mt-4 lg:grid-cols-6 lg:gap-4">
      {steps.map((step, i) => {
        const Icon = ICONS[step.slug];
        return (
          <li key={step.slug} className="relative">
            {i < steps.length - 1 && (
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
                <span className="text-sm font-semibold leading-snug text-foreground">{step.title}</span>
                <span className="text-sm text-muted-foreground">{step.blurb}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
