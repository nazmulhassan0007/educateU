"use client";

import { useMemo, useState } from "react";
import { FaqList, type FaqEntry } from "../site/FaqList";
import { Icon } from "../site/Icon";

const norm = (v: string) => v.toLowerCase().replace(/&/g, " and ").replace(/[^\p{Letter}\p{Number}]+/gu, " ").trim();

/** Support FAQ with a live search over questions and answers. */
export function SupportFaq({ items }: { items: FaqEntry[] }) {
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const tokens = norm(q).split(" ").filter(Boolean);
    if (!tokens.length) return items;
    return items.filter((f) => {
      const hay = norm(`${f.q} ${f.a}`);
      return tokens.every((t) => hay.includes(t));
    });
  }, [q, items]);

  return (
    <div>
      <label className="flex h-14 items-center gap-3 rounded-2xl bg-bone px-5 shadow-[0_0_0_1px_rgba(6,24,11,0.12)] transition-shadow focus-within:shadow-[0_0_0_2px_var(--mint)]">
        <Icon name="search" size={20} className="shrink-0 text-ink/60" />
        <span className="sr-only">Search the support hub</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search certificates, refunds, team purchases…"
          className="min-w-0 flex-1 bg-transparent text-base text-ink placeholder:text-ink/50 focus:outline-none"
        />
      </label>
      <p className="mt-3 text-sm text-ink/60" aria-live="polite">
        {q.trim() ? `${shown.length} ${shown.length === 1 ? "answer" : "answers"} for “${q.trim()}”` : `${items.length} common questions`}
      </p>
      <div className="mt-6">
        <FaqList
          key={q}
          items={shown}
          empty={
            <div className="rounded-3xl bg-bone p-8 shadow-[0_0_0_1px_rgba(6,24,11,0.1)]">
              <p className="font-title text-2xl tracking-[-0.03em] text-ink">No answer matches “{q.trim()}”.</p>
              <p className="mt-2 text-[15px] text-ink/70">
                Email{" "}
                <a href="mailto:support@educateu.com" className="text-green underline underline-offset-2">
                  support@educateu.com
                </a>{" "}
                and our UK team will reply within 1 business day.
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}
