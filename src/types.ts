// Model
export type BookModel = {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  price: string;
  coverUrl: string;
  shortDescription: string;
  longDescription: string;
};

export type FavoritesBookModel = BookModel & {
  favoritedAt?: string;
};

export type CartBookModel = BookModel & {
  quantity: number;
};

export type TokenModel = {
  token: string;
};

export type JWTModel = {
  access: string;
  refresh: string;
};

export type UserModel = {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

export type CartItemModel = {
  bookId: number;
  quantity: number;
};

// Data
export type RegisterData = {
  name: string;
  email: string;
  password: string;
  adminSecret?: string;
};

export type LoginData = {
  email: string;
  password: string;
};
// State
export type BookState = {
  data: BookModel | null;
  loading: boolean;
  error: boolean;
};

export type BooksState = {
  data: BookModel[];
  totalPages: number;
  loading: boolean;
  error: boolean;
};

export type AuthState = {
  user: UserModel | null;
  error: boolean;
  errorMessage: string | null;
  loading: boolean;
  isActivated: boolean;
  jwt: JWTModel | null;
};

export type FavoritesState = {
  favoritesIds: number[];
  favoritesTotalPages: number;
  shownFavorites: FavoritesBookModel[];
  favoritesLoading: boolean;
  favoritesError: boolean;
};

export type CartState = {
  cart: CartBookModel[];
  cartItems: CartItemModel[];
  totalQuantity: number;
  cartLoading: boolean;
  cartError: boolean;
};

// Response
export type FetchBooksResponse = {
  data: BookModel[];
  total: number;
  limit: number;
  ofset: number;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
  user: UserModel;
};

export type ActivateResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
  message: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
};

export type PaginationResponse = {
  offset: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

export type FetchFavoritesResponse = {
  success: boolean;
  data: FavoritesBookModel[];
  pagination: PaginationResponse;
};

export type ToggleFavoritesResponse = {
  success: boolean;
  message: string;
  action: 'add' | 'remove';
  bookId: number;
  bookTitle: string;
  data?: FavoritesBookModel[];
  pagination?: PaginationResponse;
};

export type FetchCartResponse = {
  data: CartBookModel[];
  totalQuantity: number;
};

export type FetchCartItemsResponse = {
  items: CartItemModel[];
};

export type ModifyCartResponse = FetchBooksResponse & {
  totalQuantity: number;
};

// Params
export type FetchBooksParams = {
  limit: number;
  offset: number;
  genre?: string | null;
  sort?: string | null;
};

export type FetchFavoritesParams = {
  offset: number;
  limit: number;
};

export type ToggleFavoritesParams = {
  id: number;
  act: 'remove' | 'add';
};

// Plyload
export type BooksPayload = {
  data: BooksState['data'];
  totalPages: BooksState['totalPages'];
};

export type ActivatePayload = {
  jwt: JWTModel;
  user: UserModel;
};

export type FavoritesPayload = {
  favoritesTotalPages: number;
  shownFavorites: BookModel[] | FavoritesBookModel[];
};
