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
        background: "var(--color-bg-dark)",
        height: 60,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="marquee-track flex items-center h-full whitespace-nowrap w-max">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center px-6 uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.2em",
              color:
                "color-mix(in srgb, var(--color-text-primary) 55%, transparent)",
            }}
          >
            {item}
            <span
              className="ml-6"
              style={{ color: "var(--color-accent-primary)" }}
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
