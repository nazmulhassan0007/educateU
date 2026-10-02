"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { included } from "@/lib/data";
import { EASE_OUT, viewport } from "@/lib/motion";
import { Item, Reveal, RevealGroup } from "./motion/Reveal";

export function Pricing() {
  return (
    <section id="about" className="bg-bone py-20 lg:py-32" aria-labelledby="pricing-title">
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {/* The price is the hero of this section: it sharpens into focus rather than sliding. */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(14px)", scale: 0.96 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="font-title text-[clamp(7rem,14vw,12.5rem)] leading-[0.82] tracking-[-0.03em] text-ink"
            style={{ transformOrigin: "left bottom" }}
            aria-label="15 pounds"
          >
            £15<span className="text-green">.</span>
          </motion.p>
          <Reveal delay={0.15}>
            <h2
              id="pricing-title"
              className="mt-6 max-w-[746px] font-title text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1] tracking-[-0.03em] text-ink"
            >
              Every course. Certificate included. Pay once.
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-[639px] text-[17px] leading-[1.625] text-ink/70 lg:text-lg">
              No subscriptions, no recurring fees, no “+ VAT” surprises. You know the full cost before you
              start, and the certificate is yours to keep.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          delay={0.2}
          className="grid gap-px overflow-hidden rounded-3xl bg-ink/10 lg:col-span-5"
          role="list"
          aria-label="Included with every course"
        >
          {included.map((item) => (
            <Item key={item.title} role="listitem" className="flex items-start gap-5 bg-paper p-6 lg:p-7">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink">
                <Image src={item.icon} alt="" width={20} height={20} />
              </span>
              <div>
                <h3 className="font-title text-[22px] leading-[33px] tracking-[-0.03em] text-ink">{item.title}</h3>
                <p className="mt-1 text-[15px] leading-[22.5px] text-ink/70">{item.body}</p>
              </div>
            </Item>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
