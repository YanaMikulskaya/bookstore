import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';

type SkeletonBookCardProps = {
  variant?: 'compact' | 'horizontal' | 'modal' | 'cart';
};

export function SkeletonBookCard({
  variant = 'compact',
}: SkeletonBookCardProps): React.ReactElement {
  const isModal = variant === 'modal';

  // Компактная версия (сетка)
  if (variant === 'compact') {
    return (
      <Card className="flex relative mx-auto w-full max-w-sm pt-0">
        {/* Бейдж жанра */}
        <Skeleton className="absolute top-3 left-3 z-30 h-5 w-16 rounded-full" />

        {/* Изображение */}
        <div className="relative w-full" style={{ aspectRatio: '10/16' }}>
          <Skeleton className="h-full w-full rounded-t-lg" />
        </div>

        <CardHeader className="space-y-2">
          <Skeleton className="h-4 w-20" /> {/* Цена */}
          <Skeleton className="h-4 w-full" /> {/* Название */}
          <Skeleton className="h-3 w-3/4" /> {/* Автор, год */}
        </CardHeader>

        <CardFooter className="mt-auto">
          <Skeleton className="h-9 w-full rounded-md" /> {/* Кнопки действий */}
        </CardFooter>
      </Card>
    );
  }

  // Горизонтальная версия (поиск, модальная, корзина)
  return (
    <Card className="flex sm:flex-row relative items-center mx-auto w-full p-0 gap-0">
      <Skeleton className="absolute top-3 left-3 z-30 h-5 w-16 rounded-full" />

      <Skeleton
        className="relative shrink-0"
        style={{
          width: isModal ? '200px' : '120px',
          aspectRatio: '10/16',
        }}
      />

      <div className="flex flex-col gap-2 p-4 flex-1">
        <Skeleton className="h-5 w-24" /> {/* Цена */}
        <Skeleton className={`h-5 w-3/4 ${isModal ? 'h-6' : ''}`} />{' '}
        {/* Название */}
        <Skeleton className={`h-3 w-1/2 ${isModal ? 'h-4' : ''}`} />{' '}
        {/* Автор, год */}
        {(variant === 'modal' || variant === 'cart') && (
          <>
            <Skeleton className="h-3 w-full mt-2" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </>
        )}
        {variant !== 'cart' && (
          <Skeleton className="h-9 w-32 rounded-md mt-2" />
        )}
      </div>
    </Card>
  );
}
