/**
 * RadialVignette — static violet bloom for the homepage hero.
 *
 * A single faint radial gradient centered (or offset) on the section.
 * Low opacity (~8%) so it reads as composure, not energy. Zero motion.
 * Drop it absolutely-positioned inside any section and it'll fill.
 */
interface RadialVignetteProps {
  /** Hex or rgba color of the bloom. Default violet #8B5CF6. */
  color?: string;
  /** Peak opacity at the center, 0–1. Default 0.08. */
  opacity?: number;
  /** Horizontal center position in % (0 = left, 100 = right). Default 50. */
  x?: number;
  /** Vertical center position in % (0 = top, 100 = bottom). Default 50. */
  y?: number;
  /** Radius as a percentage of the section's bounding box. Default 60. */
  size?: number;
}

export function RadialVignette({
  color = "#8B5CF6",
  opacity = 0.08,
  x = 50,
  y = 50,
  size = 60,
}: RadialVignetteProps) {
  // Convert hex → rgba at requested opacity. Supports #RRGGBB only.
  const rgba = hexToRgba(color, opacity);
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        background: `radial-gradient(circle at ${x}% ${y}%, ${rgba} 0%, transparent ${size}%)`,
      }}
    />
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  const int = parseInt(m[1], 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
