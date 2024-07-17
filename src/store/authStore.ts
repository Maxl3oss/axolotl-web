import { create } from 'zustand';
import { decryptData, encryptData } from '@/lib/crypto';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserInfo = {
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verifiedEmail: boolean;
};

export type Tokens = {
  access?: string;
  refresh?: string;
};

export type UserLogin = {
  isLoggedIn: boolean;
  userInfo?: UserInfo;
  tokens?: Tokens;
};

type AuthStore = UserLogin & {
  login: (data: DataLogin) => void;
  logout: () => void;
  setTokens: (tokens: Tokens) => void;
  setUserSession: (userInfo: UserInfo) => void;
  getUserSession: () => UserInfo | undefined;
  getIsLoggedInSession: () => boolean;
  getTokensSession: () => Tokens | undefined;
};

export type DataLogin = {
  userInfo: UserInfo;
  tokens: Tokens;
};

const isServer = typeof window === 'undefined';

const customStorage = {
  getItem: (name: string) => {
    if (isServer) return null;
    const value = localStorage.getItem(name);
    return value ? decryptData(value) : null;
  },
  setItem: (name: string, value: any) => {
    if (isServer) return;
    localStorage.setItem(name, encryptData(value));
  },
  removeItem: (name: string) => {
    if (isServer) return;
    localStorage.removeItem(name);
  },
};

const authStore = create(
  persist<AuthStore>(
    (set, get) => ({
      userInfo: {
        email: '',
        familyName: '',
        givenName: '',
        id: '',
        locale: '',
        name: '',
        picture: '',
        verifiedEmail: false,
      },
      tokens: undefined,
      isLoggedIn: false,
      login: (data: DataLogin) => {
        localStorage.setItem('access_token', data.tokens.access ?? '');
        set({ isLoggedIn: true, userInfo: data.userInfo, tokens: data.tokens });
      },
      logout: () => {
        set({ isLoggedIn: false, userInfo: undefined, tokens: undefined });
        if (!isServer) {
          localStorage.clear();
        }
      },
      setTokens: (tokens: Tokens) => {
        set({ tokens });
      },
      setUserSession: (userInfo: UserInfo) => {
        set({ userInfo });
      },
      getUserSession: () => {
        return get().userInfo;
      },
      getIsLoggedInSession: () => {
        return get().isLoggedIn;
      },
      getTokensSession: () => {
        return get().tokens;
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => customStorage),
    },
  ),
);

export default authStore;
