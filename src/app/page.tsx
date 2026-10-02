import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { Subjects } from "@/components/Subjects";
import { PopularCourses } from "@/components/PopularCourses";
import { HowItWorks } from "@/components/HowItWorks";
import { TeamCalculator } from "@/components/TeamCalculator";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Pricing />
        <Subjects />
        <PopularCourses />
        <HowItWorks />
        <TeamCalculator />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
