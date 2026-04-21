import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Capabilities",
  description:
    "What we build: web design, development, marketing and SEO, and AI automation. Four disciplines, one team, end to end.",
  canonicalPath: "/capabilities",
});

/**
 * Capabilities landing page.
 *
 * Layout:
 *   Hero (50vh, dark, centered)
 *   4 alternating split sections — text left, visual right
 */

interface Capability {
  number: string;
  slug: string;
  name: string;
  description: string;
  bullets: string[];
  /** Gradient for the visual side — dark or warm depending on theme. */
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
    gradient: "linear-gradient(135deg, #060d0a 0%, #0d2518 50%, #060d0a 100%)",
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
    gradient: "linear-gradient(135deg, #0d1818 0%, #1a3030 50%, #0d1818 100%)",
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
    gradient: "linear-gradient(135deg, #120800 0%, #2d1400 50%, #120800 100%)",
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
    gradient: "linear-gradient(135deg, #0a0020 0%, #1a0040 50%, #0a0020 100%)",
  },
];

export default function CapabilitiesPage() {
  return (
    <main id="main" style={{ backgroundColor: "#050507" }}>
      {/* Hero */}
      <section
        data-theme="dark"
        style={{
          backgroundColor: "#050507",
          minHeight: "50vh",
          paddingTop: 160,
          paddingBottom: 80,
          paddingLeft: 60,
          paddingRight: 60,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-jakarta, sans-serif)",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#e8ff47",
            marginBottom: 24,
          }}
        >
          Capabilities
        </p>
        <h1
          style={{
            fontFamily: "var(--font-jakarta, sans-serif)",
            fontWeight: 800,
            fontSize: "clamp(64px, 9vw, 120px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "#f4f3ef",
          }}
        >
          What We Build.
        </h1>
      </section>

      {/* 4 capability sections, alternating dark / white */}
      {CAPABILITIES.map((cap, i) => {
        const isLight = i % 2 === 1;
        return (
          <CapabilitySection key={cap.slug} capability={cap} isLight={isLight} />
        );
      })}

      {/* Final CTA (teal) */}
      <section
        data-theme="dark"
        style={{
          backgroundColor: "#0a3d2e",
          color: "#f4f3ef",
          padding: "160px 60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="teal-grid" aria-hidden="true" />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2
            style={{
              fontFamily: "var(--font-jakarta, sans-serif)",
              fontWeight: 800,
              fontSize: "clamp(64px, 10vw, 120px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.88,
              color: "#f4f3ef",
              marginBottom: 56,
            }}
          >
            Got a project
            <br />
            <span style={{ color: "#e8ff47" }}>in mind?</span>
          </h2>
          <Link
            href="/contact"
            data-cursor="hover"
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#e8ff47",
              color: "#0a3d2e",
              padding: "20px 56px",
              fontFamily: "var(--font-jakarta, sans-serif)",
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            Start a Project
            <span aria-hidden="true" style={{ marginLeft: 12 }}>
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}

function CapabilitySection({
  capability,
  isLight,
}: {
  capability: Capability;
  isLight: boolean;
}) {
  const bg = isLight ? "#f4f3ef" : "#050507";
  const text = isLight ? "#050507" : "#f4f3ef";
  const muted = isLight ? "rgba(5,5,7,0.6)" : "rgba(244,243,239,0.6)";
  const visualBg = isLight
    ? "linear-gradient(135deg, #050507 0%, #0d0d12 50%, #050507 100%)"
    : capability.gradient;

  return (
    <section
      data-theme={isLight ? "light" : "dark"}
      style={{
        backgroundColor: bg,
        color: text,
        minHeight: "80vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "stretch",
        borderTop: isLight
          ? "1px solid rgba(5,5,7,0.1)"
          : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Left — text */}
      <div
        style={{
          padding: "120px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-jakarta, sans-serif)",
            fontWeight: 300,
            fontSize: 13,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#e8ff47",
            marginBottom: 24,
          }}
        >
          {capability.number}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-jakarta, sans-serif)",
            fontWeight: 800,
            fontSize: "clamp(48px, 6vw, 80px)",
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            color: text,
            marginBottom: 32,
          }}
        >
          {capability.name}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-jakarta, sans-serif)",
            fontWeight: 300,
            fontSize: 18,
            lineHeight: 1.75,
            color: muted,
            marginBottom: 32,
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
                fontFamily: "var(--font-jakarta, sans-serif)",
                fontWeight: 300,
                fontSize: 15,
                color: muted,
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
                  color: "#e8ff47",
                }}
              >
                →
              </span>
              {b}
            </li>
          ))}
        </ul>
        <Link
          href={`/services/${capability.slug}`}
          data-cursor="hover"
          style={{
            marginTop: 40,
            display: "inline-flex",
            alignItems: "center",
            alignSelf: "flex-start",
            fontFamily: "var(--font-jakarta, sans-serif)",
            fontWeight: 400,
            fontSize: 15,
            color: text,
            borderBottom: `1px solid ${text}`,
            paddingBottom: 2,
          }}
        >
          Start a Project
          <span aria-hidden="true" style={{ marginLeft: 8 }}>
            →
          </span>
        </Link>
      </div>

      {/* Right — gradient visual */}
      <div
        aria-hidden="true"
        className="gradient-pulse"
        style={{
          background: visualBg,
          minHeight: "60vh",
        }}
      />
    </section>
  );
}
