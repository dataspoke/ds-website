import Link from "next/link";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { HERO } from "@/content/home";

/** Sources feeding the hub, clockwise from top. Labels only, no claims. */
const SOURCES = ["Sales", "Marketing", "Phones", "Finance", "Customers", "Documents"];

/**
 * Big hub-and-spoke figure: the business in the middle, the tools it already runs
 * on around it, every spoke carrying information inward.
 */
function HubFigure() {
  const cx = 200;
  const cy = 200;
  const r = 150;
  const nodes = SOURCES.map((label, i) => {
    const a = (Math.PI * 2 * i) / SOURCES.length - Math.PI / 2;
    return { label, x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Six sources of business information, each connected to one central hub"
      className="h-auto w-full"
    >
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a90e2" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#4a90e2" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={120} fill="url(#hub-glow)" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeDasharray="3 6" />
      {nodes.map((n) => (
        <g key={n.label}>
          <line
            x1={n.x}
            y1={n.y}
            x2={cx}
            y2={cy}
            stroke="#4a90e2"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="spoke-line"
          />
          <circle cx={n.x} cy={n.y} r="37" fill="#0f1e33" stroke="#4a90e2" strokeWidth="2.5" />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="11.5"
            fontWeight="600"
            fontFamily="var(--font-inter)"
          >
            {n.label}
          </text>
        </g>
      ))}
      <circle cx={cx} cy={cy} r="54" fill="#4a90e2" />
      <circle cx={cx} cy={cy} r="54" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="6" />
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fill="#ffffff"
        fontSize="13"
        fontWeight="700"
        fontFamily="var(--font-jakarta)"
      >
        Your
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fill="#ffffff"
        fontSize="13"
        fontWeight="700"
        fontFamily="var(--font-jakarta)"
      >
        business
      </text>
    </svg>
  );
}

export function HeroC() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-8">
          <p className="flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-brand sm:text-[0.82rem]">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            {HERO.eyebrow}
          </p>
          <h1 className="mt-6 text-[clamp(2.6rem,9.2vw,6.2rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-white">
            {HERO.headline}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
            We connect the software you already pay for, so the numbers are right, the retyping
            stops and your team gets hours back every week.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <EstimateCta
              location="home-hero"
              className="h-13 rounded-none bg-brand px-7 text-[1.05rem] text-white hover:bg-brand/90"
            >
              {HERO.primaryCta}
            </EstimateCta>
            <Link
              href="/services"
              className="font-semibold text-white underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand"
            >
              See the services
            </Link>
          </div>
        </div>
        <figure className="mx-auto w-full max-w-[380px] lg:col-span-4 lg:max-w-none">
          <HubFigure />
        </figure>
      </div>
    </section>
  );
}
