import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-smile-main.jpg";
import diverseSmiles from "@/assets/diverse-smiles.jpg";
import heroGradientBg from "@/assets/hero-gradient-bg.jpeg";
import QuizModal from "@/components/quiz/QuizModal";

const HeroSection = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroGradientBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-200px)]">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-primary-foreground/90 text-sm font-medium">
                Premium Clear Aligner Technology
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Your Smile,
              <br />
              <span className="text-gradient">Aligned to Perfection.</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg leading-relaxed">
              World-class clear aligners designed for comfort, precision, and confidence. Experience the future of orthodontic care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group" asChild>
                <Link to="/contact">
                  Get a Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/for-doctors">Become a Doctor</Link>
              </Button>
            </div>

            <button 
              onClick={() => setIsQuizOpen(true)}
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                <Play className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm font-medium">Take the Smile Assessment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Content - Image */}
          <div className="relative animate-fade-in delay-200">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Happy patient with beautiful smile wearing clear aligners"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>

            {/* Floating feature cards */}
            <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 animate-fade-in-up delay-300">
              <div className="text-2xl font-bold text-primary">FDA Cleared</div>
              <div className="text-sm text-muted-foreground">Safe & Approved</div>
            </div>

            <div className="absolute -top-6 -right-6 glass-card rounded-2xl p-4 animate-fade-in-up delay-400">
              <div className="text-2xl font-bold text-secondary">6-12 mo</div>
              <div className="text-sm text-muted-foreground">Average Treatment</div>
            </div>
          </div>
        </div>

        {/* Diverse Patients Row */}
        <div className="mt-16 pt-16 border-t border-primary-foreground/10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img 
                src={diverseSmiles} 
                alt="Diverse group of happy patients" 
                className="w-64 h-40 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-primary-foreground/60 text-sm mb-2">Join our global community</p>
              <p className="text-primary-foreground text-xl font-semibold">
                Patients from all backgrounds trust Awesome Aligners for their smile journey
              </p>
            </div>
            <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
              <Button variant="heroGhost" size="sm" asChild>
                <Link to="/results">View Success Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>

      {/* Quiz Modal */}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </section>
  );
};

export default HeroSection;
