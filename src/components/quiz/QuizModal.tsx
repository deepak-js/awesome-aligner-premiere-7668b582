import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  X,
  User,
  Users,
  Baby
} from "lucide-react";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuizAnswer {
  questionId: number;
  answer: string | string[];
}

// Invisalign-style simplified questions
const questions = [
  {
    id: 1,
    question: "Tell us who you are",
    type: "single",
    options: [
      { value: "adult", label: "I'm an Adult", icon: User },
      { value: "teen", label: "I'm a Teen", icon: Users },
      { value: "parent", label: "I'm a Parent (looking for my child)", icon: Baby },
    ]
  },
  {
    id: 2,
    question: "What are you looking to fix?",
    type: "multiple",
    options: [
      { value: "crowded", label: "Crowded teeth" },
      { value: "gaps", label: "Gap between teeth" },
      { value: "overbite", label: "Overbite" },
      { value: "underbite", label: "Underbite" },
      { value: "crossbite", label: "Crossbite" },
      { value: "open_bite", label: "Open bite" },
      { value: "straighten", label: "Generally straighten teeth" },
    ]
  },
  {
    id: 3,
    question: "Have you had orthodontic treatment before?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ]
  },
  {
    id: 4,
    question: "When are you looking to start treatment?",
    type: "single",
    options: [
      { value: "asap", label: "As soon as possible" },
      { value: "1_3_months", label: "Within 1-3 months" },
      { value: "6_months", label: "Within 6 months" },
      { value: "researching", label: "Just researching" },
    ]
  },
];

const QuizModal = ({ isOpen, onClose }: QuizModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: ""
  });

  const totalSteps = questions.length + 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const getCurrentAnswer = (questionId: number) => {
    return answers.find(a => a.questionId === questionId)?.answer;
  };

  const handleSingleSelect = (questionId: number, value: string) => {
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== questionId);
      return [...filtered, { questionId, answer: value }];
    });
    // Auto-advance for single select
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setCurrentStep(questions.length);
      }
    }, 300);
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
    let score = 50; // Base score
    const timeline = answers.find(a => a.questionId === 4)?.answer;
    if (timeline === "asap") score += 25;
    else if (timeline === "1_3_months") score += 20;
    else if (timeline === "6_months") score += 10;
    
    const previousTreatment = answers.find(a => a.questionId === 3)?.answer;
    if (previousTreatment === "no") score += 15;
    else score += 10;

    return Math.min(score + 10, 95);
  };

  const getRecommendation = (score: number) => {
    if (score >= 80) return "excellent";
    if (score >= 60) return "good";
    return "consultation";
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const score = calculateScore();
    const recommendation = getRecommendation(score);

    try {
      const alignmentIssues = answers.find(a => a.questionId === 2)?.answer as string[];
      const previousTreatment = answers.find(a => a.questionId === 3)?.answer;
      const timeline = answers.find(a => a.questionId === 4)?.answer as string;
      const userType = answers.find(a => a.questionId === 1)?.answer as string;

      const { error } = await supabase.from("quiz_leads").insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        primary_concern: alignmentIssues?.[0] || "general",
        alignment_issues: alignmentIssues || [],
        previous_treatment: previousTreatment === "yes",
        treatment_timeline: timeline,
        quiz_score: score,
        recommendation,
        age_range: userType === "teen" ? "teen" : userType === "parent" ? "parent" : "adult"
      });

      if (error) throw error;

      const recommendationText = recommendation === "excellent" 
        ? "You're an excellent candidate for Awesome Aligners!"
        : recommendation === "good"
        ? "You're a good candidate for clear aligners."
        : "We recommend scheduling a consultation.";

      supabase.functions.invoke("send-notification-email", {
        body: {
          type: "quiz_completion",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          recommendation: recommendationText,
          quizScore: score
        }
      }).catch(err => console.error("Email notification failed:", err));

      onClose();
      navigate("/quiz-results", { 
        state: { score, recommendation, name: formData.firstName, primaryConcern: alignmentIssues?.[0], timeline } 
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

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setFormData({ firstName: "", lastName: "", email: "", phone: "", city: "" });
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetQuiz();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Header with progress */}
        <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Smile className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold text-foreground">Smile Assessment</span>
            </div>
            <button 
              onClick={handleClose}
              className="p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep < questions.length ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground">
                {questions[currentStep].question}
              </h2>
              
              <div className="space-y-3">
                {questions[currentStep].options.map((option) => {
                  const currentAnswer = getCurrentAnswer(questions[currentStep].id);
                  const isMultiple = questions[currentStep].type === "multiple";
                  const isSelected = isMultiple
                    ? (currentAnswer as string[] || []).includes(option.value)
                    : currentAnswer === option.value;
                  const Icon = (option as any).icon;

                  return (
                    <button
                      key={option.value}
                      onClick={() => 
                        isMultiple
                          ? handleMultiSelect(questions[currentStep].id, option.value)
                          : handleSingleSelect(questions[currentStep].id, option.value)
                      }
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary/10 scale-[1.02]"
                          : "border-border hover:border-primary/50 bg-card"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && (
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                        )}
                        {!Icon && (
                          <div className={`w-5 h-5 ${isMultiple ? 'rounded-md' : 'rounded-full'} border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                          }`}>
                            {isSelected && <CheckCircle className="h-3 w-3 text-primary-foreground" />}
                          </div>
                        )}
                        <span className="text-foreground font-medium">{option.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {questions[currentStep].type === "multiple" && (
                <p className="text-sm text-muted-foreground mt-4">
                  ✨ Select all that apply
                </p>
              )}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Smile className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-foreground">Almost There! 🎉</h2>
                <p className="text-muted-foreground">
                  Enter your details to see your personalized smile assessment.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City (Optional)</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                By submitting, you agree to our Privacy Policy and consent to be contacted about your smile journey.
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4">
          <div className="flex justify-between gap-4">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            
            {currentStep < questions.length ? (
              questions[currentStep].type === "multiple" && (
                <Button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={!canProceed()}
                  className="flex-1"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Processing...
                  </span>
                ) : (
                  <>
                    See My Results
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
