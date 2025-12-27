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
  Clock,
  Target,
  X
} from "lucide-react";

// Import images for quiz options
import crowdingImg from "@/assets/comparison-hazy-aligner.jpg";
import spacingImg from "@/assets/comparison-clear-aligner.jpg";
import overbiteImg from "@/assets/comparison-sharp-edge.jpg";
import underbiteImg from "@/assets/comparison-smooth-edge.jpg";
import alignmentImg from "@/assets/before-after.jpg";
import smileImg from "@/assets/diverse-smiles.jpg";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuizAnswer {
  questionId: number;
  answer: string | string[];
}

const questions = [
  {
    id: 1,
    question: "What's your main smile goal?",
    type: "single",
    hasImages: true,
    options: [
      { value: "crowding", label: "Fix crowded teeth", image: crowdingImg },
      { value: "spacing", label: "Close gaps", image: spacingImg },
      { value: "overbite", label: "Correct overbite", image: overbiteImg },
      { value: "underbite", label: "Fix underbite", image: underbiteImg },
      { value: "general", label: "Overall alignment", image: alignmentImg },
      { value: "cosmetic", label: "Perfect my smile", image: smileImg }
    ]
  },
  {
    id: 2,
    question: "What bothers you most?",
    type: "multiple",
    hasImages: false,
    options: [
      { value: "front_teeth", label: "Front teeth look crooked" },
      { value: "smile_photos", label: "Don't like smiling in photos" },
      { value: "bite", label: "Bite feels uncomfortable" },
      { value: "cleaning", label: "Hard to clean properly" },
      { value: "confidence", label: "Affects my confidence" }
    ]
  },
  {
    id: 3,
    question: "Your age group?",
    type: "single",
    hasImages: false,
    options: [
      { value: "18_25", label: "18-25 years" },
      { value: "26_35", label: "26-35 years" },
      { value: "36_45", label: "36-45 years" },
      { value: "46_55", label: "46-55 years" },
      { value: "over_55", label: "55+ years" }
    ]
  },
  {
    id: 4,
    question: "Any previous orthodontic treatment?",
    type: "single",
    hasImages: false,
    options: [
      { value: "never", label: "No, first time! 🎉" },
      { value: "braces", label: "Yes, had braces before" },
      { value: "aligners", label: "Tried aligners before" },
      { value: "retainer", label: "Used a retainer" }
    ]
  },
  {
    id: 5,
    question: "When do you want to start?",
    type: "single",
    hasImages: false,
    options: [
      { value: "asap", label: "Right away! 🚀" },
      { value: "1_month", label: "Within a month" },
      { value: "3_months", label: "In a few months" },
      { value: "researching", label: "Just exploring" }
    ]
  },
  {
    id: 6,
    question: "Your budget preference?",
    type: "single",
    hasImages: false,
    options: [
      { value: "under_50k", label: "Under ₹50,000" },
      { value: "50k_80k", label: "₹50,000 - ₹80,000" },
      { value: "80k_120k", label: "₹80,000 - ₹1,20,000" },
      { value: "flexible", label: "Flexible with EMI options" }
    ]
  }
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
    phone: ""
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
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else if (currentStep === questions.length - 1) {
      setTimeout(() => setCurrentStep(questions.length), 300);
    }
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
        if (["crowding", "spacing", "general", "cosmetic"].includes(answer.answer as string)) score += 20;
        else score += 15;
      }
      if (answer.questionId === 3) {
        if (["18_25", "26_35", "36_45"].includes(answer.answer as string)) score += 15;
        else score += 10;
      }
      if (answer.questionId === 5) {
        if (["asap", "1_month"].includes(answer.answer as string)) score += 15;
        else if (answer.answer === "3_months") score += 10;
        else score += 5;
      }
    });
    return Math.min(score + 40, 95);
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
        state: { score, recommendation, name: formData.firstName, primaryConcern, timeline } 
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
    setFormData({ firstName: "", lastName: "", email: "", phone: "" });
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetQuiz();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
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
            <span>Question {Math.min(currentStep + 1, questions.length)} of {questions.length}</span>
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
              
              {questions[currentStep].hasImages ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {questions[currentStep].options.map((option) => {
                    const isSelected = getCurrentAnswer(questions[currentStep].id) === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSingleSelect(questions[currentStep].id, option.value)}
                        className={`relative group rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-primary ring-2 ring-primary/30 scale-[1.02]"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="aspect-square overflow-hidden">
                          <img 
                            src={(option as any).image} 
                            alt={option.label}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent`} />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              isSelected ? "border-primary bg-primary" : "border-white/80"
                            }`}>
                              {isSelected && <CheckCircle className="h-2.5 w-2.5 text-primary-foreground" />}
                            </div>
                            <span className="text-white text-sm font-medium">{option.label}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
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
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/10 scale-[1.01]"
                            : "border-border hover:border-primary/50 bg-card"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                          }`}>
                            {isSelected && <CheckCircle className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <span className="text-foreground">{option.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
              
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
                <h2 className="text-2xl font-bold mb-2 text-foreground">You're Almost There! 🎉</h2>
                <p className="text-muted-foreground">
                  Enter your details to see your personalized results.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4 text-center">
                🔒 Your information is secure and will never be shared.
              </p>
            </div>
          )}
        </div>

        {/* Footer with navigation */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            
            {currentStep < questions.length ? (
              questions[currentStep].type === "multiple" && (
                <Button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={!canProceed()}
                  className="gap-2"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              )
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? "Submitting..." : "See My Results"} 
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
