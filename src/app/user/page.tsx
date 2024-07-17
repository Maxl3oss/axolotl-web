'use client';

import { fetchRefreshToken } from '@/service/auth.services';
import authStore from '@/store/authStore';
import React, { useEffect } from 'react';

function page() {
  const { getUserSession, getTokensSession } = authStore();
  const userInfo = getUserSession();
  const tokens = getTokensSession();

  useEffect(() => {
    Promise.all([handleRefreshTokens()]);
  }, []);

  async function handleRefreshTokens() {
    const res = await fetchRefreshToken({ access: tokens?.access, refresh: tokens?.refresh });
    console.log(res);
    if (res && res.taskStatus && res.statusCode === 200) {
      console.log(res);
    }
  }

  return (
    <div>
      <p>{JSON.stringify(userInfo)}</p>
      <br />
      <p>{tokens?.access}</p>
      <br />
      <p>{tokens?.refresh}</p>
    </div>
  );
}

export default page;
