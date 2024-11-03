import i18n from "i18next";
import memoize from "lodash.memoize";
import { useCallback } from "react";
import { I18nManager, DevSettings, Platform } from "react-native";
import RNRestart from "react-native-restart";

import { useStorage } from "@/core/hooks/useStorage";
import { getItem, setItem } from "@/core/storage";

import type { Language, resources } from "@/core/i18n/resources";
import type { RecursiveKeyOf } from "@/core/i18n/types";
import type TranslateOptions from "i18next";

type DefaultLocale = typeof resources.en.translation;
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

export const LOCAL = "local";

export const getLanguage = async () => await getItem<string>(LOCAL);

export const setLanguage = async (language: string) =>
  await setItem<string>(LOCAL, language);

export const translate = memoize(
  (key: TxKeyPath, options = undefined) =>
    i18n.t(key, options) as unknown as string,
  (key: TxKeyPath, options: typeof TranslateOptions) =>
    options ? key + JSON.stringify(options) : key,
);

export const changeLanguage = (lang: Language) => {
  i18n.changeLanguage(lang);
  if (lang === "ar") {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }
  if (Platform.OS === "ios" || Platform.OS === "android") {
    if (__DEV__)
      DevSettings?.reload("Reload to change the application language");
    else RNRestart.restart();
  } else if (Platform.OS === "web") {
    window.location.reload();
  }
};

export const useSelectedLanguage = () => {
  const [language, setLang] = useStorage(LOCAL);

  const setLanguage = useCallback(
    (lang: Language) => {
      setLang(lang);
      if (lang !== undefined) changeLanguage(lang as Language);
    },
    [setLang],
  );

  return { language: language as Language, setLanguage };
};
