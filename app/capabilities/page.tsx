import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { colors, fonts } from "@/lib/design";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Capabilities",
  description:
    "Four disciplines, one studio. Web design, development, marketing & SEO, and AI automation — end to end.",
  canonicalPath: "/capabilities",
});

interface Capability {
  number: string;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  /** Background color of the text-side panel. */
  textBg: string;
  /** Gradient for the visual-side panel. */
  gradient: string;
}

const CAPABILITIES: Capability[] = [
  {
    number: "01",
    name: "Web Design",
    tagline: "Beautiful. Precise. Memorable.",
    description:
      "We design websites that don't just look good — they convert. Every pixel is intentional, every interaction considered. We start with your business goals and work backwards to a design that serves them.",
    bullets: [
      "Brand-aligned UI design",
      "Mobile-first responsive layouts",
      "Landing pages that convert",
      "UI/UX for web applications",
      "Design systems and style guides",
    ],
    textBg: "#08090a",
    gradient: "linear-gradient(135deg, #0f1011 0%, #191a1b 50%, #08090a 100%)",
  },
  {
    number: "02",
    name: "Development",
    tagline: "Fast. Scalable. Yours to own.",
    description:
      "We build on Next.js and React — the same stack powering the world's fastest websites. Clean code, zero vendor lock-in, and performance baked in from day one. You own everything we deliver.",
    bullets: [
      "Next.js and React development",
      "Full-stack web applications",
      "E-commerce and online ordering",
      "CMS integrations (Sanity, Contentful)",
      "API design and third-party integrations",
      "Performance optimisation",
    ],
    textBg: "#0f1011",
    gradient: "linear-gradient(135deg, #0f1011 0%, #191a1b 50%, #08090a 100%)",
  },
  {
    number: "03",
    name: "Marketing & SEO",
    tagline: "Found. Clicked. Converted.",
    description:
      "Marketing isn't just getting traffic — it's getting the right traffic and turning it into customers. We handle everything from search visibility to social presence to WhatsApp campaigns.",
    bullets: [
      "Local SEO and Google Business Profile",
      "National and international SEO strategy",
      "Content marketing and blogging",
      "Social media management (Instagram, Facebook, LinkedIn)",
      "WhatsApp Business marketing campaigns",
      "Email marketing and automation",
      "Paid advertising (Google Ads, Meta Ads)",
      "Analytics setup and monthly reporting",
    ],
    textBg: "#08090a",
    gradient: "linear-gradient(135deg, #0f1011 0%, #191a1b 50%, #08090a 100%)",
  },
  {
    number: "04",
    name: "AI Automation",
    tagline: "Automated. Intelligent. Unstoppable.",
    description:
      "Manual tasks are expensive and error-prone. We build AI agents that handle repetitive work — from customer enquiries to invoice reminders to content generation — so your team focuses on what matters.",
    bullets: [
      "WhatsApp Business automation agents",
      "Customer enquiry and booking bots",
      "Invoice and payment reminder systems",
      "AI-powered content generation workflows",
      "Internal reporting and digest automation",
      "Custom AI integrations for your tools",
    ],
    textBg: "#0f1011",
    gradient: "linear-gradient(135deg, #0f1011 0%, #191a1b 50%, #08090a 100%)",
  },
];

export default function CapabilitiesPage() {
  return (
    <main
      id="main"
      style={{ backgroundColor: colors.bg, color: "#f7f8f8" }}
    >
      <PageHero
        label="Capabilities"
        title="What We Build."
        accentWord="Build."
        subtitle="Four disciplines. One studio. Zero compromise."
      />

      {CAPABILITIES.map((cap, i) => (
        <CapabilitySection
          key={cap.number}
          capability={cap}
          textOnLeft={i % 2 === 0}
        />
      ))}

      {/* Inline CTA card — matches homepage style. Kept inline (not the
       * shared CtaSection) so the headline can be customized for this
       * page without polluting the homepage component. */}
      <section
        style={{
          backgroundColor: colors.bg,
          padding: "0 48px 120px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: 80,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 510,
              fontSize: "clamp(40px, 6vw, 64px)",
              letterSpacing: "-0.022em",
              lineHeight: 1.0,
              color: "#f7f8f8",
              margin: "0 0 40px",
            }}
          >
            Ready to start?
            <br />
            <span style={{ color: "#e8ff47" }}>Let&apos;s talk.</span>
          </h2>
          <Link
            href="/contact"
            className="shimmer-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#e8ff47",
              color: "#08090a",
              padding: "14px 28px",
              borderRadius: 6,
              fontFamily: fonts.body,
              fontWeight: 510,
              fontSize: 15,
              letterSpacing: "-0.165px",
              textDecoration: "none",
            }}
          >
            Start a Project →
          </Link>
        </div>
      </section>
    </main>
  );
}

function CapabilitySection({
  capability,
  textOnLeft,
}: {
  capability: Capability;
  textOnLeft: boolean;
}) {
  return (
    <section
      style={{
        minHeight: "80vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "stretch",
        borderTop: `1px solid ${colors.border}`,
        // RTL trick to swap visual order without changing JSX order.
        direction: textOnLeft ? "ltr" : "rtl",
      }}
    >
      {/* Text side */}
      <div
        style={{
          direction: "ltr",
          backgroundColor: capability.textBg,
          color: "#f7f8f8",
          padding: "80px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: fonts.body,
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#e8ff47",
            margin: 0,
          }}
        >
          {capability.number}
        </p>
        <h2
          style={{
            fontFamily: fonts.display,
            fontWeight: 510,
            fontSize: "clamp(40px, 5vw, 64px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "#f7f8f8",
            WebkitTextFillColor: "#f7f8f8",
            margin: "16px 0 8px",
          }}
        >
          {capability.name}
        </h2>
        <p
          style={{
            fontFamily: fonts.body,
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: 16,
            color: "rgba(255,255,255,0.5)",
            margin: "0 0 24px",
          }}
        >
          {capability.tagline}
        </p>
        <p
          style={{
            fontFamily: fonts.body,
            fontWeight: 400,
            fontSize: 17,
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.7)",
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
                color: "rgba(255,255,255,0.75)",
                paddingLeft: 28,
                position: "relative",
                lineHeight: 2,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  color: "#e8ff47",
                  fontWeight: 510,
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
            display: "block",
            marginTop: 32,
            fontFamily: fonts.body,
            fontWeight: 500,
            fontSize: 14,
            color: "#e8ff47",
            textDecoration: "none",
          }}
        >
          Start a Project →
        </Link>
      </div>

      {/* Visual side — gradient pulse */}
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
