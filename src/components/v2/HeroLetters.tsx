"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** True from the lg breakpoint up; the scroll-zoom only runs there. */
function useDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return desktop;
}
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { heroShowcase, PRICE } from "@/lib/data";
import { usePageReady } from "../loader-context";
import { Arrow, Check, EASE, Glows } from "./Glows";

const HERO_VIDEO = "/aw/hero.mp4";
const HERO_POSTER = "/aw/hero-poster.jpg";

const SUBTITLE =
  "educateU Business delivers accredited online courses and certification for businesses, teams, and individuals across the UK and beyond. Every course is one-off priced with your certificate included, so you know the full cost before you start.";

const FACTS = [`From £${PRICE} per course`, "CPD certificate included", "One-Off Pricing", "18 courses"];

/** Glass pill with an ink check dot (DL/Fact Chip). */
function FactChip({ label }: { label: string }) {
  return (
    <li className="glass-light flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm leading-5 text-ink/85">
      <span className="grid size-4 place-items-center rounded-full bg-ink text-mint">
        <Check size={9} />
      </span>
      {label}
    </li>
  );
}

/** Course card (WallCard) that quietly steps through the showcase courses. */
function CourseCard({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!ready || reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % heroShowcase.length), 4800);
    return () => clearInterval(t);
  }, [ready, reduce]);
  const c = heroShowcase[i];

  return (
    <a
      href={`#course-${c.slug}`}
      className="glass-light group block w-full max-w-[420px] overflow-hidden rounded-[22px] p-2 transition-transform duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1"
      aria-label={`${c.title}, £${c.price}, ${c.hours} hours, CPD certificate`}
    >
      <div className="relative aspect-[404/252] overflow-hidden rounded-2xl bg-ink/10">
        <AnimatePresence initial={false}>
          <motion.div
            key={c.slug}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <Image src={c.image} alt="" fill sizes="(min-width:1024px) 404px, 100vw" className="object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-out)] group-hover:scale-105" priority={i === 0} />
          </motion.div>
        </AnimatePresence>
        <span className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 text-sm font-medium leading-5 text-ink">£{c.price}</span>
      </div>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={c.slug}
          className="flex flex-col gap-1 px-2.5 pb-2.5 pt-3.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <p className="m-0 text-xs leading-4 text-green">{c.subject}</p>
          <p className="m-0 line-clamp-1 text-lg font-medium leading-7 text-ink">{c.title}</p>
          <p className="m-0 text-sm leading-5 text-ink/62">
            {c.hours} hours · CPD certificate
          </p>
        </motion.div>
      </AnimatePresence>
    </a>
  );
}

/**
 * Hero · v2 (Figma 42:2120). The film plays through the letters of "made simple"
 * knocked out of bone paper; the headline sits above, "for everyone." hangs off the
 * right, and the offer row (copy, actions, facts, course card) sits beneath.
 * On scroll the letters scale up until the film fills the frame.
 */
