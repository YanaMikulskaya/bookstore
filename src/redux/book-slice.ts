import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { BookModel, BookState } from '../types';
import { requestBook } from '@/services/books';

export const fetchBook = createAsyncThunk(
  'book/fetchBook',
  async (BookId: number, { rejectWithValue }) => {
    try {
      const Book = await requestBook(BookId);

      return Book;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error as Error);
    }
  },
);

const initialState: BookState = {
  data: null,
  loading: false,
  error: false,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    clearBook: (state: BookState) => {
      state.data = null;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state: BookState) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      fetchBook.fulfilled,
      (state: BookState, action: PayloadAction<BookModel>) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
      },
    );
    builder.addCase(fetchBook.rejected, (state: BookState) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const { clearBook } = bookSlice.actions;

export const bookReducer = bookSlice.reducer;
