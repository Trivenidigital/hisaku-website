"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { CaseStudy } from "@/lib/content/case-studies";
import { ClipReveal } from "@/components/ui/ClipReveal";
import { CountUp } from "@/components/ui/CountUp";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * WorkSection — WHITE background, stark contrast flip from the hero.
 *
 * Layout:
 *   grid [280px | 1fr]  (mobile: stacked, no sticky counter)
 *   ┌──────────────┬─────────────────────────────────────────┐
 *   │   01         │  — PRODUCT DEVELOPMENT                  │
 *   │  ─── (lime)  │  Vizora                                 │
 *   │  3 Case…     │  2,500+  organisations worldwide        │
 *   │  (sticky)    │  [gradient-pulse video placeholder]     │
 *   │              ├─────────────────────────────────────────┤
 *   │              │  Hello2India (block 2)                  │
 *   │              │  ...                                    │
 *
 * Counter updates imperatively (cheaper than a context re-render cascade).
 *
 * Each block has a right-side "video" placeholder — an animated gradient
 * that mimics a motion loop until the real footage is dropped in.
 */

interface WorkSectionProps {
  caseStudies: CaseStudy[];
}

/** Per-slug visual data: category label + demo video source. */
const VISUAL: Record<string, { category: string; video: string }> = {
  vizora: {
    category: "— Product Development",
    video: "/videos/vizora-demo.mp4",
  },
  hello2india: {
    category: "— Marketing & SEO",
    video: "/videos/hello2india-demo.mp4",
  },
  "triveni-express": {
    category: "— Web & Ordering",
    video: "/videos/triveni-demo.mp4",
  },
};

/** Best-effort parse of the primary metric into a number + prefix/suffix
 *  so CountUp can animate when sensible; otherwise renders verbatim. */
function parseMetric(raw: string): {
  to?: number;
  prefix?: string;
  suffix?: string;
  fallbackText?: string;
} {
  // Keep things like "#1 Local", "Live", "12 wk", "SaaS" verbatim.
  const match = raw.match(/^(\+?-?)(\d[\d,]*)(.*)$/);
  if (!match) return { fallbackText: raw };
  const [, sign, digits, rest] = match;
  const parsed = parseInt(digits.replace(/,/g, ""), 10);
  if (!Number.isFinite(parsed)) return { fallbackText: raw };
  return {
    to: parsed,
    prefix: sign,
    suffix: rest,
  };
}

function firstSentence(body: string): string {
  const m = body.match(/##\s+Challenge\s*\n+([\s\S]*?)(?:\n##|\n\n|$)/);
  const para = m ? m[1].trim() : "";
  // First 2 sentences, trimmed.
  const parts = para.split(/(?<=[.!?])\s+/);
  return parts.slice(0, 2).join(" ");
}

export function WorkSection({ caseStudies }: WorkSectionProps) {
  return (
    <section
      data-theme="light"
      aria-label="Selected work"
      className="relative"
      style={{ background: "var(--color-bg-white)" }}
    >
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-8">
        <FadeIn>
          <p
            className="uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.2em",
              color:
                "color-mix(in srgb, var(--color-text-primary) 40%, transparent)",
            }}
          >
            Selected Work
          </p>
        </FadeIn>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Sticky counter — desktop only */}
        <aside className="hidden md:block md:sticky md:top-32 self-start h-fit">
          <p
            id="work-counter"
            className="leading-none tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(120px, 14vw, 180px)",
              color:
                "color-mix(in srgb, var(--color-text-primary) 10%, transparent)",
            }}
          >
            01
          </p>
          <div
            className="mt-6 h-px w-10"
            style={{ background: "var(--color-accent-primary)" }}
          />
          <p
            className="mt-4 uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.2em",
              color:
                "color-mix(in srgb, var(--color-text-primary) 50%, transparent)",
            }}
          >
            {caseStudies.length} Case Stud
            {caseStudies.length === 1 ? "y" : "ies"}
          </p>
        </aside>

        {/* Blocks */}
        <div>
          {caseStudies.map((cs, i) => (
            <WorkBlock key={cs.frontmatter.slug} caseStudy={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkBlock({
  caseStudy,
  index,
}: {
  caseStudy: CaseStudy;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  // Imperative counter sync — see parent comment.
  if (typeof document !== "undefined" && inView) {
    const el = document.getElementById("work-counter");
    if (el) el.textContent = String(index + 1).padStart(2, "0");
  }

  const fm = caseStudy.frontmatter;
  const visual = VISUAL[fm.slug] ?? {
    category: "— Project",
    gradient: "linear-gradient(135deg, #050507, #0d0d12, #050507)",
  };
  const primary = fm.results[0];
  const parsed = primary ? parseMetric(primary.metric) : null;
  const description = firstSentence(caseStudy.body);

  return (
    <div
      ref={ref}
      className="min-h-[80vh] flex flex-col justify-center py-20 border-t"
      style={{ borderColor: "rgba(5,5,7,0.1)" }}
    >
      <FadeIn>
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: "0.15em",
            color:
              "color-mix(in srgb, var(--color-text-primary) 50%, transparent)",
          }}
        >
          {visual.category}
        </p>
      </FadeIn>

      <ClipReveal className="mt-6">
        <h3
          className="font-syne"
          style={{
            fontWeight: 700,
            fontSize: "clamp(48px, 7vw, 96px)",
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            color: "var(--color-text-primary)",
          }}
        >
          {fm.title.split(" — ")[0]}
        </h3>
      </ClipReveal>

      <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-10 md:items-end">
        <div>
          {primary && parsed ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6 }}
              >
                <span
                  className="font-syne"
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(72px, 12vw, 140px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 0.85,
                    color: "var(--color-accent-primary)",
                    display: "inline-block",
                  }}
                >
                  <CountUp
                    to={parsed.to}
                    prefix={parsed.prefix}
                    suffix={parsed.suffix}
                    fallbackText={parsed.fallbackText}
                  />
                </span>
              </motion.div>
              <p
                className="mt-3 text-sm uppercase"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  letterSpacing: "0.15em",
                  color:
                    "color-mix(in srgb, var(--color-text-primary) 50%, transparent)",
                }}
              >
                {primary.label}
              </p>
            </>
          ) : null}

          <p
            className="mt-8 max-w-md"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: 18,
              lineHeight: 1.6,
              color:
                "color-mix(in srgb, var(--color-text-primary) 70%, transparent)",
            }}
          >
            {description}
          </p>

          <div className="mt-8">
            <Link
              href={`/work/${fm.slug}`}
              data-cursor="hover"
              className="group inline-flex items-center transition-colors hover:text-[color:var(--color-accent-primary)]"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--color-text-primary)",
                borderBottom: "1px solid currentColor",
                paddingBottom: 2,
              }}
            >
              <span>View Case Study</span>
              <span
                aria-hidden="true"
                className="ml-2 transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Demo video for this case study. Muted + playsInline so it
         * auto-plays on every platform including iOS. objectFit: cover
         * fills the 420x320 cell cleanly. Hidden on mobile — the phone
         * grid is single-column and the demo would dominate the viewport. */}
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="hidden md:block"
          style={{
            width: 420,
            minHeight: 320,
            objectFit: "cover",
          }}
        >
          <source src={visual.video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
