import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiter (per IP, 10 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
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

// Validate email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

// Sanitize string input
function sanitize(input: string, maxLen = 500): string {
  return String(input || "").trim().slice(0, maxLen);
}

async function sendEmail(to: string, subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({ from: "Awesome Aligners <onboarding@resend.dev>", to: [to], subject, html }),
  });
  if (!response.ok) { const error = await response.text(); throw new Error(`Failed to send email: ${error}`); }
  return response.json();
}

function contactFormEmail(name: string, subject: string) {
  return `<!DOCTYPE html><html><head><style>body{font-family:'Helvetica Neue',Arial,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:linear-gradient(135deg,#0066cc 0%,#0052a3 100%);color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0}.content{background:#f9fafb;padding:30px;border-radius:0 0 10px 10px}.cta-button{display:inline-block;background:#0066cc;color:white;padding:15px 30px;text-decoration:none;border-radius:5px;font-weight:bold;margin:20px 0}.footer{text-align:center;padding:20px;color:#666;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>Thanks for Reaching Out!</h1><p>We received your message, ${name}.</p></div><div class="content"><p>Hi ${name},</p><p>Thank you for contacting Awesome Aligners regarding "<strong>${subject}</strong>". We've received your message and our team will get back to you within 24 hours.</p><p>In the meantime, feel free to explore our website or take our free smile assessment quiz.</p><p style="text-align:center"><a href="https://awesomealigners.in/contact" class="cta-button">Visit Our Website</a></p><p>Best regards,<br/><strong>The Awesome Aligners Team</strong></p></div><div class="footer"><p>Awesome Aligners | support@awesomealigners.co.in</p></div></div></body></html>`;
}

function quizCompletionEmail(firstName: string, lastName: string, quizScore: number, recommendation: string) {
  return `<!DOCTYPE html><html><head><style>body{font-family:'Helvetica Neue',Arial,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:linear-gradient(135deg,#0066cc 0%,#0052a3 100%);color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0}.content{background:#f9fafb;padding:30px;border-radius:0 0 10px 10px}.score-box{background:white;border-radius:10px;padding:20px;text-align:center;margin:20px 0;box-shadow:0 2px 10px rgba(0,0,0,0.1)}.score{font-size:48px;font-weight:bold;color:#0066cc}.recommendation{background:#e8f4fd;border-left:4px solid #0066cc;padding:15px;margin:20px 0}.cta-button{display:inline-block;background:#0066cc;color:white;padding:15px 30px;text-decoration:none;border-radius:5px;font-weight:bold;margin:20px 0}.footer{text-align:center;padding:20px;color:#666;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>Your Smile Assessment Results</h1><p>Thank you for completing the quiz, ${firstName}!</p></div><div class="content"><p>Hi ${firstName} ${lastName},</p><p>Great news! We've analysed your responses and have a personalised recommendation for you.</p><div class="score-box"><p style="margin:0;color:#666;">Your Compatibility Score</p><p class="score">${quizScore}%</p></div><div class="recommendation"><strong>Our Recommendation:</strong><p style="margin-bottom:0;">${recommendation}</p></div><p>Based on your assessment, clear aligners could be a great fit for your smile goals.</p><p style="text-align:center;"><a href="https://awesomealigners.in/contact" class="cta-button">Schedule a Free Consultation</a></p><p>Looking forward to helping you achieve your dream smile!</p><p><strong>The Awesome Aligners Team</strong></p></div><div class="footer"><p>Awesome Aligners | support@awesomealigners.co.in</p></div></div></body></html>`;
}

function doctorApplicationEmail(firstName: string, lastName: string, clinicName: string, email: string, phone: string) {
  return `<!DOCTYPE html><html><head><style>body{font-family:'Helvetica Neue',Arial,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:linear-gradient(135deg,#0066cc 0%,#0052a3 100%);color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0}.content{background:#f9fafb;padding:30px;border-radius:0 0 10px 10px}.info-box{background:white;border-radius:10px;padding:20px;margin:20px 0;box-shadow:0 2px 10px rgba(0,0,0,0.1)}.next-steps{background:#e8f4fd;border-radius:10px;padding:20px;margin:20px 0}.footer{text-align:center;padding:20px;color:#666;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>Partnership Application Received</h1><p>Welcome to the Awesome Aligners Provider Network</p></div><div class="content"><p>Dear Dr. ${firstName} ${lastName},</p><p>Thank you for your interest in becoming an Awesome Aligners partner. We've received your application and are excited to potentially work with ${clinicName}.</p><div class="info-box"><h3 style="margin-top:0;">Application Details</h3><p><strong>Name:</strong> Dr. ${firstName} ${lastName}</p><p><strong>Clinic:</strong> ${clinicName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p></div><div class="next-steps"><h3 style="margin-top:0;">What Happens Next?</h3><ol><li><strong>Application Review:</strong> Our team will review within 2 to 3 business days.</li><li><strong>Credentials Verification:</strong> We'll verify your professional credentials.</li><li><strong>Onboarding Call:</strong> A specialist will contact you to discuss partnership tiers.</li><li><strong>Welcome Kit:</strong> Once approved, you'll receive your provider welcome kit.</li></ol></div><p>Questions? Reach out at support@awesomealigners.co.in.</p><p><strong>The Awesome Aligners Provider Relations Team</strong></p></div><div class="footer"><p>Awesome Aligners | support@awesomealigners.co.in</p></div></div></body></html>`;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Rate limiting
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(clientIp)) {
      return new Response(JSON.stringify({ success: false, error: "Too many requests. Please try again later." }), {
        status: 429, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const payload = await req.json();
    
    // Validate required type field
    const validTypes = ["quiz_completion", "doctor_application", "contact_form"];
    if (!payload.type || !validTypes.includes(payload.type)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid request type." }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    let emailResponse;

    if (payload.type === "quiz_completion") {
      const firstName = sanitize(payload.firstName, 100);
      const lastName = sanitize(payload.lastName, 100);
      const email = sanitize(payload.email, 255);
      const recommendation = sanitize(payload.recommendation, 500);
      const quizScore = Math.max(0, Math.min(100, Number(payload.quizScore) || 0));
      if (!isValidEmail(email)) {
        return new Response(JSON.stringify({ success: false, error: "Invalid email." }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const html = quizCompletionEmail(firstName, lastName, quizScore, recommendation);
      emailResponse = await sendEmail(email, "Your Personalised Smile Assessment Results", html);
    } else if (payload.type === "doctor_application") {
      const firstName = sanitize(payload.firstName, 100);
      const lastName = sanitize(payload.lastName, 100);
      const email = sanitize(payload.email, 255);
      const clinicName = sanitize(payload.clinicName, 200);
      const phone = sanitize(payload.phone, 20);
      if (!isValidEmail(email)) {
        return new Response(JSON.stringify({ success: false, error: "Invalid email." }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const html = doctorApplicationEmail(firstName, lastName, clinicName, email, phone);
      emailResponse = await sendEmail(email, "Thank You for Your Partnership Application", html);
    } else if (payload.type === "contact_form") {
      const name = sanitize(payload.name, 100);
      const email = sanitize(payload.email, 255);
      const subject = sanitize(payload.subject, 200);
      if (!isValidEmail(email)) {
        return new Response(JSON.stringify({ success: false, error: "Invalid email." }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const html = contactFormEmail(name, subject);
      emailResponse = await sendEmail(email, "Thanks for Contacting Awesome Aligners", html);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-notification-email:", error);
    return new Response(JSON.stringify({ success: false, error: "An error occurred." }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
