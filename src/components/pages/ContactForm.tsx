"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { Icon } from "../site/Icon";

const INQUIRY_TYPES = ["Course enquiry", "Company Training", "Partnerships", "Certificates", "Technical issue", "Other"];

type Fields = { firstName: string; lastName: string; phone: string; email: string; type: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { firstName: "", lastName: "", phone: "", email: "", type: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.firstName.trim()) e.firstName = "Enter your first name.";
  if (!f.lastName.trim()) e.lastName = "Enter your last name.";
  if (!/^[+\d][\d\s()-]{6,}$/.test(f.phone.trim())) e.phone = "Enter a phone number, like +44 20 1234 5678.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Enter a valid email address, like name@company.co.uk.";
  if (!f.type) e.type = "Choose what your enquiry is about.";
  if (f.message.trim().length < 10) e.message = "Tell us a little more, at least 10 characters.";
  return e;
}

function Field({
  id,
  label,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium leading-5 text-ink">
        {label} <span className="text-green" aria-hidden>*</span>
      </label>
      <div className="mt-2">{children}</div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="mt-1.5 text-[13px] leading-5 text-[#b42318]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (bad?: string) =>
  `h-12 w-full rounded-xl bg-bone px-4 text-[15px] text-ink placeholder:text-ink/45 transition-shadow focus:outline-none ${
    bad ? "shadow-[0_0_0_1.5px_#d92d20]" : "shadow-[0_0_0_1px_rgba(6,24,11,0.14)] focus:shadow-[0_0_0_2px_var(--mint)]"
  }`;

/**
 * Enquiry form with inline validation. It validates and confirms on the client;
 * wiring it to an email or CRM service is the remaining step before launch.
 */
export function ContactForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(f);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setSent(true);
  }

  const aria = (k: keyof Fields) => ({
    "aria-invalid": Boolean(errors[k]),
    "aria-describedby": errors[k] ? `contact-${k}-error` : undefined,
  });

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-paper p-6 shadow-[0_0_0_1px_rgba(6,24,11,0.08)] sm:p-10">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 size-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(30,233,181,0.25),transparent_70%)]" />
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="relative py-10 text-center"
            role="status"
          >
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-mint text-ink">
              <Icon name="shield" size={26} />
            </span>
            <h3 className="mt-6 font-title text-[30px] leading-[1.1] tracking-[-0.03em] text-ink">Thanks, {f.firstName.trim()}. Enquiry received.</h3>
            <p className="mx-auto mt-3 max-w-[420px] text-[16px] leading-[1.6] text-ink/70">
              We reply within 1 business day, Monday to Friday, 9:00 am to 5:00 pm GMT, to {f.email.trim()}.
            </p>
            <button
              type="button"
              onClick={() => {
                setF(empty);
                setSent(false);
              }}
              className="press mt-8 rounded-xl px-5 py-3 text-sm font-medium text-ink shadow-[0_0_0_1px_rgba(6,24,11,0.2)] hover:bg-bone"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate className="relative grid grid-cols-1 gap-5 sm:grid-cols-2" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
            <Field id="contact-firstName" label="First name" error={errors.firstName}>
              <input id="contact-firstName" autoComplete="given-name" value={f.firstName} onChange={set("firstName")} className={inputCls(errors.firstName)} {...aria("firstName")} />
            </Field>
            <Field id="contact-lastName" label="Last name" error={errors.lastName}>
              <input id="contact-lastName" autoComplete="family-name" value={f.lastName} onChange={set("lastName")} className={inputCls(errors.lastName)} {...aria("lastName")} />
            </Field>
            <Field id="contact-phone" label="Phone number" error={errors.phone}>
              <input id="contact-phone" type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} placeholder="+44" className={inputCls(errors.phone)} {...aria("phone")} />
            </Field>
            <Field id="contact-email" label="Email address" error={errors.email}>
              <input id="contact-email" type="email" autoComplete="email" value={f.email} onChange={set("email")} className={inputCls(errors.email)} {...aria("email")} />
            </Field>
            <Field id="contact-type" label="Inquiry type" error={errors.type} className="sm:col-span-2">
              <div className="relative">
                <select id="contact-type" value={f.type} onChange={set("type")} className={`${inputCls(errors.type)} appearance-none pr-10 ${f.type ? "" : "text-ink/45"}`} {...aria("type")}>
                  <option value="" disabled>
                    Select inquiry type
                  </option>
                  {INQUIRY_TYPES.map((t) => (
                    <option key={t} value={t} className="text-ink">
                      {t}
                    </option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/60" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="m3 5 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Field>
            <Field id="contact-message" label="Message" error={errors.message} className="sm:col-span-2">
              <textarea
                id="contact-message"
                rows={5}
                value={f.message}
                onChange={set("message")}
                placeholder="Tell us about the course, partnership or team training you have in mind."
                className={`${inputCls(errors.message)} h-auto resize-y py-3 leading-[1.5]`}
                {...aria("message")}
              />
            </Field>
            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[380px] text-[13px] leading-5 text-ink/60">
                educateU is an online learning platform. We do not provide phone-based sales. All courses are available through direct online enrolment.
              </p>
              <button type="submit" className="press group flex shrink-0 items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-base font-medium text-bone">
                Submit your enquiry
                <span className="grid size-10 place-items-center rounded-full bg-mint text-ink transition-transform group-hover:translate-x-0.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
