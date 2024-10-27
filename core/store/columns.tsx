import { ID, Query } from "react-native-appwrite";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { config } from "@/constants";
import { databases } from "@/lib/appwrite";

import { currentUser } from "./user";

import type { Kanban_Column } from "@/types";

interface Column extends Omit<Kanban_Column, "$id" | "kanbanRow"> {}

interface ColumnsState {
  status: "idle" | "pending";
  columns: Kanban_Column[];
  setColumns: (columns: Kanban_Column[]) => Promise<void>;
  getColumns: () => Promise<void>;
  addColumns: (columns: Column[]) => Promise<void>;
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
      const user = currentUser();
      set({ status: "pending" });
      const response = await databases.listDocuments(
        config.databaseId!,
        config.kanban_columncollectionId!,
        [
          Query.equal("user", user?.id!),
          Query.orderAsc("index"),
          Query.limit(10),
        ],
      );
      set({
        status: "idle",
        columns: response.documents as unknown[] as Kanban_Column[],
      });
    },
    addColumns: async (columns: Column[]) => {
      const user = currentUser();
      const promises = columns.map((column) => {
        return databases.createDocument(
          config.databaseId!,
          config.kanban_columncollectionId!,
          ID.unique(),
          {
            name: column.name,
            index: column.index,
            user: user?.id,
          },
        );
      });
      await Promise.all(promises);
      await get().getColumns();
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
export const listColumns = () => useColumns.getState().columns;
export const setColumns = (columns: Kanban_Column[]) =>
  useColumns.getState().setColumns(columns);
export const hydrateColumns = () => useColumns.getState().hydrate();
