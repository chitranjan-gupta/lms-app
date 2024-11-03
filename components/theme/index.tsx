import { useColorScheme } from "nativewind";
import { forwardRef, type Ref } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { Modal, type BottomSheetModalMethods } from "@/ui";

import ThemeIcon from "../ThemeIcon";

import Switch from "./ThemeSwitch";

interface ThemeModalProps {}

const ThemeModalComponent = (
  props: ThemeModalProps,
  ref: Ref<BottomSheetModalMethods>,
) => {
  const { colorScheme } = useColorScheme();

  const backgroundColorAnimation2 = useAnimatedStyle(() => {
    return {
      backgroundColor:
        colorScheme === "dark" ? withTiming("#22272B") : withTiming("white"),
    };
  });

  const textColorAnimation = useAnimatedStyle(() => {
    return {
      color: colorScheme === "dark" ? withTiming("white") : withTiming("black"),
    };
  });
  return (
    <Modal
      ref={ref}
      style={[{ borderRadius: 15 }, backgroundColorAnimation2]}
      backgroundStyle={{
        backgroundColor: colorScheme === "dark" ? "#22272B" : "white",
      }}
    >
      <Animated.View
        style={[backgroundColorAnimation2]}
        className="w-full h-full justify-center items-center self-center"
      >
        <ThemeIcon RADIUS={70} />
        <Animated.Text
          style={[textColorAnimation]}
          className="text-[22px] font-bold mt-[40px] mb-[14px]"
        >
          Choose a style
        </Animated.Text>
        <Animated.Text
          style={[textColorAnimation]}
          className="text-[16px] font-medium"
        >
          Pop or subtle. Day or night.
        </Animated.Text>
        <Animated.Text
          style={[textColorAnimation]}
          className="text-[16px] font-medium"
        >
          Customize your interface.
        </Animated.Text>
        <Switch />
      </Animated.View>
    </Modal>
  );
};

export const ThemeModal =
  forwardRef<BottomSheetModalMethods>(ThemeModalComponent);
