import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";

import { resources } from "@/core/i18n/resources";
import { getLanguage } from "@/core/i18n/utils";
export * from "@/core/i18n/utils";

export const initI18n = async () => {
  const defaultLanguage =
    (await getLanguage()) || getLocales()[0].languageCode || "en";

  await i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: "en",
    compatibilityJSON: "v3", // By default React Native projects does not support Intl

    // allows integrating dynamic values into translations.
    interpolation: {
      escapeValue: false, // escape passed in values to avoid XSS injections
    },
  });

  return i18n;
};

initI18n();

// Is it a RTL language?
export const isRTL: boolean = i18n.dir(getLocales()[0].languageCode!) === "rtl";

I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

export default i18n;
