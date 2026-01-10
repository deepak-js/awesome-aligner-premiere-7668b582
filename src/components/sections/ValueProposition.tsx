import { Scan, Clock, UserCheck, Heart, Shield, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import doctorPatientConsultation from "@/assets/doctor-patient-consultation.jpg";

const features = [
  {
    icon: Scan,
    title: "Advanced 3D Scanning",
    description: "State-of-the-art digital impressions for perfect fit",
  },
  {
    icon: Clock,
    title: "Faster Treatment Planning",
    description: "AI-powered planning reduces time to your perfect smile",
  },
  {
    icon: UserCheck,
    title: "Doctor-Led Monitoring",
    description: "Expert oversight at every step of your journey",
  },
  {
    icon: Heart,
    title: "Designed for Comfort",
    description: "Ultra-thin aligners you'll barely notice",
  },
  {
    icon: Shield,
    title: "100% Safe Materials",
    description: "Medical-grade, BPA-free aligners for your health",
  },
  {
    icon: Award,
    title: "Guaranteed Results",
    description: "Money-back guarantee if you're not satisfied",
  },
];

const ValueProposition = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose Awesome Aligners?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Cutting-edge technology meets personalized care for results you'll love. 
              Our certified doctors and premium materials ensure the best outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link to="/how-it-works">Learn How It Works</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/for-doctors">For Dental Professionals</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src={doctorPatientConsultation} 
              alt="Doctor consulting with patient about clear aligners" 
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border">
              <p className="text-2xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Certified Doctors</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass-card rounded-2xl p-6 hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
