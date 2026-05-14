import { Book } from '@/components/Book';
import { data } from '@/components/data';

export function BookPage(): React.ReactElement {
  const getBookById = (id: number) => {
    const book = data.find((book) => book.id === id);
    if (!book) {
      console.error(`Книга с ID ${id} не найдена`);
    }
    return book || null;
  };

  const currentBook = getBookById(16);

  return <Book book={currentBook} />;
}
