import { TOOLS } from "@/content/home";

/** Text wordmarks only; vendor brand rules do not permit logos. */
export function ToolsRowB() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-5">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Works with
        </span>
        {TOOLS.map((t) => (
          <span key={t} className="font-display text-[0.95rem] font-bold tracking-tight text-muted-foreground/70">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
