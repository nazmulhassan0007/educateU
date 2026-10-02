import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBand } from "@/components/site/CtaBand";
import { Icon, type IconName } from "@/components/site/Icon";
import { Item, Reveal, RevealGroup } from "@/components/motion/Reveal";
import { SupportFaq } from "@/components/pages/SupportFaq";

export const metadata: Metadata = {
  title: "Support Hub | educateU Business",
  description:
    "Real support team, real people, UK business hours. How enrolling, certificates, course access, refunds and team purchases work at educateU.",
};

const steps: { icon: IconName; title: string; body: string }[] = [
  { icon: "users", title: "Choose individual or company", body: "Buying for yourself or your whole team? Pick the right option at checkout, no separate sales call needed." },
  { icon: "card", title: "Enrol & pay online", body: "One-off secure payment. No subscription, no recurring charges." },
  { icon: "bolt", title: "Get instant access", body: "Start straight away. No waiting for a course start date; every course is self-paced and available the moment you enrol." },
  { icon: "book", title: "Complete the course", body: "Work through the material in your own time, on any device." },
  { icon: "download", title: "Download your certificate", body: "Issued automatically the moment you finish, nothing extra to request." },
  { icon: "resume", title: "Resume anytime", body: "Log back in whenever suits you and pick up exactly where you left off." },
];

const contact: { icon: IconName; title: string; value: string; href?: string; body: string }[] = [
  { icon: "mail", title: "Email support", value: "support@educateu.com", href: "mailto:support@educateu.com", body: "Best for detailed questions, attach screenshots if you're reporting a technical issue." },
  { icon: "phone", title: "Phone number", value: "+44 204 613 9443", href: "tel:+442046139443", body: "Prefer to talk it through? Call our team directly." },
  { icon: "clock", title: "Response time", value: "Within 1 business day", body: "Real replies from our UK team, not an autoresponder." },
  { icon: "calendar", title: "Availability", value: "Mon – Fri, 9:00 am – 5:00 pm GMT", body: "Closed on UK public holidays; email anytime and we'll reply the next working day." },
];

const faqs = [
  {
    q: "How do I get my certificate after finishing a course?",
    a: "Your certificate of completion is issued automatically as soon as you finish your course, there's nothing extra to request. Download it straight from your dashboard and use it immediately as evidence of CPD or professional development.",
  },
  {
    q: "How do I request a refund?",
    a: "Contact our support team within 14 days of purchase if you're unhappy with a course, or if a technical issue is stopping you from accessing it. We assess every request fairly, case by case, see our full Refund Policy for details.",
  },
  {
    q: "How do I purchase a course for my team or company?",
    a: "At checkout, switch the purchase option from \"Individual\" to \"Company\" to buy access for multiple team members in a single transaction, with one invoice you can manage centrally. For larger group bookings, contact our support team for a tailored quote.",
  },
  {
    q: "How long do I have access to my course after purchase?",
    a: "You get instant access the moment you enrol, and you can log in and resume your course at any time, there's no fixed start date to wait for and no rush to finish by a deadline.",
  },
  {
    q: "What happens if I have technical issues accessing my course?",
    a: "Contact our support team within 14 days of purchase and we'll help you get back on track. Our UK-based team replies within 1 business day, Monday to Friday, and if a technical issue genuinely prevents access, it's covered under our refund policy.",
  },
  {
    q: "Can I resume a course later if I don't finish it in one sitting?",
    a: "Yes. Every course is self-paced, so you can log out at any point and pick up exactly where you left off whenever suits you.",
  },
  {
    q: "How do I contact educateU support?",
    a: "Email support@educateu.com, or use the details in the Get in Touch section below. Our UK-based team replies within 1 business day, Monday to Friday, 9:00 am to 5:00 pm GMT.",
  },
];

