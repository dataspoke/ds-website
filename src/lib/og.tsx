/**
 * Shared pieces for images rendered with next/og (share image, logo).
 * The OG renderer can't read CSS variables, so the colors are copied from globals.css.
 */
export const OG_COLORS = {
  brand: "#4a90e2",
  primary: "#1f63b5",
  foreground: "#0f1e33",
  muted: "#475569",
  tint: "#eef5fc",
};

/** Same geometry as LogoMark in components/shared/logo.tsx. */
export function OgMark({ px, color = OG_COLORS.brand }: { px: number; color?: string }) {
  return (
    <svg width={px} height={px} viewBox="0 0 100 100">
      <g stroke={color} strokeWidth="5" fill={color}>
        <line x1="50" y1="50" x2="50" y2="10" />
        <line x1="50" y1="50" x2="85" y2="30" />
        <line x1="50" y1="50" x2="85" y2="70" />
        <line x1="50" y1="50" x2="50" y2="90" />
        <line x1="50" y1="50" x2="15" y2="70" />
        <line x1="50" y1="50" x2="15" y2="30" />
        <circle cx="50" cy="50" r="14" />
        <circle cx="50" cy="10" r="8" />
        <circle cx="85" cy="30" r="8" />
        <circle cx="85" cy="70" r="8" />
        <circle cx="50" cy="90" r="8" />
        <circle cx="15" cy="70" r="8" />
        <circle cx="15" cy="30" r="8" />
      </g>
    </svg>
  );
}
