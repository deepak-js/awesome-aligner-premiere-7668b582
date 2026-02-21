import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Shield, CreditCard, Banknote, HeartHandshake, ArrowRight, BadgeIndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroGradientBg from '@/assets/hero-gradient-bg.jpeg';

const emiOptions = [
  { duration: "6 Months", monthly: "₹5,000", total: "₹30,000" },
  { duration: "9 Months", monthly: "₹3,889", total: "₹35,000" },
  { duration: "12 Months", monthly: "₹3,333", total: "₹40,000" },
  { duration: "18 Months", monthly: "₹2,778", total: "₹50,000" },
];

const benefits = [
  {
    icon: BadgeIndianRupee,
    title: "Transparent Pricing",
    description: "No hidden charges. The price you see is the price you pay, inclusive of aligners, retainers, and follow-ups.",
  },
  {
    icon: CreditCard,
    title: "Easy EMI Options",
    description: "We partner with leading EMI providers to offer 0% and low-interest EMI plans from 6 to 18 months.",
  },
  {
    icon: HeartHandshake,
    title: "Insurance Coordination",
    description: "We coordinate with your dental insurance provider to help you maximize your coverage benefits.",
  },
  {
    icon: Shield,
    title: "Money-Back Guarantee",
    description: "Not satisfied? Get a full refund within 30 days of starting treatment. No questions asked.",
  },
];

const faqs = [
  {
    question: "What is the total cost of Awesome Aligners treatment?",
    answer: "Treatment costs range from ₹25,000 to ₹80,000 depending on the complexity of your case. You'll receive an exact quote after your free consultation and 3D scan.",
  },
  {
    question: "What EMI options are available?",
    answer: "We offer flexible EMI plans from 6 to 18 months through our partner finance providers. Both 0% interest and low-interest options are available depending on the tenure.",
  },
  {
    question: "Does dental insurance cover clear aligners?",
    answer: "Many dental insurance plans cover orthodontic treatment including clear aligners. We'll coordinate with your insurance provider to help you claim the maximum benefit.",
  },
  {
    question: "How does the money-back guarantee work?",
    answer: "If you're not satisfied with the fit or quality of your aligners within 30 days of receiving them, we'll provide a complete refund. Simply contact our support team to initiate the process.",
  },
  {
    question: "Are there any hidden charges?",
    answer: "Absolutely not. Your treatment cost includes all aligners, retainers, 3D scanning, treatment planning, and regular check-ups. There are zero hidden fees.",
  },
  {
    question: "Can I pay in full and get a discount?",
    answer: "Yes! Patients who pay the full amount upfront receive a 10% discount on their total treatment cost.",
  },
];

const Pricing = () => {
  return (
    <main className="min-h-screen">
      <SEOHead
        title="Clear Aligner Pricing & EMI Plans | Awesome Aligners"
        description="Affordable clear aligner treatment starting from ₹25,000. Flexible EMI options, insurance coordination, and 30-day money-back guarantee."
        canonical="https://awesome-aligner-premiere.lovable.app/pricing"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Awesome Aligners Clear Aligner Treatment",
          "provider": { "@type": "Organization", "name": "Awesome Aligners" },
          "description": "Premium clear aligner treatment starting from ₹25,000",
          "areaServed": "India",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": "25000",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "minPrice": "25000",
              "maxPrice": "80000",
              "priceCurrency": "INR"
            }
          }
        }}
      />
      <Header />

      {/* Hero Section - Dark Blue Gradient */}
      <section
        className="relative pt-32 pb-20 md:pb-28 overflow-hidden"
        style={{
          backgroundImage: `url(${heroGradientBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">
            Simple & Transparent
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Affordable Smile Transformation
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Premium clear aligners starting from <span className="font-bold text-white">₹25,000</span>. Flexible EMI options, insurance coordination & guaranteed money-back promise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero" asChild>
              <Link to="/contact">Book Free Consultation <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button size="lg" variant="heroOutline" onClick={() => {
              document.getElementById('emi-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              View EMI Plans
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What's Included in Your Treatment
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              One simple price. Everything included. No surprises.
            </p>
          </div>

          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl md:text-3xl">Complete Aligner Treatment</CardTitle>
              <div className="flex items-baseline justify-center gap-2 mt-4">
                <span className="text-lg text-muted-foreground">Starting from</span>
                <span className="text-5xl md:text-6xl font-bold text-primary">₹25,000</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Exact price based on your case complexity · Free consultation
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  "Custom clear aligners (full set)",
                  "3D digital scanning & treatment plan",
                  "Premium retainers included",
                  "Regular progress check-ups",
                  "Doctor-supervised treatment",
                  "Refinement aligners if needed",
                  "Dedicated care coordinator",
                  "30-day money-back guarantee",
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button size="lg" asChild>
                  <Link to="/contact">Get Your Exact Quote (Free)</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Awesome Aligners
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center border-none shadow-md">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Options */}
      <section id="emi-section" className="py-16 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <Banknote className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Flexible Monthly Payment Plans
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've partnered with leading EMI providers to make your smile journey affordable. Choose a plan that fits your budget.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {emiOptions.map((option) => (
              <Card key={option.duration} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{option.duration} EMI</p>
                  <p className="text-3xl font-bold text-primary mb-1">{option.monthly}</p>
                  <p className="text-xs text-muted-foreground">/month</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">Total: {option.total}*</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            *EMI amounts are indicative. Actual amount depends on your treatment plan. 0% interest options available on select tenures.
          </p>
        </div>
      </section>

      {/* Money-Back Guarantee */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            100% Money-Back Guarantee
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            We're confident you'll love your aligners. If you're not completely satisfied within 30 days of receiving your first set, we'll refund your full payment. No questions asked.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link to="/contact">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pricing FAQs
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(${heroGradientBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Smile Journey?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Book a free consultation today. Get your 3D scan, exact pricing, and personalised treatment plan, all at no cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero" asChild>
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
            <Button size="lg" variant="heroOutline" asChild>
              <Link to="/contact">Talk to an Expert</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Pricing;
