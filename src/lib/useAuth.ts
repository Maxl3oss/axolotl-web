import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authStore, { Tokens } from '@/store/authStore';
import { fetchRefreshToken } from '@/service/auth.services';
import axios from 'axios';

const useAuth = () => {
  const router = useRouter();
  const { getTokensSession, setTokens, logout } = authStore();
  const tokens = getTokensSession();

  useEffect(() => {
    const axiosInstance = axios.create();

    const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
      if (tokens) {
        config.headers['Authorization'] = `Bearer ${tokens}`;
      }
      return config;
    });

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const tokens = getTokensSession();
            if (tokens) {
              const response = await fetchRefreshToken(tokens);

              const { access, refresh }: Tokens = response.data;
              setTokens({ access, refresh });

              axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
              return axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            logout();
            router.replace('/auth/login');
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [tokens, getTokensSession, setTokens, logout, router]);
};

export default useAuth;
