import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchFavorites, fetchFavoritesLS } from '@/redux/favorites-slice';
import { BookGrid } from '@/components/BookGrid';
import { AlertBasic } from '@/components/basicComponents/AlertBasic';
import { SectionHeader } from '@/components/SectionHeader';
import { Pagination } from '@/components/Pagination';
import { PAGINATION } from '@/config/pagination';
import type { FavoritesState } from '@/types';

export function BooksFavorites(): React.ReactElement {
  const { currentPage = '1' } = useParams<{ currentPage: string }>();
  const page = Number(currentPage);

  const {
    shownFavorites,
    favoritesError,
    favoritesLoading,
    favoritesTotalPages,
    favoritesIds,
  } = useAppSelector((state): FavoritesState => state.favorites);

  const isAuth = useAppSelector((state) => !!state.auth.jwt);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const offset = (page - 1) * PAGINATION.LIMIT;

    const fetchAction = isAuth
      ? fetchFavorites({ limit: PAGINATION.LIMIT, offset })
      : fetchFavoritesLS({ limit: PAGINATION.LIMIT, offset });

    dispatch(fetchAction);
  }, [favoritesIds, page, isAuth, dispatch]);

  // Редирект при превышении страницы
  useEffect(() => {
    if (
      !favoritesLoading &&
      favoritesTotalPages > 0 &&
      page > favoritesTotalPages
    ) {
      navigate(`/books/favorites/${favoritesTotalPages}`, { replace: true });
    }
  }, [favoritesTotalPages, page, favoritesLoading, navigate]);

  return (
    <>
      <SectionHeader />
      <Pagination favorites />
      {favoritesError && <AlertBasic title="Не удалось загрузить" />}
      <BookGrid books={shownFavorites} isLoading={favoritesLoading} />
      <Pagination favorites />
    </>
  );
}
