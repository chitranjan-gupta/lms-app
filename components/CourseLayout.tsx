import { StripeProvider } from "@stripe/stripe-react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { icons, STRIPE_PUBLISHABLE_KEY } from "@/constants";

const CourseLayout = ({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) => {
  return (
    <ThemedView
      className="w-full h-full"
      lightColor="transparent"
      darkColor="transparent"
    >
      <StripeProvider
        publishableKey={STRIPE_PUBLISHABLE_KEY!}
        merchantIdentifier="merchant.com.shikshasetu"
        urlScheme="myapp"
      >
        <SafeAreaView className="w-full h-full">
          <ThemedView
            className="flex flex-col w-full h-full justify-start"
            lightColor="transparent"
            darkColor="transparent"
          >
            <ThemedView
              className="flex flex-row w-full h-[40px] items-center justify-start mx-2 mt-2"
              lightColor="transparent"
              darkColor="transparent"
            >
              <TouchableOpacity onPress={() => router.back()}>
                <ThemedView className="w-10 h-10 rounded-full items-center justify-center bg-gray-200">
                  <Image
                    source={icons.backArrow}
                    contentFit="contain"
                    className="w-6 h-6"
                  />
                </ThemedView>
              </TouchableOpacity>
              {title ? (
                <ThemedText className="text-xl font-semibold ml-5">
                  {title}
                </ThemedText>
              ) : (
                <></>
              )}
            </ThemedView>
            <ThemedView
              className="w-full p-2 relative h-full"
              lightColor="transparent"
              darkColor="transparent"
            >
              {children}
            </ThemedView>
          </ThemedView>
        </SafeAreaView>
      </StripeProvider>
    </ThemedView>
  );
};

export default CourseLayout;
