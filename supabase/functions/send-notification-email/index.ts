import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuizCompletionRequest {
  type: "quiz_completion";
  firstName: string;
  lastName: string;
  email: string;
  recommendation: string;
  quizScore: number;
}

interface DoctorApplicationRequest {
  type: "doctor_application";
  firstName: string;
  lastName: string;
  email: string;
  clinicName: string;
  phone: string;
}

type EmailRequest = QuizCompletionRequest | DoctorApplicationRequest;

async function sendEmail(to: string, subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Awesome Aligners <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return response.json();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: EmailRequest = await req.json();
    console.log("Received email request:", payload.type);

    let emailResponse;

    if (payload.type === "quiz_completion") {
      const { firstName, lastName, email, recommendation, quizScore } = payload;
      
      console.log(`Sending quiz completion email to ${email}`);
      
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .score-box { background: white; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .score { font-size: 48px; font-weight: bold; color: #0066cc; }
            .recommendation { background: #e8f4fd; border-left: 4px solid #0066cc; padding: 15px; margin: 20px 0; }
            .cta-button { display: inline-block; background: #0066cc; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Smile Assessment Results</h1>
              <p>Thank you for completing the Awesome Aligners quiz, ${firstName}!</p>
            </div>
            <div class="content">
              <p>Hi ${firstName} ${lastName},</p>
              <p>Great news! We've analyzed your responses and have a personalized recommendation for you.</p>
              
              <div class="score-box">
                <p style="margin: 0; color: #666;">Your Compatibility Score</p>
                <p class="score">${quizScore}%</p>
              </div>
              
              <div class="recommendation">
                <strong>Our Recommendation:</strong>
                <p style="margin-bottom: 0;">${recommendation}</p>
              </div>
              
              <p>Based on your assessment, clear aligners could be a great fit for your smile goals. Our team is ready to help you take the next step.</p>
              
              <p style="text-align: center;">
                <a href="https://awesomealigners.com/contact" class="cta-button">Schedule a Free Consultation</a>
              </p>
              
              <p>Have questions? Reply to this email or call us at 1-800-ALIGNERS.</p>
              
              <p>Looking forward to helping you achieve your dream smile!</p>
              <p><strong>The Awesome Aligners Team</strong></p>
            </div>
            <div class="footer">
              <p>Awesome Aligners | 1-800-ALIGNERS | support@awesomealigners.com</p>
              <p>You received this email because you completed our smile assessment quiz.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      emailResponse = await sendEmail(email, "Your Personalized Smile Assessment Results", html);
      console.log("Quiz completion email sent successfully:", emailResponse);
      
    } else if (payload.type === "doctor_application") {
      const { firstName, lastName, email, clinicName, phone } = payload;
      
      console.log(`Sending doctor application confirmation to ${email}`);
      
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; border-radius: 10px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .next-steps { background: #e8f4fd; border-radius: 10px; padding: 20px; margin: 20px 0; }
            .next-steps li { margin: 10px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Partnership Application Received</h1>
              <p>Welcome to the Awesome Aligners Provider Network</p>
            </div>
            <div class="content">
              <p>Dear Dr. ${firstName} ${lastName},</p>
              <p>Thank you for your interest in becoming an Awesome Aligners partner provider. We've received your application and are excited to potentially work with ${clinicName}.</p>
              
              <div class="info-box">
                <h3 style="margin-top: 0;">Application Details</h3>
                <p><strong>Name:</strong> Dr. ${firstName} ${lastName}</p>
                <p><strong>Clinic:</strong> ${clinicName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
              </div>
              
              <div class="next-steps">
                <h3 style="margin-top: 0;">What Happens Next?</h3>
                <ol>
                  <li><strong>Application Review:</strong> Our team will review your application within 2-3 business days.</li>
                  <li><strong>Credentials Verification:</strong> We'll verify your professional credentials and practice information.</li>
                  <li><strong>Onboarding Call:</strong> A partnership specialist will contact you to discuss partnership tiers and benefits.</li>
                  <li><strong>Welcome Kit:</strong> Once approved, you'll receive your provider welcome kit and training materials.</li>
                </ol>
              </div>
              
              <p>If you have any questions in the meantime, please don't hesitate to reach out to our provider relations team at providers@awesomealigners.com or call 1-800-ALIGNERS ext. 2.</p>
              
              <p>We look forward to partnering with you!</p>
              <p><strong>The Awesome Aligners Provider Relations Team</strong></p>
            </div>
            <div class="footer">
              <p>Awesome Aligners | Provider Relations | providers@awesomealigners.com</p>
              <p>This email confirms your partnership application submission.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      emailResponse = await sendEmail(email, "Thank You for Your Partnership Application", html);
      console.log("Doctor application email sent successfully:", emailResponse);
    }

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
