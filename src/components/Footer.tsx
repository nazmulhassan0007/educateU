"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Support Hub", href: "/support-hub" },
      { label: "Certificate Checker", href: "/#certificate" },
      { label: "Refund Policy", href: "/support-hub#refund-policy" },
      { label: "Cookies Policy", href: "/support-hub#faq" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
  }

  return (
    <footer className="bg-abyss pb-10 pt-20 text-bone lg:pt-24">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Image src="/images/educateu-business-logo.png" alt="educateU Business" width={243} height={56} className="h-11 w-auto" />
            <p className="mt-8 max-w-[418px] font-title text-[clamp(2rem,2.8vw,2.5rem)] leading-[1.05] tracking-[-0.03em]">
              Skills Without Borders, <span className="text-mint">Careers Without Limits</span>
            </p>

            <form className="mt-8 w-full max-w-[440px]" onSubmit={subscribe} noValidate>
              <label htmlFor="newsletter" className="block text-sm leading-[21px] text-bone/75">
                Start your learning journey today with educateU.
              </label>
              <div
                className={`mt-3 flex h-[57px] items-stretch gap-2 rounded-xl py-1.5 pl-4 pr-1.5 transition-shadow duration-200 ${
                  state === "error"
                    ? "shadow-[0_0_0_1px_rgba(255,120,120,0.8)]"
                    : "shadow-[0_0_0_1px_rgba(255,255,255,0.18)] focus-within:shadow-[0_0_0_1.5px_var(--mint)]"
                }`}
              >
                <input
                  id="newsletter"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state !== "idle") setState("idle");
                  }}
                  placeholder="Your email address"
                  aria-invalid={state === "error"}
                  aria-describedby="newsletter-status"
                  className="min-w-0 flex-1 bg-transparent text-[15px] text-bone placeholder:text-bone/55 focus:outline-none"
                />
                <button type="submit" className="press rounded-lg bg-bone px-5 text-sm font-medium leading-[21px] text-ink hover:bg-white">
                  {state === "done" ? "Subscribed" : "Subscribe"}
                </button>
              </div>
              <div id="newsletter-status" aria-live="polite" className="min-h-[24px]">
                <AnimatePresence mode="wait">
                  {state === "error" && (
                    <motion.p
                      key="err"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                      className="mt-2 text-[13px] text-[#ffb4b4]"
                    >
                      Enter a valid email address, like name@company.co.uk.
                    </motion.p>
                  )}
                  {state === "done" && (
                    <motion.p
                      key="ok"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                      className="mt-2 text-[13px] text-mint"
                    >
                      You’re on the list. Check your inbox to confirm.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-7 lg:gap-14">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
                <p className="text-[13px] leading-[19.5px] text-bone/60">{col.title}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-base leading-6 text-bone transition-colors duration-200 hover:text-mint">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div className="col-span-2 sm:col-span-1 lg:col-span-3">
              <p className="text-[13px] leading-[19.5px] text-bone/60">Contact</p>
              <a href="mailto:support@educateu.com" className="mt-5 block text-base leading-6 text-bone transition-colors duration-200 hover:text-mint">
                support@educateu.com
              </a>
              <address className="mt-3 max-w-[268px] text-sm not-italic leading-[22.75px] text-bone/70">
                EDUCATEU LTD 118-120 Meridian Place, Isle Of Dogs, London, England, E14 9FF
              </address>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] leading-[19.5px] text-bone/65 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <p>© 2026 All rights reserved. educateU is registered in England &amp; Wales No. 14400001</p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-1 transition-colors duration-200 hover:text-bone"
          >
            Back to top{" "}
            <span className="inline-block transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-hover:-translate-y-0.5" aria-hidden>
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
