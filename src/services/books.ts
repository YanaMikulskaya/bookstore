import { get, post, del } from '../config/http-client';
import { API } from '../config/api';
import type {
  BookModel,
  FetchBooksResponse,
  FetchFavoritesResponse,
  ToggleFavoritesResponse,
} from '@/types';

export const requestBooks = async (
  limit: number = 20,
  offset: number = 0,
  genre: string | null = null,
  sort: string | null = null,
): Promise<FetchBooksResponse> => {
  const response = await get(API.books, {
    params: {
      limit,
      offset,
      genre,
      sort,
    },
  });

  return response.data;
};

export const requestSearchBooks = async (
  query: string = '',
): Promise<BookModel[]> => {
  const response = await get(API.booksSearch, {
    params: { q: query },
  });
  return response.data;
};

export const requestBook = async (bookId: number): Promise<BookModel> => {
  const response = await get(`${API.books}/${bookId}`);
  return response.data;
};

export const getFavorites = async (
  limit: number = 18,
  offset: number = 0,
): Promise<FetchFavoritesResponse> => {
  const response = await get(API.booksFavorites, {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
};

// Добавить в избранное
export const addToFavorites = async (
  bookId: number,
  limit: number,
  offset: number,
): Promise<ToggleFavoritesResponse> => {
  const response = await post(`${API.booksFavorites}/${bookId}`, null, {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
};

// Удалить из избранного
export const removeFromFavorites = async (
  bookId: number,
  limit: number,
  offset: number,
): Promise<ToggleFavoritesResponse> => {
  const response = await del(`${API.booksFavorites}/${bookId}`, {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
};
// ID избранного
export const getFavoritesIds = async (): Promise<{ ids: number[] }> => {
  const response = await get(API.booksFavoritesIds);
  return response.data;
};
