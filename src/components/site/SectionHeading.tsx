import { Reveal } from "../motion/Reveal";
import { SplitHeading } from "../motion/SplitHeading";

/** Section title with an optional one-line lede, split to the right on wide screens. */
export function SectionHeading({
  id,
  title,
  lede,
  tone = "ink",
  className = "",
}: {
  id: string;
  title: string;
  lede?: string;
  tone?: "ink" | "bone";
  className?: string;
}) {
  const text = tone === "ink" ? "text-ink" : "text-bone";
  const sub = tone === "ink" ? "text-ink/70" : "text-bone/70";
  return (
    <div className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${className}`}>
      <SplitHeading
        id={id}
        className={`max-w-[18ch] font-title text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1] tracking-[-0.03em] ${text}`}
      >
        {title}
      </SplitHeading>
      {lede && (
        <Reveal delay={0.1}>
          <p className={`max-w-[460px] text-[17px] leading-[1.55] ${sub}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
