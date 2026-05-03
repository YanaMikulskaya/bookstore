export const baseUrl = 'http://localhost:3001/api';

// Auth
const authRegisterEndpoint = '/auth/register';
const authLoginEndpoint = '/auth/login';
const authUserEndpoint = '/me';
const authRefreshTokenEndpoint = '/auth/refresh';

// Books
const booksEndpoint = '/books';
const booksByIdEndpoint = (bookId) => `/books/${bookId}`;
const booksSearchEndpoint = '/books/search';
const booksPostEndpoint = '/books-with-cover';

// Favorites
const booksFavoritesEndpoint = '/favorites';
const booksFavoritesByIdEndpoint = (bookId) => `/favorites/${bookId}`;

export const API = {
  authRegister: authRegisterEndpoint,
  authLogin: authLoginEndpoint,
  authUser: authUserEndpoint,
  authRefreshToken: authRefreshTokenEndpoint,
  books: booksEndpoint,
  booksById: booksByIdEndpoint,
  booksSearch: booksSearchEndpoint,
  booksPost: booksPostEndpoint,
  booksFavorites: booksFavoritesEndpoint,
  booksFavoritesById: booksFavoritesByIdEndpoint,
};

let refreshPromise = null;

// Получить токен из localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Сохранить токены
const setTokens = (accessToken, refreshToken) => {
  if (accessToken) localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
};

// Удалить токены
const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// Обновление access токена
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    clearTokens();
    window.location.href = '/login';
    return null;
  }

  const response = await fetch(`${baseUrl}${API.authRefreshToken}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
  } else {
    clearTokens();
    window.location.href = '/login';
    return null;
  }
};

// Заголовки для авторизованных запросов (с автоматическим обновлением)
const fetchWithAuth = async (url, options = {}) => {
  let accessToken = getAccessToken();

  const makeRequest = async (token) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      // Пробуем обновить токен
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken();
      }
      const newToken = await refreshPromise;
      refreshPromise = null;

      if (newToken) {
        // Повторяем запрос с новым токеном
        return makeRequest(newToken);
      }
    }
    return response;
  };

  return makeRequest(accessToken);
};

// ========== АУТЕНТИФИКАЦИЯ ==========

export const register = async (name, email, password, adminSecret = null) => {
  const response = await fetch(`${baseUrl}${API.authRegister}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, adminSecret }),
  });
  const data = await response.json();
  if (data.accessToken) {
    setTokens(data.accessToken, data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

export const login = async (email, password) => {
  const response = await fetch(`${baseUrl}${API.authLogin}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (data.accessToken) {
    setTokens(data.accessToken, data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

export const logout = () => {
  clearTokens();
  window.location.href = '/login';
};

export const getMe = async () => {
  const response = await fetchWithAuth(`${baseUrl}${API.authUser}`);
  return response.json();
};

// ========== КНИГИ ==========

export const getBooks = async (
  limit = null,
  offset = null,
  genre = null,
  sort = null,
) => {
  const params = new URLSearchParams();
  if (limit !== null) params.append('limit', limit);
  if (offset !== null) params.append('offset', offset);
  if (genre) params.append('genre', genre);
  if (sort) params.append('sort', sort);

  const url = params.toString()
    ? `${baseUrl}${API.books}?${params.toString()}`
    : `${baseUrl}${API.books}`;
  const response = await fetch(url);
  return response.json();
};

export const getBookById = async (id) => {
  const response = await fetch(`${baseUrl}${API.booksById(id)}`);
  return response.json();
};

export const searchBooks = async (query) => {
  const response = await fetch(
    `${baseUrl}${API.booksSearch}?q=${encodeURIComponent(query)}`,
  );
  return response.json();
};

// ========== ЗАЩИЩЁННЫЕ ЗАПРОСЫ (с автоматическим обновлением токена) ==========

export const getFavorites = async () => {
  const response = await fetchWithAuth(`${baseUrl}${API.booksFavorites}`);
  return response.json();
};

export const addToFavorites = async (bookId) => {
  const response = await fetchWithAuth(
    `${baseUrl}${API.booksFavoritesById(bookId)}`,
    {
      method: 'POST',
    },
  );
  return response.json();
};

export const removeFromFavorites = async (bookId) => {
  const response = await fetchWithAuth(
    `${baseUrl}${API.booksFavoritesById(bookId)}`,
    {
      method: 'DELETE',
    },
  );
  return response.json();
};

export const createBook = async (bookData) => {
  const response = await fetchWithAuth(`${baseUrl}${API.books}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  return response.json();
};

export const createBookWithCover = async (formData) => {
  const accessToken = getAccessToken();
  const response = await fetch(`${baseUrl}${API.booksPost}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  return response.json();
};

export const updateBook = async (id, bookData) => {
  const response = await fetchWithAuth(`${baseUrl}${API.booksById(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  return response.json();
};

export const deleteBook = async (id) => {
  const response = await fetchWithAuth(`${baseUrl}${API.booksById(id)}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const uploadCover = async (file) => {
  const formData = new FormData();
  formData.append('cover', file);

  const accessToken = getAccessToken();
  const response = await fetch(`${baseUrl}/upload-cover`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  return response.json();
};

export const updateBookCover = async (bookId, coverUrl) => {
  const response = await fetchWithAuth(
    `${baseUrl}${API.booksById(bookId)}/cover`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coverUrl }),
    },
  );
  return response.json();
};

// ========== ЖАНРЫ И СТАТИСТИКА ==========

export const getGenres = async () => {
  const response = await fetch(`${baseUrl}/genres`);
  return response.json();
};

export const getStats = async () => {
  const response = await fetch(`${baseUrl}/stats`);
  return response.json();
};

// Регистрация
//const result = await register('Имя', 'email@test.com', '123456', '2521920');

// Вход
//const loginResult = await login('email@test.com', '123456');

// Получить книги (с пагинацией)
//const { data, total } = await getBooks(20, 0);

// Получить избранное
//const favorites = await getFavorites();
