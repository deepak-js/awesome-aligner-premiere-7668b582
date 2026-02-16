import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, HelpCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from
"@/components/ui/accordion";

const pricingPlans = [
{
  name: "Lite",
  description: "For minor corrections",
  price: 1895,
  duration: "3-6 months",
  popular: false,
  features: [
  "Up to 10 aligners",
  "Minor spacing or crowding",
  "Retainers included",
  "Virtual check-ins",
  "90-day refinement guarantee"]

},
{
  name: "Complete",
  description: "Most popular choice",
  price: 3495,
  duration: "6-12 months",
  popular: true,
  features: [
  "Unlimited aligners",
  "Moderate to complex cases",
  "Premium retainers included",
  "Bi-weekly virtual check-ins",
  "Lifetime refinement guarantee",
  "Whitening kit included",
  "Priority support"]

},
{
  name: "Premium",
  description: "Comprehensive transformation",
  price: 4995,
  duration: "12-18 months",
  popular: false,
  features: [
  "Unlimited aligners",
  "Complex cases & bite correction",
  "Premium retainers included",
  "Weekly virtual check-ins",
  "Lifetime refinement guarantee",
  "Professional whitening treatment",
  "Dedicated care coordinator",
  "In-person consultations included"]

}];


const paymentOptions = [
{
  title: "Pay in Full",
  description: "Save 10% when you pay upfront",
  details: "One-time payment with maximum savings"
},
{
  title: "Monthly Payments",
  description: "As low as $89/month",
  details: "0% APR financing available for qualified applicants. Split into 12-24 monthly payments."
},
{
  title: "FSA/HSA Accepted",
  description: "Use pre-tax dollars",
  details: "Awesome Aligners is an eligible expense for most FSA and HSA accounts."
}];


const insuranceFAQ = [
{
  question: "Does insurance cover clear aligners?",
  answer: "Many dental insurance plans cover clear aligners as they would cover traditional braces. Typically, orthodontic coverage can range from $1,000 to $3,000. We recommend checking with your insurance provider for specific coverage details."
},
{
  question: "How do I know if my insurance covers Awesome Aligners?",
  answer: "Contact your insurance provider and ask about orthodontic benefits. Our team can also help verify your benefits and provide documentation for claims submission."
},
{
  question: "Can I use my FSA or HSA?",
  answer: "Yes! Clear aligners are considered a qualified medical expense. You can use your Flexible Spending Account (FSA) or Health Savings Account (HSA) to pay for treatment with pre-tax dollars."
},
{
  question: "Do you offer payment plans?",
  answer: "Absolutely! We offer flexible payment plans starting as low as $89/month with 0% APR financing for qualified applicants. You can split your treatment cost into 12, 18, or 24 monthly payments."
},
{
  question: "What if I need refinements?",
  answer: "Our Complete and Premium plans include a lifetime refinement guarantee at no additional cost. The Lite plan includes a 90-day refinement guarantee. Refinements ensure you achieve your perfect smile."
},
{
  question: "Is there a money-back guarantee?",
  answer: "We offer a satisfaction guarantee within the first 30 days of receiving your aligners. If you're not completely satisfied with the fit or quality, we'll work with you to make it right or provide a full refund."
}];


const Pricing = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Pricing

          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Invest in Your Smile
          </h1>
          



        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) =>
            <Card
              key={plan.name}
              className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>

                {plan.popular &&
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
              }
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-lg text-muted-foreground">$</span>
                      <span className="text-5xl font-bold text-foreground">{plan.price.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Treatment duration: {plan.duration}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) =>
                  <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                  )}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  asChild>

                    <Link to="/quiz">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            All plans include free shipping, a custom treatment plan, and dedicated support.
          </p>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Flexible Payment Options
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe everyone deserves a beautiful smile. Choose the payment option that works best for you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {paymentOptions.map((option) =>
            <Card key={option.title} className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <CardDescription className="text-primary font-semibold">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{option.details}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How We Compare
            </h2>
            <p className="text-muted-foreground">
              See how Awesome Aligners stacks up against alternatives.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">
                    <span className="text-primary">Awesome Aligners</span>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-muted-foreground">
                    Traditional Braces
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-muted-foreground">
                    Other Clear Aligners
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Average Cost</td>
                  <td className="py-4 px-4 text-center text-primary font-semibold">$1,895 - $4,995</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">$3,000 - $7,000</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">$1,800 - $8,000</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Virtually Invisible</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="py-4 px-4 text-center text-muted-foreground">✕</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-muted-foreground mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Removable</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="py-4 px-4 text-center text-muted-foreground">✕</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-muted-foreground mx-auto" /></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Doctor-Supervised</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-muted-foreground mx-auto" /></td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Varies</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Refinements Included</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-muted-foreground mx-auto" /></td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Limited</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Premium Materials</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="py-4 px-4 text-center text-muted-foreground">N/A</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Insurance & Payment FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Insurance & Payment FAQ
            </h2>
            <p className="text-muted-foreground">
              Common questions about paying for your treatment.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {insuranceFAQ.map((item, index) =>
            <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Smile Journey?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Take our free assessment quiz to see if you're a candidate and get a personalized treatment recommendation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/quiz">Take Free Assessment</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">Talk to an Expert</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>);

};

export default Pricing;