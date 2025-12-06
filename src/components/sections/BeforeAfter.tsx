import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import beforeAfterImage from "@/assets/before-after.jpg";

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section id="results" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See the Transformation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real patients. Drag the slider to reveal the difference.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Slider Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-10">
            <div className="relative aspect-video">
              {/* Before/After Image */}
              <img
                src={beforeAfterImage}
                alt="Before and after dental alignment"
                className="w-full h-full object-cover"
              />
              
              {/* Slider Overlay */}
              <div
                className="absolute inset-0 bg-primary/90 flex items-center justify-center"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="text-center text-primary-foreground px-4">
                  <div className="text-2xl md:text-4xl font-bold mb-2">Before</div>
                  <div className="text-primary-foreground/70">Slide to reveal</div>
                </div>
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-primary-foreground shadow-lg"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-4 bg-primary rounded-full" />
                    <div className="w-1 h-4 bg-primary rounded-full" />
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
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">10,000+</div>
              <div className="text-sm text-muted-foreground">Smiles Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
          </div>

          <div className="text-center">
            <Button variant="default" size="lg" className="group">
              See More Cases
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
