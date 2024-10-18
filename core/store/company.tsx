import { Query } from "react-native-appwrite";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { config } from "@/constants";
import { databases } from "@/lib/appwrite";
import { Company } from "@/types/type";

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
        const response = await databases.listDocuments(
          config.databaseId!,
          config.companiescollectionId!,
          [Query.equal("$id", [get().companyid!]), Query.limit(10)],
        );
        set({
          status: "idle",
          company: response.documents[0] as unknown as Company,
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
