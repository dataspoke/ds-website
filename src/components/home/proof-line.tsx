import { PROOF_LINE } from "@/content/home";
import { cn } from "@/lib/utils";

/** The "doubled my revenue" proof. Used on the home hero and the About page. */
export function ProofLine({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "border-l-4 border-brand py-1 pl-4 text-[1.05rem] font-semibold leading-snug text-foreground",
        className
      )}
    >
      {PROOF_LINE.claim} <span className="text-primary">{PROOF_LINE.offer}</span>
    </p>
  );
}
