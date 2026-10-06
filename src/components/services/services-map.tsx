import { ServicesDiagram, type DiagramLine } from "@/components/shared/spoke-diagram";
import {
  HUB_LINES,
  SERVICE_DIAGRAM_LABELS,
  SERVICES_PAGE,
  SPOKE_LINES,
} from "@/content/services";
import type { ServiceLine } from "@/types";

const toDiagram = (l: ServiceLine): DiagramLine => ({
  label: SERVICE_DIAGRAM_LABELS[l.slug],
  href: `/services/${l.slug}`,
});

/** The services hub-and-spoke diagram, phone and desktop versions. */
export function ServicesMap({ className }: { className?: string }) {
  const props = {
    hubLabel: SERVICES_PAGE.diagramHub,
    hubs: HUB_LINES.map(toDiagram),
    spokes: SPOKE_LINES.map(toDiagram),
  };
  return (
    <div className={className}>
      <ServicesDiagram compact className="sm:hidden" {...props} />
      <ServicesDiagram className="hidden sm:block" {...props} />
    </div>
  );
}
