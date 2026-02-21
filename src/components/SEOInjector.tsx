import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Whitelist of allowed script domains for analytics/tracking
const ALLOWED_SCRIPT_DOMAINS = [
  "www.googletagmanager.com",
  "www.google-analytics.com",
  "connect.facebook.net",
  "snap.licdn.com",
  "static.hotjar.com",
  "cdn.segment.com",
  "plausible.io",
  "cdn.mxpnl.com",
];

const isAllowedScriptSrc = (src: string): boolean => {
  try {
    const url = new URL(src);
    return ALLOWED_SCRIPT_DOMAINS.some((domain) => url.hostname === domain || url.hostname.endsWith("." + domain));
  } catch {
    return false;
  }
};

const ALLOWED_GA_ID = /^G-[A-Z0-9]+$/;
const ALLOWED_FB_PIXEL = /^[0-9]+$/;

const SEOInjector = () => {
  useEffect(() => {
    const injectSEO = async () => {
      try {
        const { data } = await (supabase as any)
          .from("seo_settings")
          .select("*")
          .limit(1)
          .single();

        if (!data) return;

        // Google Analytics - validate ID format
        if (data.google_analytics_id && ALLOWED_GA_ID.test(data.google_analytics_id)) {
          const existing = document.getElementById("ga-script");
          if (!existing) {
            const s1 = document.createElement("script");
            s1.id = "ga-script";
            s1.async = true;
            s1.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(data.google_analytics_id)}`;
            document.head.appendChild(s1);

            const s2 = document.createElement("script");
            s2.id = "ga-config";
            s2.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${data.google_analytics_id}');`;
            document.head.appendChild(s2);
          }
        }

        // Google Search Console
        if (data.search_console_code) {
          const existing = document.querySelector('meta[name="google-site-verification"]');
          if (!existing) {
            const meta = document.createElement("meta");
            meta.name = "google-site-verification";
            meta.content = data.search_console_code;
            document.head.appendChild(meta);
          }
        }

        // Facebook Pixel - validate ID format
        if (data.facebook_pixel_id && ALLOWED_FB_PIXEL.test(data.facebook_pixel_id)) {
          const existing = document.getElementById("fb-pixel");
          if (!existing) {
            const s = document.createElement("script");
            s.id = "fb-pixel";
            s.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${data.facebook_pixel_id}');fbq('track','PageView');`;
            document.head.appendChild(s);
          }
        }

        // Custom head scripts - only allow whitelisted external script sources, no inline scripts
        if (data.custom_head_scripts) {
          const existing = document.getElementById("custom-head-scripts");
          if (!existing) {
            const container = document.createElement("div");
            container.id = "custom-head-scripts";
            // Parse safely using DOMParser instead of innerHTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.custom_head_scripts, "text/html");
            
            // Only allow script tags with whitelisted src domains; skip inline scripts
            const scripts = doc.querySelectorAll("script");
            scripts.forEach((script) => {
              if (script.src && isAllowedScriptSrc(script.src)) {
                const newScript = document.createElement("script");
                newScript.src = script.src;
                newScript.async = true;
                document.head.appendChild(newScript);
              }
              // Inline scripts from custom_head_scripts are blocked for security
            });

            // Allow meta tags (safe)
            const metas = doc.querySelectorAll("meta");
            metas.forEach((meta) => {
              const newMeta = document.createElement("meta");
              Array.from(meta.attributes).forEach((attr) => {
                newMeta.setAttribute(attr.name, attr.value);
              });
              document.head.appendChild(newMeta);
            });
          }
        }
      } catch (err) {
        // Silently fail - SEO injection is non-critical
      }
    };

    injectSEO();
  }, []);

  return null;
};

export default SEOInjector;
