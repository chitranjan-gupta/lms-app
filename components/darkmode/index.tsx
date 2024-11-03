import {
  Canvas,
  Group,
  Image,
  Mask,
  Rect,
  SkImage,
  makeImageFromView,
} from "@shopify/react-native-skia";
import { useColorScheme } from "nativewind";
import { useRef, useState } from "react";
import { Dimensions, PixelRatio, StyleSheet } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Pressable, View, SafeAreaView, Text } from "@/ui";

import ThemeIcon from "../ThemeIcon";

const DarkModeScreen = () => {
  const pd = PixelRatio.get();
  const ref = useRef(null);
  const { toggleColorScheme } = useColorScheme();
  const [overlay, setOverlay] = useState<SkImage | null>(null);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("screen");
  const mask = useSharedValue(0);
  const [active, setActive] = useState(false);

  const wait = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handlePress = async () => {
    if (!active) {
      setActive(true);
      const snapshot = await makeImageFromView(ref);
      setOverlay(snapshot);
      await wait(80);

      toggleColorScheme();

      mask.value = withTiming(SCREEN_WIDTH, { duration: 800 });
      await wait(800);

      setOverlay(null);
      mask.value = 0;
      setActive(false);
    }
  };
  return (
    <SafeAreaProvider>
      <View
        ref={ref}
        collapsable={false}
        className="flex-[1] !bg-white dark:!bg-[#1d2733]"
      >
        <View className="bg-white dark:bg-[#252d3a]">
          <SafeAreaView className="p-[20px] border-b-[1px] bg-white border-b-[#E3E3E3] dark:bg-[#252d3a] dark:border-b-[#1d2733]">
            <Pressable className="w-[28px] h-[28px]" onPress={handlePress}>
              <ThemeIcon RADIUS={20} />
            </Pressable>
          </SafeAreaView>
        </View>
        <View>
          <Text>Hello</Text>
        </View>
      </View>
      {overlay && (
        <Canvas style={StyleSheet.absoluteFillObject} pointerEvents={"none"}>
          <Mask
            mode="luminance"
            mask={
              <Group>
                <Rect
                  height={SCREEN_HEIGHT}
                  width={SCREEN_WIDTH}
                  color="white"
                />
                <Rect height={SCREEN_HEIGHT} width={mask} color="black" />
              </Group>
            }
          >
            <Image
              image={overlay}
              x={0}
              y={0}
              width={overlay.width() / pd}
              height={overlay.height() / pd}
            />
          </Mask>
        </Canvas>
      )}
    </SafeAreaProvider>
  );
};

export default DarkModeScreen;
