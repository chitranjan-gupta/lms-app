import { useColorScheme, colorScheme } from "nativewind";
import { useCallback } from "react";

import { useStorage } from "@/core/hooks/useStorage";
import { getItem } from "@/core/storage";

const SELECTED_THEME = "SELECTED_THEME";
export type ColorSchemeType = "light" | "dark" | "system";

/**
 * this hooks should only be used while selecting the theme
 * This hooks will return the selected theme which is stored in Storage
 * selectedTheme should be one of the following values 'light', 'dark' or 'system'
 * don't use this hooks if you want to use it to style your component based on the theme use useColorScheme from nativewind instead
 *
 */
export const useSelectedTheme = () => {
  const { setColorScheme } = useColorScheme();
  const [theme, _setTheme] = useStorage(SELECTED_THEME);

  const setSelectedTheme = useCallback(
    (t: ColorSchemeType) => {
      setColorScheme(t);
      _setTheme(t);
    },
    [setColorScheme, _setTheme],
  );

  const selectedTheme = (theme ?? "system") as ColorSchemeType;
  return { selectedTheme, setSelectedTheme } as const;
};

// to be used in the root file to load the selected theme from Storage
export const loadSelectedTheme = async () => {
  const storedTheme = await getItem<string>(SELECTED_THEME);
  if (storedTheme) {
    colorScheme.set(storedTheme as ColorSchemeType);
  }
};
