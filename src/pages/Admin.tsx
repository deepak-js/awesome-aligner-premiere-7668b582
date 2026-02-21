import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import type { User, Session } from "@supabase/supabase-js";
import CaseStudyForm from "@/components/admin/CaseStudyForm";
import ChatbotSettings from "@/components/admin/ChatbotSettings";
import ContactSubmissions from "@/components/admin/ContactSubmissions";
import BlogManager from "@/components/admin/BlogManager";
import SEOSettings from "@/components/admin/SEOSettings";
import {
  LogOut, Users, Stethoscope, Calendar, Mail, Phone, Building, Clock,
  TrendingUp, Target, DollarSign, RefreshCw, Image, Plus, Trash2,
  MessageSquare, Inbox, FileText, Globe
} from "lucide-react";

interface QuizLead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  age_range: string | null;
  primary_concern: string | null;
  alignment_issues: string[] | null;
  previous_treatment: boolean | null;
  treatment_timeline: string | null;
  budget_range: string | null;
  quiz_score: number | null;
  recommendation: string | null;
  created_at: string;
}

interface DoctorApplication {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  clinic_name: string;
  clinic_address: string | null;
  city: string | null;
  state: string | null;
  years_experience: number | null;
  specialty: string | null;
  current_aligner_brand: string | null;
  patients_per_month: number | null;
  partnership_tier: string | null;
  message: string | null;
  status: string | null;
  created_at: string;
}

