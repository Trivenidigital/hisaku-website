interface TestimonialProps {
  quote: string;
  author: string;
  /** Company + role, e.g. "CEO, Vizora" */
  attribution: string;
}

/**
 * Pull-quote testimonial. Per design doc: oversized pull-quote typography,
 * attribution in the margin. NO colored left-border (that pattern is on the
 * AI-slop blacklist from the outside voice review).
 */
export function Testimonial({ quote, author, attribution }: TestimonialProps) {
  return (
    <section
      aria-label="Testimonial"
      className="max-w-6xl mx-auto px-6 py-20 md:py-28"
    >
      <figure className="grid md:grid-cols-[1fr_auto] gap-10 items-end">
        <blockquote>
          <p
            className="text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>
        <figcaption className="text-sm">
          <p className="font-semibold">{author}</p>
          <p style={{ color: "var(--color-text-secondary)" }}>{attribution}</p>
        </figcaption>
      </figure>
    </section>
  );
}
