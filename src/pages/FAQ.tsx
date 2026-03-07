import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const faqCategories = [
  { id: "how-it-works", label: "How It Works" },
  { id: "patients", label: "Patients" },
  { id: "comparison", label: "Competition" },
  { id: "product", label: "Product" },
  { id: "cost", label: "Cost" },
  { id: "company", label: "Company" },
];

const faqs = {
  "how-it-works": [
    {
      question: "How do Awesome Aligners work?",
      answer: "Awesome Aligners are custom-made, nearly invisible plastic trays that gradually move your teeth into place. You wear a series of aligners, each slightly different from the last. Each set is worn for 1 to 2 weeks before switching to the next one.",
    },
    {
      question: "Can I see what my smile will look like before treatment?",
      answer: "Yes! During your first consultation, your doctor uses 3D imaging to show you a digital preview of your expected results. You'll see exactly how your teeth will move before you commit.",
    },
    {
      question: "How does a doctor develop my treatment plan?",
      answer: "Your doctor takes a 3D scan of your teeth and works with our clinical team to design a plan tailored to you. Using advanced software, we map out the precise movements your teeth need to make.",
    },
    {
      question: "How often do patients visit their doctor?",
      answer: "Most patients visit every 6 to 8 weeks to check progress and collect their next sets of aligners. With remote monitoring options, some patients can have fewer in-person visits.",
    },
    {
      question: "How often do patients get new aligners?",
      answer: "Patients typically switch to a new set every 1 to 2 weeks, depending on their treatment plan. Each new aligner continues the gradual movement toward your ideal smile.",
    },
    {
      question: "How does treatment begin?",
      answer: "Treatment begins with a consultation at a certified provider. After your 3D scan and plan approval, your custom aligners are fabricated and sent to your doctor. At your fitting appointment, you receive your first aligners with detailed instructions.",
    },
    {
      question: "How long do I wear the aligners each day?",
      answer: "For best results, wear your aligners 20 to 22 hours per day. Only remove them for eating, drinking anything other than water, and brushing your teeth.",
    },
    {
      question: "Do I sleep with my aligners?",
      answer: "Yes, you should wear your aligners while sleeping. Keeping them in overnight helps maintain continuous tooth movement and keeps your treatment on schedule.",
    },
    {
      question: "Can I take out my aligners to eat and drink?",
      answer: "Yes! Unlike braces, you can remove your aligners to eat and drink. We recommend removing them for anything other than water. Just brush your teeth before putting them back in.",
    },
    {
      question: "How easy is oral hygiene with aligners?",
      answer: "Oral hygiene is actually easier with aligners than with traditional braces. Since they're removable, you can brush and floss normally. Just clean your aligners daily with a soft brush.",
    },
    {
      question: "What do I do if I lose my aligner?",
      answer: "Contact your doctor right away. Depending on your treatment stage, they may advise you to move to the next set or wait for a replacement. It helps to keep your previous set as a backup.",
    },
    {
      question: "How long will treatment take?",
      answer: "Treatment varies by case. Most patients finish in 6 to 12 months for mild to moderate issues. Complex cases may take 12 to 18 months. Your doctor will give you a precise timeline during consultation.",
    },
  ],
  patients: [
    {
      question: "What types of patients are suitable for Awesome Aligners?",
      answer: "Awesome Aligners treat a wide range of issues including crowding, spacing, overbite, underbite, crossbite, and open bite. They work well for mild to moderate cases and many complex ones too.",
    },
    {
      question: "How old do you need to be to use Awesome Aligners?",
      answer: "Awesome Aligners are suitable for teens and adults. For teenagers, we ensure all permanent teeth have come in before starting. There's no upper age limit. Many adults in their 40s, 50s, and beyond use our aligners successfully.",
    },
    {
      question: "Are any patients not suitable for treatment?",
      answer: "Some complex cases may require traditional braces or additional treatment. Patients with severe bite issues or specific jaw conditions may need alternatives. Your doctor will assess suitability during consultation.",
    },
    {
      question: "Do I need to see an orthodontist to get Awesome Aligners?",
      answer: "Yes, every Awesome Aligners treatment is supervised by a certified orthodontist. This ensures proper diagnosis, planning, and monitoring for safe, effective results.",
    },
    {
      question: "Is treatment available through orthodontists?",
      answer: "Yes! Our provider network includes orthodontists who have completed our specialised training. You can choose the provider that fits your needs and location best.",
    },
  ],
  comparison: [
    {
      question: "How is Awesome Aligners different from Invisalign or other brands?",
      answer: "Awesome Aligners combines advanced technology with orthodontist-supervised care at competitive pricing. We use premium materials, AI-powered treatment planning, and offer flexible EMI options designed for Indian patients.",
    },
    {
      question: "Which clear aligner brand works better?",
      answer: "Effectiveness depends more on treatment planning and doctor expertise than the brand itself. Awesome Aligners uses technology comparable to leading global brands, with the advantage of local support and competitive pricing.",
    },
    {
      question: "Why should I choose Awesome Aligners over traditional braces?",
      answer: "Clear aligners are nearly invisible, removable for eating and cleaning, generally more comfortable, and require fewer emergency visits. Many adults prefer them for discretion in professional and social settings.",
    },
  ],
  product: [
    {
      question: "Are Awesome Aligners more comfortable than others?",
      answer: "Our aligners are designed for comfort. Made from smooth, medical-grade plastic with polished edges, they're gentle on your gums and cheeks. Most patients report high comfort levels throughout treatment.",
    },
    {
      question: "Is treatment painful?",
      answer: "Most patients feel mild pressure when starting a new set, which typically fades within 2 to 3 days. This sensation means your teeth are moving. Over-the-counter pain relievers can help if needed.",
    },
    {
      question: "How clear and discreet are the aligners?",
      answer: "Our aligners are nearly invisible. Made from crystal-clear, medical-grade material, most people won't notice you're wearing them. Perfect for professional and social situations.",
    },
    {
      question: "What material is used to make the aligners?",
      answer: "Our aligners are made from medical-grade thermoplastic material designed specifically for orthodontic treatment. It's durable, clear, and provides the right flexibility for gentle, effective tooth movement.",
    },
    {
      question: "Are the aligners BPA-free?",
      answer: "Yes, all Awesome Aligners are 100% BPA-free and made from biocompatible, safe materials. Your health and safety come first.",
    },
  ],
  cost: [
    {
      question: "How much does Awesome Aligner therapy cost?",
      answer: "Treatment typically ranges from ₹25,000 to ₹80,000 depending on complexity. Your doctor will provide a detailed quote after your consultation and 3D scan.",
    },
    {
      question: "Does insurance cover treatment?",
      answer: "Many dental insurance plans cover clear aligners similar to traditional braces. Check with your insurance provider about orthodontic coverage. Our team can help with documentation for claims.",
    },
    {
      question: "Do you offer payment plans or EMI options?",
      answer: "Yes! We offer flexible EMI plans from 6 to 18 months, including 0% interest options. Discuss available plans with your provider during consultation.",
    },
    {
      question: "What's included in the treatment cost?",
      answer: "Your treatment includes: initial consultation and 3D scan, all aligners needed, regular check-ups, refinement aligners if needed, retainers for maintaining results, and ongoing clinical support. No hidden fees.",
    },
  ],
  company: [
    {
      question: "Where can I learn more about Awesome Aligners?",
      answer: "Explore our website, take the smile assessment quiz, or book a free consultation with a certified provider near you. Our team is also available via phone, email, or live chat.",
    },
    {
      question: "Can I see before and after images?",
      answer: "Yes! Visit our Results page to see real patient transformations. These before and after photos showcase the range of cases we've treated.",
    },
    {
      question: "Who manufactures Awesome Aligners?",
      answer: "Awesome Aligners are manufactured using advanced 3D printing and thermoforming technology in our certified production facility. Each aligner is custom-made for your unique treatment plan.",
    },
    {
      question: "How many doctors are in your network?",
      answer: "We have over 500 certified providers across India, and our network keeps growing. Each provider completes our rigorous training programme.",
    },
  ],
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("how-it-works");
  const [searchQuery, setSearchQuery] = useState("");

  const allFaqs = useMemo(() => Object.values(faqs).flat(), []);

  const filteredFaqs = searchQuery
    ? allFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs[activeCategory as keyof typeof faqs];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen">
      <SEOHead
        title="FAQ | Clear Aligner Questions Answered | Awesome Aligners"
        description="Get answers to common questions about clear aligner treatment, pricing, care, and more. Everything you need to know about Awesome Aligners."
        canonical="https://awesomealigners.in/faq"
        ogImage="https://awesomealigners.in/og-image.jpg"
        structuredData={faqStructuredData}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative hero-gradient pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full border border-primary-foreground/20 mb-8">
            <HelpCircle className="w-4 h-4 text-accent" />
            <span className="text-primary-foreground/90 text-sm font-medium">Help Center</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
            Frequently Asked
            <br />
            <span className="text-gradient">Questions</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed mb-8 animate-fade-in-up delay-100">
            Find answers to the most common questions about clear aligner treatment, pricing, and care.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative animate-fade-in-up delay-200">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for answers..."
              className="pl-12 h-14 bg-background text-foreground rounded-2xl border-0 shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          {!searchQuery && (
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}

          {searchQuery && (
            <div className="mb-8 text-center">
              <p className="text-muted-foreground">
                Found {filteredFaqs.length} results for "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-primary hover:underline text-sm mt-2"
              >
                Clear search
              </button>
            </div>
          )}

          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl px-6 border-none shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Can't find what you're looking for? Our friendly team is happy to help with any questions about your smile journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Book a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FAQ;
