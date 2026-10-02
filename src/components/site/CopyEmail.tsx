"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

/** An email set large, with a mailto link and a one-click copy that confirms in place. */
export function CopyEmail({ email, tone = "ink" }: { email: string; tone?: "ink" | "bone" }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  const text = tone === "ink" ? "text-ink hover:text-green" : "text-bone hover:text-mint";
  const btn =
    tone === "ink"
      ? "text-ink shadow-[0_0_0_1px_rgba(6,24,11,0.18)] hover:bg-ink hover:text-bone"
      : "text-bone shadow-[0_0_0_1px_rgba(255,255,255,0.25)] hover:bg-bone hover:text-ink";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={`mailto:${email}`} className={`break-all font-title text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] tracking-[-0.03em] transition-colors ${text}`}>
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className={`press relative grid h-9 place-items-center overflow-hidden rounded-full px-4 text-[13px] font-medium transition-colors ${btn}`}
      >
        <span className="invisible col-start-1 row-start-1">Copied</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? "y" : "n"}
            initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="col-start-1 row-start-1"
          >
            {copied ? "Copied" : "Copy"}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
