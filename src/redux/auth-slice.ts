import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  requestRegistration,
  requestActivate,
  requestUser,
  requestRefreshToken,
  requestLogin,
} from '@/services/auth';
import { jwtApi } from '@/utils/jwt';

import type {
  RegisterData,
  AuthState,
  UserModel,
  TokenModel,
  ActivatePayload,
  JWTModel,
  LoginData,
} from '@/types';

export const registration = createAsyncThunk<UserModel, RegisterData>(
  'auth/registration',
  async (formData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await requestRegistration(formData);
      if (!response?.user) {
        return rejectWithValue('Не удалось получить данные пользователя');
      }
      return response.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Ошибка регистрации',
      );
    }
  },
);
export const activate = createAsyncThunk(
  'auth/activate',
  async (token: TokenModel, { rejectWithValue }) => {
    try {
      const response = await requestActivate(token);

      const jwt: JWTModel = {
        access: response.accessToken,
        refresh: response.refreshToken,
      };

      jwtApi.saveToLocalStorage(jwt);

      return {
        user: response.user,
        jwt: jwt,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка активации');
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const response = await requestLogin(data);

      const jwt: JWTModel = {
        access: response.accessToken,
        refresh: response.refreshToken,
      };

      jwtApi.saveToLocalStorage(jwt);

      return {
        user: response.user,
        jwt: jwt,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка входа');
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (data: Pick<JWTModel, 'refresh'>, { rejectWithValue }) => {
    try {
      const token = await requestRefreshToken(data);

      if (token) {
        jwtApi.updateAccessTokenLocalStorage(token.access);
      }

      return token;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  },
);

export const getUser = createAsyncThunk<UserModel>(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      return await requestUser();
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem('jwt');
      }
      return rejectWithValue(
        error.response?.data?.error || 'Не удалось загрузить профиль',
      );
    }
  },
);

const initialState: AuthState = {
  user: null,
  error: false,
  errorMessage: null,
  loading: false,
  isActivated: false,
  jwt: jwtApi.getFromLocalStorage(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrors: (state: AuthState) => {
      state.error = false;
      state.errorMessage = null;
    },
    logout: (state: AuthState) => {
      state.user = null;
      state.jwt = null;
      state.isActivated = false;
      state.error = false;
      state.errorMessage = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state: AuthState) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = null;
    });
    builder.addCase(
      registration.fulfilled,
      (state: AuthState, action: PayloadAction<UserModel>) => {
        state.errorMessage = null;
        state.error = false;
        state.loading = false;
        state.user = action.payload;
      },
    );
    builder.addCase(registration.rejected, (state: AuthState, action) => {
      state.error = true;
      state.loading = false;
      state.errorMessage = (action.payload as string) || 'Ошибка регистрации';
    });
    builder.addCase(activate.pending, (state: AuthState) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = null;
    });
    builder.addCase(
      activate.fulfilled,
      (state: AuthState, action: PayloadAction<ActivatePayload>) => {
        state.error = false;
        state.loading = false;
        state.errorMessage = null;
        state.isActivated = true;
        state.jwt = action.payload.jwt;
        state.user = action.payload.user;
      },
    );
    builder.addCase(activate.rejected, (state: AuthState, action) => {
      state.error = true;
      state.errorMessage = (action.payload as string) || 'Ошибка активации';
      state.loading = false;
    });
    builder.addCase(login.pending, (state: AuthState) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = null;
    });
    builder.addCase(
      login.fulfilled,
      (state: AuthState, action: PayloadAction<ActivatePayload>) => {
        state.error = false;
        state.loading = false;
        state.errorMessage = null;
        state.isActivated = true;
        state.jwt = action.payload.jwt;
        state.user = action.payload.user;
      },
    );
    builder.addCase(login.rejected, (state: AuthState, action) => {
      state.error = true;
      state.errorMessage = (action.payload as string) || 'Ошибка входа';
      state.loading = false;
    });
    builder.addCase(refreshToken.pending, (state: AuthState) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      refreshToken.fulfilled,
      (state: AuthState, action: PayloadAction<Pick<JWTModel, 'access'>>) => {
        state.loading = false;
        state.jwt = {
          access: action.payload.access,
          refresh: state.jwt?.refresh as JWTModel['refresh'],
        };
      },
    );
    builder.addCase(refreshToken.rejected, (state: AuthState) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(getUser.pending, (state: AuthState) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = null;
    });
    builder.addCase(
      getUser.fulfilled,
      (state: AuthState, action: PayloadAction<UserModel>) => {
        state.error = false;
        state.loading = false;
        state.errorMessage = null;
        state.user = action.payload;
      },
    );
    builder.addCase(getUser.rejected, (state: AuthState, action) => {
      state.error = true;
      state.errorMessage =
        (action.payload as string) || 'Не удалось загрузить профиль';
      state.loading = false;
    });
  },
});

export const { clearErrors, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
