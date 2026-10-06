import { PROOF_LINE } from "@/content/lp";

/** The "doubled my revenue" proof line, styled as a standalone callout. */
export function ProofLine() {
  return (
    <p className="border-l-2 border-brand pl-5 text-lg font-medium leading-snug text-ink sm:text-xl">
      {PROOF_LINE}
    </p>
  );
}
