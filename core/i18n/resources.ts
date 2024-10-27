import ar from "@/translations/ar.json";
import en from "@/translations/en.json";
import hi from "@/translations/hi.json";

export const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
  ar: {
    translation: ar,
  },
};

export type Language = keyof typeof resources;
