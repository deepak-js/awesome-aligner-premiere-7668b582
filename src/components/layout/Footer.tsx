import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const locations = [
  { city: "New York", address: "123 Manhattan Ave, NY 10001" },
  { city: "Los Angeles", address: "456 Beverly Hills Blvd, CA 90210" },
  { city: "Chicago", address: "789 Michigan Ave, IL 60611" },
];

const links = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    { label: "Book a Call", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold mb-4 inline-block">
              Awesome<span className="font-light">Aligners</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Transforming smiles worldwide with cutting-edge clear aligner technology 
              and personalized care.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-accent" />
                <span className="text-primary-foreground/70 text-sm">1-800-ALIGNERS</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-accent" />
                <span className="text-primary-foreground/70 text-sm">hello@awesomealigners.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Locations */}
        <div className="mt-12 pt-12 border-t border-primary-foreground/10">
          <h3 className="font-semibold mb-6">Our Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div key={location.city} className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">{location.city}</div>
                  <div className="text-primary-foreground/60 text-sm">{location.address}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Awesome Aligners. All rights reserved.
          </p>
          <div className="flex gap-6">
            {links.legal.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
