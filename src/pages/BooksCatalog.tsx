import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchBooks } from '@/redux/books-slice';
import { BookGrid } from '@/components/BookGrid';
import { SectionHeader } from '@/components/SectionHeader';
import { AlertBasic } from '@/components/basicComponents/AlertBasic';
import { Pagination } from '@/components/Pagination';
import { PAGINATION } from '@/config/pagination';
import type { BooksState } from '@/types';
import { SortSelect } from '@/components/SortSelect';

export function BookCatalog(): React.ReactElement {
  const { currentPage } = useParams();
  const [sort, setSort] = useState('id');
  const { data, error, loading } = useAppSelector(
    (state): BooksState => state.books,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect((): void => {
    const page = Number(currentPage);
    const offset = (page - 1) * PAGINATION.LIMIT;

    dispatch(
      fetchBooks({
        limit: PAGINATION.LIMIT,
        offset,
        sort: sort === 'id' ? null : sort,
      }),
    );
  }, [currentPage, dispatch, sort]);

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    navigate('/books/all/1'); // Перенаправляем на первую страницу
  };

  function renderBooks(): React.ReactElement {
    if (error) {
      return <AlertBasic title="Не удалось загрузить" />;
    }

    return <BookGrid books={data} isLoading={loading} />;
  }

  return (
    <>
      <div className="flex gap-3 items-end justify-between">
        <SectionHeader />
        <SortSelect value={sort} onValueChange={handleSortChange} />
      </div>
      <Pagination />
      {renderBooks()}
      <Pagination />
    </>
  );
}
