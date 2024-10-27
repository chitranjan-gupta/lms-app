import { Query } from "react-native-appwrite";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { config } from "@/constants";
import { databases } from "@/lib/appwrite";

import type { Job } from "@/types";

interface JobsState {
  status: "idle" | "pending";
  jobs: Job[];
  setJobs: (Jobs: Job[]) => Promise<void>;
  getJobs: () => Promise<void>;
  hydrate: () => void;
}

export const useJobs = create<JobsState>()(
  devtools((set, get) => ({
    status: "idle",
    jobs: [],
    setJobs: async (Jobs: Job[]) => {
      set({ jobs: Jobs });
    },
    getJobs: async () => {
      set({ status: "pending" });
      const response = await databases.listDocuments(
        config.databaseId!,
        config.jobscollectionId!,
        [Query.orderDesc("$createdAt"), Query.limit(10)],
      );
      set({
        status: "idle",
        jobs: response.documents as unknown[] as Job[],
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

export const setJobs = (Jobs: Job[]) => useJobs.getState().setJobs(Jobs);
export const hydrateJobs = () => useJobs.getState().hydrate();
