import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Import before/after images
import before1 from "@/assets/before-1.jpg";
import after1 from "@/assets/after-1.jpg";
import before2 from "@/assets/before-2.jpg";
import after2 from "@/assets/after-2.jpg";
import before3 from "@/assets/before-3.jpg";
import after3 from "@/assets/after-3.jpg";
import before4 from "@/assets/before-4.jpg";
import after4 from "@/assets/after-4.jpg";
import before5 from "@/assets/before-5.jpg";
import after5 from "@/assets/after-5.jpg";
import before6 from "@/assets/before-6.jpg";
import after6 from "@/assets/after-6.jpg";

interface TransformationCase {
  id: number;
  before: string;
  after: string;
  label: string;
}

const transformations: TransformationCase[] = [
  { id: 1, before: before1, after: after1, label: "Crowding Correction" },
  { id: 2, before: before2, after: after2, label: "Gap Closure" },
  { id: 3, before: before3, after: after3, label: "Overbite Fix" },
  { id: 4, before: before4, after: after4, label: "Underbite Correction" },
  { id: 5, before: before5, after: after5, label: "Crossbite Alignment" },
  { id: 6, before: before6, after: after6, label: "Open Bite Repair" },
];

interface SliderCardProps {
  transformation: TransformationCase;
}

const SliderCard = ({ transformation }: SliderCardProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-lg border border-border bg-card hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[4/3]">
        {/* After Image (Background) */}
        <img
          src={transformation.after}
          alt={`After ${transformation.label}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={transformation.before}
            alt={`Before ${transformation.label}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Labels */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
          Before
        </div>
        <div className="absolute top-2 right-2 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
          After
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary/80 shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-xl cursor-ew-resize border-2 border-primary-foreground">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-3 bg-primary-foreground rounded-full" />
              <div className="w-0.5 h-3 bg-primary-foreground rounded-full" />
            </div>
          </div>
        </div>

        {/* Range Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>
      
      {/* Label */}
      <div className="p-3 text-center bg-card">
        <span className="text-sm font-medium text-foreground">{transformation.label}</span>
      </div>
    </div>
  );
};

const BeforeAfter = () => {
  return (
    <section id="results" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Real Results
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            See the Transformation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real patients. Drag the slider to reveal the difference.
          </p>
        </div>

        {/* 6 Before/After Cards - 2 columns, 3 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12 max-w-5xl mx-auto">
          {transformations.map((transformation) => (
            <SliderCard key={transformation.id} transformation={transformation} />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="default" size="lg" className="group" asChild>
            <Link to="/results">
              See More Cases
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/quiz">Am I a Candidate?</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
