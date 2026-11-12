import { BarChart3, Database, LayoutGrid, Plug, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import type { ServiceLineSlug } from "@/types";

/** One icon per service line. Import it directly in client components: components can't cross the server-to-client boundary as props. */
export const LINE_ICONS: Record<ServiceLineSlug, LucideIcon> = {
  capture: Plug,
  organize: Database,
  "metrics-dashboards": BarChart3,
  "analytics-data-science": TrendingUp,
  "ai-implementation": Sparkles,
  "custom-software": LayoutGrid,
};
