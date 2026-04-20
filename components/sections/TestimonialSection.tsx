/**
 * TestimonialSection — dark bg.
 *
 * Defensive rewrite: motion wrappers removed (they were producing
 * invisible render on live because whileInView wasn't firing in some
 * viewports). Content is now always visible. Hex colors inline so we
 * don't depend on @theme variable resolution.
 */

export function TestimonialSection() {
  return (
    <section
      data-theme="dark"
      aria-label="Testimonial"
      className="relative px-6 overflow-hidden"
      style={{
        backgroundColor: "#050507",
        color: "#f4f3ef",
        paddingTop: "clamp(96px, 14vw, 160px)",
        paddingBottom: "clamp(96px, 14vw, 160px)",
      }}
    >
      <span
        aria-hidden="true"
        className="absolute select-none pointer-events-none leading-none font-syne"
        style={{
          top: 40,
          left: 60,
          fontFamily: "var(--font-syne, sans-serif)",
          fontWeight: 800,
          fontSize: "clamp(100px, 18vw, 200px)",
          color: "#e8ff47",
          opacity: 0.15,
        }}
      >
        &ldquo;
      </span>

      <div className="relative mx-auto" style={{ maxWidth: 680 }}>
        <blockquote>
          <p
            className="italic"
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 300,
              fontSize: 26,
              lineHeight: 1.75,
              textAlign: "center",
              color: "rgba(244,243,239,0.85)",
            }}
          >
            Hisaku understood our business from day one. They didn&apos;t just
            build a website — they understood what our customers needed to
            find us.
          </p>
        </blockquote>
        <p
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontWeight: 400,
            fontSize: 14,
            marginTop: 32,
            textAlign: "right",
            color: "rgba(244,243,239,0.45)",
          }}
        >
          — Owner, Hello2India{" "}
          <span aria-hidden="true" style={{ color: "#e8ff47" }}>
            ·
          </span>{" "}
          Herndon, Virginia
        </p>
      </div>
    </section>
  );
}
