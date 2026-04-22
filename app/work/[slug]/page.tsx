import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getNextCaseStudy,
} from "@/lib/content/case-studies";
import { buildMetadata } from "@/lib/metadata";
import { colors, fonts } from "@/lib/design";

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

/** Render a source string as <p> elements split on blank lines. */
function renderParagraphs(source: string, color: string) {
  const paras = source.split(/\n\s*\n/).filter((p) => p.trim());
  if (paras.length === 0) {
    return (
      <p
        style={{
          fontFamily: fonts.body,
          fontWeight: 400,
          fontSize: 17,
          lineHeight: 1.7,
          color,
        }}
      >
        Details coming soon.
      </p>
    );
  }
  return paras.map((p, i) => (
    <p
      key={i}
      style={{
        fontFamily: fonts.body,
        fontWeight: 400,
        fontSize: 17,
        lineHeight: 1.7,
        color,
        marginBottom: i === paras.length - 1 ? 0 : 20,
      }}
    >
      {p.trim()}
    </p>
  ));
}

function parseBody(body: string) {
  const sections: Record<string, string> = {
    challenge: "",
    approach: "",
    outcome: "",
  };
  const matches = body.matchAll(
    /##\s+(Challenge|Approach|Outcome)\s*\n+([\s\S]*?)(?=\n##|$)/g
  );
  for (const m of matches) {
    const key = m[1].toLowerCase();
    sections[key] = m[2].trim();
  }
  return sections;
}

/**
 * Case study detail page.
 *
 * Section flow:
 *   1. Hero  — video bg + client name + metric + back link
 *   2. Challenge    — surface bg, narrative paragraphs
 *   3. Solution     — base bg, narrative paragraphs
 *   4. Results      — surface bg + 3 stat boxes (up to 5) + next case
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
    <main
      id="main"
      style={{ backgroundColor: colors.bg, color: "#f7f8f8" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "80vh",
          backgroundColor: colors.bg,
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
              opacity: 0.25,
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
            backgroundColor: "rgba(5,5,7,0.72)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: 160,
            paddingBottom: 80,
            paddingLeft: 48,
            paddingRight: 48,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <Link
            href="/work"
            style={{
              fontFamily: fonts.body,
              fontWeight: 400,
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              display: "inline-block",
              marginBottom: 32,
            }}
          >
            ← Back to Work
          </Link>
          <p
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: colors.accent,
              margin: "0 0 24px",
            }}
          >
            Case Study — {category}
          </p>
          <h1
            style={{
              fontFamily: fonts.display,
              fontWeight: 510,
              fontSize: "clamp(64px, 9vw, 120px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              color: colors.white,
              margin: 0,
            }}
          >
            {fm.title.split(" — ")[0]}
          </h1>
          {primary ? (
            <p
              style={{
                marginTop: 32,
                fontFamily: fonts.display,
                fontWeight: 510,
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: colors.accent,
              }}
            >
              {primary.metric}
              <span
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 400,
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  marginLeft: 20,
                  verticalAlign: "middle",
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
              fontFamily: fonts.body,
              fontSize: 14,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 560,
            }}
          >
            <dt style={{ color: "rgba(255,255,255,0.45)" }}>Client</dt>
            <dd style={{ margin: 0 }}>{fm.client}</dd>
            <dt style={{ color: "rgba(255,255,255,0.45)" }}>Timeline</dt>
            <dd style={{ margin: 0 }}>{fm.timeline}</dd>
            <dt style={{ color: "rgba(255,255,255,0.45)" }}>Services</dt>
            <dd style={{ margin: 0 }}>{fm.services.join(" · ")}</dd>
          </dl>
        </div>
      </section>

      {/* Challenge */}
      <ContentSection
        label="— The Challenge"
        heading="What we were asked to solve."
        bodyColor="rgba(255,255,255,0.75)"
        backgroundColor={colors.surface}
      >
        {renderParagraphs(sections.challenge, "rgba(255,255,255,0.75)")}
      </ContentSection>

      {/* Solution */}
      <ContentSection
        label="— The Solution"
        heading="What we built."
        bodyColor="rgba(255,255,255,0.75)"
        backgroundColor={colors.bg}
      >
        {renderParagraphs(sections.approach, "rgba(255,255,255,0.75)")}
      </ContentSection>

      {/* Results */}
      <section
        style={{
          backgroundColor: colors.surface,
          padding: "80px 48px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              margin: "0 0 24px",
            }}
          >
            — Results
          </p>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 510,
              fontSize: 32,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: colors.white,
              margin: "0 0 32px",
            }}
          >
            What shipped, and what changed.
          </h2>
          {sections.outcome ? (
            <div style={{ maxWidth: 800, marginBottom: 48 }}>
              {renderParagraphs(sections.outcome, "rgba(255,255,255,0.75)")}
            </div>
          ) : null}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`,
              gap: 24,
            }}
          >
            {fm.results.slice(0, 5).map((r) => (
              <div
                key={`${r.metric}-${r.label}`}
                style={{
                  backgroundColor: colors.bg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 12,
                  padding: 32,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 510,
                    fontSize: 56,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    color: colors.accent,
                  }}
                >
                  {r.metric}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    fontFamily: fonts.body,
                    fontWeight: 400,
                    fontSize: 13,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
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
        style={{ backgroundColor: colors.bg, padding: "80px 48px 120px" }}
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
            style={{
              fontFamily: fonts.body,
              fontWeight: 400,
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
            }}
          >
            ← Back to Work
          </Link>
          {next && next.frontmatter.slug !== slug ? (
            <Link
              href={`/work/${next.frontmatter.slug}`}
              style={{
                fontFamily: fonts.display,
                fontWeight: 510,
                fontSize: "clamp(28px, 4vw, 44px)",
                letterSpacing: "-0.02em",
                color: colors.white,
                textDecoration: "none",
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

function ContentSection({
  label,
  heading,
  backgroundColor,
  bodyColor,
  children,
}: {
  label: string;
  heading: string;
  backgroundColor: string;
  bodyColor: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ backgroundColor, padding: "80px 48px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: fonts.body,
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            margin: "0 0 24px",
          }}
        >
          {label}
        </p>
        <h2
          style={{
            fontFamily: fonts.display,
            fontWeight: 510,
            fontSize: 32,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            color: colors.white,
            margin: "0 0 32px",
          }}
        >
          {heading}
        </h2>
        <div style={{ color: bodyColor }}>{children}</div>
      </div>
    </section>
  );
}
