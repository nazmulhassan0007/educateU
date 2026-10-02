"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, GSAP_EASE_IN_OUT } from "@/lib/gsap";
import { usePageReady } from "./loader-context";

/**
 * Logo preloader. The mark assembles from its parts: the disc lands first, then the
 * three mint strokes fly in from different edges and settle into place. The wordmark
 * wipes out from behind the mark, the lockup holds for a beat, and the curtain lifts
 * into the hero sequence.
 *
 * Mark geometry is traced from the production logo (54 × 54 box, 3px strokes).
 */
export function Preloader() {
  const { setReady } = usePageReady();
  const root = useRef<HTMLDivElement>(null);
  const lockup = useRef<HTMLDivElement>(null);
  const mark = useRef<SVGSVGElement>(null);
  const disc = useRef<SVGCircleElement>(null);
  const l1 = useRef<SVGLineElement>(null);
  const l2 = useRef<SVGLineElement>(null);
  const l3 = useRef<SVGLineElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const release = () => {
      html.style.overflow = "";
    };

    if (reduce) {
      // Skip the sequence entirely; defer so the state change is not synchronous in the effect.
      const id = requestAnimationFrame(() => {
        setReady(true);
        setDone(true);
        release();
      });
      return () => cancelAnimationFrame(id);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          setDone(true);
          release();
        },
      });

      // Lines start off-screen in three different directions, slightly over-rotated.
      gsap.set(l1.current, { x: 140, y: -120, rotation: 35, opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(l2.current, { x: -160, y: 0, rotation: -25, opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(l3.current, { x: -60, y: 150, rotation: 20, opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(word.current, { clipPath: "inset(0 100% 0 0)", x: -24 });
      gsap.set(mark.current, { x: 70 }); // centred while alone, slides left when the wordmark joins

      tl.fromTo(
        disc.current,
        { scale: 0.2, opacity: 0, transformOrigin: "50% 50%" },
        { scale: 1, opacity: 1, duration: 0.75, ease: "back.out(1.6)" },
      )
        .to(l1.current, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.7 }, "-=0.4")
        .to(l2.current, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.7 }, "-=0.56")
        .to(l3.current, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.7 }, "-=0.56")
        // A tiny settle so the assembly feels physical.
        .to(mark.current, { scale: 1.06, duration: 0.18, ease: "power2.out", transformOrigin: "50% 50%" }, "-=0.3")
        .to(mark.current, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" })
        // Wordmark slides out from behind the mark as the mark moves left.
        .to(mark.current, { x: 0, duration: 0.8, ease: GSAP_EASE_IN_OUT }, "-=0.45")
        .to(word.current, { clipPath: "inset(0 0% 0 0)", x: 0, duration: 0.8, ease: GSAP_EASE_IN_OUT }, "<")
        .to({}, { duration: 0.25 })
        // Hand off: hero starts rising as the curtain begins to lift.
        .add(() => setReady(true))
        .to(lockup.current, { y: -40, opacity: 0, scale: 0.96, duration: 0.5, ease: "power3.in" })
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: GSAP_EASE_IN_OUT }, "-=0.25");
    }, root);

    return () => {
      ctx.revert();
      release();
    };
  }, [setReady]);

  if (done) return null;

  return (
    <div
      ref={root}
      data-testid="preloader"
      aria-live="polite"
      aria-label="Loading educateU Business"
      className="fixed inset-0 z-[100] grid place-items-center bg-ink text-bone"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div ref={lockup} className="flex items-center gap-[10px]" style={{ height: 73 }}>
        {/* Mark: traced from the logo so the parts can move independently */}
        <svg
          ref={mark}
          width="72"
          height="72"
          viewBox="0 0 54 54"
          fill="none"
          aria-hidden
          className="shrink-0 overflow-visible"
        >
          <circle ref={disc} cx="27" cy="27" r="27" fill="#F2EFE6" />
          <g stroke="#1EE9B5" strokeWidth="3.1" strokeLinecap="round">
            <line ref={l1} x1="17.5" y1="19.5" x2="50" y2="11" />
            <line ref={l2} x1="13" y1="32" x2="43" y2="22" />
            <line ref={l3} x1="6" y1="46" x2="37" y2="35.5" />
          </g>
        </svg>
        {/* Wordmark: the production asset cropped to its lettering (x ≥ 62 of 243) */}
        <div ref={word} className="relative h-[73px] w-[236px] overflow-hidden" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/educateu-business-logo.png"
            alt=""
            width={243}
            height={56}
            className="absolute left-0 top-0 h-[73px] w-auto max-w-none"
            style={{ transform: "translateX(-81px)" }}
          />
        </div>
      </div>
    </div>
  );
}
