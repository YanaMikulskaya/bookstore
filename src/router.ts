import { createBrowserRouter, redirect } from 'react-router';
import { VerifyEmail } from './pages/VerifyEmail';
import { BookPage } from './pages/BookPage';
import { BookCatalog } from './pages/BooksCatalog';
import { BooksFavorites } from './pages/BooksFavorites';
import { CartPage } from './pages/CartPage';
import { Login } from './pages/Login';
import { RegistrationConfirmation } from './pages/RegistrationConfirmation';
import { Registration } from './pages/Registration';
import { Search } from './pages/Search';
import { Layout } from './components/Layout';

import type { RouteObject } from 'react-router';

export const routers: RouteObject[] = [
  {
    Component: Layout,
    children: [
      {
        index: true,
        loader: () => redirect('/books/all/1'),
      },
      {
        path: '/books/all/:currentPage',
        Component: BookCatalog,
      },
      {
        path: '/books/favorites/:currentPage',
        Component: BooksFavorites,
      },
      {
        path: '/books/:bookId',
        Component: BookPage,
      },
      {
        path: '/books/search/:searchText',
        Component: Search,
      },
      {
        path: '/auth/registration',
        Component: Registration,
      },
      {
        path: '/auth/login',
        Component: Login,
      },
      {
        path: '/auth/verify-email',
        Component: VerifyEmail,
      },
      {
        path: '/auth/registration-confirmation',
        Component: RegistrationConfirmation,
      },
      {
        path: '/cart',
        Component: CartPage,
      },
    ],
  },
];

export const router = createBrowserRouter(routers, {
  basename: '/bookstore',
});
