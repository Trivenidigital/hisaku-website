/**
 * Testimonial — no card. Just a 120px ghost quote mark
 * (color #1a1a24) and a 22px italic quote in silver. The structure
 * does the work. Attribution is small, dim, tabular.
 */
interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

export function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <section
      aria-label="Client testimonial"
      style={{
        backgroundColor: "#0a0a0f",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "120px 48px",
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
          aria-hidden
          style={{
            position: "absolute",
            top: -40,
            left: -20,
            fontSize: 120,
            lineHeight: 1,
            color: "#1a1a24",
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          “
        </span>
        <blockquote
          style={{
            position: "relative",
            margin: 0,
            fontSize: 22,
            lineHeight: 1.6,
            fontStyle: "italic",
            fontWeight: 400,
            color: "#d0d6e0",
            letterSpacing: "-0.005em",
          }}
        >
          {quote}
        </blockquote>
        <p
          style={{
            margin: "40px 0 0",
            fontSize: 13,
            color: "#8a8f98",
            letterSpacing: "0.04em",
          }}
        >
          <span style={{ color: "#f7f8f8", fontWeight: 500 }}>{author}</span>
          <span style={{ color: "#62666d" }}> · {role}</span>
        </p>
      </div>
    </section>
  );
}
