import { SpringCounter } from "@/components/ui/SpringCounter";

/**
 * AboutStrip — 2-col about + 3 stats. Single dark bg.
 * Stat numbers are PURE WHITE (not violet) per Superhuman restraint.
 */

const STATS: { value: number; label: string }[] = [
  { value: 8, label: "clients" },
  { value: 3, label: "countries" },
  { value: 0, label: "missed deadlines" },
];

export function AboutStrip() {
  return (
    <section
      aria-label="About"
      style={{
        backgroundColor: "#0a0a0f",
        color: "#f7f8f8",
        padding: "100px 48px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 64,
          alignItems: "start",
        }}
      >
        <div>
          <p
            style={{
              fontWeight: 500,
              fontSize: 13,
              color: "#62666d",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: "0 0 24px",
            }}
          >
            About
          </p>
          <h2
            style={{
              fontWeight: 510,
              fontSize: "clamp(36px, 5vw, 56px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "#f7f8f8",
              margin: 0,
            }}
          >
            A 2-person studio.
            <br />
            Thinking like an agency.
          </h2>
        </div>

        <div>
          <p
            style={{
              fontWeight: 400,
              fontSize: 17,
              lineHeight: 1.75,
              color: "#8a8f98",
              margin: "0 0 48px",
            }}
          >
            We are Srini and a small team of collaborators in Hyderabad. We
            work with startups and growing businesses to build their digital
            presence — from the first wireframe to the live product.
          </p>

          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
              margin: 0,
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt
                  style={{
                    fontWeight: 510,
                    fontSize: 48,
                    color: "#f7f8f8",
                    margin: 0,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  <SpringCounter to={s.value} />
                </dt>
                <dd
                  style={{
                    margin: "12px 0 0",
                    fontWeight: 400,
                    fontSize: 13,
                    color: "#8a8f98",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
