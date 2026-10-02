"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { steps } from "@/lib/data";
import { EASE_OUT, viewport } from "@/lib/motion";
import { Item, RevealGroup } from "./motion/Reveal";
import { ScaledStage } from "./motion/ScaledStage";
import { SplitHeading } from "./motion/SplitHeading";

function Certificate() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Spring-interpolated so the tilt has weight rather than snapping to the cursor.
  const sx = useSpring(mx, { stiffness: 120, damping: 16, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 16, mass: 0.6 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType === "touch") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="relative" style={{ perspective: 1400 }}>
      <motion.div
        initial={{ opacity: 0, y: 48, rotate: -8 }}
        whileInView={{ opacity: 1, y: 0, rotate: -3 }}
        viewport={viewport}
        transition={{ duration: 1.1, ease: EASE_OUT }}
        className="relative"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative h-[497px] w-[640px] rounded-[10px] bg-cert text-ink shadow-[0_60px_60px_rgba(0,0,0,0.8)]"
        >
          <div aria-hidden className="absolute inset-3 rounded-[6px] border border-ink/15" />

          <div className="absolute left-12 top-12 flex w-[544px] items-start justify-between">
            <p className="flex items-center gap-2 font-title text-2xl leading-6 tracking-[-0.03em]">
              <span>
                educate<span className="text-green">U</span>
              </span>
              <span className="rounded-[4px] bg-ink px-1.5 py-1 font-sans text-xs font-medium leading-3 text-bone">BUSINESS</span>
            </p>
            <p className="font-mono text-[11px] leading-[16.5px] text-ink/60">SAMPLE CERTIFICATE</p>
          </div>

          <p className="absolute left-12 top-[120px] font-mono text-xs leading-[18px] tracking-[0.12em] text-green">
            CERTIFICATE OF COMPLETION
          </p>
          <p className="absolute left-12 top-[154px] text-[15px] leading-[22.5px] text-ink/70">This is to certify that</p>
          <p className="absolute left-12 top-[185px] font-title text-[44px] leading-[44px] tracking-[-0.03em]">Your Name Here</p>
          <p className="absolute left-12 top-[252px] text-[15px] leading-[22.5px] text-ink/70">
            has successfully completed the CPD-certified course
          </p>
          <p className="absolute left-12 top-[283px] font-title text-3xl leading-[37.5px] tracking-[-0.03em]">Fire Safety Awareness</p>

          <div className="absolute left-12 top-[369px] flex w-[544px] items-end justify-between">
            <div>
              <p className="font-mono text-[11px] leading-[16.5px] text-ink/60">CERTIFICATE NO.</p>
              <p className="font-mono text-sm leading-[21px]">EU-XXXX-XXXX</p>
            </div>
            <Image src="/images/cpd-certified.png" alt="CPD Certified" width={80} height={80} className="size-20 object-contain" />
          </div>
        </motion.div>
      </motion.div>

      {/* Price badge: lands slightly after the certificate with a little bounce */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 8 }}
        viewport={viewport}
        transition={{ type: "spring", duration: 0.9, bounce: 0.4, delay: 0.5 }}
        className="absolute -right-[58px] top-[150px] grid size-36 place-items-center rounded-full bg-mint text-ink shadow-[0_20px_20px_rgba(0,0,0,0.6)]"
      >
        <div className="text-center">
          <p className="font-title text-[32px] leading-10 tracking-[-0.03em]">£15</p>
          <p className="mx-auto w-[112px] text-xs font-medium leading-[15px]">certificate included</p>
        </div>
      </motion.div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="certificate" className="grain relative overflow-hidden bg-ink py-20 text-bone lg:py-32" aria-labelledby="how-title">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[calc(61%-280px)] -top-[200px] size-[1260px] rounded-full bg-[radial-gradient(closest-side,rgba(12,93,72,0.6),rgba(12,93,72,0.2)_45%,transparent_70%)]"
      />
      <div className="container-x relative z-[2] grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SplitHeading id="how-title" className="max-w-[510px] font-title text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em]">
            From enrol to certificate.
          </SplitHeading>

          <RevealGroup gap={0.12} delay={0.15} className="mt-12 pl-3">
            <ol className="relative border-l border-white/15">
              {/* The line fills as the list reveals, so the sequence reads top-to-bottom */}
              <motion.span
                aria-hidden
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={viewport}
                transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.3 }}
                className="absolute -left-px top-0 h-full w-px origin-top bg-mint/60"
              />
              {steps.map((step, i) => (
                <Item key={step.title} className={`relative pl-10 ${i > 0 ? "pt-10" : ""}`}>
                  <span
                    className={`absolute -left-[13px] grid size-6 place-items-center rounded-full font-mono text-xs leading-[18px] text-ink ${
                      i === 0 ? "bg-mint" : "bg-bone"
                    } ${i > 0 ? "top-10" : "top-0"}`}
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-title text-[26px] leading-[39px] tracking-[-0.03em]">{step.title}</h3>
                  <p className="mt-2 max-w-[437px] text-base leading-6 text-bone/70">{step.body}</p>
                </Item>
              ))}
            </ol>
          </RevealGroup>
        </div>

        <div className="lg:col-span-7">
          <ScaledStage width={740} height={560} className="mx-auto w-full max-w-[740px]">
            <div className="absolute left-[50px] top-[30px]">
              <Certificate />
            </div>
          </ScaledStage>
        </div>
      </div>
    </section>
  );
}
