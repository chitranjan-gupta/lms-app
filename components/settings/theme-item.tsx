import { useCallback, useMemo } from "react";

import {
  type ColorSchemeType,
  useSelectedTheme,
} from "@/core/hooks/use-selected-theme";
import { translate } from "@/core/i18n";
import { View, useModal, type OptionType, Options } from "@/ui";

import { Item } from "./item";

export const ThemeItem = () => {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const modal = useModal();

  const onSelect = useCallback(
    (option: OptionType) => {
      setSelectedTheme(option.value as ColorSchemeType);
      modal.dismiss();
    },
    [setSelectedTheme, modal],
  );

  const themes = useMemo(
    () => [
      { label: `${translate("settings.theme.system")} ⚙️`, value: "system" },
      { label: `${translate("settings.theme.light")} 🌞`, value: "light" },
      { label: `${translate("settings.theme.dark")} 🌙`, value: "dark" },
    ],
    [],
  );

  const theme = useMemo(
    () => themes.find((t) => t.value === selectedTheme),
    [selectedTheme, themes],
  );

  return (
    <View>
      <Item
        text="settings.theme.title"
        value={theme?.label}
        onPress={modal.present}
      />
      <Options
        ref={modal.ref}
        options={themes}
        onSelect={onSelect}
        value={theme?.value}
      />
    </View>
  );
};
