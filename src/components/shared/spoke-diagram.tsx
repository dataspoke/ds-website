import { SPOKES } from "@/content/home";
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
      width={g.W}
      height={g.H}
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

interface ServiceGeometry {
  W: number;
  H: number;
  CX: number;
  CY: number;
  /** Distance from the centre to each spoke dot. */
  R: number;
  labelOffset: number;
  fontSize: number;
  charWidth: number;
  lineH: number;
  padX: number;
  padY: number;
  hubR: number;
  hubLabelFont: number;
  hubPillW: number;
  hubPillH: number;
  hubPillFont: number;
  strokeWidth: number;
  dotR: number;
}

// Four spokes on the diagonals, labels centred above (top row) or below (bottom row)
// each dot. Labels are two lines so the widest ("Implementation", 14 chars) stays
// narrow enough that the two pills in a row never touch, even on a phone.
const SERVICE_DESKTOP: ServiceGeometry = {
  W: 720,
  H: 520,
  CX: 360,
  CY: 260,
  R: 200,
  labelOffset: 16,
  fontSize: 15,
  charWidth: 8.6,
  lineH: 19,
  padX: 16,
  padY: 10,
  hubR: 104,
  hubLabelFont: 13,
  hubPillW: 124,
  hubPillH: 34,
  hubPillFont: 15,
  strokeWidth: 3,
  dotR: 7,
};

// Phone: dots sit ~110 units either side of centre. The widest pill is ~173 wide,
// so the pills span x = 27..421 and the two in a row stay apart.
const SERVICE_COMPACT: ServiceGeometry = {
  W: 448,
  H: 420,
  CX: 224,
  CY: 210,
  R: 156,
  labelOffset: 14,
  fontSize: 18,
  charWidth: 10.2,
  lineH: 22,
  padX: 15,
  padY: 10,
  hubR: 92,
  hubLabelFont: 15,
  hubPillW: 128,
  hubPillH: 36,
  hubPillFont: 18,
  strokeWidth: 3,
  dotR: 7,
};

export interface DiagramLine {
  label: string[];
  href: string;
}

/**
 * Services hub-and-spoke: data in the middle, holding the hub lines (Capture, Organize),
 * with one spoke per line that runs on it. Every label links to its line page.
 */
export function ServicesDiagram({
  hubLabel,
  hubs,
  spokes,
  compact = false,
  className,
}: {
  hubLabel: string;
  hubs: DiagramLine[];
  spokes: DiagramLine[];
  compact?: boolean;
  className?: string;
}) {
  const g = compact ? SERVICE_COMPACT : SERVICE_DESKTOP;
  const font = "var(--font-inter), system-ui, sans-serif";

  const nodes = spokes.map((spoke, i) => {
    const ang = ((-135 + i * (360 / spokes.length)) * Math.PI) / 180;
    const x = g.CX + g.R * Math.cos(ang);
    const y = g.CY + g.R * Math.sin(ang);
    const longest = Math.max(...spoke.label.map((l) => l.length));
    const w = longest * g.charWidth + g.padX * 2;
    const h = spoke.label.length * g.lineH + g.padY * 2;
    const by = Math.sin(ang) < 0 ? y - g.labelOffset - h : y + g.labelOffset;
    return { ...spoke, x, y, w, h, bx: x - w / 2, by };
  });

  // Hub: a small "YOUR DATA" label above a stack of white pills, centred as a block.
  const stackH = hubs.length * g.hubPillH + (hubs.length - 1) * 8;
  const blockH = g.hubLabelFont + 10 + stackH;
  const labelY = g.CY - blockH / 2 + g.hubLabelFont * 0.8;
  const pillsTop = g.CY - blockH / 2 + g.hubLabelFont + 10;

  return (
    <svg
      viewBox={`0 0 ${g.W} ${g.H}`}
      width={g.W}
      height={g.H}
      role="group"
      aria-label={`Diagram: ${hubLabel} at the center, holding ${hubs
        .map((h) => h.label.join(" "))
        .join(" and ")}, with spokes to ${spokes.map((s) => s.label.join(" ")).join(", ")}`}
      className={cn("block h-auto w-full", className)}
    >
      {nodes.map((n) => (
        <line
          key={`l-${n.href}`}
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
        <a key={`n-${n.href}`} href={n.href} className="group">
          <circle cx={n.x} cy={n.y} r={g.dotR} fill="var(--brand)" />
          <rect
            x={n.bx}
            y={n.by}
            width={n.w}
            height={n.h}
            rx={14}
            fill="var(--background)"
            stroke="var(--tint-strong)"
            strokeWidth={1.5}
            className="transition-colors group-hover:stroke-[var(--brand)]"
          />
          {n.label.map((line, li) => (
            <text
              key={line}
              x={n.x}
              y={n.by + g.padY + li * g.lineH + g.lineH * 0.72}
              textAnchor="middle"
              fontSize={g.fontSize}
              fontWeight={600}
              fill="var(--ink)"
              fontFamily={font}
            >
              {line}
            </text>
          ))}
        </a>
      ))}
      <circle cx={g.CX} cy={g.CY} r={g.hubR} fill="var(--brand)" />
      <text
        x={g.CX}
        y={labelY}
        textAnchor="middle"
        fontSize={g.hubLabelFont}
        fontWeight={700}
        letterSpacing="0.08em"
        fill="#ffffff"
        fontFamily="var(--font-jakarta), var(--font-inter), sans-serif"
      >
        {hubLabel.toUpperCase()}
      </text>
      {hubs.map((hub, i) => {
        const y = pillsTop + i * (g.hubPillH + 8);
        return (
          <a key={hub.href} href={hub.href} className="group">
            <rect
              x={g.CX - g.hubPillW / 2}
              y={y}
              width={g.hubPillW}
              height={g.hubPillH}
              rx={g.hubPillH / 2}
              fill="#ffffff"
              className="transition-opacity group-hover:opacity-90"
            />
            <text
              x={g.CX}
              y={y + g.hubPillH / 2 + g.hubPillFont * 0.35}
              textAnchor="middle"
              fontSize={g.hubPillFont}
              fontWeight={700}
              fill="var(--brand)"
              fontFamily={font}
            >
              {hub.label.join(" ")}
            </text>
          </a>
        );
      })}
    </svg>
  );
}
