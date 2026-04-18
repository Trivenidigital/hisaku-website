interface ResultStatsProps {
  results: ReadonlyArray<{ metric: string; label: string }>;
}

/**
 * Oversized-number result row for case study detail pages. Per design
 * doc, results are inline numerals with generous space, NOT bordered
 * card tiles (card grid is on the AI-slop blacklist).
 */
export function ResultStats({ results }: ResultStatsProps) {
  if (results.length === 0) return null;
  return (
    <section
      aria-label="Project results"
      className="max-w-6xl mx-auto px-6 py-16 md:py-20"
    >
      <div className="grid gap-10 md:gap-16 md:grid-cols-3">
        {results.slice(0, 5).map((r) => (
          <div key={`${r.metric}-${r.label}`} className="flex flex-col gap-2">
            <span
              className="text-5xl md:text-7xl font-bold leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-accent-primary)",
              }}
            >
              {r.metric}
            </span>
            <span
              className="text-sm md:text-base"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {r.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
