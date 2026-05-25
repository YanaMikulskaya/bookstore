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

export type BookState = {
  data: BookModel | null;
  loading: boolean;
  error: boolean;
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

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  adminSecret?: string;
};

export type CartItem = {
  id: number;
  quantity: number;
};

export type UserModel = {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

export type RegisterPromise = {
  success: boolean;
  message: string;
  user: UserModel;
};

export type AuthState = {
  user: UserModel | null;
  error: boolean;
  errorMessage: string | null;
  loading: boolean;
  isActivated: boolean;
  jwt: JWTModel | null;
};

export type TokenModel = {
  token: string;
};

export type ActivatePromise = {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
  message: string;
};

export type ActivatePayload = {
  jwt: JWTModel;
  user: UserModel;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
};

export type Pagination = {
  offset: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

export type FavoritesBookModel = {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  price: string;
  cover_url: string;
  short_description: string;
  long_description: string;
  favorited_at?: string;
};

export type FetchFavoritesResponse = {
  success: boolean;
  data: FavoritesBookModel[];
  pagination: Pagination;
};

export type ToggleFavoritesResponse = {
  success: boolean;
  message: string;
  action: 'add' | 'remove';
  bookId: number;
  bookTitle: string;
  data?: FavoritesBookModel[];
  pagination?: Pagination;
};

export type FavoritesState = {
  favoritesIds: number[];
  favoritesTotalPages: number;
  shownFavorites: BookModel[] | FavoritesBookModel[];
  favoritesLoading: boolean;
  favoritesError: boolean;
};

export type FavoritesPayload = {
  favoritesTotalPages: number;
  shownFavorites: BookModel[] | FavoritesBookModel[];
};

export type FetchFavoritesParams = {
  offset: number;
  limit: number;
};

export type ToggleFavoritesParams = {
  id: number;
  act: 'remove' | 'add';
};

export type CartBookModel = BookModel & {
  quantity: number;
};

export type CartItemModel = {
  book_id: number;
  quantity: number;
};

export type GetCartResponse = {
  data: CartBookModel[];
  totalQuantity: number;
};

export type GetCartItemsResponse = {
  items: CartItemModel[];
};

export type ModifyCartResponse = {
  message: string;
  data: CartBookModel[];
  totalQuantity: number;
};

export type CartState = {
  cart: CartBookModel[];
  cartItems: CartItemModel[];
  totalQuantity: number;
  cartLoading: boolean;
  cartError: boolean;
};
