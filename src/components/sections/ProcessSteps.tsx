import { Stethoscope, ScanLine, ClipboardList, Package, Activity } from "lucide-react";
import scanningImage from "@/assets/3d-scanning.jpg";

const steps = [
  {
    icon: Stethoscope,
    step: "01",
    title: "Meet Your Doctor",
    description: "Initial consultation with a certified provider",
  },
  {
    icon: ScanLine,
    step: "02",
    title: "Get Your 3D Scan",
    description: "Digital impressions for precision planning",
  },
  {
    icon: ClipboardList,
    step: "03",
    title: "Treatment Planning",
    description: "Customized plan tailored to your smile goals",
  },
  {
    icon: Package,
    step: "04",
    title: "Aligner Delivery",
    description: "Receive your custom aligners at home",
  },
  {
    icon: Activity,
    step: "05",
    title: "Progress Check-ins",
    description: "Regular monitoring to ensure perfect results",
  },
];

const ProcessSteps = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src={scanningImage}
                alt="3D dental scanning technology"
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent/20 rounded-full blur-2xl -z-10" />
          </div>

          {/* Right - Steps */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How the Awesome Aligners Process Works
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              A simple, doctor-guided journey to your perfect smile.
            </p>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.step}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center group-hover:bg-secondary transition-colors">
                      <step.icon className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="flex-1 pb-6 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                        Step {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
