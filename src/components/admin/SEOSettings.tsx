import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, Globe, BarChart3, Facebook, Code } from "lucide-react";

interface SEOSettingsData {
  id: string;
  google_analytics_id: string | null;
  search_console_code: string | null;
  facebook_pixel_id: string | null;
  custom_head_scripts: string | null;
}

const SEOSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SEOSettingsData | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("seo_settings")
        .select("*")
        .limit(1)
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error("Error fetching SEO settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);

    try {
      const { error } = await (supabase as any)
        .from("seo_settings")
        .update({
          google_analytics_id: settings.google_analytics_id,
          search_console_code: settings.search_console_code,
          facebook_pixel_id: settings.facebook_pixel_id,
          custom_head_scripts: settings.custom_head_scripts,
        })
        .eq("id", settings.id);

      if (error) throw error;

      toast({ title: "SEO settings saved", description: "Changes will take effect on the next page load." });
    } catch (error) {
      console.error("Error saving SEO settings:", error);
      toast({ title: "Error", description: "Failed to save SEO settings.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-16 bg-card rounded-xl border border-border">
        <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">SEO settings not found</h3>
        <p className="text-muted-foreground">Settings could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Google Analytics */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Google Analytics</h3>
            <p className="text-sm text-muted-foreground">Track website traffic and user behaviour</p>
          </div>
        </div>
        <div>
          <Label htmlFor="ga_id">GA4 Measurement ID</Label>
          <Input
            id="ga_id"
            placeholder="G-XXXXXXXXXX"
            value={settings.google_analytics_id || ""}
            onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      {/* Search Console */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Globe className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Google Search Console</h3>
            <p className="text-sm text-muted-foreground">Verify your site ownership with Google</p>
          </div>
        </div>
        <div>
          <Label htmlFor="sc_code">Verification Code</Label>
          <Input
            id="sc_code"
            placeholder="Paste the content value from Google's meta tag"
            value={settings.search_console_code || ""}
            onChange={(e) => setSettings({ ...settings, search_console_code: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      {/* Facebook Pixel */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Facebook className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Facebook Pixel</h3>
            <p className="text-sm text-muted-foreground">Track conversions from Facebook ads</p>
          </div>
        </div>
        <div>
          <Label htmlFor="fb_pixel">Pixel ID</Label>
          <Input
            id="fb_pixel"
            placeholder="123456789012345"
            value={settings.facebook_pixel_id || ""}
            onChange={(e) => setSettings({ ...settings, facebook_pixel_id: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      {/* Custom Scripts */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Code className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Custom Head Scripts</h3>
            <p className="text-sm text-muted-foreground">Add any additional tracking or verification scripts</p>
          </div>
        </div>
        <div>
          <Label htmlFor="custom_scripts">HTML/Script Code</Label>
          <Textarea
            id="custom_scripts"
            placeholder='<script>...</script> or <meta name="..." content="..." />'
            value={settings.custom_head_scripts || ""}
            onChange={(e) => setSettings({ ...settings, custom_head_scripts: e.target.value })}
            className="mt-1 font-mono text-sm"
            rows={6}
          />
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Save SEO Settings
        </Button>
      </div>
    </div>
  );
};

export default SEOSettings;
