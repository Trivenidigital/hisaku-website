/**
 * DotPattern — low-opacity dot grid background for sections.
 *
 * Pure CSS radial-gradient pattern. Masked with a soft radial fade so
 * edges don't hard-cut against section borders.
 */
interface DotPatternProps {
  /** Dot color. Default faint white. */
  color?: string;
  /** Spacing in px between dots. Default 32. */
  size?: number;
  /** Whether to apply a soft center-out mask. Default true. */
  masked?: boolean;
}

export function DotPattern({
  color = "rgba(255,255,255,0.06)",
  size = 32,
  masked = true,
}: DotPatternProps) {
  const mask = masked
    ? "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)"
    : undefined;
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        backgroundImage: `radial-gradient(${color} 1px, transparent 1.2px)`,
        backgroundSize: `${size}px ${size}px`,
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    />
  );
}
