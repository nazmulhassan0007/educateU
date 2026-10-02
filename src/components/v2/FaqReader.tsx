"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faqs } from "@/lib/data";
import { EASE, Glows } from "./Glows";

const CONTENT = {
  title: "Frequently asked questions",
  description: "Quick answers about our online CPD courses and how they work for businesses.",
};

/** Heavy fade-up with a blur, used for section headings. */
function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * FAQ as an index and a reader: numbered questions on the left, the chosen
 * answer set large on the right. On phones the answer opens under its question.
 */
export function FaqReader() {
  const [open, setOpen] = useState(0);
  const current = faqs[open];

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-paper px-5 pb-28 pt-24 md:px-10 md:pb-36 md:pt-32"
      aria-labelledby="faq-title"
    >
      <Glows
        spots={[
          { at: "right:-5% top:20%", size: "42vw", color: "rgb(30 233 181 / 0.35)" },
          { at: "left:30% bottom:-15%", size: "35vw", color: "rgb(120 245 205 / 0.35)" },
        ]}
      />
      <div className="relative mx-auto max-w-[1440px]">
        <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h2 id="faq-title" className="m-0 font-title text-[clamp(40px,6vw,104px)] leading-[0.92] tracking-[-0.045em] text-ink">
            {CONTENT.title}
          </h2>
          <p className="m-0 max-w-[44ch] text-lg leading-relaxed text-ink/65 lg:justify-self-end">{CONTENT.description}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ol className="m-0 list-none p-0" role="tablist" aria-label="Questions">
            {faqs.map((f, i) => {
              const on = i === open;
              return (
                <motion.li
                  key={f.q}
                  className="relative border-t border-ink/12 last:border-b"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.7, delay: Math.min(i, 8) * 0.07, ease: EASE }}
                >
                  {/* The open question is marked by a mint bar on the rule above it. */}
                  {on && (
                    <motion.span
                      layoutId="faq-bar"
                      className="absolute -top-px left-0 h-[2px] w-full bg-mint"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-expanded={on}
                    onClick={() => setOpen(i)}
                    className="group grid w-full grid-cols-[48px_1fr_20px] items-baseline gap-3 py-6 text-left"
                  >
                    <span className={`text-[14px] tabular-nums transition-colors ${on ? "text-green" : "text-ink/35"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[17px] leading-snug transition-colors duration-300 md:text-[19px] ${
                        on ? "font-medium text-ink" : "text-ink/55 group-hover:text-ink"
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={`justify-self-end transition-[transform,color] duration-500 ${
                        on ? "translate-x-0 text-green" : "-translate-x-1 text-ink/25 group-hover:translate-x-0"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  {/* Phones: the answer opens in place. */}
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p
                        className="m-0 overflow-hidden pb-6 pl-[60px] pr-3 text-[16px] leading-relaxed text-ink/70 lg:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        {f.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ol>

          {/* Large screens: the reader. */}
          <div className="hidden lg:block">
            <div className="glass-light sticky top-32 rounded-[32px] p-10 xl:p-12">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <span className="font-title text-[64px] leading-none tracking-[-0.05em] text-mint">
                    {String(open + 1).padStart(2, "0")}
                  </span>
                  <h3 className="m-0 mt-6 font-title text-[clamp(26px,2.2vw,36px)] leading-[1.1] tracking-[-0.025em] text-ink">
                    {current.q}
                  </h3>
                  <p className="m-0 mt-6 text-[18px] leading-relaxed text-ink/70">{current.a}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-10 flex gap-2">
                {[
                  { label: "Previous question", d: "M13 7H1M6 2 1 7l5 5", to: (open - 1 + faqs.length) % faqs.length },
                  { label: "Next question", d: "M1 7h12M8 2l5 5-5 5", to: (open + 1) % faqs.length },
                ].map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    aria-label={b.label}
                    onClick={() => setOpen(b.to)}
                    className="glass-light grid size-12 place-items-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d={b.d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
