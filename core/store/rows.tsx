import { ID, Query } from "react-native-appwrite";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { config } from "@/constants";
import { getColumns } from "@/core/store/columns";
import { databases } from "@/lib/appwrite";

import type { Kanban_Row } from "@/types/type";

type Row = Omit<Kanban_Row, "$id" | "kanbanColumn"> & {
  columnId: string;
};

interface RowsState {
  status: "idle" | "pending";
  rows: Kanban_Row[];
  setRows: (rows: Kanban_Row[]) => Promise<void>;
  getRows: () => Promise<void>;
  addRows: (rows: Row[]) => Promise<void>;
  updateRows: (rows: Kanban_Row[]) => Promise<void>;
  hydrate: () => void;
}

export const useRows = create<RowsState>()(
  devtools((set, get) => ({
    status: "idle",
    rows: [],
    setRows: async (rows: Kanban_Row[]) => {
      set({ rows: rows });
    },
    getRows: async () => {
      set({ status: "pending" });
      const response = await databases.listDocuments(
        config.databaseId!,
        config.kanban_rowcollectionId!,
        [Query.orderAsc("index"), Query.limit(10)],
      );
      set({
        status: "idle",
        rows: response.documents as unknown[] as Kanban_Row[],
      });
    },
    addRows: async (rows: Row[]) => {
      const promises = rows.map((row) => {
        return databases.createDocument(
          config.databaseId!,
          config.kanban_rowcollectionId!,
          ID.unique(),
          {
            title: row.title,
            subtitle: row.subtitle,
            kanbanColumn: row.columnId,
            index: row.index,
          },
        );
      });
      await Promise.all(promises);
      await getColumns();
      await get().getRows();
    },
    updateRows: async (rows: Kanban_Row[]) => {
      const promises = rows.map((row) => {
        return databases.updateDocument(
          config.databaseId!,
          config.kanban_rowcollectionId!,
          row.$id,
          {
            title: row.title,
            subtitle: row.subtitle,
            kanbanColumn: row.kanbanColumn.$id,
            index: row.index,
          },
        );
      });
      await Promise.all(promises);
      await getColumns();
      await get().getRows();
    },
    hydrate: async () => {
      try {
      } catch (e) {
        console.log(e);
      }
    },
  })),
);

export const getRows = () => useRows.getState().getRows();
export const setRows = (rows: Kanban_Row[]) => useRows.getState().setRows(rows);
export const hydrateRows = () => useRows.getState().hydrate();
