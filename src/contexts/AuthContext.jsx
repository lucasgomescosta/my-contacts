import { createContext, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { storageKeys } from '../config/storageKeys';
import { AuthService } from '../services/AuthService';
import apiClient from '../utils/api';

export const AuthContext = createContext({
  signedIn: false,
  user: null,
  signIn: async () => { },
  signUp: async () => { },
  signOut: () => { },
});

function getStoredUser() {
  const rawUser = localStorage.getItem(storageKeys.user);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

function clearAuthStorage() {
  localStorage.removeItem(storageKeys.accessToken);
  localStorage.removeItem(storageKeys.refreshToken);
  localStorage.removeItem(storageKeys.user);
}

function buildFallbackUser(email) {
  return {
    name: email?.split('@')?.[0] ?? 'Usuário',
    role: 'Usuário',
    email,
  };
}

function extractAuthPayload(responseData, emailFallback) {
  const accessToken = responseData?.accessToken;
  const refreshToken = responseData?.refreshToken;
  const user = responseData?.user ?? buildFallbackUser(emailFallback);

  return { accessToken, refreshToken, user };
}

export function AuthProvider({ children }) {
  const [signedIn, setSignedIn] = useState(() => !!localStorage.getItem(storageKeys.accessToken));
  const [user, setUser] = useState(getStoredUser);

  const signOut = useCallback(() => {
    clearAuthStorage();
    setSignedIn(false);
    setUser(null);
  }, []);

  useLayoutEffect(() => {
    const interceptorId = apiClient.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(storageKeys.accessToken);
      const isAuthRoute = config.url?.startsWith('/auth/');

      if (accessToken && !isAuthRoute) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    return () => {
      apiClient.interceptors.request.eject(interceptorId);
    };
  }, []);

  useLayoutEffect(() => {
    const interceptorId = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem(storageKeys.refreshToken);

        if (!originalRequest || originalRequest.url === '/refresh-token') {
          signOut();
          return Promise.reject(error);
        }

        if (error.response?.status !== 401 || !refreshToken || originalRequest._retry) {
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
          const refreshData = await AuthService.refreshToken(refreshToken);
          const { accessToken, refreshToken: newRefreshToken } = refreshData;

          localStorage.setItem(storageKeys.accessToken, accessToken);
          localStorage.setItem(storageKeys.refreshToken, newRefreshToken);

          return apiClient(originalRequest);
        } catch (refreshError) {
          signOut();
          return Promise.reject(refreshError);
        }
      },
    );

    return () => {
      apiClient.interceptors.response.eject(interceptorId);
    };
  }, [signOut]);

  const signIn = useCallback(async (email, password) => {
    const responseData = await AuthService.signIn({ email, password });
    const { accessToken, refreshToken, user: authUser } = extractAuthPayload(responseData, email);

    localStorage.setItem(storageKeys.accessToken, accessToken);
    localStorage.setItem(storageKeys.refreshToken, refreshToken);
    localStorage.setItem(storageKeys.user, JSON.stringify(authUser));

    setSignedIn(true);
    setUser(authUser);
  }, []);

  const signUp = useCallback(async ({ name, email, password }) => {
    await AuthService.signUp({ name, email, password });
    await signIn(email, password);
  }, [signIn]);

  const value = useMemo(() => ({
    signedIn,
    user,
    signIn,
    signUp,
    signOut,
  }), [signedIn, user, signIn, signUp, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
