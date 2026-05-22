import { jwtDecode } from 'jwt-decode';
import type { JWTModel } from '../types';

export const jwtApi = {
  saveToLocalStorage: (jwt: JWTModel) => {
    localStorage.setItem('jwt', JSON.stringify(jwt));
  },
  getFromLocalStorage: (): JWTModel | null => {
    const jwt = localStorage.getItem('jwt');

    try {
      return jwt ? JSON.parse(jwt) : null;
    } catch (error) {
      console.error(
        error,
        'Please clear your browser localStorage and try again',
      );
      return null;
    }
  },
  updateAccessTokenLocalStorage: (access: JWTModel['access']) => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const parsedJwt = JSON.parse(jwt);
      parsedJwt.access = access;
      localStorage.setItem('jwt', JSON.stringify(parsedJwt));
    }
  },
  removeFromLocalStorage: () => {
    localStorage.removeItem('jwt');
  },
  isAccessTokenExpired: (token: JWTModel['access']): boolean => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp ? decoded.exp < currentTime : false;
  },

  isRefreshTokenExpired: (token: JWTModel['refresh']): boolean => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp ? decoded.exp < currentTime : false;
  },
};
