"use client";

import { NumberTicker } from "@/components/ui/NumberTicker";

/**
 * AboutStrip — 2-column about section with three animated stats.
 *
 * Numbers are in WHITE at 48px weight 500, tabular-nums, -0.035em
 * tracking. Labels below in muted grey. No card, no glass — pure
 * typography on the dark field.
 */
export function AboutStrip() {
  return (
    <section
      aria-label="About Hisaku"
      style={{
        backgroundColor: "#0a0a0f",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "120px 48px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
          className="about-strip-grid"
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#8a8f98",
              }}
            >
              About
            </p>
            <h2
              style={{
                margin: "16px 0 24px",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "#f7f8f8",
                lineHeight: 1.1,
              }}
            >
              A two-person studio in Hyderabad.
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.7,
                color: "#8a8f98",
                maxWidth: 540,
              }}
            >
              We partner with a small number of clients per quarter — enough
              time to understand the business, ship real work, and stay
              accountable for outcomes. The work is the pitch.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 40,
              paddingTop: 24,
            }}
          >
            <Stat value={40} suffix="+" label="Projects shipped since 2022" />
            <Stat value={12} label="Industries served" />
            <Stat value={98} suffix="%" label="Client retention rate" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 48,
          fontWeight: 500,
          letterSpacing: "-0.035em",
          color: "#f7f8f8",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
        }}
      >
        <NumberTicker value={value} />
        {suffix ? (
          <span style={{ color: "#d0d6e0" }}>{suffix}</span>
        ) : null}
      </div>
      <p
        style={{
          margin: "12px 0 0",
          fontSize: 14,
          color: "#8a8f98",
          fontWeight: 400,
        }}
      >
        {label}
      </p>
    </div>
  );
}
