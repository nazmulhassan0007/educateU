import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { ArchStack } from "@/components/site/ArchStack";
import { WordScrub } from "@/components/site/WordScrub";
import { WordMarquee } from "@/components/site/WordMarquee";
import { Icon, type IconName } from "@/components/site/Icon";
import { Item, Reveal, RevealGroup } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { AudienceList, type Audience } from "@/components/pages/AudienceList";

export const metadata: Metadata = {
  title: "About Us | educateU Business",
  description:
    "educateU is an online learning platform built to make UK-accredited education more accessible, flexible and straightforward.",
};

const MISSION =
  "To make quality education accessible, achievable and aligned with today's professional landscape. We're here to help people shape their own success through learning, and give every learner the individual support they need to succeed with confidence and clarity.";

const why: { icon: IconName; title: string; body: string }[] = [
  { icon: "rocket", title: "Clear enrolment with instant access", body: "Get started in minutes and begin learning without delays." },
  { icon: "calendar", title: "Flexible learning that fits around work and life", body: "Learn on your schedule, from anywhere, anytime." },
  { icon: "award", title: "Transparent outcomes and certification", body: "Know what you’ll achieve and earn certifications you can trust." },
];

const audiences: Audience[] = [
  { title: "Working professionals", body: "Keep your skills and compliance current without stepping away from the job.", image: "/images/pages/why-bottom-right.jpg" },
  { title: "Career changers", body: "Build credible, certificated knowledge in a new field at your own pace.", image: "/images/pages/why-top.jpg" },
  { title: "Early-career professionals", body: "Start a CPD record early with workplace-ready courses and a certificate for each one.", image: "/images/pages/who-we-are.jpg" },
  { title: "International learners", body: "Earn UK-recognised certification from anywhere, in plain professional language.", image: "/images/pages/why-bottom-left.jpg" },
];

const commitments = [
  "Career-focused progression",
  "Industry-relevant content",
  "Dedicated learner support",
  "Transparent & fair pricing",
  "Flexible online access",
  "Seamless digital experience",
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        crumb="About us"
        title={["Who", "we are."]}
        accentLine={1}
        intro="educateU is an online learning platform built to make UK-accredited education more accessible, flexible and straightforward."
        aside={
          <ArchStack
            images={[
              { src: "/images/pages/why-bottom-left.jpg", alt: "" },
              { src: "/images/pages/who-we-are.jpg", alt: "Learners studying together with educateU" },
              { src: "/images/pages/why-bottom-right.jpg", alt: "" },
            ]}
          />
        }
      />

      {/* Mission: one statement, read by the scroll */}
      <section className="bg-bone py-24 lg:py-40" aria-labelledby="mission-title">
        <div className="container-x">
          <h2 id="mission-title" className="font-title text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.05] tracking-[-0.03em] text-green">
            Our mission
          </h2>
          <WordScrub className="mt-8 max-w-[22ch] font-title text-[clamp(2.25rem,5.4vw,5.25rem)] leading-[1.02] tracking-[-0.035em] text-ink sm:max-w-[24ch]">
            {MISSION}
          </WordScrub>
        </div>

        {/* Vision and values: editorial pair, no cards */}
        <RevealGroup gap={0.12} className="container-x mt-20 grid grid-cols-1 gap-12 border-t border-ink/12 pt-12 md:grid-cols-2 md:gap-16 lg:mt-28">
          <Item>
            <h3 className="font-title text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.05] tracking-[-0.03em] text-green">Vision</h3>
            <p className="mt-5 max-w-[540px] text-[17px] leading-[1.65] text-ink/75">
              To make high-quality, UK-accredited education globally accessible by connecting students, universities and employers, delivering flexible online learning that empowers growth and removes barriers to UK-recognised qualifications.
            </p>
          </Item>
          <Item>
            <h3 className="font-title text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.05] tracking-[-0.03em] text-green">Our values</h3>
            <p className="mt-5 max-w-[540px] text-[17px] leading-[1.65] text-ink/75">
              To lead the way in accessible, globally recognised online learning, creating a world where every learner has the opportunity to learn, grow and succeed, regardless of their background or location. Our goal is clear, affordable, self-serve learning that fits into real lives and real working schedules.
            </p>
          </Item>
        </RevealGroup>
      </section>

      {/* Why educateU */}
      <section className="grain relative overflow-hidden bg-forest py-20 text-bone lg:py-32" aria-labelledby="why-title">
        <div className="container-x relative z-[2] grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SplitHeading id="why-title" className="font-title text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em]">
              Why educateU?
            </SplitHeading>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-bone/75 lg:text-lg">
                Many online learning platforms make simple learning harder than it needs to be.
              </p>
            </Reveal>
            <RevealGroup gap={0.1} delay={0.15} className="mt-10 flex flex-col">
              {why.map((w) => (
                <Item key={w.title} className="flex gap-5 border-t border-white/12 py-6">
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

      {/* Who it's for: typographic index with a cursor-following arch */}
      <section className="bg-paper py-20 lg:py-32" aria-labelledby="audience-title">
        <div className="container-x">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SplitHeading id="audience-title" className="font-title text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1] tracking-[-0.03em] text-ink">
              Who educateU is for
            </SplitHeading>
            <Reveal delay={0.1}>
              <p className="max-w-[440px] text-[17px] leading-[1.55] text-ink/70">
                Courses are written in plain, professional language and are suitable for learners with varied backgrounds and experience levels.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-12">
            <AudienceList items={audiences} />
          </Reveal>
        </div>
      </section>

      {/* Commitment: the promise, in motion */}
      <section className="overflow-hidden bg-bone py-20 lg:py-28" aria-labelledby="commitment-title">
        <div className="container-x flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SplitHeading id="commitment-title" className="font-title text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1] tracking-[-0.03em] text-ink">
            Our commitment
          </SplitHeading>
          <Reveal delay={0.1}>
            <p className="max-w-[440px] text-[17px] leading-[1.55] text-ink/70">
              <span className="text-green">Accessible. Professional. Built for real-world growth.</span> When you choose educateU, you can expect:
            </p>
          </Reveal>
        </div>
        <ul className="sr-only">
          {commitments.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div aria-hidden className="mt-14 flex flex-col gap-2 text-ink">
          <WordMarquee items={commitments.slice(0, 3)} />
          <WordMarquee items={commitments.slice(3)} reverse className="text-green" />
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}
