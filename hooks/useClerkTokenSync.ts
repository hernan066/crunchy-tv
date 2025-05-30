// hooks/useClerkTokenSync.ts
'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '@/store/slices/authSlice';

export const useClerkTokenSync = () => {
  const { getToken, isSignedIn } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const syncToken = async () => {
      if (isSignedIn) {
        const token = await getToken();
        if (token) {
          dispatch(setAuthToken(token));
        }
      }
    };

    syncToken();
  }, [isSignedIn, getToken, dispatch]);
};
