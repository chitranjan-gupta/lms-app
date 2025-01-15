import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { fetchCategories } from "@/api";

import type { Category } from "@/types";

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
      const data = await fetchCategories();
      if (data) {
        set({ status: "idle", categories: data });
      }
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
