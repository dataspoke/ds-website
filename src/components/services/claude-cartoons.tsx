import type { ReactNode } from "react";

/**
 * Cartoon pictures for the later journey steps: the skills library, the team's
 * learning loop, and the CLAUDE.md that holds business context and guardrails.
 * Flat shapes, ink outlines and an offset shadow, in the brand colours.
 * All drawn on a 480 x 360 canvas so they fill the same 4:3 frame as the screenshots.
 */

const INK = "var(--ink)";
const BRAND = "var(--brand)";
const PRIMARY = "#1f63b5";
const TINT = "var(--tint)";
const LINE = "#e5e9f0";
const SANS = "var(--font-inter), system-ui, sans-serif";
const DISPLAY = "var(--font-jakarta), var(--font-inter), sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

function Canvas({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label={label} className="block h-auto w-full">
      <rect width="480" height="360" fill={TINT} />
      {/* soft dots in the background */}
      {[
        [34, 40],
        [446, 52],
        [420, 318],
        [52, 300],
        [250, 22],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill={BRAND} opacity="0.25" />
      ))}
      {children}
    </svg>
  );
}

/** A white card with an ink outline and a solid offset shadow. */
function Card({ x, y, w, h, shadow = BRAND, r = 16 }: { x: number; y: number; w: number; h: number; shadow?: string; r?: number }) {
  return (
    <>
      <rect x={x + 8} y={y + 8} width={w} height={h} rx={r} fill={shadow} stroke={INK} strokeWidth="3" />
      <rect x={x} y={y} width={w} height={h} rx={r} fill="#fff" stroke={INK} strokeWidth="3" />
    </>
  );
}

