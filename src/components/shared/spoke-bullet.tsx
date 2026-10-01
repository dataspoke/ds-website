import type { ReactNode } from "react";
import { LogoMark } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

type SpokeBulletProps = {
  size?: "heading" | "list";
  tone?: "brand" | "muted";
  as?: "li" | "div";
  className?: string;
  children: ReactNode;
};

/*
 * Brand bullets. `heading` uses the full logo mark (hub and six spokes) next
 * to an h3; `list` uses a plain dot, since the mark gets busy at small sizes.
 *
 * The marker is exactly one line box tall (`h-[1lh]`) and centres its glyph
 * inside it, so it always sits on the first line of the text regardless of how
 * the text wraps. For `list`, the line box is inherited from the item itself.
 * For `heading`, the marker borrows the h3 type scale used across the site
 * (1.15rem, leading-snug) so its line box matches the heading's first line;
 * put the h3 first in the content (with `leading-snug`) and any body copy after
 * it, so the copy hangs aligned with the heading text.
 */
const SIZES = {
  heading: {
    row: "gap-3",
    marker: "text-[1.15rem] leading-snug",
    content: "grid content-start gap-2.5",
  },
  list: {
    row: "gap-2.5",
    marker: "",
    content: "",
  },
} as const;

const TONES = {
  brand: { mark: "text-brand", dot: "bg-brand" },
  muted: { mark: "text-input", dot: "bg-input" },
} as const;

export function SpokeBullet({
  size = "list",
  tone = "brand",
  as: Tag = "div",
  className,
  children,
}: SpokeBulletProps) {
  const s = SIZES[size];
  const t = TONES[tone];
  return (
    <Tag className={cn("flex items-start", s.row, className)}>
      <span className={cn("inline-flex h-[1lh] shrink-0 items-center", s.marker)} aria-hidden="true">
        {size === "heading" ? (
          <LogoMark className={cn("h-[26px] w-[26px]", t.mark)} />
        ) : (
          <span className={cn("h-2 w-2 shrink-0 rounded-full", t.dot)} />
        )}
      </span>
      <div className={cn("min-w-0 flex-1", s.content)}>{children}</div>
    </Tag>
  );
}
