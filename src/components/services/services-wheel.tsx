import { WheelMark } from "@/components/shared/logo";
import { SERVICE_LINES, SERVICE_PIPELINE, SERVICES_PAGE } from "@/content/services";
import { cn } from "@/lib/utils";
import { LINE_ICONS } from "./line-icons";

const W = 680;
const H = 640;
const CX = W / 2;
const CY = H / 2;
const RIM = 210; // rim radius; the service nodes sit on it
const HUB = 74;
const NODE = 38;
const DISPLAY = "var(--font-jakarta), var(--font-inter), sans-serif";

const TITLES = Object.fromEntries(SERVICE_LINES.map((l) => [l.slug, l.title]));
const FOUNDATION = new Set(SERVICE_LINES.filter((l) => l.kind === "hub").map((l) => l.slug));

/** Six spokes clockwise from the top, in build order, like the logo's six spokes. */
const NODES = SERVICE_PIPELINE.map((p, i) => {
  const ang = ((-90 + i * 60) * Math.PI) / 180;
  const cos = Math.cos(ang);
  const sin = Math.sin(ang);
  const beside = Math.abs(sin) < 0.6; // the four side nodes label beside, top and bottom label above/below
  return {
    ...p,
    title: TITLES[p.slug],
    foundation: FOUNDATION.has(p.slug),
    Icon: LINE_ICONS[p.slug],
    cos,
    sin,
    x: CX + RIM * cos,
    y: CY + RIM * sin,
    lx: CX + RIM * cos + (beside ? cos * (NODE + 14) : 0),
    ly: CY + RIM * sin + (beside ? 7 : sin < 0 ? -NODE - 16 : NODE + 30),
    anchor: (beside ? (cos > 0 ? "start" : "end") : "middle") as "start" | "end" | "middle",
  };
});

/**
 * /services hero graphic drawn as the DataSpoke wheel: a thick rim, "Your data"
 * at the hub and one floating spoke per service, with a service node on the rim.
 * Foundation services are filled; the rest are white. Each node links to its page.
 */
export function ServicesWheel({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("block h-auto w-full overflow-visible", className)}
      aria-labelledby="services-wheel-title"
    >
      <title id="services-wheel-title">
        The six DataSpoke services as spokes of one wheel, with your data at the hub
      </title>
      <defs>
        <radialGradient id="sw-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d6e6f8" />
          <stop offset="65%" stopColor="#eef5fc" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sw-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6aa8ee" />
          <stop offset="100%" stopColor="#1f63b5" />
        </linearGradient>
        {/* User-space gradient for the spokes: a bounding-box gradient vanishes on the straight vertical ones. */}
        <linearGradient id="sw-spoke" gradientUnits="userSpaceOnUse" x1={CX - RIM} y1={CY - RIM} x2={CX + RIM} y2={CY + RIM}>
          <stop offset="0%" stopColor="#6aa8ee" />
          <stop offset="100%" stopColor="#1f63b5" />
        </linearGradient>
        <filter id="sw-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1f63b5" floodOpacity="0.18" />
        </filter>
      </defs>

      <circle cx={CX} cy={CY} r={RIM + 100} fill="url(#sw-glow)" />

      {/* Slow dashed orbit outside the rim. */}
      <g
        className="animate-[spin_80s_linear_infinite] motion-reduce:animate-none"
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      >
        <circle cx={CX} cy={CY} r={RIM + 58} fill="none" stroke="var(--brand)" strokeWidth={2} strokeDasharray="2 14" strokeLinecap="round" opacity={0.45} />
      </g>

      {/* Rim, like the logo's. */}
      <circle cx={CX} cy={CY} r={RIM} fill="none" stroke="url(#sw-blue)" strokeWidth={18} />
      <circle cx={CX} cy={CY} r={RIM - 22} fill="none" stroke="#fff" strokeWidth={1.5} strokeDasharray="4 8" opacity={0.9} />

      {/* Floating spokes: they stop short of the hub and the rim, as in the mark. */}
      {NODES.map((n) => {
        const a = HUB + 22;
        const b = RIM - 34;
        return (
          <line
            key={`s-${n.slug}`}
            x1={CX + a * n.cos}
            y1={CY + a * n.sin}
            x2={CX + b * n.cos}
            y2={CY + b * n.sin}
            stroke="url(#sw-spoke)"
            strokeWidth={14}
            strokeLinecap="round"
          />
        );
      })}

      {/* Data travelling out from the hub along each spoke. */}
      {NODES.map((n, i) => (
        <circle key={`d-${n.slug}`} r={5} fill="#fff" className="motion-reduce:hidden">
          <animateMotion
            dur={`${2.6 + (i % 3) * 0.5}s`}
            begin={`${i * 0.35}s`}
            repeatCount="indefinite"
            path={`M${CX + (HUB + 22) * n.cos} ${CY + (HUB + 22) * n.sin} L${CX + (RIM - 34) * n.cos} ${CY + (RIM - 34) * n.sin}`}
          />
        </circle>
      ))}

      {/* Hub. */}
      <circle cx={CX} cy={CY} r={HUB + 12} fill="none" stroke="var(--brand)" strokeWidth={2} opacity={0.35} />
      <circle cx={CX} cy={CY} r={HUB} fill="url(#sw-blue)" filter="url(#sw-shadow)" />
      <WheelMark x={CX - 28} y={CY - 42} width={56} height={56} color="#fff" />
      <text x={CX} y={CY + 38} textAnchor="middle" fontSize={17} fontWeight={800} fill="#fff" fontFamily={DISPLAY}>
        {SERVICES_PAGE.diagramHub}
      </text>

      {/* Service nodes on the rim, each a link to its page. */}
      {NODES.map((n) => (
        <a key={`n-${n.slug}`} href={`/services/${n.slug}`} aria-label={`${n.verb}: ${n.title}`} className="group outline-none">
          <circle
            cx={n.x}
            cy={n.y}
            r={NODE}
            fill={n.foundation ? "var(--primary)" : "#fff"}
            stroke="#fff"
            strokeWidth={5}
            filter="url(#sw-shadow)"
            className="transition-[r] duration-200 group-hover:[r:42px] group-focus-visible:[r:42px] motion-reduce:transition-none"
          />
          <n.Icon
            x={n.x - 16}
            y={n.y - 16}
            width={32}
            height={32}
            strokeWidth={2.1}
            color={n.foundation ? "#fff" : "var(--primary)"}
            aria-hidden="true"
          />
          <text
            x={n.lx}
            y={n.ly}
            textAnchor={n.anchor}
            fontSize={24}
            fontWeight={800}
            fill="var(--ink)"
            fontFamily={DISPLAY}
            className="group-hover:fill-[var(--primary)] group-focus-visible:fill-[var(--primary)]"
          >
            {n.verb}
          </text>
        </a>
      ))}
    </svg>
  );
}
