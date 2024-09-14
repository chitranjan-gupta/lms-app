import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { getItem, setItem } from "@/core/storage";

const IS_FIRST_TIME = "IS_FIRST_TIME";

export enum STATUS {
  yes = "yes",
  no = "no",
}

interface FirstTimeState {
  status: STATUS;
  setStatus: (status: STATUS) => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useFirstTime = create<FirstTimeState>()(
  devtools((set, get) => ({
    status: STATUS.yes,
    setStatus: async (status: STATUS) => {
      set({ status: status });
      await setItem(IS_FIRST_TIME, status);
    },
    hydrate: async () => {
      try {
        const userStatus = await getItem<STATUS>(IS_FIRST_TIME);
        if (userStatus !== null) {
          get().setStatus(userStatus);
        } else {
          get().setStatus(STATUS.yes);
        }
      } catch (e) {
        console.error(e);
        // catch error here
        // Maybe sign_out user!
      }
    },
  })),
);

export const setStatus = (status: STATUS) =>
  useFirstTime.getState().setStatus(status);
export const hydrateFirstTime = () => useFirstTime.getState().hydrate();
