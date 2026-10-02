"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion } from "motion/react";
import { heroShowcase } from "@/lib/data";
import { EASE_OUT } from "@/lib/motion";
import { AddToCartButton } from "./AddToCartButton";

const INTERVAL = 4800;

const figureIn = {
  hidden: { clipPath: "inset(100% 0 0 0 round 999px 999px 28px 28px)", y: 24 },
  show: (i: number) => ({
    clipPath: "inset(0% 0 0 0 round 999px 999px 28px 28px)",
    y: 0,
    transition: { duration: 1.1, ease: EASE_OUT, delay: 0.45 + i * 0.12 },
  }),
};

// Positions traced from the design (stage is 583 × 600, shifted +64 so the card can overhang).
const slots = [
  { cls: "left-[64px] top-[230px] h-[330px] w-[150px]", sizes: "150px", depth: 0.5 },
  { cls: "left-[230px] top-[80px] h-[520px] w-[210px]", sizes: "210px", depth: 1 },
  { cls: "left-[454.67px] top-[234px] h-[270px] w-[128px]", sizes: "128px", depth: 0.7 },
];

const wrap = (n: number) => (n + heroShowcase.length) % heroShowcase.length;

/** Photo that crossfades to a new course without ever showing an empty frame. */
function Slide({ src, alt, sizes, priority }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={src}
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE_OUT } }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
      </motion.div>
    </AnimatePresence>
  );
}

export function HeroShowcase({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsed = useRef(0);

  const go = useCallback(
    (i: number) => {
      setIndex(wrap(i));
      elapsed.current = 0;
      progress.set(0);
    },
    [progress],
  );

  // One clock drives both the auto-advance and the progress rule, so pausing keeps them in step.
  useEffect(() => {
    if (!ready || reduce) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!paused && !document.hidden) {
        elapsed.current += dt;
        if (elapsed.current >= INTERVAL) {
          elapsed.current = 0;
          setIndex((i) => wrap(i + 1));
        }
        progress.set(elapsed.current / INTERVAL);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, reduce, paused, progress]);

  const current = heroShowcase[index];
  const prev = heroShowcase[wrap(index - 1)];
  const next = heroShowcase[wrap(index + 1)];
  const state = ready ? "show" : "hidden";
  const figures = [prev, current, next];

  return (
    <div
      className="absolute inset-0"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured courses"
    >
      {slots.map((slot, i) => (
        <div key={slot.cls} data-depth={slot.depth} className={`absolute ${slot.cls}`}>
          <motion.figure
            custom={i}
            variants={figureIn}
            initial="hidden"
            animate={state}
            className="arch absolute inset-0 overflow-hidden bg-forest shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
          >
            <div data-float className="absolute -inset-3">
              <Slide
                src={figures[i].image}
                alt={i === 1 ? `${figures[i].title} course` : ""}
                sizes={slot.sizes}
                priority={i === 1}
              />
            </div>
            {/* Side arches read as "up next" and "just shown"; dim them a little */}
            {i !== 1 && <div aria-hidden className="absolute inset-0 bg-ink/35" />}
          </motion.figure>
        </div>
      ))}

      <div data-depth="1.3" className="absolute left-0 top-[273px] w-[300px]">
        <motion.article
          layout
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.96 }}
          transition={{ type: "spring", duration: 0.9, bounce: 0.25, delay: 1.05, layout: { duration: 0.4, ease: EASE_OUT } }}
          className="relative overflow-hidden rounded-2xl bg-bone p-4 text-ink shadow-[0_40px_40px_rgba(0,0,0,0.7)]"
          aria-live="polite"
          aria-label={`Featured course ${index + 1} of ${heroShowcase.length}: ${current.title}`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-[6px] bg-ink px-2 py-1 text-xs leading-4 text-mint">{current.subject}</span>
                <span className="font-mono text-xs uppercase leading-4 text-ink/70">{current.hours} hours</span>
              </div>
              <h2 className="mt-3 font-title text-[22px] leading-[27.5px] tracking-[-0.03em]">{current.title}</h2>
              <p className="mt-1 text-[13px] leading-[19.5px] text-ink/70">
                {current.modules} modules · CPD certificate included
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-title text-[28px] leading-[42px] tracking-[-0.03em]">£{current.price}</span>
                <AddToCartButton
                  id={current.slug}
                  title={current.title}
                  price={current.price}
                  className="px-4 py-2.5 text-sm leading-[21px]"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Time until the next course */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-ink/10">
            <motion.div className="h-full origin-left bg-mint" style={{ scaleX: progress }} />
          </div>
        </motion.article>

        {/* Course picker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-3 flex items-center gap-1.5 pl-1"
          role="tablist"
          aria-label="Choose a featured course"
        >
          {heroShowcase.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={c.title}
              onClick={() => go(i)}
              className="group grid h-6 place-items-center px-0.5"
            >
              <motion.span
                animate={{ width: i === index ? 22 : 6, backgroundColor: i === index ? "#1ee9b5" : "rgba(242,239,230,0.35)" }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="block h-1.5 rounded-full group-hover:bg-bone/70"
              />
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
