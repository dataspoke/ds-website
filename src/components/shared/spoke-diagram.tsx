import { SPOKES } from "@/lib/constants";

const W = 720;
const H = 560;
const CX = 360;
const CY = 280;
const R = 215;

/** Hub-and-spoke diagram: the business in the middle, one spoke per area it runs on. */
export function SpokeDiagram({ hub = "Your business" }: { hub?: string }) {
  const nodes = SPOKES.map((name, i) => {
    const ang = ((-90 + i * (360 / SPOKES.length)) * Math.PI) / 180;
    const cos = Math.cos(ang);
    const sin = Math.sin(ang);
    const x = CX + R * cos;
    const y = CY + R * sin;
    const w = name.length * 8.2 + 28;
    const h = 34;
    const lx = x + 18 * cos;
    const ly = y + 18 * sin;
    const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
    const bx = anchor === "start" ? lx : anchor === "end" ? lx - w : lx - w / 2;
    const by = ly - h / 2 + (sin < -0.3 ? -8 : sin > 0.3 ? 8 : 0);
    return { name, x, y, w, h, bx, by };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Diagram: your business at the center, connected to sales, marketing, phone calls, meetings, operations, finance, customers and documents"
      className="block h-auto w-full"
    >
      {nodes.map((n) => (
        <line
          key={`l-${n.name}`}
          x1={CX}
          y1={CY}
          x2={n.x}
          y2={n.y}
          stroke="var(--tint-strong)"
          strokeWidth={3}
          className="spoke-line"
        />
      ))}
      {nodes.map((n) => (
        <g key={`n-${n.name}`}>
          <circle cx={n.x} cy={n.y} r={7} fill="var(--brand)" />
          <rect
            x={n.bx}
            y={n.by}
            width={n.w}
            height={n.h}
            rx={17}
            fill="var(--background)"
            stroke="var(--tint-strong)"
            strokeWidth={1.5}
          />
          <text
            x={n.bx + n.w / 2}
            y={n.by + n.h / 2 + 5}
            textAnchor="middle"
            fontSize={14}
            fontWeight={500}
            fill="var(--ink)"
            fontFamily="var(--font-inter), system-ui, sans-serif"
          >
            {n.name}
          </text>
        </g>
      ))}
      <circle cx={CX} cy={CY} r={66} fill="var(--brand)" />
      {hub.split(" ").map((word, i, all) => (
        <text
          key={word}
          x={CX}
          y={CY + (i - (all.length - 1) / 2) * 19 + 5}
          textAnchor="middle"
          fontSize={15}
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
