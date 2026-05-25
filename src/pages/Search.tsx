import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchSearchBooks } from '@/redux/books-slice';
import { BookGrid } from '@/components/BookGrid';
import { Title } from '@/components/Title';
import { AlertBasic } from '@/components/basicComponents/AlertBasic';
import { BreadcrumbBasic } from '@/components/basicComponents/BreadcrumbBasic';
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

  useEffect(() => {
    if (decodedSearchText) {
      dispatch(fetchSearchBooks(decodedSearchText));
    }
  }, [dispatch, decodedSearchText]);

  function renderPosts(): React.ReactElement {
    if (error) {
      return <AlertBasic title="Не удалось загрузить" />;
    }

    return <BookGrid search books={data} isLoading={loading} />;
  }

  return (
    <>
      <BreadcrumbBasic page="Поиск" />
      <Title>Результат поиска '{decodedSearchText}'</Title>
      {renderPosts()}
    </>
  );
}
