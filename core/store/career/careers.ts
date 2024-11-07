import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { fetchCareers } from "@/api";

import type { Career } from "@/types";

interface CareersState {
  status: "idle" | "pending";
  careers: Career[];
  page: number;
  per_page: number;
  last_page: number;
  setCareers: (careers: Career[]) => Promise<void>;
  getCareers: () => Promise<void>;
  moreCareers: () => Promise<void>;
  hydrate: () => void;
}

export const useCareers = create<CareersState>()(
  devtools((set, get) => ({
    status: "idle",
    careers: [],
    page: 1,
    per_page: 10,
    last_page: 1,
    setCareers: async (careers: Career[]) => {
      set({ careers: careers });
    },
    getCareers: async () => {
      set({ status: "pending" });
      const data = await fetchCareers(1, 10);
      if (data) {
        set({
          status: "idle",
          careers: data.data as Career[],
          page: data.current_page,
          per_page: data.per_page,
          last_page: data.last_page,
        });
      }
    },
    moreCareers: async () => {
      if (get().last_page > get().page) {
        const data = await fetchCareers(get().page + 1, get().per_page);
        if (data) {
          set((state) => ({
            status: "idle",
            careers: [...state.careers, ...data.data],
            page: data.current_page,
            per_page: data.per_page,
            last_page: data.last_page,
          }));
        }
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

export const setCareers = (careers: Career[]) =>
  useCareers.getState().setCareers(careers);
export const hydrateCareers = () => useCareers.getState().hydrate();
