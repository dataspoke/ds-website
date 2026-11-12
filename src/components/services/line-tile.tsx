import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceLine } from "@/types";
import { cn } from "@/lib/utils";
import { LINE_ICONS } from "./line-icons";

/** Visual card for one service line on /services: icon, verb, title, one short outcome, product chips. */
export function LineTile({
  line,
  step,
  verb,
  blurb,
  large = false,
}: {
  line: ServiceLine;
  /** Position in the build order, shown as a big faint number. */
  step: number;
  verb: string;
  blurb: string;
  /** Foundation tiles are wider and get a little more type. */
  large?: boolean;
}) {
  const Icon = LINE_ICONS[line.slug];
  return (
    <Link
      href={`/services/${line.slug}`}
      aria-label={`${verb}: ${line.title}`}
      className="group relative grid content-start gap-4 overflow-hidden rounded-2xl bg-gradient-to-b from-tint to-white p-6 ring-1 ring-tint-strong transition-shadow hover:shadow-lg hover:ring-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:p-7"
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary text-white ring-4 ring-white transition-transform group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span aria-hidden="true" className="font-display text-4xl font-extrabold leading-none text-brand/25">
          {String(step).padStart(2, "0")}
        </span>
      </div>
      <div className="grid gap-1">
        <p className={cn("font-display font-extrabold tracking-tight text-ink group-hover:text-primary group-focus-visible:text-primary", large ? "text-3xl" : "text-2xl")}>
          {verb}
        </p>
        <h3 className="font-semibold leading-snug text-foreground">{line.title}</h3>
      </div>
      <p className={cn("text-muted-foreground", large && "text-lg")}>{blurb}</p>
      <ul className="flex flex-wrap gap-1.5">
        {line.products.map((p) => (
          <li key={p.slug} className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-foreground/80 ring-1 ring-tint-strong">
            {p.title}
          </li>
        ))}
      </ul>
      <ArrowRight
        aria-hidden="true"
        className="absolute bottom-6 right-6 size-5 text-primary opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100 motion-reduce:transition-none"
      />
    </Link>
  );
}
