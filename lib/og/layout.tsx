import type { ReactElement } from "react";

/**
 * Shared OG layout used by every opengraph-image.tsx route.
 *
 * Signature props let case study, service, and default OG images vary while
 * keeping the same branded composition (Hisaku wordmark top-left, title
 * dominating, lime accent, dark base). DRY — one file changes, every
 * preview card updates.
 *
 * Renders via Next.js `ImageResponse` at build time (static optimization by
 * default in Next.js 16 when the route has no request-time APIs).
 */

export interface OgLayoutProps {
  title: string;
  subtitle?: string;
  tagList?: string[];
}

// Design tokens inlined because ImageResponse doesn't support @import/@theme.
// If tokens change, update here + globals.css together.
const TOKEN = {
  base: "#0a0a0a",
  textPrimary: "#ffffff",
  textSecondary: "#a0a0a0",
  accent: "#e8ff47",
};

export function OgLayout({
  title,
  subtitle,
  tagList,
}: OgLayoutProps): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: TOKEN.base,
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top: brand mark */}
      <div
        style={{
          fontSize: 24,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: TOKEN.accent,
        }}
      >
        Hisaku
      </div>

      {/* Middle: title */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: TOKEN.textPrimary,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: "1040px",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              fontSize: 28,
              color: TOKEN.textSecondary,
              lineHeight: 1.3,
              maxWidth: "900px",
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      {/* Bottom: tags + tagline */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 20,
          color: TOKEN.textSecondary,
        }}
      >
        <div style={{ display: "flex", gap: "16px" }}>
          {(tagList ?? []).map((tag) => (
            <span
              key={tag}
              style={{
                padding: "6px 14px",
                border: `1px solid ${TOKEN.textSecondary}`,
                borderRadius: "999px",
                fontSize: 18,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div style={{ color: TOKEN.textPrimary }}>The work is the pitch.</div>
      </div>
    </div>
  );
}

/** Size used by every opengraph-image.tsx route — export matches Next.js convention. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;
