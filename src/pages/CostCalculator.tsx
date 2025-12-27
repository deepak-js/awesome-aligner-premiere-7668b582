import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  IndianRupee,
  Clock,
  Sparkles
} from "lucide-react";

const treatmentTypes = [
  { id: "mild", label: "Mild Alignment", description: "Minor spacing or crowding", basePrice: 45000, duration: "4-6 months" },
  { id: "moderate", label: "Moderate Correction", description: "Noticeable gaps or overlap", basePrice: 65000, duration: "8-12 months" },
  { id: "complex", label: "Complex Treatment", description: "Significant bite issues", basePrice: 95000, duration: "12-18 months" },
];

const addOns = [
  { id: "retainer", label: "Permanent Retainer", price: 8000 },
  { id: "whitening", label: "Teeth Whitening", price: 5000 },
  { id: "express", label: "Express Delivery", price: 3000 },
];

const emiOptions = [
  { months: 3, interest: 0 },
  { months: 6, interest: 0 },
  { months: 12, interest: 5 },
  { months: 18, interest: 8 },
];

const CostCalculator = () => {
  const [step, setStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedEmi, setSelectedEmi] = useState<number | null>(null);

  const treatment = treatmentTypes.find(t => t.id === selectedTreatment);
  
  const calculateTotal = () => {
    let total = treatment?.basePrice || 0;
    selectedAddOns.forEach(addOnId => {
      const addOn = addOns.find(a => a.id === addOnId);
      if (addOn) total += addOn.price;
    });
    return total;
  };

  const calculateEmi = () => {
    const total = calculateTotal();
    if (!selectedEmi) return 0;
    const option = emiOptions.find(e => e.months === selectedEmi);
    if (!option) return 0;
    const interest = (total * option.interest) / 100;
    return Math.round((total + interest) / option.months);
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#072D57] via-[#0a3d6e] to-[#0B4F8A]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-6">
            <Calculator className="h-5 w-5 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">Cost Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-foreground">
            Get Your Personalized Quote
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Answer a few questions to get an instant estimate for your smile transformation
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Progress */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-20 md:w-32 h-1 mx-2 rounded ${
                      step > s ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Treatment Type */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-2">Select Your Treatment Type</h2>
                <p className="text-muted-foreground mb-8">Choose the option that best describes your alignment needs</p>
                
                <div className="space-y-4">
                  {treatmentTypes.map((type) => (
                    <Card 
                      key={type.id}
                      className={`cursor-pointer transition-all ${
                        selectedTreatment === type.id 
                          ? "ring-2 ring-primary border-primary" 
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedTreatment(type.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{type.label}</h3>
                            <p className="text-muted-foreground">{type.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" /> {type.duration}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">₹{type.basePrice.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Starting price</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end mt-8">
                  <Button 
                    size="lg" 
                    disabled={!selectedTreatment}
                    onClick={() => setStep(2)}
                  >
                    Continue <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Add-ons */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-2">Choose Add-ons (Optional)</h2>
                <p className="text-muted-foreground mb-8">Enhance your treatment with these popular options</p>
                
                <div className="space-y-4">
                  {addOns.map((addOn) => (
                    <Card 
                      key={addOn.id}
                      className={`cursor-pointer transition-all ${
                        selectedAddOns.includes(addOn.id) 
                          ? "ring-2 ring-primary border-primary" 
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => toggleAddOn(addOn.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                              selectedAddOns.includes(addOn.id) 
                                ? "bg-primary border-primary" 
                                : "border-border"
                            }`}>
                              {selectedAddOns.includes(addOn.id) && (
                                <CheckCircle className="h-4 w-4 text-primary-foreground" />
                              )}
                            </div>
                            <span className="font-medium">{addOn.label}</span>
                          </div>
                          <span className="text-lg font-semibold">+₹{addOn.price.toLocaleString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                    <ArrowLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                  <Button size="lg" onClick={() => setStep(3)}>
                    Continue <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Summary & EMI */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-2">Your Estimate</h2>
                <p className="text-muted-foreground mb-8">Review your personalized treatment quote</p>
                
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <span>{treatment?.label}</span>
                        <span className="font-semibold">₹{treatment?.basePrice.toLocaleString()}</span>
                      </div>
                      
                      {selectedAddOns.map(addOnId => {
                        const addOn = addOns.find(a => a.id === addOnId);
                        return addOn ? (
                          <div key={addOn.id} className="flex justify-between items-center">
                            <span className="text-muted-foreground">{addOn.label}</span>
                            <span>₹{addOn.price.toLocaleString()}</span>
                          </div>
                        ) : null;
                      })}
                      
                      <div className="flex justify-between items-center pt-4 border-t border-border">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl font-bold text-primary">₹{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* EMI Options */}
                <h3 className="text-lg font-semibold mb-4">Flexible EMI Options</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {emiOptions.map((option) => (
                    <Card 
                      key={option.months}
                      className={`cursor-pointer transition-all text-center ${
                        selectedEmi === option.months 
                          ? "ring-2 ring-primary border-primary" 
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedEmi(option.months)}
                    >
                      <CardContent className="p-4">
                        <p className="text-2xl font-bold text-primary">{option.months}</p>
                        <p className="text-sm text-muted-foreground">months</p>
                        {option.interest === 0 ? (
                          <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            0% Interest
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground mt-2 block">
                            {option.interest}% interest
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedEmi && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center mb-8">
                    <p className="text-muted-foreground mb-2">Your monthly EMI would be</p>
                    <div className="flex items-center justify-center gap-2">
                      <IndianRupee className="h-8 w-8 text-primary" />
                      <span className="text-4xl font-bold text-primary">{calculateEmi().toLocaleString()}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" size="lg" onClick={() => setStep(2)} className="flex-1">
                    <ArrowLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                  <Button size="lg" asChild className="flex-1">
                    <Link to="/contact">
                      <Sparkles className="mr-2 h-5 w-5" /> Book Free Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CostCalculator;
