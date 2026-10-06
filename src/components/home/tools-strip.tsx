import { TOOL_GROUPS } from "@/content/home";

/** Text wordmarks only. Vendor brand rules do not permit logos without a partner agreement. */
export function ToolsStrip() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-y border-border py-6">
        <p className="text-sm text-muted-foreground">Works with the tools you already use</p>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-5">
          {TOOL_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                {group.label}
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {group.tools.map((tool) => (
                  <li
                    key={tool}
                    className="font-display text-[1.05rem] font-bold tracking-tight text-muted-foreground/80"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
