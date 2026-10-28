"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SceneTab {
  /** Two-digit scene number, shown in the tab. */
  n: string;
  label: string;
  panel: React.ReactNode;
}

/**
 * One scene at a time. Desktop shows only the selected panel. Under 640px the
 * panels sit in a horizontal scroll-snap track, so a swipe changes the tab and
 * a tab press scrolls the track. Both stay in sync.
 */
export function SceneTabs({ tabs }: { tabs: SceneTab[] }) {
  const base = useId();
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const tabId = (i: number) => `${base}-tab-${i}`;
  const panelId = (i: number) => `${base}-panel-${i}`;

  /** Keep the selected tab visible inside a tab bar that scrolls sideways. */
  const revealTab = useCallback((i: number) => {
    const list = listRef.current;
    const tab = tabRefs.current[i];
    if (!list || !tab) return;
    const left = tab.offsetLeft - list.offsetLeft;
    const right = left + tab.offsetWidth;
    if (left < list.scrollLeft || right > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: left - 16, behavior: "smooth" });
    }
  }, []);

  /** Scroll the mobile track to a panel. On desktop the track does not scroll, so this is a no-op. */
  const scrollTrack = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  }, []);

  const select = useCallback(
    (i: number, focus = false) => {
      setSelected(i);
      scrollTrack(i);
      revealTab(i);
      if (focus) tabRefs.current[i]?.focus({ preventScroll: true });
    },
    [revealTab, scrollTrack]
  );

  // A swipe on the track updates the tab once the panel has settled on a snap point.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const w = track.clientWidth;
        if (!w || track.scrollWidth <= w) return;
        const i = Math.round(track.scrollLeft / w);
        if (Math.abs(track.scrollLeft - i * w) > 2) return; // still moving
        setSelected((prev) => {
          if (prev !== i) revealTab(i);
          return i;
        });
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [revealTab]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <div className="min-w-0">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Use cases"
        className="-mx-4 flex overflow-x-auto border-b border-border px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((t, i) => {
          const active = i === selected;
          return (
            <button
              key={t.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={tabId(i)}
              aria-selected={active}
              aria-controls={panelId(i)}
              tabIndex={active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "-mb-px flex shrink-0 items-baseline gap-2 whitespace-nowrap border-b-[3px] px-3 py-3 font-display text-[0.95rem] font-bold tracking-tight outline-none transition-[color,border-color] sm:px-5 sm:text-lg",
                "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-[-2px] focus-visible:outline-brand",
                active ? "border-brand text-ink" : "border-transparent text-ink/50 hover:text-ink"
              )}
            >
              <span className={cn("text-[0.7em] tabular-nums", active ? "text-brand" : "text-ink/40")}>{t.n}</span>
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        ref={trackRef}
        className="-mx-4 mt-6 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] sm:mx-0 sm:mt-8 sm:block sm:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((t, i) => {
          const active = i === selected;
          return (
            <div
              key={t.label}
              role="tabpanel"
              id={panelId(i)}
              aria-labelledby={tabId(i)}
              tabIndex={active ? 0 : -1}
              className={cn(
                "w-full min-w-0 shrink-0 snap-start px-4 outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-0",
                !active && "sm:hidden"
              )}
            >
              {t.panel}
            </div>
          );
        })}
      </div>
    </div>
  );
}
