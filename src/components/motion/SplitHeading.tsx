"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  children: string;
  /** Seconds between characters. */
  stagger?: number;
};

/**
 * Heading set character by character as it scrolls into view.
 * Each character rises from behind its own mask with a touch of blur, so the
 * line reads as type being set rather than a block fading in.
 */
export function SplitHeading({ as = "h2", id, className, children, stagger = 0.018 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = as;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      let split: SplitText | undefined;
      document.fonts.ready.then(() => {
        if (!el.isConnected) return;
        split = SplitText.create(el, {
          type: "words,chars",
          mask: "chars",
          charsClass: "inline-block will-change-transform",
          wordsClass: "inline-block whitespace-nowrap",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 110,
              filter: "blur(6px)",
              duration: 0.9,
              ease: "expo.out",
              stagger,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        });
      });
      return () => split?.revert();
    },
    { scope: ref, dependencies: [children, stagger] },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
