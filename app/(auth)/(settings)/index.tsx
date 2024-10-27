import { router } from "expo-router";
import { useColorScheme } from "nativewind";

import { ItemsContainer, LanguageItem, ThemeItem } from "@/components";
// import Notification from "@/components/notification";
import {
  ScrollView,
  View,
  Pressable,
  SafeAreaView,
  FocusAwareStatusBar,
  Text,
  AntDesign,
} from "@/ui";

export default function Settings() {
  const { colorScheme } = useColorScheme();
  const onPress = () => {
    router.back();
  };
  return (
    <View className="w-full h-full">
      <FocusAwareStatusBar />
      <SafeAreaView>
        <View className="p-2">
          <Pressable onPress={onPress}>
            <AntDesign
              name="arrowleft"
              size={24}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </Pressable>
        </View>
        <ScrollView>
          <View className="flex-1 px-4">
            <Text className="text-xl font-bold" tx="settings.title" />
            <ItemsContainer title="settings.generale">
              <LanguageItem />
              <ThemeItem />
            </ItemsContainer>
          </View>
          {/* <Notification /> */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
