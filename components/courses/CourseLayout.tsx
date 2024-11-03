import { StripeProvider } from "@stripe/stripe-react-native";

import {
  merchantIdentifier,
  STRIPE_PUBLISHABLE_KEY,
  urlScheme,
} from "@/constants";
import { SafeAreaView, Text, View } from "@/ui";

import { BackButton } from "../BackButton";

import type { ReactNode } from "react";

interface CourseLayoutProps {
  title?: string;
  children: ReactNode;
}

export const CourseLayout = ({ title, children }: CourseLayoutProps) => {
  return (
    <View className="w-full h-full">
      <StripeProvider
        publishableKey={STRIPE_PUBLISHABLE_KEY!}
        merchantIdentifier={merchantIdentifier}
        urlScheme={urlScheme}
      >
        <SafeAreaView className="w-full h-full">
          <View className="flex flex-col w-full h-full justify-start">
            <View className="flex flex-row w-full h-[40px] items-center justify-start mx-2 mt-2">
              <BackButton />
              <Text className="text-xl font-semibold ml-5">{title || ""}</Text>
            </View>
            <View className="w-full p-2 relative h-full">{children}</View>
          </View>
        </SafeAreaView>
      </StripeProvider>
    </View>
  );
};
