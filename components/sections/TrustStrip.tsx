/**
 * TrustStrip — thin band directly below the hero.
 *
 *   ✦ 8 clients across 3 countries  ·
 *   ✦ 2,500+ screens powered via Vizora  ·
 *   ✦ 0 missed deadlines
 *
 * One line on desktop, wraps on narrow viewports. Subtle.
 */
export function TrustStrip() {
  const items = [
    "8 clients across 3 countries",
    "2,500+ screens powered via Vizora",
    "0 missed deadlines",
  ];
  return (
    <section
      aria-label="Trust signals"
      style={{
        backgroundColor: "#111118",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 24px",
      }}
    >
      <p
        style={{
          margin: 0,
          textAlign: "center",
          fontWeight: 400,
          fontSize: 13,
          letterSpacing: "0.05em",
          color: "rgba(255,255,255,0.4)",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 24px",
          justifyContent: "center",
        }}
      >
        {items.map((item, i) => (
          <span
            key={item}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <span style={{ color: "#8B5CF6", marginRight: 10 }}>✦</span>
            {item}
            {i < items.length - 1 ? (
              <span
                aria-hidden="true"
                style={{ marginLeft: 24, color: "rgba(255,255,255,0.2)" }}
              >
                ·
              </span>
            ) : null}
          </span>
        ))}
      </p>
    </section>
  );
}
