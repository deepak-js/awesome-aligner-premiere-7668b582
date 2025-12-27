import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const suggestedLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'How It Works', href: '/how-it-works', icon: Search },
  { label: 'Take the Quiz', href: '/quiz', icon: HelpCircle },
  { label: 'Contact Us', href: '/contact', icon: HelpCircle },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center bg-muted/30 px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <h1 className="text-[150px] md:text-[200px] font-bold text-primary/10 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl md:text-8xl font-bold text-primary animate-pulse">
                😕
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, let's get you back on track!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Suggested Links */}
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground mb-4">Or try one of these pages:</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {suggestedLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <link.icon className="w-4 h-4 text-primary" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="mt-12 p-6 bg-card rounded-2xl border border-border">
            <p className="text-sm text-muted-foreground">
              Still can't find what you're looking for?{' '}
              <Link to="/contact" className="text-primary font-medium hover:underline">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default NotFound;
