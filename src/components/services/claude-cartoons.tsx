import type { ReactNode } from "react";

/**
 * Drawn pictures for the five journey steps, all in one style: an app window with
 * a dark title bar, ink outlines and an offset brand shadow. Letter badges stand in
 * for product logos. No people.
 * Flat shapes, ink outlines and an offset shadow, in the brand colours.
 * All drawn on a 480 x 360 canvas so they fill the same 4:3 frame as the screenshots.
 */

const INK = "var(--ink)";
const BRAND = "var(--brand)";
const PRIMARY = "#1f63b5";
const TINT = "var(--tint)";
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

/** Step 2: a Cowork project window: its instructions, files and skill. */
export function ProjectCartoon({ label }: { label: string }) {
  const projects = ["Month-end close", "Client intake", "Weekly report"];
  const files = [
    ["close-checklist.md", 176, 230],
    ["accounts.pdf", 324, 230],
    ["vendor-list.xlsx", 176, 258],
  ] as const;
  return (
    <Canvas label={label}>
      <Window title="Month-end close" />
      <rect x={38} y={66} width={116} height={256} fill={TINT} />
      <line x1={154} y1={66} x2={154} y2={322} stroke={INK} strokeWidth="2" />
      <text x={50} y={92} fontSize="12" fontWeight="800" fill={INK} fontFamily={MONO}>
        Projects
      </text>
      {projects.map((n, i) => {
        const y = 120 + i * 28;
        return (
          <g key={n}>
            {i === 0 && <rect x={44} y={y - 17} width={104} height={24} rx="6" fill={BRAND} />}
            <text x={50} y={y} fontSize="11" fontWeight="700" fill={i === 0 ? "#fff" : INK} fontFamily={SANS}>
              {n}
            </text>
          </g>
        );
      })}
      <text x={50} y={212} fontSize="11" fontWeight="700" fill={PRIMARY} fontFamily={SANS}>
        + New project
      </text>
      {/* Cowork or Code */}
      <rect x={176} y={78} width={74} height={24} rx="12" fill={BRAND} stroke={INK} strokeWidth="2" />
      <text x={213} y={94.5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily={SANS}>
        Cowork
      </text>
      <rect x={258} y={78} width={60} height={24} rx="12" fill="#fff" stroke={INK} strokeWidth="2" />
      <text x={288} y={94.5} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK} fontFamily={SANS}>
        Code
      </text>
      <Heading x={176} y={128} text="INSTRUCTIONS" />
      <rect x={172} y={136} width={254} height={60} rx="8" fill={TINT} stroke={BRAND} strokeWidth="2" />
      <text x={184} y={160} fontSize="12" fontWeight="600" fill={INK} fontFamily={SANS}>
        Help close the books each month.
      </text>
      <text x={184} y={182} fontSize="12" fontWeight="600" fill={INK} fontFamily={SANS}>
        Ask a person before changing data.
      </text>
      <Heading x={176} y={222} text="FILES" />
      {files.map(([n, x, y]) => (
        <g key={n}>
          <rect x={x} y={y} width={n.length * 6.2 + 26} height={22} rx="6" fill="#fff" stroke={INK} strokeWidth="1.5" />
          <path d={`M${x + 8} ${y + 5} h6 l3 3 v9 h-9 Z`} fill={TINT} stroke={INK} strokeWidth="1.2" />
          <text x={x + 21} y={y + 15} fontSize="10" fontWeight="600" fill={INK} fontFamily={MONO}>
            {n}
          </text>
        </g>
      ))}
      <Heading x={176} y={306} text="SKILL" />
      <rect x={222} y={292} width={92} height={22} rx="11" fill={PRIMARY} stroke={INK} strokeWidth="1.5" />
      <text x={268} y={307} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily={MONO}>
        month-end
      </text>
    </Canvas>
  );
}

/** A small uppercase section heading inside a window. */
function Heading({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} fontSize="11" fontWeight="800" fill={PRIMARY} fontFamily={DISPLAY} letterSpacing="0.06em">
      {text}
    </text>
  );
}

/**
 * Step 4: the learning loop as a skill's change log. The loop runs along the top;
 * below, each change shows whether a person approved it and the team was trained.
 */
