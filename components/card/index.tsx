import { useState } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { SafeAreaView, Text, View } from "@/ui";

import Activity from "./Activity";
import Card from "./Card";
import { data } from "./data";

const CradSwipeScreen = () => {
  const [newData, setNewData] = useState([...data, ...data]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const animatedValue = useSharedValue(0);
  const MAX = 3;

  const animatedStyle = useAnimatedStyle(() => {
    if (animatedValue.value > currentIndex + 0.5) {
      runOnJS(setActivityIndex)(currentIndex + 1);
    } else {
      runOnJS(setActivityIndex)(currentIndex);
    }
    const opacity = interpolate(
      animatedValue.value,
      [currentIndex, currentIndex + 0.3, currentIndex + 0.8, currentIndex + 1],
      [1, 0, 0, 1],
      Extrapolation.CLAMP,
    );

    return {
      opacity: opacity,
    };
  });

  return (
    <SafeAreaView className="flex-[1] bg-[#111111]">
      <View className="flex-[1] justify-center items-center">
        {newData.map((item, index) => {
          if (index > currentIndex + MAX || index < currentIndex) {
            return null;
          }
          return (
            <Card
              newData={newData}
              setNewData={setNewData}
              maxVisibleItems={MAX}
              item={item}
              index={index}
              dataLength={newData.length}
              animatedValue={animatedValue}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              key={index}
            />
          );
        })}
      </View>
      <Text className="!text-white text-[32px] font-bold relative px-[16px]">
        Recent Activity
      </Text>
      <View
        style={{ flex: 3 / 2 }}
        className="flex-[3/2] justify-center items-center"
      >
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={[{ width: "100%" }, animatedStyle]}
        >
          {newData[activityIndex].activity.map((item, index) => {
            return <Activity item={item} key={index} />;
          })}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CradSwipeScreen;
