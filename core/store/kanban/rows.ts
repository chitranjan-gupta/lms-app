import { create } from "zustand";
import { devtools } from "zustand/middleware";

import {
  createRow,
  fetchRows,
  reorderRows,
  bookmarkRow as bookRow,
} from "@/api";

import type { Career, Kanban_Row } from "@/types";

interface Row {
  title: string;
  subtitle: string;
  columnId: string;
  career: Career;
}

interface InputRow extends Omit<Row, "columnId" | "position"> {}

interface RowsState {
  status: "idle" | "pending";
  rows: Kanban_Row[];
  setRows: (rows: Kanban_Row[]) => Promise<void>;
  getRows: () => Promise<void>;
  addRow: (row: Omit<Row, "career">) => Promise<void>;
  updateRow: (row: Kanban_Row) => Promise<void>;
  bookmarkRow: (row: InputRow) => Promise<void>;
  changeOrderRows: (rows: Kanban_Row[]) => Promise<void>;
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
      const data = await fetchRows();
      set({
        status: "idle",
        rows: data,
      });
    },
    addRow: async (row: Omit<Row, "career">) => {
      const data = await createRow(row.columnId, row.title, row.subtitle);
      if (data) {
        set((state) => ({ rows: [...state.rows, data] }));
      }
    },
    updateRow: async (row: Kanban_Row) => {},
    bookmarkRow: async (row: InputRow) => {
      const data = await bookRow(row.title, row.subtitle, row.career);
      if (data) {
        set((state) => ({ rows: [...state.rows, data] }));
      }
    },
    changeOrderRows: async (rows: Kanban_Row[]) => {
      const data = await reorderRows(rows);
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
export const addRow = (row: Row) => useRows.getState().addRow(row);
export const bookmarkRow = (row: InputRow) =>
  useRows.getState().bookmarkRow(row);
export const hydrateRows = () => useRows.getState().hydrate();
