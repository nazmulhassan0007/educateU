import { learnerReviews } from "@/lib/catalogue";

/** Learner quotes drifting sideways; pauses on hover, holds still under reduced motion. */
export function ReviewMarquee() {
  const row = [...learnerReviews, ...learnerReviews];
  return (
    <div className="marquee relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <ul className="marquee-track m-0 flex w-max list-none gap-5 p-0 [animation-duration:60s]">
        {row.map((r, i) => (
          <li key={i} aria-hidden={i >= learnerReviews.length} className="w-[340px] shrink-0 sm:w-[420px]">
            <figure className="flex h-full flex-col justify-between rounded-[28px] bg-paper p-7 shadow-[0_0_0_1px_rgba(6,24,11,0.08)]">
              <blockquote className="text-[16px] leading-[1.6] text-ink/85">“{r.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-ink font-title text-base text-mint" aria-hidden>
                  {r.name[0]}
                </span>
                <span>
                  <span className="block text-[15px] font-medium leading-[22px] text-ink">{r.name}</span>
                  <span className="block text-sm leading-5 text-ink/60">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
