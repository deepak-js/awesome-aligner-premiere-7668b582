import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Save,
  TestTube,
  Plus,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Globe,
  MessageSquare,
  Settings,
} from "lucide-react";

interface ChatbotSettingsData {
  id: string;
  webhook_url: string | null;
  bot_name: string | null;
  welcome_message: string | null;
  fallback_message: string | null;
  quick_replies: string[] | null;
  is_active: boolean | null;
  updated_at: string | null;
}

const ChatbotSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);
  const [settings, setSettings] = useState<ChatbotSettingsData | null>(null);
  const [newQuickReply, setNewQuickReply] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("chatbot_settings")
        .select("*")
        .limit(1)
        .single();

      if (error) throw error;
      setSettings({
        ...data,
        quick_replies: Array.isArray(data.quick_replies) ? data.quick_replies : JSON.parse(data.quick_replies || "[]"),
      });
    } catch (error) {
      console.error("Error fetching chatbot settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);

    try {
      const { error } = await (supabase as any)
        .from("chatbot_settings")
        .update({
          webhook_url: settings.webhook_url,
          bot_name: settings.bot_name,
          welcome_message: settings.welcome_message,
          fallback_message: settings.fallback_message,
          quick_replies: settings.quick_replies,
          is_active: settings.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", settings.id);

      if (error) throw error;

      toast({ title: "Settings saved", description: "Chatbot settings updated successfully." });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleTestWebhook = async () => {
    if (!settings?.webhook_url) return;
    setTesting(true);
    setTestResult(null);

    try {
      const response = await supabase.functions.invoke("chat-webhook", {
        body: { message: "Test message from admin panel", session_id: "admin-test", webhook_url: settings.webhook_url },
      });

      if (response.error) throw response.error;
      setTestResult("success");
      toast({ title: "Webhook test successful", description: `Response: ${response.data?.reply || "OK"}` });
    } catch (error) {
      console.error("Webhook test failed:", error);
      setTestResult("error");
      toast({ title: "Webhook test failed", description: "Could not reach the webhook URL.", variant: "destructive" });
    } finally {
      setTesting(false);
    }
  };

  const addQuickReply = () => {
    if (!newQuickReply.trim() || !settings) return;
    setSettings({
      ...settings,
      quick_replies: [...(settings.quick_replies || []), newQuickReply.trim()],
    });
    setNewQuickReply("");
  };

  const removeQuickReply = (index: number) => {
    if (!settings) return;
    setSettings({
      ...settings,
      quick_replies: (settings.quick_replies || []).filter((_, i) => i !== index),
    });
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
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No chatbot settings found</h3>
        <p className="text-muted-foreground">Settings could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Webhook Configuration */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Webhook Configuration</h3>
            <p className="text-sm text-muted-foreground">Connect your chatbot to an external service like n8n</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="webhook_url">Webhook URL</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="webhook_url"
                placeholder="https://your-n8n-instance.com/webhook/..."
                value={settings.webhook_url || ""}
                onChange={(e) => setSettings({ ...settings, webhook_url: e.target.value })}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={handleTestWebhook}
                disabled={!settings.webhook_url || testing}
              >
                {testing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <TestTube className="h-4 w-4" />
                )}
                <span className="ml-2">Test</span>
              </Button>
            </div>
            {testResult && (
              <div className={`flex items-center gap-2 mt-2 text-sm ${testResult === "success" ? "text-emerald-600" : "text-destructive"}`}>
                {testResult === "success" ? (
                  <><CheckCircle className="h-4 w-4" /> Webhook is reachable and responding</>
                ) : (
                  <><AlertCircle className="h-4 w-4" /> Webhook test failed. Check the URL.</>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
            <div className="flex-1">
              <p className="font-medium text-sm">Chat Widget Status</p>
              <p className="text-xs text-muted-foreground">
                {settings.is_active ? "The chat widget is visible to visitors" : "The chat widget is hidden from visitors"}
              </p>
            </div>
            <Switch
              checked={settings.is_active ?? true}
              onCheckedChange={(checked) => setSettings({ ...settings, is_active: checked })}
            />
          </div>
        </div>
      </div>

      {/* Chat Widget Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Chat Widget Settings</h3>
            <p className="text-sm text-muted-foreground">Customize the chat experience for your visitors</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="bot_name">Bot Name</Label>
            <Input
              id="bot_name"
              value={settings.bot_name || ""}
              onChange={(e) => setSettings({ ...settings, bot_name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="welcome_message">Welcome Message</Label>
            <Textarea
              id="welcome_message"
              value={settings.welcome_message || ""}
              onChange={(e) => setSettings({ ...settings, welcome_message: e.target.value })}
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="fallback_message">Fallback Message</Label>
            <p className="text-xs text-muted-foreground mb-1">Shown when the webhook is unavailable or not configured</p>
            <Textarea
              id="fallback_message"
              value={settings.fallback_message || ""}
              onChange={(e) => setSettings({ ...settings, fallback_message: e.target.value })}
              rows={2}
            />
          </div>

          <div>
            <Label>Quick Replies</Label>
            <p className="text-xs text-muted-foreground mb-2">Suggested buttons shown to users in the chat</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {(settings.quick_replies || []).map((reply, index) => (
                <Badge key={index} variant="secondary" className="gap-1 pl-3 pr-1 py-1.5">
                  {reply}
                  <button
                    onClick={() => removeQuickReply(index)}
                    className="ml-1 rounded-full hover:bg-destructive/20 p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a quick reply..."
                value={newQuickReply}
                onChange={(e) => setNewQuickReply(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addQuickReply())}
                className="flex-1"
              />
              <Button variant="outline" size="icon" onClick={addQuickReply} disabled={!newQuickReply.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Logs Placeholder */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Chat Logs</h3>
            <p className="text-sm text-muted-foreground">Coming soon</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Chat conversation logs can be viewed and managed in your n8n workflow dashboard. 
          Connect a database or logging node in your n8n workflow to store and analyze chat history.
        </p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default ChatbotSettings;
