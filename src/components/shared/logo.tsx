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

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-brand font-display text-2xl font-semibold tracking-tight",
        className
      )}
    >
      <LogoMark className="h-8 w-8" />
      {SITE_NAME}
    </span>
  );
}
