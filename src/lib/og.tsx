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

/** Same geometry as WheelMark in components/shared/logo.tsx. */
export function OgMark({ px, color = OG_COLORS.brand }: { px: number; color?: string }) {
  return (
    <svg width={px} height={px} viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="19.5" fill="none" stroke={color} strokeWidth="3.5" />
      <circle cx="24" cy="24" r="4.6" fill={color} />
      <g stroke={color} strokeWidth="3" strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <line key={deg} x1="24" y1="15.2" x2="24" y2="9.2" transform={`rotate(${deg} 24 24)`} />
        ))}
      </g>
    </svg>
  );
}
