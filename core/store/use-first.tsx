import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { getItem, setItem } from "@/core/storage";

const IS_FIRST_TIME = "IS_FIRST_TIME";

interface FirstTimeState {
  status: "yes" | "no";
  setStatus: (status: "yes" | "no") => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useFirstTime = create<FirstTimeState>()(
  devtools((set, get) => ({
    status: "yes",
    setStatus: async (status: "yes" | "no") => {
      set({ status: status });
      await setItem(IS_FIRST_TIME, status);
    },
    hydrate: async () => {
      try {
        const userStatus = await getItem<"yes" | "no">(IS_FIRST_TIME);
        if (userStatus !== null) {
          get().setStatus(userStatus);
        } else {
          get().setStatus("yes");
        }
      } catch (e) {
        console.error(e);
        // catch error here
        // Maybe sign_out user!
      }
    },
  })),
);

export const setStatus = (status: "yes" | "no") =>
  useFirstTime.getState().setStatus(status);
export const hydrateFirstTime = () => useFirstTime.getState().hydrate();
