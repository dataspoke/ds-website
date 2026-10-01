import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> {
  tint?: boolean;
  tight?: boolean;
}

/** Page section with the site's standard vertical rhythm and container. */
export function Section({ tint, tight, className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        tight ? "py-12 sm:py-16" : "py-16 sm:py-24",
        tint && "bg-tint",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

interface SectionHeadProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  className?: string;
}

export function SectionHead({ eyebrow, title, lede, className }: SectionHeadProps) {
  return (
    <div className={cn("grid max-w-2xl gap-3.5", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl">{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}
