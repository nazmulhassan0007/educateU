"use client";

import Image from "next/image";
import { popularCourses, type Course } from "@/lib/data";
import { AddToCartButton } from "./AddToCartButton";
import { Item, Reveal, RevealGroup } from "./motion/Reveal";
import { SplitHeading } from "./motion/SplitHeading";
import { Magnetic } from "./motion/Magnetic";

/** Tracks the pointer so the card can light up where the cursor is. */
function spotlight(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function CourseCard({ course }: { course: Course }) {
  return (
    <article
      onPointerMove={spotlight}
      className="spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl bg-bone shadow-[0_0_0_1px_rgba(6,24,11,0.1)] transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(6,24,11,0.12),0_24px_40px_-24px_rgba(6,24,11,0.35)]"
    >
      <div className="relative h-[316px] overflow-hidden">
        <Image
          src={course.image}
          alt=""
          fill
          sizes="(min-width:1024px) 421px, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-lg bg-bone/95 px-3 py-1.5 text-xs font-medium leading-[18px] text-ink">
          {course.subject}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="min-h-[60px] font-title text-2xl leading-[30px] tracking-[-0.03em] text-ink">
          <a href={`#course-${course.slug}`} className="rounded-sm focus-visible:outline-offset-4">
            {course.title}
          </a>
        </h3>
        <p className="mt-2 font-mono text-xs uppercase leading-[18px] text-ink/65">
          {course.modules} modules · {course.hours} hours · CPD certificate
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className="font-title text-[32px] leading-[48px] tracking-[-0.03em] text-ink">£{course.price}</span>
          <AddToCartButton
            id={course.slug}
            title={course.title}
            price={course.price}
            className="px-5 py-3 text-sm leading-[21px]"
          />
        </div>
      </div>
    </article>
  );
}

export function PopularCourses() {
  return (
    <section id="courses" className="bg-paper py-20 lg:py-32" aria-labelledby="popular-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SplitHeading
            id="popular-title"
            className="font-title text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] text-ink"
          >
            Popular courses
          </SplitHeading>
          <Reveal delay={0.1}>
            <Magnetic>
            <a
              href="/courses"
              className="press group inline-flex items-center gap-3 rounded-xl bg-ink px-6 py-4 text-base font-medium leading-6 text-bone hover:bg-[#0d2a16]"
            >
              View all 18 courses
              <span className="inline-block transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
            </Magnetic>
          </Reveal>
        </div>

        <RevealGroup gap={0.07} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularCourses.map((course) => (
            <Item key={course.slug} className="h-full">
              <CourseCard course={course} />
            </Item>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
