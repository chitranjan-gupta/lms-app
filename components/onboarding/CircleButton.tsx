import { TouchableWithoutFeedback, useWindowDimensions } from "react-native";
import Animated, {
  AnimatedRef,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { AntDesign, FlatList } from "@/ui";

import type { Onboarding } from "@/types";

type Props = {
  dataLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<Onboarding>>;
  x: SharedValue<number>;
  onPress: () => void;
};

export const CircleButton = ({
  flatListRef,
  flatListIndex,
  dataLength,
  x,
  onPress,
}: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });
  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ["#005b4f", "#1e2169", "#F15937"],
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({
            index: flatListIndex.value + 1,
          });
        } else {
          onPress();
        }
      }}
    >
      <Animated.View
        style={[buttonAnimationStyle, animatedColor]}
        className="bg-[#1e2169] p-[10px] rounded-[100px] justify-center items-center overflow-hidden"
      >
        <Animated.Text
          style={[textAnimationStyle]}
          className="text-white absolute text-[16px]"
        >
          Get Started
        </Animated.Text>
        <Animated.View
          style={[arrowAnimationStyle]}
          className="absolute flex flex-row justify-center items-center"
        >
          <AntDesign name="arrowright" size={25} color="white" />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
