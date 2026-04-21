"use client";

import Link from "next/link";
import { useState } from "react";
import type { CaseStudy } from "@/lib/content/case-studies";

/**
 * WorkSection — 3-column card grid.
 *
 * Cards are static in the DOM — no framer-motion opacity/y initial
 * state. All motion is CSS: hover lift, hover shadow, conic-glow
 * border on hover. Content is visible the moment it paints, no
 * whileInView trigger dependency.
 */

interface WorkSectionProps {
  caseStudies: CaseStudy[];
}

const VIDEO: Record<string, string> = {
  vizora: "/videos/vizora-demo.mp4",
  hello2india: "/videos/hello2india-demo.mp4",
  "triveni-express": "/videos/triveni-demo.mp4",
};

const CARD_DATA: Record<
  string,
  { category: string; description: string }
> = {
  vizora: {
    category: "Product Development",
    description:
      "Vizora wanted AI that schedules content intelligently across thousands of screens from a single browser tab.",
  },
  hello2india: {
    category: "Marketing & SEO",
    description:
      "A local Indian grocery with zero digital presence. We rebuilt their entire online footprint from GBP to content strategy.",
  },
  "triveni-express": {
    category: "Web Design & Development",
    description:
      "Charlotte's favourite Indian restaurant needed a web presence that matched their food — warm and easy to order from.",
  },
};

export function WorkSection({ caseStudies }: WorkSectionProps) {
  return (
    <section
      aria-label="Selected work"
      style={{
        backgroundColor: "#0a0a0a",
        padding: "120px 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#e8ff47",
            margin: "0 0 64px",
          }}
        >
          Selected Work
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {caseStudies.slice(0, 3).map((cs) => (
            <WorkCard key={cs.frontmatter.slug} caseStudy={cs} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const [hover, setHover] = useState(false);
  const fm = caseStudy.frontmatter;
  const video = VIDEO[fm.slug];
  const meta = CARD_DATA[fm.slug];
  const primary = fm.results[0];

  return (
    <Link
      href={`/work/${fm.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="conic-glow"
      style={{
        display: "block",
        backgroundColor: "#111111",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        overflow: "hidden",
        textDecoration: "none",
        transition: "all 300ms ease",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover ? "0 20px 40px rgba(0,0,0,0.4)" : "none",
        position: "relative",
      }}
    >
      {/* Video thumbnail */}
      <div
        style={{
          height: 240,
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#0a0a0a",
        }}
      >
        {video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : null}
      </div>

      {/* Card body */}
      <div style={{ padding: 24 }}>
        <p
          style={{
            fontWeight: 400,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#e8ff47",
            margin: 0,
          }}
        >
          {meta?.category ?? "Project"}
        </p>

        <h3
          style={{
            fontWeight: 700,
            fontSize: 24,
            color: "#ffffff",
            // Belt + braces: some browsers inherit -webkit-text-fill-color
            // from a parent or from accent gradient text, leaving the h3
            // looking teal/blue. Force-override explicitly.
            WebkitTextFillColor: "#ffffff",
            margin: "8px 0 12px",
            letterSpacing: "-0.01em",
          }}
        >
          {fm.title.split(" — ")[0]}
        </h3>

        {primary ? (
          <p
            style={{
              fontWeight: 700,
              fontSize: 36,
              color: "#e8ff47",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {primary.metric}
            <span
              style={{
                fontSize: 11,
                fontWeight: 400,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginLeft: 12,
                verticalAlign: "middle",
              }}
            >
              {primary.label}
            </span>
          </p>
        ) : null}

        <p
          style={{
            fontWeight: 400,
            fontSize: 14,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {meta?.description ?? fm.client}
        </p>

        <p
          style={{
            margin: "16px 0 0",
            fontWeight: 500,
            fontSize: 13,
            color: hover ? "#e8ff47" : "rgba(255,255,255,0.4)",
            transition: "color 200ms ease",
          }}
        >
          View Case Study →
        </p>
      </div>
    </Link>
  );
}
