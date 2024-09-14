import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { client } from "@/api/common/client";
import { Course } from "@/types/type";

interface FetchState {
  courseId: string;
}

interface CourseState {
  status: "idle" | "pending";
  courseid: string | null;
  course: Course | null;
  setCourse: (data: FetchState) => Promise<void>;
  getCourse: () => Promise<void>;
  hydrate: () => void;
}

export const useCourse = create<CourseState>()(
  devtools((set, get) => ({
    status: "idle",
    courseid: null,
    course: null,
    setCourse: async (data) => {
      try {
        set({ courseid: data.courseId });
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    getCourse: async () => {
      try {
        set({ status: "pending" });
        const response = await client.get(`courses/${get().courseid}`);
        if (response.status === 200) {
          set({ status: "idle", course: response.data });
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

export const getCourse = () => useCourse.getState().getCourse();
export const setCourse = (data: FetchState) =>
  useCourse.getState().setCourse(data);
export const hydrateCourse = () => useCourse.getState().hydrate();
