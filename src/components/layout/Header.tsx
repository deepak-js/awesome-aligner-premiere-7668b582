import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import QuizModal from "@/components/quiz/QuizModal";
import logo from "@/assets/header-logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/results", label: "Results" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQs" },
  { href: "/blog", label: "Blog" },
  { href: "/for-doctors", label: "For Doctors" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 transition-all duration-300 ${
        isScrolled 
          ? "bg-background shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Awesome Aligners" className="h-12 md:h-14 lg:h-16 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                  : location.pathname === link.href
                    ? "text-primary-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isScrolled ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsQuizOpen(true)}>
                Take Quiz
              </Button>
              <Button size="sm" asChild>
                <Link to="/contact">Get Started</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="heroGhost" size="sm" onClick={() => setIsQuizOpen(true)}>
                Take Quiz
              </Button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/contact">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 transition-colors ${
            isScrolled ? "text-foreground" : "text-primary-foreground"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-lg border-t p-6 animate-fade-in ${
          isScrolled 
            ? "bg-background/95 border-border" 
            : "bg-primary/95 border-primary-foreground/10"
        }`}>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`py-2 text-lg ${
                  isScrolled
                    ? location.pathname === link.href
                      ? "text-primary font-medium"
                      : "text-foreground/80"
                    : location.pathname === link.href
                      ? "text-primary-foreground font-medium"
                      : "text-primary-foreground/80"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              {isScrolled ? (
                <>
                  <Button variant="outline" className="w-full" onClick={() => { setIsMobileMenuOpen(false); setIsQuizOpen(true); }}>
                    Take Quiz
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="heroOutline" className="w-full" onClick={() => { setIsMobileMenuOpen(false); setIsQuizOpen(true); }}>
                    Take Quiz
                  </Button>
                  <Button variant="hero" className="w-full" asChild>
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </header>
  );
};

export default Header;
