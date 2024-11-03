import React from "react";
import { ViewToken } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from "react-native-reanimated";

import { View, FlatList } from "@/ui";

import { CircleButton } from "./CircleButton";
import { Pagination } from "./Pagination";
import RenderItem from "./RenderItem";

import type { Onboarding } from "@/types";

interface AnimatedOnboardingProps {
  data: Onboarding[];
  onPress: () => void;
}

export const AnimatedOnboarding = ({
  data,
  onPress,
}: AnimatedOnboardingProps) => {
  const flatListRef = useAnimatedRef<FlatList<Onboarding>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View className="flex-1">
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} x={x} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View className="flex flex-row justify-between items-center mx-[30px] py-[30px] absolute bottom-[20px] left-0 right-0">
        <Pagination data={data} x={x} />
        <CircleButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
          onPress={onPress}
        />
      </View>
    </View>
  );
};
