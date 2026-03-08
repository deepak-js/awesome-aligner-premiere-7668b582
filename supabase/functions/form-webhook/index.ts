import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();

    // Allow override webhook_url for admin testing (same pattern as chat-webhook)
    let webhookUrl = payload.webhook_url;

    if (!webhookUrl) {
      // Fetch from chatbot_settings (reuse same webhook)
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );
      const { data } = await supabase
        .from("chatbot_settings")
        .select("webhook_url")
        .limit(1)
        .single();
      webhookUrl = data?.webhook_url;
    }

    if (!webhookUrl) {
      return new Response(
        JSON.stringify({ success: false, error: "No webhook URL configured" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Forward the entire payload to the n8n webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "awesome-aligners",
        event_type: payload.type,
        timestamp: new Date().toISOString(),
        data: payload,
      }),
    });

    const responseText = await response.text();
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { raw: responseText };
    }

    return new Response(
      JSON.stringify({ success: true, webhook_response: result }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in form-webhook:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
