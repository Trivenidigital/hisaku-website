"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

/**
 * GlassCard — glassmorphic surface used for work cards, services
 * cells, capability bento tiles, and /work/[slug] TOC.
 *
 * Baseline: rgba(255,255,255,0.02) + backdrop-filter: blur(20px)
 * saturate(160%) + 1px rgba(255,255,255,0.06) border + 8px radius.
 * Hover: border brightens to 0.14, bg to 0.04, saturation to 200%,
 * translates up 3px. Mild — the glass itself does most of the work.
 *
 * Accepts `as` so it can render as an <article>, <a>, <div> etc.
 * Forward any additional styles via `style`; they override defaults.
 */
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Extra tightness on the hover — false for static tiles. Default true. */
  interactive?: boolean;
  /** Border radius. Default 12. */
  radius?: number;
  /** Render as a specific wrapper. Must be a block-level intrinsic. */
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function GlassCard({
  children,
  className,
  style,
  interactive = true,
  radius = 12,
  onMouseEnter,
  onMouseLeave,
}: GlassCardProps) {
  const [hover, setHover] = useState(false);

  const base: CSSProperties = {
    position: "relative",
    backgroundColor:
      interactive && hover
        ? "rgba(255,255,255,0.04)"
        : "rgba(255,255,255,0.02)",
    backdropFilter:
      interactive && hover
        ? "blur(24px) saturate(200%)"
        : "blur(20px) saturate(160%)",
    WebkitBackdropFilter:
      interactive && hover
        ? "blur(24px) saturate(200%)"
        : "blur(20px) saturate(160%)",
    border: `1px solid ${
      interactive && hover
        ? "rgba(255,255,255,0.14)"
        : "rgba(255,255,255,0.06)"
    }`,
    borderRadius: radius,
    transform: interactive && hover ? "translateY(-3px)" : "translateY(0)",
    transition:
      "background-color 300ms ease, border-color 300ms ease, transform 300ms ease, backdrop-filter 300ms ease",
    overflow: "hidden",
  };

  return (
    <div
      className={className}
      style={{ ...base, ...style }}
      onMouseEnter={() => {
        setHover(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setHover(false);
        onMouseLeave?.();
      }}
    >
      {children}
    </div>
  );
}
