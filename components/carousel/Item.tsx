import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { gradients } from "@/constants/gradients";
import { Text, View, Image } from "@/ui";

import { Data } from "./data";

type Props = {
  item: Data;
  width: number;
  height: number;
  marginHorizontal: number;
  fullWidth: number;
  x: SharedValue<number>;
  index: number;
};

const Item = ({
  item,
  width,
  height,
  marginHorizontal,
  fullWidth,
  x,
  index,
}: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(
      x.value,
      [(index - 1) * fullWidth, index * fullWidth, (index + 1) * fullWidth],
      [20, 0, -20],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      x.value,
      [(index - 1) * fullWidth, index * fullWidth, (index + 1) * fullWidth],
      [60, 0, 60],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{ rotateZ: `${rotateZ}deg` }, { translateY: translateY }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: width,
          height: height,
          marginHorizontal: marginHorizontal,
          transformOrigin: Platform.OS === "android" ? "120px 400px" : "bottom",
        },
        animatedStyle,
      ]}
      className="bg-gray-200 rounded-[12px] overflow-hidden"
    >
      <View className="flex-[4]">
        <LinearGradient
          colors={gradients[index][0].colors}
          style={{ width: width, flex: 1 }}
        />
      </View>
      <View className="flex-[1] flex-row">
        <View className="justify-center mx-[10px]">
          <Text className="!text-[#111111] text-[18px] font-bold mb-[4px]">
            {item.name}
          </Text>
          <Text className="!text-[#111111] text-[16px]">{item.exp}</Text>
        </View>
        <View className="flex-[1] justify-center items-center">
          {/* <Image
            source={require("./visa.png")}
            contentFit="contain"
            style={{ width: 58, flex: 1 }}
          /> */}
        </View>
      </View>
    </Animated.View>
  );
};

export default Item;
