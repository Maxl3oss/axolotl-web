'use client';

import authStore, { Tokens } from '@/store/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingPage from './LoadingPage';

const LOGIN_PATH = '/auth/login';

function CheckAuth({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const { getIsLoggedInSession, getTokensSession, logout } = authStore();
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = getIsLoggedInSession();
  const tokens = getTokensSession();

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!isLoggedIn && pathname !== LOGIN_PATH) {
        logout();
        router.replace(LOGIN_PATH);
      }
      setIsLoading(false);
    };

    checkAuthStatus();

    return () => {
      setIsLoading(true);
    };
  }, [pathname, router, isLoggedIn, tokens, logout]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}

export default CheckAuth;
