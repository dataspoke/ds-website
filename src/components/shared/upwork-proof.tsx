import { SOCIAL_LINKS, UPWORK_PROOF } from "@/lib/constants";

const linkClass =
  "underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground hover:decoration-foreground/40";

/**
 * Homepage only, beside the booking decision. One text line, no logo or badge.
 */
export function UpworkRatingLine() {
  return (
    <p className="text-sm text-muted-foreground">
      Rated {UPWORK_PROOF.rating} by {UPWORK_PROOF.clientCount} clients
      <span aria-hidden="true"> · </span>
      <a
        href={SOCIAL_LINKS.upwork}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        verified on Upwork
      </a>
    </p>
  );
}

/** About page only. The badge and job-success facts, still just a text link. */
export function UpworkCredential() {
  return (
    <p className="text-sm text-muted-foreground">
      <a
        href={SOCIAL_LINKS.upwork}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {UPWORK_PROOF.badge} · {UPWORK_PROOF.jobSuccess} on Upwork
      </a>
    </p>
  );
}
