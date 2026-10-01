import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpokeBulletProps = {
  size?: "heading" | "list";
  tone?: "brand" | "muted";
  as?: "li" | "div";
  className?: string;
  children: ReactNode;
};

/*
 * A bullet drawn as one spoke of the logo: dot, short line, then the content.
 *
 * The marker is exactly one line box tall (`h-[1lh]`) and centres the spoke
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
    dot: "h-3.5 w-3.5",
    line: "w-6",
    content: "grid content-start gap-2.5",
  },
  list: {
    row: "gap-2.5",
    marker: "",
    dot: "h-2 w-2",
    line: "w-4",
    content: "",
  },
} as const;

const TONES = {
  brand: { dot: "bg-brand", line: "bg-brand/50" },
  muted: { dot: "bg-input", line: "bg-input/50" },
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
        <span className={cn("shrink-0 rounded-full", s.dot, t.dot)} />
        <span className={cn("h-0.5 shrink-0", s.line, t.line)} />
      </span>
      <div className={cn("min-w-0 flex-1", s.content)}>{children}</div>
    </Tag>
  );
}
