import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { client } from "@/api/common/client";
import { BASE_URL } from "@/constants";
import { getItem, removeItem, setItem } from "@/core/storage";
import { setRequestInterceptor, setResponseInterceptior } from "@/core/utils";

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
        set({ isloading: true });
        const response = await axios.post(`${BASE_URL}/user/signin`, {
          email: data.email,
          password: data.password,
        });
        if (response.status === 200) {
          const token = {
            access: response.data.access_token,
            refresh: response.data.access_token,
          };
          set((state) => ({
            status: "signIn",
            token: token,
          }));
          setRequestInterceptor({ token });
          setResponseInterceptior({ token: token, refresh: get().refresh });
          await setItem<TokenType>(TOKEN, token);
        }
      } catch (e: any) {
        console.log(e.response);
        set({ error: e.response.data.message });
      } finally {
        set({ isloading: false });
      }
    },
    signOut: async () => {
      try {
        set({ isloading: true });
        const response = await client.get(`user/logout`);
        if (response.status === 200) {
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
        set({ isloading: true });
        if (!logout && newToken) {
          set((state) => ({
            status: "signIn",
            token: newToken,
          }));
          setRequestInterceptor({ token: newToken! });
          setResponseInterceptior({ token: newToken!, refresh: get().refresh });
          await setItem<TokenType>(TOKEN, newToken!);
        } else {
          set({ status: "signOut", token: null });
          await removeItem(TOKEN);
        }
      } catch (e) {
        console.log(e);
      } finally {
        set({ isloading: false });
      }
    },
    hydrate: async () => {
      try {
        set({ isloading: true });
        const token = await getItem<TokenType>(TOKEN);
        if (token !== null) {
          setRequestInterceptor({ token });
          setResponseInterceptior({ token: token, refresh: get().refresh });
          set({ status: "signIn", token: token });
        } else {
          set({ status: "signOut", token: null });
        }
      } catch (e) {
        console.error(e);
      } finally {
        set({ isloading: false });
      }
    },
  })),
);

export const signOut = () => useAuth.getState().signOut();
export const signIn = (data: SignInState) => useAuth.getState().signIn(data);
export const hydrateAuth = () => useAuth.getState().hydrate();
