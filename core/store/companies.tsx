import { Query } from "react-native-appwrite";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { config } from "@/constants";
import { databases } from "@/lib/appwrite";

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
      const response = await databases.listDocuments(
        config.databaseId!,
        config.companiescollectionId!,
        [Query.orderDesc("$createdAt"), Query.limit(10)],
      );
      set({
        status: "idle",
        companies: response.documents as unknown[] as Company[],
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
