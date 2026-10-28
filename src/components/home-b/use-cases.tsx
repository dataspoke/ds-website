"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type UIEvent } from "react";
import { Funnel, Headset, Megaphone, PiggyBank } from "lucide-react";
import { Section, SectionHead } from "@/components/shared/section";
import { cn } from "@/lib/utils";
import { FinanceScene, FunnelScene, MarketingScene, ServiceScene } from "./scenes";

const TABS = [
  { key: "marketing", label: "Sales & Marketing", icon: Megaphone, Scene: MarketingScene },
  { key: "operations", label: "Operations", icon: Funnel, Scene: FunnelScene },
  { key: "finance", label: "Finance", icon: PiggyBank, Scene: FinanceScene },
  { key: "service", label: "Customer Service", icon: Headset, Scene: ServiceScene },
];

const MOBILE = "(max-width: 639px)";

/**
 * One tabbed component, one scene at a time. Scenes are illustrative mockups
 * with sample data. Below the sm breakpoint the panels sit in a horizontal
 * scroll-snap track, so swiping and the tab bar stay in sync both ways.
 * On wider screens only the selected panel is shown.
 */
export function UseCasesB() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  /** Panel index a programmatic scroll is heading for; scroll events are ignored until it arrives. */
  const scrollTarget = useRef<number | null>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const select = useCallback((i: number, focus = false) => {
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  }, []);

  // Tab -> track: scroll the mobile track to the selected panel, and keep the
  // selected tab in view when the tab bar itself scrolls horizontally.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !window.matchMedia(MOBILE).matches) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

    const tab = tabRefs.current[active];
    const bar = tab?.parentElement;
    if (tab && bar) {
      const tabLeft = tab.getBoundingClientRect().left - bar.getBoundingClientRect().left + bar.scrollLeft;
      const min = tabLeft + tab.offsetWidth - bar.clientWidth;
      const max = tabLeft;
      if (bar.scrollLeft < min) bar.scrollTo({ left: min, behavior });
      else if (bar.scrollLeft > max) bar.scrollTo({ left: max, behavior });
    }

    const left = active * track.clientWidth;
    if (Math.abs(track.scrollLeft - left) < 2) return;
    scrollTarget.current = active;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      scrollTarget.current = null;
    }, 1200);
    track.scrollTo({ left, behavior });
  }, [active]);

  useEffect(
    () => () => {
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    },
    []
  );

  // Track -> tab: a swipe that lands on another panel selects its tab.
  const onTrackScroll = (e: UIEvent<HTMLDivElement>) => {
    const track = e.currentTarget;
    if (!track.clientWidth) return;
    const i = Math.max(0, Math.min(TABS.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
    if (scrollTarget.current !== null) {
      if (i === scrollTarget.current) scrollTarget.current = null;
      return;
    }
    if (i !== active) setActive(i);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = TABS.length - 1;
    let next: number | null = null;
    switch (e.key) {
      case "ArrowRight":
        next = active === last ? 0 : active + 1;
        break;
      case "ArrowLeft":
        next = active === 0 ? last : active - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
    }
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <Section id="use-cases" tint className="overflow-x-clip">
      <SectionHead eyebrow="Where it shows up" title="What this looks like in your business." />
      <div
        role="tablist"
        aria-label="Use cases"
        onKeyDown={onKeyDown}
        className="mt-8 flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0"
      >
        {TABS.map((t, i) => (
          <button
            key={t.key}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`${id}-tab-${i}`}
            type="button"
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => select(i)}
            className={cn(
              "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border px-3 py-2.5 text-left text-sm font-semibold transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-tint",
              active === i
                ? "border-brand bg-background text-primary shadow-sm"
                : "border-transparent bg-background/60 text-muted-foreground hover:bg-background"
            )}
          >
            <t.icon className="size-4 shrink-0" aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>
      <div
        ref={trackRef}
        onScroll={onTrackScroll}
        className="mt-4 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain pt-4 pb-6 sm:block sm:snap-none sm:overflow-visible sm:pb-0"
      >
        {TABS.map((t, i) => (
          <div
            key={t.key}
            role="tabpanel"
            id={`${id}-panel-${i}`}
            aria-labelledby={`${id}-tab-${i}`}
            className={cn("w-full min-w-0 shrink-0 snap-center snap-always", active !== i && "sm:hidden")}
          >
            <div className="max-sm:px-0.5">
              <t.Scene />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
