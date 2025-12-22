import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle,
  Smile,
  Clock,
  DollarSign,
  Target
} from "lucide-react";

interface QuizAnswer {
  questionId: number;
  answer: string | string[];
}

const questions = [
  {
    id: 1,
    question: "What is your primary concern about your teeth?",
    type: "single",
    options: [
      { value: "crowding", label: "Crowded or overlapping teeth" },
      { value: "spacing", label: "Gaps between teeth" },
      { value: "overbite", label: "Overbite (upper teeth stick out)" },
      { value: "underbite", label: "Underbite (lower teeth stick out)" },
      { value: "crossbite", label: "Crossbite (misaligned bite)" },
      { value: "general", label: "General alignment improvement" }
    ]
  },
  {
    id: 2,
    question: "Which specific issues would you like to address?",
    type: "multiple",
    options: [
      { value: "front_teeth", label: "Front teeth alignment" },
      { value: "back_teeth", label: "Back teeth alignment" },
      { value: "bite", label: "Bite correction" },
      { value: "smile", label: "Overall smile appearance" },
      { value: "comfort", label: "Chewing comfort" },
      { value: "confidence", label: "Confidence in smiling" }
    ]
  },
  {
    id: 3,
    question: "How old are you?",
    type: "single",
    options: [
      { value: "under_18", label: "Under 18 years" },
      { value: "18_25", label: "18-25 years" },
      { value: "26_35", label: "26-35 years" },
      { value: "36_45", label: "36-45 years" },
      { value: "46_55", label: "46-55 years" },
      { value: "over_55", label: "Over 55 years" }
    ]
  },
  {
    id: 4,
    question: "Have you had orthodontic treatment before?",
    type: "single",
    options: [
      { value: "never", label: "No, this would be my first time" },
      { value: "braces_child", label: "Yes, braces as a child/teen" },
      { value: "braces_adult", label: "Yes, braces as an adult" },
      { value: "aligners", label: "Yes, clear aligners before" },
      { value: "retainer", label: "I've used a retainer only" }
    ]
  },
  {
    id: 5,
    question: "How soon would you like to start treatment?",
    type: "single",
    options: [
      { value: "asap", label: "As soon as possible" },
      { value: "1_month", label: "Within 1 month" },
      { value: "3_months", label: "Within 3 months" },
      { value: "6_months", label: "Within 6 months" },
      { value: "researching", label: "Just researching for now" }
    ]
  },
  {
    id: 6,
    question: "What's your budget range for treatment?",
    type: "single",
    options: [
      { value: "under_50k", label: "Under ₹50,000" },
      { value: "50k_80k", label: "₹50,000 - ₹80,000" },
      { value: "80k_120k", label: "₹80,000 - ₹1,20,000" },
      { value: "over_120k", label: "Over ₹1,20,000" },
      { value: "flexible", label: "Flexible with payment plans" }
    ]
  },
  {
    id: 7,
    question: "How important is discretion (invisible treatment) to you?",
    type: "single",
    options: [
      { value: "very", label: "Very important - I want invisible treatment" },
      { value: "somewhat", label: "Somewhat important" },
      { value: "not_important", label: "Not a major concern" }
    ]
  }
];

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const totalSteps = questions.length + 1; // questions + lead capture form
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const getCurrentAnswer = (questionId: number) => {
    return answers.find(a => a.questionId === questionId)?.answer;
  };

  const handleSingleSelect = (questionId: number, value: string) => {
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== questionId);
      return [...filtered, { questionId, answer: value }];
    });
  };

  const handleMultiSelect = (questionId: number, value: string) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        const currentValues = existing.answer as string[];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return prev.map(a => 
          a.questionId === questionId ? { ...a, answer: newValues } : a
        );
      }
      return [...prev, { questionId, answer: [value] }];
    });
  };

  const canProceed = () => {
    if (currentStep < questions.length) {
      const answer = getCurrentAnswer(questions[currentStep].id);
      if (questions[currentStep].type === "multiple") {
        return answer && (answer as string[]).length > 0;
      }
      return !!answer;
    }
    return formData.firstName && formData.lastName && formData.email && formData.phone;
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach(answer => {
      if (answer.questionId === 1) {
        // Primary concern scoring
        if (["crowding", "spacing", "general"].includes(answer.answer as string)) score += 20;
        else score += 15;
      }
      if (answer.questionId === 3) {
        // Age scoring
        if (["18_25", "26_35", "36_45"].includes(answer.answer as string)) score += 15;
        else score += 10;
      }
      if (answer.questionId === 5) {
        // Timeline scoring
        if (["asap", "1_month"].includes(answer.answer as string)) score += 15;
        else if (answer.answer === "3_months") score += 10;
        else score += 5;
      }
    });
    return Math.min(score + 40, 95); // Base score + calculated
  };

  const getRecommendation = (score: number) => {
    if (score >= 80) {
      return "excellent";
    } else if (score >= 60) {
      return "good";
    } else {
      return "consultation";
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const score = calculateScore();
    const recommendation = getRecommendation(score);

    try {
      const primaryConcern = answers.find(a => a.questionId === 1)?.answer as string;
      const alignmentIssues = answers.find(a => a.questionId === 2)?.answer as string[];
      const ageRange = answers.find(a => a.questionId === 3)?.answer as string;
      const previousTreatment = answers.find(a => a.questionId === 4)?.answer;
      const timeline = answers.find(a => a.questionId === 5)?.answer as string;
      const budget = answers.find(a => a.questionId === 6)?.answer as string;

      const { error } = await supabase.from("quiz_leads").insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        age_range: ageRange,
        primary_concern: primaryConcern,
        alignment_issues: alignmentIssues || [],
        previous_treatment: previousTreatment !== "never",
        treatment_timeline: timeline,
        budget_range: budget,
        quiz_score: score,
        recommendation
      });

      if (error) throw error;

      // Navigate to results with state
      navigate("/quiz-results", { 
        state: { 
          score, 
          recommendation, 
          name: formData.firstName,
          primaryConcern,
          timeline
        } 
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Step {currentStep + 1} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              {currentStep < questions.length ? (
                <>
                  <h2 className="text-2xl font-bold mb-6">
                    {questions[currentStep].question}
                  </h2>
                  
                  <div className="space-y-3">
                    {questions[currentStep].options.map((option) => {
                      const currentAnswer = getCurrentAnswer(questions[currentStep].id);
                      const isSelected = questions[currentStep].type === "multiple"
                        ? (currentAnswer as string[] || []).includes(option.value)
                        : currentAnswer === option.value;

                      return (
                        <button
                          key={option.value}
                          onClick={() => 
                            questions[currentStep].type === "multiple"
                              ? handleMultiSelect(questions[currentStep].id, option.value)
                              : handleSingleSelect(questions[currentStep].id, option.value)
                          }
                          className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
                            isSelected
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border hover:border-primary/50 bg-background"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                            }`}>
                              {isSelected && <CheckCircle className="h-3 w-3 text-primary-foreground" />}
                            </div>
                            <span>{option.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  {questions[currentStep].type === "multiple" && (
                    <p className="text-sm text-muted-foreground mt-4">
                      Select all that apply
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Smile className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Almost There!</h2>
                    <p className="text-muted-foreground">
                      Enter your details to see your personalized smile assessment results.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
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
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    By submitting, you agree to receive communications from Awesome Aligners. 
                    Your information is secure and will never be shared.
                  </p>
                </>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                
                {currentStep < questions.length ? (
                  <Button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    disabled={!canProceed()}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "See My Results"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Benefits reminder */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <Smile className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Personalized Results</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">2 Min Assessment</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Free Consultation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Quiz;
