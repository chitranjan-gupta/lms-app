import { Image } from "expo-image";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants";

const CourseLayout = ({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) => {
  return (
    <View className="bg-white w-full h-full">
      <SafeAreaView className="w-full h-full">
        <View className="flex flex-col w-full h-full bg-white justify-start">
          <View className="flex flex-row w-full h-[40px] items-center justify-start mx-2 mt-2">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <Image
                  source={icons.backArrow}
                  contentFit="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            {title ? (
              <Text className="text-xl font-semibold ml-5">{title}</Text>
            ) : (
              <></>
            )}
          </View>
          <View className="w-full p-2 relative h-full">{children}</View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CourseLayout;
