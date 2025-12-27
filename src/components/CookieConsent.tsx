import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    closeWithAnimation();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    closeWithAnimation();
  };

  const closeWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-300",
        isClosing ? "opacity-0 translate-y-full" : "opacity-100 translate-y-0"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-6 md:flex md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4 mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">We value your privacy</h3>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept", you consent to our use of cookies.{' '}
                <a href="/cookie-policy" className="text-primary hover:underline">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={handleDecline}>
              Decline
            </Button>
            <Button size="sm" onClick={handleAccept}>
              Accept All
            </Button>
          </div>
          <button
            onClick={handleDecline}
            className="absolute top-4 right-4 md:hidden text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
