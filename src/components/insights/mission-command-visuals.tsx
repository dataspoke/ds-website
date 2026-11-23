"use client";

import { createContext, useContext, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ExampleKey = "churn" | "quotes";

const EXAMPLES: { key: ExampleKey; label: string }[] = [
  { key: "churn", label: "Catch at-risk customers" },
  { key: "quotes", label: "Recover stalled quotes" },
];

const ExampleContext = createContext<{
  selected: ExampleKey;
  setSelected: (key: ExampleKey) => void;
} | null>(null);

/** Syncs the active example tab across both interactive diagrams in the post. */
export function MissionCommandProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<ExampleKey>("churn");
  return <ExampleContext.Provider value={{ selected, setSelected }}>{children}</ExampleContext.Provider>;
}

function useSelectedExample() {
  const ctx = useContext(ExampleContext);
  if (!ctx) throw new Error("MissionCommand example visuals must sit inside MissionCommandProvider");
  return ctx;
}

const SANS = "var(--font-inter), system-ui, sans-serif";
const DISPLAY = "var(--font-jakarta), var(--font-inter), system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

function TabBar({ ariaLabel, prefix }: { ariaLabel: string; prefix: string }) {
  const { selected, setSelected } = useSelectedExample();

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = EXAMPLES[(index + (e.key === "ArrowRight" ? 1 : EXAMPLES.length - 1)) % EXAMPLES.length];
    setSelected(next.key);
  };

  return (
    <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2.5 border-b border-tint-strong pb-2.5">
      <div role="tablist" aria-label={ariaLabel} className="inline-flex flex-wrap gap-2">
        {EXAMPLES.map((ex, i) => {
          const on = selected === ex.key;
          return (
            <button
              key={ex.key}
              type="button"
              role="tab"
              id={`${prefix}-tab-${ex.key}`}
              aria-selected={on}
              aria-controls={`${prefix}-panel-${ex.key}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setSelected(ex.key)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                on
                  ? "border-primary bg-primary text-white"
                  : "border-tint-strong bg-white text-muted-foreground hover:border-brand hover:text-ink"
              )}
            >
              {ex.label}
            </button>
          );
        })}
      </div>
      <span className="text-xs font-semibold text-primary">Switch example</span>
    </div>
  );
}

/** Visual 1: Six Mission Command principles mapped to AI delegation, in DataSpoke's hub-and-spoke style. */
export function MissionCommandHub() {
  return (
    <figure className="my-2 rounded-2xl border border-tint-strong bg-tint p-4 sm:p-5">
      <svg
        viewBox="0 0 680 296"
        role="img"
        aria-label="Mission Command hub with six spokes: Competence, Mutual trust, Shared understanding, Commander's intent, Mission orders, and Disciplined initiative"
        className="block h-auto w-full"
      >
        <g stroke="#9ec5f0" strokeWidth="2.5" fill="none">
          <path d="M292 120 C260 90, 252 50, 224 50" />
          <path d="M282 148 L224 148" />
          <path d="M292 176 C260 206, 252 246, 224 246" />
          <path d="M388 120 C420 90, 428 50, 456 50" />
          <path d="M398 148 L456 148" />
          <path d="M388 176 C420 206, 428 246, 456 246" />
        </g>

        <circle cx="340" cy="148" r="60" fill="var(--tint-strong)" />
        <circle cx="340" cy="148" r="52" fill="var(--brand)" stroke="var(--ink)" strokeWidth="2.5" />
        <text x="340" y="143" textAnchor="middle" fontFamily={DISPLAY} fontSize="13.5" fontWeight="800" fill="#ffffff" letterSpacing="0.04em">
          MISSION
        </text>
        <text x="340" y="161" textAnchor="middle" fontFamily={DISPLAY} fontSize="13.5" fontWeight="800" fill="#ffffff" letterSpacing="0.04em">
          COMMAND
        </text>

        <rect x="14" y="16" width="210" height="68" rx="12" fill="#ffffff" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="224" cy="50" r="5.5" fill="var(--brand)" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="28" y="42" fontFamily={DISPLAY} fontSize="13.5" fontWeight="700" fill="var(--ink)">
          1. Competence
        </text>
        <text x="28" y="62" fontFamily={SANS} fontSize="12" fill="var(--muted-foreground)">
          Prove it on one narrow job first
        </text>

        <rect x="14" y="114" width="210" height="68" rx="12" fill="#ffffff" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="224" cy="148" r="5.5" fill="var(--brand)" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="28" y="140" fontFamily={DISPLAY} fontSize="13.5" fontWeight="700" fill="var(--ink)">
          2. Mutual trust
        </text>
        <text x="28" y="160" fontFamily={SANS} fontSize="12" fill="var(--muted-foreground)">
          Earn authority in stages
        </text>

        <rect x="14" y="212" width="210" height="68" rx="12" fill="#ffffff" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="224" cy="246" r="5.5" fill="var(--brand)" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="28" y="238" fontFamily={DISPLAY} fontSize="13.5" fontWeight="700" fill="var(--ink)">
          3. Shared understanding
        </text>
        <text x="28" y="258" fontFamily={SANS} fontSize="12" fill="var(--muted-foreground)">
          Put your context in the brief
        </text>

        <rect x="456" y="16" width="210" height="68" rx="12" fill="#ffffff" stroke="var(--primary)" strokeWidth="2.5" />
        <circle cx="456" cy="50" r="5.5" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="472" y="42" fontFamily={DISPLAY} fontSize="13.5" fontWeight="700" fill="var(--primary)">
          4. Commander&apos;s intent
        </text>
        <text x="472" y="62" fontFamily={SANS} fontSize="12" fill="var(--muted-foreground)">
          Purpose, key tasks, end state
        </text>

        <rect x="456" y="114" width="210" height="68" rx="12" fill="#ffffff" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="456" cy="148" r="5.5" fill="var(--brand)" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="472" y="140" fontFamily={DISPLAY} fontSize="13.5" fontWeight="700" fill="var(--ink)">
          5. Mission orders
        </text>
        <text x="472" y="160" fontFamily={SANS} fontSize="12" fill="var(--muted-foreground)">
          Outcomes and limits, not clicks
        </text>

        <rect x="456" y="212" width="210" height="68" rx="12" fill="#ffffff" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="456" cy="246" r="5.5" fill="var(--brand)" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="472" y="238" fontFamily={DISPLAY} fontSize="13.5" fontWeight="700" fill="var(--ink)">
          6. Disciplined initiative
        </text>
        <text x="472" y="258" fontFamily={SANS} fontSize="12" fill="var(--muted-foreground)">
          Run up to the decision line
        </text>
      </svg>
      <figcaption className="mt-2.5 text-center text-xs text-muted-foreground">
        The six mission command principles translated into a practical AI delegation system.
      </figcaption>
    </figure>
  );
}

/** Visual 2: Tabbed Mission Brief + End-State Inbox tool mockup. */
export function BriefAndInboxVisual() {
  const { selected } = useSelectedExample();

  return (
    <figure className="my-2 rounded-2xl border border-tint-strong bg-tint p-4 sm:p-5">
      <TabBar ariaLabel="Mission brief and end-state inbox examples" prefix="brief" />

      {/* TAB 1: CATCH AT-RISK CUSTOMERS */}
      <div
        role="tabpanel"
        id="brief-panel-churn"
        aria-labelledby="brief-tab-churn"
        hidden={selected !== "churn"}
      >
        <div className="mb-3.5 grid gap-2 rounded-xl border border-tint-strong bg-white p-3.5 text-sm leading-snug text-ink">
          <div className="grid gap-1 sm:grid-cols-[96px_1fr] sm:items-baseline sm:gap-2.5">
            <span className="inline-block w-fit rounded-md bg-primary px-2 py-0.5 text-center font-display text-[10.5px] font-extrabold tracking-[0.06em] text-white sm:w-full">
              PURPOSE
            </span>
            <span>Spot slipping or frustrated accounts early so we can step in before they leave.</span>
          </div>
          <div className="grid gap-1 sm:grid-cols-[96px_1fr] sm:items-baseline sm:gap-2.5">
            <span className="inline-block w-fit rounded-md bg-primary px-2 py-0.5 text-center font-display text-[10.5px] font-extrabold tracking-[0.06em] text-white sm:w-full">
              KEY TASKS
            </span>
            <span>
              Scan calls, emails, tickets, and billing from the last 14 days; segment accounts by risk and draft a personal check-in for each.
            </span>
          </div>
          <div className="grid gap-1 sm:grid-cols-[96px_1fr] sm:items-baseline sm:gap-2.5">
            <span className="inline-block w-fit rounded-md bg-ink px-2 py-0.5 text-center font-display text-[10.5px] font-extrabold tracking-[0.06em] text-white sm:w-full">
              END STATE
            </span>
            <span>
              <strong className="font-semibold text-ink">An at-risk customer inbox</strong> segmented by risk level, with drill-in signals per account and an editable draft the team can send right from the tool.
            </span>
          </div>
        </div>

        <svg
          viewBox="0 0 680 282"
          role="img"
          aria-label="At-risk customer inbox tool showing risk segments, Customer A drill-in with pulled signals, editable pre-drafted message, and Send from inbox button"
          className="block h-auto w-full"
        >
          <rect x="24" y="16" width="636" height="252" rx="14" fill="var(--brand)" stroke="var(--ink)" strokeWidth="2.5" />
          <rect x="16" y="8" width="636" height="252" rx="14" fill="#ffffff" stroke="var(--ink)" strokeWidth="2.5" />
          <path d="M16 42 V22 a14 14 0 0 1 14 -14 H638 a14 14 0 0 1 14 14 V42 Z" fill="var(--ink)" />
          <circle cx="36" cy="25" r="4.8" fill="var(--brand)" />
          <circle cx="52" cy="25" r="4.8" fill="var(--tint-strong)" />
          <circle cx="68" cy="25" r="4.8" fill="#ffffff" />
          <text x="334" y="29.5" textAnchor="middle" fontFamily={MONO} fontSize="11.5" fontWeight="600" fill="#ffffff">
            at-risk-inbox · segmented customer triage
          </text>

          <rect x="18" y="42" width="194" height="216" fill="var(--tint)" />
          <line x1="212" y1="42" x2="212" y2="258" stroke="var(--ink)" strokeWidth="2" />

          <rect x="28" y="54" width="76" height="24" rx="12" fill="var(--primary)" />
          <text x="66" y="70" textAnchor="middle" fontFamily={SANS} fontSize="11" fontWeight="700" fill="#ffffff">
            High (3)
          </text>
          <rect x="110" y="54" width="92" height="24" rx="12" fill="#ffffff" stroke="var(--tint-strong)" strokeWidth="1.5" />
          <text x="156" y="70" textAnchor="middle" fontFamily={SANS} fontSize="11" fontWeight="600" fill="var(--muted-foreground)">
            Slipping (5)
          </text>

          <rect x="28" y="90" width="174" height="40" rx="8" fill="var(--brand)" stroke="var(--ink)" strokeWidth="1.8" />
          <text x="40" y="108" fontFamily={SANS} fontSize="12.5" fontWeight="700" fill="#ffffff">
            Customer A
          </text>
          <text x="40" y="123" fontFamily={SANS} fontSize="10.5" fill="var(--tint)">
            3 signals · Draft ready
          </text>

          <rect x="28" y="138" width="174" height="38" rx="8" fill="#ffffff" stroke="var(--tint-strong)" strokeWidth="1.5" />
          <text x="40" y="155" fontFamily={SANS} fontSize="12" fontWeight="700" fill="var(--ink)">
            Customer B
          </text>
          <text x="40" y="169" fontFamily={SANS} fontSize="10.5" fill="var(--muted-foreground)">
            2 signals · Draft ready
          </text>

          <rect x="28" y="184" width="174" height="38" rx="8" fill="#ffffff" stroke="var(--tint-strong)" strokeWidth="1.5" />
          <text x="40" y="201" fontFamily={SANS} fontSize="12" fontWeight="700" fill="var(--ink)">
            Customer C
          </text>
          <text x="40" y="215" fontFamily={SANS} fontSize="10.5" fill="var(--muted-foreground)">
            Slipping · Draft ready
          </text>

          <text x="30" y="244" fontFamily={MONO} fontSize="10" fontWeight="600" fill="var(--primary)">
            4 feeds scanned · Mon 7:00a
          </text>

          <text x="230" y="68" fontFamily={DISPLAY} fontSize="15" fontWeight="800" fill="var(--ink)">
            Customer A
          </text>
          <rect x="330" y="53" width="136" height="21" rx="10.5" fill="#fee2e2" stroke="var(--destructive)" strokeWidth="1.2" />
          <text x="398" y="67" textAnchor="middle" fontFamily={DISPLAY} fontSize="10" fontWeight="800" fill="var(--destructive)" letterSpacing="0.04em">
            HIGH RISK · 3 SIGNALS
          </text>

          <rect x="230" y="82" width="94" height="24" rx="6" fill="var(--tint)" stroke="var(--tint-strong)" strokeWidth="1.2" />
          <text x="277" y="98" textAnchor="middle" fontFamily={SANS} fontSize="11" fontWeight="600" fill="var(--ink)">
            Orders -28%
          </text>
          <rect x="332" y="82" width="102" height="24" rx="6" fill="var(--tint)" stroke="var(--tint-strong)" strokeWidth="1.2" />
          <text x="383" y="98" textAnchor="middle" fontFamily={SANS} fontSize="11" fontWeight="600" fill="var(--ink)">
            2 open tickets
          </text>
          <rect x="442" y="82" width="194" height="24" rx="6" fill="var(--tint)" stroke="var(--tint-strong)" strokeWidth="1.2" />
          <text x="539" y="98" textAnchor="middle" fontFamily={SANS} fontSize="11" fontWeight="600" fill="var(--ink)">
            Call: &quot;still waiting on fix&quot;
          </text>

          <text x="230" y="124" fontFamily={DISPLAY} fontSize="10" fontWeight="800" fill="var(--primary)" letterSpacing="0.06em">
            PRE-DRAFTED CHECK-IN · CLICK TO EDIT
          </text>
          <rect x="230" y="132" width="406" height="68" rx="8" fill="var(--muted)" stroke="var(--brand)" strokeWidth="1.8" />
          <text x="242" y="152" fontFamily={SANS} fontSize="12" fill="var(--ink)">
            &quot;Hi [Name] - I saw the two open tickets from this week and
          </text>
          <text x="242" y="170" fontFamily={SANS} fontSize="12" fill="var(--ink)">
            wanted to step in directly before Monday. Do you have 10
          </text>
          <text x="242" y="188" fontFamily={SANS} fontSize="12" fill="var(--ink)">
            minutes tomorrow so we can get this wrapped up?&quot;
          </text>

          <rect x="230" y="212" width="88" height="32" rx="8" fill="#ffffff" stroke="var(--ink)" strokeWidth="1.8" />
          <text x="274" y="232.5" textAnchor="middle" fontFamily={SANS} fontSize="12" fontWeight="700" fill="var(--ink)">
            Edit draft
          </text>
          <rect x="328" y="212" width="140" height="32" rx="8" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.8" />
          <text x="398" y="232.5" textAnchor="middle" fontFamily={SANS} fontSize="12" fontWeight="700" fill="#ffffff">
            Send from inbox
          </text>
          <circle cx="490" cy="228" r="9.5" fill="var(--ink)" />
          <rect x="486.5" y="224" width="2.4" height="8" rx="0.8" fill="#ffffff" />
          <rect x="491" y="224" width="2.4" height="8" rx="0.8" fill="#ffffff" />
          <text x="506" y="232" fontFamily={SANS} fontSize="11.5" fontWeight="600" fill="var(--muted-foreground)">
            Waits for your click
          </text>
        </svg>
        <figcaption className="mt-2.5 text-center text-xs text-muted-foreground">
          End state in action: segmented risk inbox, drill-in proof per customer, and one-click send after review.
        </figcaption>
      </div>

      {/* TAB 2: RECOVER STALLED QUOTES */}
      <div
        role="tabpanel"
        id="brief-panel-quotes"
        aria-labelledby="brief-tab-quotes"
        hidden={selected !== "quotes"}
      >
        <div className="mb-3.5 grid gap-2 rounded-xl border border-tint-strong bg-white p-3.5 text-sm leading-snug text-ink">
          <div className="grid gap-1 sm:grid-cols-[96px_1fr] sm:items-baseline sm:gap-2.5">
            <span className="inline-block w-fit rounded-md bg-primary px-2 py-0.5 text-center font-display text-[10.5px] font-extrabold tracking-[0.06em] text-white sm:w-full">
              PURPOSE
            </span>
            <span>Recover winnable deals before they go cold or go to a competitor.</span>
          </div>
          <div className="grid gap-1 sm:grid-cols-[96px_1fr] sm:items-baseline sm:gap-2.5">
            <span className="inline-block w-fit rounded-md bg-primary px-2 py-0.5 text-center font-display text-[10.5px] font-extrabold tracking-[0.06em] text-white sm:w-full">
              KEY TASKS
            </span>
            <span>
              Pull discovery call notes and emails for quotes silent 5+ days, spot the open objection, and pre-draft a 3-step call and email sequence.
            </span>
          </div>
          <div className="grid gap-1 sm:grid-cols-[96px_1fr] sm:items-baseline sm:gap-2.5">
            <span className="inline-block w-fit rounded-md bg-ink px-2 py-0.5 text-center font-display text-[10.5px] font-extrabold tracking-[0.06em] text-white sm:w-full">
              END STATE
            </span>
            <span>
              <strong className="font-semibold text-ink">A quote recovery inbox</strong> segmented by priority, with drill-in per deal and an editable Day 1 / Day 3 / Day 7 sequence reps launch right from the tool.
            </span>
          </div>
        </div>

        <svg
          viewBox="0 0 680 282"
          role="img"
          aria-label="Stalled quote recovery inbox tool showing deal segments, Quote A drill-in with call objection, editable 3-step call and email sequence, and Launch sequence button"
          className="block h-auto w-full"
        >
          <rect x="24" y="16" width="636" height="252" rx="14" fill="var(--brand)" stroke="var(--ink)" strokeWidth="2.5" />
          <rect x="16" y="8" width="636" height="252" rx="14" fill="#ffffff" stroke="var(--ink)" strokeWidth="2.5" />
          <path d="M16 42 V22 a14 14 0 0 1 14 -14 H638 a14 14 0 0 1 14 14 V42 Z" fill="var(--ink)" />
          <circle cx="36" cy="25" r="4.8" fill="var(--brand)" />
          <circle cx="52" cy="25" r="4.8" fill="var(--tint-strong)" />
          <circle cx="68" cy="25" r="4.8" fill="#ffffff" />
          <text x="334" y="29.5" textAnchor="middle" fontFamily={MONO} fontSize="11.5" fontWeight="600" fill="#ffffff">
            quote-recovery-inbox · stalled deals
          </text>

          <rect x="18" y="42" width="194" height="216" fill="var(--tint)" />
          <line x1="212" y1="42" x2="212" y2="258" stroke="var(--ink)" strokeWidth="2" />

          <rect x="28" y="54" width="76" height="24" rx="12" fill="var(--primary)" />
          <text x="66" y="70" textAnchor="middle" fontFamily={SANS} fontSize="11" fontWeight="700" fill="#ffffff">
            Hot (4)
          </text>
          <rect x="110" y="54" width="92" height="24" rx="12" fill="#ffffff" stroke="var(--tint-strong)" strokeWidth="1.5" />
          <text x="156" y="70" textAnchor="middle" fontFamily={SANS} fontSize="11" fontWeight="600" fill="var(--muted-foreground)">
            Cooling (6)
          </text>

          <rect x="28" y="90" width="174" height="40" rx="8" fill="var(--brand)" stroke="var(--ink)" strokeWidth="1.8" />
          <text x="40" y="108" fontFamily={SANS} fontSize="12.5" fontWeight="700" fill="#ffffff">
            Quote A · 8d silent
          </text>
          <text x="40" y="123" fontFamily={SANS} fontSize="10.5" fill="var(--tint)">
            3-step sequence ready
          </text>

          <rect x="28" y="138" width="174" height="38" rx="8" fill="#ffffff" stroke="var(--tint-strong)" strokeWidth="1.5" />
          <text x="40" y="155" fontFamily={SANS} fontSize="12" fontWeight="700" fill="var(--ink)">
            Quote B · 12d silent
          </text>
          <text x="40" y="169" fontFamily={SANS} fontSize="10.5" fill="var(--muted-foreground)">
            3-step sequence ready
          </text>

          <rect x="28" y="184" width="174" height="38" rx="8" fill="#ffffff" stroke="var(--tint-strong)" strokeWidth="1.5" />
          <text x="40" y="201" fontFamily={SANS} fontSize="12" fontWeight="700" fill="var(--ink)">
            Quote C · 19d silent
          </text>
          <text x="40" y="215" fontFamily={SANS} fontSize="10.5" fill="var(--muted-foreground)">
            Cooling · Draft ready
          </text>

          <text x="30" y="244" fontFamily={MONO} fontSize="10" fontWeight="600" fill="var(--primary)">
            CRM + calls synced · 7:00a
          </text>

          <text x="230" y="68" fontFamily={DISPLAY} fontSize="15" fontWeight="800" fill="var(--ink)">
            Quote A
          </text>
          <rect x="302" y="53" width="170" height="21" rx="10.5" fill="var(--tint)" stroke="var(--primary)" strokeWidth="1.2" />
          <text x="387" y="67" textAnchor="middle" fontFamily={DISPLAY} fontSize="10" fontWeight="800" fill="var(--primary)" letterSpacing="0.04em">
            CALL OBJECTION MATCHED
          </text>

          <rect x="230" y="80" width="406" height="24" rx="6" fill="var(--tint)" stroke="var(--tint-strong)" strokeWidth="1.2" />
          <text x="240" y="96" fontFamily={SANS} fontSize="11.2" fontWeight="600" fill="var(--ink)">
            Call note: &quot;Need clarity on rollout timing before we sign off.&quot;
          </text>

          <rect x="230" y="112" width="114" height="24" rx="12" fill="var(--primary)" />
          <text x="287" y="128" textAnchor="middle" fontFamily={SANS} fontSize="11" fontWeight="700" fill="#ffffff">
            Day 1 · Email
          </text>
          <path d="M348 124 L362 124 M358 120 L363 124 L358 128" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

          <rect x="368" y="112" width="136" height="24" rx="12" fill="#ffffff" stroke="var(--brand)" strokeWidth="1.4" />
          <text x="436" y="128" textAnchor="middle" fontFamily={SANS} fontSize="11" fontWeight="600" fill="var(--ink)">
            Day 3 · Call script
          </text>
          <path d="M508 124 L522 124 M518 120 L523 124 L518 128" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

          <rect x="528" y="112" width="108" height="24" rx="12" fill="#ffffff" stroke="var(--brand)" strokeWidth="1.4" />
          <text x="582" y="128" textAnchor="middle" fontFamily={SANS} fontSize="11" fontWeight="600" fill="var(--ink)">
            Day 7 · Nudge
          </text>

          <rect x="230" y="144" width="406" height="56" rx="8" fill="var(--muted)" stroke="var(--brand)" strokeWidth="1.8" />
          <text x="242" y="164" fontFamily={SANS} fontSize="12" fill="var(--ink)">
            &quot;Hi [Name] - following up on the rollout timing question from
          </text>
          <text x="242" y="182" fontFamily={SANS} fontSize="12" fill="var(--ink)">
            our call. Here is a phased plan so week one runs smoothly...&quot;
          </text>

          <rect x="230" y="212" width="104" height="32" rx="8" fill="#ffffff" stroke="var(--ink)" strokeWidth="1.8" />
          <text x="282" y="232.5" textAnchor="middle" fontFamily={SANS} fontSize="12" fontWeight="700" fill="var(--ink)">
            Edit sequence
          </text>
          <rect x="344" y="212" width="128" height="32" rx="8" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.8" />
          <text x="408" y="232.5" textAnchor="middle" fontFamily={SANS} fontSize="12" fontWeight="700" fill="#ffffff">
            Launch sequence
          </text>
          <circle cx="494" cy="228" r="9.5" fill="var(--ink)" />
          <rect x="490.5" y="224" width="2.4" height="8" rx="0.8" fill="#ffffff" />
          <rect x="495" y="224" width="2.4" height="8" rx="0.8" fill="#ffffff" />
          <text x="510" y="232" fontFamily={SANS} fontSize="11.5" fontWeight="600" fill="var(--muted-foreground)">
            Waits for your click
          </text>
        </svg>
        <figcaption className="mt-2.5 text-center text-xs text-muted-foreground">
          End state in action: prioritized deal inbox, call objection pulled in, and an editable call + email sequence ready to launch.
        </figcaption>
      </div>
    </figure>
  );
}

/** Visual 3: Tabbed Decision Line diagram (autonomous prep vs. human calls). */
export function DecisionLineVisual() {
  const { selected } = useSelectedExample();

  const configs: Record<
    ExampleKey,
    { agent: [string, string, string]; human: [string, string, string]; caption: string; label: string }
  > = {
    churn: {
      agent: [
        "Scan calls, emails, tickets & billing",
        "Segment accounts by risk level",
        "Build drill-in & pre-draft check-in",
      ],
      human: ["Edit draft & click Send", "Make the save call", "Offer a credit or fix"],
      caption: "The agent populates the segmented inbox; your team edits and clicks Send.",
      label: "Decision line for catching at-risk customers",
    },
    quotes: {
      agent: [
        "Pull stalled quotes, calls & emails",
        "Segment deals & spot open objection",
        "Pre-draft Day 1 / 3 / 7 call & email",
      ],
      human: ["Edit & click Launch", "Make the Day 3 live call", "Adjust price or scope"],
      caption: "The agent loads the inbox with each deal's sequence; your rep clicks Launch and owns the live call.",
      label: "Decision line for recovering stalled quotes",
    },
  };

  return (
    <figure className="my-2 rounded-2xl border border-tint-strong bg-tint p-4 sm:p-5">
      <TabBar ariaLabel="Decision line examples" prefix="line" />

      {(["churn", "quotes"] as const).map((key) => {
        const cfg = configs[key];
        return (
          <div
            key={key}
            role="tabpanel"
            id={`line-panel-${key}`}
            aria-labelledby={`line-tab-${key}`}
            hidden={selected !== key}
          >
            <svg viewBox="0 0 680 264" role="img" aria-label={cfg.label} className="block h-auto w-full">
              <rect x="14" y="54" width="382" height="192" rx="14" fill="#ffffff" stroke="var(--ink)" strokeWidth="2" />
              <rect x="28" y="40" width="212" height="28" rx="14" fill="var(--brand)" stroke="var(--ink)" strokeWidth="2" />
              <text x="134" y="58.5" textAnchor="middle" fontFamily={DISPLAY} fontSize="11.5" fontWeight="800" fill="#ffffff" letterSpacing="0.05em">
                AGENT RUNS ON ITS OWN
              </text>

              {cfg.agent.map((step, i) => {
                const y = 84 + i * 52;
                const cy = y + 21;
                return (
                  <g key={step}>
                    <rect x="30" y={y} width="350" height="42" rx="9" fill="var(--tint)" stroke="var(--tint-strong)" strokeWidth="1.5" />
                    <circle cx="54" cy={cy} r="10.5" fill="var(--brand)" stroke="var(--ink)" strokeWidth="2" />
                    <path
                      d={`M49.5 ${cy + 0.2} L52.5 ${cy + 3.4} L59 ${cy - 3.5}`}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <text x="76" y={cy + 4.5} fontFamily={SANS} fontSize="13" fontWeight="600" fill="var(--ink)">
                      {step}
                    </text>
                  </g>
                );
              })}

              <line x1="422" y1="34" x2="422" y2="250" stroke="var(--ink)" strokeWidth="2.5" strokeDasharray="6 5" />
              <rect x="364" y="6" width="116" height="24" rx="12" fill="var(--ink)" />
              <text x="422" y="22" textAnchor="middle" fontFamily={DISPLAY} fontSize="10.5" fontWeight="800" fill="#ffffff" letterSpacing="0.06em">
                DECISION LINE
              </text>

              <path d="M396 157 L442 157" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M436 151 L444 157 L436 163" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              <rect x="448" y="54" width="218" height="192" rx="14" fill="#ffffff" stroke="var(--ink)" strokeWidth="2" />
              <rect x="462" y="40" width="188" height="28" rx="14" fill="var(--ink)" />
              <text x="556" y="58.5" textAnchor="middle" fontFamily={DISPLAY} fontSize="11.5" fontWeight="800" fill="#ffffff" letterSpacing="0.05em">
                COMES BACK TO YOU
              </text>

              {cfg.human.map((step, i) => {
                const y = 84 + i * 52;
                const cy = y + 21;
                return (
                  <g key={step}>
                    <rect x="462" y={y} width="190" height="42" rx="9" fill="var(--muted)" stroke="var(--border)" strokeWidth="1.5" />
                    <circle cx="484" cy={cy} r="10.5" fill="var(--ink)" />
                    <rect x="480" y={cy - 4.5} width="2.8" height="9" rx="1" fill="#ffffff" />
                    <rect x="485.2" y={cy - 4.5} width="2.8" height="9" rx="1" fill="#ffffff" />
                    <text x="504" y={cy + 4.5} fontFamily={SANS} fontSize="12.6" fontWeight="600" fill="var(--ink)">
                      {step}
                    </text>
                  </g>
                );
              })}
            </svg>
            <figcaption className="mt-2.5 text-center text-xs text-muted-foreground">{cfg.caption}</figcaption>
          </div>
        );
      })}
    </figure>
  );
}

/** Visual 4: 3-stage delegation ladder (Competence -> Mutual trust -> Disciplined initiative). */
export function DelegationStageLadder() {
  const stages = [
    {
      pill: "Stage 1",
      title: "Draft & review",
      body: "Prove competence on one narrow job. The agent reads data and writes drafts; you check each output.",
      active: false,
    },
    {
      pill: "Stage 2",
      title: "Sort & flag",
      body: "Once routine runs hold up cleanly, let the agent segment accounts and flag exceptions on its own.",
      active: false,
    },
    {
      pill: "Stage 3",
      title: "Run to the line",
      body: "Your segmented inbox stays prepped automatically. Your team edits, clicks Send, and keeps the big calls.",
      active: true,
    },
  ];

  return (
    <div className="my-2 grid gap-4 sm:grid-cols-3">
      {stages.map((s) => (
        <div
          key={s.pill}
          className={cn(
            "flex flex-col gap-2 rounded-xl border-2 border-ink p-4 shadow-[5px_5px_0_var(--brand)]",
            s.active ? "bg-tint" : "bg-white"
          )}
        >
          <span className="self-start rounded-full bg-primary px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
            {s.pill}
          </span>
          <h3 className="mt-0.5 font-display text-base font-bold text-ink">{s.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
        </div>
      ))}
    </div>
  );
}
