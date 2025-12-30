import { Skeleton } from '@/components/ui/skeleton';

const ResultsCardSkeleton = () => {
  return (
    <div className="group">
      <Skeleton className="aspect-[4/3] rounded-xl mb-4" />
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-5 w-3/4 mb-1" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
};

export default ResultsCardSkeleton;
