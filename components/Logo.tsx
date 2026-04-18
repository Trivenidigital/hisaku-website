import type { CSSProperties } from "react";

interface LogoProps {
  /** Height in px. Width is computed to match the logo's aspect ratio (559:550). */
  size?: number;
  /**
   * Color override. Accepts any CSS color or a CSS variable reference.
   * Defaults to the primary lime accent.
   */
  color?: string;
  /** Accessible label. Set to empty string for decorative use. */
  label?: string;
  className?: string;
}

/**
 * Hisaku logo, rendered via CSS mask-image.
 *
 * The source SVG at /public/logo.svg has multi-colored fills (black, gray,
 * white paths). Using it as a mask ignores those fills — the background
 * color fills wherever the SVG has non-transparent pixels. Net result:
 * the whole silhouette renders in one chosen color on any background.
 *
 * This is preferred over:
 *   - <img src="/logo.svg" />  — can't easily retint multi-path SVGs
 *   - filter: invert()         — doesn't produce arbitrary colors
 *   - inlining the SVG JSX     — loses the benefit of a cached static asset
 */
export function Logo({
  size = 32,
  color = "var(--color-accent-primary)",
  label = "Hisaku",
  className,
}: LogoProps) {
  // Source aspect ratio from public/logo.svg viewBox (559 / 550 ≈ 1.016).
  const width = Math.round(size * (559 / 550));

  const maskStyle: CSSProperties = {
    width,
    height: size,
    backgroundColor: color,
    WebkitMaskImage: "url('/logo.svg')",
    maskImage: "url('/logo.svg')",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };

  if (label) {
    return (
      <span
        role="img"
        aria-label={label}
        className={className}
        style={maskStyle}
      />
    );
  }

  return <span aria-hidden="true" className={className} style={maskStyle} />;
}
