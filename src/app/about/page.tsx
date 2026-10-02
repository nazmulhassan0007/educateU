import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBand } from "@/components/site/CtaBand";
import { Icon, type IconName } from "@/components/site/Icon";
import { Item, Reveal, RevealGroup } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About Us | educateU Business",
  description:
    "educateU is an online learning platform built to make UK-accredited education more accessible, flexible and straightforward.",
};

const pillars: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "goal",
    title: "Our mission",
    body: "To make quality education accessible, achievable and aligned with today's professional landscape. We're here to help people shape their own success through learning, improve the overall learner experience, and give every learner the individual support they need to succeed with confidence and clarity.",
  },
  {
    icon: "eye",
    title: "Vision",
    body: "To make high-quality, UK-accredited education globally accessible by connecting students, universities and employers, delivering flexible online learning that empowers growth and removes barriers to UK-recognised qualifications.",
  },
  {
    icon: "gem",
    title: "Our values",
    body: "To lead the way in accessible, globally recognised online learning, creating a world where every learner has the opportunity to learn, grow and succeed, regardless of their background or location.",
  },
];

const why: { icon: IconName; title: string; body: string }[] = [
  { icon: "rocket", title: "Clear enrolment with instant access", body: "Get started in minutes and begin learning without delays." },
  { icon: "calendar", title: "Flexible learning that fits around work and life", body: "Learn on your schedule, from anywhere, anytime." },
  { icon: "award", title: "Transparent outcomes and certification", body: "Know what you’ll achieve and earn certifications you can trust." },
];

const audiences: { icon: IconName; title: string }[] = [
  { icon: "briefcase", title: "Working professionals" },
  { icon: "shuffle", title: "Career changers" },
  { icon: "sprout", title: "Early-career professionals" },
  { icon: "globe", title: "International learners" },
];

const commitments: { icon: IconName; title: string }[] = [
  { icon: "trend", title: "Career-focused progression" },
  { icon: "layers", title: "Industry-relevant content" },
  { icon: "support", title: "Dedicated learner support" },
  { icon: "tag", title: "Transparent & fair pricing" },
  { icon: "monitor", title: "Flexible online access" },
  { icon: "spark", title: "Seamless digital experience" },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        crumb="About us"
        title={["Who we are"]}
        intro="educateU is an online learning platform built to make UK-accredited education more accessible, flexible and straightforward."
      />

      {/* Who we are + mission, vision, values */}
      <section className="bg-bone py-20 lg:py-32" aria-labelledby="purpose-title">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[800/560] overflow-hidden rounded-[28px] bg-ink/10">
              <Image src="/images/pages/who-we-are.jpg" alt="Learners studying together with educateU" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <h2 id="purpose-title" className="font-title text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1] tracking-[-0.03em] text-ink">
              Clear, affordable learning that fits real working lives.
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-ink/70 lg:text-lg">
                Our goal is to provide clear, affordable, self-serve learning that fits into real lives and real working schedules.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealGroup gap={0.1} className="container-x mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-24">
          {pillars.map((p, i) => (
            <Item
              key={p.title}
              className={`flex flex-col rounded-[28px] p-8 lg:p-10 ${i === 0 ? "bg-ink text-bone" : "bg-paper text-ink shadow-[0_0_0_1px_rgba(6,24,11,0.08)]"}`}
            >
              <span className={`grid size-12 place-items-center rounded-xl ${i === 0 ? "bg-mint text-ink" : "bg-ink text-mint"}`}>
                <Icon name={p.icon} />
              </span>
              <h3 className="mt-8 font-title text-[28px] leading-[1.1] tracking-[-0.03em]">{p.title}</h3>
              <p className={`mt-4 text-[15px] leading-[1.65] ${i === 0 ? "text-bone/75" : "text-ink/70"}`}>{p.body}</p>
            </Item>
          ))}
        </RevealGroup>
      </section>

      {/* Why educateU */}
      <section className="grain relative overflow-hidden bg-forest py-20 text-bone lg:py-32" aria-labelledby="why-title">
        <div className="container-x relative z-[2] grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="why-title" tone="bone" title="Why educateU?" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-bone/75 lg:text-lg">
                Many online learning platforms make simple learning harder than it needs to be.
              </p>
            </Reveal>
            <RevealGroup gap={0.1} delay={0.15} className="mt-10 flex flex-col gap-6">
              {why.map((w) => (
                <Item key={w.title} className="flex gap-5 border-t border-white/12 pt-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint text-ink">
                    <Icon name={w.icon} size={20} />
                  </span>
                  <div>
                    <h3 className="font-title text-[22px] leading-[1.2] tracking-[-0.03em]">{w.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.55] text-bone/70">{w.body}</p>
                  </div>
                </Item>
              ))}
            </RevealGroup>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2 aspect-[800/420] overflow-hidden rounded-[28px]">
                <Image src="/images/pages/why-top.jpg" alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
              </div>
              <div className="relative aspect-[500/333] overflow-hidden rounded-[28px]">
                <Image src="/images/pages/why-bottom-left.jpg" alt="" fill sizes="(min-width:1024px) 27vw, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-[500/333] overflow-hidden rounded-[28px]">
                <Image src="/images/pages/why-bottom-right.jpg" alt="" fill sizes="(min-width:1024px) 27vw, 50vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-paper py-20 lg:py-32" aria-labelledby="audience-title">
        <div className="container-x">
          <SectionHeading
            id="audience-title"
            title="Who educateU is for"
            lede="Courses are written in plain, professional language and are suitable for learners with varied backgrounds and experience levels."
          />
          <RevealGroup gap={0.07} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {audiences.map((a) => (
              <Item
                key={a.title}
                className="group flex items-center gap-4 rounded-3xl bg-bone p-6 shadow-[0_0_0_1px_rgba(6,24,11,0.08)] transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(6,24,11,0.1),0_24px_40px_-28px_rgba(6,24,11,0.35)]"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-mint">
                  <Icon name={a.icon} />
                </span>
                <h3 className="font-title text-[22px] leading-[1.15] tracking-[-0.03em] text-ink">{a.title}</h3>
              </Item>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Commitment */}
      <section className="bg-bone py-20 lg:py-32" aria-labelledby="commitment-title">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="commitment-title" title="Our commitment" />
            <Reveal delay={0.1}>
              <p className="mt-6 font-title text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.2] tracking-[-0.03em] text-green">
                Accessible. Professional. Built for real-world growth.
              </p>
              <p className="mt-4 text-[17px] leading-[1.6] text-ink/70">When you choose educateU, you can expect:</p>
            </Reveal>
          </div>
          <RevealGroup gap={0.06} className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-2 lg:col-span-7">
            {commitments.map((c) => (
              <Item key={c.title} className="flex items-center gap-4 bg-paper p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-mint">
                  <Icon name={c.icon} size={20} />
                </span>
                <span className="font-title text-[20px] leading-[1.2] tracking-[-0.03em] text-ink">{c.title}</span>
              </Item>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}
