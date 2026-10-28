"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode, type UIEvent } from "react";
import { cn } from "@/lib/utils";

export interface UseCaseTab {
  label: string;
  caption: string;
  scene: ReactNode;
}

const ID = "use-case";

/**
 * One scene at a time. Desktop shows only the selected panel. Below sm the
 * panels sit in a horizontal scroll-snap track, so a swipe changes the tab
 * and a tab press scrolls the track.
 */
export function UseCaseTabs({ tabs }: { tabs: UseCaseTab[] }) {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  // Index a tab press is scrolling the track towards; scroll events are ignored until it lands.
  const target = useRef<number | null>(null);

  const select = (i: number, focus = false) => {
    const next = (i + tabs.length) % tabs.length;
    setSelected(next);
    if (focus) tabRefs.current[next]?.focus();
    const track = trackRef.current;
    if (track && track.scrollWidth > track.clientWidth + 1) {
      target.current = next;
      track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const keys: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  };

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const track = e.currentTarget;
    if (track.clientWidth === 0) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (target.current !== null) {
      if (i !== target.current) return;
      target.current = null;
    }
    setSelected(i);
  };

  // Keep the selected tab in view when the tab bar itself scrolls (narrow screens).
  useEffect(() => {
    tabRefs.current[selected]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [selected]);

  return (
    <div className="mt-8 grid min-w-0 gap-4">
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div role="tablist" aria-label="Use cases" className="flex w-max gap-2 border-b border-tint-strong pb-px sm:w-auto">
          {tabs.map((t, i) => {
            const on = i === selected;
            return (
              <button
                key={t.label}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${ID}-tab-${i}`}
                aria-selected={on}
                aria-controls={`${ID}-panel-${i}`}
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "-mb-px whitespace-nowrap rounded-t-lg border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors sm:px-4 sm:text-[0.95rem]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  on ? "border-brand text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="-mx-4 flex snap-x snap-mandatory overflow-x-auto scroll-smooth sm:mx-0 sm:block sm:snap-none sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((t, i) => (
          <figure
            key={t.label}
            role="tabpanel"
            id={`${ID}-panel-${i}`}
            aria-labelledby={`${ID}-tab-${i}`}
            tabIndex={0}
            className={cn(
              "w-full shrink-0 snap-start px-4 sm:px-0",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:rounded-3xl",
              i !== selected && "sm:hidden"
            )}
          >
            <div className="grid min-w-0 content-start gap-4 rounded-3xl border border-tint-strong bg-gradient-to-b from-white to-tint/60 p-4 sm:p-6">
              <div className="grid min-w-0 gap-2">
                <span className="max-w-full justify-self-end rounded-full bg-white px-2.5 py-0.5 text-center text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground ring-1 ring-tint-strong">
                  Illustrative example · sample data
                </span>
                {t.scene}
              </div>
              <figcaption className="px-1 text-muted-foreground">{t.caption}</figcaption>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
