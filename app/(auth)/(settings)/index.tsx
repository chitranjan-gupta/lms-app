import { useColorScheme } from "nativewind";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import {
  BackButton,
  ItemsContainer,
  LanguageItem,
  ThemeItem,
} from "@/components";
// import Notification from "@/components/notification";
import {
  ScrollView,
  View,
  SafeAreaView,
  FocusAwareStatusBar,
  Text,
} from "@/ui";

export default function Settings() {
  const { colorScheme } = useColorScheme();
  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        colorScheme === "dark" ? withTiming("black") : withTiming("white"),
    };
  });

  return (
    <Animated.View style={[backgroundColorAnimation]} className="w-full h-full">
      <FocusAwareStatusBar />
      <SafeAreaView>
        <View className="p-2">
          <BackButton />
        </View>
        <ScrollView>
          <View className="flex-1 px-4 mt-4">
            <Text className="text-xl font-bold" tx="settings.title" />
            <ItemsContainer title="settings.generale">
              <LanguageItem />
              <ThemeItem />
            </ItemsContainer>
          </View>
          {/* <Notification /> */}
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}
