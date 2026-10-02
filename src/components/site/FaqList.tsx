"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { Item, RevealGroup } from "../motion/Reveal";

export type FaqEntry = { q: string; a: string };

function Row({ q, a, open, onToggle }: FaqEntry & { open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div className="border-t border-ink/10">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left lg:py-7"
        >
          <span className="max-w-[780px] font-title text-xl leading-[1.3] tracking-[-0.03em] text-ink transition-colors duration-200 group-hover:text-green sm:text-2xl sm:leading-9">
            {q}
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 45 : 0, backgroundColor: open ? "rgba(6,24,11,1)" : "rgba(6,24,11,0)" }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="grid size-10 shrink-0 place-items-center rounded-full"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <motion.path
                d="M7 1V13M1 7H13"
                strokeWidth="1.8"
                strokeLinecap="round"
                animate={{ stroke: open ? "#1EE9B5" : "#06180B" }}
                transition={{ duration: 0.2 }}
              />
            </svg>
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.22, ease: EASE_OUT } }}
            transition={{ height: { duration: 0.35, ease: EASE_OUT }, opacity: { duration: 0.3, delay: 0.05 } }}
            className="overflow-hidden"
          >
            <p className="max-w-[789px] pb-7 text-[17px] leading-[1.625] text-ink/75">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Accordion list; one question open at a time. */
export function FaqList({ items, empty }: { items: FaqEntry[]; empty?: React.ReactNode }) {
  const [open, setOpen] = useState<number | null>(0);
  if (items.length === 0) return <>{empty}</>;
  return (
    <RevealGroup gap={0.06} className="border-b border-ink/10">
      {items.map((f, i) => (
        <Item key={f.q}>
          <Row q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
        </Item>
      ))}
    </RevealGroup>
  );
}

/** Two-column FAQ band: heading and lede left, accordion right. */
export function FaqSection({
  id = "faq",
  title = "Frequently asked questions",
  lede,
  items,
}: {
  id?: string;
  title?: string;
  lede?: string;
  items: FaqEntry[];
}) {
  return (
    <section id={id} className="bg-paper py-20 lg:py-32" aria-labelledby={`${id}-title`}>
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id={`${id}-title`} className="max-w-[406px] font-title text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1] tracking-[-0.03em] text-ink">
            {title}
          </h2>
          {lede && <p className="mt-6 max-w-[406px] text-[17px] leading-[25.5px] text-ink/70">{lede}</p>}
        </div>
        <div className="lg:col-span-8">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}
