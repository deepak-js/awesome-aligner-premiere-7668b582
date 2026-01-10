import { Check, Calendar, Scan, Package, Smile, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'completed' | 'current' | 'upcoming';
}

interface ProgressTrackerProps {
  currentStep?: number;
  className?: string;
}

const steps: ProgressStep[] = [
  {
    id: 1,
    title: 'Consultation',
    description: 'Free assessment with our dental experts',
    icon: Calendar,
    status: 'upcoming',
  },
  {
    id: 2,
    title: '3D Scan & Planning',
    description: 'Precise digital impression of your teeth',
    icon: Scan,
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Aligner Fabrication',
    description: 'Your custom aligners are crafted',
    icon: Package,
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Treatment',
    description: 'Wear aligners & track your progress',
    icon: Clock,
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'Progress Monitoring',
    description: 'Regular check-ins with your doctor',
    icon: Sparkles,
    status: 'upcoming',
  },
  {
    id: 6,
    title: 'Perfect Smile',
    description: 'Reveal your transformed smile!',
    icon: Smile,
    status: 'upcoming',
  },
];

const ProgressTracker = ({ currentStep = 1, className }: ProgressTrackerProps) => {
  const getStepStatus = (stepId: number): 'completed' | 'current' | 'upcoming' => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className={cn('w-full py-8', className)}>
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-center text-lg font-semibold text-foreground mb-8">
          Your Smile Journey
        </h3>
        
        {/* Desktop view */}
        <div className="hidden md:flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />
          <div 
            className="absolute top-6 left-0 h-0.5 bg-primary transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
          
          {steps.map((step) => {
            const status = getStepStatus(step.id);
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300',
                    status === 'completed' && 'bg-primary text-primary-foreground',
                    status === 'current' && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                    status === 'upcoming' && 'bg-muted text-muted-foreground'
                  )}
                >
                  {status === 'completed' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div className="mt-3 text-center">
                  <p className={cn(
                    'text-xs font-medium',
                    status === 'current' ? 'text-primary' : 'text-foreground'
                  )}>
                    {step.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground max-w-[100px] hidden lg:block">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Mobile view */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                      status === 'completed' && 'bg-primary text-primary-foreground',
                      status === 'current' && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                      status === 'upcoming' && 'bg-muted text-muted-foreground'
                    )}
                  >
                    {status === 'completed' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'w-0.5 h-12 mt-2',
                      status === 'completed' ? 'bg-primary' : 'bg-border'
                    )} />
                  )}
                </div>
                <div className="pt-1">
                  <p className={cn(
                    'text-sm font-medium',
                    status === 'current' ? 'text-primary' : 'text-foreground'
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
