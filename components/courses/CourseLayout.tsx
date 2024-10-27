import { StripeProvider } from "@stripe/stripe-react-native";
import { router } from "expo-router";

import { STRIPE_PUBLISHABLE_KEY } from "@/constants";
import { TouchableOpacity, SafeAreaView, Text, View, AntDesign } from "@/ui";

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
        merchantIdentifier="merchant.com.shikshasetu"
        urlScheme="shikshasetu"
      >
        <SafeAreaView className="w-full h-full">
          <View className="flex flex-col w-full h-full justify-start">
            <View className="flex flex-row w-full h-[40px] items-center justify-start mx-2 mt-2">
              <TouchableOpacity onPress={() => router.back()}>
                <View className="w-10 h-10 rounded-full items-center justify-center bg-gray-200">
                  <AntDesign name="arrowleft" size={24} color={"black"} />
                </View>
              </TouchableOpacity>
              <Text className="text-xl font-semibold ml-5">{title || ""}</Text>
            </View>
            <View className="w-full p-2 relative h-full">{children}</View>
          </View>
        </SafeAreaView>
      </StripeProvider>
    </View>
  );
};
