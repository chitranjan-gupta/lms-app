import { useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { View } from "@/ui";

import { data } from "./data";
import Item from "./Item";

const CarouselScreen = () => {
  const { width } = useWindowDimensions();
  const x = useSharedValue(0);
  const ITEM_WIDTH = 250;
  const ITEM_HEIGHT = 400;
  const MARGin_HORIZONTAL = 20;
  const ITEM_FULL_WIDTH = ITEM_WIDTH + MARGin_HORIZONTAL * 2;
  const SPACER = (width - ITEM_FULL_WIDTH) / 2;

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <Animated.FlatList
      onScroll={onScroll}
      ListHeaderComponent={<View />}
      ListHeaderComponentStyle={{ width: SPACER }}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{ width: SPACER }}
      data={data}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id + item.name}
      renderItem={({ item, index }) => {
        return (
          <Item
            key={index}
            item={item}
            index={index}
            x={x}
            width={ITEM_WIDTH}
            height={ITEM_HEIGHT}
            marginHorizontal={MARGin_HORIZONTAL}
            fullWidth={ITEM_FULL_WIDTH}
          />
        );
      }}
      horizontal
      scrollEventThrottle={16}
      decelerationRate="fast"
      snapToInterval={ITEM_FULL_WIDTH}
    />
  );
};

export default CarouselScreen;
