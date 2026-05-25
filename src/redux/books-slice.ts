import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type {
  BookModel,
  FetchBooksParams,
  BooksState,
  BooksPayload,
} from '@/types';
import { requestBooks, requestSearchBooks } from '@/services/books';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (
    { limit, offset, genre, sort }: FetchBooksParams,
    { rejectWithValue },
  ) => {
    try {
      const books = await requestBooks(limit, offset, genre, sort);

      const totalPages = Math.ceil(books.total / limit);

      return { data: books.data, totalPages };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

export const fetchSearchBooks = createAsyncThunk(
  'books/fetchSearchBooks',
  async (query: string = '', { rejectWithValue }) => {
    try {
      const books = await requestSearchBooks(query);

      return books;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

const initialState: BooksState = {
  data: [],
  totalPages: 0,
  loading: false,
  error: false,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearError: (state: BooksState) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state: BooksState) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      fetchBooks.fulfilled,
      (state: BooksState, action: PayloadAction<BooksPayload>) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload.data;
        state.totalPages = action.payload.totalPages;
      },
    );
    builder.addCase(fetchBooks.rejected, (state: BooksState) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(fetchSearchBooks.pending, (state: BooksState) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      fetchSearchBooks.fulfilled,
      (state: BooksState, action: PayloadAction<BookModel[]>) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
      },
    );
    builder.addCase(fetchSearchBooks.rejected, (state: BooksState) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const { clearError } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
