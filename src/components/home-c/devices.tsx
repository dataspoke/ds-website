import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* One owner overview, drawn three times. Everything here is sample data */
/* and must stay identical across the three devices.                     */
/* ------------------------------------------------------------------ */

const KPIS = [
  { label: "Revenue (month)", value: "$84,200", delta: "+6%" },
  { label: "Leads", value: "132", delta: "+11" },
  { label: "Jobs (open / this week)", value: "47 / 12", delta: "" },
  { label: "Cash on hand", value: "$61,500", delta: "+$3.1k" },
];

/** Weekly revenue, last 12 weeks. Same series on every screen. */
const TREND = [52, 58, 55, 63, 61, 68, 72, 70, 78, 76, 81, 84];

const DESKTOP_JOBS = [
  ["Mon", "Harper St roof", "Crew A"],
  ["Tue", "Lakeside HVAC", "Crew B"],
  ["Wed", "Mill Rd fit-out", "Crew A"],
  ["Thu", "Quote: Dalton", "Nick"],
];

function Sparkline({ className, bars }: { className?: string; bars?: boolean }) {
  const w = 100;
  const h = 32;
  const max = Math.max(...TREND);
  const min = Math.min(...TREND) - 10;
  const pts = TREND.map((v, i) => {
    const x = (i / (TREND.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * (h - 2) - 1;
    return [x, y] as const;
  });
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `0,${h} ${line} ${w},${h}`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-8 w-full", className)}
    >
      {bars &&
        TREND.map((v, i) => (
          <rect
            key={i}
            x={(i / TREND.length) * w + 1.2}
            y={h - ((v - min) / (max - min)) * (h - 2) - 1}
            width={w / TREND.length - 2.4}
            height={((v - min) / (max - min)) * (h - 2) + 1}
            className="fill-brand/20"
          />
        ))}
      {!bars && <polygon points={area} className="fill-brand/15" />}
      <polyline
        points={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="text-brand"
      />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2" className="fill-brand" />
    </svg>
  );
}

/** Status bar row shared by both phones. Generic glyphs only. */
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-4 pt-2.5 text-[0.55rem] font-semibold text-white/80">
      <span>9:41</span>
      <span className="flex items-center gap-1" aria-hidden="true">
        <svg viewBox="0 0 12 10" className="h-2 w-2.5" fill="currentColor">
          <rect x="0" y="6" width="2" height="4" />
          <rect x="3.3" y="4" width="2" height="6" />
          <rect x="6.6" y="2" width="2" height="8" />
          <rect x="10" y="0" width="2" height="10" />
        </svg>
        <svg viewBox="0 0 20 10" className="h-2 w-4" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="0.6" y="0.6" width="16" height="8.8" rx="2" />
          <rect x="2" y="2" width="11" height="6" fill="currentColor" stroke="none" />
          <path d="M18 3.5v3" />
        </svg>
      </span>
    </div>
  );
}