export function LearningLoopCartoon({ label }: { label: string }) {
  const loop = ["Run it", "Spot a change", "Update", "Teach"];
  const widths = [64, 108, 70, 62];
  const gap = 22;
  let lx = 52;
  const chips = loop.map((t, i) => {
    const chip = { t, x: lx, w: widths[i] };
    lx += widths[i] + gap;
    return chip;
  });
  const log: { v: string; title: string; pending?: boolean }[] = [
    { v: "v4", title: "Use the new job export", pending: true },
    { v: "v3", title: "Add a vendor check" },
    { v: "v2", title: "Flag anything over the limit" },
  ];
  return (
    <Canvas label={label}>
      <Window title="month-end · change log" />
      {chips.map((c, i) => (
        <g key={c.t}>
          <rect x={c.x} y={80} width={c.w} height={26} rx="13" fill={i === 1 ? BRAND : "#fff"} stroke={INK} strokeWidth="2" />
          <text x={c.x + c.w / 2} y={97.5} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={i === 1 ? "#fff" : INK} fontFamily={SANS}>
            {c.t}
          </text>
          {i < chips.length - 1 && <path d={`M${c.x + c.w + 5} 93 h12 m-5 -5 l5 5 l-5 5`} fill="none" stroke={PRIMARY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      ))}
      {/* the loop closes: back to the start */}
      <path d={`M${lx - gap - widths[3] / 2} 108 v10 H${52 + widths[0] / 2} v-6`} fill="none" stroke={PRIMARY} strokeWidth="2" strokeDasharray="4 4" />
      <path d={`M${52 + widths[0] / 2 - 5} 115 l5 -6 l5 6`} fill="none" stroke={PRIMARY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {log.map((e, i) => {
        const y = 134 + i * 62;
        return (
          <g key={e.v}>
            <rect x={52} y={y} width={376} height={54} rx="8" fill={e.pending ? TINT : "#fff"} stroke={e.pending ? BRAND : INK} strokeWidth="2" />
            <circle cx={76} cy={y + 27} r="14" fill={e.pending ? BRAND : PRIMARY} stroke={INK} strokeWidth="2" />
            <text x={76} y={y + 31} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily={DISPLAY}>
              {e.v}
            </text>
            <text x={100} y={y + 22} fontSize="12.5" fontWeight="700" fill={INK} fontFamily={SANS}>
              {e.title}
            </text>
            {e.pending ? (
              <>
                <Hand x={108} y={y + 38} r={7} />
                <text x={121} y={y + 42} fontSize="11" fontWeight="700" fill={PRIMARY} fontFamily={SANS}>
                  Waiting for a person to approve
                </text>
              </>
            ) : (
              <>
                <Check x={108} y={y + 38} r={7} />
                <text x={121} y={y + 42} fontSize="11" fontWeight="600" fill={INK} fontFamily={SANS}>
                  Approved by a person
                </text>
                <Check x={252} y={y + 38} r={7} />
                <text x={265} y={y + 42} fontSize="11" fontWeight="600" fill={INK} fontFamily={SANS}>
                  Team trained
                </text>
              </>
            )}
          </g>
        );
      })}
    </Canvas>
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

/** A line with an arrowhead at its end; the head points along `rot` degrees. */
function Arrow({ d, tip, rot }: { d: string; tip: [number, number]; rot: number }) {
  return (
    <>
      <path d={d} fill="none" stroke={PRIMARY} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        transform={`translate(${tip[0]} ${tip[1]}) rotate(${rot})`}
        d="M-6 -4.5 L0 0 L-6 4.5"
        fill="none"
        stroke={PRIMARY}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/** A tool step: exact work, shown with letter badges for the systems it touches. */
function ToolStep({ cy, h = 40, badges = [], title, sub }: { cy: number; h?: number; badges?: [string, string][]; title: string; sub?: string }) {
  const x = 28;
  const tx = x + 14 + badges.length * 26;
  return (
    <g>
      <Card x={x} y={cy - h / 2} w={196} h={h} r={9} />
      {badges.map(([b, f], i) => (
        <g key={b}>
          <rect x={x + 10 + i * 26} y={cy - 9} width={22} height={18} rx="4" fill={f} stroke={INK} strokeWidth="1.5" />
          <text x={x + 21 + i * 26} y={cy + 3.5} textAnchor="middle" fontSize="9" fontWeight="800" fill={f === "#fff" || f === "#d6e6f8" ? INK : "#fff"} fontFamily={DISPLAY}>
            {b}
          </text>
        </g>
      ))}
      <text x={tx} y={sub ? cy - 2 : cy + 4} fontSize="11.5" fontWeight="800" fill={INK} fontFamily={SANS}>
        {title}
      </text>
      {sub && (
        <text x={tx} y={cy + 12} fontSize="9.5" fontWeight="500" fill="#55657a" fontFamily={SANS}>
          {sub}
        </text>
      )}
    </g>
  );
}

/** A Claude step: a judgment call, marked with the sparkle. `judge` draws it white. */
function ClaudeStep({ cy, title, sub, judge = false }: { cy: number; title: string; sub: string; judge?: boolean }) {
  const x = 256;
  const tc = judge ? INK : "#fff";
  return (
    <g>
      <rect x={x + 4} y={cy - 16} width={186} height={40} rx="9" fill={judge ? PRIMARY : BRAND} stroke={INK} strokeWidth="2.5" />
      <rect x={x} y={cy - 20} width={186} height={40} rx="9" fill={judge ? "#fff" : PRIMARY} stroke={INK} strokeWidth="2.5" />
      <Sparkle x={x + 16} y={cy} s={0.75} fill={judge ? PRIMARY : "#fff"} />
      <text x={x + 30} y={cy - 2} fontSize="11.5" fontWeight="800" fill={tc} fontFamily={SANS}>
        {title}
      </text>
      <text x={x + 30} y={cy + 12} fontSize="9.5" fontWeight="500" fill={tc} opacity="0.85" fontFamily={SANS}>
        {sub}
      </text>
    </g>
  );
}

/**
 * Step 5: a client follow-through agent in two lanes. Tools on the left do exact,
 * logged work (the transcript, the data warehouse, the drafts); Claude on the right
 * makes the calls (what was promised, where each item goes, whether the work passes).
 */
export function FirstAgentCartoon({ label }: { label: string }) {
  return (
    <Canvas label={label}>
      <rect x={16} y={14} width={216} height={304} rx="12" fill="#fff" opacity="0.7" />
      <rect x={248} y={14} width={216} height={304} rx="12" fill="#d6e6f8" opacity="0.55" />
      <rect x={26} y={22} width={18} height={16} rx="4" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <text x={52} y={35} fontSize="10" fontWeight="800" fill={INK} fontFamily={DISPLAY}>
        TOOLS · exact, logged
      </text>
      <Sparkle x={266} y={30} s={0.8} fill={PRIMARY} />
      <text x={280} y={35} fontSize="10" fontWeight="800" fill={PRIMARY} fontFamily={DISPLAY}>
        CLAUDE · makes the calls
      </text>

      <rect x={28} y={46} width={196} height={24} rx="12" fill={INK} />
      <text x={126} y={62} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fff" fontFamily={SANS}>
        Trigger: a Fathom call ends
      </text>
      <Arrow d="M126 70 V80" tip={[126, 80]} rot={90} />
      <ToolStep cy={98} h={34} badges={[["F", "#d6e6f8"]]} title="Pull the transcript" />
      <Arrow d="M126 115 V128" tip={[126, 128]} rot={90} />
      <ToolStep cy={148} badges={[["DW", PRIMARY]]} title="Data warehouse" sub="client history, open jobs" />
      <Arrow d="M224 148 H254" tip={[254, 148]} rot={0} />
      <ClaudeStep cy={148} title="Find promises, risks" sub="who, what, by when" />
      <Arrow d="M349 168 V180" tip={[349, 180]} rot={90} />
      <ClaudeStep cy={200} title="Route each item" sub="update, email, task or flag" />
      <Arrow d="M256 200 H226" tip={[226, 200]} rot={180} />
      <ToolStep
        cy={200}
        badges={[
          ["SF", BRAND],
          ["M", PRIMARY],
          ["N", "#fff"],
        ]}
        title="Write drafts"
      />
      <Arrow d="M126 220 V250 H254" tip={[254, 250]} rot={0} />
      <ClaudeStep cy={250} title="AI judge checks" sub="vs transcript + warehouse" judge />

      {/* pass: the tools finish the job */}
      <Arrow d="M256 266 L226 290" tip={[226, 290]} rot={141} />
      <text x={236} y={266} textAnchor="end" fontSize="9.5" fontWeight="700" fill={PRIMARY} fontFamily={SANS}>
        pass
      </text>
      <ToolStep cy={300} h={32} title="" />
      <Check x={46} y={300} r={7} />
      <text x={60} y={304} fontSize="11.5" fontWeight="800" fill={INK} fontFamily={SANS}>
        Send and save
      </text>

      {/* unsure: a person decides, and that call feeds back */}
      <Arrow d="M372 275 V286" tip={[372, 286]} rot={90} />
      <text x={380} y={285} fontSize="9.5" fontWeight="700" fill={PRIMARY} fontFamily={SANS}>
        unsure
      </text>
      <Card x={298} y={288} w={144} h={28} r={9} />
      <Hand x={314} y={302} r={7} />
      <text x={328} y={306} fontSize="11.5" fontWeight="800" fill={INK} fontFamily={SANS}>
        A person decides
      </text>
      <path d="M442 302 H462 V148 H448" fill="none" stroke={PRIMARY} strokeWidth="2" strokeDasharray="4 4" />
      <path transform="translate(448 148) rotate(180)" d="M-6 -4.5 L0 0 L-6 4.5" fill="none" stroke={PRIMARY} strokeWidth="2.2" strokeLinecap="round" />
      <text x={469} y={226} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={PRIMARY} fontFamily={SANS} transform="rotate(90 469 226)">
        feedback
      </text>

      <rect x={16} y={326} width={448} height={26} rx="8" fill={INK} />
      <text x={240} y={343} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#fff" fontFamily={SANS}>
        Every step logged · each tool sees only what it needs
      </text>
    </Canvas>
  );
}
