import { Skeleton } from '@/components/ui/skeleton';

interface CardSkeletonProps {
  className?: string;
}

const CardSkeleton = ({ className }: CardSkeletonProps) => {
  return (
    <div className={`rounded-2xl border border-border bg-card p-6 ${className}`}>
      <Skeleton className="h-40 w-full rounded-xl mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
};

export default CardSkeleton;
