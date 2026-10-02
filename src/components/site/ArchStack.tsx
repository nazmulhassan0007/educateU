"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { usePageReady } from "../loader-context";

const reveal = {
  hidden: { clipPath: "inset(100% 0 0 0 round 999px 999px 28px 28px)", y: 24 },
  show: (i: number) => ({
    clipPath: "inset(0% 0 0 0 round 999px 999px 28px 28px)",
    y: 0,
    transition: { duration: 1.1, ease: EASE_OUT, delay: 0.35 + i * 0.12 },
  }),
};

// Short, tall, medium: the homepage's arch rhythm, scaled to an aside.
const shapes = ["h-[62%] w-[28%]", "h-full w-[38%]", "h-[52%] w-[24%]"];
const floats = ["motion-safe:animate-[arch-float_7s_ease-in-out_infinite]", "motion-safe:animate-[arch-float_9s_ease-in-out_infinite_-3s]", "motion-safe:animate-[arch-float_8s_ease-in-out_infinite_-5s]"];

/** Three arch-framed photos that rise out of their own shape, then drift gently. */
export function ArchStack({ images, className = "" }: { images: { src: string; alt: string }[]; className?: string }) {
  const { ready } = usePageReady();
  return (
    <div className={`relative flex aspect-[5/4] items-end justify-center gap-3 sm:gap-4 ${className}`}>
      {images.slice(0, 3).map((img, i) => (
        <motion.figure
          key={img.src}
          custom={i}
          variants={reveal}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          className={`arch relative overflow-hidden bg-forest shadow-[0_0_0_1px_rgba(255,255,255,0.1)] ${shapes[i]} ${i === 1 ? "self-end" : "mb-[6%]"}`}
        >
          <div className={`absolute -inset-3 ${floats[i]}`}>
            <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 220px, 40vw" className="object-cover" priority={i === 1} />
          </div>
        </motion.figure>
      ))}
    </div>
  );
}
