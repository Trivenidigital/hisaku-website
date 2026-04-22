import { SpringCounter } from "@/components/ui/SpringCounter";

/**
 * AboutStrip — 2-col about + 3 stats. Static layout.
 * The stats use SpringCounter which has its own safety timer so the
 * final value always renders even if the viewport trigger never fires.
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
        backgroundColor: "#0f1011",
        color: "#f7f8f8",
        padding: "120px 48px",
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
              fontWeight: 510,
              fontSize: 13,
              color: "#e8ff47",
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
              lineHeight: 1.1,
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
              color: "rgba(255,255,255,0.65)",
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
                    fontSize: 36,
                    color: "#e8ff47",
                    margin: 0,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  <SpringCounter to={s.value} />
                </dt>
                <dd
                  style={{
                    margin: "8px 0 0",
                    fontWeight: 400,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
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
