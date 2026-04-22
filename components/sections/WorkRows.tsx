"use client";

import Link from "next/link";
import { useState } from "react";
import type { CaseStudy } from "@/lib/content/case-studies";

/**
 * WorkRows — full-width hover-reveal video rows for the /work index.
 *
 * Each row (60vh tall):
 *   - Video bg at 0.4 opacity, 0.65 on hover
 *   - Dark overlay 0.5 → 0.35 on hover
 *   - Thin lime left border appears on hover (3px)
 *   - Project name huge on the left
 *   - Metric bottom-right in lime
 *   - "View Case Study →" slides up from bottom on hover
 */

interface WorkRowsProps {
  caseStudies: CaseStudy[];
}

const VIDEO: Record<string, string> = {
  vizora: "/videos/vizora-demo.mp4",
  hello2india: "/videos/hello2india-demo.mp4",
  "triveni-express": "/videos/triveni-demo.mp4",
};

const CATEGORY: Record<string, string> = {
  vizora: "Product Development",
  hello2india: "Marketing & SEO",
  "triveni-express": "Web Design & Development",
};

export function WorkRows({ caseStudies }: WorkRowsProps) {
  return (
    <div>
      {caseStudies.map((cs, i) => (
        <Row key={cs.frontmatter.slug} caseStudy={cs} index={i} />
      ))}
    </div>
  );
}

function Row({
  caseStudy,
  index,
}: {
  caseStudy: CaseStudy;
  index: number;
}) {
  const [hover, setHover] = useState(false);
  const fm = caseStudy.frontmatter;
  const video = VIDEO[fm.slug];
  const category = CATEGORY[fm.slug] ?? "Project";
  const primary = fm.results[0];

  return (
    <Link
      href={`/work/${fm.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        position: "relative",
        height: "60vh",
        minHeight: 480,
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        borderLeft: hover
          ? "3px solid rgba(255,255,255,0.3)"
          : "3px solid transparent",
        transition: "border-left-color 300ms ease",
      }}
    >
      {/* Video background */}
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: hover ? 0.65 : 0.4,
            transition: "opacity 400ms ease",
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : null}

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: hover ? "rgba(10,10,15,0.35)" : "rgba(10,10,15,0.5)",
          transition: "background-color 400ms ease",
        }}
      />

      {/* Left-aligned content */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 60,
          right: 60,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <div>
          <p
            style={{
              fontWeight: 500,
              fontSize: 13,
              color: "#8a8f98",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
              margin: "0 0 16px",
            }}
          >
            {String(index + 1).padStart(2, "0")} — {category}
          </p>
          <h2
            style={{
              fontWeight: 510,
              fontSize: "clamp(56px, 8vw, 96px)",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              color: "#f7f8f8",
              margin: 0,
            }}
          >
            {fm.title.split(" — ")[0]}
          </h2>
        </div>

        {/* Bottom-right: big lime metric + "View Case Study →" slide-up */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 16,
            textAlign: "right",
            minWidth: 220,
          }}
        >
          {primary ? (
            <div>
              <p
                style={{
                  fontWeight: 510,
                  fontSize: 48,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  color: "#f7f8f8",
                  margin: 0,
                }}
              >
                {primary.metric}
              </p>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  margin: "8px 0 0",
                }}
              >
                {primary.label}
              </p>
            </div>
          ) : null}
          <span
            aria-hidden="true"
            style={{
              fontWeight: 400,
              fontSize: 14,
              color: "#f7f8f8",
              whiteSpace: "nowrap",
              opacity: hover ? 1 : 0,
              transform: hover ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 300ms ease, transform 300ms ease",
            }}
          >
            View Case Study →
          </span>
        </div>
      </div>
    </Link>
  );
}
