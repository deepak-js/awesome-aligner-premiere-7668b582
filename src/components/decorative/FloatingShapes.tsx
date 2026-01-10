import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FloatingShapesProps {
  variant?: 'hero' | 'section';
}

const FloatingShapes = ({ variant = 'section' }: FloatingShapesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const shapes = container.querySelectorAll('[data-floating-shape]');
    
    shapes.forEach((shape, index) => {
      const duration = 4 + Math.random() * 3;
      const delay = index * 0.3;
      
      gsap.to(shape, {
        y: `+=${15 + Math.random() * 20}`,
        x: `+=${-10 + Math.random() * 20}`,
        rotation: `+=${-5 + Math.random() * 10}`,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      });
    });

    return () => {
      shapes.forEach(shape => {
        gsap.killTweensOf(shape);
      });
    };
  }, []);

  if (variant === 'hero') {
    return (
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orb - top right */}
        <div
          data-floating-shape
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.4) 0%, transparent 70%)',
          }}
        />
        
        {/* Medium orb - bottom left */}
        <div
          data-floating-shape
          className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, hsl(var(--secondary) / 0.5) 0%, transparent 70%)',
          }}
        />
        
        {/* Small accent shapes */}
        <div
          data-floating-shape
          className="absolute top-1/4 left-10 w-3 h-3 rounded-full bg-accent/30"
        />
        <div
          data-floating-shape
          className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-primary-foreground/20"
        />
        <div
          data-floating-shape
          className="absolute bottom-1/4 right-10 w-4 h-4 rounded-full bg-accent/20"
        />
        
        {/* Subtle gradient line */}
        <div
          data-floating-shape
          className="absolute top-1/2 left-1/4 w-32 h-0.5 opacity-10 rotate-45"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)',
          }}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle gradient orbs for sections */}
      <div
        data-floating-shape
        className="absolute -top-20 -right-20 w-[250px] h-[250px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
        }}
      />
      <div
        data-floating-shape
        className="absolute -bottom-16 -left-16 w-[200px] h-[200px] rounded-full opacity-8"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, transparent 70%)',
        }}
      />
      
      {/* Tiny floating dots */}
      <div
        data-floating-shape
        className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-primary/10"
      />
      <div
        data-floating-shape
        className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-accent/15"
      />
    </div>
  );
};

export default FloatingShapes;
