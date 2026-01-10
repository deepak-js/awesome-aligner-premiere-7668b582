import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Page enter animation
    gsap.fromTo(
      container,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        ease: 'power3.out',
        clearProps: 'all'
      }
    );

    // Animate children with stagger
    const animatableElements = container.querySelectorAll('[data-animate]');
    if (animatableElements.length > 0) {
      gsap.fromTo(
        animatableElements,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);

  }, [location.pathname]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

export default PageTransition;
