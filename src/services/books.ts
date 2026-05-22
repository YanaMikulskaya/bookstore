import { API, baseUrl } from '../config/api';
import type { BookModel, FetchBooksResponse } from '@/types';

export const requestBooks = async (
  limit: number = 20,
  offset: number = 0,
  genre: string | null = null,
  sort: string | null = null,
): Promise<FetchBooksResponse> => {
  const url = new URL(`${baseUrl}${API.books}`);

  if (limit !== null) url.searchParams.append('limit', limit.toString());
  if (offset !== null) url.searchParams.append('offset', offset.toString());
  if (genre) url.searchParams.append('genre', genre);
  if (sort) url.searchParams.append('sort', sort);

  const response = await fetch(url.toString());

  return response.json();
};

export const requestSearchBooks = async (
  query: string = '',
): Promise<BookModel[]> => {
  const response = await fetch(
    `${baseUrl}${API.booksSearch}?q=${encodeURIComponent(query)}`,
  );
  return response.json();
};
