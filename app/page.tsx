import { getCaseStudies } from "@/lib/content/case-studies";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ThatIsHisakuSection } from "@/components/sections/ThatIsHisakuSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StudioStatement } from "@/components/sections/StudioStatement";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CtaSection } from "@/components/sections/CtaSection";

/**
 * Home page — terminal-industries-inspired rebuild.
 *
 * Background rhythm (the life of the page):
 *   1. Hero           — dark   (dot grid + grain)
 *   2. Marquee        — dark   (seamless continuation)
 *   3. Selected Work  — WHITE  (stark flip; video placeholders)
 *   4. That's Hisaku  — TEAL   (identity moment, scramble text)
 *   5. Services       — dark   (line-draw rows)
 *   6. Studio         — WHITE  (second contrast flip)
 *   7. Testimonial    — dark
 *   8. CTA            — TEAL   (bookends identity)
 *
 * Each section declares its theme via data-theme, which flips the
 * --color-text-* variables so children don't need per-section styles.
 */
export default function HomePage() {
  const caseStudies = getCaseStudies();

  return (
    <main id="main" className="flex-1">
      <HeroSection />
      <MarqueeSection />
      {caseStudies.length > 0 ? (
        <WorkSection caseStudies={caseStudies.slice(0, 3)} />
      ) : null}
      <ThatIsHisakuSection />
      <ServicesSection />
      <StudioStatement />
      <TestimonialSection />
      <CtaSection />
    </main>
  );
}
