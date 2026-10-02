import Link from "next/link";
import { Magnetic } from "../motion/Magnetic";
import { Lines } from "../motion/Lines";
import { Reveal } from "../motion/Reveal";

/** "Advance your skills" closing band shared by the inner pages. */
export function CtaBand() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-20 text-bone lg:py-28" aria-label="Start learning">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[300px] -top-[380px] size-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(30,233,181,0.18),transparent_70%)]"
      />
      <div className="container-x relative z-[2] flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Lines
            as="h2"
            className="font-title text-[clamp(2.5rem,5.6vw,5rem)] leading-[0.95] tracking-[-0.03em]"
            lines={["Advance your skills,", <span key="g" className="text-mint">achieve your goals.</span>]}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 text-[17px] leading-[1.5] text-bone/75 lg:text-[19px]">Start your learning journey today with educateU.</p>
          </Reveal>
        </div>
        <Reveal delay={0.25}>
          <Magnetic>
            <Link
              href="/courses"
              className="press block whitespace-nowrap rounded-xl bg-mint px-7 py-4 text-base font-medium leading-6 text-ink hover:bg-[#3df0c1]"
            >
              Explore Courses
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
