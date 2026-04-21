/**
 * Hisaku design tokens — single source of truth for colors, fonts,
 * text scale, and section layout. Every page/component imports from
 * here so the site stays visually unified.
 *
 * Tokens are plain objects (not CSS variables) so they can be spread
 * into inline styles directly:
 *
 *   <h2 style={{ ...text.display, color: colors.white }}>
 */

export const colors = {
  bg: "#0a0a0a",
  surface: "#111111",
  border: "rgba(255,255,255,0.08)",
  accent: "#e8ff47",
  accentDim: "rgba(232,255,71,0.2)",
  white: "#ffffff",
  muted: "rgba(255,255,255,0.5)",
  muted2: "rgba(255,255,255,0.65)",
  muted3: "rgba(255,255,255,0.7)",
  dim: "rgba(255,255,255,0.25)",
  dim2: "rgba(255,255,255,0.4)",
  dim3: "rgba(255,255,255,0.3)",
} as const;

export const fonts = {
  display: "var(--font-jakarta), sans-serif",
  body: "var(--font-jakarta), sans-serif",
  mono: "ui-monospace, 'SF Mono', Menlo, monospace",
} as const;

export const text = {
  hero: {
    fontSize: "clamp(52px, 7vw, 96px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1.05,
  },
  display: {
    fontSize: "clamp(36px, 5vw, 64px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  },
  title: {
    fontSize: "clamp(24px, 3vw, 36px)",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
  },
  body: {
    fontSize: "17px",
    fontWeight: 400,
    lineHeight: 1.7,
  },
  small: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: 1.6,
  },
  label: {
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  },
} as const;

export const section = {
  padding: "120px 48px",
  maxWidth: 1200,
  radius: 12,
} as const;
