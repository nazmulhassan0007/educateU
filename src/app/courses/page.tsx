import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBand } from "@/components/site/CtaBand";
import { Icon, type IconName } from "@/components/site/Icon";
import { Item, RevealGroup } from "@/components/motion/Reveal";
import { CourseExplorer } from "@/components/pages/CourseExplorer";
import { ReviewMarquee } from "@/components/pages/ReviewMarquee";

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
        title={["Explore online", "CPD courses"]}
        intro="Every course here is CPD accredited with your certificate included and instant access the moment you enrol. No subscription: browse, buy, and start straight away."
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {["18 courses", "£15 per course", "Certificate included", "Self-paced"].map((f) => (
            <li key={f} className="rounded-full bg-white/8 px-3.5 py-1.5 text-sm leading-5 text-bone/85 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
              {f}
            </li>
          ))}
        </ul>
      </PageHero>

      <CourseExplorer />

      <section className="bg-bone py-20 lg:py-32" aria-labelledby="why-courses-title">
        <div className="container-x">
          <SectionHeading
            id="why-courses-title"
            title="Why choose our courses"
            lede="At educateU, we empower lifelong learners through affordable, accessible courses. Our mission is to help you grow professionally without barriers."
          />
          <RevealGroup gap={0.08} className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-2 xl:grid-cols-4">
            {reasons.map((r) => (
              <Item key={r.title} className="flex flex-col bg-paper p-7 lg:p-8">
                <span className="grid size-12 place-items-center rounded-xl bg-ink text-mint">
                  <Icon name={r.icon} />
                </span>
                <h3 className="mt-6 font-title text-[24px] leading-[1.15] tracking-[-0.03em] text-ink">{r.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-ink/70">{r.body}</p>
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
