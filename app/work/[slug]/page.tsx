import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getNextCaseStudy,
} from "@/lib/content/case-studies";
import { buildMetadata } from "@/lib/metadata";

/** Render a section's body as <p> elements, splitting on blank lines. */
function renderParagraphs(source: string, muted: boolean) {
  const paragraphs = source.split(/\n\s*\n/).filter((p) => p.trim());
  const color = muted ? "rgba(5,5,7,0.8)" : "rgba(244,243,239,0.85)";
  return paragraphs.map((p, i) => (
    <p
      key={i}
      style={{
        fontFamily: "var(--font-sans, sans-serif)",
        fontWeight: 300,
        fontSize: 18,
        lineHeight: 1.75,
        color,
        marginBottom: i === paragraphs.length - 1 ? 0 : 24,
      }}
    >
      {p.trim()}
    </p>
  ));
}

interface PageProps {
  params: Promise<{ slug: string }>;
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

export async function generateStaticParams() {
  return getCaseStudies().map((cs) => ({ slug: cs.frontmatter.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return { title: "Not found" };
  return buildMetadata({
    title: cs.frontmatter.title,
    description: `${cs.frontmatter.client} · ${cs.frontmatter.timeline}`,
    canonicalPath: `/work/${cs.frontmatter.slug}`,
  });
}

/**
 * Case study detail — hero + alternating dark/white sections.
 *
 * Section rhythm:
 *   Hero (dark + video bg + metric)
 *   Challenge (white)
 *   What We Built (dark)
 *   Results (white) — 3 stat boxes
 *   Next case study + back link (dark)
 */
export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const next = getNextCaseStudy(slug);
  const fm = cs.frontmatter;
  const video = VIDEO[fm.slug];
  const category = CATEGORY[fm.slug] ?? "Project";
  const primary = fm.results[0];

  // Parse body into Challenge / Approach / Outcome sections.
  const sections = parseBody(cs.body);

  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: fm.title,
    about: fm.client,
    author: { "@type": "Organization", name: "Hisaku" },
    datePublished: fm.publishedAt,
    image: fm.hero.src,
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      {/* Hero — full viewport with video bg */}
      <section
        data-theme="dark"
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundColor: "#050507",
          overflow: "hidden",
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
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.45,
              zIndex: 0,
            }}
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : null}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(5,5,7,0.55)",
            zIndex: 1,
          }}
        />

        {/* Content anchored bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 60,
            right: 60,
            zIndex: 2,
            maxWidth: 1200,
          }}
        >
          <Link
            href="/work"
            data-cursor="hover"
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 300,
              fontSize: 14,
              color: "rgba(244,243,239,0.6)",
              display: "inline-block",
              marginBottom: 32,
            }}
          >
            ← Back to Work
          </Link>
          <p
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#e8ff47",
              marginBottom: 24,
            }}
          >
            Case Study — {category}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 800,
              fontSize: "clamp(72px, 12vw, 160px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.88,
              color: "#f4f3ef",
            }}
          >
            {fm.title.split(" — ")[0]}
          </h1>
          {primary ? (
            <p
              style={{
                marginTop: 40,
                fontFamily: "var(--font-syne, sans-serif)",
                fontWeight: 800,
                fontSize: "clamp(48px, 8vw, 96px)",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: "#e8ff47",
              }}
            >
              {primary.metric}
              <span
                style={{
                  fontFamily: "var(--font-sans, sans-serif)",
                  fontWeight: 300,
                  fontSize: 14,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(244,243,239,0.55)",
                  marginLeft: 24,
                }}
              >
                {primary.label}
              </span>
            </p>
          ) : null}
          <dl
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "12px 24px",
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: 14,
              color: "rgba(244,243,239,0.8)",
              maxWidth: 560,
            }}
          >
            <dt style={{ color: "rgba(244,243,239,0.45)" }}>Client</dt>
            <dd>{fm.client}</dd>
            <dt style={{ color: "rgba(244,243,239,0.45)" }}>Timeline</dt>
            <dd>{fm.timeline}</dd>
            <dt style={{ color: "rgba(244,243,239,0.45)" }}>Services</dt>
            <dd>{fm.services.join(" · ")}</dd>
          </dl>
        </div>
      </section>

      {/* Challenge (white) */}
      <section
        data-theme="light"
        style={{
          backgroundColor: "#f4f3ef",
          color: "#050507",
          padding: "120px 60px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(5,5,7,0.45)",
              marginBottom: 24,
            }}
          >
            — The Challenge
          </p>
          <h2
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "#050507",
              marginBottom: 32,
            }}
          >
            What we were asked to solve.
          </h2>
          <div>
            {sections.challenge
              ? renderParagraphs(sections.challenge, true)
              : (
                <p
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontWeight: 300,
                    fontSize: 18,
                    lineHeight: 1.75,
                    color: "rgba(5,5,7,0.6)",
                  }}
                >
                  Content coming soon.
                </p>
              )}
          </div>
        </div>
      </section>

      {/* What We Built (dark) */}
      <section
        data-theme="dark"
        style={{
          backgroundColor: "#050507",
          color: "#f4f3ef",
          padding: "120px 60px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(244,243,239,0.45)",
              marginBottom: 24,
            }}
          >
            — What We Built
          </p>
          <h2
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "#f4f3ef",
              marginBottom: 32,
            }}
          >
            Our approach, in detail.
          </h2>
          <div>
            {sections.approach
              ? renderParagraphs(sections.approach, false)
              : (
                <p
                  style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontWeight: 300,
                    fontSize: 18,
                    lineHeight: 1.75,
                    color: "rgba(244,243,239,0.55)",
                  }}
                >
                  Details of the build coming shortly.
                </p>
              )}
          </div>
        </div>
      </section>

      {/* Results (white) — 3 stat boxes */}
      <section
        data-theme="light"
        style={{
          backgroundColor: "#f4f3ef",
          color: "#050507",
          padding: "120px 60px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(5,5,7,0.45)",
              marginBottom: 24,
            }}
          >
            — The Outcome
          </p>
          <h2
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "#050507",
              marginBottom: 48,
            }}
          >
            What shipped, and what changed.
          </h2>
          <div style={{ marginBottom: 64 }}>
            {sections.outcome
              ? renderParagraphs(sections.outcome, true)
              : null}
          </div>

          {/* Stat boxes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(fm.results.length, 3)}, 1fr)`,
              gap: 0,
              marginTop: 32,
            }}
          >
            {fm.results.slice(0, 3).map((r) => (
              <div
                key={`${r.metric}-${r.label}`}
                style={{
                  border: "1px solid rgba(5,5,7,0.1)",
                  padding: "48px 32px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-syne, sans-serif)",
                    fontWeight: 800,
                    fontSize: 64,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.9,
                    color: "#e8ff47",
                    WebkitTextStroke: "1px rgba(5,5,7,0.1)",
                  }}
                >
                  {r.metric}
                </div>
                <div
                  style={{
                    marginTop: 16,
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontWeight: 300,
                    fontSize: 13,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(5,5,7,0.5)",
                  }}
                >
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next + back */}
      <section
        data-theme="dark"
        style={{
          backgroundColor: "#050507",
          color: "#f4f3ef",
          padding: "120px 60px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/work"
            data-cursor="hover"
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 400,
              fontSize: 14,
              color: "rgba(244,243,239,0.6)",
            }}
          >
            ← Back to Work
          </Link>
          {next && next.frontmatter.slug !== slug ? (
            <Link
              href={`/work/${next.frontmatter.slug}`}
              data-cursor="hover"
              style={{
                fontFamily: "var(--font-syne, sans-serif)",
                fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 48px)",
                letterSpacing: "-0.03em",
                color: "#f4f3ef",
              }}
            >
              Next: {next.frontmatter.title.split(" — ")[0]} →
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
}

/** Parse MDX body into Challenge / Approach / Outcome paragraphs. */
function parseBody(body: string): {
  challenge: string;
  approach: string;
  outcome: string;
} {
  const sections = { challenge: "", approach: "", outcome: "" };
  const matches = body.matchAll(
    /##\s+(Challenge|Approach|Outcome)\s*\n+([\s\S]*?)(?=\n##|$)/g
  );
  for (const m of matches) {
    const key = m[1].toLowerCase() as keyof typeof sections;
    sections[key] = m[2].trim();
  }
  return sections;
}
