/**
 * Big-type marquee: phrases drift past separated by the mint mark dot.
 * The row runs twice so the loop is seamless; the copy is aria-hidden.
 */
export function WordMarquee({ items, reverse = false, className = "" }: { items: string[]; reverse?: boolean; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] ${className}`}>
      <ul
        className={`marquee-track m-0 flex w-max list-none items-center p-0 [animation-duration:48s] ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {row.map((t, i) => (
          <li key={i} aria-hidden={i >= items.length} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap px-6 font-title text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[1.1] tracking-[-0.03em] sm:px-10">{t}</span>
            <span aria-hidden className="size-3 shrink-0 rounded-full bg-mint sm:size-4" />
          </li>
        ))}
      </ul>
    </div>
  );
}
