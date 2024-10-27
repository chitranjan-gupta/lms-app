import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { client } from "@/api/common/client";
import { Lecture } from "@/types";

interface FetchState {
  lectureId: string;
  chapterId: string;
  courseId: string;
  purchase: boolean;
  userId: string;
}

interface LectureState {
  status: "idle" | "pending";
  lectureid: string | null;
  lecture: Lecture | null;
  setLecture: (lectureid: string) => Promise<void>;
  getLecture: (data: FetchState) => Promise<void>;
  hydrate: () => void;
}

export const useLecture = create<LectureState>()(
  devtools((set, get) => ({
    status: "idle",
    lectureid: null,
    lecture: null,
    setLecture: async (lectureid) => {
      try {
        set({ lectureid: lectureid });
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    getLecture: async (data) => {
      try {
        set({ status: "pending" });
        const response = await client.post(`courses/user/lecture`, { ...data });
        if (response.status === 200) {
          set({ status: "idle", lecture: response.data });
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

export const setLecture = (lectureid: string) =>
  useLecture.getState().setLecture(lectureid);
export const getLecture = (data: FetchState) =>
  useLecture.getState().getLecture(data);
export const hydrateLecture = () => useLecture.getState().hydrate();
