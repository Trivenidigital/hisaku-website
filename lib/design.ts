/**
 * Hisaku design tokens — Superhuman-inspired, dark-mode adaptation.
 *
 * Single bg #0a0a0f; sections separated by rgba borders. Violet
 * #8B5CF6 is the sole chromatic accent — reserved for primary CTAs,
 * form focus, and TracingBeam. Metrics, numbers, and eyebrow labels
 * are white or grey.
 *
 * Typography: Inter Variable with cv01 + ss03 globally. Weight 510
 * for emphasis. Tight negative letter-spacing at display sizes.
 */

export const colors = {
  bg: "#0a0a0f",
  surface: "#111118",
  elevated: "#1a1a24",
  white: "#f7f8f8",
  silver: "#d0d6e0",
  muted: "#8a8f98",
  muted2: "#8a8f98",
  dim: "#62666d",
  dim3: "#62666d",
  accent: "#8B5CF6",
  accentHover: "#7C3AED",
  border: "rgba(255,255,255,0.08)",
  borderSubtle: "rgba(255,255,255,0.05)",
  ghostBg: "rgba(255,255,255,0.02)",
  ghostBg2: "rgba(255,255,255,0.04)",
} as const;

export const fonts = {
  sans: "var(--font-inter), SF Pro Display, -apple-system, system-ui, sans-serif",
  display: "var(--font-inter), SF Pro Display, -apple-system, system-ui, sans-serif",
  body: "var(--font-inter), SF Pro Display, -apple-system, system-ui, sans-serif",
  syne: "var(--font-inter), SF Pro Display, -apple-system, system-ui, sans-serif",
  mono: "Berkeley Mono, ui-monospace, SF Mono, Menlo, monospace",
} as const;

export const text = {
  displayXL: {
    fontSize: "72px",
    fontWeight: 510,
    lineHeight: 1.0,
    letterSpacing: "-1.584px",
  },
  display: {
    fontSize: "48px",
    fontWeight: 510,
    lineHeight: 1.0,
    letterSpacing: "-1.056px",
  },
  h1: {
    fontSize: "32px",
    fontWeight: 400,
    lineHeight: 1.13,
    letterSpacing: "-0.704px",
  },
  h2: {
    fontSize: "24px",
    fontWeight: 400,
    lineHeight: 1.33,
    letterSpacing: "-0.288px",
  },
  h3: {
    fontSize: "20px",
    fontWeight: 590,
    lineHeight: 1.33,
    letterSpacing: "-0.24px",
  },
  bodyLg: {
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: "-0.165px",
  },
  body: {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: 1.5,
  },
  bodyMed: {
    fontSize: "16px",
    fontWeight: 510,
    lineHeight: 1.5,
  },
  small: {
    fontSize: "15px",
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: "-0.165px",
  },
  caption: {
    fontSize: "13px",
    fontWeight: 510,
    lineHeight: 1.5,
    letterSpacing: "-0.13px",
  },
  label: {
    fontSize: "12px",
    fontWeight: 510,
    lineHeight: 1.4,
  },
  nav: {
    fontSize: "13px",
    fontWeight: 510,
    lineHeight: 1.5,
    letterSpacing: "-0.13px",
  },
} as const;

export const section = {
  padding: "120px 48px",
  maxWidth: 1200,
  radius: 12,
} as const;
