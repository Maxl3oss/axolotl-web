import { fetchRefreshToken } from '@/service/auth.services';
import authStore, { Tokens, UserLogin } from '@/store/authStore';
import axios from 'axios';
import { decryptData, encryptData } from './crypto';
import { stringToJSONSchema } from './utils';
import useAuth from './useAuth';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;
export const SECRET_KEY = process.env.NEXT_PUBLIC_API_URL as string;
export const YOUTUBE_KEY = process.env.NEXT_PUBLIC_YOUTUBE_KEY as string;

export const useAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': ['application/json;multipart/form-data;'],
    'Access-Control-Allow-Origin': '*',
  },
});

useAxios.interceptors.request.use((config) => {
  const tokens = getTokens();
  config.headers['Authorization'] = `Bearer ${tokens.access}`;
  return config;
});

useAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const tokens = getTokens();
        if (tokens) {
          const response = await fetchRefreshToken(tokens);
          const { access, refresh }: Tokens = response.data;

          setTokens({ access, refresh });
          useAxios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
          return await useAxios(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.clear();
      location.reload();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

const getTokens = (): Tokens => {
  let tokens: Tokens = { access: '', refresh: '' };
  const valueLocal = localStorage.getItem('user');
  const rawData = decryptData(valueLocal ?? '') as string;
  const result = stringToJSONSchema.safeParse(rawData);
  if (result.success) {
    const data: { state: UserLogin } = JSON.parse(rawData);
    const access_token = localStorage.getItem('access_token') as string;

    tokens.refresh = data.state.tokens?.refresh ?? '';
    tokens.access = access_token;
  }
  return tokens;
};

const setTokens = (tokens: Tokens) => {
  const valueLocal = localStorage.setItem('access_token', tokens.access ?? '');
};

type UserInfo = UserLogin & {
  version: number;
};

export default useAxios;
