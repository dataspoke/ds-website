import Link from "next/link";
import { LINE_PAGE } from "@/content/services";
import type { ServiceLine } from "@/types";

/** Overview card for one service line, linking to its page. */
export function LineCard({ line }: { line: ServiceLine }) {
  return (
    <Link
      href={`/services/${line.slug}`}
      className="grid content-start gap-2.5 rounded-xl border border-tint-strong bg-background p-6 transition-colors hover:border-brand"
    >
      <h3 className="text-xl font-bold">{line.title}</h3>
      <p className="font-semibold text-foreground/80">{line.oneLiner}</p>
      <p className="text-[0.97rem] text-muted-foreground">{line.problem}</p>
      <p className="mt-1 border-t border-border pt-2.5 text-sm text-muted-foreground">
        {line.products.map((p) => p.title).join(" · ")}
      </p>
      <p className="font-semibold text-primary">{LINE_PAGE.seeLine(line.title)} &rarr;</p>
    </Link>
  );
}
