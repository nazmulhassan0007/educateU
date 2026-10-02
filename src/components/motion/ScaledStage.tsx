"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  /** Design-pixel size of the composition. */
  width: number;
  height: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * Renders a fixed-pixel composition (from the design) and scales it to fit
 * the available width, so absolute layouts stay pixel-faithful at every viewport.
 */
export function ScaledStage({ width, height, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setScale(Math.min(1, w / width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} className={className} style={{ height: height * scale }}>
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className="relative"
      >
        {children}
      </div>
    </div>
  );
}
