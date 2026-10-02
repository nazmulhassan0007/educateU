"use client";

import Image from "next/image";
import { useRef } from "react";
import { subjects } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { Item, Reveal, RevealGroup } from "./motion/Reveal";
import { SplitHeading } from "./motion/SplitHeading";

const [health, compliance, cyber, leadership] = subjects;

function Tile({
  href,
  image,
  imageOpacity,
  gradient,
  className,
  children,
  sizes,
}: {
  href: string;
  image: string;
  imageOpacity: string;
  gradient: string;
  className: string;
  children: React.ReactNode;
  sizes: string;
}) {
  return (
    <a
      href={href}
      className={`group relative block overflow-hidden rounded-[28px] ${className} focus-visible:outline-offset-4`}
    >
      {/* Oversized so the parallax never shows an edge */}
      <div data-parallax className="absolute -inset-y-[12%] inset-x-0">
        <Image
          src={image}
          alt=""
          fill
          sizes={sizes}
          className={`object-cover ${imageOpacity} transition-[transform,opacity] duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.05] group-hover:opacity-90`}
        />
      </div>
      <div aria-hidden className={`absolute inset-0 ${gradient}`} />
      <div className="relative flex h-full flex-col justify-end">{children}</div>
      <span
        aria-hidden
        className="absolute right-6 top-6 grid size-11 place-items-center rounded-full bg-bone/0 text-bone opacity-0 shadow-[0_0_0_1px_rgba(242,239,230,0.35)] transition-[opacity,background-color,transform] duration-500 [transition-timing-function:var(--ease-out)] translate-y-2 group-hover:translate-y-0 group-hover:bg-bone group-hover:text-ink group-hover:opacity-100"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

export function Subjects() {
  const root = useRef<HTMLElement>(null);

  // Each tile's photo drifts slower than the page: depth without a single filter.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-bone pb-20 lg:pb-32" aria-labelledby="subjects-title">
      <div className="container-x">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SplitHeading
            id="subjects-title"
            className="font-title text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] text-ink"
          >
            Browse by subject
          </SplitHeading>
          <Reveal delay={0.1}>
            <p className="max-w-[487px] text-[17px] leading-[25.5px] text-ink/70">
              18 CPD courses across four subjects, each built for real workplaces.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          gap={0.08}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[312px_312px]"
        >
          <Item className="min-h-[420px] md:col-span-2 lg:row-span-2 lg:min-h-0">
            <Tile
              href="/courses"
              image={health.image}
              imageOpacity="opacity-70"
              gradient="bg-gradient-to-t from-ink via-ink/30 to-transparent"
              className="h-full min-h-[420px] bg-ink lg:min-h-0"
              sizes="(min-width:1024px) 648px, 100vw"
            >
              <div className="p-6 sm:p-8">
                <p className="font-mono text-[13px] leading-[19.5px] text-mint">{health.count} COURSES</p>
                <h3 className="mt-2 font-title text-[clamp(2rem,3.6vw,3.25rem)] leading-[1] tracking-[-0.03em] text-bone">
                  {health.name}
                </h3>
                <p className="mt-4 max-w-[471px] text-[15px] leading-[22.5px] text-bone/80">{health.courses}</p>
              </div>
            </Tile>
          </Item>

          <Item className="md:col-span-2">
            <Tile
              href="/courses"
              image={compliance.image}
              imageOpacity="opacity-55"
              gradient="bg-gradient-to-r from-ink/90 via-ink/50 to-transparent"
              className="h-[312px] bg-deep"
              sizes="(min-width:1024px) 648px, 100vw"
            >
              <div className="p-6 sm:p-8">
                <p className="font-mono text-[13px] leading-[19.5px] text-mint">{compliance.count} COURSES</p>
                <h3 className="mt-2 font-title text-4xl leading-9 tracking-[-0.03em] text-bone">{compliance.name}</h3>
                <p className="mt-3 text-[15px] leading-[22.5px] text-bone/80">{compliance.courses}</p>
              </div>
            </Tile>
          </Item>

          <Item>
            <Tile
              href="/courses"
              image={cyber.image}
              imageOpacity="opacity-45"
              gradient="bg-gradient-to-t from-ink via-ink/40 to-transparent"
              className="h-[312px] bg-forest"
              sizes="(min-width:1024px) 316px, (min-width:768px) 50vw, 100vw"
            >
              <div className="p-7">
                <p className="font-mono text-[13px] leading-[19.5px] text-mint">{cyber.count} COURSES</p>
                <h3 className="mt-2 font-title text-[28px] leading-7 tracking-[-0.03em] text-bone">{cyber.name}</h3>
              </div>
            </Tile>
          </Item>

          <Item>
            <Tile
              href="/courses"
              image={leadership.image}
              imageOpacity="opacity-45"
              gradient="bg-gradient-to-t from-ink via-ink/40 to-transparent"
              className="h-[312px] bg-forest"
              sizes="(min-width:1024px) 316px, (min-width:768px) 50vw, 100vw"
            >
              <div className="p-7">
                <p className="font-mono text-[13px] leading-[19.5px] text-mint">{leadership.count} COURSES</p>
                <h3 className="mt-2 max-w-[260px] font-title text-[28px] leading-7 tracking-[-0.03em] text-bone">
                  {leadership.name}
                </h3>
              </div>
            </Tile>
          </Item>
        </RevealGroup>
      </div>
    </section>
  );
}
