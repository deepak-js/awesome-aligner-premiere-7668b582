import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import ValueProposition from "@/components/sections/ValueProposition";
import ProcessSteps from "@/components/sections/ProcessSteps";
import BeforeAfter from "@/components/sections/BeforeAfter";
import QuizCTA from "@/components/sections/QuizCTA";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ValueProposition />
      <ProcessSteps />
      <BeforeAfter />
      <QuizCTA />
      <Footer />
    </main>
  );
};

export default Index;
