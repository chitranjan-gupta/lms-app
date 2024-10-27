import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { removeItem, setItem } from "@/core/storage";
import {
  AppWriteCurrentSession,
  AppWriteLogOut,
  AppWriteSignIn,
} from "@/lib/appwrite";

import type { TokenType } from "@/types";

const TOKEN = "token";

interface SignInState {
  email: string;
  password: string;
}

interface AuthState {
  token: TokenType | null;
  status: "idle" | "pending" | "signOut" | "signIn";
  isloading: boolean;
  error: string | null;
  signIn: (data: SignInState) => Promise<void>;
  signin: () => void;
  signOut: () => Promise<void>;
  refresh: (newToken: TokenType | null, logout: boolean) => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  devtools((set, get) => ({
    status: "idle",
    isloading: false,
    error: null,
    token: null,
    signIn: async (data) => {
      try {
        set({ isloading: true, error: null });
        const session = await AppWriteSignIn(data.email, data.password);
        if (session) {
          const token = {
            access: session.providerAccessToken,
            refresh: session.providerRefreshToken,
          };
          set((state) => ({
            status: "signIn",
            token: token,
          }));
          await setItem<TokenType>(TOKEN, token);
        }
      } catch (e: any) {
        console.log(e);
        set({ error: e.message });
      } finally {
        set({ isloading: false });
      }
    },
    signin: () => {
      set((state) => ({
        status: "signIn",
      }));
    },
    signOut: async () => {
      try {
        set({ isloading: true });
        const status = await AppWriteLogOut();
        if (status) {
          await removeItem(TOKEN);
          set((state) => ({ status: "signOut", token: null }));
        }
      } catch (e) {
        console.log(e);
      } finally {
        set({ isloading: false });
      }
    },
    refresh: async (newToken, logout) => {
      try {
        // set({ isloading: true });
        // if (!logout && newToken) {
        //   set((state) => ({
        //     status: "signIn",
        //     token: newToken,
        //   }));
        //   setRequestInterceptor({ token: newToken! });
        //   setResponseInterceptior({ token: newToken!, refresh: get().refresh });
        //   await setItem<TokenType>(TOKEN, newToken!);
        // } else {
        //   set({ status: "signOut", token: null });
        //   await removeItem(TOKEN);
        // }
      } catch (e) {
        console.log(e);
      } finally {
        set({ isloading: false });
      }
    },
    hydrate: async () => {
      try {
        set({ isloading: true });
        const token = await AppWriteCurrentSession();
        if (token.current) {
          set({ status: "signIn" });
        } else {
          set({ status: "signOut", token: null });
        }
      } catch (e) {
        set({ status: "signOut", token: null });
        console.log(e);
      } finally {
        set({ isloading: false });
      }
    },
  })),
);

export const signOut = () => useAuth.getState().signOut();
export const signIn = (data: SignInState) => useAuth.getState().signIn(data);
export const hydrateAuth = () => useAuth.getState().hydrate();
export const signin = () => useAuth.getState().signin();
