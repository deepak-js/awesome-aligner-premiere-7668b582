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
      answer: "Awesome Aligners are custom-made, virtually invisible plastic aligners that gradually shift your teeth into place. You wear a series of aligners, each slightly different from the last, moving your teeth step by step toward your ideal smile. Each set is worn for 1-2 weeks before moving to the next set in your treatment plan.",
    },
    {
      question: "Can I see what my smile will look like before treatment?",
      answer: "Yes! During your initial consultation, your doctor will use our advanced 3D imaging technology to show you a digital preview of your expected results. You'll see exactly how your teeth will move and what your final smile will look like before you commit to treatment.",
    },
    {
      question: "How does a doctor develop my treatment plan?",
      answer: "Your doctor takes a 3D scan of your teeth and works with our clinical team to design a customized treatment plan. Using advanced software, we map out the precise movements your teeth need to make, and create a series of aligners specifically for your unique smile goals.",
    },
    {
      question: "How often do patients visit their doctor?",
      answer: "Most patients visit their doctor every 6-8 weeks to check progress and receive their next sets of aligners. However, with our remote monitoring options, some patients can have fewer in-person visits while still receiving excellent care and oversight.",
    },
    {
      question: "How often do patients get new aligners?",
      answer: "Patients typically switch to a new set of aligners every 1-2 weeks, depending on their treatment plan. Each new aligner continues the gradual movement of your teeth toward your perfect smile.",
    },
    {
      question: "How does treatment begin?",
      answer: "Treatment begins with a consultation at a certified Awesome Aligners provider. After your 3D scan and treatment plan approval, your custom aligners are fabricated and delivered to your doctor. At your fitting appointment, you'll receive your first aligners and detailed instructions for wear and care.",
    },
    {
      question: "How long do I wear the aligners each day?",
      answer: "For optimal results, you should wear your aligners for 20-22 hours per day. This gives your teeth consistent, gentle pressure to move into position. Only remove them for eating, drinking anything other than water, and brushing your teeth.",
    },
    {
      question: "Do I sleep with my aligners?",
      answer: "Yes, you should wear your aligners while sleeping. Keeping them in overnight ensures continuous tooth movement and helps you stay on track with your treatment timeline.",
    },
    {
      question: "Can I take out my aligners to eat and drink?",
      answer: "Yes! Unlike traditional braces, you can remove your aligners to eat and drink. We recommend removing them for anything other than water to prevent staining and damage. Just remember to brush your teeth before putting them back in.",
    },
    {
      question: "How easy is oral hygiene with aligners?",
      answer: "Oral hygiene is actually easier with aligners than with traditional braces! Since the aligners are removable, you can brush and floss normally. Just clean your aligners daily with a soft brush and rinse them thoroughly.",
    },
    {
      question: "What do I do if I lose my aligner?",
      answer: "If you lose an aligner, contact your doctor immediately. Depending on your treatment stage, they may advise you to move to your next set of aligners or wait for a replacement. It's always good to keep your previous set as a backup.",
    },
    {
      question: "How long will treatment take?",
      answer: "Treatment duration varies based on your individual case. Most patients complete treatment in 6-12 months for mild to moderate cases. More complex cases may take 12-18 months. Your doctor will give you a precise timeline during your consultation.",
    },
  ],
  patients: [
    {
      question: "What types of patients are suitable for Awesome Aligners?",
      answer: "Awesome Aligners are effective for treating a wide range of orthodontic issues including crowding, spacing, overbite, underbite, crossbite, and open bite. They work well for mild to moderate cases and many complex cases. Your doctor will evaluate your specific situation during consultation.",
    },
    {
      question: "How old do you need to be to use Awesome Aligners?",
      answer: "Awesome Aligners are suitable for teens and adults. For teenagers, we ensure all permanent teeth have erupted before starting treatment. There's no upper age limit – many adults in their 40s, 50s, and beyond successfully use our aligners.",
    },
    {
      question: "Are any patients not suitable for treatment?",
      answer: "Some complex orthodontic cases may require traditional braces or additional treatments. Patients with certain dental conditions, severe bite issues, or specific jaw problems may need alternative solutions. Your doctor will assess your suitability during the consultation.",
    },
    {
      question: "Do I need to see a doctor to get Awesome Aligners?",
      answer: "Yes, Awesome Aligners treatment is always supervised by a certified dental professional. This ensures proper diagnosis, treatment planning, and monitoring for safe, effective results. We don't offer direct-to-consumer aligners without professional oversight.",
    },
    {
      question: "Is treatment available through dentists, orthodontists, or both?",
      answer: "Both! Our certified provider network includes general dentists and orthodontists who have completed our specialized training. You can choose the type of provider that best suits your needs and convenience.",
    },
  ],
  comparison: [
    {
      question: "How is Awesome Aligners different from Invisalign or other brands?",
      answer: "Awesome Aligners combines advanced technology with doctor-supervised care at competitive pricing. We use premium materials, AI-powered treatment planning, and provide comprehensive support. Our focus on the Indian market means we understand local needs and offer flexible payment options including EMI.",
    },
    {
      question: "Which clear aligner brand works better?",
      answer: "The effectiveness of clear aligners depends more on the treatment planning and doctor expertise than the brand itself. Awesome Aligners uses cutting-edge technology comparable to leading global brands, with the advantage of local support, competitive pricing, and doctors who understand your specific needs.",
    },
    {
      question: "Why should I choose Awesome Aligners over traditional braces?",
      answer: "Clear aligners offer several advantages: they're virtually invisible, removable for eating and cleaning, generally more comfortable without metal brackets and wires, and require fewer emergency visits. Many adults prefer aligners for their discretion in professional and social settings.",
    },
  ],
  product: [
    {
      question: "Are Awesome Aligners more comfortable than others?",
      answer: "Our aligners are designed with comfort in mind. Made from smooth, medical-grade plastic with polished edges, they're gentle on your gums and cheeks. While any orthodontic treatment involves some pressure, our patients report high comfort levels throughout treatment.",
    },
    {
      question: "Is treatment painful?",
      answer: "Most patients experience mild discomfort or pressure when starting a new set of aligners, which typically subsides within 2-3 days. This sensation means your teeth are moving! Over-the-counter pain relievers can help if needed, and each subsequent aligner change tends to be easier.",
    },
    {
      question: "How clear and discreet are the aligners?",
      answer: "Our aligners are virtually invisible. Made from crystal-clear, medical-grade material, they're designed to be as discreet as possible. Most people won't even notice you're wearing them, making them perfect for professional and social situations.",
    },
    {
      question: "What material is used to make the aligners?",
      answer: "Our aligners are made from FDA-approved, medical-grade thermoplastic material that's specifically designed for orthodontic treatment. It's durable, clear, and provides the right amount of flexibility for gentle, effective tooth movement.",
    },
    {
      question: "Are the aligners BPA-free?",
      answer: "Yes, absolutely. All Awesome Aligners are 100% BPA-free and made from biocompatible, safe materials. Your health and safety are our top priorities.",
    },
  ],
  cost: [
    {
      question: "How much does Awesome Aligner therapy cost?",
      answer: "Treatment costs typically range from ₹50,000 to ₹1,50,000 depending on the complexity of your case. This is often comparable to or less than traditional braces. Your doctor will provide a detailed quote after your consultation and 3D scan.",
    },
    {
      question: "Does insurance cover treatment?",
      answer: "Many dental insurance plans cover clear aligners similar to traditional braces. We recommend checking with your insurance provider about orthodontic coverage. Our team can help you understand your benefits and provide documentation for claims.",
    },
    {
      question: "Do you offer payment plans or EMI options?",
      answer: "Yes! We understand that orthodontic treatment is an investment. We offer flexible payment options including no-cost EMI plans, making your perfect smile affordable. Discuss available options with your provider during consultation.",
    },
    {
      question: "What's included in the treatment cost?",
      answer: "Your treatment includes: initial consultation and 3D scan, all aligners needed for your treatment, regular check-up appointments, refinement aligners if needed, retainers for maintaining your results, and ongoing support from our clinical team. There are no hidden fees.",
    },
  ],
  company: [
    {
      question: "Where can I learn more about Awesome Aligners?",
      answer: "You can explore our website for detailed information, take our smile assessment quiz, or book a free consultation with a certified provider near you. Our team is also available to answer questions via phone, email, or live chat.",
    },
    {
      question: "Can I see before and after images?",
      answer: "Yes! Visit our Results Gallery to see real patient transformations. These before and after photos showcase the variety of cases we've treated and the amazing results our patients have achieved.",
    },
    {
      question: "Who manufactures Awesome Aligners?",
      answer: "Awesome Aligners are manufactured using state-of-the-art technology in our certified production facility. We use advanced 3D printing and thermoforming processes to create precise, custom aligners for each patient's unique treatment plan.",
    },
    {
      question: "How many doctors are in your network?",
      answer: "We have over 500 certified providers across India, and our network continues to grow. Each provider has completed our rigorous training program and is equipped with the knowledge and tools to deliver excellent results.",
    },
  ],
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("how-it-works");
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
