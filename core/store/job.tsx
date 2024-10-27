import { Query } from "react-native-appwrite";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { config } from "@/constants";
import { databases } from "@/lib/appwrite";
import { Job } from "@/types";

interface FetchState {
  jobId: string;
}

interface JobState {
  status: "idle" | "pending";
  jobid: string | null;
  job: Job | null;
  setJob: (data: FetchState) => Promise<void>;
  getJob: () => Promise<void>;
  hydrate: () => void;
}

export const useJob = create<JobState>()(
  devtools((set, get) => ({
    status: "idle",
    jobid: null,
    job: null,
    setJob: async (data) => {
      try {
        set({ jobid: data.jobId });
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    getJob: async () => {
      try {
        set({ status: "pending" });
        const response = await databases.listDocuments(
          config.databaseId!,
          config.jobscollectionId!,
          [Query.equal("$id", [get().jobid!]), Query.limit(10)],
        );
        set({
          status: "idle",
          job: response.documents[0] as unknown as Job,
        });
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

export const getJob = () => useJob.getState().getJob();
export const setJob = (data: FetchState) => useJob.getState().setJob(data);
export const hydrateJob = () => useJob.getState().hydrate();
