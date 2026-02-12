import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Award, 
  Shield, 
  Headphones,
  CheckCircle,
  Star,
  Zap,
  Crown,
  ArrowRight
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Grow Your Practice",
    description: "Expand your service offerings and attract new patients seeking clear aligner treatment."
  },
  {
    icon: GraduationCap,
    title: "Comprehensive Training",
    description: "Access our world-class training program with hands-on workshops and online courses."
  },
  {
    icon: Users,
    title: "Patient Referrals",
    description: "Receive qualified patient leads from our marketing campaigns in your area."
  },
  {
    icon: Award,
    title: "Premium Materials",
    description: "Work with medical-grade, BPA-free aligners manufactured with precision technology."
  },
  {
    icon: Shield,
    title: "Clinical Support",
    description: "Get access to our team of orthodontic specialists for complex case consultations."
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Enjoy priority access to our partner support team for any questions or issues."
  }
];

const trainingModules = [
  "Clear Aligner Fundamentals & Case Selection",
  "Digital Scanning & Treatment Planning",
  "Managing Patient Expectations",
  "Handling Complex Cases",
  "Practice Integration & Marketing",
  "Advanced Techniques & Refinements"
];

const tiers = [
  {
    name: "Starter",
    icon: Star,
    price: "No Monthly Fee",
    color: "from-slate-500 to-slate-600",
    features: [
      "Access to Awesome Aligners cases",
      "Basic training certification",
      "Standard support",
      "Marketing materials kit",
      "Online case submission"
    ],
    cta: "Get Started"
  },
  {
    name: "Professional",
    icon: Zap,
    price: "₹15,000/month",
    color: "from-primary to-primary/80",
    popular: true,
    features: [
      "Everything in Starter",
      "Advanced training modules",
      "Priority case processing",
      "Dedicated account manager",
      "Co-branded marketing",
      "Patient referral program",
      "Quarterly business reviews"
    ],
    cta: "Apply Now"
  },
  {
    name: "Elite",
    icon: Crown,
    price: "₹35,000/month",
    color: "from-amber-500 to-amber-600",
    features: [
      "Everything in Professional",
      "VIP support line",
      "Custom treatment planning",
      "In-clinic training sessions",
      "Featured partner listing",
      "Exclusive events access",
      "Revenue share program",
      "Multi-location support"
    ],
    cta: "Contact Us"
  }
];

const DoctorPartnership = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    clinicName: "",
    clinicAddress: "",
    city: "",
    state: "",
    yearsExperience: "",
    specialty: "",
    currentAlignerBrand: "",
    patientsPerMonth: "",
    partnershipTier: "professional",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("doctor_applications").insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        clinic_name: formData.clinicName,
        clinic_address: formData.clinicAddress,
        city: formData.city,
        state: formData.state,
        years_experience: parseInt(formData.yearsExperience) || null,
        specialty: formData.specialty,
        current_aligner_brand: formData.currentAlignerBrand,
        patients_per_month: parseInt(formData.patientsPerMonth) || null,
        partnership_tier: formData.partnershipTier,
        message: formData.message
      });

      if (error) throw error;

      // Send notification email (fire and forget)
      supabase.functions.invoke("send-notification-email", {
        body: {
          type: "doctor_application",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          clinicName: formData.clinicName,
          phone: formData.phone
        }
      }).catch(err => console.error("Email notification failed:", err));

      toast({
        title: "Application Submitted!",
        description: "Our partnership team will contact you within 24-48 hours.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        clinicName: "",
        clinicAddress: "",
        city: "",
        state: "",
        yearsExperience: "",
        specialty: "",
        currentAlignerBrand: "",
        patientsPerMonth: "",
        partnershipTier: "professional",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#072D57] via-[#0a3d6e] to-[#0B4F8A]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/20 text-primary-foreground border border-primary/30">
              For Dental Professionals
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Partner With <span className="text-primary">Awesome Aligners</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join India's fastest-growing clear aligner network. Expand your practice, 
              delight your patients, and grow your revenue with our comprehensive partnership program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <a href="#apply">Apply Now <ArrowRight className="ml-2 h-5 w-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white/30 text-white hover:bg-white/10">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Partner With Us?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide everything you need to successfully offer clear aligner treatment in your practice.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Program Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                Certification Program
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                World-Class Training & Certification
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our comprehensive training program ensures you're fully equipped to provide 
                exceptional clear aligner treatment. Get certified and start treating patients with confidence.
              </p>
              
              <div className="space-y-4">
                {trainingModules.map((module, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{module}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
                <p className="font-semibold mb-2">Certification Includes:</p>
                <p className="text-muted-foreground">
                  8+ hours of training • Hands-on workshops • Case study reviews • 
                  Official certification • Continuing education credits
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                <GraduationCap className="h-48 w-48 text-primary/30" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl border border-border">
                <p className="text-4xl font-bold text-primary">500+</p>
                <p className="text-muted-foreground">Certified Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Partnership Tiers</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the partnership level that best fits your practice goals and patient volume.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-2xl bg-card border ${
                  tier.popular ? 'border-primary shadow-xl scale-105' : 'border-border'
                } transition-all duration-300 hover:shadow-lg`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-sm font-medium rounded-full bg-primary text-primary-foreground">
                    Most Popular
                  </span>
                )}
                
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                  <tier.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-2xl font-bold text-primary mb-6">{tier.price}</p>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={tier.popular ? "default" : "outline"}
                  asChild
                >
                  <a href="#apply">{tier.cta}</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Apply to Become a Partner</h2>
              <p className="text-muted-foreground text-lg">
                Fill out the form below and our partnership team will contact you within 24-48 hours.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-card border border-border">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clinicName">Clinic/Practice Name *</Label>
                <Input 
                  id="clinicName" 
                  name="clinicName" 
                  value={formData.clinicName}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clinicAddress">Clinic Address</Label>
                <Input 
                  id="clinicAddress" 
                  name="clinicAddress" 
                  value={formData.clinicAddress}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    name="state" 
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="yearsExperience">Years of Experience</Label>
                  <Input 
                    id="yearsExperience" 
                    name="yearsExperience" 
                    type="number" 
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input 
                    id="specialty" 
                    name="specialty" 
                    placeholder="e.g., Orthodontics"
                    value={formData.specialty}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentAlignerBrand">Current Aligner Brand (if any)</Label>
                  <Input 
                    id="currentAlignerBrand" 
                    name="currentAlignerBrand" 
                    value={formData.currentAlignerBrand}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientsPerMonth">Patients/Month (approx)</Label>
                  <Input 
                    id="patientsPerMonth" 
                    name="patientsPerMonth" 
                    type="number" 
                    value={formData.patientsPerMonth}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="partnershipTier">Interested Partnership Tier</Label>
                <select
                  id="partnershipTier"
                  name="partnershipTier"
                  value={formData.partnershipTier}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
                >
                  <option value="starter">Starter</option>
                  <option value="professional">Professional (Recommended)</option>
                  <option value="elite">Elite</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Additional Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={4}
                  placeholder="Tell us about your practice and goals..."
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoctorPartnership;
