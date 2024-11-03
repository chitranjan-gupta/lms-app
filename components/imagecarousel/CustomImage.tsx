import { LinearGradient } from "expo-linear-gradient";
import { useLayoutEffect, useState } from "react";
import { Image as NImage } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  SharedValue,
} from "react-native-reanimated";

import { images } from "@/constants";
import { gradients } from "@/constants/gradients";
import { Image, View } from "@/ui";

const CustomImage = ({
  item,
  x,
  index,
  size,
  spacer,
}: {
  item: { image: any } | { key: string };
  x: SharedValue<number>;
  index: number;
  size: number;
  spacer: number;
}) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  //Get Image Width and Height to Calculate AspectRatio
  useLayoutEffect(() => {
    if ("image" in item) {
      const { width, height } = NImage.resolveAssetSource(
        item.image || images.onboarding1,
      );
      setAspectRatio(width / height);
    } else {
      const { width, height } = NImage.resolveAssetSource(images.onboarding1);
      setAspectRatio(width / height);
    }
  }, [item]);

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

  if (!("image" in item)) {
    return <View style={{ width: spacer }} key={index} />;
  }
  return (
    <View style={{ width: size }} key={index}>
      <Animated.View
        style={[style]}
        className="rounded-[34px] overflow-hidden w-full h-[200px]"
      >
        <LinearGradient
          colors={gradients[index][0].colors}
          style={{ flex: 1, height: 100 }}
        >
          <Image
            source={item.image || images.onboarding1}
            style={[{ aspectRatio: aspectRatio, height: 200 }]}
            className="w-full h-[200px]"
          />
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default CustomImage;
