"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { usePageReady } from "../loader-context";

type Now = { time: string; day: string; open: boolean; next: string };

const OPEN = 9;
const CLOSE = 17;
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Reads the current time in London, whatever the visitor's own timezone. */
function readLondon(): Now {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  );
  const h = Number(parts.hour);
  const dow = DAYS.indexOf(parts.weekday);
  const weekday = dow >= 1 && dow <= 5;
  const open = weekday && h >= OPEN && h < CLOSE;

  let next = "";
  if (open) next = `Open until 5:00 pm, replies within 1 business day`;
  else if (weekday && h < OPEN) next = "Opens today at 9:00 am";
  else if (dow >= 1 && dow <= 4) next = `Opens ${DAYS[dow + 1]} at 9:00 am`;
  else next = "Opens Monday at 9:00 am";

  return { time: `${parts.hour}:${parts.minute}`, day: parts.weekday, open, next };
}

/**
 * Live UK office clock: whether the support team is in right now, the local London
 * time, and when they next open. Renders after mount so server and client agree.
 */
export function LiveStatus() {
  const { ready } = usePageReady();
  const [now, setNow] = useState<Now | null>(null);

  useEffect(() => {
    const tick = () => setNow(readLondon());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 15_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ type: "spring", duration: 0.9, bounce: 0.2, delay: 0.5 }}
      className="relative overflow-hidden rounded-[28px] bg-white/[0.04] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:p-9"
      aria-live="polite"
    >
      <div className="flex items-center gap-2.5 text-sm leading-5">
        <span className="relative grid size-2.5 place-items-center">
          {now?.open && <span className="absolute inset-0 rounded-full bg-mint motion-safe:animate-ping" />}
          <span className={`relative size-2.5 rounded-full ${now?.open ? "bg-mint" : "bg-bone/40"}`} />
        </span>
        <span className={now?.open ? "text-mint" : "text-bone/70"}>{now ? (now.open ? "Our UK team is in" : "Our UK team is out") : "Checking office hours"}</span>
      </div>
      <p className="mt-6 font-title text-[clamp(4rem,9vw,7rem)] leading-[0.85] tracking-[-0.04em] text-bone tabular-nums">
        {now?.time ?? "--:--"}
      </p>
      <p className="mt-3 text-[15px] leading-6 text-bone/65">London time{now ? `, ${now.day}` : ""}</p>
      <p className="mt-6 border-t border-white/12 pt-5 text-[15px] leading-6 text-bone/85">{now?.next ?? "Monday – Friday, 9:00 am – 5:00 pm GMT"}</p>
    </motion.div>
  );
}
