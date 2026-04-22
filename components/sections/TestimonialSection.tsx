/**
 * TestimonialSection — static 5-star centered. No motion wrappers.
 */
export function TestimonialSection() {
  return (
    <section
      aria-label="Testimonial"
      style={{
        backgroundColor: "#0f1011",
        color: "#f7f8f8",
        padding: "100px 48px",
      }}
    >
      <div
        style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}
      >
        <p
          aria-label="5 out of 5 stars"
          style={{
            color: "#e8ff47",
            fontSize: 18,
            letterSpacing: "0.3em",
            margin: 0,
          }}
        >
          ★★★★★
        </p>

        <blockquote style={{ margin: "24px 0", padding: 0 }}>
          <p
            style={{
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.85)",
              margin: 0,
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
            fontSize: 14,
            color: "rgba(255,255,255,0.45)",
            margin: 0,
          }}
        >
          — Owner, Hello2India · Herndon, Virginia
        </p>
      </div>
    </section>
  );
}
