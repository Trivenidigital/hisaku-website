import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/content/case-studies";
import { WorkRows } from "@/components/sections/WorkRows";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Selected case studies from Hisaku. Design, development, and marketing projects we've shipped for startups and growing companies.",
  canonicalPath: "/work",
});

/**
 * Work index — hero strip + full-width hover-reveal video rows per project.
 *
 * Layout:
 *   40vh centered hero intro.
 *   60vh video row per case study (plays at 0.4 opacity, hover increases it).
 */
export default function WorkIndexPage() {
  const all = getCaseStudies();
  return (
    <main id="main" style={{ backgroundColor: "#050507", color: "#f4f3ef" }}>
      {/* Hero strip */}
      <section
        data-theme="dark"
        style={{
          minHeight: "40vh",
          paddingTop: 160,
          paddingBottom: 64,
          paddingLeft: 48,
          paddingRight: 48,
          textAlign: "center",
          backgroundColor: "#050507",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-jakarta, sans-serif)",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#e8ff47",
            marginBottom: 24,
          }}
        >
          Selected Work
        </p>
        <h1
          style={{
            fontFamily: "var(--font-jakarta, sans-serif)",
            fontWeight: 800,
            fontSize: "clamp(48px, 7vw, 96px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#f4f3ef",
          }}
        >
          Things we&apos;ve built.
        </h1>
        <p
          style={{
            marginTop: 24,
            fontFamily: "var(--font-jakarta, sans-serif)",
            fontWeight: 300,
            fontSize: 14,
            color: "rgba(244,243,239,0.45)",
          }}
        >
          {all.length} case stud{all.length === 1 ? "y" : "ies"} ·
          Hyderabad, India
        </p>
      </section>

      {/* Project rows — client component for hover state */}
      <WorkRows caseStudies={all} />
    </main>
  );
}
