import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBand } from "@/components/site/CtaBand";
import { Icon, type IconName } from "@/components/site/Icon";
import { Item, Reveal, RevealGroup } from "@/components/motion/Reveal";
import { SupportFaq } from "@/components/pages/SupportFaq";
import { StepJourney } from "@/components/pages/StepJourney";
import { Ticker } from "@/components/site/Ticker";
import { CopyEmail } from "@/components/site/CopyEmail";

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
        title={["Real people,", "real support."]}
        accentLine={1}
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

      {/* How it works: a pinned journey on wide screens, a rail on phones */}
      <section className="bg-bone py-20 lg:py-0" aria-labelledby="how-title">
        <StepJourney steps={steps} />
      </section>

      {/* Refund policy: the window, set as large as the price on the homepage */}
      <section id="refund-policy" className="grain relative scroll-mt-24 overflow-hidden bg-forest py-20 text-bone lg:py-32" aria-labelledby="refund-title">
        <div className="container-x relative z-[2] grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-title text-[clamp(7rem,17vw,15rem)] leading-[0.8] tracking-[-0.05em]" aria-label="14 days">
              <Ticker to={14} />
              <span className="text-mint"> days</span>
            </p>
          </div>
          <div className="lg:col-span-5">
            <SectionHeading id="refund-title" tone="bone" title="Refund policy" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-[1.6] text-bone/80">
                We sell one-off course access, not a subscription. There’s nothing to auto-renew and nothing to cancel.
              </p>
              <p className="mt-4 text-[17px] leading-[1.6] text-bone/80">
                If you’re unhappy with a course, or a technical issue prevents you from accessing it, contact our support team within 14 days of purchase. Every request is reviewed fairly, case by case, by a real person on our UK-based team.
              </p>
            </Reveal>
          </div>
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
          <Reveal delay={0.1} className="mt-12">
            <p className="text-sm font-medium leading-5 text-ink/60">Email support</p>
            <div className="mt-2">
              <CopyEmail email="support@educateu.com" />
            </div>
            <p className="mt-3 max-w-[520px] text-[15px] leading-[1.55] text-ink/65">
              Best for detailed questions, attach screenshots if you’re reporting a technical issue.
            </p>
          </Reveal>
          <RevealGroup gap={0.08} className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-ink/10 md:grid-cols-3">
            {contact.slice(1).map((c) => (
              <Item key={c.title} className="flex flex-col bg-paper p-7">
                <span className="grid size-11 place-items-center rounded-xl bg-ink text-mint">
                  <Icon name={c.icon} size={20} />
                </span>
                <h3 className="mt-5 text-sm font-medium leading-5 text-ink/60">{c.title}</h3>
                {c.href ? (
                  <a href={c.href} className="mt-1 font-title text-[24px] leading-[1.2] tracking-[-0.03em] text-ink transition-colors hover:text-green">
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-1 font-title text-[24px] leading-[1.2] tracking-[-0.03em] text-ink">{c.value}</p>
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
