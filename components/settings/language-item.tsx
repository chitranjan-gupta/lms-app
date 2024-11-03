import { useCallback, useMemo } from "react";

import { useSelectedLanguage, translate } from "@/core/i18n";
import { View, useModal, Options, type OptionType } from "@/ui";

import { Item } from "./item";

import type { Language } from "@/core/i18n/resources";

export const LanguageItem = () => {
  const { language, setLanguage } = useSelectedLanguage();
  const modal = useModal();
  const onSelect = useCallback(
    (option: OptionType) => {
      setLanguage(option.value as Language);
      modal.dismiss();
    },
    [setLanguage, modal],
  );

  const langs = useMemo(
    () => [
      { label: translate("settings.english"), value: "en" },
      { label: translate("settings.hindi"), value: "hi" },
      { label: translate("settings.arabic"), value: "ar" },
    ],
    [],
  );

  const selectedLanguage = useMemo(
    () => langs.find((lang) => lang.value === language),
    [language, langs],
  );

  return (
    <View>
      <Item
        text="settings.language"
        value={selectedLanguage?.label}
        onPress={modal.present}
      />
      <Options
        ref={modal.ref}
        options={langs}
        onSelect={onSelect}
        value={selectedLanguage?.value}
      />
    </View>
  );
};
