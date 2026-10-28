import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Primitives for the illustrative product mockups on the home page.
 * Every number inside these is placeholder sample data, never a claim.
 */

export function IllustrativeBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-background/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
      Illustrative example
    </span>
  );
}

/** A browser/app window frame. */
export function Window({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-background shadow-[0_18px_50px_-24px_rgba(15,30,51,0.35)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted px-3 py-2">
        <span className="flex gap-1" aria-hidden="true">
          <i className="block h-2 w-2 rounded-full bg-tint-strong" />
          <i className="block h-2 w-2 rounded-full bg-tint-strong" />
          <i className="block h-2 w-2 rounded-full bg-tint-strong" />
        </span>
        <span className="ml-1 text-[11px] font-medium text-muted-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}

/** Small KPI card with sample value. */
export function Stat({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="grid gap-0.5 rounded-lg border border-border bg-background p-2.5 sm:p-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground sm:text-[11px]">
        {label}
      </span>
      <span className="font-display text-base font-extrabold tabular-nums tracking-tight sm:text-lg">
        {value}
      </span>
      {delta && <span className="text-[10px] tabular-nums text-muted-foreground">{delta}</span>}
    </div>
  );
}

/** Vertical bars, one series, brand blue. Values 0–100 (sample). */
export function Bars({ values, highlight }: { values: number[]; highlight?: number }) {
  const w = 100;
  const h = 44;
  const gap = 2;
  const bw = (w - gap * (values.length - 1)) / values.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-16 w-full" aria-hidden="true" preserveAspectRatio="none">
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="#e5e9f0" strokeWidth="0.5" />
      ))}
      {values.map((v, i) => {
        const bh = (v / 100) * h;
        return (
          <rect
            key={i}
            x={i * (bw + gap)}
            y={h - bh}
            width={bw}
            height={bh}
            rx="1"
            fill={highlight === i ? "#1f63b5" : "#4a90e2"}
            opacity={highlight === undefined || highlight === i ? 1 : 0.55}
          />
        );
      })}
    </svg>
  );
}

/** Thin sparkline, one series. */
export function Spark({ points, className }: { points: number[]; className?: string }) {
  const w = 100;
  const h = 30;
  const step = w / (points.length - 1);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${i * step},${h - (p / 100) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-12 w-full", className)} aria-hidden="true" preserveAspectRatio="none">
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="#4a90e2" opacity="0.12" />
      <path d={d} fill="none" stroke="#1f63b5" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/** Horizontal bar row with a direct label. Value 0–100 (sample). */
export function HBar({ label, value, text }: { label: string; value: number; text: string }) {
  return (
    <div className="grid grid-cols-[72px_1fr_auto] items-center gap-2 text-xs sm:grid-cols-[88px_1fr_auto]">
      <span className="truncate text-muted-foreground">{label}</span>
      <span className="h-2.5 overflow-hidden rounded-sm bg-tint">
        <span className="block h-full rounded-sm bg-brand" style={{ width: `${value}%` }} />
      </span>
      <span className="tabular-nums text-muted-foreground">{text}</span>
    </div>
  );
}

/** Placeholder text line (skeleton). */
export function Line({ w = "100%", className }: { w?: string; className?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-tint-strong", className)} style={{ width: w }} aria-hidden="true" />;
}

/** Pill chip. */
export function Chip({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "brand" | "good" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
        tone === "neutral" && "bg-muted text-muted-foreground",
        tone === "brand" && "bg-tint text-primary",
        tone === "good" && "bg-emerald-50 text-emerald-700"
      )}
    >
      {children}
    </span>
  );
}
