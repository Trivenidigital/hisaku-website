import { Hero } from "@/components/sections/Hero";
import { HomeMarquee } from "@/components/sections/Marquee";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { Services } from "@/components/sections/Services";
import { AboutStrip } from "@/components/sections/AboutStrip";
import { Testimonial } from "@/components/sections/Testimonial";
import { CTA } from "@/components/sections/CTA";
import { getCaseStudies } from "@/lib/content/case-studies";

const SERVICE_LABEL: Record<string, string> = {
  design: "Design",
  development: "Development",
  "digital-marketing": "Marketing",
  "ai-marketing": "AI Automation",
};

export default function HomePage() {
  const studies = getCaseStudies().slice(0, 3).map((c) => {
    const fm = c.frontmatter;
    return {
      slug: fm.slug,
      title: fm.title,
      category: SERVICE_LABEL[fm.services[0]] ?? fm.services[0],
      year: fm.publishedAt.slice(0, 4),
      thumbnail: fm.hero.src,
      metric: fm.results[0]
        ? { value: fm.results[0].metric, label: fm.results[0].label }
        : null,
    };
  });

  return (
    <main id="main">
      <Hero />
      <HomeMarquee />
      <WorkGrid items={studies} />
      <Services />
      <AboutStrip />
      <Testimonial
        quote="They shipped more in six weeks than our previous agency did in six months. The work is honest, the communication is tight, and the outcomes are measurable."
        author="Ravi K."
        role="Founder, Triveni Express"
      />
      <CTA />
    </main>
  );
}
