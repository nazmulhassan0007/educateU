import type { Transition, Variants } from "motion/react";

/** Strong ease-out: starts fast, settles softly. Used for every entrance. */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
/** Strong ease-in-out for things that move while already on screen. */
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];

export const reveal: Transition = { duration: 0.7, ease: EASE_OUT };
export const quick: Transition = { duration: 0.2, ease: EASE_OUT };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: reveal },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

/** Text line slides up from behind its mask. */
export const lineUp: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

export const stagger = (delay = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren } },
});

export const viewport = { once: true, margin: "-8% 0px -8% 0px" } as const;
