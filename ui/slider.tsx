import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TextInputProps,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  runOnJS,
  AnimatedProps,
} from "react-native-reanimated";

interface SliderProps {
  sliderWidth: number;
  min: number;
  max: number;
  step: number;
  onValueChange: (range: { min: number; max: number }) => void;
}

export const Slider = ({
  sliderWidth,
  min,
  max,
  step,
  onValueChange,
}: SliderProps) => {
  const position = useSharedValue(0);
  const position2 = useSharedValue(sliderWidth);
  const opacity = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const zIndex2 = useSharedValue(0);
  const oldposition = useSharedValue(0);
  const oldposition2 = useSharedValue(0);
  const gestureHandler = Gesture.Pan()
    .onStart(() => {
      oldposition.value = position.value;
    })
    .onChange((event) => {
      opacity.value = 1;
      if (oldposition.value + event.translationX < 0) {
        position.value = 0;
      } else if (oldposition.value + event.translationX > position2.value) {
        position.value = position2.value;
        zIndex.value = 1;
        zIndex2.value = 0;
      } else {
        position.value = oldposition.value + event.translationX;
      }
    })
    .onEnd(() => {
      opacity.value = 0;
      runOnJS(onValueChange)({
        min:
          min +
          Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
            step,
        max:
          min +
          Math.floor(position2.value / (sliderWidth / ((max - min) / step))) *
            step,
      });
    });
  const gestureHandler2 = Gesture.Pan()
    .onStart(() => {
      oldposition2.value = position2.value;
    })
    .onChange((event) => {
      opacity2.value = 1;
      if (oldposition2.value + event.translationX > sliderWidth) {
        position2.value = sliderWidth;
      } else if (oldposition2.value + event.translationX < position.value) {
        position2.value = position.value;
        zIndex.value = 0;
        zIndex2.value = 1;
      } else {
        position2.value = oldposition2.value + event.translationX;
      }
    })
    .onEnd(() => {
      opacity2.value = 0;
      runOnJS(onValueChange)({
        min:
          min +
          Math.floor(position.value / (sliderWidth / ((max - min) / step))) *
            step,
        max:
          min +
          Math.floor(position2.value / (sliderWidth / ((max - min) / step))) *
            step,
      });
    });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    zIndex: zIndex.value,
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: position2.value }],
    zIndex: zIndex2.value,
  }));
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const opacityStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));
  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    width: position2.value - position.value,
  }));
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const minLabelText = useAnimatedProps(() => {
    return {
      text: `$${min + Math.floor(position.value / (sliderWidth / ((max - min) / step))) * step}`,
    } as AnimatedProps<TextInputProps>;
  });
  const maxLabelText = useAnimatedProps(() => {
    return {
      text: `$${min + Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step}`,
    } as AnimatedProps<TextInputProps>;
  });
  return (
    <View style={[styles.sliderContainer, { width: sliderWidth }]}>
      <View style={[styles.sliderBack, { width: sliderWidth }]} />
      <Animated.View style={[styles.sliderFront, sliderStyle]} />
      <GestureDetector gesture={gestureHandler}>
        <Animated.View style={[styles.thumb, animatedStyle]}>
          <Animated.View style={[styles.label, opacityStyle]}>
            <AnimatedTextInput
              style={styles.labelText}
              defaultValue={"0"}
              animatedProps={minLabelText}
              editable={false}
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
      <GestureDetector gesture={gestureHandler2}>
        <Animated.View style={[styles.thumb, animatedStyle2]}>
          <Animated.View style={[styles.label, opacityStyle2]}>
            <AnimatedTextInput
              style={styles.labelText}
              defaultValue={"0"}
              animatedProps={maxLabelText}
              editable={false}
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: "center",
    alignSelf: "center",
  },
  sliderBack: {
    height: 8,
    backgroundColor: "#DFEAFB",
    borderRadius: 20,
  },
  sliderFront: {
    height: 8,
    backgroundColor: "#3F4CF6",
    borderRadius: 20,
    position: "absolute",
  },
  thumb: {
    position: "absolute",
    left: -10,
    width: 20,
    height: 20,
    backgroundColor: "#3F4CF6",
    borderWidth: 5,
    borderRadius: 10,
  },
  label: {
    position: "absolute",
    top: -40,
    bottom: 20,
    backgroundColor: "black",
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    color: "white",
    padding: 5,
    fontWeight: "bold",
    width: "100%",
    fontSize: 16,
  },
});

export const SliderExample = () => {
  const MIN_DEFAULT = 10;
  const MAX_DEFAULT = 500;
  const [minValue, setMinvalue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);
  return (
    <View>
      <Slider
        sliderWidth={300}
        min={MIN_DEFAULT}
        max={MAX_DEFAULT}
        step={10}
        onValueChange={(range) => {
          setMinvalue(range.min);
          setMaxValue(range.max);
        }}
      />
      <Text>{minValue}</Text>
      <Text>{maxValue}</Text>
    </View>
  );
};
