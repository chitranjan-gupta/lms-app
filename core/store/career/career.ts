import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { fetchCareer } from "@/api";
import { Career } from "@/types";

interface FetchState {
  careerId: string;
}

interface CareerState {
  status: "idle" | "pending";
  careerid: string | null;
  career: Career | null;
  setCareer: (data: FetchState) => Promise<void>;
  getCareer: () => Promise<void>;
  hydrate: () => void;
}

export const useCareer = create<CareerState>()(
  devtools((set, get) => ({
    status: "idle",
    careerid: null,
    career: null,
    setCareer: async (data) => {
      try {
        set({ careerid: data.careerId });
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    getCareer: async () => {
      try {
        set({ status: "pending" });
        const data = await fetchCareer(get().careerid!);
        set({
          status: "idle",
          career: data,
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

export const getCareer = () => useCareer.getState().getCareer();
export const setCareer = (data: FetchState) =>
  useCareer.getState().setCareer(data);
export const hydrateCareer = () => useCareer.getState().hydrate();
