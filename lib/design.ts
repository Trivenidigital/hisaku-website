/**
 * Hisaku design tokens — Linear-inspired, lime accent override.
 *
 * Color system: grayscale on near-black; single chromatic accent is
 * lime (#e8ff47) where Linear uses indigo (#5e6ad2). Everything else
 * tracks Linear's dark-mode-native system exactly.
 *
 * Typography: Inter Variable with cv01 + ss03 globally. Signature
 * weight 510 for emphasis. Aggressive negative letter-spacing at
 * display sizes.
 */

export const colors = {
  bg: "#08090a",
  surface: "#0f1011",
  elevated: "#191a1b",
  white: "#f7f8f8",
  silver: "#d0d6e0",
  muted: "#8a8f98",
  muted2: "#8a8f98",
  dim: "#62666d",
  dim3: "#62666d",
  accent: "#e8ff47",
  accentHover: "#f0ff6e",
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
