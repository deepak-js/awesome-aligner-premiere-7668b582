import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Users, Target, Heart, Shield, Sparkles, CheckCircle, Star } from "lucide-react";
import heroGradientBg from "@/assets/hero-gradient-bg.jpeg";

const values = [
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Leveraging cutting-edge 3D scanning and AI-driven treatment planning for precise, predictable results.",
  },
  {
    icon: Heart,
    title: "Compassion",
    description: "Every smile tells a story. We treat each patient with genuine care and understanding throughout their journey.",
  },
  {
    icon: Target,
    title: "Precision",
    description: "Sub-millimeter accuracy powered by advanced digital workflows ensures beautiful results every time.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Founded and supervised by qualified orthodontists. Your treatment is in expert hands from start to finish.",
  },
];

const whyChooseUs = [
  "Founded & supervised by experienced orthodontists",
  "Orthodontist involvement throughout entire treatment duration",
  "Medical-grade, BPA-free clear aligner material",
  "Advanced 3D scanning & digital treatment planning",
  "Affordable pricing with flexible EMI options",
  "Personalised treatment plans for every patient",
];

const About = () => {
  return (
    <main className="min-h-screen">
      <SEOHead
        title="About Awesome Aligners | Orthodontist-Supervised Clear Aligners India"
        description="Learn about Awesome Aligners, founded and supervised by orthodontists. Premium clear aligner treatment inspired by Invisalign and Spark Aligners, made affordable for India."
        canonical="https://awesome-aligner-premiere.lovable.app/about"
      />
      <Header />

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          backgroundImage: `url(${heroGradientBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full border border-primary-foreground/20 mb-8">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-primary-foreground/90 text-sm font-medium">Our Story</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
            Founded & Supervised by
            <br />
            <span className="text-gradient">Orthodontists</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            At Awesome Aligners, every treatment is planned, guided, and supervised by qualified orthodontists. You get expert care throughout your entire smile transformation journey.
          </p>
        </div>
      </section>

      {/* About the Brand */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                About Awesome Aligners
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                A New Era in Clear Aligner Treatment
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Awesome Aligners was established with a clear goal: making premium clear aligner treatment accessible, affordable, and orthodontist-supervised for every Indian patient.
                </p>
                <p>
                  Inspired by global leaders like <span className="font-semibold text-foreground">Invisalign</span> and <span className="font-semibold text-foreground">Spark Aligners</span>, we combine world-class aligner technology with the expertise of Indian orthodontists who understand local dental needs. Our aligners are crafted using advanced digital workflows, 3D scanning, and medical-grade BPA-free materials — delivering results comparable to international brands at a fraction of the cost.
                </p>
                <p>
                  What sets us apart is our orthodontist-first approach. Unlike many aligner brands that rely on general dentists or remote monitoring alone, every Awesome Aligners case is <span className="font-semibold text-foreground">planned, supervised, and monitored by a qualified orthodontist</span> throughout the entire treatment duration — from your first consultation to your final retainer.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass-card rounded-3xl p-8 hover-lift">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To democratise orthodontic care across India by providing premium, orthodontist-supervised clear aligner treatment at affordable prices. A confident smile shouldn't be a luxury.
                </p>
              </div>

              <div className="glass-card rounded-3xl p-8 hover-lift">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become India's most trusted clear aligner brand, known for clinical excellence, orthodontist involvement, and life-changing smile transformations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              The Awesome Difference
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Awesome Aligners?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combining international-quality aligner technology with the trust of orthodontist-supervised treatment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-card rounded-2xl p-5 shadow-sm hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make and every smile we transform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-6 shadow-sm hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Quality You Can Trust</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Our commitment to clinical excellence and patient safety is at the heart of everything we do.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              'BPA-Free Material',
              'Medical-Grade Aligners',
              'Orthodontist Supervised',
              '3D Digital Planning',
              'ISO Quality Standards',
            ].map((cert) => (
              <div key={cert} className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-full shadow-sm">
                <Star className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
