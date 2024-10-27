import { useEffect, useState } from "react";

import { getItem, setItem } from "@/core/storage";

export const useStorage = (name: string, defaultValue?: string) => {
  const [state, setState] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    if (name) {
      const fetchItem = async () => {
        try {
          const value = await getItem<string>(name);
          setState(value ?? defaultValue);
        } catch (error) {
          console.error(`Error fetching item from storage: ${error}`);
        }
      };

      fetchItem();
    }
  }, [name, defaultValue]);

  const updateState = (value: string) => {
    setItem(name, value);
    setState(value);
  };

  return [state, updateState] as const; // Using 'as const' for better type inference
};
