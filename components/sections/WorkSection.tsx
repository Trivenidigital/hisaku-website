"use client";

import Link from "next/link";
import { useRef } from "react";
import { useInView } from "framer-motion";
import type { CaseStudy } from "@/lib/content/case-studies";

/**
 * WorkSection — sticky counter left, scrolling case study blocks right.
 *
 *   ┌─────────────────────┬───────────────────────────────────┐
 *   │                     │  ── Product Development           │
 *   │  01                 │  Vizora                            │
 *   │  ─────────          │  2,500+  organisations worldwide   │
 *   │  CASE STUDIES       │  Built the full SaaS from design   │
 *   │  (sticky)           │  to shipped product in 12 weeks.   │
 *   │                     │  View Case Study →                 │
 *   │                     ├───────────────────────────────────│
 *   │                     │  (block 2, block 3, ...)           │
 *   └─────────────────────┴───────────────────────────────────┘
 *
 * As each block enters the viewport, the left counter updates to its index.
 * useInView (framer-motion) gates on scroll entering the middle band.
 */

interface WorkSectionProps {
  caseStudies: CaseStudy[];
}

// Category label shown above each block. Derived from services list.
const CATEGORY_LABEL: Record<string, string> = {
  design: "Design",
  development: "Product Development",
  "digital-marketing": "Marketing & SEO",
  "ai-marketing": "AI Automation",
};

function pickCategory(services: readonly string[]): string {
  // If development is in the list, treat it as a product build.
  if (services.includes("development")) return CATEGORY_LABEL.development;
  if (services.includes("ai-marketing")) return CATEGORY_LABEL["ai-marketing"];
  if (services.includes("digital-marketing"))
    return CATEGORY_LABEL["digital-marketing"];
  return CATEGORY_LABEL.design;
}

function shortDescription(cs: CaseStudy): string {
  // Use the first sentence of the Challenge body (after "## Challenge\n\n").
  const match = cs.body.match(/##\s+Challenge\s*\n+([^\n.]+\.)/);
  if (match) return match[1];
  return `${cs.frontmatter.client} · ${cs.frontmatter.timeline}`;
}

export function WorkSection({ caseStudies }: WorkSectionProps) {
  return (
    <section
      aria-label="Selected work"
      className="relative"
      style={{ background: "var(--color-base)" }}
    >
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-8">
        <p
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: "var(--color-accent-primary)" }}
        >
          Selected Work
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Left sticky counter */}
        <StickyCounter total={caseStudies.length} />

        {/* Right: case study blocks */}
        <div>
          {caseStudies.map((cs, i) => (
            <WorkBlock
              key={cs.frontmatter.slug}
              caseStudy={cs}
              index={i}
              variant={i % 2 === 0 ? "base" : "elevated"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Sticky counter — its text content is updated imperatively by the block
// components as they enter the viewport (cheaper than lifting state up and
// re-rendering the whole column on every scroll).
function StickyCounter({ total }: { total: number }) {
  return (
    <aside className="md:sticky md:top-10 self-start h-fit hidden md:block">
      <p
        id="work-counter"
        className="leading-none tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(120px, 12vw, 160px)",
          color: "var(--color-text-secondary)",
        }}
      >
        01
      </p>
      <div
        className="mt-6 h-px w-16"
        style={{ background: "var(--color-accent-primary)" }}
      />
      <p
        className="mt-6 text-xs uppercase tracking-[0.3em]"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {total} Case Stud{total === 1 ? "y" : "ies"}
      </p>
    </aside>
  );
}

function WorkBlock({
  caseStudy,
  index,
  variant,
}: {
  caseStudy: CaseStudy;
  index: number;
  variant: "base" | "elevated";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px", once: false });

  // When this block enters the middle band, update the DOM counter directly.
  // useState + re-render on every scroll would be wasteful for a big section.
  // Imperative DOM update is intentional here.
  if (typeof document !== "undefined" && inView) {
    const el = document.getElementById("work-counter");
    if (el) el.textContent = String(index + 1).padStart(2, "0");
  }

  const { slug, title, services, results } = caseStudy.frontmatter;
  const category = pickCategory(services);
  const primary = results[0];
  const description = shortDescription(caseStudy);

  return (
    <div
      ref={ref}
      className="min-h-[80vh] flex flex-col justify-center py-16 border-t"
      style={{
        background:
          variant === "elevated"
            ? "var(--color-elevated)"
            : "var(--color-base)",
        borderColor: "var(--color-accent-primary)",
        // Inset padding so the alternating background sits inside the grid
        marginInline: "-1.5rem",
        paddingInline: "1.5rem",
      }}
    >
      <p
        className="text-xs uppercase tracking-[0.3em]"
        style={{ color: "var(--color-accent-primary)" }}
      >
        — {category}
      </p>
      <h3
        className="mt-4 text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          color: "var(--color-text-primary)",
        }}
      >
        {title.split(" — ")[0]}
      </h3>
      {primary ? (
        <div className="mt-8">
          <p
            className="leading-none tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(56px, 8vw, 96px)",
              color: "var(--color-accent-primary)",
            }}
          >
            {primary.metric}
          </p>
          <p
            className="mt-3 text-sm uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              color: "var(--color-text-secondary)",
            }}
          >
            {primary.label}
          </p>
        </div>
      ) : null}

      <p
        className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          color: "var(--color-text-secondary)",
        }}
      >
        {description}
      </p>

      <div className="mt-10">
        <Link
          href={`/work/${slug}`}
          className="group inline-flex items-center text-base transition-colors hover:text-[color:var(--color-accent-primary)]"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-primary)",
          }}
        >
          <span className="group-hover:underline underline-offset-4">
            View Case Study
          </span>
          <span
            aria-hidden="true"
            className="ml-2 transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
