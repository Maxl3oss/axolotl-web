'use client';

import { useEffect } from 'react';
import useAuthStore from '../../store/authStore';

const Hydration = () => {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return null;
};

export default Hydration;
