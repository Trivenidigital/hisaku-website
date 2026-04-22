import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { colors, fonts } from "@/lib/design";
import PageHero from "@/components/layout/PageHero";
import { ValueCard } from "@/components/sections/ValueCard";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "A 2-person studio based in Hyderabad. We design, build, and grow digital products for startups and growing companies across 3 countries.",
  canonicalPath: "/about",
});

const VALUES = [
  {
    number: "01",
    title: "Craft over speed",
    body: "We'd rather ship one tight thing than five sloppy ones. Speed matters — not at the expense of what we'd put our name on.",
  },
  {
    number: "02",
    title: "Outcomes over outputs",
    body: "Deliverables aren't the point. Your revenue up, your team stopping manual work, your customers finding you — we design backwards from that.",
  },
  {
    number: "03",
    title: "Simple over clever",
    body: "If it takes a 40-minute explainer to understand, it's wrong. The work we're proud of is the work you can point at and immediately get.",
  },
];

export default function AboutPage() {
  return (
    <main
      id="main"
      style={{ backgroundColor: colors.bg, color: "#f7f8f8" }}
    >
      <PageHero
        label="About Hisaku"
        title="We Build What Moves."
        accentWord="Moves."
      />

      {/* Section 1 — Statement */}
      <section
        style={{
          backgroundColor: colors.bg,
          padding: "100px 48px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 510,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: colors.white,
              margin: "0 0 24px",
            }}
          >
            A 2-person studio based in Hyderabad, thinking like a
            20-person agency.
          </h2>
          <p
            style={{
              fontFamily: fonts.body,
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.75,
              color: colors.muted2,
              margin: 0,
            }}
          >
            We are Srini and a small team of collaborators. We work with
            startups and growing businesses to build their digital
            presence — from the first wireframe to the live product.
            Design, development, marketing, AI automation — one team,
            one decision-maker, one invoice.
          </p>
        </div>
      </section>

      {/* Section 2 — Values */}
      <section
        style={{
          backgroundColor: colors.bg,
          padding: "100px 48px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 510,
              fontSize: 40,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: colors.white,
              margin: "0 0 48px",
            }}
          >
            How we work.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {VALUES.map((v) => (
              <ValueCard
                key={v.number}
                number={v.number}
                title={v.title}
                body={v.body}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Location */}
      <section
        style={{
          backgroundColor: colors.bg,
          padding: "100px 48px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p
          style={{
            fontFamily: fonts.mono,
            fontSize: 13,
            letterSpacing: "0.1em",
            color: colors.dim3,
            margin: "0 0 24px",
          }}
        >
          17.3850° N · 78.4867° E
        </p>
        <h2
          style={{
            fontFamily: fonts.display,
            fontWeight: 510,
            fontSize: "clamp(32px, 4vw, 52px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: colors.white,
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          Based in Hyderabad, India.
          <br />
          Working with clients across 3 countries.
        </h2>
      </section>

      {/* Section 4 — CTA (reuses the homepage CTA) */}
      <CtaSection />
    </main>
  );
}
