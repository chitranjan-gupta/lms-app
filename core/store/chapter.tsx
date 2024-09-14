import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { client } from "@/api/common/client";
import { Chapter } from "@/types/type";

interface ChapterState {
  status: "idle" | "pending";
  chapterid: string | null;
  chapter: Chapter | null;
  setChapter: (chapterid: string) => Promise<void>;
  getChapter: () => Promise<void>;
  hydrate: () => void;
}

export const useChapter = create<ChapterState>()(
  devtools((set, get) => ({
    status: "idle",
    chapterid: null,
    chapter: null,
    setChapter: async (chapterid) => {
      try {
        set({ chapterid: chapterid });
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    getChapter: async () => {
      try {
        set({ status: "pending" });
        const response = await client.get(`chapters/${get().chapterid}`);
        if (response.status === 200) {
          set({ status: "idle", chapter: response.data });
        }
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

export const getChapter = () => useChapter.getState().getChapter();
export const setChapter = (chapterid: string) =>
  useChapter.getState().setChapter(chapterid);
export const hydrateChapter = () => useChapter.getState().hydrate();
