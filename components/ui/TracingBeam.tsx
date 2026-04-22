"use client";

/**
 * TracingBeam — vertical SVG line that fills as the user scrolls past
 * it. Mirrors Aceternity's pattern but tuned to our lime accent.
 *
 * Wrap long-form content. The beam renders at the left gutter on md+
 * and collapses on mobile.
 */

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function TracingBeam({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 20%", "end end"],
  });

  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setSvgHeight(entry.contentRect.height);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <div ref={ref} className={`relative mx-auto w-full max-w-4xl ${className}`}>
      <div className="absolute top-0 -left-4 hidden md:block">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{ boxShadow: "rgba(232,255,71,0.5) 0px 0px 16px 2px" }}
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm"
          style={{
            borderColor: "rgba(255,255,255,0.12)",
            background: "#08090a",
          }}
        >
          <div
            className="h-2 w-2 rounded-full border"
            style={{
              borderColor: "rgba(255,255,255,0.24)",
              background: "#e8ff47",
            }}
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden
        >
          <motion.path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeOpacity="1"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#tb-grad)"
            strokeWidth="1.5"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient
              id="tb-grad"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#e8ff47" stopOpacity="0" />
              <stop stopColor="#e8ff47" />
              <stop offset="0.325" stopColor="#f0ff6e" />
              <stop offset="1" stopColor="#e8ff47" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div>{children}</div>
    </div>
  );
}
