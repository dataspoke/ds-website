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

/** An app window: card, dark title bar with three dots, and a mono title. */
function Window({ title }: { title: string }) {
  return (
    <>
      <Card x={36} y={32} w={408} h={292} r={12} />
      <path d="M36 66 V44 a12 12 0 0 1 12 -12 H432 a12 12 0 0 1 12 12 V66 Z" fill={INK} />
      {[BRAND, "#d6e6f8", "#fff"].map((c, i) => (
        <circle key={c} cx={56 + i * 16} cy={49} r="5" fill={c} />
      ))}
      <text x={240} y={54} textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff" fontFamily={MONO}>
        {title}
      </text>
    </>
  );
}

/** Step 1: the connector directory, with the systems Claude can reach. Letter badges, not logos. */
export function ConnectorsCartoon({ label }: { label: string }) {
  const filters = ["All", "Connected", "Email", "Docs", "Finance", "Sales"];
  const tiles: { badge: string; name: string; fill: string; on: boolean }[] = [
    { badge: "M", name: "Gmail", fill: PRIMARY, on: true },
    { badge: "N", name: "Notion", fill: "#fff", on: true },
    { badge: "F", name: "Fathom", fill: BRAND, on: true },
    { badge: "X", name: "Xero", fill: "#d6e6f8", on: false },
    { badge: "D", name: "Google Drive", fill: PRIMARY, on: true },
    { badge: "SF", name: "Salesforce", fill: BRAND, on: false },
  ];
  return (
    <Canvas label={label}>
      <Window title="Connectors" />
      <rect x={38} y={66} width={116} height={256} fill={TINT} />
      <line x1={154} y1={66} x2={154} y2={322} stroke={INK} strokeWidth="2" />
      {filters.map((f, i) => {
        const y = 96 + i * 30;
        return (
          <g key={f}>
            {i === 1 && <rect x={46} y={y - 17} width={100} height={24} rx="6" fill={BRAND} />}
            <text x={58} y={y} fontSize="12" fontWeight="700" fill={i === 1 ? "#fff" : INK} fontFamily={MONO}>
              {f}
            </text>
          </g>
        );
      })}
      {tiles.map((t, i) => {
        const x = 168 + (i % 2) * 136;
        const y = 80 + Math.floor(i / 2) * 80;
        const light = t.fill === "#fff" || t.fill === "#d6e6f8";
        return (
          <g key={t.name}>
            <rect x={x} y={y} width={126} height={70} rx="10" fill="#fff" stroke={INK} strokeWidth="2.5" />
            <rect x={x + 10} y={y + 10} width={30} height={30} rx="8" fill={t.fill} stroke={INK} strokeWidth="2" />
            <text x={x + 25} y={y + 29.5} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={light ? INK : "#fff"} fontFamily={DISPLAY}>
              {t.badge}
            </text>
            <text x={x + 47} y={y + 29.5} fontSize="11.5" fontWeight="700" fill={INK} fontFamily={SANS}>
              {t.name}
            </text>
            {t.on ? (
              <>
                <rect x={x + 10} y={y + 46} width={84} height={16} rx="8" fill={PRIMARY} />
                <text x={x + 52} y={y + 58} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily={SANS}>
                  ✓ Connected
                </text>
              </>
            ) : (
              <>
                <rect x={x + 10} y={y + 46} width={62} height={16} rx="8" fill="#fff" stroke={PRIMARY} strokeWidth="1.5" />
                <text x={x + 41} y={y + 58} textAnchor="middle" fontSize="10" fontWeight="700" fill={PRIMARY} fontFamily={SANS}>
                  Connect
                </text>
              </>
            )}
          </g>
        );
      })}
    </Canvas>
  );
}

/** A small folder icon for the file tree. */
function Folder({ x, y, fill }: { x: number; y: number; fill: string }) {
  return <path d={`M${x} ${y - 9} h6 l2 2 h8 v11 h-16 Z`} fill={fill} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />;
}

/** Step 3: the skills library as a folder, one folder per job, with the open skill's steps beside it. */
export function SkillsLibraryCartoon({ label }: { label: string }) {
  const others = ["weekly-report/", "client-intake/", "invoice-chase/", "morning-brief/"];
  const file: { text: string; color: string; bold?: boolean }[] = [
    { text: "---", color: "#55657a" },
    { text: "name: month-end", color: INK },
    { text: "about: close the books", color: INK },
    { text: "---", color: "#55657a" },
    { text: "1. Pull the job export", color: INK },
    { text: "2. Match the payments", color: INK },
    { text: "3. Flag anything odd", color: INK },
    { text: "4. Wait for your OK", color: PRIMARY, bold: true },
  ];
  return (
    <Canvas label={label}>
      <Window title="Skills library" />
      {/* sidebar: the skills folder */}
      <rect x={38} y={66} width={182} height={256} fill={TINT} />
      <line x1={220} y1={66} x2={220} y2={322} stroke={INK} strokeWidth="2" />
      <Folder x={52} y={98} fill={BRAND} />
      <text x={74} y={98} fontSize="12.5" fontWeight="700" fill={INK} fontFamily={MONO}>
        skills/
      </text>
      <rect x={46} y={110} width={168} height={24} rx="6" fill={BRAND} />
      <Folder x={64} y={126} fill="#fff" />
      <text x={86} y={126} fontSize="12" fontWeight="700" fill="#fff" fontFamily={MONO}>
        month-end/
      </text>
      <path d="M84 140 h9 l4 4 v10 h-13 Z" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <text x={104} y={152} fontSize="12" fontWeight="600" fill={PRIMARY} fontFamily={MONO}>
        SKILL.md
      </text>
      {others.map((n, i) => (
        <g key={n}>
          <Folder x={64} y={178 + i * 26} fill="#d6e6f8" />
          <text x={86} y={178 + i * 26} fontSize="12" fontWeight="600" fill={INK} fontFamily={MONO}>
            {n}
          </text>
        </g>
      ))}
      <text x={64} y={302} fontSize="12" fontWeight="700" fill={PRIMARY} fontFamily={MONO}>
        + new skill
      </text>
      {/* the open skill file */}
      <text x={236} y={96} fontSize="14" fontWeight="800" fill={INK} fontFamily={MONO}>
        SKILL.md
      </text>
      {file.map((l, i) => (
        <text key={`${i}-${l.text}`} x={236} y={124 + i * 24} fontSize="12" fontWeight={l.bold ? 800 : 500} fill={l.color} fontFamily={MONO}>
          {l.text}
        </text>
      ))}
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
