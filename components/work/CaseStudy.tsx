import Link from "next/link";
import { TracingBeam } from "@/components/ui/TracingBeam";
import { GlassCard } from "@/components/ui/GlassCard";
import type { CaseStudy as CaseStudyType } from "@/lib/content/case-studies";

/**
 * CaseStudy — TracingBeam wraps the main narrative column. Right rail
 * has a sticky glass TOC + outcome metrics. Designed to feel editorial,
 * not template-y.
 */
interface CaseStudyProps {
  study: CaseStudyType;
  compiledBody: React.ReactNode;
  next: { slug: string; title: string } | null;
}

export function CaseStudy({ study, compiledBody, next }: CaseStudyProps) {
  const fm = study.frontmatter;
  return (
    <main
      id="main"
      style={{ backgroundColor: "#0a0a0f", paddingTop: 120 }}
    >
      <section style={{ padding: "80px 48px 40px" }}>
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
            {fm.client} · {fm.timeline}
          </p>
          <h1
            style={{
              margin: "20px 0 0",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              color: "#f7f8f8",
              lineHeight: 1.02,
              maxWidth: 1000,
            }}
          >
            {fm.title}
          </h1>
        </div>
      </section>

      <section style={{ padding: "40px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              position: "relative",
              aspectRatio: "16 / 9",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              backgroundColor: "#12121a",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fm.hero.src}
              alt={fm.hero.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 48px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: 80,
            alignItems: "start",
          }}
        >
          <TracingBeam>
            <article
              className="prose-case-study"
              style={{
                color: "#d0d6e0",
                fontSize: 17,
                lineHeight: 1.8,
                maxWidth: 720,
              }}
            >
              {compiledBody}
            </article>
          </TracingBeam>

          <aside style={{ position: "sticky", top: 100 }}>
            <GlassCard interactive={false} radius={12} style={{ padding: 24 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#62666d",
                }}
              >
                Outcomes
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "20px 0 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {fm.results.map((r, i) => (
                  <li key={i}>
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 510,
                        letterSpacing: "-0.02em",
                        color: "#f7f8f8",
                        fontVariantNumeric: "tabular-nums",
                        lineHeight: 1,
                      }}
                    >
                      {r.metric}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 13,
                        color: "#8a8f98",
                        lineHeight: 1.4,
                      }}
                    >
                      {r.label}
                    </div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </aside>
        </div>
      </section>

      {next ? (
        <section
          style={{
            padding: "80px 48px 120px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            marginTop: 80,
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
              Next case study
            </p>
            <Link
              href={`/work/${next.slug}`}
              className="next-case-link"
              style={{
                display: "inline-block",
                marginTop: 16,
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "#f7f8f8",
                textDecoration: "none",
                transition: "color 200ms ease",
              }}
            >
              {next.title} →
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
