import { Skeleton } from '@/components/ui/skeleton';

const HeroSkeleton = () => {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <Skeleton className="h-8 w-32 mx-auto rounded-full" />
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-12 w-2/3 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <div className="flex gap-4 justify-center mt-8">
          <Skeleton className="h-12 w-40 rounded-lg" />
          <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
