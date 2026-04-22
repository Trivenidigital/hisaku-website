import type { Metadata } from "next";
import { Capabilities } from "@/components/capabilities/Capabilities";
import { getServices } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Four disciplines under one roof: design, development, marketing, and AI automation.",
};

// Desired display order. Keeps capabilities stable even if MDX file order changes.
const ORDER = ["design", "development", "digital-marketing", "ai-marketing"] as const;

export default function CapabilitiesPage() {
  const all = getServices();
  const services = ORDER.flatMap((slug) => {
    const s = all.find((x) => x.frontmatter.slug === slug);
    if (!s) return [];
    return [
      {
        slug: s.frontmatter.slug,
        title: s.frontmatter.title,
        // Use the first sentence of description as summary on the bento.
        summary:
          s.frontmatter.description.split(/(?<=\.)\s+/).slice(0, 2).join(" "),
        features: s.frontmatter.features,
        span: { cols: 3 },
      },
    ];
  });

  return <Capabilities services={services} />;
}
