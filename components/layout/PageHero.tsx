import type { ReactNode } from "react";
import { colors, fonts } from "@/lib/design";

interface PageHeroProps {
  /** Small uppercase label above the title, rendered in lime. */
  label: string;
  /** The main title. The `accentWord` portion gets highlighted. */
  title: string;
  /** Optional second-line subtitle below the title. */
  subtitle?: string;
  /**
   * A substring of `title` to render in lime. Match is exact and
   * appended to the end of the title output.
   *
   * Example:
   *   title="Things we've"  accentWord="built."
   *   → "Things we've [built.]" where [built.] is lime.
   */
  accentWord?: string;
  /** Optional supplementary children rendered below the subtitle. */
  children?: ReactNode;
  /** Minimum viewport height. Default 60vh. */
  minHeight?: string;
}

/**
 * PageHero — consistent hero used at the top of every interior page.
 *
 *   ┌───────────────────────────────────┐
 *   │  ABOUT HISAKU            (lime)   │
 *   │  We Build What Moves.             │
 *   │            ^^^^^^^ (lime accent)  │
 *   │  Optional subtitle (muted)        │
 *   └───────────────────────────────────┘
 *
 * Full-width dark section, centered content, 60vh minimum. The label
 * sits 24px above the title; the title is Plus Jakarta 800 at the
 * hero size; the accent word (optional) is rendered in lime by
 * splitting the title string and wrapping the tail in a span.
 */
export default function PageHero({
  label,
  title,
  subtitle,
  accentWord,
  children,
  minHeight = "60vh",
}: PageHeroProps) {
  // Split title into prefix + accent so the accent portion renders lime.
  let prefix = title;
  let accent = "";
  if (accentWord && title.endsWith(accentWord)) {
    prefix = title.slice(0, title.length - accentWord.length).trimEnd();
    accent = accentWord;
  } else if (accentWord && title.includes(accentWord)) {
    const idx = title.indexOf(accentWord);
    prefix = title.slice(0, idx).trimEnd();
    accent = title.slice(idx);
  }

  return (
    <section
      aria-label={label}
      style={{
        backgroundColor: colors.bg,
        minHeight,
        paddingTop: 160,
        paddingBottom: 80,
        paddingLeft: 48,
        paddingRight: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        textAlign: "left",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      <p
        style={{
          fontFamily: fonts.body,
          fontWeight: 510,
          fontSize: 12,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: colors.muted,
          margin: "0 0 24px",
        }}
      >
        {label}
      </p>

      <h1
        style={{
          fontFamily: fonts.display,
          fontWeight: 510,
          fontSize: "clamp(52px, 7vw, 96px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: colors.white,
          margin: 0,
          maxWidth: 1100,
        }}
      >
        {prefix}
        {accent ? (
          <>
            {prefix ? " " : ""}
            <span style={{ color: colors.accent }}>{accent}</span>
          </>
        ) : null}
      </h1>

      {subtitle ? (
        <p
          style={{
            marginTop: 24,
            fontFamily: fonts.body,
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.7,
            color: colors.muted,
            maxWidth: 640,
          }}
        >
          {subtitle}
        </p>
      ) : null}

      {children ? <div style={{ marginTop: 32 }}>{children}</div> : null}
      </div>
    </section>
  );
}
