import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchSearchBooks } from '@/redux/books-slice';
import { BookGrid } from '@/components/BookGrid';
import { Title } from '@/components/Title';
import { AlertBasic } from '@/components/basicComponents/AlertBasic';
import type { BooksState } from '@/types';

export function Search(): React.ReactElement {
  const { searchText } = useParams();
  const decodedSearchText: string = searchText
    ? decodeURIComponent(searchText)
    : '';
  const { data, error, loading } = useAppSelector(
    (state): BooksState => state.books,
  );

  const dispatch = useAppDispatch();

  useEffect((): void => {
    if (decodedSearchText) {
      dispatch(fetchSearchBooks(decodedSearchText));
    }
  }, [decodedSearchText, dispatch]);

  function renderPosts(): React.ReactElement {
    if (error) {
      return <AlertBasic title="Не удалось загрузить" />;
    }

    return <BookGrid search books={data} isLoading={loading}/>;
  }

  return (
    <>
      <Title>Результат поиска '{decodedSearchText}'</Title>
      {renderPosts()}
    </>
  );
}