/** Compact overview used on both phones. */
function PhoneOverview() {
  return (
    <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3 text-white">
      <p className="text-[0.55rem] font-bold uppercase tracking-[0.14em] text-brand">Owner overview</p>
      <p className="mt-0.5 text-[0.7rem] font-semibold">Today</p>

      <div className="mt-2.5 rounded-md bg-white/8 p-2.5">
        <p className="text-[0.52rem] text-white/60">{KPIS[0].label}</p>
        <p className="font-display text-[1.05rem] font-extrabold leading-none tracking-tight tabular-nums">
          {KPIS[0].value}
        </p>
        <Sparkline className="mt-1.5 h-7" />
      </div>

      <ul className="mt-2 grid gap-1.5">
        {KPIS.slice(1).map((k) => (
          <li key={k.label} className="flex items-baseline justify-between gap-2 rounded-md bg-white/8 px-2.5 py-1.5">
            <span className="min-w-0 truncate text-[0.52rem] text-white/60">{k.label}</span>
            <span className="shrink-0 text-[0.72rem] font-bold tabular-nums">{k.value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex justify-around pt-2.5 text-white/40" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={cn("h-1 w-5 rounded-full", i === 0 ? "bg-brand" : "bg-white/20")} />
        ))}
      </div>
    </div>
  );
}

/** Generic Android-style handset: squarer corners, centred punch-hole camera. */
function AndroidPhone() {
  return (
    <div className="relative mx-auto w-full max-w-[168px] rounded-[1.25rem] bg-[#1c2230] p-[5px] shadow-[0_12px_30px_-12px_rgba(15,30,51,0.5)] ring-1 ring-black/40">
      <span aria-hidden="true" className="absolute top-[22%] -right-[3px] h-9 w-[3px] rounded-r bg-[#2b3344]" />
      <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[0.95rem] bg-ink">
        <span aria-hidden="true" className="absolute top-2 left-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
        <StatusBar />
        <PhoneOverview />
      </div>
    </div>
  );
}

/** Generic iPhone-style handset: rounder corners, pill cut-out at the top. */
function IosPhone() {
  return (
    <div className="relative mx-auto w-full max-w-[168px] rounded-[2rem] bg-[#2a2f3a] p-[6px] shadow-[0_12px_30px_-12px_rgba(15,30,51,0.5)] ring-1 ring-black/40">
      <span aria-hidden="true" className="absolute top-[18%] -left-[3px] h-5 w-[3px] rounded-l bg-[#3a4050]" />
      <span aria-hidden="true" className="absolute top-[27%] -left-[3px] h-8 w-[3px] rounded-l bg-[#3a4050]" />
      <span aria-hidden="true" className="absolute top-[22%] -right-[3px] h-11 w-[3px] rounded-r bg-[#3a4050]" />
      <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[1.65rem] bg-ink">
        <span aria-hidden="true" className="absolute top-2 left-1/2 z-10 h-3.5 w-12 -translate-x-1/2 rounded-full bg-black" />
        <StatusBar />
        <PhoneOverview />
      </div>
    </div>
  );
}

/** Laptop dashboard: same four numbers, with a little more room for detail. */
function Laptop() {
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="rounded-t-xl bg-[#2a2f3a] p-[6px] pb-0 ring-1 ring-black/40">
        <div className="relative overflow-hidden rounded-t-lg bg-ink text-white">
          <span aria-hidden="true" className="absolute top-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
          <div className="grid grid-cols-[72px_1fr] sm:grid-cols-[96px_1fr]">
            {/* Sidebar */}
            <nav aria-hidden="true" className="border-r border-white/10 px-2.5 py-3 text-[0.55rem] font-semibold sm:px-3">
              <span className="block h-2 w-10 rounded-sm bg-brand" />
              <ul className="mt-3 grid gap-1.5 text-white/55">
                <li className="rounded-sm bg-white/10 px-1.5 py-1 text-white">Overview</li>
                <li className="px-1.5 py-1">Sales</li>
                <li className="px-1.5 py-1">Jobs</li>
                <li className="px-1.5 py-1">Money</li>
                <li className="px-1.5 py-1">Team</li>
              </ul>
            </nav>

            {/* Main */}
            <div className="min-w-0 p-3 sm:p-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-[0.55rem] font-bold uppercase tracking-[0.14em] text-brand">Owner overview</p>
                  <p className="text-[0.8rem] font-semibold">Today</p>
                </div>
                <span className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[0.55rem] font-semibold text-white/70">
                  Live · all locations
                </span>
              </div>

              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {KPIS.map((k) => (
                  <li key={k.label} className="min-w-0 rounded-md bg-white/8 p-2">
                    <p className="truncate text-[0.52rem] text-white/60">{k.label}</p>
                    <p className="mt-0.5 font-display text-[0.95rem] font-extrabold leading-none tracking-tight tabular-nums sm:text-[1.05rem]">
                      {k.value}
                    </p>
                    {k.delta && <p className="mt-1 text-[0.5rem] font-semibold text-emerald-300">{k.delta} vs last month</p>}
                  </li>
                ))}
              </ul>

              <div className="mt-3 grid gap-2 sm:grid-cols-[3fr_2fr]">
                <div className="rounded-md bg-white/8 p-2.5">
                  <div className="flex items-baseline justify-between text-[0.52rem]">
                    <span className="font-semibold text-white/80">Revenue, last 12 weeks</span>
                    <span className="text-white/50">weekly</span>
                  </div>
                  <Sparkline bars className="mt-2 h-14" />
                </div>
                <div className="rounded-md bg-white/8 p-2.5">
                  <p className="text-[0.52rem] font-semibold text-white/80">This week&rsquo;s jobs</p>
                  <ul className="mt-1.5 grid gap-1 text-[0.52rem]">
                    {DESKTOP_JOBS.map((j) => (
                      <li key={j[1]} className="grid grid-cols-[22px_1fr_auto] items-baseline gap-1.5">
                        <span className="text-white/45">{j[0]}</span>
                        <span className="truncate">{j[1]}</span>
                        <span className="text-white/45">{j[2]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Base / hinge */}
      <div className="h-2.5 rounded-b-[0.4rem] bg-[#3a4050] ring-1 ring-black/40 sm:h-3" aria-hidden="true">
        <span className="mx-auto block h-1 w-16 rounded-b bg-[#1c2230] sm:w-24" />
      </div>
    </div>
  );
}

/** One owner overview rendered on three devices. All figures are sample data. */
export function DevicesC() {
  return (
    <section id="any-screen" className="overflow-hidden border-t border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-12 md:items-end">
          <p className="eyebrow md:col-span-3">Custom software</p>
          <div className="md:col-span-9">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
              One view of your business, on any screen.
            </h2>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-snug text-muted-foreground">
              We build custom software that runs on phones and dashboards, so owners see the whole business
              wherever they are.
            </p>
          </div>
        </div>

        <figure className="mt-12 sm:mt-16">
          <div className="grid items-end gap-8 lg:grid-cols-[168px_168px_minmax(0,1fr)] lg:gap-10">
            <div className="grid grid-cols-2 gap-5 lg:contents">
              <AndroidPhone />
              <IosPhone />
            </div>
            <Laptop />
          </div>
          <figcaption className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Illustrative example · sample data
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
