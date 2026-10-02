"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

/**
 * A statement the reader brightens by scrolling: each word lifts from a faint
 * tint to full ink as it passes the reading line. Reduced motion shows it whole.
 */
export function WordScrub({
  as: Tag = "p",
  id,
  className = "",
  children,
  from = 0.16,
}: {
  as?: "p" | "h2" | "blockquote";
  id?: string;
  className?: string;
  children: string;
  from?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let split: SplitText | undefined;
      document.fonts.ready.then(() => {
        if (!el.isConnected) return;
        split = SplitText.create(el, {
          type: "words",
          wordsClass: "inline-block",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: from },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 42%", scrub: 0.4 },
              },
            ),
        });
      });
      return () => split?.revert();
    },
    { scope: ref, dependencies: [children, from] },
  );

  const props = { id, className, children };
  if (Tag === "h2") return <h2 ref={ref as React.Ref<HTMLHeadingElement>} {...props} />;
  if (Tag === "blockquote") return <blockquote ref={ref as React.Ref<HTMLQuoteElement>} {...props} />;
  return <p ref={ref as React.Ref<HTMLParagraphElement>} {...props} />;
}
