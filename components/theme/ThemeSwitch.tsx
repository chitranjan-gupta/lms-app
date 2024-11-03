import { useEffect } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { useSelectedTheme } from "@/core/hooks/use-selected-theme";
import { Pressable } from "@/ui";

const Switch = () => {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const SWITCH_CONTAINER_WIDTH = width * 0.8;
  const SWITCH_WIDTH = SWITCH_CONTAINER_WIDTH / 3;

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  useEffect(() => {
    if (selectedTheme === "system") {
      translateX.value = withSpring(SWITCH_WIDTH * 0);
    } else if (selectedTheme === "light") {
      translateX.value = withSpring(SWITCH_WIDTH * 1);
    } else if (selectedTheme === "dark") {
      translateX.value = withSpring(SWITCH_WIDTH * 2);
    }
  }, [SWITCH_WIDTH, selectedTheme, translateX]);

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        selectedTheme === "dark" ? withTiming("black") : withTiming("#F0F0F0"),
    };
  });

  const textColorAnimation = useAnimatedStyle(() => {
    return {
      color:
        selectedTheme === "dark" ? withTiming("white") : withTiming("black"),
    };
  });

  const backgroundColorSlideAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        selectedTheme === "dark" ? withTiming("#22272B") : withTiming("white"),
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: SWITCH_CONTAINER_WIDTH,
        },
        backgroundColorAnimation,
      ]}
      className="bg-[#f0f0f0] flex-row justify-evenly items-center rounded-[40px] overflow-hidden mt-[20px]"
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            width: SWITCH_WIDTH,
          },
          translateAnimation,
        ]}
        className="items-center justify-center"
      >
        <Animated.View
          style={[
            {
              width: (width * 0.7) / 3,
            },
            backgroundColorSlideAnimation,
          ]}
          className="p-[23px] rounded-[100px] bg-white"
        />
      </Animated.View>
      <Pressable
        className="flex-[1] items-center justify-center p-[20px]"
        onPress={() => {
          setSelectedTheme("system");
        }}
      >
        <Animated.Text
          style={[textColorAnimation]}
          className="text-black font-bold"
        >
          System
        </Animated.Text>
      </Pressable>
      <Pressable
        className="flex-[1] items-center justify-center p-[20px]"
        onPress={() => {
          setSelectedTheme("light");
        }}
      >
        <Animated.Text
          style={[textColorAnimation]}
          className="text-black font-bold"
        >
          Light
        </Animated.Text>
      </Pressable>
      <Pressable
        className="flex-[1] items-center justify-center p-[20px]"
        onPress={() => {
          setSelectedTheme("dark");
        }}
      >
        <Animated.Text
          style={[textColorAnimation]}
          className="text-black font-bold"
        >
          Dark
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default Switch;
