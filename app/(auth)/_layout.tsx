import { SplashScreen, Redirect, Stack } from "expo-router";
import { useCallback, useEffect } from "react";

import { useAuth } from "@/core/auth";
import { useFirstTime } from "@/core/store/use-first";
import { useUser } from "@/core/store/user";

const Layout = () => {
  const { getUser } = useUser();
  const { status: authStatus } = useAuth();
  const { status: isFirstTime } = useFirstTime();

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

  if (isFirstTime === "yes") {
    return <Redirect href="/(unauth)/onboarding" />;
  }

  if (authStatus === "signOut") {
    return <Redirect href="/(unauth)/sign-up" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(courses)" options={{ headerShown: false }} />
      <Stack.Screen name="(careers)" options={{ headerShown: false }} />
      <Stack.Screen name="(companies)" options={{ headerShown: false }} />
      <Stack.Screen name="(chats)" options={{ headerShown: false }} />
      <Stack.Screen name="(settings)" options={{ headerShown: false }} />
      <Stack.Screen name="(search)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
