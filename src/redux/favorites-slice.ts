import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  requestBook,
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
  getFavoritesIds,
} from '@/services/books';

import type {
  BookModel,
  FetchFavoritesParams,
  FavoritesState,
  FavoritesPayload,
  ToggleFavoritesParams,
} from '@/types';

export const initializeFavorites = createAsyncThunk(
  'favoritesPosts/initializeFavorites',
  async (isAuth: boolean, { rejectWithValue }) => {
    try {
      const saved = localStorage.getItem('favorites');
      const localFavorites: number[] = saved ? JSON.parse(saved) : [];

      let serverIds: number[] = [];

      if (isAuth) {
        // Загружаем ТОЛЬКО ID для синхронизации
        const idsResponse = await getFavoritesIds();
        serverIds = idsResponse.ids;

        // Находим книги, которых нет на сервере
        const toAdd = localFavorites.filter((id) => !serverIds.includes(id));

        // Добавляем недостающие книги на сервер
        for (const bookId of toAdd) {
          try {
            await addToFavorites(bookId, 0, 0);
          } catch (error) {
            console.error(
              `Не удалось добавить книгу ${bookId} на сервер:`,
              error,
            );
          }
        }

        // Сохраняем ID в localStorage (объединённый список)
        const allIds = [...serverIds, ...toAdd];
        localStorage.setItem('favorites', JSON.stringify(allIds));

        return allIds;
      } else {
        return localFavorites;
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

export const fetchFavoritesLS = createAsyncThunk(
  'favorites/fetchFavoritesLS',
  async ({ limit, offset }: FetchFavoritesParams, { rejectWithValue }) => {
    try {
      const saved = localStorage.getItem('favorites');
      const favoritesIds: number[] = saved ? JSON.parse(saved) : [];

      const totalPages = Math.ceil(favoritesIds.length / limit);
      const shownFavorites = favoritesIds.slice(offset, offset + limit);

      const bookPromises = shownFavorites.map(async (idBook) => {
        const book = await requestBook(idBook);
        return book;
      });
      const data: BookModel[] = await Promise.all(bookPromises);

      return { favoritesTotalPages: totalPages, shownFavorites: data };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async ({ limit, offset }: FetchFavoritesParams, { rejectWithValue }) => {
    try {
      const serverFavorites = await getUserFavorites(limit, offset);
      const data = serverFavorites.data;
      const totalFavorites = serverFavorites.pagination.total;
      const totalPages = Math.ceil(totalFavorites / limit);

      return {
        favoritesTotalPages: totalPages,
        shownFavorites: data,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

export const toggleFavoritesLS = createAsyncThunk(
  'favorites/toggleFavoritesLS',
  async (id: number, { rejectWithValue }) => {
    try {
      const saved = localStorage.getItem('favorites');
      const favorites = saved ? JSON.parse(saved) : [];

      const newFavorites = favorites.includes(id)
        ? favorites.filter((item: number) => item !== id)
        : [...favorites, id];

      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      return newFavorites;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

export const toggleFavorites = createAsyncThunk(
  'favorites/toggleFavorites',
  async ({ id, act }: ToggleFavoritesParams, { rejectWithValue }) => {
    try {
      if (act === 'add') {
        await addToFavorites(id, 0, 0);
      } else if (act === 'remove') {
        await removeFromFavorites(id, 0, 0);
      }
      const serverIds = await getFavoritesIds();

      localStorage.setItem('favorites', JSON.stringify(serverIds.ids));

      return serverIds.ids;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

const initialState: FavoritesState = {
  favoritesIds: [],
  favoritesTotalPages: 0,
  shownFavorites: [],
  favoritesLoading: false,
  favoritesError: false,
};
export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavoritesError: (state: FavoritesState) => {
      state.favoritesError = false;
    },
    resetFavorites: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(initializeFavorites.pending, (state: FavoritesState) => {
      state.favoritesLoading = true;
      state.favoritesError = false;
    });
    builder.addCase(
      initializeFavorites.fulfilled,
      (
        state: FavoritesState,
        action: PayloadAction<FavoritesState['favoritesIds']>,
      ) => {
        state.favoritesLoading = false;
        state.favoritesError = false;
        state.favoritesIds = action.payload;
      },
    );
    builder.addCase(initializeFavorites.rejected, (state: FavoritesState) => {
      state.favoritesError = true;
      state.favoritesLoading = false;
    });
    builder.addCase(fetchFavoritesLS.pending, (state: FavoritesState) => {
      state.favoritesLoading = true;
      state.favoritesError = false;
    });
    builder.addCase(
      fetchFavoritesLS.fulfilled,
      (state: FavoritesState, action: PayloadAction<FavoritesPayload>) => {
        state.favoritesLoading = false;
        state.favoritesError = false;
        state.favoritesTotalPages = action.payload.favoritesTotalPages;
        state.shownFavorites = action.payload.shownFavorites;
      },
    );
    builder.addCase(fetchFavoritesLS.rejected, (state: FavoritesState) => {
      state.favoritesError = true;
      state.favoritesLoading = false;
    });
    builder.addCase(fetchFavorites.pending, (state: FavoritesState) => {
      state.favoritesLoading = true;
      state.favoritesError = false;
    });
    builder.addCase(
      fetchFavorites.fulfilled,
      (state: FavoritesState, action: PayloadAction<FavoritesPayload>) => {
        state.favoritesLoading = false;
        state.favoritesError = false;
        state.favoritesTotalPages = action.payload.favoritesTotalPages;
        state.shownFavorites = action.payload.shownFavorites;
      },
    );
    builder.addCase(fetchFavorites.rejected, (state: FavoritesState) => {
      state.favoritesError = true;
      state.favoritesLoading = false;
    });
    builder.addCase(toggleFavoritesLS.pending, (state: FavoritesState) => {
      state.favoritesLoading = true;
      state.favoritesError = false;
    });
    builder.addCase(
      toggleFavoritesLS.fulfilled,
      (
        state: FavoritesState,
        action: PayloadAction<FavoritesState['favoritesIds']>,
      ) => {
        state.favoritesLoading = false;
        state.favoritesError = false;
        state.favoritesIds = action.payload;
      },
    );
    builder.addCase(toggleFavoritesLS.rejected, (state: FavoritesState) => {
      state.favoritesLoading = false;
      state.favoritesError = true;
    });
    builder.addCase(toggleFavorites.pending, (state: FavoritesState) => {
      state.favoritesLoading = true;
      state.favoritesError = false;
    });
    builder.addCase(
      toggleFavorites.fulfilled,
      (
        state: FavoritesState,
        action: PayloadAction<FavoritesState['favoritesIds']>,
      ) => {
        state.favoritesLoading = false;
        state.favoritesError = false;
        state.favoritesIds = action.payload;
      },
    );
    builder.addCase(toggleFavorites.rejected, (state: FavoritesState) => {
      state.favoritesLoading = false;
      state.favoritesError = true;
    });
  },
});

export const { clearFavoritesError } = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
