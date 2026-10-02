"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Lines } from "./motion/Lines";
import { Reveal } from "./motion/Reveal";
import { Magnetic } from "./motion/Magnetic";

export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Two arches drift at different rates so the pair reads as depth, not decoration.
  const yA = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [110, -110]);

  return (
    <section
      ref={ref}
      id="contact"
      className="grain relative overflow-hidden bg-ink py-20 text-bone lg:py-32"
      aria-labelledby="cta-title"
    >
      <div className="container-x relative z-[2] grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Lines
            as="h2"
            className="max-w-[746px] font-title text-[clamp(2.75rem,6.65vw,6rem)] leading-[0.95] tracking-[-0.03em]"
            lines={["No subscriptions,", <span key="m" className="text-mint">no recurring fees.</span>]}
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-[17px] leading-[1.5] text-bone/75 lg:text-[19px]">Pay once, keep your certificate for good.</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <a href="/courses" className="press block rounded-xl bg-mint px-7 py-4 text-base font-medium leading-6 text-ink hover:bg-[#3df0c1]">
                Explore Our Courses
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/contact-us"
                className="press block rounded-xl px-7 py-4 text-base font-medium leading-6 text-bone shadow-[0_0_0_1px_rgba(255,255,255,0.25)] hover:bg-white/5 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.45)]"
              >
                Contact Us
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="flex h-[380px] items-end justify-center gap-4 sm:h-[460px] lg:col-span-5 lg:justify-end">
          <motion.figure style={{ y: yA }} className="arch relative h-[280px] w-[140px] overflow-hidden sm:h-[340px] sm:w-[170px]">
            <Image src="/images/courses/workshop.png" alt="" fill sizes="170px" className="object-cover" />
          </motion.figure>
          <motion.figure style={{ y: yB }} className="arch relative h-[360px] w-[165px] overflow-hidden sm:h-[440px] sm:w-[200px]">
            <Image src="/images/courses/manual-handling.png" alt="" fill sizes="200px" className="object-cover" />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
