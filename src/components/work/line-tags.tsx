import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ServiceLineSlug } from "@/types";
import { getLine } from "./copy";

interface LineTagsProps {
  lines: ServiceLineSlug[];
  /** Where each tag points: the /work filter or the service line page. */
  linkTo: "filter" | "service";
  className?: string;
}

/** Service line tags. Each one is a plain link, so they work without JS. */
export function LineTags({ lines, linkTo, className }: LineTagsProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {lines.map((slug) => {
        const line = getLine(slug);
        if (!line) return null;
        const href = linkTo === "filter" ? `/work?line=${slug}` : `/services/${slug}`;
        return (
          <li key={slug}>
            <Link
              href={href}
              className="relative z-10 inline-flex min-h-8 items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-primary hover:border-primary/40 hover:bg-tint"
            >
              {line.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
