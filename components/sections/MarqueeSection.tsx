/**
 * MarqueeSection — 56px tall scrolling strip between hero and work.
 *
 * Everything critical is inlined as a style prop — no dependency on
 * @theme vars or Tailwind utility classes that can get purged in the
 * production build. The .marquee-track class stays on the inner div as
 * a secondary hook, but the animation is also inlined as a backstop.
 */
const TOKENS = [
  "Vizora",
  "Hello2India",
  "Triveni Express",
  "Web Design",
  "AI Automation",
  "Marketing",
  "SEO",
  "Hisaku",
];

export function MarqueeSection() {
  // Duplicate 2x so the translateX(-50%) end state wraps cleanly.
  const items = [...TOKENS, ...TOKENS];

  return (
    <section
      aria-hidden="true"
      style={{
        backgroundColor: "#0f1011",
        overflow: "hidden",
        width: "100%",
        display: "block",
        height: 56,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          whiteSpace: "nowrap",
          width: "max-content",
          animation: "marqueeScroll 35s linear infinite",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0 24px",
              textTransform: "uppercase",
              fontFamily: "var(--font-dm-sans-src), sans-serif",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {item}
            <span style={{ marginLeft: 24, color: "#e8ff47" }}>·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
