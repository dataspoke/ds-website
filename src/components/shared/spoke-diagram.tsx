import { SPOKES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Geometry {
  W: number;
  H: number;
  CX: number;
  CY: number;
  R: number;
  /** How far the label sits beyond the dot, along the spoke. */
  labelOffset: number;
  fontSize: number;
  charWidth: number;
  pillH: number;
  hubR: number;
  hubFont: number;
  hubLine: number;
  strokeWidth: number;
  dotR: number;
  /** Desktop anchors labels start/end beside the dot; compact centres them on it. */
  centred: boolean;
}

const DESKTOP: Geometry = {
  W: 720,
  H: 560,
  CX: 360,
  CY: 280,
  R: 215,
  labelOffset: 18,
  fontSize: 14,
  charWidth: 8.2,
  pillH: 34,
  hubR: 66,
  hubFont: 15,
  hubLine: 19,
  strokeWidth: 3,
  dotR: 7,
  centred: false,
};

// Phone version: bigger type relative to the viewBox so labels stay ~14px at 390px wide.
// W is 448 (not 420) because "Phone calls" and "Customers" sit on the horizontal axis:
// with labels centred 30 units past the dot their pills span x = 17..441, so 420 would clip.
// H is 400: pills span y = 32..368.
const COMPACT: Geometry = {
  W: 448,
  H: 400,
  CX: 224,
  CY: 200,
  R: 118,
  labelOffset: 30,
  fontSize: 18,
  charWidth: 10,
  pillH: 40,
  hubR: 60,
  hubFont: 19,
  hubLine: 23,
  strokeWidth: 3,
  dotR: 7,
  centred: true,
};

/** Hub-and-spoke diagram: the business in the middle, one spoke per area it runs on. */
export function SpokeDiagram({
  hub = "Your business",
  compact = false,
  className,
}: {
  hub?: string;
  compact?: boolean;
  className?: string;
}) {
  const g = compact ? COMPACT : DESKTOP;

  const nodes = SPOKES.map((name, i) => {
    const ang = ((-90 + i * (360 / SPOKES.length)) * Math.PI) / 180;
    const cos = Math.cos(ang);
    const sin = Math.sin(ang);
    const x = g.CX + g.R * cos;
    const y = g.CY + g.R * sin;
    const w = name.length * g.charWidth + 28;
    const h = g.pillH;
    const lx = x + g.labelOffset * cos;
    const ly = y + g.labelOffset * sin;
    if (g.centred) {
      return { name, x, y, w, h, bx: lx - w / 2, by: ly - h / 2 };
    }
    const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
    const bx = anchor === "start" ? lx : anchor === "end" ? lx - w : lx - w / 2;
    const by = ly - h / 2 + (sin < -0.3 ? -8 : sin > 0.3 ? 8 : 0);
    return { name, x, y, w, h, bx, by };
  });

  return (
    <svg
      viewBox={`0 0 ${g.W} ${g.H}`}
      role="img"
      aria-label="Diagram: your business at the center, connected to sales, marketing, phone calls, meetings, operations, finance, customers and documents"
      className={cn("block h-auto w-full", className)}
    >
      {nodes.map((n) => (
        <line
          key={`l-${n.name}`}
          x1={g.CX}
          y1={g.CY}
          x2={n.x}
          y2={n.y}
          stroke="var(--tint-strong)"
          strokeWidth={g.strokeWidth}
          className="spoke-line"
        />
      ))}
      {nodes.map((n) => (
        <g key={`n-${n.name}`}>
          <circle cx={n.x} cy={n.y} r={g.dotR} fill="var(--brand)" />
          <rect
            x={n.bx}
            y={n.by}
            width={n.w}
            height={n.h}
            rx={n.h / 2}
            fill="var(--background)"
            stroke="var(--tint-strong)"
            strokeWidth={1.5}
          />
          <text
            x={n.bx + n.w / 2}
            y={n.by + n.h / 2 + g.fontSize * 0.35}
            textAnchor="middle"
            fontSize={g.fontSize}
            fontWeight={500}
            fill="var(--ink)"
            fontFamily="var(--font-inter), system-ui, sans-serif"
          >
            {n.name}
          </text>
        </g>
      ))}
      <circle cx={g.CX} cy={g.CY} r={g.hubR} fill="var(--brand)" />
      {hub.split(" ").map((word, i, all) => (
        <text
          key={word}
          x={g.CX}
          y={g.CY + (i - (all.length - 1) / 2) * g.hubLine + g.hubFont / 3}
          textAnchor="middle"
          fontSize={g.hubFont}
          fontWeight={700}
          fill="#ffffff"
          fontFamily="var(--font-jakarta), var(--font-inter), sans-serif"
        >
          {word}
        </text>
      ))}
    </svg>
  );
}
