import { get, post, put, del } from '@/config/http-client';
import { API } from '@/config/api';
import type {
  FetchCartResponse,
  FetchCartItemsResponse,
  ModifyCartResponse,
} from '@/types';

export const getCart = async (): Promise<FetchCartResponse> => {
  const response = await get(API.booksCart);
  return response.data;
};

// Добавить книгу в корзину
export const addToCart = async (
  bookId: number,
  quantity: number = 1,
): Promise<ModifyCartResponse> => {
  const response = await post(`${API.booksCart}/${bookId}`, { quantity });
  return response.data;
};

// Обновить количество книги в корзине
export const updateCartItem = async (
  bookId: number,
  quantity: number,
): Promise<ModifyCartResponse> => {
  const response = await put(`${API.booksCart}/${bookId}`, { quantity });
  return response.data;
};

// Удалить книгу из корзины
export const removeFromCart = async (
  bookId: number,
): Promise<ModifyCartResponse> => {
  const response = await del(`${API.booksCart}/${bookId}`);
  return response.data;
};

// Очистить всю корзину
export const clearCart = async (): Promise<ModifyCartResponse> => {
  const response = await del(API.booksCart);
  return response.data;
};
// Получить только ID и количество
export const getCartItems = async (): Promise<FetchCartItemsResponse> => {
  const response = await get(API.booksCartItems);
  return response.data;
};
