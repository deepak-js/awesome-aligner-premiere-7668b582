import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import teethBefore from "@/assets/teeth-before-1.jpg";
import teethAfter from "@/assets/teeth-after-1.jpg";

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section id="results" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Real Results
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See the Transformation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real patients. Drag the slider to reveal the difference.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Slider Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-10 border border-border">
            <div className="relative aspect-[4/3]">
              {/* After Image (Background) */}
              <img
                src={teethAfter}
                alt="After dental alignment - beautiful straight teeth"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={teethBefore}
                  alt="Before dental alignment"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium">
                Before
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                After
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl cursor-ew-resize">
                  <div className="flex gap-1">
                    <div className="w-0.5 h-4 bg-primary rounded-full" />
                    <div className="w-0.5 h-4 bg-primary rounded-full" />
                    <div className="w-0.5 h-4 bg-primary rounded-full" />
                  </div>
                </div>
              </div>

              {/* Range Input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              />
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="text-center p-6 rounded-2xl bg-card border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">10,000+</div>
              <div className="text-sm text-muted-foreground">Smiles Transformed</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
          </div>

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
      </div>
    </section>
  );
};

export default BeforeAfter;
