"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav } from "@/lib/data";
import { EASE_OUT } from "@/lib/motion";
import { useCart } from "./cart-context";
import { Magnetic } from "./motion/Magnetic";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, pulse } = useCart();
  const pathname = usePathname();
  const isActive = (href: string) => href.startsWith("/") && !href.includes("#") && pathname.startsWith(href);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock the page while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`backdrop-blur-md transition-[background-color,box-shadow] duration-300 ${
          scrolled || open
            ? "bg-[#041f17]/95 shadow-[0_1px_0_0_rgba(255,255,255,0.08)]"
            : "bg-[#041f17]/85"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between lg:h-[96px]">
          <Link href="/" aria-label="educateU Business home" className="press shrink-0 rounded-md">
            <Image
              src="/images/educateu-business-logo.png"
              alt="educateU Business"
              width={243}
              height={56}
              priority
              className="h-9 w-auto lg:h-10"
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 whitespace-nowrap xl:flex 2xl:gap-9">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="relative text-[15px] leading-[22.5px] text-white/80 transition-colors duration-200 hover:text-white aria-[current=page]:text-white aria-[current=page]:after:scale-x-100 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-mint after:transition-transform after:duration-300 after:[transition-timing-function:var(--ease-out)] hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#cart"
              className="press hidden items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-[15px] leading-[22.5px] text-white/85 hover:text-white sm:flex"
            >
              Cart
              <motion.span
                key={pulse}
                initial={pulse > 0 ? { scale: 1.45, backgroundColor: "rgba(30,233,181,1)" } : false}
                animate={{ scale: 1, backgroundColor: count > 0 ? "rgba(30,233,181,0.9)" : "rgba(255,255,255,0.15)" }}
                transition={{ type: "spring", duration: 0.45, bounce: 0.35 }}
                className={`rounded-[4px] px-1.5 py-0.5 font-mono text-xs leading-4 tabular-nums ${
                  count > 0 ? "text-ink" : "text-white/85"
                }`}
                aria-label={`${count} items in cart`}
              >
                {count}
              </motion.span>
            </a>
            <a
              href="#login"
              className="press hidden whitespace-nowrap rounded-lg px-3 py-2 text-[15px] leading-[22.5px] text-white/85 hover:text-white sm:block"
            >
              Log in
            </a>
            <Magnetic strength={0.2}>
              <a
                href="#register"
                className="press block rounded-xl bg-bone px-5 py-3 text-[15px] font-medium leading-[22.5px] text-ink hover:bg-white"
              >
                Register
              </a>
            </Magnetic>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="press ml-1 flex size-11 items-center justify-center rounded-xl text-bone xl:hidden"
            >
              <span className="relative block h-4 w-6">
                <motion.span
                  className="absolute left-0 top-0 block h-[2px] w-6 rounded bg-current"
                  animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                />
                <motion.span
                  className="absolute left-0 top-[7px] block h-[2px] w-6 rounded bg-current"
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="absolute left-0 top-[14px] block h-[2px] w-6 rounded bg-current"
                  animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="absolute inset-x-0 top-[72px] h-[calc(100dvh-72px)] overflow-y-auto bg-ink/95 backdrop-blur-md lg:top-[96px] lg:h-[calc(100dvh-96px)] xl:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-6">
              {nav.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.04 * i, duration: 0.35, ease: EASE_OUT } }}
                  className="font-title text-[32px] leading-[1.15] tracking-[-0.02em] text-bone py-3 border-b border-white/10"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-6 flex gap-3 sm:hidden">
                <a href="#cart" className="press flex-1 rounded-xl px-5 py-3 text-center text-[15px] text-bone shadow-[0_0_0_1px_rgba(255,255,255,0.25)]">
                  Cart ({count})
                </a>
                <a href="#login" className="press flex-1 rounded-xl px-5 py-3 text-center text-[15px] text-bone shadow-[0_0_0_1px_rgba(255,255,255,0.25)]">
                  Log in
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
