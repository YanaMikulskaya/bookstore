import type { BookModel } from '@/types';
import { BookCard } from './BookCard';
import { AlertBasic } from '@/components/basicComponents/AlertBasic';

type BookGridProps = {
  books: BookModel[] | null;
  search?: boolean;
};

export function BookGrid({ books, search }: BookGridProps): React.ReactElement {
  if (!books || books.length === 0) {
    return <AlertBasic title="Книги временно недоступны" />;
  }
  if (search) {
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
