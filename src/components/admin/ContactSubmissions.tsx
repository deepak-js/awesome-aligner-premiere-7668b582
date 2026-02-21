import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, Loader2, Inbox } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
}

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-16 bg-card rounded-xl border border-border">
        <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No contact submissions yet</h3>
        <p className="text-muted-foreground">Submissions will appear here when visitors fill out the contact form.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((sub) => (
        <div key={sub.id} className="p-6 rounded-xl bg-card border border-border">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-semibold text-lg">{sub.name}</h3>
                <Badge variant="outline">{sub.subject}</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${sub.email}`} className="hover:text-primary">{sub.email}</a>
                </div>
                {sub.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${sub.phone}`} className="hover:text-primary">{sub.phone}</a>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                {sub.message}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(sub.created_at)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactSubmissions;
