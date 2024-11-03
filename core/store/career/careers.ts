import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { fetchCareers } from "@/api";

import type { Career } from "@/types";

interface CareersState {
  status: "idle" | "pending";
  careers: Career[];
  setCareers: (careers: Career[]) => Promise<void>;
  getCareers: () => Promise<void>;
  hydrate: () => void;
}

export const useCareers = create<CareersState>()(
  devtools((set, get) => ({
    status: "idle",
    careers: [],
    setCareers: async (careers: Career[]) => {
      set({ careers: careers });
    },
    getCareers: async () => {
      set({ status: "pending" });
      const data = await fetchCareers();
      set({
        status: "idle",
        careers: data,
      });
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
