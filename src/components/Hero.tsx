"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "motion/react";
import { trustedBy } from "@/lib/data";
import { EASE_OUT, fadeUp, lineUp, stagger } from "@/lib/motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { HeroShowcase } from "./HeroShowcase";
import { ScaledStage } from "./motion/ScaledStage";
import { Magnetic } from "./motion/Magnetic";
import { usePageReady } from "./loader-context";

const heroStagger = stagger(0.09, 0.15);

export function Hero() {
  const { ready } = usePageReady();
  const section = useRef<HTMLElement>(null);
  const state = ready ? "show" : "hidden";

  // After the entrance: a slow drift on each figure, and scroll parallax at three depths.
  useGSAP(
    () => {
      if (!ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? 10 : -10,
          duration: 3.2 + i * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.8,
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) => {
        const depth = Number(el.dataset.depth ?? 1);
        gsap.to(el, {
          yPercent: -18 * depth,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      gsap.to("[data-hero-copy]", {
        yPercent: 12,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: section, dependencies: [ready] },
  );

  return (
    <section ref={section} className="grain relative overflow-hidden bg-ink text-bone" aria-labelledby="hero-title">
      {/* Painted as radial gradients rather than filter blurs: identical look, no per-frame raster cost */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[400px] -top-[400px] size-[1120px] rounded-full bg-[radial-gradient(closest-side,rgba(30,233,181,0.22),rgba(30,233,181,0.08)_45%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[calc(61%-240px)] top-[211px] size-[1040px] rounded-full bg-[radial-gradient(closest-side,rgba(12,93,72,0.7),rgba(12,93,72,0.25)_45%,transparent_70%)]"
      />

      <div className="container-x relative z-[2] grid grid-cols-1 gap-12 pb-16 pt-[128px] lg:grid-cols-12 lg:pt-[160px]">
        {/* Copy */}
        <motion.div
          data-hero-copy
          className="flex flex-col items-start self-end pb-6 lg:col-span-7"
          variants={heroStagger}
          initial="hidden"
          animate={state}
        >
          <h1
            id="hero-title"
            className="font-title text-[clamp(2.75rem,6.4vw,5.75rem)] leading-[0.98] tracking-[-0.03em]"
          >
            <span className="mask-line">
              <motion.span className="block" variants={lineUp}>
                Online courses
              </motion.span>
            </span>
            <span className="mask-line">
              <motion.span className="block" variants={lineUp}>
                and certification
              </motion.span>
            </span>
            <span className="mask-line">
              <motion.span className="relative inline-block text-mint" variants={lineUp}>
                made simple
                {/* Hand-drawn underline from the design, drawn in after the word lands */}
                <svg
                  aria-hidden
                  className="absolute left-0 top-[0.86em] w-full"
                  width="515.766"
                  height="23.2031"
                  viewBox="0 0 515.766 23.2031"
                  fill="none"
                  preserveAspectRatio="none"
                  style={{ height: "0.25em" }}
                >
                  <motion.path
                    d="M5.15766 15.4687C116.047 2.57812 283.671 2.57812 510.608 12.8906"
                    stroke="#1EE9B5"
                    strokeWidth="6.44619"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={ready ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{
                      pathLength: { duration: 0.8, ease: EASE_OUT, delay: 0.85 },
                      opacity: { duration: 0.01, delay: 0.85 },
                    }}
                  />
                </svg>
              </motion.span>
            </span>
            <span className="mask-line">
              <motion.span className="block pl-[0.18em]" variants={lineUp}>
                for everyone.
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-[726px] text-[17px] leading-[1.6] text-bone/75 lg:text-[19px] lg:leading-[30.875px]"
          >
            educateU Business delivers accredited online courses and certification for businesses, teams,
            and individuals across the UK and beyond. Every course is one-off priced with your certificate
            included.
          </motion.p>

          <motion.form
            variants={fadeUp}
            className="mt-10 w-full max-w-[620px]"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="course-search" className="block text-sm font-medium leading-5 text-bone/85">
              Find a course
            </label>
            <div className="mt-3 flex items-center gap-3 rounded-2xl bg-bone py-2 pl-5 pr-2 shadow-[0_30px_30px_rgba(0,0,0,0.6)] transition-shadow duration-300 focus-within:shadow-[0_30px_30px_rgba(0,0,0,0.6),0_0_0_2px_var(--mint)]">
              <Image src="/icons/search.svg" alt="" width={20} height={20} className="shrink-0" />
              <input
                id="course-search"
                type="search"
                placeholder="Fire safety, GDPR, first aid…"
                className="h-[49.5px] min-w-0 flex-1 bg-transparent text-[17px] text-ink placeholder:text-ink/60 focus:outline-none"
              />
              <Magnetic strength={0.2}>
                <button
                  type="submit"
                  className="press rounded-xl bg-mint px-6 py-3.5 text-base font-medium leading-6 text-ink hover:bg-[#3df0c1]"
                >
                  Search
                </button>
              </Magnetic>
            </div>
            <p className="mt-4 text-sm leading-[21px] text-bone/65">
              Popular:{" "}
              <a href="#courses" className="underline decoration-from-font underline-offset-2 hover:text-bone">
                Fire Safety Awareness
              </a>{" "}
              ·{" "}
              <a href="#courses" className="underline decoration-from-font underline-offset-2 hover:text-bone">
                GDPR
              </a>{" "}
              ·{" "}
              <a href="#courses" className="underline decoration-from-font underline-offset-2 hover:text-bone">
                Emergency First Aid at Work
              </a>
            </p>
          </motion.form>
        </motion.div>

        {/* Featured courses composition */}
        <div className="self-end lg:col-span-5">
          <ScaledStage
            width={583}
            height={600}
            className="mx-auto w-full max-w-[583px] lg:-ml-16 lg:w-[calc(100%+64px)] lg:max-w-none"
          >
            <HeroShowcase ready={ready} />
          </ScaledStage>
        </div>
      </div>

      {/* Trusted by */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="relative z-[2] border-t border-white/10"
      >
        <div className="container-x flex items-center gap-10 py-8">
          <p className="w-[112px] shrink-0 text-sm leading-[21px] text-bone/60">Trusted by</p>
          <div
            className="marquee relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            aria-label="Institutions that trust educateU"
          >
            <div className="marquee-track flex w-max items-center gap-24">
              {[0, 1].map((copy) =>
                trustedBy.map((logo) => (
                  <Image
                    key={`${copy}-${logo.name}`}
                    src={logo.src}
                    alt={copy === 0 ? logo.name : ""}
                    aria-hidden={copy === 1}
                    width={logo.w}
                    height={logo.h}
                    style={{ width: logo.w, height: logo.h }}
                    className="shrink-0 object-cover opacity-70 transition-opacity duration-300 hover:opacity-100"
                  />
                )),
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