export function HeroLetters() {
  const { ready } = usePageReady();
  const desktop = useDesktop();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.85, 1], [1, 9, 9]);
  const maskFade = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [1, 1, 0, 0]);
  const copyFade = useTransform(scrollYProgress, [0, 0.25, 1], [1, 0, 0]);

  const rise = (d: number) => ({
    initial: { opacity: 0, y: 28, filter: "blur(6px)" },
    animate: ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 1, delay: d, ease: EASE },
  });

  return (
    <section ref={ref} className="relative bg-bone text-ink lg:h-[155vh] motion-reduce:lg:h-auto" aria-labelledby="hero-title">
      <div className="relative overflow-hidden lg:sticky lg:top-0 lg:h-[100dvh] lg:min-h-[720px]">
        <video src={HERO_VIDEO} poster={HERO_POSTER} autoPlay muted loop playsInline aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 hidden bg-bone/70 motion-reduce:block" />

        {/* Bone paper with "made simple" knocked out: screen blend keeps the film inside the black letters only. */}
        <motion.div
          aria-hidden
          style={desktop ? { scale, opacity: maskFade } : undefined}
          className="absolute inset-0 origin-[50%_38%] bg-bone mix-blend-screen motion-reduce:hidden"
        >
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col px-5 pt-[calc(72px+10vh)] md:px-10 lg:pt-[176px]">
            {/* Spacer matches the headline row above the letters */}
            <div className="h-[calc(2*clamp(28px,4.2vw,60px))] md:h-[clamp(40px,4.2vw,60px)]" />
            <span style={{ whiteSpace: "nowrap" }} className="mt-2 block font-title text-[17vw] leading-[0.86] tracking-[-0.06em] text-black md:text-[clamp(72px,15.6vw,300px)]">
              made simple
            </span>
          </div>
        </motion.div>

        {/* Soft mint light in two corners */}
        <motion.div aria-hidden style={desktop ? { opacity: maskFade } : undefined} className="pointer-events-none absolute inset-0 motion-reduce:hidden">
          <Glows
            spots={[
              { at: "left:-16% top:-33%", size: "47vw", color: "rgb(30 233 181 / 0.32)" },
              { at: "right:-12% bottom:-30%", size: "47vw", color: "rgb(120 245 205 / 0.36)" },
            ]}
          />
        </motion.div>

        {/* Type and offer row */}
        <motion.div
          style={desktop ? { opacity: copyFade } : undefined}
          className="relative mx-auto flex h-full min-h-[100dvh] w-full max-w-[1440px] flex-col px-5 pb-10 pt-[calc(72px+10vh)] md:px-10 lg:min-h-0 lg:pb-[72px] lg:pt-[176px] motion-reduce:!opacity-100"
        >
          <motion.h1 id="hero-title" className="m-0 font-title text-[clamp(28px,4.2vw,60px)] leading-[1] tracking-[-0.03em]" {...rise(0.05)}>
            <span className="block">Online courses and certification</span>
            {/* The knocked-out words are visual only; this copy keeps the sentence whole for assistive tech. */}
            <span className="sr-only">made simple for everyone.</span>
          </motion.h1>

          {/* Height reserved for the letters painted by the paper plate */}
          <div aria-hidden className="mt-2 h-[17vw] md:h-[clamp(72px,15.6vw,300px)]" />

          <motion.p
            aria-hidden
            className="m-0 mt-3 self-end font-title text-[clamp(28px,4.2vw,60px)] leading-[1] tracking-[-0.03em] text-green"
            {...rise(0.2)}
          >
            for everyone.
          </motion.p>

          <div className="mt-auto flex flex-col gap-10 pt-10 lg:mt-[clamp(24px,5vh,30px)] lg:flex-row lg:items-end lg:gap-24 lg:pt-0">
            <motion.div className="flex min-w-0 flex-1 flex-col items-start gap-7" {...rise(0.3)}>
              <p className="m-0 max-w-[640px] text-[17px] leading-[1.45] text-ink/72 md:text-xl md:leading-7">{SUBTITLE}</p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#courses"
                  className="group flex items-center gap-3 whitespace-nowrap rounded-full bg-ink py-2 pl-6 pr-2 text-base font-medium leading-6 text-white transition-transform active:scale-[0.98]"
                >
                  Explore Our Courses
                  <span className="grid size-10 place-items-center rounded-full bg-mint text-ink transition-transform group-hover:translate-x-0.5">
                    <Arrow />
                  </span>
                </a>
                <a
                  href="#team"
                  className="glass-light flex items-center whitespace-nowrap rounded-full px-6 py-4 text-base font-medium leading-6 text-ink transition-transform active:scale-[0.98]"
                >
                  Enrol your team
                </a>
              </div>
              <ul className="-mx-5 m-0 flex list-none gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
                {FACTS.map((f) => (
                  <FactChip key={f} label={f} />
                ))}
              </ul>
            </motion.div>

            <motion.div className="w-full shrink-0 lg:w-[420px]" {...rise(0.45)}>
              <CourseCard ready={ready} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
