import { useLocation, Link, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Star, 
  Calendar, 
  Phone,
  ArrowRight,
  Sparkles,
  Clock,
  Shield,
  Award
} from "lucide-react";

const recommendations = {
  excellent: {
    title: "Excellent Candidate!",
    subtitle: "You're a great fit for Awesome Aligners",
    color: "from-emerald-500 to-emerald-600",
    icon: Sparkles,
    description: "Based on your responses, clear aligners would be an excellent solution for your smile goals. Your case appears straightforward, and you could see amazing results!",
    nextSteps: [
      "Schedule a free consultation with a certified provider",
      "Get your teeth scanned (takes just 10 minutes)",
      "Receive your custom treatment plan",
      "Start your smile transformation!"
    ],
    treatmentTime: "6-12 months",
    urgency: "Book your consultation this week for a special offer!"
  },
  good: {
    title: "Good Candidate!",
    subtitle: "Clear aligners could work well for you",
    color: "from-primary to-primary/80",
    icon: Star,
    description: "Your responses indicate that clear aligners would likely be a good option for you. A consultation will help determine the best treatment approach for your specific needs.",
    nextSteps: [
      "Schedule a consultation to discuss your options",
      "Our specialists will evaluate your case",
      "Get a personalized treatment plan",
      "Begin your journey to a better smile"
    ],
    treatmentTime: "8-14 months",
    urgency: "Don't wait - the sooner you start, the sooner you'll smile!"
  },
  consultation: {
    title: "Let's Discuss Your Options",
    subtitle: "A consultation will help determine the best path",
    color: "from-amber-500 to-amber-600",
    icon: Calendar,
    description: "Your case may have some unique factors that require professional evaluation. Our specialists will help determine the best treatment approach for your specific situation.",
    nextSteps: [
      "Book a detailed consultation",
      "Get a comprehensive evaluation",
      "Discuss all available treatment options",
      "Find the best solution for your needs"
    ],
    treatmentTime: "Varies based on case",
    urgency: "Schedule a free consultation to learn more."
  }
};

const QuizResults = () => {
  const location = useLocation();
  const state = location.state as {
    score: number;
    recommendation: keyof typeof recommendations;
    name: string;
    primaryConcern: string;
    timeline: string;
  } | null;

  // Redirect if no state (direct access)
  if (!state) {
    return <Navigate to="/" replace />;
  }

  const result = recommendations[state.recommendation];
  const ResultIcon = result.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#072D57] via-[#0a3d6e] to-[#0B4F8A]" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Score Circle */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="12"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(state.score / 100) * 440} 440`}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{state.score}%</span>
                <span className="text-sm text-white/70">Match Score</span>
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${result.color} text-white mb-4`}>
              <ResultIcon className="h-5 w-5" />
              <span className="font-medium">{result.subtitle}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {state.name}, {result.title}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {result.description}
            </p>
          </div>
        </div>
      </section>

      {/* Results Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Next Steps */}
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold mb-6">Your Next Steps</h2>
                <div className="space-y-4">
                  {result.nextSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <p className="pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Treatment Time</p>
                      <p className="text-xl font-bold">{result.treatmentTime}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Satisfaction Guarantee</p>
                      <p className="text-xl font-bold">100% Money Back</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Free Consultation</p>
                      <p className="text-xl font-bold">Worth ₹2,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center">
              <h3 className="text-2xl font-bold mb-2">Ready to Start Your Smile Journey?</h3>
              <p className="text-muted-foreground mb-6">{result.urgency}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Book Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+919150220394">
                    <Phone className="mr-2 h-5 w-5" /> Call Now
                  </a>
                </Button>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Awesome Aligners?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: CheckCircle, title: "Certified Doctors", desc: "500+ trained orthodontic specialists" },
                  { icon: Star, title: "Premium Quality", desc: "Medical-grade, BPA-free aligners" },
                  { icon: Shield, title: "Money Back", desc: "100% satisfaction guarantee" }
                ].map((item, index) => (
                  <div key={index} className="p-6 rounded-xl bg-card border border-border text-center">
                    <item.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* View Results */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Want to see what's possible? Check out real transformation stories.
              </p>
              <Button variant="outline" asChild>
                <Link to="/results">
                  View Before & After Gallery <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QuizResults;
