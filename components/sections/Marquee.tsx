"use client";

import { Marquee } from "@/components/ui/Marquee";

/**
 * HomeMarquee — token strip running under the hero.
 *
 * Pure typography. No card, no glow. Height 44px, items in dim grey
 * with a middot separator in lighter grey. Pauses on hover so the
 * eye can rest on any token.
 */
const TOKENS = [
  "Next.js",
  "React",
  "TypeScript",
  "Framer Motion",
  "Tailwind",
  "Supabase",
  "Vercel",
  "Shopify",
  "Webflow",
  "Resend",
  "Stripe",
  "OpenAI",
  "Anthropic",
  "n8n",
  "Zapier",
];

export function HomeMarquee() {
  return (
    <section
      aria-label="Stack"
      style={{
        backgroundColor: "#0a0a0f",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        height: 44,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Marquee pauseOnHover>
        {TOKENS.map((t, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 32,
              marginRight: 32,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "#62666d",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </span>
            <span
              aria-hidden
              style={{
                color: "#8a8f98",
                fontSize: 13,
              }}
            >
              ·
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
