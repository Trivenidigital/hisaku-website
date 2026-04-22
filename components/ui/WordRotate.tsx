"use client";

/**
 * WordRotate — vertical word rotator for hero headlines.
 *
 * Cycles through a list of words every `interval` ms. Each word
 * slides up and fades. Inline-block so it sits within a larger
 * headline without collapsing layout.
 */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function WordRotate({
  words,
  interval = 2400,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setI((n) => (n + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span
      className={`relative inline-block align-baseline ${className}`}
      style={{ minWidth: "6ch" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ y: "0.5em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-0.5em", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{ color: "#e8ff47" }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
