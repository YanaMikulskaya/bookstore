import { createBrowserRouter, redirect } from 'react-router';
import { Activation } from './pages/Activation';
import { ActivationLinkParser } from './pages/ActivationLinkParser';
import { BookPage } from './pages/BookPage';
import { BookCatalog } from './pages/BooksCatalog';
import { BookFavorites } from './pages/BooksFavorites';
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
        Component: BookFavorites,
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
        path: '/auth/activate/link-parser',
        Component: ActivationLinkParser,
      },
      {
        path: '/auth/activate/:uid/:token',
        Component: Activation,
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
