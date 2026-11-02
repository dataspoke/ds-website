import type { SVGProps } from "react";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="5" fill="currentColor">
        <line x1="50" y1="50" x2="50" y2="10" />
        <line x1="50" y1="50" x2="85" y2="30" />
        <line x1="50" y1="50" x2="85" y2="70" />
        <line x1="50" y1="50" x2="50" y2="90" />
        <line x1="50" y1="50" x2="15" y2="70" />
        <line x1="50" y1="50" x2="15" y2="30" />
        <circle cx="50" cy="50" r="14" />
        <circle cx="50" cy="10" r="8" />
        <circle cx="85" cy="30" r="8" />
        <circle cx="85" cy="70" r="8" />
        <circle cx="50" cy="90" r="8" />
        <circle cx="15" cy="70" r="8" />
        <circle cx="15" cy="30" r="8" />
      </g>
    </svg>
  );
}

/** Wagon-wheel mark ("A · Floating spokes"): rim, hub and six short spokes between them. */
export function WheelMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle cx="24" cy="24" r="19.5" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="24" cy="24" r="4.6" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <line key={deg} x1="24" y1="15.2" x2="24" y2="9.2" transform={`rotate(${deg} 24 24)`} />
        ))}
      </g>
    </svg>
  );
}

export function Logo({ className, mark = "spoke" }: { className?: string; mark?: "spoke" | "wheel" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-brand font-display text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {mark === "wheel" ? <WheelMark className="h-8 w-8" /> : <LogoMark className="h-8 w-8" />}
      {SITE_NAME}
    </span>
  );
}
