import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary-foreground tracking-tight">
            Awesome<span className="font-light">Aligners</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
            How It Works
          </a>
          <a href="#results" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
            Results
          </a>
          <a href="#for-doctors" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
            For Doctors
          </a>
          <a href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
            Contact
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="heroGhost" size="sm">
            Log In
          </Button>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-lg border-t border-primary-foreground/10 p-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            <a href="#how-it-works" className="text-primary-foreground py-2 text-lg">How It Works</a>
            <a href="#results" className="text-primary-foreground py-2 text-lg">Results</a>
            <a href="#for-doctors" className="text-primary-foreground py-2 text-lg">For Doctors</a>
            <a href="#contact" className="text-primary-foreground py-2 text-lg">Contact</a>
            <div className="flex flex-col gap-3 mt-4">
              <Button variant="heroOutline" className="w-full">Log In</Button>
              <Button variant="hero" className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
