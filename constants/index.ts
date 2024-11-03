import background from "@/assets/images/background.png";
import check from "@/assets/images/check.png";
import message from "@/assets/images/message.png";
import noResult from "@/assets/images/no-result.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";

import type { Onboarding } from "@/types";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  check,
  noResult,
  message,
  background,
};

export const icons = {};

const onboarding: Onboarding[] = [
  {
    id: 1,
    title: "Numerous free courses",
    description: "Free courses for you to find your way to learning.",
    image: images.onboarding1,
    descriptionColor: "white",
    textColor: "#005b4f",
    backgroundColor: "#ffa3ce",
  },
  {
    id: 2,
    title: "Quick and Easy Learning",
    description:
      "Easy and fast learning at any time to help improve any skills",
    image: images.onboarding2,
    descriptionColor: "white",
    textColor: "#1e2169",
    backgroundColor: "#bae4fd",
  },
  {
    id: 3,
    title: "Track your progress",
    description:
      "Track and study according to the study plan, make study more motivated",
    image: images.onboarding3,
    descriptionColor: "white",
    textColor: "#F15937",
    backgroundColor: "#faeb8a",
  },
];

export const data = {
  onboarding,
};

export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
export const muxStreamBaseUrl = "https://stream.mux.com";
export const videoExtension = "m3u8";
export const STRIPE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const snapPoints = ["50%", "70%", "100%"];
export const merchantIdentifier =
  process.env.EXPO_PUBLIC_STRIPE_MERCHANT_IDENTIFIER;
export const urlScheme = process.env.EXPO_PUBLIC_URL_SCHEME;
