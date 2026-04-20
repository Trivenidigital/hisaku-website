/**
 * StudioStatement — full-width surface break between services and testimonial.
 *
 * Large centered headline with highlighted words in lime, followed by a
 * three-stat inline line separated by lime mid-dots.
 */
export function StudioStatement() {
  return (
    <section
      aria-label="Studio statement"
      className="px-6 py-24 md:py-32 text-center"
      style={{ background: "var(--color-elevated)" }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="leading-[1.05] tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(40px, 7vw, 72px)",
            color: "var(--color-text-primary)",
          }}
        >
          A 2-person studio that{" "}
          <span style={{ color: "var(--color-accent-primary)" }}>builds</span>
          <br />
          like a{" "}
          <span style={{ color: "var(--color-accent-primary)" }}>
            20-person
          </span>{" "}
          agency.
        </h2>

        <p
          className="mt-12 text-sm md:text-base"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            color: "var(--color-text-secondary)",
          }}
        >
          3 countries{" "}
          <span
            aria-hidden="true"
            className="mx-3"
            style={{ color: "var(--color-accent-primary)" }}
          >
            ·
          </span>{" "}
          8 clients{" "}
          <span
            aria-hidden="true"
            className="mx-3"
            style={{ color: "var(--color-accent-primary)" }}
          >
            ·
          </span>{" "}
          0 missed deadlines
        </p>
      </div>
    </section>
  );
}
