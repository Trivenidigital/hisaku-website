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
      {/* Wireframe background video — ghosted at 15% so it reads as
       * atmospheric texture, not footage. zIndex 0 pins it behind the
       * grid overlay and all content. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          opacity: 0.15,
        }}
      >
        <source src="/videos/wireframe-bg.mp4" type="video/mp4" />
      </video>

      <div
        className="teal-grid"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      />

      <div
        className="max-w-6xl mx-auto px-6 text-center"
        style={{ position: "relative", zIndex: 2 }}
      >
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
          className="font-syne mt-6 block"
          style={{
            fontFamily: "var(--font-syne, sans-serif)",
            fontWeight: 800,
            fontSize: "clamp(96px, 15vw, 200px)",
            letterSpacing: "-0.05em",
            lineHeight: 0.82,
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

      {/* Slower capability marquee below — stacks above the video bg. */}
      <div
        className="relative mt-16 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          height: 50,
          zIndex: 2,
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
