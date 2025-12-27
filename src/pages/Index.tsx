import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import ValueProposition from "@/components/sections/ValueProposition";
import TrustBadgesSection from "@/components/sections/TrustBadgesSection";
import ProcessSteps from "@/components/sections/ProcessSteps";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BeforeAfter from "@/components/sections/BeforeAfter";
import QuizCTA from "@/components/sections/QuizCTA";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ValueProposition />
      <TrustBadgesSection />
      <ProcessSteps />
      <TestimonialsSection />
      <BeforeAfter />
      <QuizCTA />
      <Footer />
    </main>
  );
};

export default Index;
