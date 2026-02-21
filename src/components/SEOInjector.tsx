import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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

        // Google Analytics
        if (data.google_analytics_id) {
          const existing = document.getElementById("ga-script");
          if (!existing) {
            const s1 = document.createElement("script");
            s1.id = "ga-script";
            s1.async = true;
            s1.src = `https://www.googletagmanager.com/gtag/js?id=${data.google_analytics_id}`;
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

        // Facebook Pixel
        if (data.facebook_pixel_id) {
          const existing = document.getElementById("fb-pixel");
          if (!existing) {
            const s = document.createElement("script");
            s.id = "fb-pixel";
            s.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${data.facebook_pixel_id}');fbq('track','PageView');`;
            document.head.appendChild(s);
          }
        }

        // Custom head scripts
        if (data.custom_head_scripts) {
          const existing = document.getElementById("custom-head-scripts");
          if (!existing) {
            const container = document.createElement("div");
            container.id = "custom-head-scripts";
            container.innerHTML = data.custom_head_scripts;
            const scripts = container.querySelectorAll("script");
            scripts.forEach((script) => {
              const newScript = document.createElement("script");
              if (script.src) newScript.src = script.src;
              if (script.textContent) newScript.textContent = script.textContent;
              document.head.appendChild(newScript);
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
