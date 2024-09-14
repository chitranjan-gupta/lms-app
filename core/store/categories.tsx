import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { client } from "@/api/common/client";

import type { Category } from "@/types/type";

interface CategoriesState {
  status: "idle" | "pending";
  categories: Category[];
  setCategories: (Categories: Category[]) => Promise<void>;
  getCategories: () => Promise<void>;
  hydrate: () => void;
}

export const useCategories = create<CategoriesState>()(
  devtools((set, get) => ({
    status: "idle",
    categories: [],
    setCategories: async (Categories: Category[]) => {
      set({ categories: Categories });
    },
    getCategories: async () => {
      set({ status: "pending" });
      const response = await client.get(`categories`);
      set({ status: "idle", categories: response.data });
    },
    hydrate: async () => {
      try {
      } catch (e) {
        console.log(e);
      }
    },
  })),
);

export const setCategories = (Categories: Category[]) =>
  useCategories.getState().setCategories(Categories);
export const hydrateCategories = () => useCategories.getState().hydrate();
