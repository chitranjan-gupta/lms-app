import { useColorScheme } from "nativewind";

import { View, SafeAreaView, MaterialIcons, Text } from "@/ui";

export const Maintenance = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="bg-white dark:bg-black w-full h-full">
      <SafeAreaView className="flex flex-col justify-center items-center">
        <MaterialIcons
          name="error"
          size={100}
          color={colorScheme === "light" ? "black" : "white"}
        />
        <Text className="font-black text-4xl">In Maintenance</Text>
      </SafeAreaView>
    </View>
  );
};
