import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";

const Dot = ({
  x,
  index,
  size,
}: {
  x: SharedValue<number>;
  index: number;
  size: number;
}) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [(index - 1) * size, index * size, (index + 1) * size],
      [10, 20, 10],
      Extrapolation.CLAMP,
    );
    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * size, index * size, (index + 1) * size],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });
  return (
    <Animated.View
      style={[animatedDotStyle]}
      className="h-[10px] bg-orange-500 mx-[10px] rounded-[5px]"
    />
  );
};

export default Dot;
