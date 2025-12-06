import { Scan, Clock, UserCheck, Heart } from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Advanced 3D Scanning",
    description: "State-of-the-art digital impressions for perfect fit",
  },
  {
    icon: Clock,
    title: "Faster Treatment Planning",
    description: "AI-powered planning reduces time to your perfect smile",
  },
  {
    icon: UserCheck,
    title: "Doctor-Led Monitoring",
    description: "Expert oversight at every step of your journey",
  },
  {
    icon: Heart,
    title: "Designed for Comfort",
    description: "Ultra-thin aligners you'll barely notice",
  },
];

const ValueProposition = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Awesome Aligners?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge technology meets personalized care for results you'll love.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass-card rounded-2xl p-6 hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
