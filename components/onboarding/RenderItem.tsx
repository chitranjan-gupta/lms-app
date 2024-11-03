import LottieView from "lottie-react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Text, View, Image } from "@/ui";

import type { Onboarding } from "@/types";

type RenderItemProps = {
  index: number;
  x: SharedValue<number>;
  item: Onboarding;
};

const RenderItem = ({ index, x, item }: RenderItemProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, -200],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ translateY: translateYAnimation }],
    };
  });

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ scale: scale }],
    };
  });

  return (
    <View
      style={[{ width: SCREEN_WIDTH }]}
      className="flex-[1] justify-around items-center mb-[120px]"
    >
      <View
        style={[StyleSheet.absoluteFillObject]}
        className="items-center justify-end"
      >
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              borderRadius: SCREEN_WIDTH / 2,
              backgroundColor: item.backgroundColor,
            },
            circleAnimation,
          ]}
        />
      </View>
      <Animated.View style={lottieAnimationStyle}>
        {item.animation ? (
          <LottieView
            source={item.animation}
            style={{
              width: SCREEN_WIDTH * 0.9,
              height: SCREEN_WIDTH * 0.9,
            }}
            autoPlay
            loop
          />
        ) : (
          <Image
            source={item.image}
            style={{ width: 300, height: 300 }}
            contentFit="contain"
          />
        )}
      </Animated.View>
      <Text
        style={[{ color: item.textColor }]}
        className="text-center text-[44px] font-bold mb-[10px] mx-[20px]"
      >
        {item.title}
      </Text>
      <Text
        style={[{ color: item.descriptionColor, fontSize: 20 }]}
        className="text-center font-semibold mb-[10px] mx-[20px]"
      >
        {item.description}
      </Text>
    </View>
  );
};

export default RenderItem;
