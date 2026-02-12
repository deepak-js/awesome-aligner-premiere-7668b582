import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ComparisonSection from "@/components/sections/ComparisonSection";
import { Button } from "@/components/ui/button";
import {
  Search,
  Scan,
  Package,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Users,
  Clock,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

// Import step images
import consultationImg from "@/assets/stage-1-consultation.png";
import scanImg from "@/assets/stage-2-3d-scan.png";
import fabricationImg from "@/assets/stage-3-fabrication.png";
import receiveImg from "@/assets/stage-4-receive-aligners.png";
import progressImg from "@/assets/stage-5-progress.png";
import smileImg from "@/assets/stage-6-perfect-smile.png";
import retentionImg from "@/assets/stage-7-retention.jpg";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Consultation & Pre-Qualification",
    description: "Clinical evaluation of teeth, bite, gums, and oral health. Alignment goals clarified. Case suitability confirmed.",
    details: [
      "Complete oral health assessment",
      "Teeth, bite, and gum evaluation",
      "Discuss your smile goals",
      "Confirm case suitability",
    ],
    timeline: "Stage 1",
    image: consultationImg,
  },
  {
    number: "02",
    icon: Scan,
    title: "Digital Scan & Treatment Planning",
    description: "High-precision 3D scans capture exact tooth positions. A customized, step-by-step movement plan is digitally designed and approved.",
    details: [
      "High-precision 3D scanning",
      "Capture exact tooth positions",
      "Customized movement plan design",
      "Digital approval process",
    ],
    timeline: "Stage 2",
    image: scanImg,
  },
  {
    number: "03",
    icon: Package,
    title: "Aligner Fabrication",
    description: "Custom clear aligners manufactured using advanced aligner technology based on the approved treatment plan.",
    details: [
      "Advanced manufacturing technology",
      "Custom-fit for your teeth",
      "Based on approved treatment plan",
      "Medical-grade materials",
    ],
    timeline: "Stage 3",
    image: fabricationImg,
  },
  {
    number: "04",
    icon: Clock,
    title: "Receiving & Wearing Aligners",
    description: "First set of aligners delivered. Aligners worn 20–22 hours per day. New sets changed every 1–2 weeks as prescribed.",
    details: [
      "First aligner set delivered",
      "Wear 20–22 hours per day",
      "Change sets every 1–2 weeks",
      "Follow prescribed schedule",
    ],
    timeline: "Stage 4",
    image: receiveImg,
  },
  {
    number: "05",
    icon: Eye,
    title: "Follow-Up & Progress Monitoring",
    description: "Periodic reviews track progress against the plan. Adjustments or refinements made if required to stay on course.",
    details: [
      "Periodic progress reviews",
      "Track against treatment plan",
      "Adjustments when needed",
      "Stay on course to goals",
    ],
    timeline: "Stage 5",
    image: progressImg,
  },
  {
    number: "06",
    icon: Sparkles,
    title: "Finishing & Refinement",
    description: "Final aligner stages complete tooth alignment and bite correction to the planned outcome.",
    details: [
      "Final alignment stages",
      "Complete bite correction",
      "Achieve planned outcome",
      "Perfect your smile",
    ],
    timeline: "Stage 6",
    image: smileImg,
  },
  {
    number: "07",
    icon: Sparkles,
    title: "Retention Protocol",
    description: "Custom retainers are provided to maintain your new smile. Follow the prescribed retention schedule to ensure long-lasting results.",
    details: [
      "Custom retainer fitting",
      "Prescribed wear schedule",
      "Periodic retention check-ups",
      "Long-term smile maintenance",
    ],
    timeline: "Stage 7",
    image: retentionImg,
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
            Awesome Aligners
            <br />
            <span className="text-gradient">End-to-End Treatment Process</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            Your complete journey from consultation to a perfect smile, guided by certified professionals every step of the way.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Timeline Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Treatment Timeline
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A step-by-step journey to your perfect smile, typically completed in 6-12 months.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line (Desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-full" />

            {/* Steps */}
            <div className="space-y-12 lg:space-y-0">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:py-12 ${
                    index % 2 === 0 ? '' : 'lg:direction-rtl'
                  }`}
                >
                  {/* Timeline Node (Desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-background">
                      <span className="text-primary-foreground font-bold text-xl">{step.number}</span>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className={`mb-6 lg:mb-0 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8 lg:order-2'}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      
                      {/* Mobile Step Number */}
                      <div className="lg:hidden absolute top-4 left-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                          <span className="text-primary-foreground font-bold">{step.number}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`${index % 2 === 0 ? 'lg:pl-8 lg:text-left' : 'lg:pr-8 lg:text-right lg:order-1'}`}>
                    <div className={`inline-block px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground mb-3`}>
                      {step.timeline}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-6 text-lg">{step.description}</p>
                    
                    <ul className={`space-y-3 ${index % 2 === 0 ? '' : 'lg:flex lg:flex-col lg:items-end'}`}>
                      {step.details.map((detail, i) => (
                        <li key={i} className={`flex items-center gap-3 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
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
        </div>
      </section>

      {/* Comparison Section */}
      <ComparisonSection />

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
