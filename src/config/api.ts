export const baseUrl = 'http://localhost:3001/api';

// Auth
const authRegisterEndpoint = '/auth/register';
const authUserActivateEndpoint = 'auth/verify-email';
const authLoginEndpoint = '/auth/login';
const authUserEndpoint = 'auth/me';
const authRefreshTokenEndpoint = '/auth/refresh';

// Books
const booksEndpoint = '/books';
const booksSearchEndpoint = '/books/search';
const booksPostEndpoint = '/books-with-cover';

// Favorites
const booksFavoritesEndpoint = '/favorites';
const booksFavoritesIdsEndpoint = '/favorites/ids';

// Cart
const booksCartEndpoint = '/cart';
const booksCartItemsEndpoint = '/cart/items';

export const API = {
  authRegister: authRegisterEndpoint,
  authLogin: authLoginEndpoint,
  authActivate: authUserActivateEndpoint,
  authUser: authUserEndpoint,
  authRefreshToken: authRefreshTokenEndpoint,
  books: booksEndpoint,
  booksSearch: booksSearchEndpoint,
  booksPost: booksPostEndpoint,
  booksFavorites: booksFavoritesEndpoint,
  booksFavoritesIds: booksFavoritesIdsEndpoint,
  booksCart: booksCartEndpoint,
  booksCartItems: booksCartItemsEndpoint,
};
