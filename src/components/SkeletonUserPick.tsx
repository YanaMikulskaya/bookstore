import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonUserPick(): React.ReactElement {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-3 w-[70px]" />
      </div>
    </div>
  );
}
