"use client";

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode, type UIEvent } from "react";
import { cn } from "@/lib/utils";

export interface UseCaseTab {
  label: string;
  /** Optional line under the scene. Scenes that carry their own headline omit it. */
  caption?: string;
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
  const stripRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
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

  // Keep the selected tab in view when the tab bar itself scrolls (sm and up, when the tabs overflow).
  // Scrolls only the strip, sideways, and never on first render, so the page never moves.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const strip = stripRef.current;
    const tab = tabRefs.current[selected];
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth + 1) return;
    const pad = 16;
    const left = tab.getBoundingClientRect().left - strip.getBoundingClientRect().left + strip.scrollLeft;
    const right = left + tab.offsetWidth;
    if (left - pad < strip.scrollLeft) strip.scrollTo({ left: left - pad, behavior: "smooth" });
    else if (right + pad > strip.scrollLeft + strip.clientWidth)
      strip.scrollTo({ left: right + pad - strip.clientWidth, behavior: "smooth" });
  }, [selected]);

  // Below sm the track is as tall as its tallest panel, which leaves a gap under
  // short ones. Size it to the selected panel instead, and follow that panel's
  // height as it changes (fonts loading, bars animating in).
  useLayoutEffect(() => {
    const track = trackRef.current;
    const panel = track?.children[selected] as HTMLElement | undefined;
    if (!track || !panel) return;
    const fit = () => {
      const swipe = track.scrollWidth > track.clientWidth + 1;
      track.style.height = swipe ? `${panel.offsetHeight}px` : "";
    };
    fit();
    // Watch the panel only; observing the track would re-fire on our own height write.
    const ro = new ResizeObserver(fit);
    ro.observe(panel);
    const mq = window.matchMedia("(min-width: 640px)");
    mq.addEventListener("change", fit);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", fit);
    };
  }, [selected]);

  return (
    <div className="mt-8 grid min-w-0 gap-4">
      <div ref={stripRef} className="sm:overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div role="tablist" aria-label="Use cases" className="flex flex-wrap gap-2 sm:w-auto sm:flex-nowrap sm:border-b sm:border-tint-strong sm:pb-px">
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
                  "whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors",
                  "sm:-mb-px sm:rounded-none sm:rounded-t-lg sm:border-0 sm:border-b-2 sm:px-4 sm:py-2.5 sm:text-[0.95rem]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  on
                    ? "border-primary bg-primary text-white sm:border-brand sm:bg-transparent sm:text-primary"
                    : "border-tint-strong text-muted-foreground hover:text-foreground sm:border-transparent"
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
        className="-mx-4 flex items-start snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth transition-[height] duration-300 ease-out motion-reduce:transition-none sm:mx-0 sm:block sm:snap-none sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((t, i) => (
          <figure
            key={t.label}
            role="tabpanel"
            id={`${ID}-panel-${i}`}
            aria-labelledby={`${ID}-tab-${i}`}
            tabIndex={0}
            className={cn(
              "w-full shrink-0 snap-start px-4 pb-6 sm:px-0 sm:pb-0",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:rounded-3xl",
              i !== selected && "sm:hidden"
            )}
          >
            <div className="grid min-w-0 content-start gap-4 pt-4 sm:pt-8">
              {t.scene}
              {t.caption && <figcaption className="px-1 text-muted-foreground">{t.caption}</figcaption>}
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
