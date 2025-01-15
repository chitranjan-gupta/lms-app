import { ClientEnv, Env } from "./env";

import type { ConfigContext, ExpoConfig } from "@expo/config";
import type { AppIconBadgeConfig } from "app-icon-badge/types";

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: Env.APP_ENV !== "production",
  badges: [
    {
      text: Env.APP_ENV,
      type: "banner",
      color: "white",
    },
    {
      text: Env.VERSION.toString(),
      type: "ribbon",
      color: "white",
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: Env.DESCRIPTION,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: Env.SLUG,
  version: Env.VERSION.toString(),
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  updates: {
    url: Env.EAS_UPDATE_URL,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    requireFullScreen: true,
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: Env.PACKAGE,
    permissions: [
      "android.permission.RECORD_AUDIO",
      "android.permission.MODIFY_AUDIO_SETTINGS",
    ],
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#2F80ED",
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        dark: {
          image: "./assets/images/splash-icon-dark.png",
          backgroundColor: "#2F80ED",
        },
      },
    ],
    [
      "expo-font",
      {
        fonts: ["./assets/fonts/SpaceMono-Regular.ttf"],
      },
    ],
    [
      "expo-av",
      {
        microphonePermission:
          "Allow $(PRODUCT_NAME) to access your microphone.",
      },
    ],
    "expo-localization",
    [
      "expo-build-properties",
      {
        ios: {
          newArchEnabled: true,
        },
        android: {
          newArchEnabled: true,
        },
      },
    ],
    [
      "expo-video",
      {
        supportsBackgroundPlayback: true,
        supportsPictureInPicture: true,
      },
    ],
    ["app-icon-badge", appIconBadgeConfig],
    [
      "expo-tracking-transparency",
      {
        userTrackingPermission:
          "This identifier will be used to deliver personalized ads to you.",
      },
    ],
    [
      "@stripe/stripe-react-native",
      {
        enableGooglePay: true,
      },
    ],
    [
      "expo-screen-orientation",
      {
        initialOrientation: "DEFAULT",
      },
    ],
  ],
  runtimeVersion: {
    policy: "appVersion",
  },
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
