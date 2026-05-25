import { get, post } from '../config/http-client';
import { API } from '../config/api';
import type {
  RegisterData,
  TokenModel,
  ActivateResponse,
  UserModel,
  JWTModel,
  LoginData,
  LoginResponse,
  RegisterResponse,
} from '@/types';

export const requestRegistration = async (
  data: RegisterData,
): Promise<RegisterResponse> => {
  const response = await post(API.authRegister, data);
  return response.data;
};

export const requestActivate = async (
  data: TokenModel,
): Promise<ActivateResponse> => {
  const response = await post(API.authActivate, data);
  return response.data;
};

export const requestUser = async (): Promise<UserModel> => {
  const response = await get(API.authUser);
  return response.data;
};

export const requestRefreshToken = async (
  data: Pick<JWTModel, 'refresh'>,
): Promise<JWTModel> => {
  const response = await post(API.authRefreshToken, data);

  return response.data;
};

export const requestLogin = async (data: LoginData): Promise<LoginResponse> => {
  const response = await post(API.authLogin, data);
  return response.data;
};
