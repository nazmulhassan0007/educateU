import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { HeroLetters } from "@/components/v2/HeroLetters";
import { Pricing } from "@/components/Pricing";
import { Subjects } from "@/components/Subjects";
import { PopularCourses } from "@/components/PopularCourses";
import { HowItWorks } from "@/components/HowItWorks";
import { TeamCalculator } from "@/components/TeamCalculator";
import { Testimonials } from "@/components/Testimonials";
import { FaqReader } from "@/components/v2/FaqReader";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "educateU Business — Version 2",
};

/** Version 2: the daylight "letters" hero and the FAQ reader, with every other section shared with version 1. */
export default function HomeV2() {
  return (
    <div id="top" className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <HeroLetters />
        <Pricing />
        <Subjects />
        <PopularCourses />
        <HowItWorks />
        <TeamCalculator />
        <Testimonials />
        <FaqReader />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
