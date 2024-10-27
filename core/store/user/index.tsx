import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { signin } from "@/core/auth";
import { AppWriteCreateUser, AppWriteCurrentUser } from "@/lib/appwrite";

import type { User } from "@/types";

interface SignUpState {
  email: string;
  username: string;
  password: string;
}

interface UserState {
  status: "idle" | "pending";
  error: string | null;
  user: User | null;
  isPurchased: string;
  setUser: (data: SignUpState) => Promise<void>;
  getUser: () => Promise<void>;
  getPurchase: (courseid: string) => Promise<void>;
  removeUser: () => void;
  hydrate: () => void;
}

export const useUser = create<UserState>()(
  devtools((set, get) => ({
    status: "idle",
    isPurchased: "",
    error: null,
    user: null,
    setUser: async (data: SignUpState) => {
      try {
        set({ status: "pending", error: "" });
        const response = await AppWriteCreateUser(
          data.email,
          data.password,
          data.username,
        );
        if (response) {
          set({
            status: "idle",
            user: {
              userId: response.accountId,
              email: response.email,
              username: response.username,
            } as unknown as User,
          });
          signin();
        }
      } catch (e: any) {
        console.log(e);
        set({ error: e.message });
      } finally {
        set({ status: "idle" });
      }
    },
    getUser: async () => {
      try {
        set({ status: "pending" });
        const response = await AppWriteCurrentUser();
        if (response) {
          set((state) => ({
            status: "idle",
            user: {
              id: response.$id,
              username: response.username,
              email: response.email,
              userId: response.accountId,
            } as unknown as User,
          }));
          return;
        }
      } catch (e) {
        console.log(e);
      } finally {
        set({ status: "idle" });
      }
    },
    getPurchase: async (courseid) => {
      try {
        // const response = await client.post(`purchases`, {
        //   userId: (get().user! as any).userId,
        //   courseId: courseid,
        // });
        // if (response.status === 200) {
        //   if (response.data.courseId === courseid) {
        //     set({ status: "idle", isPurchased: response.data.courseId });
        //   }
        // }
      } catch (e) {
        console.log(e);
      } finally {
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
export const currentUser = () => useUser.getState().user;
export const hydrateUser = () => useUser.getState().hydrate();
