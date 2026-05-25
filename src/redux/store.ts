import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { booksReducer } from './books-slice';
import { authReducer } from './auth-slice';
import { bookReducer } from './book-slice';
import { favoritesReducer } from './favorites-slice';
import { cartReducer } from './cart-slice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    book: bookReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();
