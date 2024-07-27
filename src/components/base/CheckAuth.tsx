'use client';

import authStore, { Tokens } from '@/store/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingPage from './LoadingPage';
import LoginGoogle from './LoginGoogle';
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from '../ui/dialog';
import { AlertDialogHeader } from '../ui/alert-dialog';

const LOGIN_PATH = '/auth/login';

function CheckAuth({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const { getIsLoggedInSession, getTokensSession, logout } = authStore();
  const tokens = getTokensSession();
  const isLoggedIn = getIsLoggedInSession();
  const [isLoading, setIsLoading] = useState(true);
  const [modalLogin, setModalLogin] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!isLoggedIn && pathname !== LOGIN_PATH) {
        setModalLogin(true);
      }
      setModalLogin(false);
      setIsLoading(false);
    };

    checkAuthStatus();

    return () => {
      setIsLoading(true);
    };
  }, [pathname, router, isLoggedIn, tokens]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Dialog open={modalLogin}>
        <DialogContent>
          <div className="text-center">
            <h1 className="text-3xl font-semibold">Sign up</h1>
            <h3 className="">Join Axolotl for a good life.</h3>
          </div>
          <LoginGoogle />
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
}

export default CheckAuth;
