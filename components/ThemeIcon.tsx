import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  Mask,
} from "@shopify/react-native-skia";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  RADIUS: number;
};

const Icon = ({ RADIUS }: Props) => {
  const { colorScheme } = useColorScheme();
  const gradientColor1 = useSharedValue("#ff4467");
  const gradientColor2 = useSharedValue("#ff8e0b");
  const mask = useSharedValue(0);
  const cy = useSharedValue(0);

  const colors = useDerivedValue(() => {
    return [gradientColor1.value, gradientColor2.value];
  });

  useEffect(() => {
    if (colorScheme === "light") {
      cy.value = withTiming(0);
      mask.value = withTiming(0);
      gradientColor1.value = withTiming("#ff4467");
      gradientColor2.value = withTiming("#ff8e0b");
    } else if (colorScheme === "dark") {
      cy.value = withSpring(RADIUS / 2, { duration: 2000 });
      mask.value = withSpring(RADIUS, { duration: 2000 });
      gradientColor1.value = withTiming("#8371ff");
      gradientColor2.value = withTiming("#86bfff");
    }
  }, [cy, gradientColor1, gradientColor2, mask, colorScheme, RADIUS]);

  return (
    <Canvas
      style={{
        width: RADIUS * 2,
        height: RADIUS * 2,
        transform: [{ rotate: "45deg" }],
      }}
    >
      <Mask
        mode="luminance"
        mask={
          <Group>
            <Circle cx={RADIUS} cy={RADIUS} r={RADIUS} color="white" />
            <Circle cx={RADIUS} cy={cy} r={mask} color={"black"} />
          </Group>
        }
      >
        <Circle cx={RADIUS} cy={RADIUS} r={RADIUS} />
        <LinearGradient
          transform={[{ rotate: -90 }]}
          origin={{ x: RADIUS, y: RADIUS }}
          start={{ x: 0, y: 0 }}
          end={{ x: RADIUS * 2, y: RADIUS * 2 }}
          colors={colors}
        />
      </Mask>
    </Canvas>
  );
};

export default Icon;
