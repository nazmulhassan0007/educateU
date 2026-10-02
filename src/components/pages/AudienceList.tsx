"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

export type Audience = { title: string; body: string; image: string };

/**
 * "Who educateU is for" as a typographic index. Hovering a row lifts it and an
 * arch-framed photo follows the cursor on a spring (Motion), crossfading between
 * rows. Touch screens get the photo inline instead.
 */
export function AudienceList({ items }: { items: Audience[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 160, damping: 20, mass: 0.6 });

  function move(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  return (
    <div ref={ref} className="relative" onPointerMove={move} onPointerLeave={() => setHover(null)}>
      <ul className="m-0 list-none border-b border-ink/12 p-0">
        {items.map((a, i) => (
          <li
            key={a.title}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i)}
            className="group relative grid grid-cols-1 gap-4 border-t border-ink/12 py-7 md:grid-cols-12 md:items-center md:gap-6 lg:py-9"
          >
            <h3
              className={`font-title text-[clamp(2rem,4.6vw,4.25rem)] leading-[1] tracking-[-0.035em] transition-[color,transform] duration-500 [transition-timing-function:var(--ease-out)] md:col-span-7 ${
                hover === i ? "translate-x-2 text-green" : "text-ink"
              }`}
            >
              {a.title}
            </h3>
            <p className="max-w-[440px] text-[16px] leading-[1.55] text-ink/70 md:col-span-5">{a.body}</p>
            {/* Inline photo for touch and small screens */}
            <div className="arch relative h-48 w-32 overflow-hidden md:hidden">
              <Image src={a.image} alt="" fill sizes="128px" className="object-cover" />
            </div>
          </li>
        ))}
      </ul>

      {/* Cursor-following arch (fine pointers, motion allowed) */}
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
        >
          <AnimatePresence>
            {hover !== null && (
              <motion.div
                key="frame"
                initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
                className="arch relative -ml-[90px] -mt-[150px] h-[260px] w-[180px] overflow-hidden shadow-[0_30px_50px_-20px_rgba(6,24,11,0.5)]"
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={items[hover].image}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  >
                    <Image src={items[hover].image} alt="" fill sizes="180px" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
