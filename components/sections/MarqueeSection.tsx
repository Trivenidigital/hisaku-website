import { Marquee } from "@/components/ui/Marquee";

/**
 * MarqueeSection — 48px tall scrolling strip between hero and work.
 *
 * Now backed by the shared <Marquee /> primitive so hover-pause and
 * edge fades are free. Tokens remain the product/service vocabulary.
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
  return (
    <Marquee
      pauseOnHover
      className="w-full"
    >
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          alignItems: "center",
          height: 48,
          width: "100%",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {TOKENS.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0 28px",
              textTransform: "uppercase",
              fontFamily: "var(--font-inter), sans-serif",
              fontFeatureSettings: '"cv01", "ss03"',
              fontWeight: 510,
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "#8a8f98",
              whiteSpace: "nowrap",
            }}
          >
            {item}
            <span
              aria-hidden
              style={{ marginLeft: 28, color: "#e8ff47" }}
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </Marquee>
  );
}
