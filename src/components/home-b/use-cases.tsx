"use client";

import { useId, useState } from "react";
import { Headset, Megaphone, PiggyBank, Route } from "lucide-react";
import { Section, SectionHead } from "@/components/shared/section";
import { cn } from "@/lib/utils";
import { FinanceScene, JourneyScene, MarketingScene, ServiceScene } from "./scenes";

const TABS = [
  { key: "marketing", label: "AI in marketing", icon: Megaphone, caption: "Know which ads pay, and follow up fast.", Scene: MarketingScene },
  { key: "journey", label: "Customer journey", icon: Route, caption: "See where customers stall, and where to fix it.", Scene: JourneyScene },
  { key: "finance", label: "Finance and numbers", icon: PiggyBank, caption: "One trustworthy view instead of month-end exports.", Scene: FinanceScene },
  { key: "service", label: "Customer service", icon: Headset, caption: "Replies drafted from your records, approved by you.", Scene: ServiceScene },
];

/** Tabbed use cases. Scenes are illustrative mockups with sample data. */
export function UseCasesB() {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <Section id="use-cases" tint>
      <SectionHead eyebrow="Where it shows up" title="What this looks like in your business." />
      <div role="tablist" aria-label="Use cases" className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {TABS.map((t, i) => (
          <button
            key={t.key}
            role="tab"
            id={`${id}-tab-${i}`}
            type="button"
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            onClick={() => setActive(i)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm font-semibold transition-colors",
              active === i
                ? "border-brand bg-background text-primary shadow-sm"
                : "border-transparent bg-background/60 text-muted-foreground hover:bg-background"
            )}
          >
            <t.icon className="size-4 shrink-0" aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>
      {TABS.map((t, i) => (
        <div
          key={t.key}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={active !== i}
          className="mt-8 grid gap-6"
        >
          <p className="max-w-xl text-lg font-semibold">{t.caption}</p>
          <t.Scene />
        </div>
      ))}
    </Section>
  );
}
