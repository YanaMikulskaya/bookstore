import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchBooks } from '@/redux/books-slice';
import { BookGrid } from '@/components/BookGrid';
import { SectionHeader } from '@/components/SectionHeader';
import { AlertBasic } from '@/components/basicComponents/AlertBasic';
import { PAGINATION } from '@/config/pagination';
import type { BooksState } from '@/types';

export function BookCatalog(): React.ReactElement {
  const { currentPage } = useParams();
  const { data, error, loading } = useAppSelector(
    (state): BooksState => state.books,
  );

  const dispatch = useAppDispatch();

  useEffect((): void => {
    const page = Number(currentPage);
    const offset = (page - 1) * PAGINATION.LIMIT;

    dispatch(fetchBooks({ limit: PAGINATION.LIMIT, offset }));
  }, [currentPage, dispatch]);

  function renderPosts(): React.ReactElement {
    if (loading) {
      return <div>Загрузка...</div>;
    }

    if (error) {
      return <AlertBasic title="Не удалось загрузить" />;
    }

    return <BookGrid books={data} />;
  }

  return (
    <>
      <SectionHeader />
      {renderPosts()}
    </>
  );
}
