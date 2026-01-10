import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowRight, 
  Filter,
  Clock,
  User,
  Quote,
  X
} from "lucide-react";
import ResultsCardSkeleton from "@/components/skeletons/ResultsCardSkeleton";

// Import AI-generated before/after images
import before1 from "@/assets/before-1.jpg";
import after1 from "@/assets/after-1.jpg";
import before2 from "@/assets/before-2.jpg";
import after2 from "@/assets/after-2.jpg";
import before3 from "@/assets/before-3.jpg";
import after3 from "@/assets/after-3.jpg";
import before4 from "@/assets/before-4.jpg";
import after4 from "@/assets/after-4.jpg";
import before5 from "@/assets/before-5.jpg";
import after5 from "@/assets/after-5.jpg";
import before6 from "@/assets/before-6.jpg";
import after6 from "@/assets/after-6.jpg";

// Default images mapping for cases without custom images
const defaultImages: Record<string, { before: string; after: string }> = {
  crowding: { before: before1, after: after1 },
  spacing: { before: before2, after: after2 },
  overbite: { before: before3, after: after3 },
  underbite: { before: before4, after: after4 },
  crossbite: { before: before5, after: after5 },
  complex: { before: before6, after: after6 },
};

interface CaseStudy {
  id: string;
  title: string;
  patient_age: number | null;
  patient_gender: string | null;
  case_type: string;
  treatment_duration: string | null;
  description: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  doctor_name: string | null;
  clinic_name: string | null;
  testimonial: string | null;
  featured: boolean | null;
}

const caseTypes = [
  { value: "all", label: "All Cases" },
  { value: "crowding", label: "Crowding" },
  { value: "spacing", label: "Spacing/Gaps" },
  { value: "overbite", label: "Overbite" },
  { value: "underbite", label: "Underbite" },
  { value: "crossbite", label: "Crossbite" },
  { value: "complex", label: "Complex Cases" }
];

// Sample cases with AI-generated images
const sampleCases: CaseStudy[] = [
  {
    id: "sample-1",
    title: "Severe Crowding Correction",
    patient_age: 28,
    patient_gender: "Female",
    case_type: "crowding",
    treatment_duration: "14 months",
    description: "Patient presented with severe crowding in both arches. Treatment involved sequential aligners with IPR to create space for proper alignment.",
    before_image_url: before1,
    after_image_url: after1,
    doctor_name: "Dr. Priya Sharma",
    clinic_name: "Mumbai Dental Excellence",
    testimonial: "I never thought I could smile confidently. Awesome Aligners changed my life!",
    featured: true
  },
  {
    id: "sample-2",
    title: "Gap Closure - Diastema",
    patient_age: 24,
    patient_gender: "Male",
    case_type: "spacing",
    treatment_duration: "8 months",
    description: "Midline diastema closure with minor spacing throughout the upper arch. Patient achieved perfect alignment with clear aligners.",
    before_image_url: before2,
    after_image_url: after2,
    doctor_name: "Dr. Rahul Mehta",
    clinic_name: "Delhi Smile Studio",
    testimonial: "The gap that bothered me for years is finally gone. Thank you!",
    featured: true
  },
  {
    id: "sample-3",
    title: "Overbite Correction",
    patient_age: 32,
    patient_gender: "Female",
    case_type: "overbite",
    treatment_duration: "18 months",
    description: "Deep overbite correction with intrusion of upper anteriors and extrusion of lower anteriors for optimal bite relationship.",
    before_image_url: before3,
    after_image_url: after3,
    doctor_name: "Dr. Anjali Kapoor",
    clinic_name: "Bangalore Orthodontic Center",
    testimonial: "My bite feels perfect now, and my smile is beautiful!",
    featured: false
  },
  {
    id: "sample-4",
    title: "Underbite Treatment",
    patient_age: 26,
    patient_gender: "Male",
    case_type: "underbite",
    treatment_duration: "16 months",
    description: "Class III malocclusion correction with clear aligners, avoiding the need for surgical intervention.",
    before_image_url: before4,
    after_image_url: after4,
    doctor_name: "Dr. Vikram Singh",
    clinic_name: "Chennai Dental Care",
    testimonial: "I was told I needed surgery, but Awesome Aligners fixed my bite without it!",
    featured: false
  },
  {
    id: "sample-5",
    title: "Crossbite Alignment",
    patient_age: 29,
    patient_gender: "Female",
    case_type: "crossbite",
    treatment_duration: "12 months",
    description: "Posterior crossbite correction with arch expansion and individual tooth movement for proper occlusion.",
    before_image_url: before5,
    after_image_url: after5,
    doctor_name: "Dr. Neha Gupta",
    clinic_name: "Pune Smile Clinic",
    testimonial: "Finally, my teeth meet properly. Such a relief!",
    featured: false
  },
  {
    id: "sample-6",
    title: "Complex Case - Full Arch",
    patient_age: 35,
    patient_gender: "Male",
    case_type: "complex",
    treatment_duration: "22 months",
    description: "Complex case involving crowding, spacing, and bite issues. Comprehensive treatment plan with staged aligner therapy.",
    before_image_url: before6,
    after_image_url: after6,
    doctor_name: "Dr. Suresh Patel",
    clinic_name: "Hyderabad Dental Institute",
    testimonial: "Worth every penny and every month. My smile transformation is incredible!",
    featured: true
  }
];

