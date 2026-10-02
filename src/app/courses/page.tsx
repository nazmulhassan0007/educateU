import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBand } from "@/components/site/CtaBand";
import { Icon, type IconName } from "@/components/site/Icon";
import { Item, Reveal, RevealGroup } from "@/components/motion/Reveal";
import { CourseExplorer } from "@/components/pages/CourseExplorer";
import { ReviewMarquee } from "@/components/pages/ReviewMarquee";
import { ArchStack } from "@/components/site/ArchStack";

export const metadata: Metadata = {
  title: "Explore Our Courses | educateU Business",
  description:
    "Every course is CPD accredited with your certificate included and instant access the moment you enrol. No subscription: browse, buy, and start straight away.",
};

const reasons: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "trend",
    title: "Proven outcomes",
    body: "Our courses are designed with practical applications in mind, so you can apply what you learn directly to your career or personal development.",
  },
  {
    icon: "layers",
    title: "Ongoing resources",
    body: "After completing the course, you’ll have access to additional resources, including updates on industry trends and further learning opportunities.",
  },
  {
    icon: "award",
    title: "Certification upon completion",
    body: "Receive a recognised certificate on completion, enhancing your professional credentials and showing your commitment to continuous learning.",
  },
  {
    icon: "monitor",
    title: "Flexible learning environment",
    body: "Study at your own pace and on your own schedule. Whether you learn in short bursts or longer sessions, every course fits your lifestyle.",
  },
];

export default function CoursesPage() {
  return (
    <SiteShell>
      <PageHero
        crumb="Courses"
        title={["Explore online", "CPD courses."]}
        accentLine={1}
        aside={
          <ArchStack
            images={[
              { src: "/images/courses/emergency-first-aid.png", alt: "" },
              { src: "/images/courses/fire-safety-awareness.png", alt: "Fire Safety Awareness course" },
              { src: "/images/courses/gdpr.png", alt: "" },
            ]}
          />
        }
        intro="Every course here is CPD accredited with your certificate included and instant access the moment you enrol. No subscription: browse, buy, and start straight away."
      />

      <CourseExplorer />

      <section className="bg-bone py-20 lg:py-32" aria-labelledby="why-courses-title">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading id="why-courses-title" title="Why choose our courses" />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-ink/70">
                  At educateU, we empower lifelong learners through affordable, accessible courses. Our mission is to help you grow professionally without barriers.
                </p>
              </Reveal>
            </div>
          </div>
          <RevealGroup gap={0.1} className="border-b border-ink/12 lg:col-span-7">
            {reasons.map((r) => (
              <Item
                key={r.title}
                className="group grid grid-cols-[56px_1fr] gap-x-6 border-t border-ink/12 py-8 transition-colors duration-500 lg:py-10"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-ink text-mint transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:-rotate-6 group-hover:scale-105">
                  <Icon name={r.icon} />
                </span>
                <div>
                  <h3 className="font-title text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.05] tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-green">
                    {r.title}
                  </h3>
                  <p className="mt-3 max-w-[520px] text-[16px] leading-[1.6] text-ink/70">{r.body}</p>
                </div>
              </Item>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-bone pb-20 lg:pb-32" aria-labelledby="reviews-title">
        <div className="container-x">
          <SectionHeading id="reviews-title" title="What our learners say" lede="Hear directly from the learners who’ve completed our courses." />
        </div>
        <ReviewMarquee />
      </section>

      <CtaBand />
    </SiteShell>
  );
}
