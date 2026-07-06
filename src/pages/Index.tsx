import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import ValueProposition from "@/components/sections/ValueProposition";
import TrustBadgesSection from "@/components/sections/TrustBadgesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import QuizCTA from "@/components/sections/QuizCTA";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <main className="min-h-screen animate-page-enter">
      <SEOHead
        title="Awesome Aligners | Premium Clear Aligners for Your Perfect Smile"
        description="Transform your smile with Awesome Aligners. Orthodontist-supervised clear aligners designed for comfort, precision, and confidence. Book your free consultation today."
        canonical="https://awesomealigners.in/"
        ogImage="https://awesomealigners.in/og-image.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Awesome Aligners",
          "description": "Premium clear aligners for teeth straightening, orthodontist-supervised",
          "url": "https://awesomealigners.in",
          "telephone": "+919150220394",
          "address": [
            {
              "@type": "PostalAddress",
              "streetAddress": "3rd Floor, Warwick Wing, Sun Clinics UK Ltd, 701 Chester Road, Stretford",
              "addressLocality": "Manchester",
              "postalCode": "M32 0RW",
              "addressCountry": "GB"
            },
            {
              "@type": "PostalAddress",
              "streetAddress": "63, Balaji Nagar, 4th Street, Alwarthirunagar",
              "addressLocality": "Chennai",
              "postalCode": "600087",
              "addressCountry": "IN"
            },
            {
              "@type": "PostalAddress",
              "streetAddress": "B-19, 6th Cross Road, Arulanandha Nagar Main Road",
              "addressLocality": "Thanjavur",
              "postalCode": "613007",
              "addressCountry": "IN"
            }
          ],
          "sameAs": [
            "https://www.facebook.com/awesomealigners/",
            "https://www.instagram.com/awesome_aligners/",
            "https://www.youtube.com/channel/UCImKOXPepSJ-2FWjnnHsi8g",
            "https://linkedin.com/company/awesomealigners"
          ]
        }}
      />
      <Header />
      <HeroSection />
      <ValueProposition />
      <TrustBadgesSection />
      <TestimonialsSection />
      <QuizCTA />
      <Footer />
    </main>
  );
};

export default Index;