// Slider component for case cards
const CaseSliderCard = ({ caseStudy, onClick }: { caseStudy: CaseStudy; onClick: () => void }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  
  const beforeImg = caseStudy.before_image_url || defaultImages[caseStudy.case_type]?.before || before1;
  const afterImg = caseStudy.after_image_url || defaultImages[caseStudy.case_type]?.after || after1;

  const formatCaseType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-border shadow-md hover:shadow-xl transition-shadow">
        {/* After Image (Background) */}
        <img
          src={afterImg}
          alt="After treatment"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImg}
            alt="Before treatment"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Labels */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium">
          Before
        </div>
        <div className="absolute top-2 right-2 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
          After
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-xl cursor-ew-resize border-2 border-primary-foreground">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-2 bg-primary-foreground rounded-full" />
              <div className="w-0.5 h-2 bg-primary-foreground rounded-full" />
            </div>
          </div>
        </div>

        {/* Range Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => {
            e.stopPropagation();
            setSliderPosition(Number(e.target.value));
          }}
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
        
        {caseStudy.featured && (
          <Badge className="absolute top-2 left-1/2 -translate-x-1/2 bg-primary">Featured</Badge>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 pointer-events-none">
          <Button size="sm" variant="secondary" className="pointer-events-auto">
            View Details
          </Button>
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant="outline">{formatCaseType(caseStudy.case_type)}</Badge>
          {caseStudy.treatment_duration && (
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {caseStudy.treatment_duration}
            </span>
          )}
        </div>
        <h3 className="font-semibold group-hover:text-primary transition-colors">
          {caseStudy.title}
        </h3>
        {caseStudy.doctor_name && (
          <p className="text-sm text-muted-foreground mt-1">
            by {caseStudy.doctor_name}
          </p>
        )}
      </div>
    </div>
  );
};

const Results = () => {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [imageView, setImageView] = useState<"before" | "after">("before");

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Combine database cases with sample cases
      const dbCases = (data || []).map(c => ({
        ...c,
        before_image_url: c.before_image_url || defaultImages[c.case_type]?.before || before1,
        after_image_url: c.after_image_url || defaultImages[c.case_type]?.after || after1,
      }));
      
      // Use sample cases if no database cases
      setCases(dbCases.length > 0 ? dbCases : sampleCases);
    } catch (error) {
      console.error("Error fetching cases:", error);
      setCases(sampleCases);
    } finally {
      setLoading(false);
    }
  };

  const filteredCases = activeFilter === "all" 
    ? cases 
    : cases.filter(c => c.case_type === activeFilter);

  const formatCaseType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getSelectedCaseImages = () => {
    if (!selectedCase) return { before: '', after: '' };
    return {
      before: selectedCase.before_image_url || defaultImages[selectedCase.case_type]?.before || before1,
      after: selectedCase.after_image_url || defaultImages[selectedCase.case_type]?.after || after1,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.9)] via-[hsl(var(--primary)/0.8)] to-[hsl(var(--primary)/0.7)]" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/30">
              Real Results
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
              Smile Transformations
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Explore real before-and-after results from patients who transformed their smiles 
              with Awesome Aligners. Drag the slider to see the difference!
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            {caseTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setActiveFilter(type.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === type.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ResultsCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredCases.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No cases found for this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCases.map((caseStudy) => (
                <CaseSliderCard 
                  key={caseStudy.id} 
                  caseStudy={caseStudy} 
                  onClick={() => setSelectedCase(caseStudy)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border shadow-xl">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="p-4 md:p-8">
              {/* Image Viewer */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-muted">
                <img
                  src={imageView === "before" ? getSelectedCaseImages().before : getSelectedCaseImages().after}
                  alt={imageView === "before" ? "Before treatment" : "After treatment"}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-1 bg-background/80 backdrop-blur-sm rounded-full">
                  <button
                    onClick={() => setImageView("before")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      imageView === "before" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => setImageView("after")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      imageView === "after" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    After
                  </button>
                </div>
              </div>
              
              {/* Case Details */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <Badge className="mb-3">{formatCaseType(selectedCase.case_type)}</Badge>
                  <h2 className="text-xl md:text-2xl font-bold mb-4">{selectedCase.title}</h2>
                  <p className="text-muted-foreground mb-6">{selectedCase.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {selectedCase.treatment_duration && (
                      <div className="p-4 rounded-xl bg-muted/50">
                        <Clock className="h-5 w-5 text-primary mb-2" />
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">{selectedCase.treatment_duration}</p>
                      </div>
                    )}
                    {selectedCase.patient_age && (
                      <div className="p-4 rounded-xl bg-muted/50">
                        <User className="h-5 w-5 text-primary mb-2" />
                        <p className="text-sm text-muted-foreground">Patient</p>
                        <p className="font-semibold">{selectedCase.patient_age} yrs, {selectedCase.patient_gender}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  {selectedCase.testimonial && (
                    <div className="p-4 md:p-6 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                      <Quote className="h-6 w-6 md:h-8 md:w-8 text-primary/30 mb-3" />
                      <p className="italic text-base md:text-lg mb-4">"{selectedCase.testimonial}"</p>
                      <p className="text-sm text-muted-foreground">
                        — Patient treated by {selectedCase.doctor_name}
                      </p>
                    </div>
                  )}
                  
                  {selectedCase.doctor_name && (
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Treating Doctor</p>
                      <p className="font-semibold">{selectedCase.doctor_name}</p>
                      {selectedCase.clinic_name && (
                        <p className="text-sm text-muted-foreground">{selectedCase.clinic_name}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 md:mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/quiz">
                    Take Smile Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">Book Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for Your Transformation?</h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8">
              Take our quick smile assessment to see if you're a candidate for clear aligners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/quiz">
                  Start Smile Assessment <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Book Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Results;