interface CaseStudy {
  id: string;
  title: string;
  case_type: string;
  treatment_duration: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  featured: boolean | null;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizLeads, setQuizLeads] = useState<QuizLead[]>([]);
  const [doctorApps, setDoctorApps] = useState<DoctorApplication[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showCaseForm, setShowCaseForm] = useState(false);
  const [chatbotActive, setChatbotActive] = useState<boolean | null>(null);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    
    return !error && data !== null;
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        } else {
          const isAdmin = await checkAdminRole(session.user.id);
          if (!isAdmin) {
            await supabase.auth.signOut();
            navigate("/auth");
          }
        }
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      } else {
        const isAdmin = await checkAdminRole(session.user.id);
        if (!isAdmin) {
          await supabase.auth.signOut();
          navigate("/auth");
        } else {
          fetchData();
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [leadsRes, appsRes, casesRes, chatbotRes] = await Promise.all([
        supabase.from("quiz_leads").select("*").order("created_at", { ascending: false }),
        supabase.from("doctor_applications").select("*").order("created_at", { ascending: false }),
        supabase.from("case_studies").select("*").order("featured", { ascending: false }).order("created_at", { ascending: false }),
        (supabase as any).from("chatbot_settings").select("is_active").limit(1).single(),
      ]);

      if (leadsRes.data) setQuizLeads(leadsRes.data);
      if (appsRes.data) setDoctorApps(appsRes.data);
      if (casesRes.data) setCaseStudies(casesRes.data);
      if (chatbotRes.data) setChatbotActive(chatbotRes.data.is_active);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDeleteCase = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    
    try {
      const { error } = await supabase.from("case_studies").delete().eq("id", id);
      if (error) throw error;
      
      toast({
        title: "Case study deleted",
      });
      
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete case study.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return "bg-muted text-muted-foreground";
    if (score >= 80) return "bg-emerald-500/20 text-emerald-600";
    if (score >= 60) return "bg-primary/20 text-primary";
    return "bg-amber-500/20 text-amber-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              Awesome<span className="font-light">Aligners</span> Admin
            </h1>
            <p className="text-sm text-muted-foreground">Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold">{quizLeads.length}</p>
            <p className="text-sm text-muted-foreground">Quiz Leads</p>
          </div>
          
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
            <p className="text-2xl font-bold">{doctorApps.length}</p>
            <p className="text-sm text-muted-foreground">Doctor Apps</p>
          </div>
          
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <p className="text-2xl font-bold">
              {quizLeads.filter(l => l.quiz_score && l.quiz_score >= 80).length}
            </p>
            <p className="text-sm text-muted-foreground">Hot Leads</p>
          </div>
          
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <p className="text-2xl font-bold">
              {doctorApps.filter(a => a.partnership_tier === "professional" || a.partnership_tier === "elite").length}
            </p>
            <p className="text-sm text-muted-foreground">Premium Tier</p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold">
              {chatbotActive === null ? "—" : chatbotActive ? "Active" : "Off"}
            </p>
            <p className="text-sm text-muted-foreground">Chatbot</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="leads" className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <TabsList className="flex-wrap h-auto">
              <TabsTrigger value="leads" className="gap-2">
                <Users className="h-4 w-4" /> Leads
              </TabsTrigger>
              <TabsTrigger value="doctors" className="gap-2">
                <Stethoscope className="h-4 w-4" /> Doctors
              </TabsTrigger>
              <TabsTrigger value="contact" className="gap-2">
                <Inbox className="h-4 w-4" /> Contact
              </TabsTrigger>
              <TabsTrigger value="cases" className="gap-2">
                <Image className="h-4 w-4" /> Cases
              </TabsTrigger>
              <TabsTrigger value="blog" className="gap-2">
                <FileText className="h-4 w-4" /> Blog
              </TabsTrigger>
              <TabsTrigger value="seo" className="gap-2">
                <Globe className="h-4 w-4" /> SEO
              </TabsTrigger>
              <TabsTrigger value="chatbot" className="gap-2">
                <MessageSquare className="h-4 w-4" /> Chatbot
              </TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" onClick={fetchData} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          <TabsContent value="leads" className="space-y-4">
            {quizLeads.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-xl border border-border">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No quiz leads yet</h3>
                <p className="text-muted-foreground">Leads will appear here when users complete the quiz.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {quizLeads.map((lead) => (
                  <div key={lead.id} className="p-6 rounded-xl bg-card border border-border">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-lg">
                            {lead.first_name} {lead.last_name}
                          </h3>
                          <Badge className={getScoreColor(lead.quiz_score)}>
                            Score: {lead.quiz_score}%
                          </Badge>
                          {lead.recommendation && (
                            <Badge variant="outline">{lead.recommendation}</Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <a href={`mailto:${lead.email}`} className="hover:text-primary">
                              {lead.email}
                            </a>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="h-4 w-4" />
                              <a href={`tel:${lead.phone}`} className="hover:text-primary">
                                {lead.phone}
                              </a>
                            </div>
                          )}
                          {lead.age_range && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              Age: {lead.age_range.replace("_", "-")}
                            </div>
                          )}
                          {lead.treatment_timeline && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              Timeline: {lead.treatment_timeline.replace("_", " ")}
                            </div>
                          )}
                          {lead.budget_range && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <DollarSign className="h-4 w-4" />
                              Budget: {lead.budget_range.replace("_", " ")}
                            </div>
                          )}
                          {lead.primary_concern && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Target className="h-4 w-4" />
                              Concern: {lead.primary_concern}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(lead.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="doctors" className="space-y-4">
            {doctorApps.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-xl border border-border">
                <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No doctor applications yet</h3>
                <p className="text-muted-foreground">Applications will appear here when doctors apply.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {doctorApps.map((app) => (
                  <div key={app.id} className="p-6 rounded-xl bg-card border border-border">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-lg">
                            Dr. {app.first_name} {app.last_name}
                          </h3>
                          {app.partnership_tier && (
                            <Badge className={
                              app.partnership_tier === "elite" 
                                ? "bg-amber-500/20 text-amber-600"
                                : app.partnership_tier === "professional"
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                            }>
                              {app.partnership_tier.charAt(0).toUpperCase() + app.partnership_tier.slice(1)}
                            </Badge>
                          )}
                          {app.status && (
                            <Badge variant="outline">{app.status}</Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building className="h-4 w-4" />
                            {app.clinic_name}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <a href={`mailto:${app.email}`} className="hover:text-primary">
                              {app.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <a href={`tel:${app.phone}`} className="hover:text-primary">
                              {app.phone}
                            </a>
                          </div>
                          {app.city && app.state && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              📍 {app.city}, {app.state}
                            </div>
                          )}
                          {app.specialty && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              🎓 {app.specialty}
                            </div>
                          )}
                          {app.years_experience && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              ⭐ {app.years_experience} years experience
                            </div>
                          )}
                          {app.patients_per_month && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              👥 ~{app.patients_per_month} patients/month
                            </div>
                          )}
                        </div>
                        
                        {app.message && (
                          <p className="mt-3 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                            "{app.message}"
                          </p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(app.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="contact">
            <ContactSubmissions />
          </TabsContent>

          <TabsContent value="cases" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button onClick={() => setShowCaseForm(true)}>
                <Plus className="h-4 w-4 mr-2" /> Add Case Study
              </Button>
            </div>
            
            {caseStudies.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-xl border border-border">
                <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No case studies yet</h3>
                <p className="text-muted-foreground mb-4">Add before/after transformation photos to showcase results.</p>
                <Button onClick={() => setShowCaseForm(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Add First Case Study
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudies.map((caseStudy) => (
                  <div key={caseStudy.id} className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="relative aspect-video">
                      <div className="absolute inset-0 flex">
                        <div className="w-1/2 relative overflow-hidden">
                          {caseStudy.before_image_url ? (
                            <img
                              src={caseStudy.before_image_url}
                              alt="Before"
                              className="absolute inset-0 w-[200%] h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">No before image</span>
                            </div>
                          )}
                          <div className="absolute bottom-2 left-2 px-2 py-1 bg-background/80 rounded text-xs font-medium">
                            Before
                          </div>
                        </div>
                        <div className="w-1/2 relative overflow-hidden">
                          {caseStudy.after_image_url ? (
                            <img
                              src={caseStudy.after_image_url}
                              alt="After"
                              className="absolute inset-0 w-[200%] h-full object-cover"
                              style={{ left: "-100%" }}
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">No after image</span>
                            </div>
                          )}
                          <div className="absolute bottom-2 right-2 px-2 py-1 bg-primary text-primary-foreground rounded text-xs font-medium">
                            After
                          </div>
                        </div>
                        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/80" />
                      </div>
                      
                      {caseStudy.featured && (
                        <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{caseStudy.case_type}</Badge>
                        {caseStudy.treatment_duration && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {caseStudy.treatment_duration}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold mb-2">{caseStudy.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(caseStudy.created_at)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCase(caseStudy.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="blog">
            <BlogManager />
          </TabsContent>

          <TabsContent value="seo">
            <SEOSettings />
          </TabsContent>

          <TabsContent value="chatbot">
            <ChatbotSettings />
          </TabsContent>
        </Tabs>

        {/* Case Study Form Modal */}
        <Dialog open={showCaseForm} onOpenChange={setShowCaseForm}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Case Study</DialogTitle>
            </DialogHeader>
            <CaseStudyForm
              onSuccess={() => {
                setShowCaseForm(false);
                fetchData();
              }}
              onCancel={() => setShowCaseForm(false)}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Admin;
