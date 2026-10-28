import { ArrowRight, Bot, Check, FileSpreadsheet, Phone, Receipt, Sparkles, UserRound, Zap } from "lucide-react";
import { Chip, HBar, IllustrativeBadge, Line, Spark, Stat, Window } from "./mock-ui";

/*
 * Four illustrative scenes. All numbers are placeholder sample data inside the
 * mockup and are not results or claims.
 */

export function MarketingScene() {
  return (
    <div className="relative">
      <Window title="Marketing · Where leads come from">
        <div className="grid gap-3 p-3 sm:grid-cols-[1.3fr_1fr] sm:p-4">
          <div className="grid gap-2.5 rounded-lg border border-border p-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              Leads this month <Chip>Sample</Chip>
            </div>
            <HBar label="Google Ads" value={86} text="43" />
            <HBar label="Referrals" value={62} text="31" />
            <HBar label="Website" value={44} text="22" />
            <HBar label="Meta Ads" value={24} text="12" />
            <p className="mt-1 text-[11px] text-muted-foreground">Cost per lead, updated nightly.</p>
          </div>
          <div className="grid content-start gap-2 rounded-lg border border-border p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <Sparkles className="size-3.5 text-brand" aria-hidden="true" /> Follow-up drafted
            </div>
            <div className="rounded-md bg-muted p-2.5">
              <p className="text-[11px] font-medium">To: new lead · Kitchen remodel</p>
              <Line w="92%" className="mt-2" />
              <Line w="78%" className="mt-1.5" />
              <Line w="60%" className="mt-1.5" />
            </div>
            <div className="flex gap-1.5">
              <Chip tone="brand">Approve</Chip>
              <Chip>Edit</Chip>
            </div>
          </div>
        </div>
      </Window>
      <IllustrativeBadge className="absolute left-3 top-[-12px]" />
    </div>
  );
}

const FLOW = [
  { icon: Phone, label: "Call comes in" },
  { icon: UserRound, label: "Customer record" },
  { icon: Zap, label: "Job scheduled" },
  { icon: Receipt, label: "Invoice sent" },
];

export function OperationsScene() {
  return (
    <div className="relative">
      <Window title="Operations · One call, no retyping">
        <div className="grid gap-4 p-3 sm:p-4">
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center">
            {FLOW.map(({ icon: Icon, label }, i) => (
              <li key={label} className="contents">
                <div className="grid justify-items-center gap-1.5 rounded-lg border border-border p-3 text-center">
                  <span className="flex size-8 items-center justify-center rounded-full bg-tint text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-semibold">{label}</span>
                </div>
                {i < FLOW.length - 1 && (
                  <span className="hidden items-center justify-center text-brand sm:flex" aria-hidden="true">
                    <ArrowRight className="size-4" />
                  </span>
                )}
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap items-center gap-2 rounded-lg bg-muted px-3 py-2 text-[11px] text-muted-foreground">
            <Chip tone="good">
              <Check className="size-3" aria-hidden="true" /> Ran automatically today: 23
            </Chip>
            <Chip tone="brand">Needs a person: 1</Chip>
            <span className="ml-auto">Sample</span>
          </div>
        </div>
      </Window>
      <IllustrativeBadge className="absolute left-3 top-[-12px]" />
    </div>
  );
}

export function FinanceScene() {
  return (
    <div className="relative">
      <Window title="Finance · From exports to live numbers">
        <div className="grid gap-3 p-3 sm:grid-cols-[1fr_auto_1.4fr] sm:items-start sm:p-4">
          <div className="grid content-start gap-2 rounded-lg border border-dashed border-border p-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              Before
            </span>
            {["sales-export-v3.xlsx", "quickbooks-FINAL.xlsx", "jobs (copy).xlsx"].map((f) => (
              <span key={f} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <FileSpreadsheet className="size-3.5" aria-hidden="true" /> {f}
              </span>
            ))}
          </div>
          <ArrowRight className="hidden size-5 self-center text-brand sm:block" aria-hidden="true" />
          <div className="grid gap-2 rounded-lg border border-border p-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-primary">After</span>
              <Chip>Sample</Chip>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Stat label="Revenue" value="$48.2k" />
              <Stat label="Costs" value="$31.9k" />
              <Stat label="Margin" value="34%" />
            </div>
            <Spark points={[30, 38, 35, 46, 52, 50, 61, 66]} />
            <p className="text-[11px] text-muted-foreground">Refreshed every morning.</p>
          </div>
        </div>
      </Window>
      <IllustrativeBadge className="absolute left-3 top-[-12px]" />
    </div>
  );
}

export function ServiceScene() {
  return (
    <div className="relative">
      <Window title="Customer service · Inbox">
        <div className="grid gap-3 p-3 sm:p-4">
          <div className="flex items-start gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <UserRound className="size-3.5" aria-hidden="true" />
            </span>
            <p className="max-w-[85%] rounded-xl rounded-tl-sm bg-muted px-3 py-2 text-xs">
              Hi, can I move my appointment to Thursday? Also, do you take card?
            </p>
          </div>
          <div className="flex items-start justify-end gap-2">
            <div className="max-w-[85%] rounded-xl rounded-tr-sm border border-tint-strong bg-tint px-3 py-2 text-xs">
              <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-primary">
                <Bot className="size-3" aria-hidden="true" /> Draft, from your own records
              </p>
              Thursday at 10am is open, I&apos;ve held it for you. Yes, we take card.
            </div>
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-tint text-primary">
              <Sparkles className="size-3.5" aria-hidden="true" />
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Chip tone="brand">Send</Chip>
            <Chip>Edit</Chip>
            <span className="ml-auto text-[11px] text-muted-foreground">A person approves every reply.</span>
          </div>
        </div>
      </Window>
      <IllustrativeBadge className="absolute left-3 top-[-12px]" />
    </div>
  );
}
