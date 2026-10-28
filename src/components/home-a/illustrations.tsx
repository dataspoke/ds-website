import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const FONT = "var(--font-inter), system-ui, sans-serif";

/** Small line glyphs used on the hub-and-spoke scenes. Drawn in a 24-unit box. */
export const GLYPHS: Record<string, ReactNode> = {
  mail: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path d="M3.5 7.5 12 13l8.5-5.5" />
    </>
  ),
  phone: <path d="M6 3h4l1.5 4.5-2 1.5a10 10 0 0 0 5.5 5.5l1.5-2L21 14v4a2 2 0 0 1-2 2A15 15 0 0 1 4 5a2 2 0 0 1 2-2z" />,
  dollar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M15 9.5c0-1-1.3-1.8-3-1.8s-3 .8-3 1.9 1.2 1.6 3 1.9 3 .9 3 2-1.3 1.9-3 1.9-3-.8-3-1.8" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <rect x="6" y="11" width="3" height="7" rx="1" />
      <rect x="11" y="6" width="3" height="12" rx="1" />
      <rect x="16" y="9" width="3" height="9" rx="1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  chat: <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H6a2 2 0 0 1-2-2z" />,
  doc: (
    <>
      <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.5l2 11h10l2-7H7" />
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </>
  ),
  wrench: <path d="M14.5 4.5a5 5 0 0 0-5.3 6.6L3 17.3V21h3.7l6.2-6.2a5 5 0 0 0 6.6-5.3l-3 3-2.8-.7-.7-2.8z" />,
  repeat: (
    <>
      <path d="M4 10a7 7 0 0 1 12-4.5L19 8" />
      <path d="M19 3v5h-5M20 14a7 7 0 0 1-12 4.5L5 16" />
      <path d="M5 21v-5h5" />
    </>
  ),
};

export function Glyph({
  name,
  x,
  y,
  size = 24,
  stroke = "var(--brand)",
}: {
  name: keyof typeof GLYPHS;
  x: number;
  y: number;
  size?: number;
  stroke?: string;
}) {
  const s = size / 24;
  return (
    <g
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${s})`}
      fill="none"
      stroke={stroke}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {GLYPHS[name]}
    </g>
  );
}

/** The DataSpoke mark as a scalable group, drawn on white. */
function HubMark({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const s = r / 50;
  return (
    <g transform={`translate(${cx - r} ${cy - r}) scale(${s})`} stroke="#fff" fill="#fff">
      <g strokeWidth="5">
        <line x1="50" y1="50" x2="50" y2="14" />
        <line x1="50" y1="50" x2="81" y2="32" />
        <line x1="50" y1="50" x2="81" y2="68" />
        <line x1="50" y1="50" x2="50" y2="86" />
        <line x1="50" y1="50" x2="19" y2="68" />
        <line x1="50" y1="50" x2="19" y2="32" />
      </g>
      <circle cx="50" cy="50" r="13" />
      {[
        [50, 14],
        [81, 32],
        [81, 68],
        [50, 86],
        [19, 68],
        [19, 32],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7" />
      ))}
    </g>
  );
}

const HERO_SPOKES: { name: string; glyph: keyof typeof GLYPHS }[] = [
  { name: "Sales", glyph: "users" },
  { name: "Marketing", glyph: "mail" },
  { name: "Phones", glyph: "phone" },
  { name: "Calendar", glyph: "calendar" },
  { name: "Operations", glyph: "truck" },
  { name: "Finance", glyph: "dollar" },
  { name: "Customers", glyph: "chat" },
  { name: "Documents", glyph: "doc" },
];

/**
 * Hero: the business as a hub with eight tool spokes, on a soft blue gradient.
 * Pure SVG so it scales from 390px to desktop with no asset files.
 */
export function HeroIllustration({ className }: { className?: string }) {
  const W = 720;
  const H = 560;
  const CX = 360;
  const CY = 280;
  const R = 205;
  const nodeR = 36;
  const nodes = HERO_SPOKES.map((s, i) => {
    const ang = ((-90 + i * 45) * Math.PI) / 180;
    const x = CX + R * Math.cos(ang);
    const y = CY + R * Math.sin(ang);
    const sin = Math.sin(ang);
    const cos = Math.cos(ang);
    // Labels sit outside the ring: below for the lower half, above for the upper, beside on the axis.
    const lx = x + (Math.abs(sin) < 0.3 ? cos * (nodeR + 12) : 0);
    const ly =
      Math.abs(sin) < 0.3 ? y : sin > 0 ? y + nodeR + 20 : y - nodeR - 11;
    const anchor: "start" | "end" | "middle" =
      Math.abs(sin) < 0.3 ? (cos > 0 ? "start" : "end") : "middle";
    return { ...s, x, y, lx, ly, anchor };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Illustration: your business at the center, with spokes to sales, marketing, phones, calendar, operations, finance, customers and documents"
      className={cn("block h-auto w-full", className)}
    >
      <defs>
        <radialGradient id="hero-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#d6e6f8" />
          <stop offset="60%" stopColor="#eef5fc" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-hub" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5f9ee8" />
          <stop offset="100%" stopColor="#2f78cf" />
        </linearGradient>
        <filter id="hero-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1f63b5" floodOpacity="0.14" />
        </filter>
      </defs>
      <circle cx={CX} cy={CY} r={290} fill="url(#hero-glow)" />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#fff" strokeWidth={1.5} strokeDasharray="4 8" opacity={0.9} />
      {nodes.map((n) => (
        <line
          key={`l-${n.name}`}
          x1={CX}
          y1={CY}
          x2={n.x}
          y2={n.y}
          stroke="var(--brand)"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.55}
          className="spoke-line"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={`p-${n.name}`} cx={n.x} cy={n.y} r={4} fill="var(--brand)">
          <animateMotion
            dur={`${3.2 + (i % 3) * 0.6}s`}
            repeatCount="indefinite"
            begin={`${i * 0.4}s`}
            path={`M0 0 L${CX - n.x} ${CY - n.y}`}
          />
        </circle>
      ))}
      {nodes.map((n) => (
        <g key={`n-${n.name}`}>
          <circle cx={n.x} cy={n.y} r={nodeR} fill="#fff" filter="url(#hero-shadow)" />
          <Glyph name={n.glyph} x={n.x} y={n.y} size={30} />
          <text
            x={n.lx}
            y={n.ly}
            textAnchor={n.anchor}
            fontSize={15}
            fontWeight={600}
            fill="var(--ink)"
            fontFamily={FONT}
          >
            {n.name}
          </text>
        </g>
      ))}
      <circle cx={CX} cy={CY} r={78} fill="url(#hero-hub)" filter="url(#hero-shadow)" />
      <circle cx={CX} cy={CY} r={92} fill="none" stroke="var(--brand)" strokeWidth={2} opacity={0.35} />
      <HubMark cx={CX} cy={CY - 10} r={34} />
      <text
        x={CX}
        y={CY + 46}
        textAnchor="middle"
        fontSize={14}
        fontWeight={700}
        fill="#fff"
        fontFamily="var(--font-jakarta), var(--font-inter), sans-serif"
      >
        Your business
      </text>
    </svg>
  );
}
