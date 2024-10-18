import { Pressable } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  SharedValue,
} from "react-native-reanimated";

interface SwitchBarProps {
  value: SharedValue<boolean>;
  isActive: boolean;
  onPress: () => void;
  style: {};
  duration?: number;
  trackColors?: { on: string; off: string };
}

export const SwitchBar = ({
  value,
  isActive,
  onPress,
  style,
  duration = 400,
  trackColors = { on: "lightgray", off: "lightgray" },
}: SwitchBarProps) => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      Number(value.value),
      [0, 1],
      [trackColors.off, trackColors.on],
    );
    const colorValue = withTiming(color, { duration });

    return {
      backgroundColor: colorValue,
      borderRadius: 5,
      width: "100%",
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      Number(value.value),
      [0, 1],
      [0, width.value - 180],
    );
    const translateValue = withTiming(moveValue, { duration });

    return {
      transform: [{ translateX: translateValue }],
      borderRadius: 5,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[style, trackAnimatedStyle]}
        className="w-full p-1.5"
      >
        <Animated.View
          style={thumbAnimatedStyle}
          className="bg-[#0286FF] h-full w-[160px] flex flex-row justify-center items-center z-10"
        >
          <Animated.Text className="text-white text-center">
            {`${!isActive ? "About" : "Work"} Google`}
          </Animated.Text>
        </Animated.View>
        <Animated.Text className="text-black text-center -top-7 self-start left-10 z-0">
          About Google
        </Animated.Text>
        <Animated.Text className="text-black text-center -top-11 right-12 self-end z-0">
          Work Google
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};
