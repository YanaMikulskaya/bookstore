import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { Book } from '@/components/Book';
import { clearBook, fetchBook } from '@/redux/book-slice';

export function BookPage(): React.ReactElement {
  const { bookId } = useParams();
  const { data, error, loading } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBook(Number(bookId)));

    return () => {
      dispatch(clearBook());
    };
  }, []);

  return <Book book={data} error={error} loading={loading} />;
}
