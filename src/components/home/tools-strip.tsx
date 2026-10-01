import { TOOLS } from "@/lib/constants";

/** Text wordmarks only. Vendor brand rules do not permit logos without a partner agreement. */
export function ToolsStrip() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2.5 border-y border-border py-5">
        <span className="mr-2 text-sm text-muted-foreground">
          Works with the tools you already use
        </span>
        {TOOLS.map((tool) => (
          <span
            key={tool}
            className="font-display text-[1.05rem] font-bold tracking-tight text-muted-foreground/80"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}
