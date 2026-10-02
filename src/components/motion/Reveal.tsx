"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { fadeUp, stagger, viewport } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Seconds to wait before this element starts. */
  delay?: number;
};

/** Fade-and-rise once, when the element scrolls into view. */
export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type GroupProps = HTMLMotionProps<"div"> & {
  /** Seconds between each child's entrance. */
  gap?: number;
  delay?: number;
};

/** Parent that staggers its `<Item>` children. */
export function RevealGroup({ gap = 0.07, delay = 0, children, ...rest }: GroupProps) {
  return (
    <motion.div
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Item({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} {...rest}>
      {children}
    </motion.div>
  );
}
