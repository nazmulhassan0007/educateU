"use client";

import { motion } from "motion/react";
import { lineUp, stagger, viewport } from "@/lib/motion";

type LinesProps = {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "p";
  className?: string;
  lineClassName?: string;
  /** Seconds between lines. */
  gap?: number;
  delay?: number;
  /** Play on mount instead of on scroll (hero). */
  immediate?: boolean;
};

/**
 * Heading whose lines rise out of their own line-box.
 * Each line is masked, so the reveal reads as text being set, not fading in.
 */
export function Lines({
  lines,
  as = "h2",
  className,
  lineClassName,
  gap = 0.08,
  delay = 0,
  immediate = false,
}: LinesProps) {
  const Tag = motion[as];
  const inView = immediate ? { animate: "show" as const } : { whileInView: "show" as const, viewport };

  return (
    <Tag className={className} variants={stagger(gap, delay)} initial="hidden" {...inView}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <motion.span className={`block ${lineClassName ?? ""}`} variants={lineUp}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
