import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  treatmentDuration: string;
  beforeAfter?: boolean;
  videoTestimonial?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "I was skeptical about clear aligners, but Awesome Aligners exceeded all my expectations. The process was smooth, my doctor was amazing, and my smile transformation is incredible. Best investment I've ever made!",
    treatmentDuration: '8 months',
    beforeAfter: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Los Angeles, CA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "As a busy professional, I needed something discreet and convenient. Awesome Aligners fit perfectly into my lifestyle. Nobody even noticed I was wearing them, and the results speak for themselves.",
    treatmentDuration: '10 months',
    videoTestimonial: true,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Chicago, IL',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "The comfort level is unbelievable. I've tried other brands before, but Awesome Aligners are on another level. The smooth edges make all the difference, and the clarity is amazing.",
    treatmentDuration: '6 months',
  },
  {
    id: 4,
    name: 'David Thompson',
    location: 'Miami, FL',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "My orthodontist recommended Awesome Aligners and I'm so glad I listened. The precision of the aligners and the care from the team made my experience exceptional.",
    treatmentDuration: '12 months',
    beforeAfter: true,
  },
  {
    id: 5,
    name: 'Jennifer Lee',
    location: 'Seattle, WA',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "The stain resistance is incredible! I drink coffee daily and my aligners stayed crystal clear throughout my entire treatment. Can't recommend enough!",
    treatmentDuration: '9 months',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Patient Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved by Thousands of Happy Patients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real patients who transformed their smiles with Awesome Aligners.
          </p>
        </div>

        {/* Stats Row */}
        <div className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {[
            { value: '10,000+', label: 'Happy Patients' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '98%', label: 'Would Recommend' },
            { value: '500+', label: 'Verified Reviews' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Testimonial Card */}
        <div className={cn(
          "relative transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/10" />

            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Left - Avatar & Info */}
              <div className="text-center md:text-left">
                <div className="relative inline-block mb-4">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                  />
                  {currentTestimonial.videoTestimonial && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-primary-foreground fill-current" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{currentTestimonial.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">{currentTestimonial.location}</p>
                <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                  <span className="text-xs text-primary font-medium">
                    Treatment: {currentTestimonial.treatmentDuration}
                  </span>
                </div>
              </div>

              {/* Right - Testimonial Text */}
              <div className="md:col-span-2">
                <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
                  "{currentTestimonial.text}"
                </p>
                {currentTestimonial.beforeAfter && (
                  <div className="mt-6 inline-flex items-center gap-2 text-sm text-primary font-medium">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Before & After photos available
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentIndex 
                        ? "w-8 bg-primary" 
                        : "bg-primary/30 hover:bg-primary/50"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Google Reviews Badge */}
        <div className={cn(
          "mt-12 text-center transition-all duration-700 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-card border border-border rounded-full">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">4.9</span> from 500+ Google Reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
