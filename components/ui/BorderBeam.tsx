"use client";

/**
 * BorderBeam — 21st.dev-style traveling border glow.
 *
 * A violet dot runs around the perimeter of the parent on a conic
 * gradient masked to a 1px border track. Use this on primary CTAs
 * (wrap the button content) for a subtle tracer that signals
 * interactivity without motion blur. Honor prefers-reduced-motion
 * via the shared media query in globals.css — animations disable
 * globally there.
 */
interface BorderBeamProps {
  /** Length of the visible beam as a fraction of perimeter. Default 0.2. */
  size?: number;
  /** Animation period in seconds. Default 4. */
  duration?: number;
  /** Beam color. Default violet. */
  color?: string;
  /** Border radius of the track. Should match the parent's. Default 8. */
  borderRadius?: number;
}

export function BorderBeam({
  size = 0.2,
  duration = 4,
  color = "#8B5CF6",
  borderRadius = 8,
}: BorderBeamProps) {
  const id = `bb-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          pointerEvents: "none",
          padding: 1,
          background: `conic-gradient(from var(--${id}-angle), transparent 0deg, ${color} ${size * 360}deg, transparent ${size * 720}deg)`,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: `border-beam-${id} ${duration}s linear infinite`,
        }}
      />
      <style>{`
        @property --${id}-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes border-beam-${id} {
          to { --${id}-angle: 360deg; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="border-beam-${id}"] {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
