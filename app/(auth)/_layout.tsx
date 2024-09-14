import { SplashScreen, Redirect, Stack } from "expo-router";
import { useCallback, useEffect } from "react";

import { useAuth } from "@/core/auth";
import { STATUS, useFirstTime } from "@/core/store/use-first";

const Layout = () => {
  const authStatus = useAuth((state) => state.status);
  const isFirstTime = useFirstTime((state) => state.status);

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (authStatus !== "idle") {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, authStatus]);

  if (isFirstTime === STATUS.yes) {
    return <Redirect href="/(unauth)/onboarding" />;
  }

  if (authStatus === "signOut") {
    return <Redirect href="/(unauth)/sign-up" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(courses)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
