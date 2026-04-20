/**
 * TestimonialSection — quote with oversized decorative open-quote mark.
 *
 * No card, no box, no border. The decorative " sits top-left at 200px,
 * lime at 20% opacity, pointer-events disabled so it doesn't intercept
 * selection. Quote and attribution sit in a centered block above it.
 */
export function TestimonialSection() {
  return (
    <section
      aria-label="Testimonial"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ background: "var(--color-base)" }}
    >
      {/* Oversized decorative open-quote */}
      <span
        aria-hidden="true"
        className="absolute select-none pointer-events-none leading-none"
        style={{
          top: "3rem",
          left: "1rem",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(120px, 16vw, 200px)",
          color: "var(--color-accent-primary)",
          opacity: 0.2,
        }}
      >
        &ldquo;
      </span>

      <div className="relative max-w-3xl mx-auto">
        <blockquote>
          <p
            className="text-center italic leading-[1.4]"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "clamp(20px, 2.8vw, 28px)",
              color: "var(--color-text-primary)",
            }}
          >
            Hisaku understood our business from day one. They didn&apos;t just
            build a website — they understood what our customers needed to
            find us.
          </p>
        </blockquote>
        <p
          className="mt-10 text-right text-sm"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            color: "var(--color-text-secondary)",
          }}
        >
          — Owner, Hello2India{" "}
          <span
            aria-hidden="true"
            style={{ color: "var(--color-accent-primary)" }}
          >
            ·
          </span>{" "}
          Herndon, Virginia
        </p>
      </div>
    </section>
  );
}
