import "expo-dev-client";
import "@/styles/globals.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { APIProvider } from "@/api/common/api-provider";
import { AnimatedAppLoader } from "@/components/SplashScreen";
import { hydrateAuth } from "@/core/auth";
import { loadSelectedTheme } from "@/core/hooks/use-selected-theme";
import { useThemeConfig } from "@/core/hooks/use-theme-config";
import { hydrateFirstTime } from "@/core/store/use-first";
import "@/core/i18n";
import "react-native-reanimated";

loadSelectedTheme();
hydrateFirstTime();
hydrateAuth();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useThemeConfig();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AnimatedAppLoader>
      <GestureHandlerRootView
        className={theme.dark ? "!bg-black" : "!bg-white"}
      >
        <ThemeProvider value={theme}>
          <APIProvider>
            <BottomSheetModalProvider>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(unauth)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="+not-found"
                  options={{ headerShown: false }}
                />
              </Stack>
            </BottomSheetModalProvider>
          </APIProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </AnimatedAppLoader>
  );
}
