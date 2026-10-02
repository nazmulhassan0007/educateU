"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { EASE_OUT, fadeUp, lineUp, stagger } from "@/lib/motion";
import { usePageReady } from "../loader-context";

/**
 * Inner-page hero. Breadcrumb, a masked headline whose accent line is mint and
 * underlined with the homepage's hand-drawn stroke, a short intro, and an optional
 * aside (arches, live status, quick links) that gives each page its own signature.
 */
export function PageHero({
  crumb,
  title,
  accentLine,
  intro,
  aside,
  children,
}: {
  crumb: string;
  title: string[];
  /** Index of the line set in mint with the drawn underline. */
  accentLine?: number;
  intro?: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const { ready } = usePageReady();
  const state = ready ? "show" : "hidden";

  return (
    <section className="grain relative overflow-hidden bg-ink text-bone" aria-labelledby="page-title">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[360px] -top-[420px] size-[1000px] rounded-full bg-[radial-gradient(closest-side,rgba(30,233,181,0.2),rgba(30,233,181,0.06)_45%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[480px] right-[-260px] size-[1000px] rounded-full bg-[radial-gradient(closest-side,rgba(12,93,72,0.65),rgba(12,93,72,0.2)_45%,transparent_70%)]"
      />
      <div className="container-x relative z-[2] grid grid-cols-1 items-end gap-12 pb-16 pt-[136px] lg:grid-cols-12 lg:pb-24 lg:pt-[176px]">
        <motion.div
          className={aside ? "lg:col-span-7" : "lg:col-span-10"}
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          animate={state}
        >
          <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="text-sm leading-5 text-bone/60">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-bone">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-mint">
                {crumb}
              </li>
            </ol>
          </motion.nav>
          <motion.h1
            id="page-title"
            variants={stagger(0.1)}
            className="mt-6 font-title text-[clamp(2.75rem,6.6vw,6rem)] leading-[0.98] tracking-[-0.03em]"
          >
            {title.map((line, i) => (
              <span key={line} className="mask-line">
                <motion.span className={`relative ${i === accentLine ? "inline-block text-mint" : "block"}`} variants={lineUp}>
                  {line}
                  {i === accentLine && (
                    <svg
                      aria-hidden
                      className="absolute left-0 top-[0.88em] w-full"
                      width="515.766"
                      height="23.2031"
                      viewBox="0 0 515.766 23.2031"
                      fill="none"
                      preserveAspectRatio="none"
                      style={{ height: "0.22em" }}
                    >
                      <motion.path
                        d="M5.15766 15.4687C116.047 2.57812 283.671 2.57812 510.608 12.8906"
                        stroke="#1EE9B5"
                        strokeWidth="6.44619"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={ready ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                        transition={{ pathLength: { duration: 0.8, ease: EASE_OUT, delay: 0.75 }, opacity: { duration: 0.01, delay: 0.75 } }}
                      />
                    </svg>
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>
          {intro && (
            <motion.p variants={fadeUp} className="mt-8 max-w-[600px] text-[17px] leading-[1.6] text-bone/75 lg:text-[19px]">
              {intro}
            </motion.p>
          )}
          {children && <motion.div variants={fadeUp}>{children}</motion.div>}
        </motion.div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}
