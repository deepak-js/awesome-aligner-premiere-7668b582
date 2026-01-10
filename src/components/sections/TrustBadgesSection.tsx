import { Shield, Award, CheckCircle, BadgeCheck, Users, Star, Globe, ThumbsUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/utils';
import BrandLogosSlider from '@/components/BrandLogosSlider';

const certifications = [
  { icon: Shield, label: 'FDA Cleared', description: 'Safe & Approved' },
  { icon: Award, label: 'ISO 13485', description: 'Quality Certified' },
  { icon: CheckCircle, label: 'CE Marked', description: 'European Standard' },
  { icon: BadgeCheck, label: 'BPA Free', description: 'Medical Grade' },
];

const stats = [
  { value: 10000, suffix: '+', label: 'Happy Patients', icon: Users },
  { value: 4.9, suffix: '/5', label: 'Average Rating', icon: Star, decimals: 1 },
  { value: 98, suffix: '%', label: 'Recommend Us', icon: ThumbsUp },
  { value: 98, suffix: '%', label: 'Success Rate', icon: Award },
  { value: 50, suffix: '+', label: 'Countries Served', icon: Globe },
];

const StatCard = ({ 
  value, 
  suffix = '', 
  label,
  icon: Icon,
  decimals = 0,
  delay = 0 
}: { 
  value: number; 
  suffix?: string; 
  label: string;
  icon: any;
  decimals?: number;
  delay?: number;
}) => {
  const { ref, formattedValue } = useCountUp({ 
    end: value, 
    duration: 2500, 
    suffix,
    decimals
  });

  return (
    <div 
      ref={ref} 
      className="flex items-center gap-3 px-4 py-3 md:px-5 md:py-4 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
      </div>
      <div>
        <div className="text-xl md:text-2xl font-bold text-primary">
          {formattedValue}
        </div>
        <div className="text-xs text-muted-foreground whitespace-nowrap">{label}</div>
      </div>
    </div>
  );
};

const TrustBadgesSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className={cn(
          "text-center mb-12 transition-all duration-700",
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

        {/* Stats Row - Single consolidated location for all KPIs */}
        <div className={cn(
          "mb-12 transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {stats.map((stat, index) => (
              <StatCard 
                key={stat.label}
                value={stat.value} 
                suffix={stat.suffix} 
                label={stat.label}
                icon={stat.icon}
                decimals={stat.decimals}
                delay={index * 100} 
              />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className={cn(
          "mb-12 transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h3 className="text-center text-lg font-semibold text-foreground mb-6">
            Certifications & Compliance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div
                key={cert.label}
                className="flex flex-col items-center p-4 md:p-6 rounded-2xl bg-muted/50 border border-border hover:bg-muted transition-colors"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <cert.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div className="text-sm font-semibold text-foreground text-center">{cert.label}</div>
                <div className="text-xs text-muted-foreground text-center">{cert.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* As Seen In - Auto-scrolling slider */}
        <div className={cn(
          "transition-all duration-700 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <BrandLogosSlider />
        </div>

        {/* Trust Statement */}
        <div className={cn(
          "mt-12 text-center transition-all duration-700 delay-400",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-primary/5 border border-primary/20 rounded-2xl">
            <Shield className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm md:text-base text-foreground">
              <span className="font-semibold">100% Satisfaction Guarantee</span>
              <span className="text-muted-foreground hidden sm:inline"> — Love your smile or get your money back</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
