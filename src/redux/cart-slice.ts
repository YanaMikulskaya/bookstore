import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartItems,
} from '@/services/cart';

import { requestBook } from '@/services/books';

import type { CartBookModel, CartState, CartItemModel } from '@/types';

// Инициализация корзины (синхронизация с сервером)
export const initializeCart = createAsyncThunk(
  'cart/initializeCart',
  async (isAuth: boolean, { rejectWithValue }) => {
    try {
      const saved = localStorage.getItem('cart');
      const localCart: CartItemModel[] = saved ? JSON.parse(saved) : [];
      const localQuantity = localCart.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      if (isAuth) {
        // Загружаем ID и количество из корзины с сервера
        const { items } = await getCartItems();

        // Находим книги, которых нет на сервере, или с другим количеством
        for (const localItem of localCart) {
          const serverItem = items.find(
            (item) => item.book_id === localItem.book_id,
          );

          if (!serverItem) {
            // Нет на сервере - добавляем
            await addToCart(localItem.book_id, localItem.quantity);
          } else if (serverItem.quantity !== localItem.quantity) {
            // Есть, но количество разное - обновляем на сервере
            await updateCartItem(localItem.book_id, localItem.quantity);
          }
        }

        // Получаем актуальные данные с сервера
        const updatedItems = await getCartItems();
        const totalQuantity = updatedItems.items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );

        // Сохраняем в localStorage
        localStorage.setItem('cart', JSON.stringify(updatedItems.items));
        return {
          cartItems: updatedItems.items,
          totalQuantity: totalQuantity,
        };
      } else {
        return {
          cartItems: localCart,
          totalQuantity: localQuantity,
        };
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

export const fetchCartLS = createAsyncThunk(
  'cart/fetchCartLS',
  async (_, { rejectWithValue }) => {
    try {
      const saved = localStorage.getItem('cart');
      const localCart: CartItemModel[] = saved ? JSON.parse(saved) : [];

      const cartPromises = localCart.map(async (item) => {
        const book = await requestBook(item.book_id);
        return {
          ...book,
          quantity: item.quantity, // добавляем количество из корзины
        };
      });

      const data: CartBookModel[] = await Promise.all(cartPromises);
      const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);

      return {
        data: data,
        totalQuantity: totalQuantity,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

export const toggleCartLS = createAsyncThunk(
  'cart/toggleCartLS',
  async (id: number, { rejectWithValue }) => {
    try {
      const saved = localStorage.getItem('cart');
      const localCart: CartItemModel[] = saved ? JSON.parse(saved) : [];

      const existingIndex = localCart.findIndex((item) => item.book_id === id);
      let newCart: CartItemModel[];

      if (existingIndex !== -1) {
        // Книга есть - удаляем
        newCart = localCart.filter((item) => item.book_id !== id);
      } else {
        // Книги нет - добавляем 1
        newCart = [...localCart, { book_id: id, quantity: 1 }];
      }

      const totalQuantity = newCart.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      localStorage.setItem('cart', JSON.stringify(newCart));

      return {
        cartItems: newCart,
        totalQuantity: totalQuantity,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

export const toggleCart = createAsyncThunk(
  'cart/toggleCart',
  async (id: number, { rejectWithValue }) => {
    try {
      // Сначала проверяем, есть ли книга в корзине
      const { items } = await getCartItems();
      const existingItem = items.find((item) => item.book_id === id);

      if (existingItem) {
        // Книга есть - удаляем
        await removeFromCart(id);
      } else {
        // Книги нет - добавляем 1
        await addToCart(id, 1);
      }

      const updatedCart = await getCartItems();
      const totalQuantity = updatedCart.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      localStorage.setItem('cart', JSON.stringify(items));

      return {
        cartItems: items,
        totalQuantity: totalQuantity,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

// Обновить количество (локально)
export const updateCartQuantityLS = createAsyncThunk(
  'cart/updateCartQuantityLS',
  async (
    { id, quantity }: { id: number; quantity: number },
    { rejectWithValue },
  ) => {
    try {
      const saved = localStorage.getItem('cart');
      const localCart: CartItemModel[] = saved ? JSON.parse(saved) : [];

      const existingIndex = localCart.findIndex((item) => item.book_id === id);

      if (existingIndex === -1) {
        return rejectWithValue(new Error('Книга не найдена в корзине'));
      }

      const newCart = [...localCart];
      newCart[existingIndex].quantity = quantity;

      localStorage.setItem('cart', JSON.stringify(newCart));

      const totalQuantity = newCart.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      return {
        cartItems: newCart,
        totalQuantity: totalQuantity,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

// Очистить корзину (локально)
export const clearCartLS = createAsyncThunk(
  'cart/clearCartLS',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.setItem('cart', JSON.stringify([]));
      return [];
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

// Обновить количество (авторизованный)
export const updateCartQuantityServer = createAsyncThunk(
  'cart/updateCartQuantityServer',
  async (
    { id, quantity }: { id: number; quantity: number },
    { rejectWithValue },
  ) => {
    try {
      await updateCartItem(id, quantity);

      const { items } = await getCartItems();
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

      localStorage.setItem('cart', JSON.stringify(items));

      return {
        cartItems: items,
        totalQuantity: totalQuantity,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

// Очистить корзину (авторизованный)
export const clearCartServer = createAsyncThunk(
  'cart/clearCartServer',
  async (_, { rejectWithValue }) => {
    try {
      await clearCart();
      localStorage.setItem('cart', JSON.stringify([]));

      return [];
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

const initialState: CartState = {
  cart: [],
  cartItems: [],
  totalQuantity: 0,
  cartLoading: false,
  cartError: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartError: (state: CartState) => {
      state.cartError = false;
    },
    resetCart: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(initializeCart.pending, (state: CartState) => {
      state.cartLoading = true;
      state.cartError = false;
    });
    builder.addCase(
      initializeCart.fulfilled,
      (
        state: CartState,
        action: PayloadAction<{
          cartItems: CartItemModel[];
          totalQuantity: number;
        }>,
      ) => {
        state.cartLoading = false;
        state.cartError = false;
        state.cartItems = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
      },
    );
    builder.addCase(initializeCart.rejected, (state: CartState) => {
      state.cartError = true;
      state.cartLoading = false;
    });

    builder.addCase(fetchCart.pending, (state: CartState) => {
      state.cartLoading = true;
      state.cartError = false;
    });
    builder.addCase(
      fetchCart.fulfilled,
      (
        state: CartState,
        action: PayloadAction<{ data: CartBookModel[]; totalQuantity: number }>,
      ) => {
        state.cartLoading = false;
        state.cartError = false;
        state.cart = action.payload.data;
        state.totalQuantity = action.payload.totalQuantity;
      },
    );
    builder.addCase(fetchCart.rejected, (state: CartState) => {
      state.cartError = true;
      state.cartLoading = false;
    });
    builder.addCase(fetchCartLS.pending, (state: CartState) => {
      state.cartLoading = true;
      state.cartError = false;
    });
    builder.addCase(
      fetchCartLS.fulfilled,
      (
        state: CartState,
        action: PayloadAction<{ data: CartBookModel[]; totalQuantity: number }>,
      ) => {
        state.cartLoading = false;
        state.cartError = false;
        state.cart = action.payload.data;
        state.totalQuantity = action.payload.totalQuantity;
      },
    );
    builder.addCase(fetchCartLS.rejected, (state: CartState) => {
      state.cartError = true;
      state.cartLoading = false;
    });
    builder.addCase(toggleCartLS.pending, (state: CartState) => {
      state.cartLoading = true;
      state.cartError = false;
    });
    builder.addCase(
      toggleCartLS.fulfilled,
      (
        state: CartState,
        action: PayloadAction<{
          cartItems: CartItemModel[];
          totalQuantity: number;
        }>,
      ) => {
        state.cartLoading = false;
        state.cartError = false;
        state.cartItems = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
      },
    );
    builder.addCase(toggleCartLS.rejected, (state: CartState) => {
      state.cartLoading = false;
      state.cartError = true;
    });

    builder.addCase(toggleCart.pending, (state: CartState) => {
      state.cartLoading = true;
      state.cartError = false;
    });
    builder.addCase(
      toggleCart.fulfilled,
      (
        state: CartState,
        action: PayloadAction<{
          cartItems: CartItemModel[];
          totalQuantity: number;
        }>,
      ) => {
        state.cartLoading = false;
        state.cartError = false;
        state.cartItems = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
      },
    );
    builder.addCase(toggleCart.rejected, (state: CartState) => {
      state.cartLoading = false;
      state.cartError = true;
    });

    builder.addCase(updateCartQuantityLS.pending, (state: CartState) => {
      state.cartLoading = true;
      state.cartError = false;
    });
    builder.addCase(
      updateCartQuantityLS.fulfilled,
      (
        state: CartState,
        action: PayloadAction<{
          cartItems: CartItemModel[];
          totalQuantity: number;
        }>,
      ) => {
        state.cartLoading = false;
        state.cartError = false;
        state.cartItems = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
      },
    );
    builder.addCase(updateCartQuantityLS.rejected, (state: CartState) => {
      state.cartLoading = false;
      state.cartError = true;
    });

    builder.addCase(clearCartLS.pending, (state: CartState) => {
      state.cartLoading = true;
      state.cartError = false;
    });
    builder.addCase(clearCartLS.fulfilled, (state: CartState) => {
      state.cartLoading = false;
      state.cartError = false;
      state.cartItems = [];
      state.totalQuantity = 0;
      state.cart = [];
    });
    builder.addCase(clearCartLS.rejected, (state: CartState) => {
      state.cartLoading = false;
      state.cartError = true;
    });

    builder.addCase(updateCartQuantityServer.pending, (state: CartState) => {
      state.cartLoading = true;
      state.cartError = false;
    });
    builder.addCase(
      updateCartQuantityServer.fulfilled,
      (
        state: CartState,
        action: PayloadAction<{
          cartItems: CartItemModel[];
          totalQuantity: number;
        }>,
      ) => {
        state.cartLoading = false;
        state.cartError = false;
        state.cartItems = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
      },
    );
    builder.addCase(updateCartQuantityServer.rejected, (state: CartState) => {
      state.cartLoading = false;
      state.cartError = true;
    });

    builder.addCase(clearCartServer.pending, (state: CartState) => {
      state.cartLoading = true;
      state.cartError = false;
    });
    builder.addCase(clearCartServer.fulfilled, (state: CartState) => {
      state.cartLoading = false;
      state.cartError = false;
      state.cartItems = [];
    });
    builder.addCase(clearCartServer.rejected, (state: CartState) => {
      state.cartLoading = false;
      state.cartError = true;
    });
  },
});

export const { clearCartError, resetCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
