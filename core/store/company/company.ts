import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { fetchCompany } from "@/api";
import { Company } from "@/types";

interface FetchState {
  companyId: string;
}

interface CompanyState {
  status: "idle" | "pending";
  companyid: string | null;
  company: Company | null;
  setCompany: (data: FetchState) => Promise<void>;
  getCompany: () => Promise<void>;
  hydrate: () => void;
}

export const useCompany = create<CompanyState>()(
  devtools((set, get) => ({
    status: "idle",
    companyid: null,
    company: null,
    setCompany: async (data) => {
      try {
        set({ companyid: data.companyId });
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    getCompany: async () => {
      try {
        set({ status: "pending" });
        const data = await fetchCompany(get().companyid!);
        set({
          status: "idle",
          company: data,
        });
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

export const getCompany = () => useCompany.getState().getCompany();
export const setCompany = (data: FetchState) =>
  useCompany.getState().setCompany(data);
export const hydrateCompany = () => useCompany.getState().hydrate();
