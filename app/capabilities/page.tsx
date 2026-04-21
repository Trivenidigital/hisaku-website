import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { colors, fonts } from "@/lib/design";
import PageHero from "@/components/layout/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = buildMetadata({
  title: "Capabilities",
  description:
    "What we build: web design, development, marketing and SEO, and AI automation. Four disciplines, one team, end to end.",
  canonicalPath: "/capabilities",
});

interface Capability {
  number: string;
  slug: string;
  name: string;
  description: string;
  bullets: string[];
  /** 3-stop gradient for the visual side — colors distinct per discipline. */
  gradient: string;
}

const CAPABILITIES: Capability[] = [
  {
    number: "01",
    slug: "design",
    name: "Web Design",
    description:
      "We obsess over every pixel. Websites that don't just look good — they convert.",
    bullets: [
      "Brand-aligned visual design",
      "Mobile-first responsive layouts",
      "Performance-optimized delivery",
    ],
    // Greens
    gradient: "linear-gradient(135deg, #0a1a0a 0%, #0d2518 50%, #0a1a0a 100%)",
  },
  {
    number: "02",
    slug: "development",
    name: "Development",
    description: "Clean code, fast load times, built to scale.",
    bullets: [
      "Next.js and React applications",
      "Custom CMS integrations",
      "API and third-party connections",
    ],
    // Blues
    gradient: "linear-gradient(135deg, #0a0d1a 0%, #0d1025 50%, #0a0d1a 100%)",
  },
  {
    number: "03",
    slug: "digital-marketing",
    name: "Marketing & SEO",
    description: "Found by the right people, at the right moment.",
    bullets: [
      "Local and national SEO strategy",
      "Google Business Profile optimization",
      "Content that ranks and converts",
    ],
    // Purples
    gradient: "linear-gradient(135deg, #0f0a1a 0%, #1a0d28 50%, #0f0a1a 100%)",
  },
  {
    number: "04",
    slug: "ai-marketing",
    name: "AI Automation",
    description: "Manual tasks are expensive. We automate them.",
    bullets: [
      "WhatsApp business automation",
      "AI-powered content workflows",
      "Custom agent development",
    ],
    // Teals
    gradient: "linear-gradient(135deg, #0a1518 0%, #0d2020 50%, #0a1518 100%)",
  },
];

export default function CapabilitiesPage() {
  return (
    <main id="main" style={{ backgroundColor: colors.bg }}>
      <PageHero
        label="Capabilities"
        title="What We Build."
        accentWord="Build."
      />

      {CAPABILITIES.map((cap, i) => (
        <CapabilitySection key={cap.slug} capability={cap} index={i} />
      ))}

      <CtaSection />
    </main>
  );
}

function CapabilitySection({
  capability,
  index,
}: {
  capability: Capability;
  index: number;
}) {
  // Alternate layout: even index = text left, odd = text right
  const reverse = index % 2 === 1;
  return (
    <section
      style={{
        backgroundColor: colors.bg,
        minHeight: "70vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "stretch",
        borderTop: `1px solid ${colors.border}`,
        direction: reverse ? "rtl" : "ltr",
      }}
    >
      {/* Text side */}
      <div
        style={{
          direction: "ltr",
          padding: "80px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: fonts.body,
            fontWeight: 500,
            fontSize: 13,
            color: colors.accent,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            margin: "0 0 24px",
          }}
        >
          {capability.number}
        </p>
        <h2
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: "clamp(40px, 5vw, 64px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: colors.white,
            margin: "0 0 24px",
          }}
        >
          {capability.name}
        </h2>
        <p
          style={{
            fontFamily: fonts.body,
            fontWeight: 400,
            fontSize: 17,
            lineHeight: 1.75,
            color: colors.muted2,
            margin: "0 0 32px",
            maxWidth: 480,
          }}
        >
          {capability.description}
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {capability.bullets.map((b) => (
            <li
              key={b}
              style={{
                fontFamily: fonts.body,
                fontWeight: 400,
                fontSize: 15,
                color: colors.muted2,
                paddingLeft: 28,
                position: "relative",
                marginBottom: 12,
                lineHeight: 1.6,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  color: colors.accent,
                  fontWeight: 600,
                }}
              >
                →
              </span>
              {b}
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          style={{
            marginTop: 32,
            display: "inline-block",
            alignSelf: "flex-start",
            fontFamily: fonts.body,
            fontWeight: 500,
            fontSize: 15,
            color: colors.accent,
            textDecoration: "none",
          }}
        >
          Start a Project →
        </Link>
      </div>

      {/* Visual side */}
      <div
        aria-hidden="true"
        className="gradient-pulse"
        style={{
          direction: "ltr",
          background: capability.gradient,
          minHeight: "60vh",
        }}
      />
    </section>
  );
}
