import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiter (per IP, 20 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function sanitize(input: unknown, maxLen = 1000): string {
  return String(input || "").trim().slice(0, maxLen);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ reply: "Too many requests. Please wait a moment." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get chatbot settings
    const { data: settings, error: settingsError } = await supabase
      .from("chatbot_settings")
      .select("*")
      .limit(1)
      .single();

    if (settingsError || !settings) {
      return new Response(
        JSON.stringify({ reply: "Thanks for your message! Our team will get back to you soon." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const message = sanitize(body.message, 2000);
    const session_id = sanitize(body.session_id, 100);

    // Only use webhook_url from database settings, never from request body
    const webhookUrl = settings.webhook_url;

    if (!webhookUrl) {
      return new Response(
        JSON.stringify({ reply: settings.fallback_message }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Forward to webhook
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          session_id,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!webhookResponse.ok) {
        throw new Error(`Webhook returned ${webhookResponse.status}`);
      }

      const webhookData = await webhookResponse.json();
      const reply = webhookData.reply || webhookData.output || webhookData.text || webhookData.message || settings.fallback_message;

      return new Response(
        JSON.stringify({ reply: String(reply).slice(0, 5000) }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (webhookError) {
      console.error("Webhook error:", webhookError);
      return new Response(
        JSON.stringify({ reply: settings.fallback_message }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ reply: "Sorry, something went wrong. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
