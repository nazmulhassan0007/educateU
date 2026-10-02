"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register once, on the client. Every component imports gsap from here.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "power3.out" });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** Matches the Motion tokens so both libraries move with the same voice. */
export const GSAP_EASE_OUT = "expo.out";
export const GSAP_EASE_IN_OUT = "power4.inOut";
