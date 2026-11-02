"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import s from "./dash.module.css";

const InView = createContext(false);

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True once the element has scrolled into view; stays true after that. */
export function useInView<T extends Element>(threshold = 0.18) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

/**
 * Chart panel from prototype 6: one short title and one chart. Light by
 * default; variant="dark" brings back the near-black dashboard look. When it
 * scrolls into view (or its tab is shown) it sets data-in, which the CSS uses
 * to grow bars and fade rows in.
 */
export function DashPanel({ title, variant = "light", children }: { title: string; variant?: "light" | "dark"; children: ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={variant === "dark" ? `${s.panel} ${s.dark}` : s.panel} data-in={inView ? "" : undefined}>
      <div className={s.title}>{title}</div>
      <InView.Provider value={inView}>{children}</InView.Provider>
    </div>
  );
}

const FORMATS = {
  int: (v: number) => Math.round(v).toLocaleString("en-US"),
  pct: (v: number) => `${Math.round(v)}%`,
  /** Signed percent with a true minus sign. */
  spct: (v: number) => `${Math.round(v) < 0 ? "−" : ""}${Math.abs(Math.round(v))}%`,
  dur: (v: number) => `${Math.floor(Math.round(v) / 60)}m ${Math.round(v) % 60}s`,
  dec: (v: number) => v.toFixed(1),
  usd: (v: number) => `$${Math.round(v).toLocaleString("en-US")}`,
  /** Thousands of dollars, e.g. $873K. */
  usdK: (v: number) => `$${Math.round(v).toLocaleString("en-US")}K`,
};

/** Counts up from 0 to `to` once the surrounding panel is in view. Shows the final text otherwise. */
export function CountUp({ to, format, children }: { to: number; format: keyof typeof FORMATS; children: string }) {
  const inView = useContext(InView);
  const [text, setText] = useState(children);

  useEffect(() => {
    if (!inView || reducedMotion()) return;
    let raf = 0;
    let t0: number | null = null;
    const step = (ts: number) => {
      t0 ??= ts;
      const p = Math.min(1, (ts - t0) / 1300);
      setText(p < 1 ? FORMATS[format](to * (1 - Math.pow(1 - p, 3))) : children);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, format, children]);

  return <>{text}</>;
}
