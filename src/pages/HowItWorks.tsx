import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Search,
  Scan,
  Palette,
  Package,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Users,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Book Your Consultation",
    description: "Start your journey with a free consultation at one of our certified provider locations.",
    details: [
      "Find a certified provider near you",
      "Schedule your free 30-minute consultation",
      "Discuss your smile goals with an expert",
      "Get answers to all your questions",
    ],
    timeline: "Day 1",
  },
  {
    number: "02",
    icon: Scan,
    title: "3D Digital Scan",
    description: "Experience cutting-edge technology with our painless, precision 3D scanning process.",
    details: [
      "Quick 5-minute scanning process",
      "No messy impressions needed",
      "Sub-millimeter accuracy",
      "Instant digital preview of your teeth",
    ],
    timeline: "Day 1",
  },
  {
    number: "03",
    icon: Palette,
    title: "Custom Treatment Plan",
    description: "Our AI-powered software creates a personalized treatment plan just for you.",
    details: [
      "AI-optimized tooth movement planning",
      "See your smile transformation preview",
      "Review timeline and milestones",
      "Approve your treatment plan",
    ],
    timeline: "Week 1",
  },
  {
    number: "04",
    icon: Package,
    title: "Receive Your Aligners",
    description: "Your custom-made aligners arrive, precision-crafted for your unique smile.",
    details: [
      "Medical-grade, BPA-free materials",
      "Complete set of aligners delivered",
      "Detailed wearing instructions",
      "Carrying case and care kit included",
    ],
    timeline: "Week 2-3",
  },
  {
    number: "05",
    icon: Sparkles,
    title: "Reveal Your New Smile",
    description: "Watch your smile transform as you progress through your treatment journey.",
    details: [
      "Change aligners every 1-2 weeks",
      "Regular check-ins with your provider",
      "Track progress with our app",
      "Celebrate your perfect smile!",
    ],
    timeline: "6-12 Months",
  },
];

const technologies = [
  {
    icon: Scan,
    title: "3D Scanning Technology",
    description: "Our iTero-compatible scanners capture 6,000 images per second, creating a precise digital model of your teeth with sub-millimeter accuracy.",
  },
  {
    icon: Cpu,
    title: "AI Treatment Planning",
    description: "Proprietary artificial intelligence analyzes millions of data points to create the most efficient path to your perfect smile.",
  },
  {
    icon: Clock,
    title: "SmartTrack Material",
    description: "Our FDA-approved aligner material applies consistent, gentle force for faster, more comfortable tooth movement.",
  },
];

const HowItWorks = () => {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative hero-gradient pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full border border-primary-foreground/20 mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-primary-foreground/90 text-sm font-medium">The Process</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
            Your Journey to a
            <br />
            <span className="text-gradient">Perfect Smile</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            From consultation to celebration, here's exactly what to expect on your smile transformation journey.
          </p>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center animate-fade-in-up ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon/Number Side */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <step.icon className="w-16 h-16 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-accent-foreground font-bold text-sm">{step.number}</span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-block px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground mb-3">
                    {step.timeline}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-6 text-lg">{step.description}</p>
                  
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powered by Innovation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology at every step ensures precise, predictable results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={tech.title}
                className="bg-card rounded-3xl p-8 shadow-sm hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <tech.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{tech.title}</h3>
                <p className="text-muted-foreground">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Partnership */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Expert Care</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Guided by Certified Professionals
              </h2>
              
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                Every step of your journey is supervised by certified orthodontic professionals who ensure your treatment stays on track and delivers exceptional results.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "500+ certified providers nationwide",
                  "Regular progress monitoring",
                  "Personalized adjustments as needed",
                  "Expert support throughout treatment",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Button asChild size="lg">
                <Link to="/contact">
                  Find a Provider Near You
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "500+", label: "Certified Providers" },
                { value: "10K+", label: "Smiles Transformed" },
                { value: "98%", label: "Patient Satisfaction" },
                { value: "50+", label: "Countries Served" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg max-w-2xl mx-auto">
            Take the first step towards your perfect smile today. Book your free consultation and see your transformation preview.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl">
              Book Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/faq">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HowItWorks;
