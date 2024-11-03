import { useColorScheme } from "nativewind";
import { useMemo } from "react";

import { translate } from "@/core/i18n";
import { View, useModal } from "@/ui";

import { ThemeModal } from "../theme";

import { Item } from "./item";

export const ThemeItem = () => {
  const { colorScheme } = useColorScheme();
  const modal = useModal();

  const themes = useMemo(
    () => [
      { label: `${translate("settings.theme.system")} ⚙️`, value: "system" },
      { label: `${translate("settings.theme.light")} 🌞`, value: "light" },
      { label: `${translate("settings.theme.dark")} 🌙`, value: "dark" },
    ],
    [],
  );

  const theme = useMemo(
    () => themes.find((t) => t.value === colorScheme),
    [colorScheme, themes],
  );

  return (
    <View>
      <Item
        text="settings.theme.title"
        value={theme?.label}
        onPress={modal.present}
      />
      <ThemeModal ref={modal.ref} />
    </View>
  );
};
