import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Banknote, HeartHandshake, ArrowRight, BadgeIndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroGradientBg from '@/assets/hero-gradient-bg.jpeg';

const benefits = [
  {
    icon: BadgeIndianRupee,
    title: "Transparent Pricing",
    description: "No hidden charges. The price you see is the price you pay, inclusive of aligners, retainers, and follow-ups.",
  },
  {
    icon: CreditCard,
    title: "Easy EMI Options",
    description: "We partner with leading EMI providers to offer 0% and low-interest EMI plans to fit your budget.",
  },
  {
    icon: HeartHandshake,
    title: "Insurance Coordination",
    description: "We coordinate with your dental insurance provider to help you maximize your coverage benefits.",
  },
  {
    icon: Banknote,
    title: "Upfront Discount",
    description: "Pay the full amount upfront and receive a special discount on your total treatment cost.",
  },
];

const faqs = [
  {
    question: "What is the total cost of Awesome Aligners treatment?",
    answer: "Treatment costs vary depending on the complexity of your case. You'll receive an exact quote after your free consultation and 3D scan.",
  },
  {
    question: "What EMI options are available?",
    answer: "We offer flexible EMI plans through our partner finance providers. Both 0% interest and low-interest options are available depending on the tenure.",
  },
  {
    question: "Does dental insurance cover clear aligners?",
    answer: "Many dental insurance plans cover orthodontic treatment including clear aligners. We'll coordinate with your insurance provider to help you claim the maximum benefit.",
  },
  {
    question: "Are there any hidden charges?",
    answer: "Absolutely not. Your treatment cost includes all aligners, retainers, 3D scanning, treatment planning, and regular check-ups. There are zero hidden fees.",
  },
  {
    question: "Can I pay in full and get a discount?",
    answer: "Yes! Patients who pay the full amount upfront receive a special discount on their total treatment cost.",
  },
];

const Pricing = () => {
  return (
    <main className="min-h-screen">
      <SEOHead
        title="Clear Aligner Pricing & EMI Plans | Awesome Aligners"
        description="Affordable clear aligner treatment with flexible EMI options and insurance coordination. Book a free consultation for your exact quote."
        canonical="https://awesomealigners.in/pricing"
        ogImage="https://awesomealigners.in/og-image.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Awesome Aligners Clear Aligner Treatment",
          "provider": { "@type": "Organization", "name": "Awesome Aligners" },
          "description": "Premium clear aligner treatment with flexible payment options",
          "areaServed": "India"
        }}
      />
      <Header />

      {/* Hero Section */}
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
            Premium clear aligners with flexible EMI options and insurance coordination. Get your exact quote with a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero" asChild>
              <Link to="/contact">Book Free Consultation <ArrowRight className="ml-2 w-4 h-4" /></Link>
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
              <p className="text-muted-foreground mt-4 text-lg">
                Get your personalised quote after a free consultation & 3D scan
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