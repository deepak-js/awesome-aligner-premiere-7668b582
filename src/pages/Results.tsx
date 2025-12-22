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
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

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
      setCases(data || []);
    } catch (error) {
      console.error("Error fetching cases:", error);
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#072D57] via-[#0a3d6e] to-[#0B4F8A]" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/20 text-primary-foreground border border-primary/30">
              Real Results
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Smile Transformations
            </h1>
            <p className="text-xl text-white/80">
              Explore real before-and-after results from patients who transformed their smiles 
              with Awesome Aligners. See what's possible for you!
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-muted rounded-xl mb-4" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredCases.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No cases found for this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((caseStudy) => (
                <div
                  key={caseStudy.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedCase(caseStudy)}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    {/* Before/After Slider Preview */}
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 relative overflow-hidden">
                        <img
                          src={caseStudy.before_image_url || "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400"}
                          alt="Before"
                          className="absolute inset-0 w-[200%] h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-background/80 rounded text-xs font-medium">
                          Before
                        </div>
                      </div>
                      <div className="w-1/2 relative overflow-hidden">
                        <img
                          src={caseStudy.after_image_url || "https://images.unsplash.com/photo-1581585635221-b0ea494d3f00?w=400"}
                          alt="After"
                          className="absolute inset-0 w-[200%] h-full object-cover"
                          style={{ left: "-100%" }}
                        />
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-primary text-primary-foreground rounded text-xs font-medium">
                          After
                        </div>
                      </div>
                      <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-lg" />
                    </div>
                    
                    {caseStudy.featured && (
                      <Badge className="absolute top-3 left-3 bg-primary">Featured</Badge>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <Button size="sm" variant="secondary">
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
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
            
            <div className="p-6 md:p-8">
              {/* Image Viewer */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-muted">
                <img
                  src={imageView === "before" ? selectedCase.before_image_url || "" : selectedCase.after_image_url || ""}
                  alt={imageView === "before" ? "Before treatment" : "After treatment"}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-1 bg-background/80 rounded-full">
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
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Badge className="mb-3">{formatCaseType(selectedCase.case_type)}</Badge>
                  <h2 className="text-2xl font-bold mb-4">{selectedCase.title}</h2>
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
                    <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                      <Quote className="h-8 w-8 text-primary/30 mb-3" />
                      <p className="italic text-lg mb-4">"{selectedCase.testimonial}"</p>
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
              
              <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 justify-center">
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
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Your Transformation?</h2>
            <p className="text-muted-foreground text-lg mb-8">
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
