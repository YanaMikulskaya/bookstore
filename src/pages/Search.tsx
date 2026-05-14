import { BookGrid } from '@/components/BookGrid';
import { data } from '@/components/data';
import { Title } from '@/components/Title';

export function Search(): React.ReactElement {
  const booksData = data;
  const searchText = 'Гарри';

  return (
    <>
      <Title>Результат поиска '{searchText}'</Title>
      <BookGrid search books={booksData} />
    </>
  );
}
