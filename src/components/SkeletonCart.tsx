import { Skeleton } from '@/components/ui/skeleton';

type SkeletonCartProps = {
  itemsCount?: number;
};

export function SkeletonCart({
  itemsCount = 3,
}: SkeletonCartProps): React.ReactElement {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Левая колонка */}
      <div className="flex-1 space-y-4">
        {Array.from({ length: itemsCount }).map((_, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-4 p-4">
            <div className="sm:w-48 shrink-0 flex-1">
              <Skeleton className="h-48 w-full rounded-lg" />
              <div className="mt-2 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-5 w-1/3" />
              </div>
            </div>

            <div className="flex-1 flex flex-col items-start gap-4">
              <div className="flex gap-1 ml-auto">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8 ml-2" />
              </div>
              <div className="mt-auto ml-auto space-y-1">
                <Skeleton className="h-4 w-16 ml-auto" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Правая колонка */}
      <div className="lg:w-80">
        <div className="bg-card rounded-lg border p-6 sticky top-20 space-y-4">
          <Skeleton className="h-6 w-24" />
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-px w-full" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-3 w-48 mx-auto" />
        </div>
      </div>
    </div>
  );
}
