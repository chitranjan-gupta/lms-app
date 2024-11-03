import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { fetchCompanies } from "@/api";

import type { Company } from "@/types";

interface CompaniesState {
  status: "idle" | "pending";
  companies: Company[];
  setCompanies: (Companies: Company[]) => Promise<void>;
  getCompanies: () => Promise<void>;
  hydrate: () => void;
}

export const useCompanies = create<CompaniesState>()(
  devtools((set, get) => ({
    status: "idle",
    companies: [],
    setCompanies: async (Companies: Company[]) => {
      set({ companies: Companies });
    },
    getCompanies: async () => {
      set({ status: "pending" });
      const data = await fetchCompanies();
      set({
        status: "idle",
        companies: data,
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

export const setCompanies = (Companies: Company[]) =>
  useCompanies.getState().setCompanies(Companies);
export const hydrateCompanies = () => useCompanies.getState().hydrate();
