import { getCaseStudies } from "@/lib/content/case-studies";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutStrip } from "@/components/sections/AboutStrip";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { colors } from "@/lib/design";

/**
 * Home page — premium agency layout.
 *
 * Section flow:
 *   1. Hero          — video, spotlight, headline with accent
 *   2. Marquee       — seamless scrolling strip
 *   3. Work          — 3-col card grid with video thumbs
 *   4. Services      — 2x2 card grid
 *   5. AboutStrip    — 2-col about + spring-animated stats
 *   6. Testimonial   — 5-star centered
 *   7. CTA           — gradient card with shimmer button
 */
export default function HomePage() {
  const caseStudies = getCaseStudies();

  return (
    <main
      id="main"
      style={{ backgroundColor: colors.bg, color: "#f7f8f8" }}
    >
      <HeroSection />
      <MarqueeSection />
      {caseStudies.length > 0 ? (
        <WorkSection caseStudies={caseStudies} />
      ) : null}
      <ServicesSection />
      <AboutStrip />
      <TestimonialSection />
      <CtaSection />
    </main>
  );
}
