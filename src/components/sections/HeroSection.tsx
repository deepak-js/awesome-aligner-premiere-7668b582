import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-smiles.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-200px)]">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-primary-foreground/90 text-sm font-medium">
                Trusted by 10,000+ patients worldwide
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Your Smile,
              <br />
              <span className="text-gradient">Aligned to Perfection.</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg leading-relaxed">
              World-class clear aligners designed for comfort, precision, and confidence. Experience the future of orthodontic care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group">
                Get a Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="heroOutline" size="xl">
                Become a Doctor
              </Button>
            </div>

            <button className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors group">
              <span className="text-sm font-medium">Take the Smile Assessment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Content - Image */}
          <div className="relative animate-fade-in delay-200">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Happy patients with beautiful smiles"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>

            {/* Floating stats cards */}
            <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 animate-fade-in-up delay-300">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Patient Satisfaction</div>
            </div>

            <div className="absolute -top-6 -right-6 glass-card rounded-2xl p-4 animate-fade-in-up delay-400">
              <div className="text-3xl font-bold text-secondary">6-12</div>
              <div className="text-sm text-muted-foreground">Months Average</div>
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
    </section>
  );
};

export default HeroSection;
