import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqSection } from "@/components/site/FaqList";
import { Icon } from "@/components/site/Icon";
import { Item, Reveal, RevealGroup } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/pages/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | educateU Business",
  description: "General enquiries about educateU, partnerships, and organisational information. We reply within 1 business day.",
};

const faqs = [
  {
    q: "How do I contact educateU support?",
    a: "Email us at hello@educateU.com or use the contact form on this page. Our team responds during standard UK business hours, Monday to Friday, 9:00am to 5:00pm GMT.",
  },
  {
    q: "Does educateU offer phone support?",
    a: "We don't offer phone-based sales; every course is bought directly online, so there's no need to book a call just to get started. For general enquiries, our team is reachable by email during standard UK business hours.",
  },
  {
    q: "Who can take courses on educateU?",
    a: "educateU courses are open to individual learners and UK businesses alike. Buy a single course for yourself, or use the company purchase option to enrol your whole team at once.",
  },
  {
    q: "How do I enrol in a course?",
    a: "Choose your course, select individual or company purchase, and complete checkout. You'll get instant access straight away, no waiting for a scheduled start date.",
  },
  {
    q: "How do I get a quote for training my team?",
    a: "Use the contact form on this page and select \"Company Training\" as your inquiry type, or email hello@educateU.com with your team size and the courses you're interested in. We'll come back with company pricing and a group booking quote, no sales call required.",
  },
];

const channels = [
  {
    icon: "mail" as const,
    title: "General enquiries",
    body: "For non-learner enquiries or organisational information, you can contact educateU using the details below.",
    email: "hello@educateU.com",
  },
  {
    icon: "handshake" as const,
    title: "Partnerships",
    body: "If you're interested in collaborating with educateU, including content partnerships or organisational learning opportunities, please use the email below.",
    email: "partnerships@educateU.com",
  },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        crumb="Contact us"
        title={["Contact educateU"]}
        intro="We're here to help with general enquiries about educateU, partnerships, and organisational information."
      />

      <section className="bg-bone py-20 lg:py-28" aria-labelledby="talk-title">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Office hours */}
          <Reveal className="lg:col-span-5">
            <div className="relative h-full min-h-[460px] overflow-hidden rounded-[28px] bg-ink">
              <Image src="/images/pages/office-hours.jpg" alt="The educateU support team at work" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover opacity-80" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-bone sm:p-9">
                <span className="grid size-12 place-items-center rounded-xl bg-mint text-ink">
                  <Icon name="clock" />
                </span>
                <h2 className="mt-6 font-title text-[32px] leading-[1.05] tracking-[-0.03em]">Office hours</h2>
                <p className="mt-3 max-w-[360px] text-[15px] leading-[1.55] text-bone/75">
                  Our real support team responds to every enquiry during standard UK business hours:
                </p>
                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/15 pt-5">
                  <div>
                    <dt className="text-[13px] text-bone/55">Days</dt>
                    <dd className="font-title text-[22px] tracking-[-0.03em]">Monday – Friday</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] text-bone/55">Hours</dt>
                    <dd className="font-title text-[22px] tracking-[-0.03em]">9:00 am – 5:00 pm GMT</dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 id="talk-title" className="font-title text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1] tracking-[-0.03em] text-ink">
                Have any questions? <span className="text-green">Let’s talk.</span>
              </h2>
              <p className="mt-4 max-w-[560px] text-[17px] leading-[1.6] text-ink/70">
                Contact us using the form below. Whether you’re asking about a course, a partnership, or training for your team, we reply within 1 business day.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <ContactForm />
            </Reveal>
          </div>
        </div>

        {/* Email channels */}
        <RevealGroup gap={0.1} className="container-x mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16">
          {channels.map((c) => (
            <Item key={c.title} className="flex flex-col rounded-[28px] bg-paper p-8 shadow-[0_0_0_1px_rgba(6,24,11,0.08)] lg:p-10">
              <span className="grid size-12 place-items-center rounded-xl bg-ink text-mint">
                <Icon name={c.icon} />
              </span>
              <h3 className="mt-6 font-title text-[28px] leading-[1.1] tracking-[-0.03em] text-ink">{c.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-ink/70">{c.body}</p>
              <a
                href={`mailto:${c.email}`}
                className="group mt-6 inline-flex w-fit items-center gap-2 font-title text-[22px] tracking-[-0.03em] text-green transition-colors hover:text-ink"
              >
                {c.email}
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </a>
            </Item>
          ))}
        </RevealGroup>
      </section>

      <FaqSection lede="Quick answers about getting in touch with educateU." items={faqs} />
      <CtaBand />
    </SiteShell>
  );
}
