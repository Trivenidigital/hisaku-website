interface ServiceFeatureListProps {
  features: ReadonlyArray<{ name: string; description: string }>;
}

/**
 * Editorial numbered list for service detail pages.
 *
 * Per design doc: "oversized number in the margin, feature title in display
 * face, 1-2 sentence description in body face, generous vertical rhythm."
 * Reads like a manifesto, NOT a 3x2 card grid (which is on the AI-slop
 * blacklist).
 */
export function ServiceFeatureList({ features }: ServiceFeatureListProps) {
  return (
    <ol className="flex flex-col">
      {features.map((feature, i) => (
        <li
          key={feature.name}
          className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10 py-8 md:py-12 border-t border-[color:var(--color-hairline)] last:border-b"
        >
          <span
            className="text-3xl md:text-5xl font-bold leading-none tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-secondary)",
            }}
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-3">
            <h3
              className="text-2xl md:text-3xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {feature.name}
            </h3>
            <p
              className="text-base md:text-lg max-w-2xl"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {feature.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
