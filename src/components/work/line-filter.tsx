import Link from "next/link";
import { SERVICE_LINES } from "@/content/services";
import { cn } from "@/lib/utils";
import type { ServiceLineSlug } from "@/types";
import { WORK_COPY } from "./copy";

const pill =
  "inline-flex min-h-9 items-center rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors";
const idle = "border-border text-primary hover:border-primary/40 hover:bg-tint";
const active = "border-primary bg-primary text-primary-foreground";

/** Plain links to /work?line=<slug>. The server reads the param, so no JS is needed. */
export function LineFilter({ activeLine }: { activeLine?: ServiceLineSlug }) {
  return (
    <nav aria-label={WORK_COPY.index.filterLabel}>
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/work"
            aria-current={activeLine ? undefined : "page"}
            className={cn(pill, activeLine ? idle : active)}
          >
            {WORK_COPY.index.allLabel}
          </Link>
        </li>
        {SERVICE_LINES.map((line) => {
          const isActive = line.slug === activeLine;
          return (
            <li key={line.slug}>
              <Link
                href={`/work?line=${line.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(pill, isActive ? active : idle)}
              >
                {line.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
