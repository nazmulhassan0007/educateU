"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { lineUp, stagger, fadeUp } from "@/lib/motion";
import { usePageReady } from "../loader-context";

/**
 * Inner-page hero: breadcrumb, a large masked headline and a short intro on ink.
 * Shares the homepage's ambient mint light and grain so every page reads as one site.
 */
export function PageHero({
  crumb,
  title,
  intro,
  children,
}: {
  crumb: string;
  title: string[];
  intro?: string;
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
      <motion.div
        className="container-x relative z-[2] pb-16 pt-[136px] lg:pb-24 lg:pt-[184px]"
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
          className="mt-6 max-w-[16ch] font-title text-[clamp(2.75rem,6.6vw,6rem)] leading-[0.95] tracking-[-0.03em]"
        >
          {title.map((line) => (
            <span key={line} className="mask-line">
              <motion.span className="block" variants={lineUp}>
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>
        {intro && (
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-[640px] text-[17px] leading-[1.6] text-bone/75 lg:text-[19px]"
          >
            {intro}
          </motion.p>
        )}
        {children && <motion.div variants={fadeUp}>{children}</motion.div>}
      </motion.div>
    </section>
  );
}
