/**
 * TestimonialSection — Superhuman-restrained: no card, no stars,
 * just a large ghost quote mark and italic body.
 */
export function TestimonialSection() {
  return (
    <section
      aria-label="Testimonial"
      style={{
        backgroundColor: "#0a0a0f",
        color: "#f7f8f8",
        padding: "100px 48px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          position: "relative",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -40,
            left: -8,
            fontSize: 120,
            fontWeight: 510,
            color: "#1a1a24",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          “
        </span>

        <blockquote style={{ margin: 0, padding: 0, position: "relative" }}>
          <p
            style={{
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.6,
              color: "#d0d6e0",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Hisaku understood our business from day one. They didn&apos;t just
            build a website — they understood what our customers needed to
            find us.
          </p>
        </blockquote>

        <p
          style={{
            fontWeight: 500,
            fontSize: 13,
            color: "#62666d",
            letterSpacing: "0.04em",
            margin: "32px 0 0",
          }}
        >
          — Owner, Hello2India · Herndon, Virginia
        </p>
      </div>
    </section>
  );
}
