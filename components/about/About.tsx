"use client";

import { NumberTicker } from "@/components/ui/NumberTicker";

/**
 * About — asymmetric editorial. Big narrative on the left (7/12),
 * stats + location float right (5/12). Values list sits below as a
 * numbered sequence. Different structure from the homepage's
 * balanced 2-column AboutStrip.
 */
const VALUES = [
  {
    title: "The work is the pitch.",
    body: "We don't sell slide decks. We show the actual sites, dashboards, and automations we've shipped.",
  },
  {
    title: "Ship real things, quickly.",
    body: "Every engagement ships something production-ready within two weeks. Iterate from truth, not hypotheticals.",
  },
  {
    title: "Stay small on purpose.",
    body: "Two people doing the work instead of six people coordinating it. Less coordination overhead, more leverage per hour.",
  },
  {
    title: "Own outcomes, not outputs.",
    body: "We measure what we ship by traffic, revenue, or hours saved — not by pixels pushed or lines of code written.",
  },
];

export function About() {
  return (
    <main
      id="main"
      style={{
        backgroundColor: "#0a0a0f",
        paddingTop: 160,
        paddingBottom: 160,
      }}
    >
      <section style={{ padding: "0 48px 120px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "7fr 5fr",
            gap: 80,
            alignItems: "start",
          }}
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
              About Hisaku
            </p>
            <h1
              style={{
                margin: "16px 0 0",
                fontSize: "clamp(40px, 5.5vw, 72px)",
                fontWeight: 500,
                letterSpacing: "-0.035em",
                color: "#f7f8f8",
                lineHeight: 1.02,
              }}
            >
              A studio built
              <br />
              <span style={{ fontStyle: "italic", fontWeight: 400, color: "#d0d6e0" }}>
                around the work.
              </span>
            </h1>
            <div
              style={{
                marginTop: 40,
                fontSize: 18,
                lineHeight: 1.75,
                color: "#8a8f98",
                maxWidth: 640,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <p style={{ margin: 0 }}>
                Hisaku is a two-person studio in Hyderabad. We design and
                build websites, internal tools, marketing systems, and AI
                automations for companies that want to grow on their own
                infrastructure — not rented from a platform.
              </p>
              <p style={{ margin: 0 }}>
                We started Hisaku because we were tired of agencies that
                treat the pitch as the product. We'd rather spend that time
                shipping something real. So we did.
              </p>
            </div>
          </div>

          <aside
            style={{
              position: "sticky",
              top: 100,
              paddingTop: 40,
              display: "flex",
              flexDirection: "column",
              gap: 48,
            }}
          >
            <Stat value={40} suffix="+" label="Projects shipped" />
            <Stat value={2022} label="Studio founded" group={false} />
            <Stat value={98} suffix="%" label="Client retention" />
            <div
              style={{
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#62666d",
                }}
              >
                Based in
              </p>
              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: 20,
                  fontWeight: 510,
                  letterSpacing: "-0.01em",
                  color: "#f7f8f8",
                }}
              >
                Hyderabad, India
              </p>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 14,
                  color: "#8a8f98",
                }}
              >
                Working with clients across IST, GMT, and PT.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section
        style={{
          padding: "80px 48px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
            What we believe
          </p>
          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 40,
            }}
          >
            {VALUES.map((v, i) => (
              <div key={i}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#62666d",
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "0.08em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2
                  style={{
                    margin: "16px 0 0",
                    fontSize: 22,
                    fontWeight: 510,
                    letterSpacing: "-0.015em",
                    color: "#f7f8f8",
                    lineHeight: 1.3,
                  }}
                >
                  {v.title}
                </h2>
                <p
                  style={{
                    margin: "16px 0 0",
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "#8a8f98",
                    maxWidth: 420,
                  }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({
  value,
  suffix,
  label,
  group = true,
}: {
  value: number;
  suffix?: string;
  label: string;
  group?: boolean;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 48,
          fontWeight: 500,
          letterSpacing: "-0.035em",
          color: "#f7f8f8",
          fontVariantNumeric: group ? "tabular-nums" : "tabular-nums",
          lineHeight: 1,
        }}
      >
        <NumberTicker value={value} />
        {suffix ? <span style={{ color: "#d0d6e0" }}>{suffix}</span> : null}
      </div>
      <p
        style={{
          margin: "12px 0 0",
          fontSize: 14,
          color: "#8a8f98",
        }}
      >
        {label}
      </p>
    </div>
  );
}
