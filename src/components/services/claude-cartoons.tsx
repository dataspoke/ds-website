import type { ReactNode } from "react";

/**
 * Cartoon pictures for the later journey steps: a skill card, Claude Code
 * explaining its rules to the team, and the CLAUDE.md that holds the guardrails.
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

/** Step 3: a skill as a card of steps, with a person giving the OK at the stop. */
export function SkillCartoon({ label }: { label: string }) {
  const rows: { icon: "check" | "hand"; text: string }[] = [
    { icon: "check", text: "Pull the job export" },
    { icon: "check", text: "Match the payments" },
    { icon: "check", text: "Flag anything unusual" },
    { icon: "hand", text: "Wait for your OK" },
  ];
  return (
    <Canvas label={label}>
      <Card x={36} y={44} w={290} h={262} />
      <path d="M36 92 V60 a16 16 0 0 1 16 -16 H310 a16 16 0 0 1 16 16 V92 Z" fill={PRIMARY} stroke={INK} strokeWidth="3" />
      <Sparkle x={62} y={68} s={0.95} />
      <text x={82} y={74} fontSize="16" fontWeight="700" fill="#fff" fontFamily={MONO}>
        month-end-close
      </text>
      {rows.map((r, i) => {
        const y = 116 + i * 38;
        const last = r.icon === "hand";
        return (
          <g key={r.text}>
            {last && <rect x={50} y={y - 17} width={262} height={34} rx="17" fill={TINT} stroke={BRAND} strokeWidth="2" />}
            {last ? <Hand x={70} y={y} /> : <Check x={70} y={y} />}
            <text x={92} y={y + 5.5} fontSize="15.5" fontWeight={last ? 700 : 500} fill={INK} fontFamily={SANS}>
              {r.text}
            </text>
          </g>
        );
      })}
      <g>
        <rect x={56} y={262} width={96} height={30} rx="15" fill={BRAND} stroke={INK} strokeWidth="2.5" />
        <path d="M76 269 L76 285 L89 277 Z" fill="#fff" />
        <text x={98} y={282.5} fontSize="14" fontWeight="700" fill="#fff" fontFamily={DISPLAY}>
          Run
        </text>
      </g>
      <Person x={398} y={252} />
      <Bubble x={340} y={150} w={124} text="Approved!" tail="left" />
    </Canvas>
  );
}

/** Step 4: Claude Code on a laptop, explaining its rules, with two teammates. */
export function CodeCartoon({ label }: { label: string }) {
  const lines: { icon: "check" | "cross" | "hand"; text: string }[] = [
    { icon: "check", text: "I may read QuickBooks" },
    { icon: "check", text: "I may write the report" },
    { icon: "cross", text: "I never change invoices" },
    { icon: "hand", text: "Refunds wait for a person" },
  ];
  return (
    <Canvas label={label}>
      {/* laptop */}
      <rect x={98} y={36} width={284} height={206} rx="14" fill={INK} stroke={INK} strokeWidth="3" />
      <rect x={110} y={48} width={260} height={182} rx="6" fill="#fff" />
      <path d="M70 242 H410 L422 262 a6 6 0 0 1 -5 8 H63 a6 6 0 0 1 -5 -8 Z" fill="#c9d6e6" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x={210} y={248} width={60} height={6} rx="3" fill={INK} opacity="0.35" />
      {/* screen: the question, then Claude's answer */}
      <rect x={208} y={58} width={152} height={26} rx="13" fill={TINT} stroke={BRAND} strokeWidth="1.5" />
      <text x={284} y={75.5} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={INK} fontFamily={SANS}>
        What may you touch?
      </text>
      <circle cx={130} cy={104} r="12" fill={BRAND} stroke={INK} strokeWidth="2" />
      <Sparkle x={130} y={104} s={0.7} />
      {lines.map((l, i) => {
        const y = 104 + i * 32;
        return (
          <g key={l.text}>
            {l.icon === "check" && <Check x={160} y={y} r={9} />}
            {l.icon === "cross" && <Cross x={160} y={y} r={9} />}
            {l.icon === "hand" && <Hand x={160} y={y} r={9} />}
            <text x={176} y={y + 4.5} fontSize="13" fontWeight={l.icon === "hand" ? 700 : 500} fill={INK} fontFamily={SANS}>
              {l.text}
            </text>
          </g>
        );
      })}
      {/* the team, watching and learning */}
      <Person x={44} y={292} shirt={BRAND} />
      <Person x={436} y={292} shirt={PRIMARY} flip />
      <Bubble x={386} y={190} w={86} text="Got it!" tail="right" />
    </Canvas>
  );
}

/** Step 5: the CLAUDE.md page, with sections for what Claude may and may not do. */
export function ClaudeMdCartoon({ label }: { label: string }) {
  const sections: { head: string; icon: "check" | "cross" | "hand"; text: string }[] = [
    { head: "May read", icon: "check", text: "QuickBooks, the job export" },
    { head: "May write", icon: "check", text: "reports/ only" },
    { head: "Never", icon: "cross", text: "change invoices or payments" },
    { head: "Ask a person", icon: "hand", text: "refunds and credits" },
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
        {sections.map((s, i) => {
          const y = 118 + i * 50;
          return (
            <g key={s.head}>
              <text x={102} y={y} fontSize="13" fontWeight="800" fill={PRIMARY} fontFamily={DISPLAY} letterSpacing="0.06em">
                {s.head.toUpperCase()}
              </text>
              {s.icon === "check" && <Check x={112} y={y + 20} r={9} />}
              {s.icon === "cross" && <Cross x={112} y={y + 20} r={9} />}
              {s.icon === "hand" && <Hand x={112} y={y + 20} r={9} />}
              <text x={128} y={y + 24.5} fontSize="14" fontWeight="500" fill={INK} fontFamily={SANS}>
                {s.text}
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
      <g transform="translate(392 262)">
        <rect x="-58" y="-17" width="116" height="34" rx="17" fill="#fff" stroke={INK} strokeWidth="3" />
        <text x="0" y="5.5" textAnchor="middle" fontSize="14" fontWeight="700" fill={INK} fontFamily={DISPLAY}>
          Your rules
        </text>
      </g>
    </Canvas>
  );
}
