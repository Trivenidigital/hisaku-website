"use client";

import Link from "next/link";
import { useState } from "react";
import { Meteors } from "@/components/ui/Meteors";

/**
 * WorkIndex — row-reveal layout, NOT a grid. Each case study is a
 * full-width 60vh row. Alternating alignment (left / right) gives the
 * page rhythm. Meteors only on the hovered row.
 *
 * This is deliberately different from the 3-col grid on the homepage
 * so the index page has its own identity.
 */
interface WorkItem {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  thumbnail: string;
  results: { metric: string; label: string }[];
}

function Row({ item, index }: { item: WorkItem; index: number }) {
  const [hover, setHover] = useState(false);
  const flip = index % 2 === 1;
  return (
    <Link
      href={`/work/${item.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          minHeight: "60vh",
          padding: "60px 48px",
          maxWidth: 1200,
          margin: "0 auto",
          gap: 80,
          direction: flip ? "rtl" : "ltr",
        }}
      >
        <div style={{ direction: "ltr", position: "relative" }}>
          <div
            style={{
              position: "relative",
              aspectRatio: "4 / 3",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              backgroundColor: "#12121a",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.thumbnail}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 800ms ease, filter 400ms ease",
                transform: hover ? "scale(1.03)" : "scale(1)",
                filter: hover ? "saturate(1.1)" : "saturate(0.9)",
              }}
            />
            <Meteors active={hover} count={5} />
          </div>
        </div>

        <div style={{ direction: "ltr" }}>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#8a8f98",
            }}
          >
            {String(index + 1).padStart(2, "0")} · {item.category} · {item.year}
          </p>
          <h2
            style={{
              margin: "20px 0 0",
              fontSize: "clamp(28px, 3.4vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "#f7f8f8",
              lineHeight: 1.1,
            }}
          >
            {item.title}
          </h2>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: 14,
              color: "#8a8f98",
            }}
          >
            {item.client}
          </p>
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            {item.results.slice(0, 3).map((r, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 510,
                    letterSpacing: "-0.02em",
                    color: "#f7f8f8",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {r.metric}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#62666d",
                    marginTop: 4,
                    letterSpacing: "0.04em",
                  }}
                >
                  {r.label}
                </div>
              </div>
            ))}
          </div>
          <span
            style={{
              display: "inline-block",
              marginTop: 40,
              fontSize: 14,
              fontWeight: 500,
              color: hover ? "#f7f8f8" : "#d0d6e0",
              transition: "color 200ms ease",
            }}
          >
            Read case study →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function WorkIndex({ items }: { items: WorkItem[] }) {
  return (
    <main id="main">
      <section
        style={{
          backgroundColor: "#0a0a0f",
          padding: "200px 48px 80px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#8a8f98",
            }}
          >
            Work
          </p>
          <h1
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(48px, 7vw, 88px)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              color: "#f7f8f8",
              lineHeight: 0.98,
              maxWidth: 1000,
            }}
          >
            Work that shipped,
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#d0d6e0" }}>
              outcomes that stuck.
            </span>
          </h1>
          <p
            style={{
              margin: "32px 0 0",
              fontSize: 18,
              lineHeight: 1.6,
              color: "#8a8f98",
              maxWidth: 560,
            }}
          >
            Selected projects from the past two years. Every case study is
            written by the team that built it.
          </p>
        </div>
      </section>

      <div style={{ backgroundColor: "#0a0a0f" }}>
        {items.map((item, i) => (
          <Row key={item.slug} item={item} index={i} />
        ))}
      </div>
    </main>
  );
}
