"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "./cart-context";

type Props = {
  id: string;
  title: string;
  price: number;
  qty?: number;
  className?: string;
  /** Visual variant: dark button on light surfaces, or light on dark. */
  tone?: "ink" | "bone";
  label?: string;
};

/**
 * Press → "Added" confirmation that crossfades through a light blur, then settles back.
 */
export function AddToCartButton({
  id,
  title,
  price,
  qty = 1,
  className = "",
  tone = "ink",
  label = "Add to cart",
}: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(t);
  }, [added]);

  const base =
    tone === "ink"
      ? "bg-ink text-bone hover:bg-[#0d2a16]"
      : "bg-bone text-ink hover:bg-white";

  return (
    <button
      type="button"
      onClick={() => {
        add({ id, title, price }, qty);
        setAdded(true);
      }}
      aria-live="polite"
      className={`press relative grid place-items-center overflow-hidden rounded-xl font-medium ${base} ${className}`}
    >
      {/* Both labels occupy the same cell so the button never changes width. */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden>
        {label.length >= 7 ? label : "Added ✓"}
      </span>
      <AnimatePresence initial={false} mode="popLayout">
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, filter: "blur(4px)", y: 6 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", y: -6 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap"
          >
            Added
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
              <motion.path
                d="M4 10.5L7.5 14L16 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              />
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="label"
            initial={{ opacity: 0, filter: "blur(4px)", y: 6 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", y: -6 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="col-start-1 row-start-1 whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
