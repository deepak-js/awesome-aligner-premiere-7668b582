import { Shield, Award, CheckCircle, BadgeCheck } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/utils';

const certifications = [
  { icon: Shield, label: 'FDA Cleared', description: 'Safe & Approved' },
  { icon: Award, label: 'ISO 13485', description: 'Quality Certified' },
  { icon: CheckCircle, label: 'CE Marked', description: 'European Standard' },
  { icon: BadgeCheck, label: 'BPA Free', description: 'Medical Grade' },
];

const pressLogos = [
  { name: 'Forbes', opacity: 0.7 },
  { name: 'TechCrunch', opacity: 0.7 },
  { name: 'Healthline', opacity: 0.7 },
  { name: 'WebMD', opacity: 0.7 },
  { name: 'Business Insider', opacity: 0.7 },
];

const StatCard = ({ 
  value, 
  suffix = '', 
  prefix = '', 
  label, 
  delay = 0 
}: { 
  value: number; 
  suffix?: string; 
  prefix?: string;
  label: string; 
  delay?: number;
}) => {
  const { ref, formattedValue } = useCountUp({ 
    end: value, 
    duration: 2500, 
    suffix,
    prefix,
    decimals: suffix === '%' ? 0 : 0
  });

  return (
    <div 
      ref={ref} 
      className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {formattedValue}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

const TrustBadgesSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Trusted & Certified
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Millions Trust Awesome Aligners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Backed by science, approved by regulators, and trusted by dental professionals worldwide.
          </p>
        </div>

        {/* Animated Stats */}
        <div className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <StatCard value={10000} suffix="+" label="Patients Treated" delay={0} />
          <StatCard value={500} suffix="+" label="Partner Doctors" delay={100} />
          <StatCard value={98} suffix="%" label="Success Rate" delay={200} />
          <StatCard value={50} suffix="+" label="Countries Served" delay={300} />
        </div>

        {/* Certifications */}
        <div className={cn(
          "mb-16 transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h3 className="text-center text-lg font-semibold text-foreground mb-8">
            Certifications & Compliance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={cert.label}
                className="flex flex-col items-center p-6 rounded-2xl bg-muted/50 border border-border hover:bg-muted transition-colors"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <cert.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-sm font-semibold text-foreground">{cert.label}</div>
                <div className="text-xs text-muted-foreground">{cert.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* As Seen In */}
        <div className={cn(
          "transition-all duration-700 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h3 className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-wider">
            As Featured In
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {pressLogos.map((logo) => (
              <div
                key={logo.name}
                className="text-2xl md:text-3xl font-bold text-foreground/30 hover:text-foreground/50 transition-colors cursor-default"
              >
                {logo.name}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Statement */}
        <div className={cn(
          "mt-16 text-center transition-all duration-700 delay-400",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-primary/5 border border-primary/20 rounded-2xl">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-sm md:text-base text-foreground">
              <span className="font-semibold">100% Satisfaction Guarantee</span>
              <span className="text-muted-foreground"> — Love your smile or get your money back</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
