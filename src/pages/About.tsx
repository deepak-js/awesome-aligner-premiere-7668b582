import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, Target, Heart, Shield, Award, Sparkles } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Pioneering the future of clear aligner technology with AI-driven treatment planning.",
  },
  {
    icon: Heart,
    title: "Compassion",
    description: "Every smile tells a story. We treat each patient with genuine care and understanding.",
  },
  {
    icon: Target,
    title: "Precision",
    description: "Sub-millimeter accuracy ensures predictable, beautiful results every time.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Certified doctors and FDA-approved materials you can rely on completely.",
  },
];

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Executive Officer",
    bio: "20+ years in orthodontics, Harvard Medical School graduate",
  },
  {
    name: "Dr. Michael Torres",
    role: "Chief Technology Officer",
    bio: "Former Google engineer, MIT PhD in Biomedical Engineering",
  },
  {
    name: "Dr. Emily Roberts",
    role: "Chief Medical Officer",
    bio: "Board-certified orthodontist, published 50+ research papers",
  },
  {
    name: "James Wilson",
    role: "Chief Operations Officer",
    bio: "15 years scaling healthcare startups globally",
  },
];

const milestones = [
  { year: "2018", title: "Founded", description: "Started with a vision to make perfect smiles accessible" },
  { year: "2019", title: "First 1,000 Patients", description: "Reached our first major patient milestone" },
  { year: "2020", title: "AI Treatment Planning", description: "Launched proprietary AI for treatment optimization" },
  { year: "2021", title: "Doctor Network Expansion", description: "Partnered with 500+ certified providers" },
  { year: "2022", title: "International Launch", description: "Expanded to 15 countries worldwide" },
  { year: "2023", title: "10,000+ Smiles", description: "Transformed over 10,000 smiles globally" },
];

const About = () => {
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
            <Users className="w-4 h-4 text-accent" />
            <span className="text-primary-foreground/90 text-sm font-medium">Our Story</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
            The Story Behind
            <br />
            <span className="text-gradient">Your Perfect Smile</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            Founded by orthodontists frustrated with traditional braces, we set out to create a better way. Today, we're transforming smiles worldwide.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card rounded-3xl p-8 md:p-12 hover-lift">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To make world-class orthodontic care accessible to everyone, everywhere. We believe a confident smile shouldn't be a luxury—it should be a standard. Through innovative technology and compassionate care, we're democratizing dental perfection.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-8 md:p-12 hover-lift">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A world where everyone can smile with confidence. We envision clear aligners becoming the gold standard in orthodontic treatment—comfortable, affordable, and accessible to patients of all ages and backgrounds around the globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
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

      {/* Leadership Team */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Leadership Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              World-class experts committed to transforming the future of orthodontics.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a small startup to a global leader in clear aligner technology.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 animate-fade-in-up ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-card rounded-2xl p-6 shadow-sm inline-block">
                      <div className="text-2xl font-bold text-primary mb-1">{milestone.year}</div>
                      <h3 className="font-semibold text-foreground mb-1">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted & Certified</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Our commitment to excellence is recognized by leading healthcare organizations worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            {['FDA Approved', 'ISO Certified', 'CE Marked', 'ADA Recognized'].map((cert) => (
              <div key={cert} className="flex items-center gap-3 px-6 py-3 bg-muted rounded-full">
                <Award className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">{cert}</span>
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
