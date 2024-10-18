import { Query } from "react-native-appwrite";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { config } from "@/constants";
import { databases } from "@/lib/appwrite";

import type { Kanban_Column } from "@/types/type";

interface ColumnsState {
  status: "idle" | "pending";
  columns: Kanban_Column[];
  setColumns: (columns: Kanban_Column[]) => Promise<void>;
  getColumns: () => Promise<void>;
  hydrate: () => void;
}

export const useColumns = create<ColumnsState>()(
  devtools((set, get) => ({
    status: "idle",
    columns: [],
    setColumns: async (columns: Kanban_Column[]) => {
      set({ columns: columns });
    },
    getColumns: async () => {
      set({ status: "pending" });
      const response = await databases.listDocuments(
        config.databaseId!,
        config.kanban_columncollectionId!,
        [Query.orderAsc("index"), Query.limit(10)],
      );
      set({
        status: "idle",
        columns: response.documents as unknown[] as Kanban_Column[],
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

export const getColumns = () => useColumns.getState().getColumns();
export const setColumns = (columns: Kanban_Column[]) =>
  useColumns.getState().setColumns(columns);
export const hydrateColumns = () => useColumns.getState().hydrate();
