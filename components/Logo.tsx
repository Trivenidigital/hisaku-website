interface LogoProps {
  /** Height in px. Width is computed to match the logo's aspect ratio. */
  size?: number;
  /** Accessible label. Set to empty string for decorative use. */
  label?: string;
  className?: string;
}

/**
 * Hisaku logo.
 *
 * Renders the real SVG from /public/logo.svg via a plain <img> tag with
 * a `filter: brightness(0) invert(1)` to force it white on dark
 * backgrounds. Simpler and more reliable than the mask-image approach
 * (which broke on some browsers when /logo.svg failed to cache).
 *
 * For truly mono-colored backgrounds, the filter guarantees the mark is
 * visible. On the rare white section where this might be embedded, swap
 * to the text fallback rendered below.
 */
export function Logo({ size = 40, label = "Hisaku", className }: LogoProps) {
  const width = Math.round(size * (559 / 550));
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/logo.svg"
      alt={label}
      width={width}
      height={size}
      className={className}
      style={{ filter: "brightness(0) invert(1)" }}
    />
  );
}

/**
 * Text-only fallback mark — used in contexts where the SVG file can't
 * resolve (e.g. certain email contexts). Not used in the app currently
 * but kept here so it's a one-line swap if needed.
 */
export function LogoText({ className }: { className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-syne)",
        fontWeight: 510,
        fontSize: "20px",
        color: "#e8ff47",
        letterSpacing: "-0.02em",
      }}
    >
      HISAKU
    </span>
  );
}
