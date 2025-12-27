import { useEffect, useRef, useState } from "react";

import hazyAligner from "@/assets/comparison-hazy-aligner.jpg";
import clearAligner from "@/assets/comparison-clear-aligner.jpg";
import sharpEdge from "@/assets/comparison-sharp-edge.jpg";
import smoothEdge from "@/assets/comparison-smooth-edge.jpg";
import stainedAligner from "@/assets/comparison-stained-aligner.jpg";
import unstainedAligner from "@/assets/comparison-unstained-aligner.jpg";

interface ComparisonRowProps {
  heading: string;
  description: string;
  leftImage: string;
  rightImage: string;
  leftAlt: string;
  rightAlt: string;
  index: number;
}

const ComparisonRow = ({
  heading,
  description,
  leftImage,
  rightImage,
  leftAlt,
  rightAlt,
  index,
}: ComparisonRowProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border/50">
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            {heading}
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left - Typical Clear Aligners */}
          <div className="space-y-3">
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-full">
                Typical Clear Aligners
              </span>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border/50 bg-muted/30">
              <img
                src={leftImage}
                alt={leftAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Awesome Aligners */}
          <div className="space-y-3">
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
                Awesome Aligners
              </span>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden border-2 border-primary/30 bg-primary/5 ring-2 ring-primary/10">
              <img
                src={rightImage}
                alt={rightAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const comparisonData = [
  {
    heading: "More Clear",
    description:
      "Designed for near-invisibility. Awesome Aligners stay clearer and less noticeable during daily wear.",
    leftImage: hazyAligner,
    rightImage: clearAligner,
    leftAlt: "Typical hazy aligner with frosted appearance",
    rightAlt: "Crystal-clear Awesome Aligner",
  },
  {
    heading: "More Comfortable",
    description:
      "Smooth, polished, scalloped edges reduce irritation and improve all-day comfort.",
    leftImage: sharpEdge,
    rightImage: smoothEdge,
    leftAlt: "Typical aligner with sharp edges",
    rightAlt: "Awesome Aligner with smooth rounded edges",
  },
  {
    heading: "Stains Less",
    description:
      "Advanced aligner material resists staining from food and beverages over time.",
    leftImage: stainedAligner,
    rightImage: unstainedAligner,
    leftAlt: "Yellowed stained aligner",
    rightAlt: "Clear unstained Awesome Aligner",
  },
];

const ComparisonSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Patients Choose{" "}
            <span className="text-primary">Awesome Aligners</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See the difference that premium materials and precision engineering
            make in your smile journey.
          </p>
        </div>

        <div className="space-y-8 md:space-y-12 max-w-5xl mx-auto">
          {comparisonData.map((row, index) => (
            <ComparisonRow key={row.heading} {...row} index={index} />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 italic">
          Visual comparison for illustration purposes.
        </p>
      </div>
    </section>
  );
};

export default ComparisonSection;
