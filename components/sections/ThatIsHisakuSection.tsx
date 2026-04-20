/**
 * ThatIsHisakuSection — deep teal (#0a3d2e).
 *
 * Defensive rewrite: static H2 for "HISAKU" (ScrambleText was producing
 * invisible renders on the live deploy — the imperative DOM mutation
 * + useInView pattern was not firing reliably in production). Hex
 * colors used inline so the section is legible even if @theme variables
 * haven't propagated. Simple marquee below for the capability ticker.
 */

const TICKER = [
  "Web Design",
  "Development",
  "Marketing",
  "AI Automation",
];

export function ThatIsHisakuSection() {
  const items = [...TICKER, ...TICKER, ...TICKER];
  return (
    <section
      data-theme="dark"
      aria-label="That's Hisaku"
      className="relative overflow-hidden flex flex-col justify-center"
      style={{
        backgroundColor: "#0a3d2e",
        color: "#f4f3ef",
        minHeight: "100vh",
        paddingTop: "clamp(80px, 12vw, 140px)",
        paddingBottom: "clamp(80px, 12vw, 140px)",
      }}
    >
      <div className="teal-grid" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontWeight: 300,
            fontSize: 14,
            letterSpacing: "0.15em",
            color: "rgba(244,243,239,0.5)",
          }}
        >
          That&apos;s
        </p>

        <h2
          className="font-syne mt-6 leading-[0.95] tracking-tight block"
          style={{
            fontFamily: "var(--font-syne, sans-serif)",
            fontWeight: 800,
            fontSize: "clamp(100px, 15vw, 200px)",
            color: "#f4f3ef",
          }}
        >
          HISAKU
        </h2>

        <p
          className="uppercase mt-10"
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontWeight: 300,
            fontSize: 14,
            letterSpacing: "0.15em",
            color: "rgba(244,243,239,0.4)",
          }}
        >
          Web{" "}
          <span style={{ color: "#e8ff47" }}>·</span> Design{" "}
          <span style={{ color: "#e8ff47" }}>·</span> Development{" "}
          <span style={{ color: "#e8ff47" }}>·</span> Marketing{" "}
          <span style={{ color: "#e8ff47" }}>·</span> AI
        </p>
      </div>

      {/* Slower capability marquee below */}
      <div
        className="relative mt-16 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          height: 50,
        }}
        aria-hidden="true"
      >
        <div
          className="marquee-track marquee-track--slow flex items-center h-full whitespace-nowrap w-max"
          style={{ animation: "marqueeScroll 55s linear infinite" }}
        >
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center px-6 uppercase"
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontWeight: 300,
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "rgba(244,243,239,0.55)",
              }}
            >
              {item}
              <span className="ml-6" style={{ color: "#e8ff47" }}>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
