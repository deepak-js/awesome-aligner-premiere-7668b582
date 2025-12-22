import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const faqCategories = [
  { id: "treatment", label: "Treatment" },
  { id: "pricing", label: "Pricing" },
  { id: "process", label: "Process" },
  { id: "care", label: "Aligner Care" },
  { id: "doctors", label: "For Doctors" },
];

const faqs = {
  treatment: [
    {
      question: "How long does treatment typically take?",
      answer: "Treatment duration varies based on the complexity of your case. Most patients complete their treatment in 6-12 months. Minor adjustments may take as little as 3 months, while more complex cases can take up to 18 months. Your certified provider will give you a precise timeline during your consultation.",
    },
    {
      question: "Does wearing aligners hurt?",
      answer: "Most patients experience mild discomfort for the first few days when starting a new set of aligners. This is completely normal and indicates that your teeth are moving. The discomfort typically subsides within 2-3 days. Over-the-counter pain relievers can help if needed.",
    },
    {
      question: "Who is a good candidate for clear aligners?",
      answer: "Clear aligners are effective for treating a wide range of orthodontic issues including crowding, spacing, overbite, underbite, and crossbite. They work best for mild to moderate cases. During your consultation, we'll determine if clear aligners are right for you.",
    },
    {
      question: "Can I eat and drink with my aligners in?",
      answer: "You should remove your aligners before eating or drinking anything other than water. Hot beverages can warp the aligners, and food particles can get trapped, leading to cavities. Always brush your teeth before reinserting your aligners.",
    },
  ],
  pricing: [
    {
      question: "How much do clear aligners cost?",
      answer: "Treatment costs typically range from $2,500 to $5,500 depending on the complexity of your case. This is comparable to or often less than traditional braces. We offer flexible payment plans starting as low as $99/month to make treatment accessible.",
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes! We offer several financing options including monthly payment plans, 0% APR financing for qualified applicants, and flexible payment schedules. We work with major insurance providers and can help you understand your benefits.",
    },
    {
      question: "Does insurance cover clear aligners?",
      answer: "Many dental insurance plans cover clear aligners the same way they cover traditional braces. We recommend checking with your insurance provider about your orthodontic benefits. Our team can also help you understand your coverage.",
    },
    {
      question: "What's included in the treatment cost?",
      answer: "Your treatment includes all aligners needed to complete your case, regular check-ups with your provider, retainers to maintain your results, and 24/7 support throughout your journey. There are no hidden fees.",
    },
  ],
  process: [
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Book a free consultation with a certified provider near you. During your visit, we'll take a 3D scan of your teeth, create your custom treatment plan, and show you a preview of your expected results.",
    },
    {
      question: "How often do I need to visit the doctor?",
      answer: "Most patients visit their provider every 6-8 weeks to check progress and receive new aligners. However, with our remote monitoring option, some patients can extend time between visits while still receiving excellent care.",
    },
    {
      question: "What happens after my treatment is complete?",
      answer: "After completing your aligner treatment, you'll receive custom retainers to maintain your beautiful new smile. We recommend wearing retainers nightly to ensure your teeth stay perfectly aligned.",
    },
    {
      question: "Can I see my results before starting?",
      answer: "Yes! Our advanced 3D treatment planning technology allows you to see a digital preview of your smile transformation before you commit. This helps you visualize your journey and sets clear expectations.",
    },
  ],
  care: [
    {
      question: "How do I clean my aligners?",
      answer: "Clean your aligners daily using a soft toothbrush and clear, anti-bacterial soap or the cleaning crystals we provide. Avoid hot water as it can warp the plastic. Rinse thoroughly before wearing.",
    },
    {
      question: "How many hours a day should I wear my aligners?",
      answer: "For optimal results, wear your aligners 20-22 hours per day. Only remove them for eating, drinking (except water), and brushing your teeth. Consistent wear is crucial for staying on track with your treatment timeline.",
    },
    {
      question: "What if I lose or break an aligner?",
      answer: "Don't worry—it happens! Contact us immediately and we'll help you determine whether to move to your next set or wait for a replacement. Having backup aligners available minimizes treatment delays.",
    },
    {
      question: "Can I play sports with aligners?",
      answer: "Yes, you can participate in most sports while wearing aligners. For contact sports, we recommend wearing a protective mouthguard over your aligners. The aligners actually provide some protection for your teeth.",
    },
  ],
  doctors: [
    {
      question: "How do I become a certified provider?",
      answer: "Join our network of over 500 certified providers. We offer comprehensive training, ongoing support, and access to our advanced treatment planning technology. Contact our doctor partnership team to learn more about the certification process.",
    },
    {
      question: "What training and support do you provide?",
      answer: "We provide extensive initial certification training, access to our clinical advisory team, marketing support, and continuing education opportunities. Our dedicated provider success team is always available to help.",
    },
    {
      question: "What technology do providers have access to?",
      answer: "Certified providers get access to our AI-powered treatment planning software, 3D scanning technology, case management dashboard, and patient communication tools. We continuously update our technology to improve outcomes.",
    },
    {
      question: "What are the benefits of joining the network?",
      answer: "Benefits include increased patient referrals, comprehensive training, marketing support, competitive lab pricing, and access to cutting-edge technology. Join a community of leading orthodontic professionals.",
    },
  ],
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("treatment");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = searchQuery
    ? Object.values(faqs)
        .flat()
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : faqs[activeCategory as keyof typeof faqs];

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
            <HelpCircle className="w-4 h-4 text-accent" />
            <span className="text-primary-foreground/90 text-sm font-medium">Help Center</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
            Questions?
            <br />
            <span className="text-gradient">We've Got Answers</span>
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
          {/* Category Tabs */}
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

          {/* FAQ Accordion */}
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
            Can't find what you're looking for? Our friendly team is here to help you with any questions about your smile journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Book a Free Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FAQ;
