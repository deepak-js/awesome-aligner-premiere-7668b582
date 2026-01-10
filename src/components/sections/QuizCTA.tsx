import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import QuizModal from "@/components/quiz/QuizModal";

const benefits = [
  "Quick 30-second assessment",
  "Personalized recommendation",
  "No commitment required",
];

const QuizCTA = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <>
      <section className="py-24 hero-gradient relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full border border-primary-foreground/20 mb-8">
            <span className="text-primary-foreground/90 text-sm font-medium">
              Free Smile Assessment
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            Not sure if you're a candidate?
            <br />
            <span className="text-primary-foreground/80">Take our 30-second assessment.</span>
          </h2>

          <p className="text-lg text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
            Find out if clear aligners are right for you with our quick, easy assessment. 
            Get personalized results instantly.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground/80 text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          <Button 
            variant="hero" 
            size="xl" 
            className="group"
            onClick={() => setIsQuizOpen(true)}
          >
            Start Quiz
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
};

export default QuizCTA;
