import consultationImg from "@/assets/doctor-patient-consultation.jpg";
import scanImg from "@/assets/step-3d-scan.jpg";
import fabricationImg from "@/assets/step-fabrication.jpg";
import receiveImg from "@/assets/step-receive-aligners.jpg";
import progressImg from "@/assets/step-progress-checkup.jpg";
import smileImg from "@/assets/step-perfect-smile.jpg";

const steps = [
  {
    step: "01",
    title: "Consultation",
    description: "Meet with a certified provider for a complete oral health assessment and discuss your smile goals.",
    image: consultationImg,
  },
  {
    step: "02",
    title: "3D Digital Scan",
    description: "High-precision 3D scanning captures exact tooth positions for your customized treatment plan.",
    image: scanImg,
  },
  {
    step: "03",
    title: "Aligner Fabrication",
    description: "Custom clear aligners manufactured using advanced technology based on your approved plan.",
    image: fabricationImg,
  },
  {
    step: "04",
    title: "Receive Aligners",
    description: "Your custom aligners are delivered. Wear them 20-22 hours daily, changing sets every 1-2 weeks.",
    image: receiveImg,
  },
  {
    step: "05",
    title: "Progress Monitoring",
    description: "Regular check-ins with your doctor to track progress and make adjustments if needed.",
    image: progressImg,
  },
  {
    step: "06",
    title: "Perfect Smile",
    description: "Complete your transformation and reveal your beautiful new smile!",
    image: smileImg,
  },
];

const ProcessSteps = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            The Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Awesome Aligners Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple, doctor-guided journey to your perfect smile in 6 easy steps.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-[120px] left-0 right-0 h-1 bg-border">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-30" />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative group"
              >
                {/* Card */}
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    
                    {/* Step Number Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                        <span className="text-primary-foreground font-bold text-lg">{step.step}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Connector (Desktop) */}
                <div className="hidden lg:flex absolute -top-4 left-1/2 -translate-x-1/2 flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md" />
                  <div className="w-0.5 h-8 bg-border" />
                </div>

                {/* Arrow Connector (Mobile/Tablet) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center py-4">
                    <div className="w-0.5 h-8 bg-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline Alternative */}
        <div className="lg:hidden mt-8">
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Your journey from consultation to perfect smile</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
