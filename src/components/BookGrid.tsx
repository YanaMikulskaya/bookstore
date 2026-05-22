import type { BookModel } from '@/types';
import { BookCard } from './BookCard';
import { SkeletonBookCard } from './SkeletonBookCard';
import { AlertBasic } from '@/components/basicComponents/AlertBasic';

type BookGridProps = {
  books: BookModel[] | null;
  search?: boolean;
  isLoading?: boolean;
};

export function BookGrid({
  books,
  search,
  isLoading,
}: BookGridProps): React.ReactElement {
  if (!books || books.length === 0) {
    return <AlertBasic title="Не удалось загрузить" />;
  }

  if (isLoading) {
    const skeletonCount = search ? 3 : 12; // Для поиска меньше, для сетки больше
    return (
      <div
        className={
          search
            ? 'flex flex-col gap-6'
            : 'grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
        }
      >
        {[...Array(skeletonCount)].map((_, i) => (
          <SkeletonBookCard
            key={i}
            variant={search ? 'horizontal' : 'compact'}
          />
        ))}
      </div>
    );
  }

  if (search) {
    if (!books || books.length === 0) {
      return <AlertBasic title="Книги по запросу не найдены" />;
    }
    return (
      <div className="flex flex-col gap-6">
        {books.map((book: BookModel) => (
          <BookCard variant="horizontal" key={book.id} data={book} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {books.map((book: BookModel) => (
        <BookCard variant="compact" key={book.id} data={book} />
      ))}
    </div>
  );
}
