import { SplashScreen, Redirect, Stack } from "expo-router";
import { useCallback, useEffect } from "react";

import { useAuth } from "@/core/auth";
import { STATUS, useFirstTime } from "@/core/store/use-first";
import { useUser } from "@/core/store/user";

const Layout = () => {
  const getUser = useUser((state) => state.getUser);
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

  useEffect(() => {
    if (authStatus === "signIn") {
      getUser();
    }
  }, [authStatus, getUser]);

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
