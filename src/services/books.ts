import { get, post } from '../config/http-client';
import { API } from '../config/api';
import type { BookModel, FetchBooksResponse } from '@/types';

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
