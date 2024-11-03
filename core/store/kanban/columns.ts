import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createColumn, fetchColumns } from "@/api";

import type { Kanban_Column } from "@/types";

interface ColumnsState {
  status: "idle" | "pending";
  columns: Kanban_Column[];
  setColumns: (columns: Kanban_Column[]) => Promise<void>;
  getColumns: () => Promise<void>;
  addColumn: (name: string) => Promise<void>;
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
      const data = await fetchColumns();
      set({
        status: "idle",
        columns: data,
      });
    },
    addColumn: async (name: string) => {
      const data = await createColumn(name);
      if (data) {
        set((state) => ({ columns: [...state.columns, data] }));
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

export const getColumns = () => useColumns.getState().getColumns();
export const listColumns = () => useColumns.getState().columns;
export const setColumns = (columns: Kanban_Column[]) =>
  useColumns.getState().setColumns(columns);
export const hydrateColumns = () => useColumns.getState().hydrate();
