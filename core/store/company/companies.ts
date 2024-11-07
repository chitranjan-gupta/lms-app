import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { fetchCompanies } from "@/api";

import type { Company } from "@/types";

interface CompaniesState {
  status: "idle" | "pending";
  companies: Company[];
  page: number;
  per_page: number;
  last_page: number;
  setCompanies: (Companies: Company[]) => Promise<void>;
  getCompanies: () => Promise<void>;
  moreCompanies: () => Promise<void>;
  hydrate: () => void;
}

export const useCompanies = create<CompaniesState>()(
  devtools((set, get) => ({
    status: "idle",
    companies: [],
    page: 1,
    per_page: 10,
    last_page: 1,
    setCompanies: async (Companies: Company[]) => {
      set({ companies: Companies });
    },
    getCompanies: async () => {
      set({ status: "pending" });
      const data = await fetchCompanies(1, 10);
      if (data) {
        set({
          status: "idle",
          companies: data.data as Company[],
          page: data.current_page,
          per_page: data.per_page,
          last_page: data.last_page,
        });
      }
    },
    moreCompanies: async () => {
      if (get().last_page > get().page) {
        const data = await fetchCompanies(get().page + 1, get().per_page);
        if (data) {
          set((state) => ({
            status: "idle",
            companies: [...state.companies, ...data.data],
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

export const setCompanies = (Companies: Company[]) =>
  useCompanies.getState().setCompanies(Companies);
export const hydrateCompanies = () => useCompanies.getState().hydrate();
