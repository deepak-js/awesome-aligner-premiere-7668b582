import { Skeleton } from '@/components/ui/skeleton';

interface BlogCardSkeletonProps {
  featured?: boolean;
}

const BlogCardSkeleton = ({ featured = false }: BlogCardSkeletonProps) => {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Skeleton className={`w-full ${featured ? 'aspect-video' : 'aspect-video'}`} />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className={`h-6 w-full mb-2 ${featured ? 'h-7' : ''}`} />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
