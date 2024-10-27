import { Link, Stack } from "expo-router";

import { ThemedText, ThemedView } from "@/components";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView className="flex-[1] items-center justify-center p-[20px]">
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" className="mt-[15px] py-[15px]">
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
};

export default NotFoundScreen;
