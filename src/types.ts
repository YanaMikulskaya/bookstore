export type BookModel = {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  price: string;
  cover_url: string;
  short_description: string;
  long_description: string;
};

export type FetchBooksResponse = {
  data: BookModel[];
  total: number;
  limit: number;
  ofset: number;
};

export type FetchBooksParams = {
  limit: number;
  offset: number;
  genre?: string | null;
  sort?: string | null;
};

export type BooksState = {
  data: BookModel[];
  totalPages: number;
  loading: boolean;
  error: boolean;
};

export type BooksPayload = {
  data: BooksState['data'];
  totalPages: BooksState['totalPages'];
};

export type JWTModel = {
  access: string;
  refresh: string;
};

export type CartItem = {
  id: number;
  quantity: number;
};
