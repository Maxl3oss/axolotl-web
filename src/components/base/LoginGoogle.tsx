'use client';

import { BASE_URL } from '@/lib/service';
import React, { Fragment, useState } from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import SignInWindow from './SignInWindow';
import { stringToJSONSchema } from '@/lib/utils';
import useAuthStore, { DataLogin } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { LoaderIcon } from 'lucide-react';

function LoginGoogle() {
  const router = useRouter();
  const [showSignInWindow, setShowSignInWindow] = useState(false);
  const { login } = useAuthStore();

  const handleLoginGoogle = () => {
    setShowSignInWindow(true);
  };

  const handleMessage = (data: string) => {
    const result = stringToJSONSchema.safeParse(data);
    if (result.success) {
      const jsonParse: DataLogin = JSON.parse(data);
      login(jsonParse);
      router.push('/');
    }
  };

  return (
    <Fragment>
      <Button onClick={() => handleLoginGoogle()} variant="outline" className="w-full flex gap-x-2 items-center h-14">
        {showSignInWindow ? <LoaderIcon size={22} className="animate-spin" /> : <FcGoogle size={22} />}
        <h3 className="text-base font-semibold">Login with Google</h3>
      </Button>
      {showSignInWindow ? (
        <SignInWindow
          url={BASE_URL + '/auth/google/login'}
          name="Google Sign-In"
          onClose={setShowSignInWindow}
          onMessage={handleMessage}
        />
      ) : null}
    </Fragment>
  );
}

export default LoginGoogle;
