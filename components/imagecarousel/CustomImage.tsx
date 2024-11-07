import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  interpolate,
  SharedValue,
} from "react-native-reanimated";

import { images } from "@/constants";
import { gradients } from "@/constants/gradients";
import { Image, View, Text } from "@/ui";

const CustomImage = ({
  item,
  x,
  index,
  size,
  spacer,
}: {
  item: { image?: any; logo_url?: string; name?: string } | { key: string };
  x: SharedValue<number>;
  index: number;
  size: number;
  spacer: number;
}) => {
  const [gradi] = useState(() => index % gradients.length);
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 2) * size, (index - 1) * size, index * size],
      [0.8, 1, 0.8],
    );
    return {
      transform: [{ scale }],
    };
  });

  if (!("logo_url" in item)) {
    return <View style={{ width: spacer }} key={index} />;
  }
  return (
    <View style={{ width: size }} key={index} className="p-2">
      <Animated.View
        style={[style, { elevation: 10 }]}
        className="rounded-[34px] overflow-hidden w-full h-[250px]"
      >
        <LinearGradient
          colors={gradients[gradi][0].colors}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            width: "100%",
          }}
        >
          <View className="flex flex-col justify-center items-center">
            <Image
              source={item?.image || item?.logo_url || images.onboarding1}
              style={{ width: 100, height: 100 }}
            />
            <View className="flex flex-row justify-center items-center">
              <Text className="text-center !text-white">
                {item?.name || ""}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default CustomImage;
