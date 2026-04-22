"use client";

import Link from "next/link";
import { useState } from "react";
import type { CaseStudy } from "@/lib/content/case-studies";

/**
 * WorkSection — 3-column card grid, Superhuman-restrained.
 *
 * Ghost cards on the main dark bg. Metric is PURE WHITE (not violet)
 * because violet is reserved for CTAs and focus. No GlowCard, no
 * conic-glow — a subtle border-color hover shift carries the weight.
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
        backgroundColor: "#0a0a0f",
        color: "#f7f8f8",
        padding: "100px 48px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p
          style={{
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#62666d",
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
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: hover
          ? "1px solid rgba(255,255,255,0.14)"
          : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 8,
        overflow: "hidden",
        transition: "transform 300ms ease, border-color 300ms ease",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          height: 220,
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#0a0a0f",
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

      <div style={{ padding: 28 }}>
        <p
          style={{
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#8a8f98",
            margin: 0,
          }}
        >
          {meta?.category ?? "Project"}
        </p>

        <h3
          style={{
            fontWeight: 510,
            fontSize: 22,
            color: "#f7f8f8",
            WebkitTextFillColor: "#f7f8f8",
            margin: "10px 0 16px",
            letterSpacing: "-0.01em",
          }}
        >
          {fm.title.split(" — ")[0]}
        </h3>

        {primary ? (
          <p
            style={{
              fontWeight: 510,
              fontSize: 36,
              color: "#f7f8f8",
              margin: "0 0 14px",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {primary.metric}
            <span
              style={{
                fontSize: 11,
                fontWeight: 400,
                color: "#8a8f98",
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
            color: "#8a8f98",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {meta?.description ?? fm.client}
        </p>

        <p
          style={{
            margin: "20px 0 0",
            fontWeight: 500,
            fontSize: 13,
            color: hover ? "#f7f8f8" : "#62666d",
            transition: "color 200ms ease",
          }}
        >
          View Case Study →
        </p>
      </div>
    </Link>
  );
}
