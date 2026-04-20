"use client";

import { ScrambleText } from "@/components/ui/ScrambleText";

/**
 * ThatIsHisakuSection — deep teal (#0a3d2e). The identity moment
 * between work (white) and services (dark). Centered scramble
 * of "Hisaku" + a slower capability ticker beneath.
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
        background: "var(--color-bg-teal)",
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
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: 14,
            letterSpacing: "0.2em",
            color:
              "color-mix(in srgb, var(--color-text-primary) 45%, transparent)",
          }}
        >
          That&apos;s
        </p>

        <ScrambleText
          text="Hisaku"
          as="h2"
          trigger="inView"
          duration={1200}
          className="mt-6 leading-[0.95] tracking-tight block"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(72px, 14vw, 200px)",
            color: "var(--color-text-primary)",
          }}
        />
      </div>

      {/* Capability ticker — slower marquee */}
      <div
        className="relative mt-16 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          height: 50,
        }}
        aria-hidden="true"
      >
        <div className="marquee-track marquee-track--slow flex items-center h-full whitespace-nowrap w-max">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center px-6 uppercase"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: 12,
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
      </div>
    </section>
  );
}
