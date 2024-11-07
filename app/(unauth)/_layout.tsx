import { Stack, router } from "expo-router";
import { useEffect } from "react";

import { useAuth } from "@/core/auth";

const Layout = () => {
  const status = useAuth((state) => state.status);
  useEffect(() => {
    if (status === "signIn") {
      router.replace("/(auth)/(tabs)/home");
    }
  }, [status]);

  return (
    <Stack>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
