import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { client } from "@/api/common/client";
import { BASE_URL } from "@/constants";

import type { User } from "@/types/type";

interface SignUpState {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface UserState {
  status: "idle" | "pending";
  error: string | null;
  user: User | null;
  setUser: (data: SignUpState) => Promise<void>;
  getUser: () => Promise<void>;
  removeUser: () => void;
  hydrate: () => void;
}

export const useUser = create<UserState>()(
  devtools((set, get) => ({
    status: "idle",
    error: null,
    user: null,
    setUser: async (data: SignUpState) => {
      try {
        set({ status: "pending" });
        const response = await axios.post(`${BASE_URL}/user/signup`, data);
        if (response.status === 200) {
          set({ status: "idle", user: response.data });
        }
      } catch (e: any) {
        console.log(e.response);
        set({ error: e.response.data.message });
      } finally {
        set({ status: "idle" });
      }
    },
    getUser: async () => {
      try {
        set({ status: "pending" });
        const response = await client.get(`user/auth`);
        if (response.status === 200) {
          set({ status: "idle", user: response.data });
        }
      } catch (e) {
        console.log(e);
      } finally {
        set({ status: "idle" });
      }
    },
    removeUser: () => {
      try {
        set({ status: "pending", user: null });
      } catch (e) {
        console.log(e);
      } finally {
        set({ status: "idle" });
      }
    },
    hydrate: () => {
      try {
      } catch (e) {
        console.error(e);
      }
    },
  })),
);

export const removeUser = () => useUser.getState().removeUser();
export const setUser = (user: User) => useUser.getState().setUser(user);
export const getUser = () => useUser.getState().getUser();
export const hydrateUser = () => useUser.getState().hydrate();