export default function SupportHubPage() {
  return (
    <SiteShell>
      <PageHero
        crumb="Support Hub"
        title={["Support Hub"]}
        intro="Real support team, real people, UK business hours. Find out how enrolling, certificates, course access, refunds and team purchases work at educateU, or search below for a quick answer."
      >
        <a
          href="#faq"
          className="press mt-8 inline-flex items-center gap-3 rounded-full bg-bone py-2 pl-6 pr-2 text-base font-medium text-ink hover:bg-white"
        >
          Search the answers
          <span className="grid size-10 place-items-center rounded-full bg-mint text-ink">
            <Icon name="search" size={18} />
          </span>
        </a>
      </PageHero>

      {/* How it works */}
      <section className="bg-bone py-20 lg:py-32" aria-labelledby="how-title">
        <div className="container-x">
          <SectionHeading id="how-title" title="How it works" lede="From checkout to certificate in six steps, on your schedule." />
          <RevealGroup gap={0.07} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {steps.map((s, i) => (
              <Item key={s.title} className="relative flex flex-col rounded-3xl bg-paper p-7 shadow-[0_0_0_1px_rgba(6,24,11,0.08)]">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-ink text-mint">
                    <Icon name={s.icon} />
                  </span>
                  <span className="font-mono text-xs text-ink/45">STEP {i + 1}</span>
                </div>
                <h3 className="mt-6 font-title text-[24px] leading-[1.15] tracking-[-0.03em] text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink/70">{s.body}</p>
              </Item>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Refund policy */}
      <section id="refund-policy" className="grain relative overflow-hidden bg-forest py-20 text-bone lg:py-28" aria-labelledby="refund-title">
        <div className="container-x relative z-[2] grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading id="refund-title" tone="bone" title="Refund policy" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.6] text-bone/75 lg:text-lg">
                We sell one-off course access, not a subscription. There’s nothing to auto-renew and nothing to cancel.
              </p>
            </Reveal>
          </div>
          <RevealGroup gap={0.1} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            <Item className="rounded-3xl bg-ink/60 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
              <p className="font-title text-[56px] leading-none tracking-[-0.04em] text-mint">14 days</p>
              <p className="mt-4 text-[15px] leading-[1.6] text-bone/80">
                If you’re unhappy with a course, or a technical issue prevents you from accessing it, contact our support team within 14 days of purchase.
              </p>
            </Item>
            <Item className="rounded-3xl bg-ink/60 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
              <span className="grid size-12 place-items-center rounded-xl bg-mint text-ink">
                <Icon name="shield" />
              </span>
              <p className="mt-5 text-[15px] leading-[1.6] text-bone/80">
                Every request is reviewed fairly, case by case, by a real person on our UK-based team.
              </p>
            </Item>
          </RevealGroup>
        </div>
      </section>

      {/* FAQ with search */}
      <section id="faq" className="scroll-mt-24 bg-paper py-20 lg:py-32" aria-labelledby="support-faq-title">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="support-faq-title" className="max-w-[406px] font-title text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1] tracking-[-0.03em] text-ink">
              Frequently asked questions
            </h2>
            <p className="mt-6 max-w-[406px] text-[17px] leading-[25.5px] text-ink/70">
              Quick answers about certificates, refunds, access and buying for a team.
            </p>
          </div>
          <div className="lg:col-span-8">
            <SupportFaq items={faqs} />
          </div>
        </div>
      </section>

      {/* Get in touch */}
      <section className="bg-bone py-20 lg:py-32" aria-labelledby="touch-title">
        <div className="container-x">
          <SectionHeading id="touch-title" title="Get in touch" lede="Still stuck? Our UK-based team is here on weekdays." />
          <RevealGroup gap={0.07} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {contact.map((c) => (
              <Item key={c.title} className="flex flex-col rounded-3xl bg-paper p-7 shadow-[0_0_0_1px_rgba(6,24,11,0.08)]">
                <span className="grid size-12 place-items-center rounded-xl bg-ink text-mint">
                  <Icon name={c.icon} />
                </span>
                <h3 className="mt-6 text-sm font-medium leading-5 text-ink/60">{c.title}</h3>
                {c.href ? (
                  <a href={c.href} className="mt-1 font-title text-[22px] leading-[1.2] tracking-[-0.03em] text-ink transition-colors hover:text-green">
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-1 font-title text-[22px] leading-[1.2] tracking-[-0.03em] text-ink">{c.value}</p>
                )}
                <p className="mt-3 text-[14px] leading-[1.55] text-ink/65">{c.body}</p>
              </Item>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}
