"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { catalogue, subjectsList, type CatalogueCourse } from "@/lib/catalogue";
import { EASE_OUT } from "@/lib/motion";
import { AddToCartButton } from "../AddToCartButton";
import { Icon } from "../site/Icon";

const PAGE = 9;
type Sort = "az" | "za" | "short" | "long";

const sortLabels: Record<Sort, string> = {
  az: "Alphabetical: A–Z",
  za: "Alphabetical: Z–A",
  short: "Duration: shortest first",
  long: "Duration: longest first",
};

/** Lowercase words; "&" spelled out so "health and safety" finds "Health & Safety". */
const norm = (v: string) => v.toLowerCase().replace(/&/g, " and ").replace(/[^\p{Letter}\p{Number}]+/gu, " ").trim();

function matches(c: CatalogueCourse, q: string) {
  const tokens = norm(q).split(" ").filter(Boolean);
  if (!tokens.length) return true;
  const hay = norm(`${c.title} ${c.subject} ${c.description}`);
  return tokens.every((t) => hay.includes(t));
}

function CourseTile({ c }: { c: CatalogueCourse }) {
  return (
    <article
      id={`course-${c.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-bone shadow-[0_0_0_1px_rgba(6,24,11,0.1)] transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(6,24,11,0.12),0_24px_40px_-24px_rgba(6,24,11,0.35)]"
    >
      <div className="relative aspect-[421/250] overflow-hidden">
        <Image
          src={c.image}
          alt=""
          fill
          sizes="(min-width:1280px) 421px, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-lg bg-bone/95 px-3 py-1.5 text-xs font-medium leading-[18px] text-ink">{c.subject}</span>
        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg bg-ink/80 px-2.5 py-1.5 text-xs leading-[18px] text-bone backdrop-blur">
          <Icon name="clock" size={13} /> {c.hours} hours
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-title text-2xl leading-[30px] tracking-[-0.03em] text-ink">{c.title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-[1.5] text-ink/70">{c.description}</p>
        <p className="mt-4 font-mono text-xs uppercase leading-[18px] text-ink/60">CPD certificate · Instant access</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-title text-[32px] leading-[40px] tracking-[-0.03em] text-ink">£{c.price}</span>
          <AddToCartButton id={c.slug} title={c.title} price={c.price} className="px-5 py-3 text-sm leading-[21px]" />
        </div>
      </div>
    </article>
  );
}

export function CourseExplorer() {
  const [subject, setSubject] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("az");
  const [showAll, setShowAll] = useState(false);

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: catalogue.length };
    for (const s of subjectsList) m[s] = catalogue.filter((c) => c.subject === s).length;
    return m;
  }, []);

  const filtered = useMemo(() => {
    const list = catalogue.filter((c) => (subject === "All" || c.subject === subject) && matches(c, query));
    return [...list].sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "za") return b.title.localeCompare(a.title);
      if (sort === "short") return a.hours - b.hours || a.title.localeCompare(b.title);
      return b.hours - a.hours || a.title.localeCompare(b.title);
    });
  }, [subject, query, sort]);

  const visible = showAll ? filtered : filtered.slice(0, PAGE);
  const reset = () => setShowAll(false);

  return (
    <section id="courses" className="bg-paper py-16 lg:py-24" aria-labelledby="catalogue-title">
      <div className="container-x">
        <h2 id="catalogue-title" className="sr-only">
          All courses
        </h2>

        {/* Controls */}
        <div className="flex flex-col gap-5 min-[1400px]:flex-row min-[1400px]:items-center min-[1400px]:justify-between">
          <LayoutGroup id="subjects">
            <div role="tablist" aria-label="Filter by subject" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 min-[1400px]:flex-nowrap [&::-webkit-scrollbar]:hidden">
              {["All", ...subjectsList].map((s) => {
                const on = s === subject;
                return (
                  <button
                    key={s}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setSubject(s);
                      reset();
                    }}
                    className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-[14px] transition-colors duration-200 ${
                      on ? "text-bone" : "text-ink/70 shadow-[0_0_0_1px_rgba(6,24,11,0.14)] hover:text-ink"
                    }`}
                  >
                    {on && (
                      <motion.span layoutId="subject-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.4, ease: EASE_OUT }} />
                    )}
                    <span className="relative">
                      {s === "All" ? "All courses" : s} <span className={on ? "text-mint" : "text-ink/40"}>{counts[s]}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex h-12 min-w-0 shrink-0 items-center gap-2.5 rounded-xl bg-bone px-4 shadow-[0_0_0_1px_rgba(6,24,11,0.12)] transition-shadow focus-within:shadow-[0_0_0_2px_var(--mint)] sm:w-[280px] min-[1400px]:w-[230px] 2xl:w-[280px]">
              <Icon name="search" size={18} className="shrink-0 text-ink/60" />
              <span className="sr-only">Search courses</span>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  reset();
                }}
                placeholder="Search courses"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-ink placeholder:text-ink/50 focus:outline-none"
              />
            </label>
            <label className="relative flex h-12 items-center rounded-xl bg-bone shadow-[0_0_0_1px_rgba(6,24,11,0.12)] focus-within:shadow-[0_0_0_2px_var(--mint)]">
              <span className="sr-only">Sort courses</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-full appearance-none rounded-xl bg-transparent pl-4 pr-10 text-[15px] text-ink focus:outline-none"
              >
                {(Object.keys(sortLabels) as Sort[]).map((k) => (
                  <option key={k} value={k}>
                    {sortLabels[k]}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-3.5" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="m3 5 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>
          </div>
        </div>

        <p className="mt-6 text-sm leading-5 text-ink/60" aria-live="polite">
          Showing {visible.length} of {filtered.length} {filtered.length === 1 ? "course" : "courses"}
          {subject !== "All" && ` in ${subject}`}
          {query.trim() && ` matching “${query.trim()}”`}
        </p>

        {/* Grid */}
        <motion.ul layout className="mt-6 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((c, i) => (
              <motion.li
                key={c.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: Math.min(i % PAGE, 8) * 0.04, ease: EASE_OUT } }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <CourseTile c={c} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filtered.length === 0 && (
          <div className="mt-6 rounded-3xl bg-bone p-10 text-center shadow-[0_0_0_1px_rgba(6,24,11,0.1)]">
            <p className="font-title text-2xl tracking-[-0.03em] text-ink">No courses match “{query.trim()}”.</p>
            <p className="mt-2 text-[15px] text-ink/70">Try a broader word, or browse every subject.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSubject("All");
              }}
              className="press mt-6 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-bone"
            >
              Show all courses
            </button>
          </div>
        )}

        {filtered.length > PAGE && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="press group flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-base font-medium text-bone"
            >
              {showAll ? "Show fewer" : `Show all ${filtered.length} courses`}
              <span className={`grid size-10 place-items-center rounded-full bg-mint text-ink transition-transform duration-500 ${showAll ? "-rotate-90" : "rotate-90"}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
