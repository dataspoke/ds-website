import { TOOLS } from "@/content/home";

/** Wordmarks as text only. Vendor brand rules do not permit logos without a partner agreement. */
export function ToolsBandC() {
  return (
    <div className="border-y border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:px-6 md:flex-row md:items-baseline md:gap-8">
        <p className="shrink-0 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-primary">
          Works with the tools you already use
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
          {TOOLS.map((tool) => (
            <li
              key={tool}
              className="font-display text-[1.05rem] font-bold tracking-tight text-ink/55"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
