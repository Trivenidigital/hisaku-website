/**
 * MarqueeSection — 60px tall scrolling strip. Dark bg, hairline top +
 * bottom borders. Content duplicated in JSX for seamless loop with the
 * .marquee-track CSS animation (transform: translateX(0 → -50%) at 40s).
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
  // Duplicate 2x in JSX: the CSS animation only needs to scroll -50% to loop
  // seamlessly. Rendering more copies is wasted DOM.
  const items = [...TOKENS, ...TOKENS];

  return (
    <section
      data-theme="dark"
      aria-hidden="true"
      className="relative overflow-hidden"
      style={{
        background: "var(--color-bg-dark, #050507)",
        height: 56,
        borderTop: "1px solid rgba(255,255,255,0.12)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        // Explicit overflow-hidden on the outer — belt + braces with the
        // Tailwind utility — so the translateX(-50%) inner animation is
        // clipped cleanly regardless of browser default.
        overflow: "hidden",
      }}
    >
      <div
        className="marquee-track flex items-center h-full whitespace-nowrap w-max"
        // Inline animation too, as a backstop — some production CSS
        // reorders can suppress the .marquee-track class rule.
        style={{ animation: "marqueeScroll 35s linear infinite" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center px-6 uppercase"
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.18em",
              // Hex fallback: if the @theme var isn't resolved we still
              // render a visible warm-white token at ~55% opacity.
              color: "rgba(244,243,239,0.6)",
            }}
          >
            {item}
            <span className="ml-6" style={{ color: "#e8ff47" }}>
              ·
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
