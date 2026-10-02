"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { PRICE, teamCourseOptions } from "@/lib/data";
import { EASE_OUT } from "@/lib/motion";
import { AddToCartButton } from "./AddToCartButton";
import { Reveal } from "./motion/Reveal";

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

function AnimatedTotal({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 140, damping: 24, mass: 0.8 });
  const text = useTransform(spring, (v) => gbp.format(Math.round(v)));
  useEffect(() => {
    mv.set(value);
  }, [value, mv]);
  return <motion.span className="tabular-nums">{text}</motion.span>;
}

export function TeamCalculator() {
  const [selected, setSelected] = useState<string[]>(teamCourseOptions.slice(0, 3));
  const [learners, setLearners] = useState(25);
  const [expanded, setExpanded] = useState(false);

  const total = selected.length * learners * PRICE;
  const plan = learners >= 20 ? "Enterprise plan" : learners > 1 ? "Team order" : "Individual";
  const visible = expanded ? teamCourseOptions : teamCourseOptions.slice(0, 4);
  const fill = useMemo(() => `${((learners - 1) / 99) * 100}%`, [learners]);

  function toggle(course: string) {
    setSelected((prev) => {
      if (prev.includes(course)) return prev.length === 1 ? prev : prev.filter((c) => c !== course);
      return [...prev, course];
    });
  }

  return (
    <section id="team" className="bg-forest py-20 text-bone lg:py-32" aria-labelledby="team-title">
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 id="team-title" className="max-w-[510px] font-title text-[clamp(2.5rem,4.5vw,4rem)] leading-[1] tracking-[-0.03em]">
              Training a team? Do the maths here.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[510px] text-[17px] leading-[1.5] text-bone/75 lg:text-lg">
              educateU courses are open to individual learners and UK businesses alike. Use company purchase to
              enrol your whole team at once.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <div className="rounded-[28px] bg-ink/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] sm:p-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="text-[13px] leading-[19.5px] text-bone/60">Courses</p>
                <p className="mt-2 font-title text-5xl leading-[48px] tracking-[-0.03em]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={selected.length}
                      initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -14, opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                      className="inline-block tabular-nums"
                    >
                      {selected.length}
                    </motion.span>
                  </AnimatePresence>
                </p>
                <p className="mt-2 text-sm leading-[21px] text-bone/70">{selected.join(", ")}</p>

                <LayoutGroup>
                  <motion.div layout className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Choose courses">
                    {visible.map((course) => {
                      const on = selected.includes(course);
                      return (
                        <motion.button
                          layout
                          key={course}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(course)}
                          whileTap={{ scale: 0.96 }}
                          transition={{ layout: { duration: 0.3, ease: EASE_OUT } }}
                          className={`rounded-lg px-2.5 py-1.5 text-xs leading-4 transition-colors duration-200 ${
                            on
                              ? "bg-mint text-ink"
                              : "bg-white/10 text-bone/80 hover:bg-white/15"
                          }`}
                        >
                          {course}
                        </motion.button>
                      );
                    })}
                    <motion.button
                      layout
                      type="button"
                      onClick={() => setExpanded((e) => !e)}
                      className="rounded-lg px-2.5 py-1.5 text-xs leading-4 text-mint underline decoration-from-font underline-offset-2 hover:text-bone"
                    >
                      {expanded ? "Show fewer" : `Show all ${teamCourseOptions.length}`}
                    </motion.button>
                  </motion.div>
                </LayoutGroup>
              </div>

              <div>
                <label htmlFor="learners" className="text-[13px] leading-[19.5px] text-bone/60">
                  Learners
                </label>
                <p className="mt-2 font-title text-5xl leading-[48px] tracking-[-0.03em] tabular-nums" aria-hidden>
                  {learners}
                </p>
                <div className="relative mt-4 h-[50px]">
                  <input
                    id="learners"
                    type="range"
                    min={1}
                    max={100}
                    value={learners}
                    onChange={(e) => setLearners(Number(e.target.value))}
                    className="slider absolute inset-x-0 top-5"
                    style={{ ["--fill" as string]: fill }}
                    aria-valuetext={`${learners} learners`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
              <div>
                <p className="text-[13px] leading-[19.5px] text-bone/60">
                  {selected.length} {selected.length === 1 ? "course" : "courses"} × {learners}{" "}
                  {learners === 1 ? "learner" : "learners"} × £{PRICE} · {plan}
                </p>
                <p className="mt-2 font-title text-[clamp(3rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] text-mint" aria-live="polite">
                  <AnimatedTotal value={total} />
                </p>
              </div>
              <AddToCartButton
                id="team-order"
                title={`Team order · ${selected.length} courses × ${learners} learners`}
                price={total}
                tone="bone"
                label="Add team order to cart"
                className="px-6 py-4 text-base leading-6"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
