"use client";

import { useRef } from "react";
import { testimonials } from "@/lib/data";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Item, RevealGroup } from "./motion/Reveal";
import { SplitHeading } from "./motion/SplitHeading";

export function Testimonials() {
  const { featured, others } = testimonials;
  const quoteRef = useRef<HTMLQuoteElement>(null);

  // The featured quote is read by the scroll: words brighten from bone/25 to bone as you move through it.
  useGSAP(
    () => {
      const el = quoteRef.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let split: SplitText | undefined;
      document.fonts.ready.then(() => {
        if (!el.isConnected) return;
        split = SplitText.create(el, {
          type: "words",
          wordsClass: "inline-block",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.22 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.4 },
              },
            ),
        });
      });
      return () => split?.revert();
    },
    { scope: quoteRef },
  );

  return (
    <section className="bg-bone py-20 lg:py-32" aria-labelledby="learners-title">
      <div className="container-x">
        <SplitHeading
          id="learners-title"
          className="font-title text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] text-ink"
        >
          What our learners say
        </SplitHeading>

        <RevealGroup gap={0.1} className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-2">
          <Item className="lg:col-span-7 lg:row-span-2">
            <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] bg-ink p-8 text-bone sm:p-14">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 size-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(30,233,181,0.18),transparent_70%)]"
              />
              <blockquote
                ref={quoteRef}
                className="relative max-w-[644px] font-title text-[clamp(1.5rem,2.65vw,2.375rem)] leading-[1.15] tracking-[-0.03em]"
              >
                “{featured.quote}”
              </blockquote>
              <figcaption className="relative mt-10 flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-mint font-title text-xl leading-7 text-ink" aria-hidden>
                  {featured.name[0]}
                </span>
                <span>
                  <span className="block text-base font-medium leading-6">{featured.name}</span>
                  <span className="block text-sm leading-5 text-bone/65">{featured.role}</span>
                </span>
              </figcaption>
            </figure>
          </Item>
          {others.map((t) => (
            <Item key={t.name} className="lg:col-span-5">
              <figure className="flex h-full flex-col justify-between rounded-[28px] bg-paper p-8 transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1 hover:shadow-[0_24px_40px_-28px_rgba(6,24,11,0.35)]">
                <blockquote className="max-w-[469px] text-lg leading-[1.625] text-ink/85">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-ink font-title text-base leading-6 text-mint" aria-hidden>
                    {t.name[0]}
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium leading-[22.5px] text-ink">{t.name}</span>
                    <span className="block text-sm leading-5 text-ink/65">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Item>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
