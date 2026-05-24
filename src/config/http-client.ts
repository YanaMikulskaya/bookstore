import axios from 'axios';
import { store } from '../redux/store';
import { refreshToken, logout } from '../redux/auth-slice';
import { baseUrl } from './api';
import { jwtApi } from '../utils/jwt';
import { API } from './api';
import { JWTModel } from '@/types';

const httpClient = axios.create({
  baseURL: baseUrl,
});

httpClient.interceptors.request.use(async (config) => {
  if (config.url?.includes(API.authRefreshToken)) {
    return config;
  }

  let { jwt } = store.getState().auth;

  if (jwt) {
    if (jwtApi.isRefreshTokenExpired(jwt.refresh)) {
      jwtApi.removeFromLocalStorage();
      store.dispatch(logout());
      window.location.href = '/auth/sign-in';
    } else {
      if (jwtApi.isAccessTokenExpired(jwt.access)) {
        await store.dispatch(refreshToken({ refresh: jwt.refresh }));
        jwt = store.getState().auth.jwt as JWTModel;
      }

      config.headers.Authorization = `Bearer ${jwt.access}`;
    }
  }

  return config;
});

export const get = httpClient.get;
export const post = httpClient.post;
export const put = httpClient.put;
export const del = httpClient.delete;
