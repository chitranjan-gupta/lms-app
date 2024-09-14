import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { client } from "@/api/common/client";

import type { Course } from "@/types/type";

interface CoursesState {
  status: "idle" | "pending";
  courses: Course[];
  setCourses: (courses: Course[]) => Promise<void>;
  getCourses: () => Promise<void>;
  hydrate: () => void;
}

export const useCourses = create<CoursesState>()(
  devtools((set, get) => ({
    status: "idle",
    courses: [],
    setCourses: async (courses: Course[]) => {
      set({ courses: courses });
    },
    getCourses: async () => {
      set({ status: "pending" });
      const response = await client.get(`courses`);
      set({ status: "idle", courses: response.data });
    },
    hydrate: async () => {
      try {
      } catch (e) {
        console.error(e);
      }
    },
  })),
);

export const setCourses = (courses: Course[]) =>
  useCourses.getState().setCourses(courses);
export const hydrateCourses = () => useCourses.getState().hydrate();