function Check({ x, y, r = 11 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={BRAND} stroke={INK} strokeWidth="2.5" />
      <path d="M-5 0.5 L-1.5 4 L5.5 -4" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Cross({ x, y, r = 11 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#fff" stroke={INK} strokeWidth="2.5" />
      <path d="M-4.5 -4.5 L4.5 4.5 M4.5 -4.5 L-4.5 4.5" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Hand({ x, y, r = 11 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={INK} stroke={INK} strokeWidth="2.5" />
      {/* a pause sign: work stops here for a person */}
      <rect x="-4.5" y="-5" width="3" height="10" rx="1.2" fill="#fff" />
      <rect x="1.5" y="-5" width="3" height="10" rx="1.2" fill="#fff" />
    </g>
  );
}

/** Claude's sparkle mark, drawn simply. */
function Sparkle({ x, y, s = 1, fill = "#fff" }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -10 C1.5 -3 3 -1.5 10 0 C3 1.5 1.5 3 0 10 C-1.5 3 -3 1.5 -10 0 C-3 -1.5 -1.5 -3 0 -10 Z"
      fill={fill}
    />
  );
}

/** A friendly round person: head, shoulders, two dot eyes and a smile. */
function Person({ x, y, shirt = PRIMARY, flip = false }: { x: number; y: number; shirt?: string; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <path d="M-34 56 C-34 26 -18 16 0 16 C18 16 34 26 34 56 Z" fill={shirt} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="0" cy="-8" r="22" fill="#fff" stroke={INK} strokeWidth="3" />
      <path d="M-22 -14 C-18 -32 14 -34 22 -14 C12 -22 -8 -24 -22 -14 Z" fill={INK} />
      <circle cx="-7" cy="-6" r="2.6" fill={INK} />
      <circle cx="8" cy="-6" r="2.6" fill={INK} />
      <path d="M-7 4 Q1 10 9 4" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

function Bubble({ x, y, w, text, tail = "left" }: { x: number; y: number; w: number; text: string; tail?: "left" | "right" }) {
  const tx = tail === "left" ? x + 22 : x + w - 22;
  return (
    <g>
      <rect x={x} y={y} width={w} height="38" rx="19" fill="#fff" stroke={INK} strokeWidth="3" />
      <path d={`M${tx - 8} ${y + 36} L${tx + (tail === "left" ? -10 : 10)} ${y + 52} L${tx + 8} ${y + 36}`} fill="#fff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x={tx - 9} y={y + 30} width="18" height="7" fill="#fff" />
      <text x={x + w / 2} y={y + 24.5} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} fontFamily={DISPLAY}>
        {text}
      </text>
    </g>
  );
}

/** Step 3: a skills library, one saved skill per repeating job, with room for the next one. */
export function SkillsLibraryCartoon({ label }: { label: string }) {
  const skills: { name: string; note: string; on?: boolean }[] = [
    { name: "month-end", note: "Close the books", on: true },
    { name: "weekly-report", note: "Monday numbers" },
    { name: "client-intake", note: "New client setup" },
    { name: "invoice-chase", note: "Late invoices" },
    { name: "morning-brief", note: "Today at a glance" },
  ];
  const at = (i: number) => ({ x: 40 + (i % 2) * 160, y: 104 + Math.floor(i / 2) * 66 });
  return (
    <Canvas label={label}>
      <Card x={24} y={40} w={336} h={282} />
      <path d="M24 86 V56 a16 16 0 0 1 16 -16 H344 a16 16 0 0 1 16 16 V86 Z" fill={PRIMARY} stroke={INK} strokeWidth="3" />
      {/* a closed book: the library */}
      <g transform="translate(50 63)">
        <rect x="-11" y="-11" width="22" height="22" rx="3" fill="#fff" />
        <rect x="-11" y="-11" width="6" height="22" rx="2" fill={BRAND} />
      </g>
      <text x={72} y={69} fontSize="17" fontWeight="800" fill="#fff" fontFamily={DISPLAY}>
        Skills library
      </text>
      {skills.map((k, i) => {
        const { x, y } = at(i);
        return (
          <g key={k.name}>
            <rect x={x} y={y} width={144} height={54} rx="10" fill={k.on ? BRAND : "#fff"} stroke={INK} strokeWidth="2.5" />
            <circle cx={x + 18} cy={y + 18} r="9" fill={k.on ? "#fff" : TINT} stroke={INK} strokeWidth="2" />
            <Sparkle x={x + 18} y={y + 18} s={0.55} fill={k.on ? BRAND : PRIMARY} />
            <text x={x + 34} y={y + 22.5} fontSize="12.5" fontWeight="700" fill={k.on ? "#fff" : INK} fontFamily={MONO}>
              {k.name}
            </text>
            <text x={x + 12} y={y + 43} fontSize="12" fontWeight="500" fill={k.on ? "#fff" : INK} opacity={k.on ? 1 : 0.7} fontFamily={SANS}>
              {k.note}
            </text>
          </g>
        );
      })}
      {/* the empty slot: the next skill your team adds */}
      <rect x={200} y={236} width={144} height={54} rx="10" fill="none" stroke={PRIMARY} strokeWidth="2.5" strokeDasharray="7 6" />
      <text x={272} y={268} textAnchor="middle" fontSize="14" fontWeight="700" fill={PRIMARY} fontFamily={DISPLAY}>
        + New skill
      </text>
      <Person x={418} y={262} />
      <Bubble x={366} y={150} w={104} text="Reuse it!" tail="left" />
    </Canvas>
  );
}

/** Step 4: the learning loop. The team runs the work, spots a change, updates the skill with a person's OK, and teaches it on. */
export function LearningLoopCartoon({ label }: { label: string }) {
  const cx = 240;
  const cy = 184;
  const rx = 150;
  const ry = 112;
  const nodes = [
    { n: 1, text: "Run the skill", x: cx, y: cy - ry },
    { n: 2, text: "Spot a change", x: cx + rx, y: cy },
    { n: 3, text: "Update and approve", x: cx, y: cy + ry },
    { n: 4, text: "Teach the team", x: cx - rx, y: cy },
  ];
  // arrowheads halfway between nodes, pointing clockwise along the loop
  const arrows = [-45, 45, 135, 225].map((deg) => {
    const t = (deg * Math.PI) / 180;
    const x = cx + rx * Math.cos(t);
    const y = cy + ry * Math.sin(t);
    const angle = (Math.atan2(ry * Math.cos(t), -rx * Math.sin(t)) * 180) / Math.PI;
    return { x, y, angle };
  });
  return (
    <Canvas label={label}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={BRAND} strokeWidth="5" strokeDasharray="2 12" strokeLinecap="round" />
      {arrows.map((a) => (
        <path
          key={a.angle}
          transform={`translate(${a.x} ${a.y}) rotate(${a.angle})`}
          d="M-9 -11 L11 0 L-9 11 L-3 0 Z"
          fill={PRIMARY}
          stroke={INK}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      ))}
      {/* the team in the middle of the loop */}
      <Person x={208} y={176} shirt={BRAND} />
      <Person x={272} y={176} shirt={PRIMARY} flip />
      <text x={cx} y={258} textAnchor="middle" fontSize="14" fontWeight="800" fill={INK} fontFamily={DISPLAY}>
        Your team
      </text>
      {nodes.map((d) => {
        const w = 44 + d.text.length * 7.6;
        const x = d.x - w / 2;
        return (
          <g key={d.n}>
            <rect x={x + 5} y={d.y - 18 + 5} width={w} height={36} rx="18" fill={BRAND} stroke={INK} strokeWidth="2.5" />
            <rect x={x} y={d.y - 18} width={w} height={36} rx="18" fill="#fff" stroke={INK} strokeWidth="2.5" />
            <circle cx={x + 18} cy={d.y} r="11" fill={PRIMARY} stroke={INK} strokeWidth="2" />
            <text x={x + 18} y={d.y + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#fff" fontFamily={DISPLAY}>
              {d.n}
            </text>
            <text x={x + 35} y={d.y + 5} fontSize="14" fontWeight="700" fill={INK} fontFamily={SANS}>
              {d.text}
            </text>
          </g>
        );
      })}
    </Canvas>
  );
}

/** Step 5: the CLAUDE.md page: what Claude knows about the business, then what it may and may not do. */
export function ClaudeMdCartoon({ label }: { label: string }) {
  const rules: { icon: "check" | "cross" | "hand"; text: string }[] = [
    { icon: "check", text: "Read QuickBooks, the job export" },
    { icon: "check", text: "Write to reports/ only" },
    { icon: "cross", text: "Never change invoices" },
    { icon: "hand", text: "Refunds go to a person" },
  ];
  return (
    <Canvas label={label}>
      <g transform="rotate(-2.5 220 190)">
        {/* page with a folded corner */}
        <path d="M80 34 H318 L352 68 V322 H80 Z" fill={BRAND} stroke={INK} strokeWidth="3" strokeLinejoin="round" transform="translate(8 8)" />
        <path d="M80 34 H318 L352 68 V322 H80 Z" fill="#fff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M318 34 V68 H352" fill={LINE} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <text x={102} y={72} fontSize="22" fontWeight="800" fill={INK} fontFamily={MONO}>
          CLAUDE.md
        </text>
        <rect x={102} y={84} width={96} height={5} rx="2.5" fill={BRAND} />
        {/* business context: what Claude needs to know about you */}
        <text x={102} y={114} fontSize="12.5" fontWeight="800" fill={PRIMARY} fontFamily={DISPLAY} letterSpacing="0.06em">
          ABOUT THE BUSINESS
        </text>
        <rect x={98} y={122} width={236} height={58} rx="8" fill={TINT} stroke={BRAND} strokeWidth="2" />
        <text x={110} y={146} fontSize="13.5" fontWeight="600" fill={INK} fontFamily={SANS}>
          Field-service company, 3 crews
        </text>
        <text x={110} y={168} fontSize="13.5" fontWeight="600" fill={INK} fontFamily={SANS}>
          Books close by the 5th
        </text>
        <text x={102} y={206} fontSize="12.5" fontWeight="800" fill={PRIMARY} fontFamily={DISPLAY} letterSpacing="0.06em">
          GUARDRAILS
        </text>
        {rules.map((r, i) => {
          const y = 226 + i * 24;
          return (
            <g key={r.text}>
              {r.icon === "check" && <Check x={110} y={y} r={8} />}
              {r.icon === "cross" && <Cross x={110} y={y} r={8} />}
              {r.icon === "hand" && <Hand x={110} y={y} r={8} />}
              <text x={126} y={y + 4.5} fontSize="13" fontWeight="500" fill={INK} fontFamily={SANS}>
                {r.text}
              </text>
            </g>
          );
        })}
      </g>
      {/* shield badge: the rules are enforced, not just written down */}
      <g transform="translate(392 150)">
        <path d="M0 -62 L50 -44 V0 C50 34 26 56 0 68 C-26 56 -50 34 -50 0 V-44 Z" fill={PRIMARY} stroke={INK} strokeWidth="3" strokeLinejoin="round" transform="translate(6 6)" opacity="0.35" />
        <path d="M0 -62 L50 -44 V0 C50 34 26 56 0 68 C-26 56 -50 34 -50 0 V-44 Z" fill={BRAND} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <rect x="-17" y="-6" width="34" height="28" rx="5" fill="#fff" stroke={INK} strokeWidth="3" />
        <path d="M-10 -6 V-16 a10 10 0 0 1 20 0 V-6" fill="none" stroke={INK} strokeWidth="3" />
        <circle cx="0" cy="8" r="3.5" fill={INK} />
      </g>
      {["Your business", "Your rules"].map((t, i) => (
        <g key={t} transform={`translate(400 ${250 + i * 44})`}>
          <rect x="-62" y="-17" width="124" height="34" rx="17" fill="#fff" stroke={INK} strokeWidth="3" />
          <text x="0" y="5.5" textAnchor="middle" fontSize="14" fontWeight="700" fill={INK} fontFamily={DISPLAY}>
            {t}
          </text>
        </g>
      ))}
    </Canvas>
  );
}
