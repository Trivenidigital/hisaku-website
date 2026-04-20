import { getCaseStudies } from "@/lib/content/case-studies";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StudioStatement } from "@/components/sections/StudioStatement";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CtaSection } from "@/components/sections/CtaSection";

/**
 * Home page — terminal-industries-inspired redesign.
 *
 * Section rhythm:
 *   1. Hero            — full viewport, staggered type, drifting dot grid, marquee
 *   2. Selected Work   — sticky counter + 3 scrolling case study blocks
 *   3. Services        — editorial list, CSS hover reveal
 *   4. Studio          — highlighted headline + inline stats (on elevated surface)
 *   5. Testimonial     — centered quote, oversized decorative mark
 *   6. CTA             — "Ready to move?" + lime button + WhatsApp link
 *
 * Content comes from the MDX pipeline (case studies). Navbar + SiteFooter
 * wrap from the root layout — both untouched in this redesign per spec.
 */
export default function HomePage() {
  const caseStudies = getCaseStudies();

  return (
    <main id="main" className="flex-1">
      <HeroSection />
      {caseStudies.length > 0 ? (
        <WorkSection caseStudies={caseStudies.slice(0, 3)} />
      ) : null}
      <ServicesSection />
      <StudioStatement />
      <TestimonialSection />
      <CtaSection />
    </main>
  );
}
