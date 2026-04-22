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
    textBg: "#0a0a0f",
    gradient: "transparent",
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
    textBg: "#0a0a0f",
    gradient: "transparent",
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
    textBg: "#0a0a0f",
    gradient: "transparent",
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
    textBg: "#0a0a0f",
    gradient: "transparent",
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

      {/* Full-width CTA — no inner card, no gradient. */}
      <section
        style={{
          backgroundColor: colors.bg,
          padding: "120px 48px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 510,
              fontSize: "clamp(44px, 7vw, 88px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.98,
              color: "#f7f8f8",
              margin: 0,
              maxWidth: 900,
            }}
          >
            Ready to start?
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>
              Let&apos;s talk.
            </span>
          </h2>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginTop: 48,
              backgroundColor: "#8B5CF6",
              color: "#ffffff",
              padding: "14px 28px",
              borderRadius: 8,
              fontFamily: fonts.body,
              fontWeight: 510,
              fontSize: 15,
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
        backgroundColor: "#0a0a0f",
        direction: textOnLeft ? "ltr" : "rtl",
      }}
    >
      <div
        style={{
          direction: "ltr",
          color: "#f7f8f8",
          padding: "100px 60px",
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
            color: "#62666d",
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
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            color: "#f7f8f8",
            WebkitTextFillColor: "#f7f8f8",
            margin: "16px 0 12px",
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
            color: "#8a8f98",
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
            color: "#8a8f98",
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
                color: "#d0d6e0",
                paddingLeft: 24,
                position: "relative",
                lineHeight: 2,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  color: "#62666d",
                  fontWeight: 400,
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
            display: "inline-block",
            marginTop: 40,
            fontFamily: fonts.body,
            fontWeight: 510,
            fontSize: 13,
            color: "#f7f8f8",
            textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,0.3)",
            paddingBottom: 2,
          }}
        >
          Start a Project →
        </Link>
      </div>

      {/* Visual side — ghost panel with subtle grid */}
      <div
        aria-hidden="true"
        style={{
          direction: "ltr",
          minHeight: "60vh",
          backgroundColor: "rgba(255,255,255,0.02)",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
        }}
      />
    </section>
  );
}
