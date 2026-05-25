import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonBook(): React.ReactElement {
  return (
    <div className="flex flex-col items-center md:flex-row md:items-start gap-10 mb-3">
      {/* Скелетон для изображения */}
      <div className="shrink-0">
        <Skeleton className="w-[300px] h-[480px] rounded-lg" />
      </div>

      {/* Правая часть */}
      <div className="flex-1">
        {/* Верхняя часть с таблицей и кнопками */}
        <div className="flex flex-col-reverse md:flex-row gap-3 mb-3 justify-between">
          {/* Скелетон для TableBasic */}
          <div className="w-3xs space-y-2">
            <Skeleton className="h-4 w-24" /> {/* price */}
            <Skeleton className="h-4 w-32" /> {/* author */}
            <Skeleton className="h-4 w-20" /> {/* year */}
            <Skeleton className="h-4 w-28" /> {/* genre */}
          </div>

          {/* Скелетон для BookActions */}
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        {/* Скелетон для longDescription */}
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
}
