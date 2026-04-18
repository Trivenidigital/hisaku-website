import Image from "next/image";
import type { CaseStudy } from "@/lib/content/case-studies";
import { TransitionLink } from "./TransitionLink";

interface WorkTileProps {
  caseStudy: CaseStudy;
  /** "hero" tiles render larger with a bigger image; "standard" is the default. */
  variant?: "hero" | "standard";
  /** Pixel width the image will render at, used by next/image sizes. */
  sizes?: string;
}

const SERVICE_LABEL: Record<string, string> = {
  design: "Design",
  development: "Development",
  "digital-marketing": "Digital Marketing",
  "ai-marketing": "AI Marketing",
};

/**
 * Case-study tile used by the home featured grid and the /work grid.
 * Wraps TransitionLink so clicking initiates the view-transition morph
 * to the case study detail page's hero.
 */
export function WorkTile({
  caseStudy,
  variant = "standard",
  sizes,
}: WorkTileProps) {
  const { slug, title, services, hero, results } = caseStudy.frontmatter;
  const primaryResult = results[0];
  const transitionName = `work-${slug}`;

  const isHero = variant === "hero";

  return (
    <TransitionLink
      href={`/work/${slug}`}
      transitionName={transitionName}
      className="group block"
    >
      <article
        className={
          "relative overflow-hidden rounded-2xl bg-[color:var(--color-elevated)] ring-1 ring-[color:var(--color-hairline)] transition-transform duration-300 ease-out group-hover:-translate-y-1"
        }
      >
        <div
          className={
            isHero
              ? "aspect-[16/10] relative"
              : "aspect-[4/3] relative"
          }
        >
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            sizes={sizes ?? "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"}
            // data-morph-origin lets <TransitionLink> find and tag the image.
            data-morph-origin=""
            className="object-cover"
            priority={isHero}
          />
        </div>
        <div className="p-6 md:p-8 flex flex-col gap-3">
          <h3
            className={
              isHero
                ? "text-3xl md:text-4xl font-bold tracking-tight"
                : "text-xl md:text-2xl font-bold tracking-tight"
            }
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {services.map((s) => (
              <span
                key={s}
                className="px-2 py-1 rounded-full border border-[color:var(--color-hairline)]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {SERVICE_LABEL[s]}
              </span>
            ))}
          </div>
          {primaryResult ? (
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-accent-primary)" }}
            >
              {primaryResult.metric} · {primaryResult.label}
            </p>
          ) : null}
        </div>
      </article>
    </TransitionLink>
  );
}
