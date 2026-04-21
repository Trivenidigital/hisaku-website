import { getCaseStudies } from "@/lib/content/case-studies";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WorkSection } from "@/components/sections/WorkSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutStrip } from "@/components/sections/AboutStrip";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CtaSection } from "@/components/sections/CtaSection";

/**
 * Home page — premium agency redesign.
 *
 * Section flow (no marquee, no "That's Hisaku" identity moment):
 *   1. Hero        — centered, video bg, badge + 2 CTAs
 *   2. TrustStrip  — thin band under hero
 *   3. Work        — 3-column card grid
 *   4. Services    — 2x2 card grid
 *   5. AboutStrip  — 2-col about + 3 stats
 *   6. Testimonial — 5-star centered
 *   7. CTA         — gradient bordered card
 *
 * Navbar and SiteFooter come from the root layout.
 */
export default function HomePage() {
  const caseStudies = getCaseStudies();

  return (
    <main id="main" style={{ backgroundColor: "#0a0a0a" }}>
      <HeroSection />
      <TrustStrip />
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
