"use client";

import Link from "next/link";
import { useState } from "react";
import type { CaseStudy } from "@/lib/content/case-studies";

/**
 * WorkRows — full-width video rows for the /work index.
 *
 * Each row is 60vh tall with its project video playing underneath. A
 * dark overlay sits on top at 0.5 opacity; hover drops it to 0.35 and
 * raises the video to 0.65. A "View Case Study →" pill slides up from
 * the bottom on hover.
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
        <Row
          key={cs.frontmatter.slug}
          caseStudy={cs}
          index={i}
          isLast={i === caseStudies.length - 1}
        />
      ))}
    </div>
  );
}

function Row({
  caseStudy,
  index,
  isLast,
}: {
  caseStudy: CaseStudy;
  index: number;
  isLast: boolean;
}) {
  const [hover, setHover] = useState(false);
  const fm = caseStudy.frontmatter;
  const video = VIDEO[fm.slug];
  const category = CATEGORY[fm.slug] ?? "Project";
  const primary = fm.results[0];

  return (
    <Link
      href={`/work/${fm.slug}`}
      data-cursor="hover"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        position: "relative",
        height: "60vh",
        minHeight: 480,
        overflow: "hidden",
        borderBottom: isLast
          ? hover
            ? "1px solid #e8ff47"
            : "1px solid rgba(255,255,255,0.07)"
          : hover
            ? "1px solid #e8ff47"
            : "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 300ms ease",
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
          backgroundColor: hover ? "rgba(5,5,7,0.35)" : "rgba(5,5,7,0.5)",
          transition: "background-color 400ms ease",
        }}
      />

      {/* Content */}
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
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 300,
              fontSize: 13,
              color: "#e8ff47",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {String(index + 1).padStart(2, "0")} — {category}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 800,
              fontSize: "clamp(48px, 7vw, 96px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#f4f3ef",
            }}
          >
            {fm.title.split(" — ")[0]}
          </h2>
          {primary ? (
            <p
              style={{
                marginTop: 16,
                fontFamily: "var(--font-sans, sans-serif)",
                fontWeight: 300,
                fontSize: 14,
                color: "rgba(244,243,239,0.7)",
              }}
            >
              <span style={{ color: "#e8ff47" }}>{primary.metric}</span>{" "}
              <span style={{ color: "rgba(244,243,239,0.5)" }}>
                · {primary.label}
              </span>
            </p>
          ) : null}
        </div>

        {/* Hover reveal: "View Case Study →" slides up */}
        <span
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontWeight: 400,
            fontSize: 14,
            color: "#e8ff47",
            whiteSpace: "nowrap",
            opacity: hover ? 1 : 0,
            transform: hover ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 300ms ease, transform 300ms ease",
          }}
        >
          View Case Study →
        </span>
      </div>
    </Link>
  );
}
