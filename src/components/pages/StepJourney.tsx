"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Icon, type IconName } from "../site/Icon";

export type Step = { icon: IconName; title: string; body: string };

/**
 * "How it works" as one journey. On wide screens the section pins and the six
 * steps travel sideways under the scroll while a mint line draws across them and
 * each step lights up as the line reaches it (GSAP ScrollTrigger, scrubbed).
 * On phones the same journey runs down a vertical rail. Reduced motion: a static list.
 */
export function StepJourney({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setActive(steps.length - 1);
        return;
      }
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - el.parentElement!.clientWidth);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.6}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999))),
          },
        });
        tl.to(el, { x: () => -distance(), ease: "none" }, 0).fromTo(
          "[data-rail-h]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none" },
          0,
        );
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          "[data-rail-v]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: track.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.4,
              onUpdate: (self) => setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999))),
            },
          },
        );
      });

      // Fonts and images settle after first layout; re-measure once they do.
      const t = setTimeout(() => ScrollTrigger.refresh(), 600);
      return () => {
        clearTimeout(t);
        mm.revert();
      };
    },
    { scope: root, dependencies: [steps.length] },
  );

  return (
    <div ref={root} className="relative overflow-hidden lg:flex lg:h-[100dvh] lg:flex-col lg:justify-center">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <h2 id="how-title" className="font-title text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1] tracking-[-0.03em] text-ink">
            From checkout to certificate.
          </h2>
          <p className="hidden shrink-0 font-title text-[clamp(2rem,3.4vw,3.25rem)] leading-none tracking-[-0.04em] text-ink/25 tabular-nums lg:block" aria-hidden>
            <span className="text-green">{String(active + 1).padStart(2, "0")}</span> / {String(steps.length).padStart(2, "0")}
          </p>
        </div>
        <p className="mt-4 max-w-[520px] text-[17px] leading-[1.55] text-ink/70">Six steps, on your schedule. Nothing to book, nothing to wait for.</p>
      </div>

      <div className="container-x relative mt-12 lg:mt-16">
        {/* Horizontal rail (desktop) */}
        <div aria-hidden className="absolute left-[calc(var(--gutter,24px)+28px)] right-[var(--gutter,24px)] top-[27px] hidden h-px bg-ink/12 lg:block">
          <div data-rail-h className="h-full w-full origin-left bg-mint" />
        </div>
        {/* Vertical rail (phones, tablets) */}
        <div aria-hidden className="absolute bottom-6 left-[calc(var(--gutter,24px)+27px)] top-6 w-px bg-ink/12 lg:hidden">
          <div data-rail-v className="h-full w-full origin-top bg-mint" />
        </div>

        <ol ref={track} className="relative m-0 flex list-none flex-col gap-10 p-0 lg:w-max lg:flex-row lg:gap-8">
          {steps.map((s, i) => {
            const lit = i <= active;
            return (
              <li key={s.title} className="relative flex gap-6 lg:w-[360px] lg:flex-col lg:gap-0">
                <motion.span
                  animate={{
                    backgroundColor: lit ? "#06180b" : "#f7f6f1",
                    color: lit ? "#1ee9b5" : "rgba(6,24,11,0.45)",
                    scale: i === active ? 1.08 : 1,
                  }}
                  transition={{ type: "spring", duration: 0.45, bounce: 0.3 }}
                  className="relative z-[1] grid size-14 shrink-0 place-items-center rounded-2xl shadow-[0_0_0_1px_rgba(6,24,11,0.12)]"
                >
                  <Icon name={s.icon} />
                </motion.span>
                <div className="lg:mt-8">
                  <p className={`font-mono text-xs leading-4 transition-colors duration-300 ${lit ? "text-green" : "text-ink/40"}`}>STEP {i + 1}</p>
                  <h3 className={`mt-2 font-title text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.1] tracking-[-0.03em] transition-colors duration-300 ${lit ? "text-ink" : "text-ink/45"}`}>
                    {s.title}
                  </h3>
                  <p className={`mt-3 max-w-[320px] text-[15px] leading-[1.6] transition-colors duration-300 ${lit ? "text-ink/70" : "text-ink/40"}`}>{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
