import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import SEOHead from "@/components/SEOHead";
import heroGradientBg from "@/assets/hero-gradient-bg.jpeg";
import { 
  TrendingUp, 
  Users, 
  Award, 
  Shield, 
  Headphones,
  CheckCircle,
  ArrowRight,
  Download,
  GraduationCap
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
    description: "Access our training program with hands-on workshops and online courses."
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

const DoctorPartnership = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [brochureEmail, setBrochureEmail] = useState("");
  const [brochureSubmitting, setBrochureSubmitting] = useState(false);
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
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBrochureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBrochureSubmitting(true);
    try {
      await (supabase as any).from("contact_submissions").insert({
        name: "Brochure Request",
        email: brochureEmail,
        subject: "Download Brochure",
        message: "Doctor requested partnership brochure download."
      });
      toast({
        title: "Thank you!",
        description: "We will send the brochure to your email shortly.",
      });
      setBrochureEmail("");
      setBrochureOpen(false);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setBrochureSubmitting(false);
    }
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
        message: formData.message
      });

      if (error) throw error;

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
        firstName: "", lastName: "", email: "", phone: "",
        clinicName: "", clinicAddress: "", city: "", state: "",
        yearsExperience: "", specialty: "", currentAlignerBrand: "",
        patientsPerMonth: "", message: ""
      });
    } catch {
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
      <SEOHead
        title="Partner With Awesome Aligners | Doctor Partnership Program"
        description="Join India's fastest-growing clear aligner network. Expand your dental practice with our partnership program, training, and patient referrals."
        canonical="https://awesome-aligner-premiere.lovable.app/for-doctors"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroGradientBg})` }}
        />
        <div className="absolute inset-0 bg-[#072D57]/85" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full bg-white/15 text-white border border-white/25">
              For Dental Professionals
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Partner With{" "}
              <span className="text-[#4FC3F7]">Awesome Aligners</span>
            </h1>
            <p className="text-xl text-white/85 mb-8 max-w-2xl mx-auto">
              Join India's fastest-growing clear aligner network. Expand your practice, 
              delight your patients, and grow your revenue with our partnership program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-white text-[#072D57] hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300" 
                asChild
              >
                <a href="#apply">Apply Now <ArrowRight className="ml-2 h-5 w-5" /></a>
              </Button>
              <Button 
                size="lg" 
                onClick={() => setBrochureOpen(true)}
                className="text-lg px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#072D57] transition-all duration-300"
              >
                <Download className="mr-2 h-5 w-5" />
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
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clinicName">Clinic/Practice Name *</Label>
                <Input id="clinicName" name="clinicName" value={formData.clinicName} onChange={handleInputChange} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clinicAddress">Clinic Address</Label>
                <Input id="clinicAddress" name="clinicAddress" value={formData.clinicAddress} onChange={handleInputChange} />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleInputChange} />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="yearsExperience">Years of Experience</Label>
                  <Input id="yearsExperience" name="yearsExperience" type="number" value={formData.yearsExperience} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input id="specialty" name="specialty" placeholder="e.g., Orthodontics" value={formData.specialty} onChange={handleInputChange} />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentAlignerBrand">Current Aligner Brand (if any)</Label>
                  <Input id="currentAlignerBrand" name="currentAlignerBrand" value={formData.currentAlignerBrand} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientsPerMonth">Patients/Month (approx)</Label>
                  <Input id="patientsPerMonth" name="patientsPerMonth" type="number" value={formData.patientsPerMonth} onChange={handleInputChange} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Additional Message</Label>
                <Textarea id="message" name="message" rows={4} placeholder="Tell us about your practice and goals..." value={formData.message} onChange={handleInputChange} />
              </div>
              
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Brochure Email Dialog */}
      <Dialog open={brochureOpen} onOpenChange={setBrochureOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Partnership Brochure</DialogTitle>
            <DialogDescription>
              Enter your email and we will send you the brochure with all the details about our partnership program.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBrochureSubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="brochureEmail">Email Address *</Label>
              <Input 
                id="brochureEmail" 
                type="email" 
                required 
                value={brochureEmail} 
                onChange={e => setBrochureEmail(e.target.value)} 
                placeholder="you@clinic.com" 
              />
            </div>
            <Button type="submit" className="w-full" disabled={brochureSubmitting}>
              {brochureSubmitting ? "Sending..." : "Send Me the Brochure"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default DoctorPartnership;
